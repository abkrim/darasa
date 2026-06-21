/**
 * @typedef {Object} AttributionRow
 * @property {string} webp
 * @property {string|null} commonsUrl
 * @property {string|null} commonsFile
 * @property {string|null} autor
 * @property {string|null} anio
 */

const ROW = /^\|\s*`([^`]+\.webp)`\s*\|([^|]*)\|([^|]*)\|([^|]*)\|\s*$/;
// Anchor on the markdown link's closing ")" at end of the cell, not on a file
// extension — Commons URLs have no spaces and may end in any extension.
const LINK = /\((https?:\/\/commons\.wikimedia\.org\/wiki\/(File:\S+))\)\s*$/;

/**
 * @param {string} markdown
 * @returns {AttributionRow[]}
 */
export function parseAttributions(markdown) {
  /** @type {AttributionRow[]} */
  const rows = [];
  for (const raw of markdown.split('\n')) {
    const m = ROW.exec(raw.trim());
    if (!m) continue;
    const [, webp, colFile, colAutor, colAnio] = m;
    const link = LINK.exec(colFile);
    const commonsUrl = link ? link[1] : null;
    const commonsFile = link ? decodeURIComponent(link[2]) : null;
    rows.push({
      webp: webp.trim(),
      commonsUrl,
      commonsFile,
      autor: colAutor.trim() || null,
      anio: colAnio.trim() || null,
    });
  }
  return rows;
}
