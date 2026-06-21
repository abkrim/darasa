import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';
import { buildSourcesIndex } from './extract.mjs';
import { parseAttributions } from './parse-attributions.mjs';

export async function loadSourcesIndex() {
  const soberanos = (await getCollection('soberanos')).map((e) => ({
    slug: e.data.slug,
    entidad: e.data.entidad,
    img: e.data.img,
    imgCredit: e.data.imgCredit ?? null,
    fuentes: e.data.fuentes,
  }));
  const entidades = (await getCollection('entidades')).map((e) => ({
    slug: e.data.slug,
    fuentes: e.data.fuentes,
  }));
  const attributions = parseAttributions(readFileSync('public/portraits/ATTRIBUTIONS.md', 'utf8'));
  return buildSourcesIndex(soberanos, entidades, attributions);
}
