# Backlog — darasa

Hallazgos abiertos tras la auditoría del **2026-04-24** (audit v2, post pipeline `colorize → normalize → harden → polish → optimize`).

> **Nota de migración 2026-04-24:** este backlog fue redactado contra el **prototipo legacy** en `~/SitesWeb/ibrahim/reges-hispaniae/` (HTML+JS puro). Las rutas (`index.html:122`, `assets/components.css:662`, `rey/recaredo-i.html:94`, `dinastia/visigodos.html:149`, etc.) apuntan a ficheros que **ya no existen** en este repo Astro. Al resolver cada item, verificar si:
> - El código causante se portó tal cual (items en `base.css`/`components.css` — los CSS se copiaron a `src/styles/` sin cambios, el hallazgo sigue vigente).
> - El problema desapareció con la migración (items en `index.html` inline script, por ejemplo — Astro lo reemplaza).
> - El problema reaparecerá en la reescritura Astro (items de UX/a11y como touch targets del timeline — aplican al componente Astro que se construya).
>
> Convenio: al cerrar cada item, anotar junto al `[✓]` si se resolvió en Astro o si era irrelevante ya (`[✓] N/A — resuelto por migración`).

**Estado global:** 9.0 / 10. Sin Critical. 2 High, 6 Medium, 6 Low. Resolver empezando por High.

**Formato por item:** severidad, categoría, ubicación, descripción breve, comando sugerido.

---

## Cómo trabajar este backlog

- Los items tienen ID estable (`H1`, `M3`, etc.) — al resolver uno, marcarlo `[✓]` en vez de eliminarlo (dejar trazabilidad).
- Varios items se pueden agrupar en una sola sesión si comparten comando (`/distill` cubre 3 items, `/normalize` cubre 2, etc.).
- Después de cerrar varios items, re-ejecutar `/impeccable:audit` para verificar regresión cero y detectar lo que haya salido durante los cambios.
- Los items "Conocidos, persistentes" ya se arrastraban del audit v1 — tienen prioridad media porque el proyecto convive con ellos sin bloqueos reales.

---

## High severity (resolver primero)

### [✓] H1 · Touch targets de bloques SVG del timeline < 40×40

- **Categoría:** Accessibility
- **Ubicación:** `index.html:122` (constante `ROW_H = 34`), `renderBlock` @ líneas 177-223.
- **Problema:** bloques de dinastías cortas (Reyes Católicos 37 años ≈ 21 px ancho, República/Franquismo 44 años ≈ 25 px) quedan muy pequeños. El alto total es 34 px, debajo del mínimo WCAG AA 24×24 estricto y claramente debajo del AAA 44×44.
- **Impacto:** usuario táctil falla al intentar pulsar dinastías cortas. Mitigado porque los chips arriba del SVG son la vía accesible equivalente — pero es redundancia, no reemplazo.
- **Fix sugerido:** aumentar `ROW_H` a 40 y recalcular `TOP`, `ROW_GAP`, `AXIS_Y` para que el SVG no se corte. Alternativa: rects transparentes extendiendo el hit-area sin cambiar la visual.
- **Comando:** `/impeccable:harden`
- **Resolución 2026-04-27:** [✓] En Astro — rects transparentes 44×44 px sobre cada bloque SVG; visual permanece en ROW_H=34.

### [✓] H2 · `line-height: 1.7` hardcoded en `.ficha-desc` y segundo párrafo con `<p style="...">` inline

- **Categoría:** Theming / UX Writing
- **Ubicación:** `assets/components.css:662`, `rey/recaredo-i.html:94-96`.
- **Problema:** (1) `line-height: 1.7` no está en la escala (`--lh-tight 1.05`, `--lh-snug 1.3`, `--lh-body 1.6`); (2) el segundo párrafo del cuerpo de Recaredo tiene un `style="font-size: var(--fs-base); line-height: 1.7; color: var(--ink); max-width: 60ch; margin-bottom: var(--sp-5);"` con 5 declaraciones inline — patrón que se propagará a las otras 30 fichas si no se sistematiza.
- **Impacto:** inconsistencia tipográfica + HTML contaminado.
- **Fix sugerido:** añadir token `--lh-relaxed: 1.7` a `tokens.css` (o decidir que `--lh-body 1.6` es suficiente y unificar). Crear clase `.ficha-body-text` compartida por todos los párrafos del cuerpo. Restringir drop-cap a `.ficha-body-text:first-of-type::first-letter`. Aplicar la clase a los dos `<p>` de Recaredo, eliminando el style inline.
- **Comando:** `/impeccable:normalize`
- **Resolución 2026-04-27:** [✓] Token `--lh-relaxed: 1.7` añadido a `tokens.css`. El `<p style="...">` inline es N/A — la versión Astro de `[slug].astro` no tiene estilos inline; el cuerpo del soberano es Markdown que el componente renderiza sin style attr.

---

## Medium severity

### [✓] M1 · `.display-italic` utility sin uso

- **Categoría:** Code quality
- **Ubicación:** `assets/base.css:95-100`.
- **Problema:** clase definida pero nunca consumida. Los usos reales de Fraunces italic tienen `font-variation-settings` ad-hoc en `.hero-title i`, `.ficha-epithet`, etc.
- **Fix sugerido:** eliminar la regla, o reconectar el `<i>` del hero (y otras) para consumirla (resolvería L6 de paso).
- **Comando:** `/impeccable:distill`
- **Resolución 2026-04-27:** [✓] En Astro — `<i>` del h1 cambiado a `<span class="display-italic">`. La clase ahora está consumida.

### [✓] M2 · `referrerPolicy = 'no-referrer'` en imágenes locales

- **Categoría:** Code quality / Performance
- **Ubicación:** `dinastia/visigodos.html:149` dentro de `renderCard`.
- **Problema:** el atributo tenía sentido cuando las imágenes venían de Wikimedia. Tras `/optimize` están en `assets/portraits/` (same-origin) — la línea es no-op.
- **Fix sugerido:** eliminar, o dejar con comentario explicativo si se quiere como safety-net para imágenes externas futuras.
- **Comando:** `/impeccable:distill`
- **Resolución 2026-04-27:** [✓] N/A — resuelto por migración. `[slug].astro` en Astro usa `<Image>` o `<img>` sin `referrerPolicy`, y las imágenes son same-origin desde `public/portraits/`.

### [✓] M3 · Inline script ~300 líneas en `index.html`

- **Categoría:** Architecture
- **Ubicación:** `index.html:115-405`.
- **Problema:** toda la lógica del timeline (renderAxis, renderBlock, renderChips, renderDetail, listeners) está inline. `data.js`, `emblemas.js`, `theme.js` sí están extraídos — el timeline no.
- **Impacto:** si se añaden más páginas tipo "timeline" habrá duplicación. Tampoco es cacheable como asset independiente.
- **Fix sugerido:** extraer a `assets/timeline.js`. Referenciar por ID (`#tl`, `#detail`, `#dyn-chips`) como convención.
- **Comando:** `/impeccable:extract`
- **Resolución 2026-04-27:** [✓] N/A — resuelto por migración. `index.astro` genera el timeline en SVG estático sin script inline; la lógica de selección de bloque no existe (clic navega directamente a `/hispania/<slug>`).

### [✓] M4 · Redundancia eyebrow + h3 con el mismo texto en `renderDetail`

- **Categoría:** UX Writing / Anti-pattern
- **Ubicación:** `index.html:284-296`.
- **Problema:** el span `.detail-dyn` muestra `d.name` ("Reino visigodo") e inmediatamente debajo `<h3>` muestra `d.name` otra vez. Lectores de pantalla lo oyen dos veces.
- **Fix sugerido:** eyebrow como categoría supra ("Timeline · Dinastía" o la era histórica); h3 queda con el nombre. O eliminar el h3 y promover el eyebrow a `<h3>`.
- **Comando:** `/impeccable:clarify`
- **Resolución 2026-04-27:** [✓] N/A — resuelto por migración. El panel `renderDetail` del prototipo no existe en Astro; los bloques del SVG navegan directamente a la página de entidad.

### [✓] M5 · `.chip:hover` en light mode hunde la superficie

- **Categoría:** Theming / UX
- **Ubicación:** `assets/components.css:195`.
- **Problema:** chip default `bg-soft`, hover → `bg-sunken` (más oscuro). En light mode, hover oscurece = "hunde" la chip. Contra la convención UX (hover eleva). El bug simétrico ya se arregló en dark mode con `[data-theme="dark"] .chip:hover { background: var(--bg); }`.
- **Fix sugerido:** `.chip:hover` en light → `background: var(--bg)` (blanco, un escalón más arriba), o preservar `bg-soft` con `box-shadow: 0 1px 3px rgba(0,0,0,0.04)` simulando elevación.
- **Comando:** `/impeccable:polish`
- **Resolución 2026-04-27:** [✓] En Astro — `.chip:hover` corregido a `background: var(--bg)` + `box-shadow: 0 1px 3px rgba(0,0,0,0.07)` (eleva en light); dark sin cambio.

### [✓] M6 · CTA "Ver reyes" solo para dinastía visigodos

- **Categoría:** UX
- **Ubicación:** `index.html:352-362`.
- **Problema:** `renderDetail` renderiza el botón *"Ver reyes visigodos →"* sólo cuando `d.slug === 'visigodos'`. Para las otras 7 dinastías el panel termina sin acción — dead-end.
- **Fix sugerido:**
  - Opción A: CTA siempre visible con clase `is-disabled` + texto "Próximamente" en las 7 dinastías sin página.
  - Opción B: Esperar a crear las páginas y habilitar el CTA cuando existan (ruta de contenido).
- **Comando:** `/impeccable:clarify` (+ trabajo de contenido)
- **Resolución 2026-04-27:** [✓] N/A — resuelto por migración. En Astro los bloques del SVG enlazan directamente a `/hispania/<slug>`; no hay CTA condicional.

---

## Low severity

### [✓] L1 · `border-radius: 3px` hardcoded en scrollbar thumb

- **Categoría:** Theming
- **Ubicación:** `assets/components.css:216`.
- **Fix sugerido:** `border-radius: var(--r-full)` (se clampa al máximo posible = pill exacta). O dejar con comentario `/* intentional — pill on 6px track */`.
- **Comando:** `/impeccable:normalize`
- **Resolución 2026-04-27:** [✓] En Astro — `border-radius: var(--r-full)` aplicado en `.tl-wrap::-webkit-scrollbar-thumb`.

### [✓] L2 · `.hero-meta` con formato métrica AI-template

- **Categoría:** Anti-pattern
- **Ubicación:** `index.html:56-61`.
- **Problema:** "1607 años · 8 dinastías · 80+ monarcas · CC BY-SA 4.0" se lee como el pattern "hero metrics row" genérico de AI. Mitigado (inline, sin gradient), pero es un tell.
- **Fix sugerido:** mezclar información no métrica, o eliminar el row y dejar solo h1 + hero-sub.
- **Comando:** `/impeccable:distill`
- **Resolución 2026-04-27:** [✓] Eliminado span CC BY-SA del hero-meta (redundante con footer). Quedan 3 stats genuinas con `class="numeric"`. Texto ampliado: "entidades políticas" y "soberanos documentados" — más específico, menos genérico.

### [✓] L3 · `font-feature-settings: "ss01"` en `.numeric` — posible código muerto

- **Categoría:** Code quality / Performance
- **Ubicación:** `assets/base.css:83`.
- **Problema:** declarado en `.numeric` (que usa Geist Mono). Si Geist Mono no define `ss01`, es no-op. Si lo define, aplica un stylistic set no documentado en DESIGN.md.
- **Fix sugerido:** verificar spec de Geist Mono. Si no usa `ss01`, eliminar; si sí, documentar para qué sirve.
- **Comando:** `/impeccable:distill`
- **Resolución 2026-04-27:** [✓] Eliminado `"ss01" 1` de `font-feature-settings` en `.numeric`. No documentado en DESIGN.md; `font-variant-numeric: tabular-nums slashed-zero` ya cubre tnum y zero de forma semántica.

### [✓] L4 · Copy "Toca un bloque" implica solo táctil

- **Categoría:** UX Writing
- **Ubicación:** `index.html:54` (hero-sub) y `index.html:90` (tl-caption).
- **Fix sugerido:** "Toca" → "Selecciona" o "Pulsa". Device-neutral.
- **Comando:** `/impeccable:clarify`
- **Resolución 2026-04-27:** [✓] En Astro — "Toca" → "Selecciona" en hero-sub y tl-caption de `index.astro`.

### [✓] L5 · Ausencia de Open Graph / Twitter tags + sitemap.xml + robots.txt

- **Categoría:** SEO / Sharing
- **Ubicación:** `<head>` de las 3 HTMLs + raíz.
- **Fix sugerido:** antes de publicar, añadir `og:title/description/image/type=article`, sitemap generado, y decidir política de robots.
- **Comando:** `/impeccable:seo` o custom
- **Resolución 2026-04-27:** [✓] En Astro — `Layout.astro` con prop `ogImage`, canonical, OG+Twitter completos. `astro.config.mjs` con `@astrojs/sitemap`. `public/robots.txt` creado.

### [✓] L6 · `<i>` como elemento de estilo decorativo

- **Categoría:** Semantic HTML
- **Ubicación:** `index.html:52` — `<h1>Los reyes e imperios, <i>contados en cronología</i>.</h1>`.
- **Problema:** HTML5 define `<i>` como "alternate voice/mood" — aplicable borderline. Más limpio: `<span class="display-italic">` (resolvería M1 de paso) o `<em>` si quiere expresar énfasis real.
- **Fix sugerido:** decidir semántica. Mantener `<i>` si es sólo estilo, migrar a `<span class="display-italic">` si se refactoriza M1.
- **Comando:** `/impeccable:polish` o `/impeccable:distill`
- **Resolución 2026-04-27:** [✓] En Astro — `<i>` → `<span class="display-italic">` en el h1 de `index.astro`. Resuelve M1 de paso.

---

## Resueltos (audit v1 → v2)

Para trazabilidad. No volver a trabajar estos a menos que una regresión se detecte:

| Audit v1 | Resolución | Pipeline |
|----------|-----------|----------|
| C1, C2 (contraste WCAG AA roto) | Paleta bifurcada `-ink`/`-solid` | `/impeccable:colorize` |
| H1 (chip touch target 32 px) | `min-height: 40px` + padding | `/impeccable:harden` |
| H2 (theme-toggle sin aria-pressed) | `syncToggleButtons` + label dinámico | `/impeccable:harden` |
| H3 (SVG blocks sin focus-visible) | Regla `.tl-block:focus-visible` | `/impeccable:harden` |
| H6 (chip hover dark invertido) | `[data-theme="dark"] .chip:hover { background: var(--bg); }` | `/impeccable:harden` |
| M1 (font-sizes fuera de escala) | Añadido `--fs-2xs`, colapso 11→12 | `/impeccable:normalize` |
| M2 (spacings ad-hoc) | 2/3/5/6 → tokens más cercanos | `/impeccable:normalize` |
| M3 (`font-feature-settings: ss01` en body) | Eliminado del `body` | `/impeccable:normalize` |
| M4 (payload Google Fonts pesado) | Request slimeado, Atkinson eliminado | `/impeccable:optimize` |
| M5 (`onclick` inline en toggle) | `addEventListener` en theme.js | `/impeccable:harden` |
| M7 (imágenes Wikimedia externas) | Descargadas a `assets/portraits/` WebP 240 px | `/impeccable:optimize` |
| M8 (sin `<noscript>` fallback) | `<ol class="tl-fallback">` con 8 dinastías | `/impeccable:harden` |
| M9 (flash de transición al cambiar tema) | Transitions coordinadas, test visual ok | `/impeccable:polish` |
| M11 (rel="noopener" sin noreferrer) | Todos actualizados a "noopener noreferrer" | `/impeccable:harden` |
| M12 (datetime year-only inválido) | ISO 8601 YYYY-MM-DD | `/impeccable:harden` |

---

## Decisions log

Para cambios arquitectónicos registrar aquí fecha + decisión + razón, con el mismo formato que `DESIGN.md:Decisions Log`. De momento vacío — las decisiones de la primera iteración están en `DESIGN.md`.

| Fecha | Decisión | Razón |
|-------|----------|-------|
| 2026-04-27 | H1: rect transparente overlay en lugar de aumentar ROW_H | Cambiar ROW_H obligaría a recalcular toda la geometría SVG (TOP, ROW_GAP, axisY). La solución de overlay mantiene la visual intacta y cumple WCAG 2.5.8. |
| 2026-04-27 | M5: chip hover → `--bg` + box-shadow en lugar de `--bg-sunken` | `--bg-sunken` oscurece en light (hunde). `--bg` eleva un paso. Box-shadow leve simula elevación sin color. En dark se mantiene `--bg` del fix anterior (ya era correcto). |
| 2026-04-27 | Block D (Taifas menores): opción A — entidades de período sin fichas individuales | Documentación secundaria fragmentaria para la mayoría; iconografía fiable ausente. Fichas vacías dañan la credibilidad. Nota editorial con llamada a colaboradores. |
