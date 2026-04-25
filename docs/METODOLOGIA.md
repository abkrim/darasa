# docs/METODOLOGIA.md — Cómo se trabaja en darasa

Los principios que guían las decisiones del proyecto. Para el workflow operativo de añadir contenido, ver `CLAUDE.md` § *Content workflow*. Para ejecutar el proyecto, ver `docs/USO.md`.

## Principios

### 1. El contenido manda

El proyecto existe para **contar historia con rigor y claridad**. El stack técnico sirve al contenido, no al revés.

- Una decisión técnica que complique añadir un soberano se rechaza.
- Una decisión técnica que impida revisar el contenido con diff legible se rechaza.
- La validación de schemas (Zod) existe para que el *fallo sea rápido y claro*, no para restringir.

### 2. Claridad sobre espectáculo

Audiencia primaria: Ibrahim (TEA + AACC). Esto dicta el tono y la UI:

- **Consistencia > novedad.** Si una convención funciona en una página, se replica en todas.
- **Sin decoración gratuita.** Cada elemento visual responde a una razón semántica (color dinástico = identidad, Fraunces italic = acento editorial, Geist Mono = datos numéricos alineables).
- **Motion mínimo y respetuoso con `prefers-reduced-motion`.** Sin parallax, sin scroll-driven animations, sin reveals decorativos.

Ver `DESIGN.md` § *Accessibility (TEA/AACC-first)* para detalles.

### 3. Respeto a las fuentes

Sin fuentes, no hay entrada. Cada soberano y cada entidad llevan al menos una fuente académica verificable.

**Fuentes aceptables:**
- Dialnet (preferida para artículos académicos peer-reviewed).
- Real Academia de la Historia — `dbe.rah.es`.
- Monografías académicas publicadas (editorial + año).
- Wikipedia **solo como puerta de entrada**: para llegar a bibliografía, nunca como fuente primaria.
- Wikimedia Commons para imágenes en dominio público o CC.

**Fuentes que no valen:**
- Blogs sin autoría identificable o credencial académica.
- Webs sin referencias a fuentes primarias.
- Foros, Reddit, respuestas de LLM.
- Material de editoriales de autopublicación sin revisión.

El schema Zod exige `fuentes: z.array(z.string()).min(1)`. El build falla si un soberano se publica sin fuentes.

### 4. Reconocer los silencios de la historia

La narrativa castellano-céntrica habitual tiende a marginar tres cosas:

- **Al-Ándalus** como parte propia, no como paréntesis.
- **Portugal** como reino peninsular, no entidad externa.
- **Las Taifas** como reinos en sí mismos, no como "fragmentación vista desde el norte".

El proyecto trata Al-Ándalus con **el mismo nivel de profundidad** que los reinos cristianos: sub-entidades propias, soberanos detallados, fuentes académicas (Dialnet, RAH, Lévi-Provençal, etc.). Ver `docs/PLAN-AL-ANDALUS.md`.

### 5. Open source, atribución visible

Licencia **CC BY-SA 4.0** para todo el contenido del proyecto, incluyendo:

- Texto y selección editorial (copyright del proyecto, compartible con atribución).
- Código (idem).
- Imágenes: el **dominio público original se preserva**; la compilación y curación añade la capa CC BY-SA. Atribución completa en `public/portraits/ATTRIBUTIONS.md`.

## Proceso de decisión

### Cambios de contenido (añadir/editar soberanos, entidades)

- No requieren aprobación previa si siguen las convenciones de `CLAUDE.md` y tienen fuentes válidas.
- Si una contribución externa (email / PR) duda sobre fuentes, epítetos, interpretaciones, el maintainer decide y documenta el razonamiento en el commit o en el PR.

### Cambios de sistema de diseño

- **Leer `DESIGN.md` antes de tocar** `tokens.css`, `base.css`, `components.css` o `Layout.astro`.
- Añadir un token nuevo (p.ej. `--lh-relaxed: 1.7` si hace falta) requiere:
  1. Justificar por qué la escala actual no lo cubre.
  2. Actualizar la tabla de `DESIGN.md` § *Typography* / *Spacing* / etc. en el mismo commit.
- Cambiar un token existente (color dinástico, familia tipográfica) requiere:
  1. Verificación de contraste WCAG AA mínimo (AAA donde `DESIGN.md` lo exige).
  2. Registro en `DESIGN.md` § *Decisions Log* con fecha y razón.
  3. Screenshot antes/después si afecta la UI visible.

### Cambios de arquitectura

Cambios grandes (añadir un framework de UI, cambiar Content Layer por otra cosa, cambiar deploy target):

1. Abrir `/office-hours` o equivalente para definir problema, aproximaciones, trade-offs.
2. Documentar la decisión como ADR o sección en `DESIGN.md` § *Decisions Log*.
3. Implementar con cambios quirúrgicos, sin "limpiar lo adyacente" (ver `~/claude/_COMPORTAMIENTO-codigo.md`).

## Proceso de colaboración (externo)

### Para historiadores y contribuidores

**Opción A — técnica:** Fork → añadir `.md` o `.yaml` → Pull Request. Si tienes imagen CC, añadir también WebP en `public/portraits/` y fila en `ATTRIBUTIONS.md`.

**Opción B — sencilla:** Envía el Markdown (o texto plano, yo lo formateo) a [abdelkarim@aichadigital.es](mailto:abdelkarim@aichadigital.es). Si tienes imagen, adjuntarla (JPEG o PNG original; optimización a WebP la hace el maintainer). Incluye:

- Título de la obra
- Autor
- Año
- URL de origen (Commons o similar)

**Identidad del colaborador:** se pide nombre real + afiliación o credencial verificable (universidad, asociación histórica, publicaciones previas). El proyecto no acepta contribuciones anónimas en el contenido histórico — la responsabilidad autoral es parte del rigor.

### Revisión por el maintainer

El maintainer (Abdelkarim) revisa cada contribución con:

1. **Formal:** schema Zod pasa, build verde.
2. **Fuentes:** al menos una fuente académica verificable; las URLs resuelven.
3. **Tono:** neutral, descriptivo, evitar anacronismos y juicios morales presentistas.
4. **Consistencia con el sistema:** slug, convenciones de naming, longitud de descripción (~200-400 palabras típico).

Tiempo de respuesta objetivo: 7 días para feedback inicial, sin compromiso de merge garantizado.

## Límites explícitos del proyecto

**Lo que darasa es:**

- Cronología estructurada de entidades políticas y sus soberanos en la Península Ibérica.
- Herramienta educativa orientada a lectura y navegación.
- Fuente secundaria con atribución a fuentes primarias.

**Lo que darasa no es (de momento):**

- Un wiki editable en vivo por usuarios anónimos.
- Una base de datos genealógica completa.
- Un sitio de opinión sobre figuras históricas.
- Un atlas cartográfico (los mapas son futuro, no están aún).
- Una aplicación interactiva compleja con quizzes o gamificación (podría venir en Fase 2 con un framework de UI, pero no es prioritario).

## Cuando algo no está documentado

Si una situación cae fuera de lo cubierto en `CLAUDE.md`, `DESIGN.md`, `docs/METODOLOGIA.md` o `BACKLOG.md`:

1. Tomar la decisión más conservadora y explícita.
2. Documentar la decisión en el commit o en el fichero donde aplique (ADR inline en `DESIGN.md`, sección nueva en `docs/` si procede).
3. Notificar al maintainer si afecta a áreas fuera del scope inmediato.

La regla mental: **una persona que no participó en esta sesión debería poder retomar el proyecto leyendo los docs sin pedir aclaraciones.**
