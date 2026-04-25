# docs/PLAN-AL-ANDALUS.md — Plan de investigación para el contenido de Al-Ándalus

Este documento es un **plan vivo para una sesión separada**. No ejecutarlo entero en la misma ventana que otra tarea de contenido — los requisitos de verificación de fuentes son demandantes y merecen foco.

**Última actualización:** 2026-04-25
**Estado:** Fase 0 ✓ + decisiones editoriales cerradas + cobertura RAH completa (24 entradas en segunda batida automatizada + 2 verificadas manualmente por el maintainer en sitio moderno `historia-hispanica.rah.es`). Pendiente: arrancar Fase 1 con Abd al-Rahman III.

## Contexto y justificación

Al-Ándalus ocupa ocho siglos (711-1492) de la historia peninsular y forma parte propia de la herencia familiar del autor. La narrativa historiográfica castellano-céntrica tradicional lo presenta como bloque monolítico y como "paréntesis" en la historia de España. Este proyecto lo trata al **mismo nivel de profundidad** que los reinos cristianos: sub-entidades propias con arcos temporales definidos, soberanos individuales con fuentes académicas, iconografía propia.

## Estructura decidida (del design doc)

La entidad `al-andalus` tiene 7 sub-entidades cronológicas:

| Sub-entidad | Slug | Años | Descripción breve |
|-------------|------|------|-------------------|
| Emirato dependiente | `emirato-dependiente` | 711-756 | Waliatos de Damasco |
| Emirato independiente | `emirato-independiente` | 756-929 | Ruptura omeya, dinastía propia en Córdoba |
| Califato de Córdoba | `califato` | 929-1031 | Abd al-Rahman III → fitna |
| Primeras Taifas | `taifas` | 1031-1086 | Fragmentación post-fitna |
| Almorávides | `almoravides` | 1086-1147 | Dinastía norteafricana |
| Almohades | `almohades` | 1147-1232 | Segunda dinastía norteafricana |
| Nazaríes (Granada) | `nazaries` | 1232-1492 | Último reducto, Boabdil |

Cada sub-entidad necesita soberanos documentados. Las Taifas son especialmente complejas (20+ reinos simultáneos); ver § *Fase 3* más abajo.

## Fases de trabajo

### Fase 0 — Verificar fuentes base (antes de escribir cualquier ficha)

**Objetivo:** confirmar qué fuentes primarias y secundarias están disponibles en español e inglés, con acceso digital.

1. **Real Academia de la Historia** ([dbe.rah.es](https://dbe.rah.es/)):
   - Buscar biografías existentes de los principales emires, califas, reyes de taifas y sultanes nazaríes.
   - Documentar qué figuras tienen entrada RAH y cuáles no.
2. **Dialnet** ([dialnet.unirioja.es](https://dialnet.unirioja.es/)):
   - Buscar artículos recientes (2000+) sobre cada sub-entidad.
   - Priorizar autores de referencia: Maribel Fierro (CSIC), Manuela Marín, Pierre Guichard, Joaquín Vallvé.
3. **Monografías base:**
   - Lévi-Provençal, E. (1944-1953) *Histoire de l'Espagne musulmane*. Maisonneuve / Brill, 3 vols. (T1: La conquête et l'émirat hispano-umaiyade 710-912; T2: Le Califat Umaiyade de Cordoue 912-1031; T3: Le siècle du Califat de Cordoue).
   - Kennedy, H. (1996, reimpr. Routledge 2014) *Muslim Spain and Portugal: A Political History of al-Andalus*. Longman.
   - Fierro, M. (2010) *Abderramán III y el califato omeya de Córdoba*. Nerea, Donostia-San Sebastián, 292 pp.
   - Chalmeta, P. (1994) *Invasión e islamización: la sumisión de Hispania y la formación de al-Andalus*. Mapfre, 439 pp. Reed. revisada Univ. Jaén, 2003.
4. **Wikimedia Commons:**
   - Explorar miniaturas existentes para cada soberano principal. Muchos no tienen retrato auténtico (no había tradición figurativa), se usan monedas, inscripciones o representaciones posteriores.

**Entregable de la Fase 0 — ✓ completado el 2026-04-25:** `docs/FUENTES-AL-ANDALUS.md` con, por sub-entidad, cobertura RAH (con URLs canónicas), perfiles Dialnet, monografías verificadas, inventario Wikimedia Commons y huecos pendientes.

### Fase 1 — Entidad al-andalus.yaml + primera sub-entidad (Califato)

El califato de Córdoba (929-1031) es el periodo más documentado y de mayor impacto cultural. Empezar por ahí:

**Soberanos del Califato a documentar:**

1. Abd al-Rahman III (912-961) — proclama el califato en 929.
2. Al-Hakam II (961-976) — Medina Azahara, mecenas intelectual.
3. Hisham II (976-1009 / 1010-1013) — reinado nominal, poder real de Almanzor.
4. Suleiman al-Mustain, Muhammad II, Hisham III — fitna 1009-1031, complejo.

Cada uno requiere: entrada RAH si existe, 1-2 monografías, posible retrato de moneda o dinar en Commons.

Secundariamente, ficha de Almanzor (al-Mansur), hachib de Hisham II y poder real del califato 978-1002. Decisión cerrada en § *Decisiones pendientes → 1*; tratamiento como soberano *de facto* dentro de `sub_entidad: califato`.

### Fase 2 — Emirato (dependiente + independiente)

Menos glamuroso que el califato pero foundational. Figuras clave:

- Abd al-Rahman I *al-Dakhil* (756-788) — funda el emirato independiente, llega desde Damasco.
- Hisham I, Al-Hakam I, Abd al-Rahman II — expansión, consolidación, mozárabes.
- Muhammad I, Al-Mundhir, Abdallah — crisis del s. IX.

### Fase 3 — Taifas (decisión editorial requerida)

Más de 20 taifas. No todas merecen ficha individual. Propuesta: **ficha por reino, no por soberano** para las taifas menores, y **ficha por soberano** para las principales.

**Taifas con ficha completa de soberanos:**

- Sevilla (abbadíes: al-Mutamid y su padre al-Mu'tadid).
- Toledo (dhúnnuníes: al-Mamún, al-Qádir; al-Mamún sin entrada RAH directa, apoyar la ficha en Viguera Molins 1994 y Wasserstein 1985).
- Zaragoza (hudíes: Sulayman, al-Muqtadir, al-Mu'tamin, al-Musta'in, 'Imad al-Dawla — los 5 con ficha RAH directa).
- Granada zirí (Badis ibn Habus; cobertura RAH a verificar).
- Badajoz (aftasíes; cobertura RAH a verificar).
- Valencia (al-Qadir tras pérdida de Toledo, periodo del Cid; cobertura RAH a verificar).

**Taifas menores:** ficha por entidad (p.ej. "Taifa de Almería"), con mención a sus emires principales en el cuerpo del MD pero sin archivo `soberano/.md` individual.

### Fase 4 — Almorávides, Almohades, Nazaríes

- **Almorávides:** Yusuf ibn Tashfin, Ali ibn Yusuf, Tashfin ibn Ali.
- **Almohades:** Abd al-Mumin, Abu Yaqub Yusuf, Abu Yusuf Yaqub al-Mansur.
- **Nazaríes:** dinastía completa, Muhammad I (fundador, 1232, *Ibn al-Ahmar*) a Boabdil/**Muhammad XI** (último, 1492). **Nota de numeración:** RAH y fuentes árabes recientes corrigen la numeración tradicional; Muhammad XII designa ahora a *al-Zagal* (1485-1487), no a Boabdil. Cada ficha debe explicitar el cambio en el cuerpo cuando aplique.

Los nazaríes son particularmente documentados por su tardía desaparición y por Granada como sede.

## Decisiones editoriales

Decisiones cerradas en Fase 0 (2026-04-25). Cada una se refleja en fichas concretas durante las Fases 1–4.

1. **¿Ficha de Almanzor (al-Mansur)?** — Hachib (chambelán) de Hisham II, poder real del califato 978-1002 sin ser califa. Importante históricamente pero rompe la convención "soberano = rey/emir/califa". **Decisión (confirmada Fase 0):** sí ficha, con `sub_entidad: califato` y nota al cuerpo clarificando el rol. RAH avala el tratamiento con dos entradas independientes (una breve, una extensa académica), confirmándolo como figura de primer nivel pese al rol formal de hachib.
2. **¿Taifas con ficha por entidad o por soberano?** **Decisión cerrada (2026-04-25):** modelo híbrido. Ficha por soberano para 6 taifas principales (Sevilla, Toledo, Zaragoza, Granada zirí, Badajoz, Valencia) — detalle en Fase 3 § *Taifas con ficha completa de soberanos*. Resto (~14+ taifas: Almería, Murcia, Denia, Alpuente, Albarracín, Niebla, Silves, Algeciras, Ronda, Málaga, Mértola, Carmona, Arcos, Morón…) ficha sólo por entidad, con menciones en el cuerpo del MD.
3. **Imágenes para fichas de Al-Ándalus.** **Decisión cerrada (2026-04-25):** jerarquía obligatoria, en orden:
   1. Moneda contemporánea (dirham, dinar, fels) o inscripción epigráfica.
   2. Objeto material atribuido (casco, espada, sello) si autenticidad razonable.
   3. Miniatura en manuscrito coetáneo o cercano (árabe o cristiano).
   4. Último recurso: representación posterior (decimonónica, moderna), *siempre* marcada en `imgCredit` con fórmula explícita ("Representación idealizada [año], no retrato auténtico").

   Caso especial Boabdil: hay 2200+ archivos en Commons; preferir el casco atribuido, moneda nazarí, o miniatura sobre Pradilla/Fortuny por defecto. Si no hay opción 1-3, ficha sin imagen es preferible a representación moderna sin marcar (`img: null` con placeholder de inicial).
4. **Transliteración de nombres árabes.** **Decisión cerrada (2026-04-25):**
   - **Slug por defecto:** transliteración académica española sin diacríticos (`abd-al-rahman-iii`, `al-mutamid-ibn-abbad`, `muhammad-xi`). RAH usa esta forma como entrada canónica.
   - **Excepciones (slug castellanizado):** sólo cuando la forma castellanizada es el nombre dominante y el académico es técnicamente correcto pero ajeno al lector general. Caso por caso, registrado en comentario YAML/MD. Candidatos plausibles: `boabdil`, `almanzor`. Resto: académico.
   - **Cuerpo del MD:** mencionar la forma castellanizada en la primera línea si es famosa (Almanzor por al-Mansur, Boabdil por Muhammad XI según numeración RAH corregida).
5. **Fechas.** **Decisión cerrada (2026-04-25):**
   - **`inicio`/`fin` (calendario gregoriano):** primer acceso al trono y última salida (incluyendo todos los periodos intermedios). Para reinados interrumpidos (Hisham II 976-1009/1010-1013, varios nazaríes), `inicio` = 976 y `fin` = 1013. El cuerpo del MD desglosa los periodos.
   - **Cuerpo del MD:** mencionar la fecha hiyrí cuando sea relevante (proclamación del califato, conquistas hito). Formato: `929 EC / 317 H` (gregoriano primero por audiencia primaria).

## Plan de ejecución (otra sesión)

Orden propuesto para la sesión dedicada:

1. **✓ Fase 0 ejecutada (2026-04-25):** investigación de fuentes completada, entregable en `docs/FUENTES-AL-ANDALUS.md`. Cobertura RAH completa tras verificación manual del maintainer en el sitio moderno `historia-hispanica.rah.es` (Muhammad I emir y Yaqub al-Mansur almohade resueltos).
2. **✓ Decisiones editoriales validadas (2026-04-25):** las 5 decisiones están cerradas en § *Decisiones editoriales*.
3. **✓ `al-andalus.yaml` creado (2026-04-25):** entidad con 7 sub-entidades cronológicas (`emirato-dependiente`, `emirato-independiente`, `califato`, `taifas`, `almoravides`, `almohades`, `nazaries`). Schema ampliado con `tipo: epoca`. Validado con `astro sync`.
4. **✓ Tokens consolidados (2026-04-25):** decisión de tratar Al-Ándalus con un único color cromático (verde, 711-1492). Tokens `--c-taifas-*` retirados de `tokens.css` (eran huérfanos). DESIGN.md § Color actualizado, decisión registrada en Decisions Log. La diferenciación entre sub-fases se delega a tipografía, emblema y layout.
5. Ejecutar **Fase 1** (Califato) con los 3-4 califas principales + posible ficha de Almanzor.
6. Revisar build, verificar que `/hispania/al-andalus/` muestra el grid correctamente.
7. Abrir PR (o commit si solo maintainer).
8. Fases siguientes en sesiones separadas.

## Notas de scope creep a evitar

- **No investigar arte o arquitectura** en esta ronda. Medina Azahara, la Mezquita de Córdoba, la Alhambra — son temas propios que merecen ficha de "lugar" o "monumento" en un futuro. No confundir con fichas de soberano.
- **No añadir mapas** en esta ronda (cartografía es Fase 2 del proyecto, no de Al-Ándalus).
- **No abrir temas genealógicos** (árboles omeyas, bodas políticas). Mencionar en el cuerpo cuando sea relevante, sin convertirlo en sistema.

## Criterio de éxito

Al cierre del plan Al-Ándalus:

- [ ] `al-andalus.yaml` con las 7 sub-entidades correctas.
- [ ] Al menos 20 soberanos documentados con fuentes académicas verificables.
- [ ] Los 3 califas principales (Abd al-Rahman III, Al-Hakam II, Hisham II) con ficha completa incluyendo imagen (moneda o inscripción si no hay retrato).
- [ ] `ATTRIBUTIONS.md` actualizado con todas las imágenes añadidas.
- [ ] Build verde, páginas visibles en `http://darasa.test/hispania/al-andalus/`.
- [ ] Sin cambios en tokens de color (o con cambios documentados en `DESIGN.md`).
