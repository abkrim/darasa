# Pieza C — validate-refs + índice de fuentes (design spec)

- **Fecha:** 2026-06-21
- **Estado:** aprobado, pendiente de plan de implementación
- **Memoria asociada:** `feedback_provenance_localizable` (procedencia en 3 capas: anotar / localizable / indexar)
- **Origen:** handoff `.remember/remember.md` — "Pieza C", siguiente paso tras el enriquecimiento nazarí (`ccc863e`)

> Nota de idioma: esta spec narrativa va en español, como el resto de `docs/` del proyecto. Todo el **código** que de aquí salga (identificadores, nombres de scripts, campos, tipos, comentarios, commits, PR) va en **inglés**, según las reglas de idioma del repo.

---

## 1. Problema y objetivo

darasa anota la procedencia de cada fuente (capa 1: `fuentes:` en el frontmatter, `imgCredit:`, filas de `ATTRIBUTIONS.md`), y el schema Zod **obliga** a que `fuentes` exista. Pero el sistema solo comprueba que el campo **existe**, no que **resuelva**. Faltan dos capas:

- **Capa 2 — localizable / verificable (el agujero).** Que el `File:` de Commons resuelva (no `missing`) y que las URLs de `fuentes` devuelvan algo válido. Caso de libro (2026-06-20): 4 fichas de Aragón tenían `File:` anotado pero 3 de 4 nombres estaban inventados → 404 → el retrato cae a placeholder y nadie lo nota. Capa 1 cumplida, capa 2 omitida.
- **Capa 3 — índice agregado.** Hoy las fuentes están dispersas en ~248 `.md` + `ATTRIBUTIONS.md`. No hay vista consolidada ni para el lector ni para un check automatizado.

**Objetivo de la Pieza C:** cerrar las capas 2 y 3 sin romper la separación contenido/presentación ni ralentizar el build local.

### Criterios de éxito (acordados)

1. `npm run build` **nunca toca red**.
2. `validate:links` (offline) pasa rápido y detecta integridad de enlaces internos (rutas, imágenes locales, URLs mal formadas).
3. `validate:refs` (online) usa caché, timeouts y reporte agrupado por ficha, y **falla solo con evidencia accionable** de referencia caída o inválida.
4. Existe un índice `/fuentes` (+ `sources.json`) **generado**, nunca editado a mano.
5. El fallo es **ruidoso** sin depender de memoria humana: issue estable en CI semanal.

---

## 2. Hallazgos del repositorio (estado a 2026-06-21)

- **Contenido:** 248 `.md` de soberanos + 9 `.yaml` de entidades, todos versionados en git.
- **Retratos:** 138 `.webp` en `public/portraits/` ↔ 138 filas `File:` en `ATTRIBUTIONS.md` ↔ 138 frontmatters con `img` → relación **1:1 perfecta** hoy. 110 soberanos llevan `img: null` (placeholder con inicial, legítimo, **no** es error).
- **Dónde vive el `File:` de Commons:** **solo** en las tablas de `ATTRIBUTIONS.md`. El frontmatter solo tiene `img` (ruta local) e `imgCredit` (texto libre). → El validador de imágenes **necesita** parsear `ATTRIBUTIONS.md`.
- **URLs en `fuentes`:** ~75 únicas, casi todas de un puñado de dominios: `dbe.rah.es` (72), `digibug.ugr.es` (4), `historia-hispanica.rah.es` (2). Hallazgo de paso: **5 usan `http://`** en vez de `https://`.
- **Bibliografía:** la mayoría de `fuentes` son texto libre sin URL (`"Hillgarth, J. N. (1978). The Spanish Kingdoms…"`). No resoluble por red, solo por forma.
- **Versionado:** `ATTRIBUTIONS.md` está trackeado; los `.webp` **no** (gitignored vía `public/portraits/*`). **Peso total de los `.webp`: 2.4 MB** (138 ficheros, media ~17 KB, máx 36 KB). `.git` actual: 2.9 MB.
- **Infra:** remote GitHub `abkrim/darasa`. **No hay `.github/`** todavía. Deploy = rsync manual de `dist/` como `darasa@dar` (desacoplado de GitHub). Node v24 (→ `fetch`, `node:test` y type-stripping de TS nativos; **cero dependencias nuevas**).

---

## 3. Decisiones de diseño (con su porqué)

1. **`getCollection` es el generador único del índice.** Un parser de `.md`/`.yaml` paralelo duplicaría la semántica de Astro, podría desviarse del schema Zod y rompería el "nunca a mano". El índice se construye **desde la fuente canónica** validada por Zod. → No se añade la dependencia `yaml`; no hay `build-index.mjs` ni `src/data/sources.json`.
2. **Los validadores consumen `dist/sources.json`.** El contrato entre generación y validación es un JSON, emitido por Astro en build (offline). `validate:deploy` construye **antes** de validar.
3. **`npm run build` nunca toca red.** La construcción del índice es pura (frontmatter + `ATTRIBUTIONS.md`). La verificación por red vive en `validate:refs`, explícito y separado.
4. **Severidad online conservadora.** Solo evidencia dura de inexistencia (`missing` de Commons, HTTP 404/410) es ERROR. 403/429/5xx/timeout son transitorios/no concluyentes → WARNING. Un 500 de RAH no prueba que la fuente esté mal; un 404 sí.
5. **CI semanal revalida de verdad.** Con cron semanal + TTL de caché de 7 días se podría reutilizar caché y no comprobar nada. CI usa `--refresh` (ignora caché). La caché existe para no machacar servicios en runs locales, no para saltarse el chequeo.
6. **Versionar los `.webp`.** Con 2.4 MB el coste es irrelevante y el beneficio es real: `validate:links` corre completo en local **y** en CI, build reproducible, cero asimetría, y doble red para el caso Aragón también en CI (físico + Commons). Se quita `public/portraits/*` de `.gitignore`.
7. **Aviso ruidoso = issue estable.** Un run rojo es efímero y se ignora. Un issue persiste y es accionable. Solo `GITHUB_TOKEN` con `issues: write`; sin Telegram ni PAT en v1.

---

## 4. Arquitectura y flujo de datos

```
Astro build (offline):
  getCollection('soberanos' | 'entidades')  ─┐
  parse-attributions.ts                       │   (lee public/portraits/ATTRIBUTIONS.md)
                                               ▼
                         src/lib/sources/extract.ts   ← PURO, Astro-agnóstico
                                               ▼       (recibe entries + attributions ya normalizados)
                                        SourcesIndex
                                          ├─► src/pages/fuentes.astro     → dist/fuentes/
                                          └─► src/pages/sources.json.ts   → dist/sources.json

validate:links (offline)  ─┐
validate:refs  (online)    ─┴─ consumen dist/sources.json  (+ public/portraits/ para el check físico)
```

- **`extract.ts` es puro:** recibe `entries` (de `getCollection`) + `attributions` (filas ya parseadas) → devuelve `SourcesIndex`. No toca disco ni red. Testeable en aislamiento.
- **`parse-attributions.ts`** es un lector auxiliar pequeño y acotado para `ATTRIBUTIONS.md` (tabla markdown → filas). `ATTRIBUTIONS.md` **no** es content collection y es el único sitio donde vive el `File:`; parsearlo no duplica Zod ni el contenido canónico.
- **Tolerancia a fallos en build:** ante un `img` sin fila de atribución, `extract.ts` registra `attribution: null` (no lanza). El build sigue verde; la incidencia la marca `validate:links`. El build no falla nunca por integridad de referencias.

---

## 5. Contrato de datos (`sources.json`)

Forma orientativa (los nombres exactos se afinan en implementación, pero la estructura es ésta):

```jsonc
{
  "generatedAt": "2026-06-21T10:00:00.000Z",   // stamp en build (Node normal, sin red)
  "bibliografia": [
    {
      "key": "<texto normalizado para dedup>",
      "texto": "Hillgarth, J. N. (1978). The Spanish Kingdoms 1250-1516. Vol. 2. Clarendon Press.",
      "citadaEn": ["fernando-ii-aragon", "..."]     // slugs de fichas
    }
  ],
  "web": [
    {
      "url": "https://dbe.rah.es/biografias/...",
      "dominio": "dbe.rah.es",
      "esHttp": false,                              // true → WARNING en links (http→https)
      "citadaEn": ["..."]
    }
  ],
  "imagenes": [
    {
      "slug": "fernando-ii-aragon",
      "entidad": "aragon",
      "webp": "/portraits/fernando-ii-aragon.webp",
      "imgCredit": "Grabado de Manuel Rodríguez, 1797 (serie de reyes de España)...",
      "anioCredito": 1797,                          // null si ambiguo (circa/siglo/rango/vacío)
      "attribution": {                              // de ATTRIBUTIONS.md; null si no hay fila
        "commonsFile": "File:Fernando_II...jpg",
        "commonsUrl": "https://commons.wikimedia.org/wiki/File:Fernando_II...jpg",
        "autor": "...",
        "anio": "1797"
      }
    }
  ]
}
```

- El índice generado en build **no** lleva estados de red (build offline). Los estados (`ok`/`broken`/`warning`) viven en `.cache/validate-refs.json`, producidos por `validate:refs`.
- La página `/fuentes` muestra el "último estado" **best-effort**: si `.cache/validate-refs.json` existe en build, lo mergea; si no, omite el estado. No es crítico para v1.
- **Clasificación pragmática:** toda cadena de `fuentes` con URL → bloque `web`; sin URL → `bibliografia`; Commons/imágenes → `imagenes`. Si en el futuro hace falta más precisión, se añade metadato estructurado (fuera de v1).

---

## 6. Reglas de validación

### `validate:links` (offline) — corre en local y CI

| Check | Severidad | Tipo |
|-------|-----------|------|
| `img` apunta a `.webp` que no existe en `public/portraits/` | **ERROR** | `missing_local_file` |
| `img` sin fila correspondiente en `ATTRIBUTIONS.md` | **ERROR** | `missing_attribution` |
| Fila de `ATTRIBUTIONS.md` sin `File:` parseable | **ERROR** | `unparseable_attribution` |
| `.webp` en disco sin frontmatter ni fila que lo use (huérfano) | WARNING | `orphan_portrait` |
| URL en `fuentes` malformada (no parseable) | **ERROR** | `malformed_url` |
| URL en `fuentes` con `http://` | WARNING | `http_not_https` |
| `img` presente sin `imgCredit` | WARNING | `missing_credit` |

Exit ≠ 0 si hay algún ERROR. Sin red. El check físico ahora corre también en CI (los `.webp` están versionados).

### `validate:refs` (online)

| Resultado | Severidad | Tipo |
|-----------|-----------|------|
| Commons `File:` `missing` | **ERROR** | `missing_file` |
| HTTP **404 / 410** | **ERROR** | `http_error` |
| HTTP **403 / 429 / 5xx** | WARNING | `http_warning` |
| timeout / error de red (tras reintentos) | WARNING | `timeout` |
| año claro en `imgCredit` **y** en Commons **y** \|Δ\| > 50 años | WARNING | `date_warning` |
| cualquier lado del año ambiguo (circa, s. XV, rango, vacío) | SKIP | — |

- **Solo `missing_file` y `http_error` (404/410)** ponen el job rojo y abren/mantienen el issue. Los WARNING aparecen en el reporte pero no abren el issue por sí solos.
- **Parseo de año conservador (`year.mjs`):** extrae año solo si hay 4 dígitos sin `c.`/`circa`/`s.`/`siglo`/rango → si no, `null` → SKIP. Validado contra muestras reales: `1797`→1797; `c. 1449`→null; `s. XVII`→null; `1850-1856`→null; vacío→null.
- **Riesgo asumido (date):** Commons puede dar fecha de subida/escaneo/publicación en vez de fecha de obra → por eso el check es WARNING no bloqueante con mensaje explícito `"possible credit/date mismatch, review manually"`.

### Eficiencia y robustez de red

- **Commons:** API batch hasta 50 `titles` por request → 138 `File:` = ~3 requests (`action=query&titles=...&prop=imageinfo&iiprop=url|extmetadata&format=json`). `extmetadata.DateTimeOriginal` para el año. Detección de `missing` por la clave `-1`/`missing` de la respuesta.
- **URLs web:** ~75 únicas; `fetch` con timeout, seguir redirects, `User-Agent` del proyecto (`darasa/1.0 (educational; abdelkarim@aichadigital.es)`). Reintentos (2) con backoff antes de declarar `timeout`.
- **Caché:** `.cache/validate-refs.json` (gitignored, ya en `.gitignore`) con `{ ref → { status, lastChecked } }`, TTL 7d en local. `--refresh` la ignora (uso de CI).

---

## 7. Índice `/fuentes` (capa 3)

Página austera pero presente, generada desde el índice. Tres bloques, cada uno filtrable/enlazable por ficha:

1. **Bibliografía** — strings sin URL, dedup por texto normalizado. Cada entrada: el texto + "citada en: Muhammad I, Boabdil, al-Zagal…".
2. **Enlaces web** — URLs únicas: dominio, URL canónica, fichas que la citan, último estado de `validate:refs` (best-effort si hay caché).
3. **Imágenes y atribuciones** — cruza `img` + `imgCredit` + `ATTRIBUTIONS.md` (`File:` de Commons), para que las imágenes no sean un sistema paralelo opaco.

Objetivo editorial: `/fuentes` no duplica la navegación del atlas; su valor nuevo es ser una **bibliografía consolidada y verificable**. Endpoint `/sources.json` para máquina (lo consumen los validadores).

---

## 8. CI — `.github/workflows/validate-refs.yml`

- Disparadores: `schedule` (cron semanal) + `workflow_dispatch` (manual).
- Pasos: `actions/checkout` → `setup-node@v4` (Node 24) → `npm ci` → `npm run build` (offline; valida que compila y emite `dist/sources.json`) → `npm run validate:refs -- --refresh --json` (con `actions/cache` para `.cache/` como warm-start).
- **Errores reales** (`missing_file` / `http_error`): crear o actualizar **un** issue estable titulado **"Referencias caídas"** vía `actions/github-script` + `GITHUB_TOKEN`; dejar el job **rojo**.
- **Todo verde:** si el issue existe y está abierto → comentar "resuelto en \<fecha\>" y **cerrarlo**.
- **Cuerpo del issue:** agrupado **por ficha** (no por URL cruda): ficha afectada, fuente/imagen rota, tipo (`missing_file` | `http_error` | `http_warning` | `timeout` | `date_warning`), última comprobación, y comando local para reproducir.
- Los WARNING van al reporte/comentario pero **no** mantienen el issue abierto por sí solos.
- Permisos del workflow: `contents: read`, `issues: write`.

---

## 9. Scripts y dependencias

`package.json`:

```jsonc
"build":           "astro build",
"validate:links":  "node scripts/validate/links.mjs",
"validate:refs":   "node scripts/validate/refs.mjs",
"validate:deploy": "npm run build && npm run validate:links && npm run validate:refs",
"test":            "node --test"
```

- Los validadores asumen `dist/sources.json`; si falta, error claro ("ejecuta `npm run build` primero").
- `validate:deploy` = gate pre-rsync, documentado en la guía de despliegue. Corre en local (donde están los `.webp`).
- **Dependencias nuevas: ninguna.** `fetch`, `node:test`, `node:fs` y type-stripping de TS son nativos de Node 24.

---

## 10. Testing (`node:test`, cero deps)

- **`extract.ts`** — entries + attributions de ejemplo → `SourcesIndex` esperado: clasificación URL/biblio, dedup por texto normalizado, cruce `img`/`imgCredit`/attribution, `citadaEn` correcto, `esHttp`.
- **`parse-attributions.ts`** — tabla markdown de ejemplo → filas `{ webp, commonsFile, commonsUrl, autor, anio }`; tolerancia a filas mal formadas.
- **`year.mjs`** — tabla de casos reales: `1797`→1797, `c. 1449`→null, `s. XVII`→null, `1850-1856`→null, ``→null; y la regla de coherencia (pares añoCredito/añoCommons → ERROR/WARNING/SKIP con umbral 50).

---

## 11. Estructura de ficheros

```
src/lib/sources/
  extract.ts            # PURO: entries + attributions → SourcesIndex
  parse-attributions.ts # ATTRIBUTIONS.md → filas {webp, File:, autor, año}
  types.ts              # SourcesIndex, SourceEntry, AttributionRow…
src/pages/
  fuentes.astro         # página austera (3 bloques)
  sources.json.ts       # endpoint → dist/sources.json
scripts/validate/
  links.mjs             # checks offline
  refs.mjs              # checks online (Commons batch + URLs) con caché + --refresh
  report.mjs            # formateo agrupado por ficha (texto legible + --json)
  cache.mjs             # .cache/validate-refs.json (TTL, refresh)
  year.mjs              # parseo conservador de año + regla de coherencia
  *.test.* / src/lib/sources/*.test.*
.github/workflows/validate-refs.yml
```

Cambios fuera de estos ficheros:

- `.gitignore`: quitar `public/portraits/*` (versionar los 138 `.webp`).
- `package.json`: scripts de la §9.
- Guía de despliegue (CLAUDE.md / docs): añadir `npm run validate:deploy` como paso pre-rsync.

---

## 12. Fuera de alcance v1 (YAGNI explícito)

- Coherencia completa autor + título contra Commons (v1 solo año, conservador).
- Notificación por Telegram (el issue basta).
- Metadato estructurado de fuentes (la clasificación por string es suficiente; se añade si hace falta).
- Política de "warning repetido durante varias semanas → tratarlo como deuda editorial / escalar a error" (anotado como posible v2).

---

## 13. Mapa a las 3 capas de procedencia

| Capa | Hoy | Con Pieza C |
|------|-----|-------------|
| 1 — anotar | `fuentes`, `imgCredit`, `ATTRIBUTIONS.md` (Zod obliga a existir) | igual |
| 2 — localizable | **agujero** | `validate:refs`: Commons `missing` + HTTP 404/410 = ERROR; coherencia de año ligera = WARNING |
| 3 — índice agregado | no existe | `/fuentes` + `sources.json` generados desde `getCollection`, consumidos por los validadores |
