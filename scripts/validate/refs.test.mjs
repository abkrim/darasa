import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classifyHttp, classifyCommons, classifyDate, fetchStatus, commonsBatch } from './refs.mjs';

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

test('commonsBatch: detects missing, extracts year, keys by normalized title', async () => {
  const fakeFetch = async () => ({
    json: async () => ({
      query: {
        normalized: [{ from: 'File:Foo_Bar.jpg', to: 'File:Foo Bar.jpg' }],
        pages: {
          '-1': { title: 'File:Foo Bar.jpg', missing: '' },
          '123': { title: 'File:Real Image.jpg', imageinfo: [{ extmetadata: { DateTimeOriginal: { value: '1797' } } }] },
        },
      },
    }),
  });
  const result = await commonsBatch(['File:Foo_Bar.jpg', 'File:Real_Image.jpg'], { fetchImpl: fakeFetch });
  assert.equal(result.get('File:Foo Bar.jpg').missing, true);
  assert.equal(result.get('File:Real Image.jpg').missing, false);
  assert.equal(result.get('File:Real Image.jpg').year, '1797');
});
