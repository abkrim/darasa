import { readFileSync, existsSync } from 'node:fs';
import { extractYear, dateCoherence } from './year.mjs';
import { loadCache, saveCache, isFresh } from './cache.mjs';
import { formatReport, toJson } from './report.mjs';

const INDEX_PATH = 'dist/sources.json';
const UA = 'darasa/1.0 (educational; abdelkarim@aichadigital.es)';

/** @param {number|null} status */
export function classifyHttp(status) {
  if (status === 404 || status === 410) return { severity: 'error', type: 'http_error' };
  if (status == null) return { severity: 'warning', type: 'timeout' };
  if (status >= 200 && status < 400) return null;
  if (status === 403 || status === 429 || status >= 500) return { severity: 'warning', type: 'http_warning' };
  return { severity: 'warning', type: 'http_warning' };
}

/** @param {{missing:boolean}|null} info */
export function classifyCommons(info) {
  if (!info || info.missing) return { severity: 'error', type: 'missing_file' };
  return null;
}

/** @param {string|null} imgCredit @param {string|null} commonsDateRaw */
export function classifyDate(imgCredit, commonsDateRaw) {
  const c = extractYear(imgCredit);
  const k = extractYear(commonsDateRaw);
  if (dateCoherence(c, k) !== 'warning') return null;
  return { severity: 'warning', type: 'date_warning', detail: `credit≈${c} vs commons≈${k} — review manually` };
}

export async function fetchStatus(url, { timeoutMs = 10000, retries = 2, fetchImpl = fetch } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), timeoutMs);
    try {
      const res = await fetchImpl(url, { redirect: 'follow', headers: { 'User-Agent': UA }, signal: ac.signal });
      clearTimeout(t);
      return res.status;
    } catch {
      clearTimeout(t);
      if (attempt === retries) return null;
    }
  }
  return null;
}

const normTitle = (t) => t.replace(/_/g, ' ');

export async function commonsBatch(files, { fetchImpl = fetch } = {}) {
  const result = new Map(); // normalized title → { missing, year }
  for (let i = 0; i < files.length; i += 50) {
    const chunk = files.slice(i, i + 50);
    const u = new URL('https://commons.wikimedia.org/w/api.php');
    u.searchParams.set('action', 'query');
    u.searchParams.set('format', 'json');
    u.searchParams.set('prop', 'imageinfo');
    u.searchParams.set('iiprop', 'url|extmetadata');
    u.searchParams.set('titles', chunk.join('|'));
    const res = await fetchImpl(u, { headers: { 'User-Agent': UA } });
    const data = await res.json();
    const pages = data?.query?.pages ?? {};
    for (const pid of Object.keys(pages)) {
      const p = pages[pid];
      const year = p?.imageinfo?.[0]?.extmetadata?.DateTimeOriginal?.value ?? null;
      result.set(normTitle(p.title), { missing: p.missing !== undefined, year });
    }
  }
  return result;
}

async function main() {
  const refresh = process.argv.includes('--refresh');
  const asJson = process.argv.includes('--json');
  if (!existsSync(INDEX_PATH)) {
    console.error(`${INDEX_PATH} not found — run \`npm run build\` first.`);
    process.exit(2);
  }
  const index = JSON.parse(readFileSync(INDEX_PATH, 'utf8'));
  const cache = refresh ? {} : loadCache();
  const now = Date.now();
  const findings = [];
  const newCache = { ...cache };

  // 1. Commons files (batch). Map back via normalized title.
  const imgs = index.imagenes.filter((i) => i.attribution?.commonsFile);
  const toQuery = imgs
    .filter((i) => refresh || !isFresh(cache[`commons:${i.attribution.commonsFile}`], now))
    .map((i) => i.attribution.commonsFile);
  const commons = toQuery.length ? await commonsBatch([...new Set(toQuery)]) : new Map();

  for (const i of imgs) {
    const key = `commons:${i.attribution.commonsFile}`;
    let info;
    if (!refresh && isFresh(cache[key], now)) {
      info = cache[key];
    } else {
      // If a queried title isn't found in the response map, normalization diverged
      // (rare: casing/encoding beyond underscore↔space). Conservative default = treat
      // as missing so it surfaces for manual review rather than passing silently.
      info = commons.get(normTitle(i.attribution.commonsFile)) ?? { missing: true, year: null };
      newCache[key] = { ...info, checkedAt: now };
    }
    const c = classifyCommons(info);
    if (c) findings.push({ slug: i.slug, ...c, detail: i.attribution.commonsFile, lastChecked: new Date(newCache[key]?.checkedAt ?? now).toISOString() });
    const d = classifyDate(i.imgCredit, info.year);
    if (d) findings.push({ slug: i.slug, ...d });
  }

  // 2. Web URLs.
  for (const w of index.web) {
    const key = `url:${w.url}`;
    let status;
    if (!refresh && isFresh(cache[key], now)) {
      status = cache[key].status;
    } else {
      status = await fetchStatus(w.url);
      newCache[key] = { status, checkedAt: now };
    }
    const c = classifyHttp(status);
    if (c) for (const slug of w.citadaEn) findings.push({ slug, ...c, detail: w.url, lastChecked: new Date(newCache[key]?.checkedAt ?? now).toISOString() });
  }

  saveCache(newCache);
  const { text, hasError } = formatReport(findings, { title: 'validate:refs' });
  console.log(asJson ? toJson(findings) : text);
  process.exit(hasError ? 1 : 0);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
