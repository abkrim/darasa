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
