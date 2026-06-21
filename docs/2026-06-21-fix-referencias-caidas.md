# Reparar referencias caídas — sesión Sonnet

> **Origen:** la Pieza C (`validate:refs`, implementada 2026-06-21) destapó **35 referencias caídas reales** en el corpus: 30 imágenes cuyo `File:` de Commons ya no existe + 5 URLs de la RAH que han migrado de dominio. Todas verificadas contra la API/HTTP (no son falsos positivos). Esta es deuda de **contenido**, no de código: el validador funciona; lo que falla son los datos.
>
> **Objetivo de la sesión:** dejar `npm run build && npm run validate:links && npm run validate:refs` en **0 errores**.

## Reglas que NO se negocian

- **No inventar títulos.** La avería original de Aragón (2026-06-20) vino de poner `File:` inventados. Antes de escribir un `File:` nuevo, **verifícalo contra la API de Commons** (debe devolver `imageinfo`, no `missing`).
- **Coherencia de procedencia.** El `File:` en `public/portraits/ATTRIBUTIONS.md`, el `.webp` local y el `imgCredit` del frontmatter deben describir la **misma obra**. Si el título nuevo es otra obra distinta, hay que re-descargar el `.webp` y actualizar `imgCredit` (autor/año).
- **Atribución obligatoria.** Toda imagen necesita su fila en `ATTRIBUTIONS.md` con enlace al `File:` de Commons + autor + año.
- **Tono historiográfico** (memoria `feedback_historiographic_tone`): factual, sin "Reconquista", epítetos solo canónicos. No aplica a esta tarea salvo que toques prosa, pero respétalo si editas texto.
- **Licencia CC BY-SA 4.0**; imágenes solo de dominio público (anteriores a 1927 o piezas sin protección).

## Procedimiento de imagen (referencia)

El "cómo" detallado (búsqueda Commons, descarga, optimización `sips`+`cwebp`, atribución) ya está en `CLAUDE.md` § "Content workflow → Añadir un soberano" y en `docs/MIGRATION-GUIDE.md`. Comandos clave:

```bash
UA="darasa/1.0 (educational; abdelkarim@aichadigital.es)"

# 1. Buscar el título vivo en Commons (namespace 6 = File)
curl -sG "https://commons.wikimedia.org/w/api.php" -A "$UA" \
  --data-urlencode "action=query" --data-urlencode "list=search" \
  --data-urlencode "srsearch=<nombre del soberano>" \
  --data-urlencode "srnamespace=6" --data-urlencode "srlimit=6" \
  --data-urlencode "format=json"

# 2. VERIFICAR que el título elegido existe (no 'missing')
curl -sG "https://commons.wikimedia.org/w/api.php" -A "$UA" \
  --data-urlencode "action=query" --data-urlencode "titles=File:<exacto>.jpg" \
  --data-urlencode "prop=imageinfo" --data-urlencode "iiprop=url|extmetadata" \
  --data-urlencode "iiurlwidth=500" --data-urlencode "format=json"

# 3. Si hay que re-descargar (obra distinta): descargar thumb → optimizar a webp 240px
curl -fsS -A "$UA" -o public/portraits/<slug>.jpg "<thumburl>"
sips -s format jpeg --resampleWidth 240 public/portraits/<slug>.jpg --out public/portraits/<slug>_240.jpg \
  && cwebp -q 85 -mt public/portraits/<slug>_240.jpg -o public/portraits/<slug>.webp \
  && rm public/portraits/<slug>.jpg public/portraits/<slug>_240.jpg
```

**Dos sub-casos por imagen:**

- **(a) Mismo cuadro, solo renombrado en Commons** (frecuente en la serie del Prado y en los títulos catalán↔castellano): basta **actualizar el `File:`** en `ATTRIBUTIONS.md` al título vivo. El `.webp` local ya es correcto.
- **(b) La obra vieja se borró / es otra**: re-descargar el `.webp` del título vivo (paso 3) **y** actualizar `imgCredit` en el frontmatter del soberano (autor/año de la obra nueva).

Cómo decidir (a) vs (b): compara la miniatura del título nuevo con el `.webp` local (`public/portraits/<slug>.webp`). Misma obra → (a). Distinta → (b).

---

## Parte A — 5 URLs RAH (quick win)

**Patrón:** la RAH movió el *Diccionario Biográfico* de `dbe.rah.es/biografias/<idA>/<slug>` a `historia-hispanica.rah.es/biografias/<idB>-<slug>`. La URL vieja da error; la nueva da 200. **Resolución uniforme:** sigue el redirect y usa la URL final.

```bash
# Para cada URL, la canónica nueva = url_effective del redirect:
curl -sL -o /dev/null -w "%{http_code} %{url_effective}\n" -A "$UA" "<url-vieja>"
```

Tres ya resueltas (verificadas → 200); edita la fila `fuentes:` del frontmatter de la ficha indicada:

| Ficha (`.md`) | URL vieja (en `fuentes:`) | URL nueva (200) |
|---|---|---|
| `al-andalus/hisham-ii.md` | `http://dbe.rah.es/biografias/12047/hisam-ii` | `https://historia-hispanica.rah.es/biografias/22942-hisam-ii` |
| `al-andalus/al-hakam-i.md` | `http://dbe.rah.es/biografias/7920/al-hakam-i` | `https://historia-hispanica.rah.es/biografias/21838-al-hakam-i` |
| `al-andalus/muhammad-iv.md` | `http://dbe.rah.es/biografias/6553/muhammad-iv` | `https://historia-hispanica.rah.es/biografias/31693-muhammad-iv` |

Dos por resolver (mismo método `curl -sL`):

| Ficha (`.md`) | URL vieja | URL nueva |
|---|---|---|
| `al-andalus/al-muzaffar-ibn-al-aftas.md` | `http://dbe.rah.es/biografias/17691/al-muzaffar-b-al-aftas` | *(seguir redirect)* |
| `al-andalus/ali-ibn-yusuf.md` | `http://dbe.rah.es/biografias/6237/ali-b-yusuf-b-tasufin` | *(seguir redirect)* |

> Nota: confirma el slug/carpeta real de cada ficha con `grep -rl "12047/hisam-ii" src/content` etc. — las rutas de arriba son el `citadaEn` del índice; el fichero puede estar en otra sub-entidad.

---

## Parte B — 30 imágenes con `File:` de Commons caído

Mapeo `ficha · .webp · título-viejo-caído`, agrupado por entidad. Para cada una: buscar el título vivo, decidir (a)/(b), actualizar.

### aragon (14) — patrón: títulos en **catalán o castellano acentuado** renombrados

```
alfonso-i-el-batallador  · alfonso-i-el-batallador.webp · File:Alfonso_I_el_Batallador.jpg
alfonso-iii-aragon       · alfonso-iii-aragon.webp      · File:Alfonso_III_de_Aragón.jpg
alfonso-iv-aragon        · alfonso-iv-aragon.webp       · File:Alfonso_IV_de_Aragón.jpg
jaime-i                  · jaime-i.webp                 · File:Jaume_I_de_Catalunya-Aragó.jpg
jaime-ii                 · jaime-ii.webp                · File:Jaume_II_de_Catalunya-Aragó.jpg
juan-i-aragon            · juan-i-aragon.webp           · File:Joan_I_d'Aragó.jpg
martin-i                 · martin-i.webp                · File:Martí_I_l'Humà.jpg
pedro-i-aragon           · pedro-i-aragon.webp          · File:Pedro_I_de_Aragón.jpg
pedro-ii                 · pedro-ii.webp                · File:Pedro_II_de_Aragón.jpg
pedro-iii                · pedro-iii.webp               · File:Pere_III_el_Gran.jpg
pedro-iv                 · pedro-iv.webp                · File:Pere_IV_el_Cerimonós.jpg
petronila                · petronila.webp               · File:Petronila_de_Aragón.jpg
ramiro-i-aragon          · ramiro-i-aragon.webp         · File:Ramiro_I_de_Aragón.jpg
ramiro-ii-el-monje       · ramiro-ii-el-monje.webp      · File:Ramiro_II_de_Aragón.jpg
```

**Golden example (Aragón):** `pedro-iii` tenía `File:Pere_III_el_Gran.jpg` (catalán, caído). Búsqueda `Pere III Gran Aragon` → existe **`File:Pedro III de Aragón.jpg`** (castellano, vivo). Si es la misma obra → caso (a): actualizar el `File:` en ATTRIBUTIONS. Verifícalo siempre con la query `imageinfo` antes de escribirlo.

### leon-castilla (6) — patrón: serie **"(Museo del Prado)"** renombrada

```
alfonso-xi   · alfonso-xi.webp   · File:Alfonso_XI_el_Justiciero,_rey_de_Castilla_y_León_(Museo_del_Prado).jpg
enrique-iii  · enrique-iii.webp  · File:Enrique_III_de_Castilla,_rey_de_Castilla_y_León_(Museo_del_Prado).jpg
juan-ii      · juan-ii.webp      · File:Juan_II_de_Castilla_(Museo_del_Prado).jpg
pedro-i      · pedro-i.webp      · File:Pedro_I_el_Cruel,_rey_de_Castilla_y_León_(Museo_del_Prado).jpg
sancho-iv    · sancho-iv.webp    · File:Sancho_IV_de_Castilla_(Museo_del_Prado).jpg
juana-i      · juana-i.webp      · File:Juan_de_Flandes_-_Joanna_of_Castile_-_KHM_GG_5612.jpg
```

> `juana-i` es caso aparte (no es serie Prado, es Juan de Flandes / KHM Viena). Búsqueda específica `Juana I Castilla Juan de Flandes`.

### reino-portugal (10) — patrón: sufijo inglés **`_of_Portugal`** renombrado a forma portuguesa

```
afonso-vi          · afonso-vi.webp          · File:Afonso_VI_of_Portugal.jpg
carlos-i-portugal  · carlos-i-portugal.webp  · File:Carlos_I_of_Portugal.jpg
joao-iv            · joao-iv.webp            · File:João_IV_of_Portugal.jpg
joao-v             · joao-v.webp             · File:João_V_of_Portugal.jpg
joao-vi            · joao-vi.webp            · File:João_VI_of_Portugal.jpg
jose-i             · jose-i.webp             · File:José_I_of_Portugal.jpg
maria-ii           · maria-ii.webp           · File:Maria_II_of_Portugal.jpg
miguel-i           · miguel-i.webp           · File:Miguel_I_of_Portugal.jpg
pedro-ii-portugal  · pedro-ii-portugal.webp  · File:Pedro_II_of_Portugal.jpg
pedro-iv-portugal  · pedro-iv-portugal.webp  · File:Pedro_I_Brasil.jpg
```

**Golden example (Portugal):** `afonso-vi` tenía `File:Afonso_VI_of_Portugal.jpg` (caído). Búsqueda `Afonso VI Portugal king` → candidatos vivos **`File:AfonsoVIpt.jpg`** y `File:Afonso VI (1643-1683).jpg`. Elige el que coincida con el `.webp` local; verifica con `imageinfo`.

> `pedro-iv-portugal` (= Pedro I de Brasil) tenía `File:Pedro_I_Brasil.jpg`. Búsqueda `Pedro I Brazil emperor` / `Pedro IV Portugal`.

---

## Validación final (obligatoria antes de commit)

```bash
npm run build                 # debe seguir en 0 errores Zod
npm run validate:links        # 0 errores (los webp y ATTRIBUTIONS deben cuadrar 1:1)
npm run validate:refs         # objetivo: 0 errores (warnings de date_warning son aceptables)
```

`validate:refs` es la prueba de fuego: re-resuelve cada `File:` y cada URL contra la red. Si una sigue dando `missing`/404, el título nuevo era incorrecto — vuelve a buscar.

> Para regenerar la lista de caídas en cualquier momento (esta tabla envejece): `npm run build && npm run validate:refs`. La caché vive en `.cache/validate-refs.json`; usa `npm run validate:refs -- --refresh` para forzar revalidación.

## Commit

Mensaje en inglés, agrupar por entidad o un solo commit:

```
fix(content): repair 30 dead Commons File: refs + 5 migrated RAH URLs

Commons titles renamed (catalan/accented, Prado series, _of_Portugal suffix);
RAH moved dbe.rah.es → historia-hispanica.rah.es. All re-verified via API/HTTP;
validate:refs now clean.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```

Deploy (si procede, tras validar): rsync de `dist/` como `darasa@dar` — ver `CLAUDE.md` § "Validación pre-deploy".

---

## Prompt listo para pegar (inicio de sesión Sonnet)

```
Lee docs/2026-06-21-fix-referencias-caidas.md y ejecútalo. Es una tarea de
reparación de contenido en el atlas darasa (Astro): 30 imágenes cuyo File: de
Commons ya no existe + 5 URLs de la RAH migradas de dominio.

Reglas duras: NO inventes títulos de Commons — verifica cada uno con la API
(action=query&prop=imageinfo; debe traer imageinfo, no missing) antes de
escribirlo. Mantén coherentes File: (en public/portraits/ATTRIBUTIONS.md), el
.webp local y el imgCredit del frontmatter: si el título vivo es otra obra,
re-descarga el webp (240px, cwebp q85) y actualiza imgCredit.

Empieza por la Parte A (5 URLs RAH, quick win: sigue el redirect con curl -sL y
usa la url_effective). Luego la Parte B por entidades (aragon 14, leon-castilla
6, reino-portugal 10), usando los golden examples como patrón.

Cierra con: npm run build && npm run validate:links && npm run validate:refs →
debe quedar en 0 errores. Commit en inglés con el footer Co-Authored-By.
Trabaja en una rama feat/fix-refs desde main.
```
