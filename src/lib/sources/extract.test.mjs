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
