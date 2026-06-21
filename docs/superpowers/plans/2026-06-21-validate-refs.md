# Pieza C — validate-refs + sources index — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close provenance layers 2 (localizable) and 3 (aggregated index) for darasa: a generated `/fuentes` page + `sources.json`, an offline link-integrity check, an online reference check with conservative severity, and a weekly CI that opens a stable issue on real breakage.

**Architecture:** Astro's `getCollection` is the single source of the index. A pure `extract.mjs` turns normalized entries + parsed `ATTRIBUTIONS.md` rows into a `SourcesIndex`. An Astro endpoint emits `dist/sources.json`; a page renders `/fuentes`. Two Node scripts consume `dist/sources.json`: `validate:links` (offline, no network) and `validate:refs` (online, cached, conservative). A weekly GitHub Actions workflow runs `validate:refs --refresh` and opens/updates/closes one stable issue.

**Tech Stack:** Astro v6 (Content Layer + Zod), Node v24 (native `fetch`, `node:test`, `node:fs`), plain `.mjs`/`.js` modules with JSDoc. No new dependencies. GitHub Actions + `actions/github-script`.

## Global Constraints

- **No new npm dependencies.** Use only Node 24 built-ins (`fetch`, `node:test`, `node:fs`, `node:path`, `AbortController`).
- **`npm run build` must never touch the network.** Index generation is pure (frontmatter + `ATTRIBUTIONS.md`).
- **Validators consume `dist/sources.json`.** They must be run after `npm run build`; if the file is missing, exit code `2` with a clear message.
- **Shared pure logic lives in `.mjs` with JSDoc** (consumed by both Astro and `node --test`). The Astro endpoint is `src/pages/sources.json.js`.
- **`extract.mjs` is pure:** no disk, no network, deterministic (no timestamps). The endpoint adds `generatedAt`.
- **Severity (online):** Commons `missing` and HTTP `404`/`410` → ERROR; HTTP `403`/`429`/`5xx` and timeouts → WARNING; year mismatch → WARNING; ambiguous year → SKIP. Only ERROR turns the job red / opens the issue.
- **Code, comments, commits, PR in English.** Spec/plan narrative is Spanish; identifiers stay English.
- **Commit footer:** every commit ends with `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.
- **Finding shape (canonical across all modules):** `{ slug: string|null, type: string, severity: 'error'|'warning', detail: string, lastChecked?: string }`. The report groups by `slug` (the ficha).

---

## File Structure

```
src/lib/sources/
  parse-attributions.mjs   # pure: parseAttributions(md) → AttributionRow[]
  extract.mjs              # pure: buildSourcesIndex(soberanos, entidades, attributions) → SourcesIndex
  load.mjs                 # Astro adapter: getCollection + fs → SourcesIndex (imports the two above)
src/pages/
  sources.json.js          # endpoint → dist/sources.json (wraps load.mjs, adds generatedAt)
  fuentes.astro            # austere page, 3 sections, uses Layout
scripts/validate/
  year.mjs                 # pure: extractYear(text), dateCoherence(a,b)
  cache.mjs                # pure-ish: loadCache/saveCache/isFresh (.cache/validate-refs.json)
  report.mjs               # pure: formatReport(findings, opts), toJson(findings)
  links.mjs                # pure checkLinks(index, portraitsOnDisk) + CLI main (offline)
  refs.mjs                 # pure classifyHttp/classifyCommons/classifyDate + network + CLI main (online)
tests (node:test):
  src/lib/sources/parse-attributions.test.mjs
  src/lib/sources/extract.test.mjs
  scripts/validate/year.test.mjs
  scripts/validate/cache.test.mjs
  scripts/validate/report.test.mjs
  scripts/validate/links.test.mjs
  scripts/validate/refs.test.mjs
.github/workflows/validate-refs.yml
```

Out-of-module changes: `.gitignore` (un-ignore portraits), `package.json` (scripts), deploy guide (add `validate:deploy`).

---

## Task 1: Version the portraits

**Files:**
- Modify: `.gitignore` (remove `public/portraits/*`)
- Add to git: `public/portraits/*.webp` (138 files, 2.4 MB)

**Interfaces:**
- Consumes: nothing.
- Produces: the 138 `.webp` are now tracked → `validate:links` physical-file check works in CI.

- [ ] **Step 1: Remove the ignore line**

Edit `.gitignore`: delete the line `public/portraits/*`. (Keep everything else.)

- [ ] **Step 2: Stage the portraits and verify the count**

```bash
git add public/portraits/
git ls-files 'public/portraits/*.webp' | wc -l
```
Expected: `138`

- [ ] **Step 3: Verify nothing unexpected got staged**

```bash
git status --short public/portraits/ | grep -v '\.webp$' | grep -v 'ATTRIBUTIONS' || echo "only webp + gitignore change"
```
Expected: only `.gitignore` (modified) and `.webp` additions.

- [ ] **Step 4: Commit**

```bash
git add .gitignore public/portraits/
git commit -m "chore(assets): version the 138 portrait webp files (2.4 MB)

Un-ignore public/portraits/* so validate:links runs complete in CI and the
build is reproducible. Deploy (rsync of dist/) is unchanged.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: `year.mjs` — conservative year parser + coherence rule

**Files:**
- Create: `scripts/validate/year.mjs`
- Test: `scripts/validate/year.test.mjs`
- Modify: `package.json` (add `"test": "node --test"`)

**Interfaces:**
- Produces:
  - `extractYear(text: string|null|undefined): number|null` — a 4-digit year only when unambiguous; `null` for circa/century/range/empty.
  - `dateCoherence(creditYear: number|null, commonsYear: number|null): 'warning'|'skip'` — `'warning'` only when both present and `|Δ| > 50`.

- [ ] **Step 1: Write the failing test**

`scripts/validate/year.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractYear, dateCoherence } from './year.mjs';

test('extractYear: clean single year', () => {
  assert.equal(extractYear('Grabado de Manuel Rodríguez, 1797 (serie de reyes).'), 1797);
});
test('extractYear: circa is ambiguous', () => {
  assert.equal(extractYear('Medalla de Pisanello, c. 1449. Dominio público.'), null);
});
test('extractYear: century is ambiguous', () => {
  assert.equal(extractYear('Retrato imaginario, anónimo, s. XVII.'), null);
});
test('extractYear: range is ambiguous', () => {
  assert.equal(extractYear('Serie del Prado, 1850-1856.'), null);
});
test('extractYear: empty / null', () => {
  assert.equal(extractYear(''), null);
  assert.equal(extractYear(null), null);
  assert.equal(extractYear(undefined), null);
});
test('dateCoherence: large gap warns', () => {
  assert.equal(dateCoherence(1500, 1797), 'warning');
});
test('dateCoherence: small gap skips', () => {
  assert.equal(dateCoherence(1850, 1830), 'skip');
});
test('dateCoherence: missing side skips', () => {
  assert.equal(dateCoherence(1850, null), 'skip');
  assert.equal(dateCoherence(null, 1850), 'skip');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/validate/year.test.mjs`
Expected: FAIL — `Cannot find module './year.mjs'`.

- [ ] **Step 3: Write the implementation**

`scripts/validate/year.mjs`:
```js
const AMBIGUOUS = /\b(c\.|ca\.|circa|s\.|siglo)\b/i;
const YEAR = /\b(1[0-9]{3}|20[0-2][0-9])\b/g;
const THRESHOLD = 50;

/**
 * @param {string|null|undefined} text
 * @returns {number|null} unambiguous 4-digit year, else null
 */
export function extractYear(text) {
  if (!text || typeof text !== 'string') return null;
  if (AMBIGUOUS.test(text)) return null;
  const years = text.match(YEAR);
  if (!years || years.length !== 1) return null; // 0 or >1 (range) → ambiguous
  return Number(years[0]);
}

/**
 * @param {number|null} creditYear
 * @param {number|null} commonsYear
 * @returns {'warning'|'skip'}
 */
export function dateCoherence(creditYear, commonsYear) {
  if (creditYear == null || commonsYear == null) return 'skip';
  return Math.abs(creditYear - commonsYear) > THRESHOLD ? 'warning' : 'skip';
}
```

- [ ] **Step 4: Add the test script to package.json**

In `package.json`, add to `"scripts"`: `"test": "node --test"`.

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test scripts/validate/year.test.mjs`
Expected: PASS — 9 tests.

- [ ] **Step 6: Commit**

```bash
git add scripts/validate/year.mjs scripts/validate/year.test.mjs package.json
git commit -m "feat(validate): conservative year parser + coherence rule

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: `parse-attributions.mjs` — ATTRIBUTIONS.md table → rows

**Files:**
- Create: `src/lib/sources/parse-attributions.mjs`
- Test: `src/lib/sources/parse-attributions.test.mjs`

**Interfaces:**
- Produces:
  - `parseAttributions(markdown: string): AttributionRow[]`
  - `@typedef AttributionRow { webp: string, commonsUrl: string|null, commonsFile: string|null, autor: string|null, anio: string|null }`
  - `webp` is the bare filename (e.g. `"ataulfo.webp"`). `commonsFile` is URL-decoded with underscores preserved (e.g. `"File:Ataúlfo.jpg"`).

- [ ] **Step 1: Write the failing test**

`src/lib/sources/parse-attributions.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseAttributions } from './parse-attributions.mjs';

const SAMPLE = `
## Retratos visigodos

| Archivo local | Título original en Commons | Autor / Origen | Año original |
|---------------|---------------------------|----------------|-------------|
| \`ataulfo.webp\` | [Ataúlfo.jpg](https://commons.wikimedia.org/wiki/File:Ata%C3%BAlfo.jpg) | Representación tardía anónima | s. XVIII |
| \`recaredo-i.webp\` | [Recaredo I (Museo del Prado).jpg](https://commons.wikimedia.org/wiki/File:Recaredo_I,_rey_de_los_Visigodos_(Museo_del_Prado).jpg) | Serie del Prado | 1854 |
`;

test('parses webp filename and decoded File: title', () => {
  const rows = parseAttributions(SAMPLE);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].webp, 'ataulfo.webp');
  assert.equal(rows[0].commonsFile, 'File:Ataúlfo.jpg');
  assert.equal(rows[0].commonsUrl, 'https://commons.wikimedia.org/wiki/File:Ata%C3%BAlfo.jpg');
  assert.equal(rows[0].autor, 'Representación tardía anónima');
  assert.equal(rows[0].anio, 's. XVIII');
});

test('keeps underscores in File: title', () => {
  const rows = parseAttributions(SAMPLE);
  assert.equal(rows[1].commonsFile, 'File:Recaredo_I,_rey_de_los_Visigodos_(Museo_del_Prado).jpg');
});

test('ignores non-row lines', () => {
  assert.deepEqual(parseAttributions('# Title\n\nSome prose.\n'), []);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/lib/sources/parse-attributions.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

`src/lib/sources/parse-attributions.mjs`:
```js
/**
 * @typedef {Object} AttributionRow
 * @property {string} webp
 * @property {string|null} commonsUrl
 * @property {string|null} commonsFile
 * @property {string|null} autor
 * @property {string|null} anio
 */

const ROW = /^\|\s*`([^`]+\.webp)`\s*\|([^|]*)\|([^|]*)\|([^|]*)\|\s*$/;
const LINK = /\((https?:\/\/commons\.wikimedia\.org\/wiki\/(File:[^)]+))\)/;

/**
 * @param {string} markdown
 * @returns {AttributionRow[]}
 */
export function parseAttributions(markdown) {
  /** @type {AttributionRow[]} */
  const rows = [];
  for (const raw of markdown.split('\n')) {
    const m = ROW.exec(raw.trim());
    if (!m) continue;
    const [, webp, colFile, colAutor, colAnio] = m;
    const link = LINK.exec(colFile);
    const commonsUrl = link ? link[1] : null;
    const commonsFile = link ? decodeURIComponent(link[2]) : null;
    rows.push({
      webp: webp.trim(),
      commonsUrl,
      commonsFile,
      autor: colAutor.trim() || null,
      anio: colAnio.trim() || null,
    });
  }
  return rows;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test src/lib/sources/parse-attributions.test.mjs`
Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/sources/parse-attributions.mjs src/lib/sources/parse-attributions.test.mjs
git commit -m "feat(sources): parse ATTRIBUTIONS.md table into rows

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: `extract.mjs` — build the SourcesIndex (pure)

**Files:**
- Create: `src/lib/sources/extract.mjs`
- Test: `src/lib/sources/extract.test.mjs`

**Interfaces:**
- Consumes: `AttributionRow[]` (Task 3).
- Produces:
  - `buildSourcesIndex(soberanos, entidades, attributions): SourcesIndex`
  - `@typedef SoberanoEntry { slug, entidad, img: string|null, imgCredit: string|null, fuentes: string[] }`
  - `@typedef EntidadEntry { slug: string, fuentes: string[] }`
  - `@typedef SourcesIndex { bibliografia: BibliografiaItem[], web: WebItem[], imagenes: ImagenItem[] }`
  - `@typedef BibliografiaItem { key, texto, citadaEn: string[] }`
  - `@typedef WebItem { url, dominio, esHttp: boolean, citadaEn: string[] }`
  - `@typedef ImagenItem { slug, entidad, webp, imgCredit: string|null, anioCredito: number|null, attribution: {commonsFile,commonsUrl,autor,anio}|null }`
  - Arrays are sorted (biblio by `texto`, web by `url`, imagenes by `slug`) for deterministic output.

- [ ] **Step 1: Write the failing test**

`src/lib/sources/extract.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSourcesIndex } from './extract.mjs';

const soberanos = [
  {
    slug: 'recaredo-i', entidad: 'visigodos', img: '/portraits/recaredo-i.webp',
    imgCredit: 'Serie del Prado, 1854.',
    fuentes: ['Thompson, E. A. (1969). Los godos en España.', 'https://dbe.rah.es/biografias/recaredo'],
  },
  {
    slug: 'liuva-ii', entidad: 'visigodos', img: null, imgCredit: null,
    fuentes: ['Thompson, E. A. (1969). Los godos en España.', 'http://dbe.rah.es/biografias/liuva'],
  },
];
const entidades = [
  { slug: 'visigodos', fuentes: ['Thompson, E. A. (1969). Los godos en España.'] },
];
const attributions = [
  { webp: 'recaredo-i.webp', commonsUrl: 'https://commons.wikimedia.org/wiki/File:Recaredo_I.jpg',
    commonsFile: 'File:Recaredo_I.jpg', autor: 'Serie del Prado', anio: '1854' },
];

test('dedups bibliografia by normalized text and records citadaEn', () => {
  const idx = buildSourcesIndex(soberanos, entidades, attributions);
  assert.equal(idx.bibliografia.length, 1);
  assert.deepEqual(idx.bibliografia[0].citadaEn.sort(), ['liuva-ii', 'recaredo-i', 'visigodos']);
});

test('classifies URLs into web with domain and esHttp', () => {
  const idx = buildSourcesIndex(soberanos, entidades, attributions);
  assert.equal(idx.web.length, 2);
  const liuva = idx.web.find((w) => w.url.includes('liuva'));
  assert.equal(liuva.esHttp, true);
  assert.equal(liuva.dominio, 'dbe.rah.es');
});

test('imagenes: only entries with img, cross-joined to attribution + year', () => {
  const idx = buildSourcesIndex(soberanos, entidades, attributions);
  assert.equal(idx.imagenes.length, 1);
  const img = idx.imagenes[0];
  assert.equal(img.slug, 'recaredo-i');
  assert.equal(img.anioCredito, 1854);
  assert.equal(img.attribution.commonsFile, 'File:Recaredo_I.jpg');
});

test('imagenes: img with no attribution row → attribution null', () => {
  const idx = buildSourcesIndex(
    [{ slug: 'x', entidad: 'y', img: '/portraits/x.webp', imgCredit: 'anon', fuentes: ['a'] }], [], []);
  assert.equal(idx.imagenes[0].attribution, null);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/lib/sources/extract.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

`src/lib/sources/extract.mjs`:
```js
import { extractYear } from '../../../scripts/validate/year.mjs';

/** @typedef {import('./parse-attributions.mjs').AttributionRow} AttributionRow */

const URL_RE = /https?:\/\/[^\s)]+/i;

function normText(s) {
  return s.trim().replace(/\s+/g, ' ').toLowerCase();
}
function basename(p) {
  return p.slice(p.lastIndexOf('/') + 1);
}

/**
 * @param {{slug:string,entidad:string,img:string|null,imgCredit:string|null,fuentes:string[]}[]} soberanos
 * @param {{slug:string,fuentes:string[]}[]} entidades
 * @param {AttributionRow[]} attributions
 */
export function buildSourcesIndex(soberanos, entidades, attributions) {
  const biblio = new Map(); // key → { key, texto, citadaEn:Set }
  const web = new Map();    // url → { url, dominio, esHttp, citadaEn:Set }

  const addFuente = (slug, fuente) => {
    const url = fuente.match(URL_RE)?.[0];
    if (url) {
      if (!web.has(url)) {
        web.set(url, { url, dominio: new URL(url).hostname, esHttp: url.startsWith('http://'), citadaEn: new Set() });
      }
      web.get(url).citadaEn.add(slug);
    } else {
      const key = normText(fuente);
      if (!biblio.has(key)) biblio.set(key, { key, texto: fuente.trim(), citadaEn: new Set() });
      biblio.get(key).citadaEn.add(slug);
    }
  };

  for (const s of soberanos) for (const f of s.fuentes) addFuente(s.slug, f);
  for (const e of entidades) for (const f of e.fuentes) addFuente(e.slug, f);

  const attrByWebp = new Map(attributions.map((r) => [r.webp, r]));
  const imagenes = soberanos
    .filter((s) => s.img != null)
    .map((s) => {
      const row = attrByWebp.get(basename(s.img)) ?? null;
      return {
        slug: s.slug,
        entidad: s.entidad,
        webp: s.img,
        imgCredit: s.imgCredit ?? null,
        anioCredito: extractYear(s.imgCredit),
        attribution: row
          ? { commonsFile: row.commonsFile, commonsUrl: row.commonsUrl, autor: row.autor, anio: row.anio }
          : null,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const bibliografia = [...biblio.values()]
    .map((b) => ({ key: b.key, texto: b.texto, citadaEn: [...b.citadaEn].sort() }))
    .sort((a, b) => a.texto.localeCompare(b.texto));
  const webArr = [...web.values()]
    .map((w) => ({ url: w.url, dominio: w.dominio, esHttp: w.esHttp, citadaEn: [...w.citadaEn].sort() }))
    .sort((a, b) => a.url.localeCompare(b.url));

  return { bibliografia, web: webArr, imagenes };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test src/lib/sources/extract.test.mjs`
Expected: PASS — 4 tests.

- [ ] **Step 5: Run the whole suite**

Run: `npm test`
Expected: PASS — year + parse-attributions + extract all green.

- [ ] **Step 6: Commit**

```bash
git add src/lib/sources/extract.mjs src/lib/sources/extract.test.mjs
git commit -m "feat(sources): build SourcesIndex from entries + attributions (pure)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: `load.mjs` + `sources.json.js` endpoint → `dist/sources.json`

**Files:**
- Create: `src/lib/sources/load.mjs`
- Create: `src/pages/sources.json.js`

**Interfaces:**
- Consumes: `buildSourcesIndex` (Task 4), `parseAttributions` (Task 3), `getCollection('soberanos'|'entidades')`.
- Produces: `loadSourcesIndex(): Promise<SourcesIndex>`; the build emits `dist/sources.json` shaped `{ generatedAt, ...SourcesIndex }`.

- [ ] **Step 1: Write the adapter**

`src/lib/sources/load.mjs`:
```js
import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';
import { buildSourcesIndex } from './extract.mjs';
import { parseAttributions } from './parse-attributions.mjs';

export async function loadSourcesIndex() {
  const soberanos = (await getCollection('soberanos')).map((e) => ({
    slug: e.data.slug,
    entidad: e.data.entidad,
    img: e.data.img,
    imgCredit: e.data.imgCredit ?? null,
    fuentes: e.data.fuentes,
  }));
  const entidades = (await getCollection('entidades')).map((e) => ({
    slug: e.data.slug,
    fuentes: e.data.fuentes,
  }));
  const attributions = parseAttributions(readFileSync('public/portraits/ATTRIBUTIONS.md', 'utf8'));
  return buildSourcesIndex(soberanos, entidades, attributions);
}
```

- [ ] **Step 2: Write the endpoint**

`src/pages/sources.json.js`:
```js
import { loadSourcesIndex } from '../lib/sources/load.mjs';

export async function GET() {
  const index = await loadSourcesIndex();
  const body = JSON.stringify({ generatedAt: new Date().toISOString(), ...index }, null, 2);
  return new Response(body, { headers: { 'Content-Type': 'application/json' } });
}
```

- [ ] **Step 3: Build and verify the artifact exists**

Run: `npm run build`
Expected: build succeeds, no network, no Zod errors.

Run: `test -f dist/sources.json && echo OK`
Expected: `OK`

- [ ] **Step 4: Verify the index counts match the repo**

Run:
```bash
node -e "const d=require('./dist/sources.json'); console.log('imagenes', d.imagenes.length, '| web', d.web.length, '| biblio', d.bibliografia.length);"
```
Expected: `imagenes 138 | web` ~75 `| biblio` (some hundreds). The key assertion: **`imagenes` is 138** (one per portrait) and `web` is non-empty.

- [ ] **Step 5: Spot-check one image cross-join**

Run:
```bash
node -e "const d=require('./dist/sources.json'); const r=d.imagenes.find(i=>i.slug==='recaredo-i'); console.log(JSON.stringify(r,null,2));"
```
Expected: `attribution.commonsFile` is a `File:...` string (not null), `webp` is `/portraits/recaredo-i.webp`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/sources/load.mjs src/pages/sources.json.js
git commit -m "feat(sources): emit dist/sources.json from getCollection (offline)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: `fuentes.astro` — austere `/fuentes` page (3 sections)

**Files:**
- Create: `src/pages/fuentes.astro`

**Interfaces:**
- Consumes: `loadSourcesIndex` (Task 5), `Layout` (`title` required).
- Produces: a static `/fuentes/` page listing the three blocks; each web/biblio entry shows its `citadaEn` fichas.

- [ ] **Step 1: Write the page**

`src/pages/fuentes.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import { loadSourcesIndex } from '../lib/sources/load.mjs';

const { bibliografia, web, imagenes } = await loadSourcesIndex();
const conAttr = imagenes.filter((i) => i.attribution);
---

<Layout title="Fuentes — darasa" description="Índice consolidado de fuentes bibliográficas, enlaces web e imágenes de darasa.">
  <main class="fuentes">
    <h1>Fuentes</h1>
    <p>Índice generado automáticamente desde el contenido. No editar a mano.</p>

    <section>
      <h2>Bibliografía <small>({bibliografia.length})</small></h2>
      <ul>
        {bibliografia.map((b) => (
          <li>
            <span>{b.texto}</span>
            <small> — citada en: {b.citadaEn.join(', ')}</small>
          </li>
        ))}
      </ul>
    </section>

    <section>
      <h2>Enlaces web <small>({web.length})</small></h2>
      <ul>
        {web.map((w) => (
          <li>
            <a href={w.url} rel="noopener noreferrer" target="_blank">{w.url}</a>
            <small> [{w.dominio}] — citada en: {w.citadaEn.join(', ')}</small>
          </li>
        ))}
      </ul>
    </section>

    <section>
      <h2>Imágenes y atribuciones <small>({conAttr.length})</small></h2>
      <ul>
        {conAttr.map((i) => (
          <li>
            <a href={`/hispania/soberanos/${i.slug}`}>{i.slug}</a>
            {' — '}
            {i.attribution.commonsUrl
              ? <a href={i.attribution.commonsUrl} rel="noopener noreferrer" target="_blank">{i.attribution.commonsFile}</a>
              : <span>{i.attribution.commonsFile}</span>}
            {i.attribution.anio ? <small> ({i.attribution.anio})</small> : null}
          </li>
        ))}
      </ul>
    </section>
  </main>
</Layout>

<style>
  .fuentes { max-width: 70ch; margin: 0 auto; padding: 2rem 1rem; }
  .fuentes section { margin-block: 2rem; }
  .fuentes li { margin-block: 0.4rem; }
  .fuentes small { opacity: 0.7; }
</style>
```

Note: the soberano URL pattern is `/hispania/soberanos/<slug>` — confirm against `src/pages/hispania/soberanos/[slug].astro` before finalizing; adjust the `href` if the route differs.

- [ ] **Step 2: Build and verify the page renders**

Run: `npm run build`
Expected: build succeeds.

Run: `test -f dist/fuentes/index.html && grep -c '<section>' dist/fuentes/index.html`
Expected: file exists; `3` sections.

- [ ] **Step 3: Commit**

```bash
git add src/pages/fuentes.astro
git commit -m "feat(sources): austere /fuentes page (bibliografía, web, imágenes)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: `report.mjs` — findings → grouped report

**Files:**
- Create: `scripts/validate/report.mjs`
- Test: `scripts/validate/report.test.mjs`

**Interfaces:**
- Consumes: `Finding[]` (canonical shape from Global Constraints).
- Produces:
  - `formatReport(findings, opts?): { text, hasError, errors, warnings, findings }` — groups by `slug` (`'(sin ficha)'` when null); `hasError` true iff any `severity==='error'`.
  - `toJson(findings): string`

- [ ] **Step 1: Write the failing test**

`scripts/validate/report.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatReport, toJson } from './report.mjs';

const findings = [
  { slug: 'recaredo-i', type: 'missing_file', severity: 'error', detail: 'File:Foo.jpg' },
  { slug: 'recaredo-i', type: 'date_warning', severity: 'warning', detail: 'credit≈1500 vs commons≈1797' },
  { slug: 'liuva-ii', type: 'http_warning', severity: 'warning', detail: 'https://x' },
];

test('hasError true when any error present', () => {
  assert.equal(formatReport(findings).hasError, true);
});
test('hasError false with only warnings', () => {
  assert.equal(formatReport(findings.slice(1)).hasError, false);
});
test('groups by ficha', () => {
  const { text } = formatReport(findings, { title: 't' });
  assert.match(text, /## recaredo-i/);
  assert.match(text, /## liuva-ii/);
  assert.match(text, /missing_file/);
});
test('toJson round-trips', () => {
  assert.deepEqual(JSON.parse(toJson(findings)).findings.length, 3);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/validate/report.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

`scripts/validate/report.mjs`:
```js
/**
 * @typedef {Object} Finding
 * @property {string|null} slug
 * @property {string} type
 * @property {'error'|'warning'} severity
 * @property {string} detail
 * @property {string} [lastChecked]
 */

/**
 * @param {Finding[]} findings
 * @param {{title?:string}} [opts]
 */
export function formatReport(findings, opts = {}) {
  const errors = findings.filter((f) => f.severity === 'error');
  const warnings = findings.filter((f) => f.severity === 'warning');
  const byFicha = new Map();
  for (const f of findings) {
    const key = f.slug || '(sin ficha)';
    if (!byFicha.has(key)) byFicha.set(key, []);
    byFicha.get(key).push(f);
  }
  let text = `# ${opts.title || 'validation'}\n${errors.length} error(s), ${warnings.length} warning(s)\n\n`;
  for (const [ficha, items] of [...byFicha.entries()].sort()) {
    text += `## ${ficha}\n`;
    for (const it of items) {
      text += `  [${it.severity}] ${it.type}: ${it.detail}`;
      if (it.lastChecked) text += ` (last: ${it.lastChecked})`;
      text += '\n';
    }
    text += '\n';
  }
  return { text, hasError: errors.length > 0, errors, warnings, findings };
}

/** @param {Finding[]} findings */
export function toJson(findings) {
  return JSON.stringify({ findings }, null, 2);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/validate/report.test.mjs`
Expected: PASS — 4 tests.

- [ ] **Step 5: Commit**

```bash
git add scripts/validate/report.mjs scripts/validate/report.test.mjs
git commit -m "feat(validate): report formatter grouped by ficha

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: `cache.mjs` — refs cache with TTL

**Files:**
- Create: `scripts/validate/cache.mjs`
- Test: `scripts/validate/cache.test.mjs`

**Interfaces:**
- Produces:
  - `loadCache(path?): Record<string, {status, checkedAt:number, ...}>`
  - `saveCache(cache, path?): void`
  - `isFresh(entry, now?, ttlMs?): boolean` — true iff `entry.checkedAt` within `ttlMs` (default 7 days).

- [ ] **Step 1: Write the failing test**

`scripts/validate/cache.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isFresh } from './cache.mjs';

const DAY = 24 * 60 * 60 * 1000;

test('fresh within ttl', () => {
  assert.equal(isFresh({ checkedAt: 1000 }, 1000 + DAY, 7 * DAY), true);
});
test('stale beyond ttl', () => {
  assert.equal(isFresh({ checkedAt: 1000 }, 1000 + 8 * DAY, 7 * DAY), false);
});
test('missing entry is not fresh', () => {
  assert.equal(isFresh(undefined), false);
  assert.equal(isFresh({}), false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/validate/cache.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

`scripts/validate/cache.mjs`:
```js
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const DEFAULT_PATH = '.cache/validate-refs.json';
const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000;

export function loadCache(path = DEFAULT_PATH) {
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return {};
  }
}

export function saveCache(cache, path = DEFAULT_PATH) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(cache, null, 2));
}

export function isFresh(entry, now = Date.now(), ttlMs = DEFAULT_TTL) {
  return Boolean(entry && typeof entry.checkedAt === 'number' && now - entry.checkedAt < ttlMs);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/validate/cache.test.mjs`
Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add scripts/validate/cache.mjs scripts/validate/cache.test.mjs
git commit -m "feat(validate): refs cache with TTL freshness

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: `validate:links` — offline checks

**Files:**
- Create: `scripts/validate/links.mjs`
- Test: `scripts/validate/links.test.mjs`
- Modify: `package.json` (add `"validate:links"`)

**Interfaces:**
- Consumes: `dist/sources.json`; `public/portraits/` listing; `formatReport` (Task 7).
- Produces: `checkLinks(index, portraitsOnDisk: Set<string>): Finding[]` (pure). CLI exits `1` on error, `2` if `dist/sources.json` missing, `0` otherwise.

- [ ] **Step 1: Write the failing test**

`scripts/validate/links.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkLinks } from './links.mjs';

const index = {
  bibliografia: [],
  web: [
    { url: 'http://dbe.rah.es/x', dominio: 'dbe.rah.es', esHttp: true, citadaEn: ['liuva-ii'] },
    { url: 'https://dbe.rah.es/y', dominio: 'dbe.rah.es', esHttp: false, citadaEn: ['recaredo-i'] },
  ],
  imagenes: [
    { slug: 'recaredo-i', entidad: 'visigodos', webp: '/portraits/recaredo-i.webp', imgCredit: 'x',
      anioCredito: 1854, attribution: { commonsFile: 'File:R.jpg', commonsUrl: 'u', autor: 'a', anio: '1854' } },
    { slug: 'ghost', entidad: 'v', webp: '/portraits/ghost.webp', imgCredit: null, anioCredito: null,
      attribution: null },
  ],
};

test('missing local file + missing attribution + missing credit for ghost', () => {
  const disk = new Set(['recaredo-i.webp']); // ghost.webp absent
  const f = checkLinks(index, disk);
  const types = f.filter((x) => x.slug === 'ghost').map((x) => x.type).sort();
  assert.deepEqual(types, ['missing_attribution', 'missing_credit', 'missing_local_file']);
});

test('http url emits warning under the citing ficha', () => {
  const f = checkLinks(index, new Set(['recaredo-i.webp', 'ghost.webp']));
  const http = f.find((x) => x.type === 'http_not_https');
  assert.equal(http.severity, 'warning');
  assert.equal(http.slug, 'liuva-ii');
});

test('orphan portrait on disk not referenced', () => {
  const f = checkLinks(index, new Set(['recaredo-i.webp', 'ghost.webp', 'stray.webp']));
  assert.ok(f.some((x) => x.type === 'orphan_portrait' && x.detail === 'stray.webp'));
});

test('clean index → no errors', () => {
  const clean = { bibliografia: [], web: [], imagenes: [
    { slug: 'r', entidad: 'v', webp: '/portraits/r.webp', imgCredit: 'c', anioCredito: 1, attribution: { commonsFile: 'File:R', commonsUrl: 'u', autor: 'a', anio: '1' } },
  ] };
  const f = checkLinks(clean, new Set(['r.webp']));
  assert.equal(f.filter((x) => x.severity === 'error').length, 0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/validate/links.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

`scripts/validate/links.mjs`:
```js
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/validate/links.test.mjs`
Expected: PASS — 4 tests.

- [ ] **Step 5: Add the npm script and run it end-to-end**

In `package.json` `"scripts"`, add: `"validate:links": "node scripts/validate/links.mjs"`.

Run: `npm run build && npm run validate:links`
Expected: report prints `0 error(s)` (today's repo is 1:1 clean). Exit code `0`. There may be `http_not_https` warnings (the 5 `http://` cases) — that's expected and non-fatal.

- [ ] **Step 6: Commit**

```bash
git add scripts/validate/links.mjs scripts/validate/links.test.mjs package.json
git commit -m "feat(validate): offline link-integrity check (validate:links)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: `validate:refs` — online checks

**Files:**
- Create: `scripts/validate/refs.mjs`
- Test: `scripts/validate/refs.test.mjs`
- Modify: `package.json` (add `"validate:refs"` and `"validate:deploy"`)

**Interfaces:**
- Consumes: `dist/sources.json`; `extractYear` (Task 2); `cache` (Task 8); `formatReport` (Task 7).
- Produces (pure, testable):
  - `classifyHttp(status: number|null): Finding|null` — 404/410→error; 403/429/5xx/null→warning; 2xx/3xx→null; other→warning.
  - `classifyCommons(info: {missing:boolean}|null): {severity,type}|null` — missing/absent→error `missing_file`.
  - `classifyDate(imgCredit: string|null, commonsDateRaw: string|null): {severity,type,detail}|null`.
  - Network helpers `fetchStatus(url, opts)` and `commonsBatch(files, opts)` accept an injectable `fetchImpl` for testing.
  - CLI: `--refresh` ignores cache; `--json` prints `toJson`. Exits `1` only on ERROR findings, `2` if index missing.

- [ ] **Step 1: Write the failing test (pure classifiers + injectable fetch)**

`scripts/validate/refs.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classifyHttp, classifyCommons, classifyDate, fetchStatus } from './refs.mjs';

test('classifyHttp severity mapping', () => {
  assert.equal(classifyHttp(200), null);
  assert.equal(classifyHttp(301), null);
  assert.deepEqual(classifyHttp(404), { severity: 'error', type: 'http_error' });
  assert.deepEqual(classifyHttp(410), { severity: 'error', type: 'http_error' });
  assert.deepEqual(classifyHttp(403), { severity: 'warning', type: 'http_warning' });
  assert.deepEqual(classifyHttp(429), { severity: 'warning', type: 'http_warning' });
  assert.deepEqual(classifyHttp(500), { severity: 'warning', type: 'http_warning' });
  assert.deepEqual(classifyHttp(null), { severity: 'warning', type: 'timeout' });
});

test('classifyCommons flags missing', () => {
  assert.equal(classifyCommons({ missing: false }), null);
  assert.deepEqual(classifyCommons({ missing: true }), { severity: 'error', type: 'missing_file' });
  assert.deepEqual(classifyCommons(null), { severity: 'error', type: 'missing_file' });
});

test('classifyDate: clear 1500 vs 1797 warns', () => {
  const r = classifyDate('Pintura, 1500.', '1797');
  assert.equal(r.severity, 'warning');
  assert.equal(r.type, 'date_warning');
});

test('classifyDate: ambiguous credit → null', () => {
  assert.equal(classifyDate('c. 1500', '1797'), null);
  assert.equal(classifyDate('1850', null), null);
});

test('fetchStatus returns status via injected fetch', async () => {
  const fakeFetch = async () => ({ status: 404 });
  assert.equal(await fetchStatus('https://x', { fetchImpl: fakeFetch }), 404);
});

test('fetchStatus returns null on thrown network error after retries', async () => {
  const fakeFetch = async () => { throw new Error('boom'); };
  assert.equal(await fetchStatus('https://x', { fetchImpl: fakeFetch, retries: 1, timeoutMs: 50 }), null);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/validate/refs.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

`scripts/validate/refs.mjs`:
```js
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/validate/refs.test.mjs`
Expected: PASS — classifiers + injected-fetch tests all green.

- [ ] **Step 5: Add scripts and run it live (network)**

In `package.json` `"scripts"`, add:
```jsonc
"validate:refs":   "node scripts/validate/refs.mjs",
"validate:deploy": "npm run build && npm run validate:links && npm run validate:refs"
```

Run: `npm run build && npm run validate:refs`
Expected: hits Commons (~3 requests) + ~75 URLs; prints a report. On today's repo, ideally `0 error(s)`; any `http_warning`/`timeout` are non-fatal. A real `missing_file` would exit `1` and is actionable.

- [ ] **Step 6: Verify cache was written and second run is fast**

Run: `test -f .cache/validate-refs.json && echo cached`
Expected: `cached`.

Run: `npm run validate:refs` (second time)
Expected: noticeably faster (cache hits); same verdict.

- [ ] **Step 7: Commit**

```bash
git add scripts/validate/refs.mjs scripts/validate/refs.test.mjs package.json
git commit -m "feat(validate): online reference check with cache (validate:refs)

Conservative severity: Commons missing + HTTP 404/410 = error; 403/429/5xx and
timeouts = warning; year mismatch >50y = warning. --refresh bypasses cache.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 11: GitHub Actions — weekly refs check + stable issue

**Files:**
- Create: `.github/workflows/validate-refs.yml`

**Interfaces:**
- Consumes: `npm run build`, `npm run validate:refs -- --refresh --json`.
- Produces: a weekly run that opens/updates a single issue titled "Referencias caídas" on ERROR, closes it when clean.

- [ ] **Step 1: Write the workflow**

`.github/workflows/validate-refs.yml`:
```yaml
name: validate-refs

on:
  schedule:
    - cron: '17 6 * * 1'   # Mondays 06:17 UTC
  workflow_dispatch:

permissions:
  contents: read
  issues: write

jobs:
  validate-refs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '24'

      - run: npm ci

      - name: Build (offline) — emits dist/sources.json
        run: npm run build

      - name: Restore refs cache
        uses: actions/cache@v4
        with:
          path: .cache
          key: validate-refs-cache

      - name: Run validate:refs (refresh, json)
        id: refs
        run: |
          set +e
          node scripts/validate/refs.mjs --refresh --json > refs-report.json
          echo "exit_code=$?" >> "$GITHUB_OUTPUT"
          set -e

      - name: Open / update / close issue
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = JSON.parse(fs.readFileSync('refs-report.json', 'utf8'));
            const errors = report.findings.filter(f => f.severity === 'error');
            const title = 'Referencias caídas';
            const { data: issues } = await github.rest.issues.listForRepo({
              owner: context.repo.owner, repo: context.repo.repo,
              state: 'open', labels: 'validate-refs',
            });
            const existing = issues.find(i => i.title === title);
            const today = new Date().toISOString().slice(0, 10);

            if (errors.length === 0) {
              if (existing) {
                await github.rest.issues.createComment({
                  owner: context.repo.owner, repo: context.repo.repo,
                  issue_number: existing.number, body: `Resuelto en ${today}. Cerrando.`,
                });
                await github.rest.issues.update({
                  owner: context.repo.owner, repo: context.repo.repo,
                  issue_number: existing.number, state: 'closed',
                });
              }
              return;
            }

            // Group by ficha.
            const byFicha = {};
            for (const f of errors) {
              const k = f.slug || '(sin ficha)';
              (byFicha[k] ??= []).push(f);
            }
            let body = `Comprobación semanal de referencias — ${today}\n\n`;
            for (const [ficha, items] of Object.entries(byFicha).sort()) {
              body += `### ${ficha}\n`;
              for (const it of items) body += `- \`${it.type}\`: ${it.detail}\n`;
              body += '\n';
            }
            body += `\nReproducir en local:\n\n\`\`\`\nnpm run build && npm run validate:refs\n\`\`\`\n`;

            if (existing) {
              await github.rest.issues.update({
                owner: context.repo.owner, repo: context.repo.repo,
                issue_number: existing.number, body,
              });
            } else {
              await github.rest.issues.create({
                owner: context.repo.owner, repo: context.repo.repo,
                title, body, labels: ['validate-refs'],
              });
            }

      - name: Fail the job if there were real errors
        if: steps.refs.outputs.exit_code != '0'
        run: |
          echo "validate:refs reported errors (exit ${{ steps.refs.outputs.exit_code }})"
          exit 1
```

- [ ] **Step 2: Validate the YAML locally**

Run: `node -e "const f=require('fs').readFileSync('.github/workflows/validate-refs.yml','utf8'); console.log(f.includes('actions/github-script@v7') && f.includes('issues: write') ? 'OK' : 'MISSING')"`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/validate-refs.yml
git commit -m "ci: weekly validate-refs workflow with stable issue

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 4: Manual smoke after push (out-of-band)**

After this branch is pushed/merged, trigger `workflow_dispatch` from the Actions tab once and confirm: green run when clean; if you temporarily point one `File:` to a bogus title, the run opens the "Referencias caídas" issue. (This step is verification, not code — note the result in the PR.)

---

## Task 12: Document `validate:deploy` in the deploy guide

**Files:**
- Modify: `CLAUDE.md` (project) — add the pre-rsync validation step where the deploy is described.

**Interfaces:**
- Consumes: nothing.
- Produces: the deploy guide tells the operator to run `npm run validate:deploy` before the rsync.

- [ ] **Step 1: Add the deploy gate note**

In `CLAUDE.md`, under the build/deploy description (the `## Stack` section mentions `npm run build` → `dist/` and Herd/rsync), add a short subsection:

```markdown
### Validación pre-deploy

Antes de subir `dist/` por rsync (`darasa@dar`), correr el gate completo:

​```bash
npm run validate:deploy   # build (offline) + validate:links + validate:refs
​```

- `validate:links` (offline) verifica integridad de enlaces internos: que cada `.webp` exista, que tenga fila en `ATTRIBUTIONS.md` con `File:` parseable, y el formato de las URLs (incl. `http→https`).
- `validate:refs` (online) resuelve cada `File:` en Commons y cada URL de `fuentes`. Falla solo con evidencia accionable (Commons `missing`, HTTP 404/410). El resto son warnings.

El check semanal en CI (`.github/workflows/validate-refs.yml`) corre `validate:refs --refresh` y abre/cierra el issue estable «Referencias caídas».
```

(Remove the zero-width space before the triple backticks shown above — they are only to escape the nested fence in this plan.)

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: document validate:deploy pre-rsync gate

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Final verification

- [ ] **Run the full test suite**

Run: `npm test`
Expected: all green (year, parse-attributions, extract, report, cache, links, refs).

- [ ] **Run the full deploy gate**

Run: `npm run validate:deploy`
Expected: build OK; `validate:links` 0 errors; `validate:refs` 0 errors (warnings allowed).

- [ ] **Confirm the page and endpoint**

Run: `test -f dist/sources.json && test -f dist/fuentes/index.html && echo OK`
Expected: `OK`

---

## Self-Review (filled at authoring time)

**Spec coverage:**
- Capa 2 (localizable) → Tasks 10 (Commons missing + HTTP 404/410 = error, conservative warnings) ✓
- Capa 2 (coherencia ligera de año) → Task 2 (`year.mjs`) + Task 10 (`classifyDate`) ✓
- Capa 3 (índice) → Tasks 4–6 (`extract`, endpoint, page), by-type with `citadaEn` ✓
- getCollection único generador → Task 5 (`load.mjs`); no parallel parser, no `yaml` ✓
- build nunca toca red → endpoint is pure; network only in `refs.mjs` ✓
- validadores consumen `dist/sources.json` → Tasks 9, 10 ✓
- `validate:deploy` build-first → Task 10 script + Task 12 docs ✓
- CI issue estable → Task 11 ✓
- Versionar `.webp` → Task 1 ✓
- Cero dependencias → all built-ins; `node:test`, `fetch` ✓

**Placeholder scan:** no TBD/TODO; every code step carries complete code.

**Type consistency:** Finding shape `{slug,type,severity,detail,lastChecked?}` is identical across `report.mjs`, `links.mjs`, `refs.mjs`. `SourcesIndex` keys (`bibliografia`/`web`/`imagenes`) match between `extract.mjs`, `load.mjs`, endpoint, page, and both validators. `extractYear`/`dateCoherence` signatures match between Task 2 and Task 10.
