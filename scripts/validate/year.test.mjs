import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractYear, dateCoherence } from './year.mjs';

test('extractYear: clean single year', () => {
  assert.equal(extractYear('Grabado de Manuel Rodríguez, 1797 (serie de reyes).'), 1797);
});
test('extractYear: circa is ambiguous', () => {
  assert.equal(extractYear('Medalla de Pisanello, c. 1449. Dominio público.'), null);
});
test('extractYear: "ca." abbreviation is ambiguous', () => {
  assert.equal(extractYear('Retrato anónimo, ca. 1500.'), null);
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
