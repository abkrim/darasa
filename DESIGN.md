# Design System — darasa

> **Nota histórica:** este documento se redactó como "Design System — Atlas de Hispania". Tras la decisión de consolidar el slug `darasa` (2026-04-24), el nombre del proyecto es **darasa** en todas las superficies (carpeta, `package.json`, dominio `darasa.test` local, producción `darasa.es`, marca visible en el sitio). Las referencias a arquitectura HTML+JS legacy (`/index.html`, `/dinastia/*.html`, `/rey/*.html`, `assets/*`) reflejan el prototipo `reges-hispaniae/` que queda como referencia; la arquitectura actual es Astro + Content Collections (ver `CLAUDE.md`).

> Sistema de diseño para el proyecto de Ibrahim: cronología interactiva de reyes e imperios de Hispania desde los visigodos (418) hasta la actualidad.

## Product Context

- **Qué es:** colección de páginas web sobre los reyes e imperios de Hispania, estructuradas como timeline maestro → grid de reyes por dinastía → ficha individual.
- **Para quién:** Ibrahim (niño TEA + AACC con interés en artes gráficas). Es el lector primario. Todo se decide mirándolo a él.
- **Tono:** serio, respetuoso con el tema histórico, **sin infantilizar**. Colorido, claro, ordenado — no de parvulario.
- **Proyecto:** 3 páginas HTML estáticas (escalable a más). Sin build step, sin framework. Una capa `tokens.css` compartida.
- **Licencia:** Creative Commons **CC BY-SA 4.0**. Retratos de Wikimedia Commons (dominio público). Tipografías SIL OFL.

## Memorable thing

**"La cronología viva"** — el timeline es el héroe. Si alguien cierra la página tras 5 segundos, lo que se lleva es la sensación de las 8 dinastías en paralelo como bloques de color claros.

## Aesthetic — Señales

Inspiración declarada: claridad de app educativa premium (Duolingo, Toca Boca, Khan Academy Kids) aplicada a contenido histórico serio. **Bloques planos saturados. Tipografía geométrica. Cero decoración gratuita. Border-radius amable. Máxima accesibilidad para TEA.**

- **Direction:** plano moderno premium-kids · bloques de color como señalética
- **Decoration level:** minimal — la tipografía y el color hacen todo el trabajo
- **Mood:** claro, firme, alegre sin estridencias, respetuoso con el tema
- **No-goes:** degradados decorativos, sombras ornamentales, serifs en body, textura de pergamino, sepias, sienas, patrones ornamentados, efectos de papel envejecido.

## Typography

Tres voces, roles claros.

- **Body + Headlines:** **Hanken Grotesk** — geométrica variable (300–900 + ital), cálida, altamente legible, gratis (SIL OFL). Es la voz principal del sistema.
- **Acento editorial / italic:** **Fraunces** — serif óptica variable. Se usa **solo** para palabras en cursiva dentro de titulares (ej. *"contada en cronología"*), epítetos (*"el Católico"*) y emblemas de dinastía. Nunca en body, nunca en datos.
- **Fallback body:** **Atkinson Hyperlegible** — diseñada por la Braille Institute. Queda como fallback en la stack antes de `sans-serif` por si Hanken Grotesk no carga: soporta la legibilidad máxima para neurodivergencia como red de seguridad.
- **Datos / fechas / números:** **Geist Mono** — monospace variable, con `font-variant-numeric: tabular-nums slashed-zero`. Todos los años, duraciones y numerales romanos pasan por aquí. Los dígitos quedan alineados verticalmente.

**CSS vars:**

```css
--font-body:    "Hanken Grotesk", "Atkinson Hyperlegible", system-ui, sans-serif;
--font-display: "Fraunces", Georgia, serif;   /* solo italic/acentos */
--font-mono:    "Geist Mono", ui-monospace, monospace;
```

**Google Fonts URL (link en `<head>`):**

```
https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300..900;1,300..900&family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Geist+Mono:wght@400;500;600&display=swap
```

**Escala modular (rem base 16px):**

| token       | px  | rem    | uso                                                       |
|-------------|-----|--------|-----------------------------------------------------------|
| `--fs-2xs`  | 10  | 0.625  | labels micro, timeline axis, credits, roman numerals      |
| `--fs-xs`   | 12  | 0.75   | eyebrows, metadatos pequeños, tags, captions pequeñas     |
| `--fs-sm`   | 14  | 0.875  | captions, chips                                           |
| `--fs-base` | 16  | 1      | body por defecto                                          |
| `--fs-md`   | 17  | 1.0625 | body largo (ficha de rey)                                 |
| `--fs-lg`   | 20  | 1.25   | subtítulos, card names grandes                            |
| `--fs-xl`   | 24  | 1.5    | titulares de sección                                      |
| `--fs-2xl`  | 32  | 2      | titulares grandes                                         |
| `--fs-3xl`  | 44  | 2.75   | hero / ficha-name desktop                                 |
| `--fs-4xl`  | 60  | 3.75   | hero en desktop grande                                    |

**Valores ad-hoc intencionales** (fuera de escala, documentados en `components.css` con `/* intentional */`):

- `28px` en `.card-rey-placeholder` — inicial sobredimensionada dentro del círculo al 60% del thumb.
- `72px` en `.ficha-placeholder-portrait` — inicial a escala display dentro del marco de retrato.
- `9px` en `.cc-circle` — micro-lettering "cc" dentro del medallón de 16 px del footer.

**Pesos canónicos:** 400 (body), 500 (énfasis ligero), 700 (titulares secundarios), 800 (hero, card-name, section-title).

**Line-height:**

- `--lh-tight: 1.05` — hero display
- `--lh-snug: 1.3` — subtítulos
- `--lh-body: 1.6` — body (paso relajado, mejor foco TEA)

**Letter-spacing:**

- Hero y section-title: `-0.03em` (titulares geométricos grandes)
- Body: `0`
- Eyebrows / uppercase labels: `0.1em–0.16em`

**Regla de oro:** Fraunces italic siempre va dentro de texto con Hanken Grotesk. Nunca un párrafo entero de Fraunces.

## Color

**Dos modos igual de cuidados.** No usar un modo como "el principal": light y dark se diseñan a la par, con paletas paralelas.

### Base — Light

```css
--bg:           #FFFFFF;   /* lienzo */
--bg-soft:      #F3F5F9;   /* superficies elevadas (timeline, cards) */
--bg-sunken:    #E9EDF3;   /* thumbs, surfaces bajo card */
--ink:          #0F1116;   /* texto principal */
--ink-2:        #4C5360;   /* secundario */
--ink-3:        #8A91A0;   /* terciario, fechas, captions */
--rule:         rgba(15, 17, 22, 0.12);
--rule-strong:  rgba(15, 17, 22, 0.24);
--accent:       #F04436;   /* rojo de sistema, CTA */
--accent-bg:    #FFE3E0;
--accent-ink:   #8A1A12;
```

### Base — Dark

```css
--bg:           #0E1014;
--bg-soft:      #16181E;
--bg-sunken:    #0A0B0E;
--ink:          #F4F5F8;
--ink-2:        #B3BAC6;
--ink-3:        #7D8595;
--rule:         rgba(244, 245, 248, 0.10);
--rule-strong:  rgba(244, 245, 248, 0.22);
--accent:       #FF6B5E;
--accent-bg:    #2E1512;
--accent-ink:   #FFB0A8;
```

### Paleta dinástica (heráldica · saturada plana)

Cada dinastía lleva un color propio. El color NUNCA es la única señal — siempre va acompañado de nombre y/o emblema SVG.

**Dos tokens semánticos por dinastía**, porque un solo valor no puede servir a la vez como texto sobre fondo neutro (necesita ser oscuro en modo claro, claro en modo oscuro) y como background con texto blanco (necesita ser oscuro en ambos modos). Intentar compartir un único token rompía WCAG AA en 5 de 8 dinastías (verificado por cálculo de luminancia).

- **`--c-<slug>-ink`** — para texto, bordes, emblemas, acentos sobre fondo neutro. Calibrado por modo:
  - Light mode: color oscuro sobre blanco. AA ≥ 4.5:1 vs `#FFFFFF`.
  - Dark mode: color claro sobre fondo oscuro. AA ≥ 4.5:1 vs `--bg-soft`.
- **`--c-<slug>-solid`** — para background con `color: #fff` encima (panel ficha-left, badge card-rey-num, chip.is-active, detail.go-btn, bloques SVG del timeline). AA ≥ 4.5:1 vs `#FFFFFF` en ambos modos. En dark mode, además, mantiene L intermedia para separarse del `--bg` oscuro.
- **`--c-<slug>`** (legacy) — alias hacia `-ink`. Se conserva para back-compat con `data.js colorVar` strings.

| Dinastía         | ink (light) | ink (dark) | solid (light) | solid (dark) | Años         |
|------------------|-------------|------------|---------------|--------------|--------------|
| Visigodos        | `#4458D4`   | `#8598FA`  | `#2E3DA6`     | `#4657D0`    | 418–711      |
| Al-Ándalus       | `#00754E`   | `#53E1BA`  | `#006B4A`     | `#1A8566`    | 711–1492     |
| Reinos del Norte | `#C3367B`   | `#F077B3`  | `#9B1E56`     | `#B53977`    | 718–1479     |
| Reyes Católicos  | `#B4261B`   | `#FF7065`  | `#A91C0F`     | `#C0301F`    | 1479–1516    |
| Habsburgo        | `#353A45`   | `#C8CCD6`  | `#353A45`     | `#4D5361`    | 1516–1700    |
| Borbón           | `#1159BB`   | `#6FA5FF`  | `#0A4BA8`     | `#3267BF`    | 1700–hoy     |
| Rep. / Franquismo| `#555C69`   | `#B3BAC6`  | `#4D5361`     | `#676E7D`    | 1931–1975    |

**Nota sobre la identidad de Al-Ándalus en light mode:** el teal original `#0FB38A` no cumplía AA como texto. Para epítetos, eyebrows y drop caps se usa ahora verde oscuro `#00754E`. La identidad cromática vibrante se **conserva** en los fondos de panel (`-solid`) donde el texto blanco encima garantiza legibilidad.

**Decisión 2026-04-25 (consolidación Al-Ándalus):** Al-Ándalus se trata como **un único color cromático para los 800 años** (711-1492), unificando lo que en versiones anteriores eran dos filas (Al-Ándalus omeyo en verde + Taifas/Nazaríes en ámbar). Razón: alinear con `docs/PLAN-AL-ANDALUS.md` que define Al-Ándalus como una sola entidad con 7 sub-entidades cronológicas, y con `docs/METODOLOGIA.md § 4` ("reconocer los silencios": tratar Al-Ándalus como parte propia, no como bloque fragmentado por convención castellano-céntrica). La diferenciación entre sub-fases (emirato dependiente, califato, taifas, almohades, nazaríes…) se delega a tipografía, emblema y layout, no al color. Tokens `--c-taifas-*` retirados de `tokens.css` (eran huérfanos, sin consumidores).

**Consumo en componentes:**

- HTML sets inline: `style="--dyn-color: var(--c-visigodos-ink); --dyn-color-solid: var(--c-visigodos-solid);"` en el `<main>` de `/dinastia/*.html` y `/rey/*.html`.
- JS (index.html) deriva los dos tokens de `d.colorVar` (= `--c-visigodos`) concatenando `-ink` y `-solid` al vuelo.

### Contraste — verificado

Todos los ratios calculados con WCAG 2.x relative-luminance formula:

- Texto `--ink` sobre `--bg`: **AAA** (≥ 7:1) en ambos modos.
- Texto blanco `#fff` sobre los 8 colores `-solid`: **AA garantizado** (≥ 4.5:1), la mayoría AAA. Tabla de ratios documentada en comentarios de `tokens.css`.
- Texto en color `-ink` sobre fondo neutro (`--bg` en light, `--bg-soft` en dark): **AA garantizado** en las 8 dinastías, AAA en 5 de 8.
- `--ink-3` (terciario) SOLO para metadata pequeña (fechas, captions) — no para contenido esencial.

### Regla de sensibilidad

Si Ibrahim un día rechaza una combinación concreta, cambiar **ese** color dinástico, no la paleta entera. Cada color dinástico es un token aislado, editable sin cascada.

### Modo sereno (futuro, opcional)

Clase `data-mode="serenity"` en `<html>` que aplica `filter: saturate(0.55) brightness(0.97)` al body. Pensado para días en que la saturación molesta. Toggle en el header junto al light/dark. (Implementar en Fase 2.)

## Spacing

**Base 4px. Escala 8-predominante. Densidad comfortable, no compacta.**

```css
--sp-1:  4px;
--sp-2:  8px;
--sp-3:  12px;
--sp-4:  16px;
--sp-5:  24px;
--sp-6:  32px;
--sp-7:  48px;
--sp-8:  64px;
--sp-9:  96px;
```

- Padding interior de cards: `--sp-4`
- Gap entre cards en grid: `--sp-3` a `--sp-4`
- Padding vertical de secciones: `--sp-7` a `--sp-8`
- Margin externo de contenedor: `--sp-5` (con max-width)

## Layout

- **Max-width contenedor:** `1120px`, centrado, padding horizontal `--sp-5` (24px).
- **Max-width lectura (ficha rey body):** `60ch` — cómodo para TEA.
- **Grid de cards:** `grid-template-columns: repeat(auto-fill, minmax(170px, 1fr))`, gap `--sp-4`.
- **Grid ficha de rey:** 1 columna en móvil; `280px 1fr` en ≥720px (panel lateral + cuerpo).
- **Timeline:** scroll horizontal en <900px, completo ≥900px. `min-width: 820px` en el SVG.

### Border-radius — amable pero no bubbly

```css
--r-sm: 8px;    /* chips pequeñas, numeraciones */
--r-md: 12px;   /* facts, small buttons */
--r-lg: 14px;   /* card thumbs, timeline bars (pills) */
--r-xl: 18px;   /* cards completas */
--r-2xl: 24px;  /* ficha-panel, hero-surface */
--r-full: 999px; /* chips y pills puras */
```

Los bloques del timeline son **píldoras** (`--r-lg`). Las cards de rey son **rounded containers** (`--r-xl`). La ficha es un panel grande con `--r-2xl`.

## Motion

**Minimal-functional. Sin decoración.**

- `--ease: cubic-bezier(0.32, 0.72, 0, 1)` (natural, un poco chulo pero contenido)
- `--dur: 200ms` (base)
- `--dur-snap: 120ms` (interacciones tactiles rápidas)
- Transiciones permitidas: `background`, `color`, `border-color`, `transform` (solo `translateY` o `scale` sutil), `opacity`.
- **Prohibido:** parallax, scroll-driven, reveals on scroll, bouncing easings, entrance animations, carousels automáticos.

**Respeto a `prefers-reduced-motion: reduce`:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Esto es **obligatorio**, no opcional.

## Accessibility (TEA/AACC-first)

- **Contraste:** mínimo AAA para texto principal, AA para UI secundaria.
- **Focus visible:** `outline: 2px solid var(--accent); outline-offset: 3px; border-radius: var(--r-sm);`. Grande, con offset, inequívoco.
- **Tamaño táctil:** mínimo `40×40px` en botones (toggle, chips, nav cards).
- **Color nunca única señal:** cada dinastía lleva color + nombre + emblema SVG.
- **Motion reducido:** soporte completo `prefers-reduced-motion`.
- **Modo oscuro:** paralelo, no invertido. Sin flashes al cambiar.
- **Semántica HTML:** `<main>`, `<article>`, `<aside>`, `<nav>`, `<time datetime="...">`. Títulos jerárquicos correctos (`h1` por página, `h2` por sección).
- **Alt-text:** obligatorio en todos los retratos. Si es dominio público, añadir atribución en `<figcaption>` o caption adyacente.
- **Lang:** `<html lang="es">`.

## Iconografía

- **Emblemas dinásticos:** SVG inline, monocromos (heredan `currentColor`), 24×24 o 40×40. Pictogramas simples (geometría, no ilustración), cada dinastía con uno propio.
- **UI icons (toggle, prev/next, close):** stroke 1.7-2px, line-cap round. Set propio, compacto (≤10 iconos totales).
- **Nunca iconos de emoji Unicode** como UI primaria.

## Arquitectura de páginas

```
/
├── index.html                  ← Timeline maestro (reemplaza reyes_españa_dynastias_v2.html)
├── dinastia/
│   ├── visigodos.html          ← Grid de reyes visigodos (refactor de reyes_visigodos_cartas.html)
│   ├── andalus.html
│   ├── ... (una por dinastía)
├── rey/
│   ├── recaredo-i.html         ← Ficha individual (nueva)
│   ├── leovigildo.html
│   └── ... (una por rey)
├── assets/
│   ├── tokens.css              ← Todas las vars CSS de este DESIGN.md
│   ├── base.css                ← Reset, tipografía base, utilities
│   ├── components.css          ← Timeline, cards, ficha
│   ├── theme.js                ← Toggle light/dark con localStorage
│   └── emblemas/
│       ├── visigodos.svg
│       └── ...
└── DESIGN.md                   ← Este archivo
```

**Archivos legacy a retirar:** `reyes_españa_dynastias.html` (v1) — sustituido por `index.html`.

## Componentes clave

### Toggle light/dark

Posición: esquina superior derecha, dentro del header sticky. Botón circular 40×40, sol/luna según modo. Persistencia en `localStorage` (`atlas-theme: light|dark`). Al arranque, si no hay valor, respetar `prefers-color-scheme`.

### Timeline (pieza héroe)

- SVG escalable, viewBox `0 0 900 240`.
- Bloques en forma de **píldora** (`rx="14"`) con el color de dinastía.
- Eje inferior con años en Geist Mono, `tabular-nums`.
- Scroll horizontal en móvil (`overflow-x: auto` con padding-bottom).
- Click en bloque → lleva a `/dinastia/<slug>.html`.
- Chip de filtro "Todas / [dinastía]" arriba del SVG.

### Card de rey (grid item)

- Pill completa con background `--bg-soft`.
- Thumb cuadrado 1:1 con border-radius `--r-lg`.
- Número de rey arriba-izquierda del thumb (badge color dinastía, `#15`).
- Nombre del rey en Hanken 800 16px.
- Años en Geist Mono 12px `--ink-2`.
- Hover: `translateY(-3px)` + sombra suave.
- La card activa (el rey que estás viendo) usa `background: var(--c-<dinastia>)` con texto blanco.

### Ficha de rey

- Grid 2 columnas `280px 1fr` desktop, 1 columna móvil.
- Panel izquierdo: fondo `var(--c-<dinastia>)` con texto blanco. Contiene retrato grande (border-radius `--r-lg`, border blanco 4px) + emblema de dinastía + años.
- Panel derecho: chip dinástica arriba, `h1` Hanken 800 grande con `letter-spacing: -0.03em`, epíteto en Fraunces italic debajo (único uso de Fraunces), chip de reinado, descripción en body `--fs-md`, navegación prev/next.

### Navegación prev/next

Dos botones iguales al pie de la ficha. Cada uno muestra: dirección ("← Anterior" / "Siguiente →"), nombre del rey, años en mono. Hover cambia border-color a color dinastía.

## Footer

- Border-top con `--rule`.
- Columna izquierda: descripción breve del proyecto + atribución Wikimedia + tipografías.
- Columna derecha: badge `CC BY-SA 4.0` con icono y link a `creativecommons.org`.
- `<link rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/">` en `<head>` de todas las páginas.

## Decisions Log

| Fecha       | Decisión                                                                 | Razón |
|-------------|--------------------------------------------------------------------------|-------|
| 2026-04-23  | Sistema de diseño "Señales" aprobado tras 3 variantes (Pliego/Cromos/Señales). | Máxima claridad TEA + color saturado vivo sin sienas adultas. |
| 2026-04-23  | Hanken Grotesk como body/headlines principal.                            | Geométrica moderna, variable, cálida, accesible. Evita Inter/Roboto/Poppins (convergence slop). |
| 2026-04-23  | Fraunces restringida a italic/acentos. No en body.                       | Un toque editorial que respeta al tema sin volverlo "museo adulto". |
| 2026-04-23  | Atkinson Hyperlegible como fallback antes de `sans-serif`.              | Red de seguridad para legibilidad máxima si Hanken Grotesk no carga. |
| 2026-04-23  | Paleta heráldica auténtica (8 colores) saturada plana, no pastel ni oscura. | Audiencia es niño con gusto gráfico — color vivo pero con lógica histórica. |
| 2026-04-23  | `prefers-reduced-motion` obligatorio, motion mínimo sin parallax/reveals. | TEA friendly. |
| 2026-04-23  | Modo sereno (toggle de desaturación) planificado para Fase 2.            | Sensibilidad cambiante a combinaciones de color. |
| 2026-04-23  | Arquitectura: `/index.html` + `/dinastia/*.html` + `/rey/*.html`.        | La estructura de datos ya existente (dinastías con reyes) mapea directa. |
| 2026-04-23  | Retirar `reyes_españa_dynastias.html` (v1), reemplazar `_v2` por `index.html`. | v1 es prueba descartada. v2 sirve como base técnica para el timeline refactorizado. |
| 2026-04-23  | Licencia CC BY-SA 4.0 con atribución Wikimedia en imágenes.             | Contenido educativo compartible. Atribución visible, no marketing. |
| 2026-04-23  | Escala tipográfica extendida con `--fs-2xs: 10px` tras audit `/impeccable:normalize`. | ~14 usos de 10-11px hard-coded en `components.css`. Añadir el token evita drift y documenta la intención. Los 11px se colapsan a `--fs-xs` (12px, imperceptible); los 10px usan el nuevo token. Paddings/gaps 2-6px colapsados al valor más cercano del scale de spacing. |
| 2026-04-23  | Paleta dinástica partida en `--c-<slug>-ink` + `--c-<slug>-solid` tras audit `/impeccable:colorize`. | La afirmación previa *"texto blanco sobre los 8 colores cumple WCAG AA"* era falsa (5 de 8 fallaban, especialmente taifas #F5A623 con 2.1:1 y catolicos #F04436 con 3.7:1). Un solo token no puede satisfacer simultáneamente "texto-sobre-bg-neutro" y "bg-con-texto-blanco". Splitting semántico en `-ink`/`-solid` calibrados independientemente por modo resuelve AA en ambos casos sin perder identidad heráldica (vibrante en bg de paneles, oscuro en text accents). |
| 2026-04-25  | Al-Ándalus consolidado en un único color cromático (verde, 711-1492). Tokens `--c-taifas-*` retirados de `tokens.css`. | Alineación con `docs/PLAN-AL-ANDALUS.md` (Al-Ándalus = una entidad con 7 sub-entidades cronológicas) y con `docs/METODOLOGIA.md § 4` (tratar Al-Ándalus como parte propia, no fragmentado por convención castellano-céntrica). Los tokens `--c-taifas-*` no tenían consumidores (verificado por grep en `src/`, `public/` y `src/content/`). La diferenciación entre sub-fases se delega a tipografía, emblema y layout. |
