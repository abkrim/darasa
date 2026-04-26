# Prompt para sesión Sonnet — bloque León-Castilla 910-1230

Pega esto literal al inicio de una sesión nueva con Claude Sonnet. La sesión Opus de 2026-04-26 dejó toda la infraestructura preparada: documentación, entidades, 16 retratos pre-descargados.

---

## Prompt para pegar

> Hola, voy a migrar el bloque León-Castilla 910-1230 de darasa, mi atlas histórico de la Península Ibérica. Una sesión Opus previa dejó toda la base preparada: schemas, entidades, documentación, memoria del proyecto y 16 retratos pre-descargados de los 23 que necesitamos. Tu tarea es ejecutar la migración mecánica siguiendo la guía.
>
> **Antes de tocar nada, lee en este orden:**
>
> 1. `~/SitesWeb/ibrahim/darasa/CLAUDE.md` — convenciones del proyecto darasa
> 2. `~/SitesWeb/ibrahim/darasa/docs/MIGRATION-GUIDE.md` — el "cómo" mecánico
> 3. `~/SitesWeb/ibrahim/darasa/docs/MIGRATION-TODO.md` — la lista exhaustiva de soberanos pendientes (sección "León-Castilla 910-1230")
> 4. `~/SitesWeb/ibrahim/darasa/DESIGN.md` § Color — solo si necesitas confirmar paleta
> 5. La memoria del proyecto: `~/.claude/projects/-Users-abkrim-SitesWeb-ibrahim-darasa/memory/feedback_historiographic_tone.md` (si tienes acceso)
>
> **Tarea concreta:**
>
> 1. Descarga los 23 retratos. URLs en MIGRATION-TODO.md, sección "León-Castilla 910-1230 → Retratos a descargar". Hazlo en serie con `sleep 2` entre peticiones para evitar rate-limit 429 de Wikimedia. Si recibes 429, espera 30 segundos y reintenta.
> 2. Crea los 23 markdowns en `src/content/hispania/soberanos/leon-castilla/<slug>.md`. El orden y los datos de cada rey están en MIGRATION-TODO.md.
> 4. Aplica el tono historiográfico del feedback de memoria: evitar "Reconquista", matizar mitos, epítetos solo canónicos, sucesiones femeninas en hechos, sin teleología castellanista. La guía y la memoria explican por qué.
> 5. Actualiza `public/portraits/ATTRIBUTIONS.md` con la nueva sección "## Retratos leoneses y castellanos" (las filas exactas están en MIGRATION-TODO.md).
> 6. Ejecuta `npm run build` y verifica que las 23 rutas `/hispania/soberanos/<slug>/` se generan.
> 7. Commit limpio: solo los nuevos markdowns + ATTRIBUTIONS.md actualizado. Mensaje en inglés siguiendo el patrón de los commits previos del proyecto (ver `git log --oneline`). Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>.
>
> **NO toques** los siguientes ficheros — son herencia de otra sesión que el dueño manejará por su cuenta:
>
> - `src/pages/hispania/[entidad].astro` (modificado)
> - `src/styles/components.css` (modificado)
> - `docs/IMAGES-AL-ANDALUS.md` (untracked)
> - `src/content/hispania/entidades/taifas-menores.yaml` (untracked)
> - `src/content/hispania/soberanos/al-andalus/` (untracked, completa)
>
> Stagear únicamente los ficheros que tú crees o modifiques en esta tarea.
>
> **Pregúntame antes** de:
>
> - Tomar decisiones de modelado no cubiertas por la guía o el TODO (slugs, sub_entidades, linaje)
> - Modificar el schema en `src/content.config.ts`
> - Tocar tokens en `src/styles/tokens.css`
> - Crear entidades nuevas (las 5 nuevas ya están creadas, no hay que tocar)
> - Cualquier cambio en `CLAUDE.md`, `DESIGN.md`, o las dos docs `MIGRATION-*.md`
>
> **Resultado esperado al cerrar la sesión:** 23 nuevos markdowns, 7 retratos descargados, ATTRIBUTIONS actualizado, build verde con ~147 páginas, un commit limpio.
>
> Si algo no encaja con la guía, para y avísame antes de improvisar. Empieza por confirmar que has leído los 4 documentos y que entiendes el alcance.

---

## Verificación que el operador hace en sesión Sonnet

Tras Sonnet terminar, verificar:

```bash
cd ~/SitesWeb/ibrahim/darasa
git log --oneline -3        # debe verse el nuevo commit de Sonnet
ls src/content/hispania/soberanos/leon-castilla/ | wc -l   # debe ser 23
npm run build               # debe pasar limpio, ~147 páginas
```

Y revisar visualmente algún markdown al azar para confirmar tono:

```bash
cat src/content/hispania/soberanos/leon-castilla/alfonso-vi.md
```

Debe tener: frontmatter completo, sub_entidad correcta, hechos con sucesiones, fuentes mínimo 3, cuerpo 2-5 párrafos sin "Reconquista" ni teleología castellanista.

## Bloques siguientes después

Cuando 910-1230 esté listo, los siguientes bloques recomendados (cada uno una sesión Sonnet aparte):

1. **León-Castilla 1230-1474** (Trastámara): 12 reyes, mismo patrón, sin `tambien_reino_en` aún.
2. **Cataluña / Condado de Barcelona**: 10-12 condes 878-1162. Bloque autocontenido y pequeño.
3. **Aragón medieval 1035-1410**: 10-12 reyes. Estrena `tambien_reino_en` apuntando a Pamplona-Navarra.
4. **Pamplona-Navarra 824-1234**: 16 reyes. Caso paradigmático de Sancho III el Mayor con `tambien_reino_en: [leon-castilla, aragon, cataluña]`.
5. **Portugal Borgoña + Avís** 1139-1580: 17 reyes.
6. **Habsburgo 1516-1700**: caso de máxima complejidad — 5 reyes en León-Castilla principal con `tambien_reino_en` apuntando a Aragón, Navarra y (algunos) Portugal.
7. **Borbones siglo XVIII-XIX**: cierres temporales de cada corona.
8. **Portugal Bragança** 1640-1910: 14 reyes.

Cada uno reutilizará la misma `MIGRATION-GUIDE.md`. Solo MIGRATION-TODO.md se actualiza al cerrar cada bloque.
