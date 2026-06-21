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
