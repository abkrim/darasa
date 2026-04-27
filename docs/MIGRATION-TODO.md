# TODO de migración — soberanos pendientes

Estado a 2026-04-27. Actualizar cada vez que se complete un bloque.

## Estado por entidad

| Entidad | Cubierta | Pendiente | Bloque siguiente |
|---|---|---|---|
| Visigodos | 31 / 31 | ✓ completa | — |
| Al-Ándalus | 71 / 71 | ✓ completa | — |
| Asturias | 12 / 12 | ✓ completa | — |
| León-Castilla 910-1230 | 23 / 23 | ✓ completa | — |
| León-Castilla 1230-1474 (Trastámara) | 12 / 12 | ✓ completa | — |
| León-Castilla 1474-1715 (Austrias y primeros Borbones) | 6 / 6 | ✓ completa | — |
| Pamplona-Navarra 824-1234 (Arista + Jiménez) | 13 / 13 | ✓ completa | — |
| **Pamplona-Navarra post-1234** | **0 / ~22** | **~22** | **Champaña → Capeto → Trastámara → Habsburgo** |
| Aragón medieval + Trastámara | 20 / 20 | ✓ completa | — |
| **Aragón Habsburgo/Borbón** | **0 / ~6** | **~6** | **Carlos I → Felipe V (Decretos Nueva Planta 1707)** |
| Cataluña / Barcelona | 11 / ~11 | ✓ completa | — |
| Reino de Portugal Borgoña + Avís | 17 / 17 | ✓ completa | — |
| **Reino de Portugal Bragança** | **0 / ~14** | **~14** | **João IV → Manuel II (1640-1910)** |
| Taifas-menores | 0 / ~30 | ~30 | a decidir si se pueblan o se dejan como agregado |

**Total estimado pendiente:** ~42 soberanos en 3 bloques activos (sin contar taifas-menores, cuya inclusión está por decidir).

**Estado del build:** 226 páginas, 0 errores Zod (2026-04-27).

## Pamplona-Navarra post-1234 (bloque pendiente)

Entidad: `pamplona-navarra`. Sub_entidades sugeridas: `champaña` (1234-1274), `capeto` (1274-1425), `trastamara-foix` (1425-1517), `austrias-borbon` (1515/1620-1841 con `tambien_reino_en: leon-castilla`).

Casa de Champaña (1234-1274):

- `teobaldo-i` (1234-1253)
- `teobaldo-ii` (1253-1270)
- `enrique-i` (1270-1274)

Casa Capeto (1274-1425):

- Juana I, Felipe I, Luis I, Juan I, Felipe II, Carlos I, Juana II, Felipe III, Carlos II el Malo, Carlos III el Noble

Trastámara y Foix (1425-1517):

- Blanca I, Juan II, Carlos IV, Leonor, Francisco Febo, Catalina

Habsburgo + Borbón post-1515: fichas solo en `leon-castilla` con `tambien_reino_en` apuntando a `pamplona-navarra` (siguiendo la convención ya aplicada para Carlos I y Felipe II).

## Aragón Habsburgo/Borbón (bloque pendiente)

Convención ya validada en `leon-castilla/carlos-i.md` y `leon-castilla/felipe-ii.md`: las fichas de Carlos I, Felipe II, Felipe III, Felipe IV, Carlos II y Felipe V (1700-1715) viven en `leon-castilla` con `tambien_reino_en: [aragon, pamplona-navarra, ...]`. Por tanto **este bloque no genera fichas nuevas en `aragon/`**: se cierra documentalmente al constatar que las 6 fichas de leon-castilla cubren también el periodo aragonés hasta los Decretos de Nueva Planta de 1707.

Lo único pendiente real es decidir si la entidad `aragon` necesita una nota narrativa sobre el cierre de 1707 (en su YAML o en un documento de descripción). No requiere sesión Sonnet de soberanos.

## Reino de Portugal — Filipina + Bragança (bloque pendiente)

Sub_entidades sugeridas: `filipina` (1580-1640) y `bragança` (1640-1910).

Filipina (1580-1640): tres reyes que **NO generan fichas nuevas** — Felipe II/III/IV de Castilla ya viven en `leon-castilla` con `tambien_reino_en: [..., reino-portugal]`. Convención aplicada. La entidad `reino-portugal` puede mostrar el periodo como hueco o como referencia cruzada cuando exista la página `[entidad].astro`.

Bragança (1640-1910), 14 reyes a migrar:

- `joao-iv` (1640-1656) — el Restaurador
- `afonso-vi` (1656-1683)
- `pedro-ii` (1683-1706)
- `joao-v` (1706-1750) — el Magnánimo
- `jose-i` (1750-1777)
- `maria-i` (1777-1816)
- `joao-vi` (1816-1826) — corte en Río de Janeiro
- `pedro-iv` (1826) — = Pedro I de Brasil. Brevísimo
- `maria-ii` (1826-1828, 1834-1853)
- `miguel-i` (1828-1834) — usurpador, guerras liberales
- `pedro-v` (1853-1861)
- `luis-i` (1861-1889)
- `carlos-i` (1889-1908) — asesinado. **Conflicto de slug:** ya existe `leon-castilla/carlos-i.md`. Resolver con `carlos-i-portugal.md` o variante similar siguiendo el patrón de `pedro-i-portugal.md`, `sancho-i-portugal.md`, `fernando-i-portugal.md`.
- `manuel-ii` (1908-1910) — derrocado

## Decisiones pendientes

1. **Reinas reinantes** — **RESUELTA y aplicada**: Urraca I (`leon-castilla/urraca-i.md`, id 16), Petronila (`aragon/petronila.md`), Juana I (`leon-castilla/juana-i.md`, id 35) e Isabel I (`leon-castilla/isabel-i.md`) están como soberanas con id propio. Quedan por aplicar la misma política a Catalina de Navarra (bloque post-1234) y a Maria I y Maria II de Portugal (bloque Bragança). Caso especial: Berenguela de Castilla — abdicó en Fernando III sin reinar efectivamente; **decidir** si se le crea ficha o solo se menciona en `fernando-iii.md`.
2. **Antirreyes y pretendientes** — **precedente parcial**: `ordono-iv.md` (id 8, "el Malo") existe como ficha completa, lo que sienta el principio "usurpador notable → ficha". Quedan por decidir caso a caso: La Beltraneja (Enrique IV vs Isabel), archiduque Carlos vs Felipe V (Guerra de Sucesión), Miguel I de Portugal vs María II (guerras liberales — el TODO ya lo lista como ficha en Bragança). Pedro I vs Enrique II Trastámara ya están ambos como fichas separadas en `leon-castilla`.
3. **Numeración compartida** — **RESUELTA y aplicada**: convención implementada en `leon-castilla/carlos-i.md` (`nombre: "Carlos I"` con la numeración de la entidad principal; numeración imperial "Carlos V" en `hechos` y prosa). Aplicar el mismo patrón en los bloques pendientes.
4. **Filipinos** — **RESUELTA y aplicada**: `leon-castilla/felipe-ii.md` tiene `tambien_reino_en: [aragon, pamplona-navarra, reino-portugal]` y NO existe ficha duplicada en `reino-portugal/`. Convención: ficha única en `leon-castilla`, referencia cruzada vía `tambien_reino_en`.
5. **Final temporal de Portugal** — **abierta**. Decisión sugerida: cerrar en 1910 (proclamación de la República como hito jurídico) y no incluir pretendientes contemporáneos Bragança-Saxe-Coburgo / Bragança-Miguelista. Confirmar al iniciar el bloque Bragança.

## Próximas sesiones

1. **Pamplona-Navarra post-1234** — ~22 soberanos en cuatro casas dinásticas (Champaña, Capeto, Trastámara-Foix, Habsburgo+Borbón post-1515 que solo añaden `tambien_reino_en`). Bloque más grande pendiente.
2. **Reino de Portugal — Bragança** — 14 soberanos 1640-1910. Resolver el slug-collision con `carlos-i` antes de empezar (sugerencia: `carlos-i-portugal.md`).
3. **Aragón Habsburgo/Borbón** — sin soberanos nuevos (todos ya en `leon-castilla`). Bloque ligero, solo nota narrativa sobre Decretos de Nueva Planta 1707 si se considera necesario.
4. **Taifas-menores** — entidad esqueleto creada (`entidades/taifas-menores.yaml`, untracked). Decidir si poblar con soberanos individuales o mantener como agregado documental.

Cada sesión: ~10-15 reyes en formato Sonnet siguiendo `MIGRATION-GUIDE.md`. Verificación final con `npm run build` y commit limpio.
