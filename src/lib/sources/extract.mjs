import { extractYear } from '../../../scripts/validate/year.mjs';

/** @typedef {import('./parse-attributions.mjs').AttributionRow} AttributionRow */

const URL_RE = /https?:\/\/[^\s)]+/i;

function normText(s) {
  return s.trim().replace(/\s+/g, ' ').toLowerCase();
}
function basename(p) {
  return p.slice(p.lastIndexOf('/') + 1);
}

/**
 * @param {{slug:string,entidad:string,img:string|null,imgCredit:string|null,fuentes:string[]}[]} soberanos
 * @param {{slug:string,fuentes:string[]}[]} entidades
 * @param {AttributionRow[]} attributions
 */
export function buildSourcesIndex(soberanos, entidades, attributions) {
  const biblio = new Map(); // key → { key, texto, citadaEn:Set }
  const web = new Map();    // url → { url, dominio, esHttp, citadaEn:Set }

  const addFuente = (slug, fuente) => {
    const url = fuente.match(URL_RE)?.[0];
    if (url) {
      if (!web.has(url)) {
        web.set(url, { url, dominio: new URL(url).hostname, esHttp: url.startsWith('http://'), citadaEn: new Set() });
      }
      web.get(url).citadaEn.add(slug);
    } else {
      const key = normText(fuente);
      if (!biblio.has(key)) biblio.set(key, { key, texto: fuente.trim(), citadaEn: new Set() });
      biblio.get(key).citadaEn.add(slug);
    }
  };

  for (const s of soberanos) for (const f of s.fuentes) addFuente(s.slug, f);
  for (const e of entidades) for (const f of e.fuentes) addFuente(e.slug, f);

  const attrByWebp = new Map(attributions.map((r) => [r.webp, r]));
  const imagenes = soberanos
    .filter((s) => s.img != null)
    .map((s) => {
      const row = attrByWebp.get(basename(s.img)) ?? null;
      return {
        slug: s.slug,
        entidad: s.entidad,
        webp: s.img,
        imgCredit: s.imgCredit ?? null,
        anioCredito: extractYear(s.imgCredit),
        attribution: row
          ? { commonsFile: row.commonsFile, commonsUrl: row.commonsUrl, autor: row.autor, anio: row.anio }
          : null,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const bibliografia = [...biblio.values()]
    .map((b) => ({ key: b.key, texto: b.texto, citadaEn: [...b.citadaEn].sort() }))
    .sort((a, b) => a.texto.localeCompare(b.texto));
  const webArr = [...web.values()]
    .map((w) => ({ url: w.url, dominio: w.dominio, esHttp: w.esHttp, citadaEn: [...w.citadaEn].sort() }))
    .sort((a, b) => a.url.localeCompare(b.url));

  return { bibliografia, web: webArr, imagenes };
}
