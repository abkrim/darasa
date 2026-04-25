# CLAUDE.md — darasa

Atlas histórico educativo de la Península Ibérica. Audiencia primaria Ibrahim (TEA + AACC), secundaria adultos con interés en historia (con foco en Al-Ándalus como parte propia). Licencia **CC BY-SA 4.0**. Atribución Wikimedia en imágenes de dominio público.

**Nota de nomenclatura:** la carpeta, el `package.json`, el dominio local (`darasa.test`) y el dominio de producción (`darasa.es`) usan el slug `darasa`. La marca visible en el sitio dice **darasa** en minúscula, con tagline *"reyes e imperios"*. El nombre anterior "Atlas de Hispania" se mantuvo en el design doc de gstack y puede aparecer en conversaciones, pero la UI actual no lo usa.

## Stack

- **Framework:** Astro v6 con Content Layer API (v5+)
- **Schemas:** Zod en `src/content.config.ts`
- **Contenido:** YAML (entidades) + Markdown con frontmatter (soberanos) en `src/content/hispania/`
- **Estilos:** CSS plano copiado desde el prototipo, sin preprocesador
- **Runtime:** build estático (sin servidor, sin base de datos)
- **TypeScript:** strict
- **Dev local:** `npm run dev` → `http://localhost:4321`
- **Build estático:** `npm run build` → `dist/`
- **Preview build:** Herd sirve `dist/` como `http://darasa.test` (link hecho con `cd dist && herd link darasa`)

## Sistema de diseño

**Antes de cualquier cambio visual o de UI, leer `DESIGN.md` en la raíz del proyecto.**

- Todas las decisiones de paleta, tipografía, espaciado, layout, motion y accesibilidad están definidas ahí.
- Dirección aprobada: **Señales** (plano moderno premium-kids con paleta heráldica saturada).
- No desviarse sin aprobación explícita. Si algo parece ambiguo, leer `DESIGN.md` antes de improvisar.
- Audiencia primaria Ibrahim (TEA + AACC): prioriza claridad, consistencia, `prefers-reduced-motion`.
- En QA/revisión, marcar código que no respete los tokens de `DESIGN.md`.

### Tokens y scripts

- `src/styles/tokens.css` — variables CSS compartidas (paleta, spacing, tipografía, radios, motion)
- `src/styles/base.css` — reset, body, tipografía base, utilidades
- `src/styles/components.css` — header, timeline, cards, ficha, navegación, footer
- `public/scripts/theme.js` — toggle light/dark persistido en `localStorage`, IIFE legacy
- `public/scripts/emblemas.js` — SVG de emblemas dinásticos, expone `window.getEmblemElement(slug, size)`

Los tres CSS se importan en `src/layouts/Layout.astro`. Los JS se sirven con `<script src="/scripts/...js" is:inline></script>`.

## Arquitectura objetivo

```
src/
  content.config.ts           ← schemas Zod (entidades, soberanos)
  content/
    hispania/
      entidades/
        visigodos.yaml        ← una entidad = un YAML; filename (sin .yaml) = id del entry
        al-andalus.yaml
        reino-portugal.yaml
        ...
      soberanos/
        visigodos/recaredo-i.md
        al-andalus/abd-al-rahman-iii.md
        portugal/afonso-henriques.md
  layouts/
    Layout.astro              ← header + footer + fonts, slot central
  pages/
    index.astro               ← timeline maestro (por construir)
    hispania/
      [entidad].astro         ← grid de soberanos (por construir)
      soberanos/
        [slug].astro          ← ficha individual (funcionando)
  styles/ (tokens, base, components)
public/
  portraits/*.webp + ATTRIBUTIONS.md
  scripts/ (theme, emblemas)
  favicon.svg
```

## Backlog

Antes de hacer "mejoras" aleatorias, consultar `BACKLOG.md`. Tiene los 14 hallazgos del audit 2026-04-24 priorizados por severidad (2 High, 6 Medium, 6 Low). El backlog fue redactado contra el prototipo legacy (HTML+JS en `reges-hispaniae/`); al resolver cada item, validar si aplica al stack Astro actual (ver nota en la cabecera de `BACKLOG.md`).

## Content workflow

Reglas para añadir o editar contenido sin romper el sistema. Si el cambio es no trivial, leer también `BACKLOG.md` por si pisa algún item pendiente.

### Convención de slugs

- **URL-safe:** lowercase, sin tildes, con guiones (no espacios, no underscores): `recaredo-i`, `al-andalus`, `liuva-ii`.
- **Mantener tildes en `nombre` y textos visibles:** "Ataúlfo", "Al-Ándalus", "Recaredo I". Los slugs son para URLs/ficheros; los nombres son para humanos.
- **Sufijo ordinal romano en minúscula con guión:** `alfonso-x` (no `alfonso-X`, no `alfonso-x-el-sabio`). El epíteto va en su propio campo `epiteto`.
- **`colorVar` en la entidad** tiene que existir en `src/styles/tokens.css` como `--c-<slug>-ink` + `--c-<slug>-solid` (light + dark). Si no existe, calibrar primero los tokens.

### Añadir un soberano

1. **Identificar la entidad** (visigodos, al-andalus, reino-portugal, …). Si no existe, crear primero su YAML (siguiente sección).
2. **Imagen, si existe retrato en Wikimedia Commons:**
   - Buscar file: `curl -sG "https://commons.wikimedia.org/w/api.php" --data-urlencode "action=query" --data-urlencode "list=search" --data-urlencode "srsearch=<nombre>" --data-urlencode "srnamespace=6" --data-urlencode "format=json"`
   - Resolver URL thumb: `action=query&titles=File:<exact>&prop=imageinfo&iiprop=url&iiurlwidth=500`
   - Descargar: `curl -fsS -A "darasa/1.0 (educational; abdelkarim@aichadigital.es)" -o public/portraits/<slug>.jpg "<thumburl>"`
   - Optimizar: `sips -s format jpeg --resampleWidth 240 <slug>.jpg --out <slug>_240.jpg && cwebp -q 85 -mt <slug>_240.jpg -o <slug>.webp && rm <slug>.jpg <slug>_240.jpg`
   - Añadir entrada en `public/portraits/ATTRIBUTIONS.md` (archivo local, título original, autor, año, enlace a Commons).
3. **Crear el fichero Markdown** en `src/content/hispania/soberanos/<entidad>/<slug>.md`:

   ```markdown
   ---
   slug: nombre-apellido
   entidad: <entidad-slug>
   sub_entidad: <opcional>
   id: <ordinal dentro de la entidad>
   nombre: "Nombre completo"
   epiteto: "el Católico"         # opcional
   inicio: 586
   fin: 601                         # o null si sigue
   capital: "Toledo"                # opcional
   img: "/portraits/<slug>.webp"    # o null si no hay retrato — render pinta placeholder con la inicial
   imgCredit: "Autor, año, fuente"  # opcional
   hechos:
     - { k: "Capital", v: "Toledo" }
     - { k: "Hito", v: "III Concilio de Toledo · 589" }
   fuentes:
     - "Autor (año). Título. Editorial."
     - "https://dbe.rah.es/..."
   ---

   Texto en Markdown sobre el reinado (2-5 párrafos). La primera letra recibe drop cap via CSS.
   ```

4. **Validación automática:** al arrancar `astro dev` o `astro build`, los schemas Zod validan cada campo. Si falta un obligatorio (`slug`, `entidad`, `id`, `nombre`, `inicio`, `img`, `fuentes`), el build falla con mensaje claro.
5. **Alt text de imagen:** el template genera `Retrato de <Nombre> — <imgCredit>` automáticamente si hay `imgCredit`. No duplicar en la imagen.
6. **Prev/next navigation:** se calcula automáticamente ordenando por `id` dentro de la misma `entidad`. No hace falta enlazar manualmente.

### Añadir una entidad nueva

1. **Verificar tokens:** `src/styles/tokens.css` debe tener `--c-<slug>-ink` + `--c-<slug>-solid` en light y dark. Si no, calibrar siguiendo la tabla de `DESIGN.md` § Color.
2. **Crear `src/content/hispania/entidades/<slug>.yaml`:**

   ```yaml
   slug: <slug>
   nombre: "Nombre canónico"
   tipo: reino   # reino | emirato | califato | taifa | condado | corona | confederacion
   inicio: 418
   fin: 711      # o null si sigue
   colorVar: "--c-<slug>"
   sub_entidades:  # opcional; lista de fases internas
     - slug: fase1
       nombre: "Fase 1"
       inicio: 418
       fin: 500
   desc: >
     Descripción en prosa, 2-4 líneas.
   fuentes:
     - "Autor (año). Título."
   ```

3. **No hace falta más:** la página `[entidad].astro` (cuando exista) iterará sobre los soberanos con `entidad === <slug>` y los renderizará en grid.

### Atribución de imágenes

- Toda imagen en `public/portraits/` **debe** tener fila en `ATTRIBUTIONS.md`.
- En frontmatter → `imgCredit` breve (1 línea) para mostrar en la ficha. En `ATTRIBUTIONS.md` → enlace completo al File: de Commons + autor + año.
- Retratos del Museo del Prado (serie 1854) se prefieren donde estén disponibles: la serie cronológica unificada da coherencia visual al grid.

### Paginación / contenido grande

- Las cards del grid usan `content-visibility: auto` (en `components.css`); seguras hasta varios cientos de items.
- Si una entidad pasa de 50 soberanos, considerar scroll virtualizado o paginación; pedirlo explícitamente.

## Relación con el repo legacy

`~/SitesWeb/ibrahim/reges-hispaniae/` es el prototipo HTML+JS puro anterior. Se conserva como **referencia visual y de contenido** durante la migración:

- `reges-hispaniae/assets/data.js` — fuente original de los 31 reyes visigodos. Queda por migrar 30 (Recaredo I ya está en darasa).
- `reges-hispaniae/index.html`, `dinastia/visigodos.html`, `rey/recaredo-i.html` — referencia del markup/interacción que hay que replicar en Astro.
- Cuando la migración a Astro esté completa (todas las entidades + soberanos portados + timeline funcional + grid por dinastía), `reges-hispaniae/` se archiva o se borra.
- El design doc de gstack sigue en `~/.gstack/projects/reges-hispaniae/` por compatibilidad con el historial de gstack.

## No hacer

- No introducir frameworks de UI (React/Vue/Svelte) hasta que haya una pieza interactiva que lo justifique (p. ej. un quiz, una búsqueda). Astro + HTML/CSS vanilla es suficiente para las fichas y grids.
- No añadir dependencias npm sin justificar (ver `~/claude/_COMPORTAMIENTO-codigo.md` § "Dependencias nuevas").
- No modificar `tokens.css`, `base.css`, `components.css` sin leer antes `DESIGN.md` y validar con el usuario.
- No romper la separación entre contenido (YAML/MD) y presentación (Astro + CSS). El contenido debe poder editarlo un historiador sin conocimientos técnicos.
