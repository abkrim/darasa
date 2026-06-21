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
