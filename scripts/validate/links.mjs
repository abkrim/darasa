import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { formatReport } from './report.mjs';

const INDEX_PATH = 'dist/sources.json';
const PORTRAITS_DIR = 'public/portraits';

function basename(p) {
  return p.slice(p.lastIndexOf('/') + 1);
}

/**
 * @param {object} index parsed dist/sources.json
 * @param {Set<string>} portraitsOnDisk set of webp filenames present on disk
 * @returns {import('./report.mjs').Finding[]}
 */
export function checkLinks(index, portraitsOnDisk) {
  const findings = [];
  const referenced = new Set();

  for (const img of index.imagenes) {
    const file = basename(img.webp);
    referenced.add(file);
    if (!portraitsOnDisk.has(file)) {
      findings.push({ slug: img.slug, type: 'missing_local_file', severity: 'error', detail: img.webp });
    }
    if (!img.attribution) {
      findings.push({ slug: img.slug, type: 'missing_attribution', severity: 'error', detail: file });
    } else if (!img.attribution.commonsFile) {
      findings.push({ slug: img.slug, type: 'unparseable_attribution', severity: 'error', detail: file });
    }
    if (img.imgCredit == null) {
      findings.push({ slug: img.slug, type: 'missing_credit', severity: 'warning', detail: file });
    }
  }

  for (const file of portraitsOnDisk) {
    if (!referenced.has(file)) {
      findings.push({ slug: null, type: 'orphan_portrait', severity: 'warning', detail: file });
    }
  }

  for (const w of index.web) {
    let malformed = false;
    try {
      // eslint-disable-next-line no-new
      new URL(w.url);
    } catch {
      malformed = true;
    }
    for (const slug of w.citadaEn) {
      if (malformed) {
        findings.push({ slug, type: 'malformed_url', severity: 'error', detail: w.url });
      } else if (w.esHttp) {
        findings.push({ slug, type: 'http_not_https', severity: 'warning', detail: w.url });
      }
    }
  }

  return findings;
}

function portraitsOnDisk() {
  if (!existsSync(PORTRAITS_DIR)) return new Set();
  return new Set(readdirSync(PORTRAITS_DIR).filter((f) => f.endsWith('.webp')));
}

function main() {
  if (!existsSync(INDEX_PATH)) {
    console.error(`${INDEX_PATH} not found — run \`npm run build\` first.`);
    process.exit(2);
  }
  const index = JSON.parse(readFileSync(INDEX_PATH, 'utf8'));
  const findings = checkLinks(index, portraitsOnDisk());
  const { text, hasError } = formatReport(findings, { title: 'validate:links' });
  console.log(text);
  process.exit(hasError ? 1 : 0);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
