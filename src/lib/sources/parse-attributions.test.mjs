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
