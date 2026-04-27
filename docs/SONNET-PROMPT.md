# Prompts de arranque para sesiones Sonnet

Plantilla y prompts específicos para arrancar sesiones de migración de soberanos en darasa con Claude Sonnet (más barato, suficiente para procedimiento mecánico).

**Última actualización:** 2026-04-27. Estado del repo: 233 soberanos migrados, 244 páginas en build, working tree limpio. Bloque A (Pamplona-Navarra post-1234) completado.

## Cómo usar este archivo

1. Identifica el bloque a migrar en `docs/MIGRATION-TODO.md` (sección "Estado por entidad" → filas en negrita).
2. Copia la sección **"Prompt base"** abajo (igual para cualquier bloque).
3. Concaténala con la **sección específica del bloque** (Pamplona-Navarra post-1234, Bragança, etc.).
4. Pega el resultado al inicio de la sesión Sonnet.
5. Al cerrar la sesión, ejecuta los comandos de **"Verificación post-sesión"**.

---

## Prompt base (común a cualquier bloque)

> Hola. Voy a migrar un bloque de soberanos a darasa, mi atlas histórico de la Península Ibérica. La infraestructura está estabilizada: schemas Zod, entidades, retratos en Wikimedia Commons, build verde con 226 páginas. Tu tarea es ejecutar la migración mecánica del bloque que te indico al final, siguiendo la guía documentada.
>
> **Antes de tocar nada, lee en este orden:**
>
> 1. `~/SitesWeb/ibrahim/darasa/CLAUDE.md` — convenciones del proyecto, slugs, content workflow.
> 2. `~/SitesWeb/ibrahim/darasa/docs/MIGRATION-GUIDE.md` — el "cómo" mecánico (búsqueda Commons, descarga, optimización WebP, plantilla de markdown, atribuciones, validación, commit).
> 3. `~/SitesWeb/ibrahim/darasa/docs/MIGRATION-TODO.md` — estado real del repo, decisiones cerradas y abiertas, listas de slugs pendientes.
> 4. Memoria del proyecto en `~/.claude/projects/-Users-abkrim-SitesWeb-ibrahim-darasa/memory/feedback_historiographic_tone.md` — tono editorial obligatorio (factual matizado, sin "Reconquista", epítetos solo canónicos, sucesiones femeninas en `hechos`).
> 5. `~/SitesWeb/ibrahim/darasa/DESIGN.md` § Color — solo si necesitas confirmar paleta (no calibrar tokens nuevos).
>
> **Convenciones ya cerradas y aplicadas (no improvisar nuevas):**
>
> - **Reinas reinantes:** entran como soberanas con id propio en la secuencia (ejemplos: `urraca-i.md` id 16, `juana-i.md` id 35, `petronila.md`, `isabel-i.md`).
> - **Numeración compartida:** el campo `nombre` usa la numeración de la entidad principal; las otras numeraciones se mencionan en `hechos` y prosa. Ejemplo: `leon-castilla/carlos-i.md` (no "Carlos V") con un hecho que aclara "Carlos V del Sacro Imperio".
> - **`tambien_reino_en`:** lista de slugs de entidades secundarias. Una sola ficha por persona, ubicada en la entidad principal. Ejemplo: `leon-castilla/felipe-ii.md` con `tambien_reino_en: [aragon, pamplona-navarra, reino-portugal]` y NO existe duplicado en `reino-portugal/`.
> - **Linaje:** campo `linaje` solo cuando hay líneas paralelas compitiendo en el mismo período (precedente: `dos-reinos` en León-Castilla con `linaje: castilla` vs `linaje: leon`). El render del grid agrupa visualmente por linaje.
> - **Imágenes sin retrato seguro:** mejor `img: null` (placeholder de inicial) que un retrato decimonónico identificable como "imaginario". La jerarquía editorial está en `docs/PLAN-AL-ANDALUS.md` § Decisiones editoriales → 3 (aplica también fuera de Al-Ándalus para retratos del s. XIX-XX sin valor documental).
>
> **Pregúntame antes** de:
>
> - Tomar decisiones de modelado no cubiertas por la guía o el TODO (slugs ambiguos, sub_entidades nuevas, linaje, sucesiones colaterales).
> - Modificar el schema en `src/content.config.ts` o tokens en `src/styles/tokens.css`.
> - Crear o renombrar entidades (`src/content/hispania/entidades/*.yaml`).
> - Cambiar `CLAUDE.md`, `DESIGN.md`, `MIGRATION-GUIDE.md` o `MIGRATION-TODO.md`.
> - Cualquier decisión "abierta" del TODO (decisiones 2 y 5: antirreyes y cierre temporal de Portugal).
>
> **Tarea concreta:** _[concatena aquí la sección del bloque elegido — ver más abajo]._
>
> **Empieza por confirmar** que has leído los 4 documentos, que entiendes el alcance del bloque, y que sabes qué slugs vas a crear. Si algo no encaja, para y avísame antes de improvisar.

---

## Bloques pendientes — secciones específicas

Cada sección se pega al final del prompt base como "tarea concreta".

### Bloque A — Pamplona-Navarra post-1234 (~22 reyes)

> Migra el bloque **Pamplona-Navarra post-1234** completo: casas de Champaña, Capeto, Trastámara-Foix y la transición Habsburgo-Borbón hasta el cierre temporal de la corona en 1841 (decreto de provincia foral).
>
> Sub_entidades sugeridas (confirmar al revisar `entidades/pamplona-navarra.yaml`):
>
> - `champana` (1234-1274) — 3 reyes: Teobaldo I, Teobaldo II, Enrique I.
> - `capeto` (1274-1425) — Juana I, Felipe I, Luis I, Juan I, Felipe II, Carlos I, Juana II, Felipe III, Carlos II el Malo, Carlos III el Noble.
> - `trastamara-foix` (1425-1517) — Blanca I, Juan II, Carlos IV, Leonor, Francisco Febo, Catalina.
> - `austrias-borbon` (1515/1620-1841) — **NO crear fichas nuevas**: estos reyes ya viven en `leon-castilla/` (Carlos I, Felipe II-IV, Carlos II, Felipe V, Fernando VI, Carlos III, Carlos IV, Fernando VII, Isabel II) con `tambien_reino_en` apuntando a `pamplona-navarra`. Verifica que el campo está presente en sus frontmatters; si falta para algún rey post-1715, sugiere el patch pero no lo apliques sin preguntar.
>
> **Aviso de slug:** Pamplona-Navarra tiene tres `enrique-i` posibles (Enrique I de Champaña, los Enriques de Capeto homónimos). Si hay colisión con un `enrique-i.md` ya existente en otra entidad **dentro de la misma carpeta** no es problema (cada entidad tiene su carpeta), pero verifica numeración interna antes de crear el fichero.
>
> **Reinas reinantes** del bloque que entran con id propio: Juana I (1274-1305), Juana II (1328-1349), Blanca I (1425-1441), Leonor (1479), Catalina (1483-1517). Aplica la convención cerrada.
>
> **Slot temporal del bloque:** finaliza en 1517 con Catalina (último monarca de la Navarra independiente plena tras la conquista castellana de 1512); el periodo 1515-1841 ya está cubierto vía `tambien_reino_en` desde leon-castilla.
>
> **Resultado esperado:** ~22 markdowns nuevos en `src/content/hispania/soberanos/pamplona-navarra/`, ATTRIBUTIONS actualizado, build verde con ~248 páginas, un commit limpio.

### Bloque B — Reino de Portugal Bragança (14 reyes, 1640-1910)

> Migra el bloque **Reino de Portugal — dinastía Bragança** completo: João IV (Restauración 1640) hasta Manuel II (caída de la monarquía 1910).
>
> **AVISO CRÍTICO de slug-collision:** existe `leon-castilla/carlos-i.md` (Carlos I de Castilla = Carlos V emperador). El penúltimo Bragança es Carlos I de Portugal (1889-1908). Como cada entidad tiene su carpeta no chocan en disco, pero **el sufijo `-portugal` ya se usa en este proyecto** para los homónimos: ver `pedro-i-portugal.md`, `sancho-i-portugal.md`, `fernando-i-portugal.md`, `henrique-i.md` (este último por casualidad sin colisión, pero ya en uso). Aplica el mismo patrón: `carlos-i-portugal.md`. Igual con `pedro-iv` (= Pedro I de Brasil) si fuera necesario diferenciarlo.
>
> **Reinas reinantes** del bloque: Maria I (1777-1816, primera reina propietaria de Portugal), Maria II (1826-1828 y 1834-1853, atravesada por las guerras liberales contra el usurpador Miguel I).
>
> **Antirreyes/pretendientes:** Miguel I (1828-1834) entra como ficha — usurpador legitimista que reinó de facto 6 años, no es un caso ambiguo como La Beltraneja. Aplica la convención de Ordoño IV el Malo: ficha completa con descripción matizada del usurpamiento.
>
> **Decisión 5 del TODO (cierre temporal):** sugerencia consensuada — cerrar en 1910 con Manuel II (proclamación de la República como hito jurídico). NO incluir pretendientes contemporáneos (Bragança-Saxe-Coburgo, miguelistas). Confirma esto conmigo antes de empezar.
>
> **Sub_entidades:** crear sub_entidad `bragança` en `entidades/reino-portugal.yaml` si no existe. La sub_entidad `filipina` (1580-1640) **no genera fichas** — esos tres Felipes ya viven en `leon-castilla/`.
>
> **Lista de slugs (14 reyes):** `joao-iv`, `afonso-vi`, `pedro-ii`, `joao-v`, `jose-i`, `maria-i`, `joao-vi`, `pedro-iv` (o `pedro-iv-portugal` si necesitas diferenciar), `maria-ii`, `miguel-i`, `pedro-v`, `luis-i`, `carlos-i-portugal`, `manuel-ii`. Verifica colisiones con las carpetas existentes antes de crear.
>
> **Resultado esperado:** 14 markdowns en `src/content/hispania/soberanos/reino-portugal/`, ATTRIBUTIONS con sección "## Retratos Bragança", build verde con ~240 páginas, un commit limpio.

### Bloque C — Aragón Habsburgo/Borbón (sin fichas nuevas)

> Este bloque NO requiere migrar soberanos. Los seis reyes (Carlos I → Felipe V, 1516-1707) ya viven en `leon-castilla/` con `tambien_reino_en: [aragon, ...]`. Tu tarea es **documental, no de contenido**:
>
> 1. Verifica que las 6 fichas de `leon-castilla/` (`carlos-i.md`, `felipe-ii.md`, `felipe-iii.md`, `felipe-iv.md`, `carlos-ii.md`, `felipe-v.md`) tienen `aragon` en su `tambien_reino_en`. Si falta en alguna, propón el patch.
> 2. Decide con el dueño si la entidad `aragon` (`src/content/hispania/entidades/aragon.yaml`) necesita una sub_entidad `austrias-borbon` (1516-1707) con descripción narrativa de los Decretos de Nueva Planta de 1707. Si sí, propón el YAML; no lo apliques sin confirmar.
> 3. Tras confirmación, actualiza `MIGRATION-TODO.md` marcando este bloque como ✓ resuelto sin fichas nuevas.
>
> **Bloque ligero. Sin descargas de imágenes, sin commits de contenido.** Solo verificación + posible nota narrativa en el YAML de la entidad.

### Bloque D — Taifas-menores (decisión, no migración)

> Este bloque **no es una migración estándar**. La entidad esqueleto `taifas-menores.yaml` ya está commited (14 sub_entidades — Almería, Murcia, Denia, Alpuente, Albarracín, Niebla, Silves, Algeciras, Ronda, Málaga hammudí, Mértola, Carmona, Arcos, Morón) y la página `/hispania/taifas-menores` se renderiza ya con la lista de sub_entidades sin fichas individuales (UI feature implementada en commit `3413018`).
>
> Tu tarea es **proponer y discutir** la decisión:
>
> A. Mantener taifas-menores como agregado documental — sin soberanos individuales, solo la página de lista. Bajo coste, ya funciona.
>
> B. Poblar con soberanos individuales — añadir 30+ markdowns en `src/content/hispania/soberanos/taifas-menores/`. Coste alto, problemas serios de imagen (mayoría sin retrato y sin acuñación bien identificada para muchas dinastías menores).
>
> C. Híbrido — solo poblar las taifas con dinastías documentadas (Almería eslavona, Murcia eslavona, Denia eslavona, Niebla árabe, Carmona zanata) dejando el resto como agregado.
>
> Tras lectura del estado y de las fuentes referenciadas en `entidades/taifas-menores.yaml`, **propón la opción y por qué**. NO migres nada hasta que el dueño confirme.

---

## Verificación post-sesión

Tras Sonnet terminar, el operador ejecuta:

```bash
cd ~/SitesWeb/ibrahim/darasa
git status                                         # working tree limpio
git log --oneline -3                               # commit de Sonnet visible
ls src/content/hispania/soberanos/<entidad>/ | wc -l   # número de fichas esperado
npm run build                                      # build verde, páginas esperadas
```

Páginas esperadas tras cada bloque (estado actual: 244 tras Bloque A):

- ~~Bloque A (Pamplona-Navarra post-1234)~~ — **✓ HECHO**: 244 páginas.
- Tras Bloque B (Bragança, 14): ~258
- Tras Bloque C (Aragón documental): 244 (sin fichas nuevas)

Y revisar visualmente algún markdown al azar para confirmar tono y schema:

```bash
cat src/content/hispania/soberanos/pamplona-navarra/teobaldo-i.md  # ejemplo
```

Debe tener: frontmatter completo (slug, entidad, sub_entidad si aplica, id, nombre, inicio, fin, img, hechos, fuentes), tono factual matizado sin "Reconquista" ni teleología, epítetos solo canónicos, mínimo 3 fuentes, cuerpo 2-5 párrafos.

## Mensaje de commit (patrón validado)

```
content(<entidad>): add <N> sovereigns <inicio>-<fin> (<dinastía>)

<Nombre del primer rey> through <nombre del último>. Covers the full
<dinastía> line (ids X-Y). All portraits null pending Commons research.
ATTRIBUTIONS updated with placeholder note.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

Mirar `git log --oneline | head -10` para más ejemplos del estilo del proyecto.
