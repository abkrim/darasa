#!/usr/bin/env node
/*
 * migrate-data-js.mjs
 *
 * Lee scripts/legacy-data.cjs (derivado de reges-hispaniae/assets/data.js)
 * y genera ficheros Markdown en src/content/hispania/soberanos/<entidad>/<slug>.md
 * siguiendo el schema Zod de src/content.config.ts.
 *
 * Uso:
 *   node scripts/migrate-data-js.mjs           # crea los que faltan
 *   node scripts/migrate-data-js.mjs --dry     # no escribe, sólo informa
 *   node scripts/migrate-data-js.mjs --force   # sobrescribe existentes
 *
 * Requisitos: Node 22+.
 */

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

const require = createRequire(import.meta.url);
const legacy = require('./legacy-data.cjs');

const argv = new Set(process.argv.slice(2));
const DRY = argv.has('--dry');
const FORCE = argv.has('--force');

const FUENTES_DEFAULT_VISIGODOS = [
  'Orlandis, J. (2003). Historia del reino visigodo español. Rialp.',
  'Collins, R. (2004). Visigothic Spain 409-711. Blackwell.',
];

function yamlString(s) {
  return `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function convertImgPath(img) {
  if (!img) return 'null';
  const rel = img.replace(/^\.\.\/assets\/portraits\//, '/portraits/');
  return yamlString(rel);
}

function buildMd({ rey, entidad, fuentes }) {
  const lines = ['---'];
  lines.push(`slug: ${rey.slug}`);
  lines.push(`entidad: ${entidad}`);
  lines.push(`id: ${rey.id}`);
  lines.push(`nombre: ${yamlString(rey.nombre)}`);
  if (rey.epiteto) lines.push(`epiteto: ${yamlString(rey.epiteto)}`);
  lines.push(`inicio: ${rey.inicio}`);
  lines.push(`fin: ${rey.fin == null ? 'null' : rey.fin}`);
  if (rey.capital) lines.push(`capital: ${yamlString(rey.capital)}`);
  lines.push(`img: ${convertImgPath(rey.img)}`);
  if (rey.imgCredit) lines.push(`imgCredit: ${yamlString(rey.imgCredit)}`);
  if (Array.isArray(rey.hechos) && rey.hechos.length > 0) {
    lines.push('hechos:');
    for (const h of rey.hechos) {
      lines.push(`  - { k: ${yamlString(h.k)}, v: ${yamlString(h.v)} }`);
    }
  }
  lines.push('fuentes:');
  for (const f of fuentes) lines.push(`  - ${yamlString(f)}`);
  lines.push('---');
  lines.push('');
  lines.push(rey.desc.trim());
  lines.push('');
  return lines.join('\n');
}

function migrate({ entidad, arr, fuentes, outDir }) {
  let written = 0;
  let skipped = 0;
  fs.mkdirSync(outDir, { recursive: true });

  for (const rey of arr) {
    const outPath = path.join(outDir, `${rey.slug}.md`);
    if (fs.existsSync(outPath) && !FORCE) {
      skipped++;
      continue;
    }
    const md = buildMd({ rey, entidad, fuentes });
    if (DRY) {
      console.log(`[dry] ${path.relative(PROJECT_ROOT, outPath)} (${md.length} bytes)`);
    } else {
      fs.writeFileSync(outPath, md);
    }
    written++;
  }
  return { written, skipped };
}

const visigodosResult = migrate({
  entidad: 'visigodos',
  arr: legacy.VISIGODOS,
  fuentes: FUENTES_DEFAULT_VISIGODOS,
  outDir: path.join(PROJECT_ROOT, 'src/content/hispania/soberanos/visigodos'),
});

console.log(
  `Visigodos: ${DRY ? 'simulados' : 'escritos'} ${visigodosResult.written}, saltados ${visigodosResult.skipped} (ya existen)`,
);
