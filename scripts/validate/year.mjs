const AMBIGUOUS = /\b(c\.|ca\.|circa|s\.|siglo)/i;
const YEAR = /\b(1[0-9]{3}|20[0-2][0-9])\b/g;
const THRESHOLD = 50;

/**
 * @param {string|null|undefined} text
 * @returns {number|null} unambiguous 4-digit year, else null
 */
export function extractYear(text) {
  if (!text || typeof text !== 'string') return null;
  if (AMBIGUOUS.test(text)) return null;
  const years = text.match(YEAR);
  if (!years || years.length !== 1) return null; // 0 or >1 (range) → ambiguous
  return Number(years[0]);
}

/**
 * @param {number|null} creditYear
 * @param {number|null} commonsYear
 * @returns {'warning'|'skip'}
 */
export function dateCoherence(creditYear, commonsYear) {
  if (creditYear == null || commonsYear == null) return 'skip';
  return Math.abs(creditYear - commonsYear) > THRESHOLD ? 'warning' : 'skip';
}
