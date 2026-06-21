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
