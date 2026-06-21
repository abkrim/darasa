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

test('handles non-jpg extension and parentheses in title', () => {
  const md = '| `algo.webp` | [Algo (detalle).png](https://commons.wikimedia.org/wiki/File:Algo_(detalle).png) | Autor X | 1900 |';
  const rows = parseAttributions(md);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].commonsFile, 'File:Algo_(detalle).png');
  assert.equal(rows[0].commonsUrl, 'https://commons.wikimedia.org/wiki/File:Algo_(detalle).png');
});

test('row with no Commons link → commonsUrl/commonsFile null', () => {
  const md = '| `no-link.webp` | Obra sin identificar | Anónimo | s. XIV |';
  const rows = parseAttributions(md);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].commonsUrl, null);
  assert.equal(rows[0].commonsFile, null);
  assert.equal(rows[0].autor, 'Anónimo');
  assert.equal(rows[0].anio, 's. XIV');
});
