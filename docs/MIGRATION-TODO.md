# TODO de migración — soberanos pendientes

Estado a 2026-04-26. Actualizar cada vez que se complete un bloque.

## Estado por entidad

| Entidad | Cubierta | Pendiente | Bloque siguiente |
|---|---|---|---|
| Visigodos | 1 / ~31 | ~30 | revisar `~/SitesWeb/ibrahim/reges-hispaniae/assets/data.js` |
| Al-Ándalus | ~50 / ~50 | revisar | parcheo de errores si los hay |
| Taifas-menores | 0 / ~30 | ~30 | a decidir si se pueblan o se dejan como agregado |
| Asturias | 12 / 12 | ✓ completa | — |
| **León-Castilla 910-1230** | **0 / 23** | **23** | **bloque actual** |
| León-Castilla 1230-1474 (Trastámara) | 0 / ~12 | ~12 | tras 1230 |
| León-Castilla 1474-1715 (Austrias y primeros Borbones) | 0 / ~6 | ~6 | con `tambien_reino_en` |
| Pamplona-Navarra | 0 / ~35 | ~35 | desde Íñigo Arista |
| Aragón | 0 / ~20 | ~20 | desde Ramiro I |
| Cataluña / Barcelona | 0 / ~12 | ~12 | desde Wifredo el Velloso |
| Reino de Portugal | 0 / ~35 | ~35 | desde Afonso I Henriques |

**Total estimado pendiente al cerrar este bloque (910-1230):** ~125 soberanos.

## León-Castilla 910-1230 (bloque actual, en migración)

Entidad: `leon-castilla`. Sub_entidades activas en este bloque: `leon`, `castilla-independiente`, `leon-castilla-unidos`, `dos-reinos`, `corona-castilla`.

### Sub_entidad `leon` (910-1037) — 12 reyes

| id | Slug | Nombre | Reinado | Notas |
|---|---|---|---|---|
| 1 | `garcia-i` | García I | 910-914 | Primer rey de León, hijo mayor de Alfonso III |
| 2 | `ordono-ii` | Ordoño II | 914-924 | Hermano. Traslada corte a León. Vence en San Esteban de Gormaz (917) |
| 3 | `fruela-ii` | Fruela II | 924-925 | Hermano. Reúne León-Galicia-Asturias por última vez en la división |
| 4 | `alfonso-iv` | Alfonso IV el Monje | 925-931 | Hijo de Ordoño II. Abdica por monasterio. Cegado en revuelta posterior |
| 5 | `ramiro-ii` | Ramiro II el Grande | 931-951 | Hermano. Victoria de Simancas (939) frente a Abd al-Rahman III. Epíteto canónico |
| 6 | `ordono-iii` | Ordoño III | 951-956 | Hijo. Sin epíteto canónico |
| 7 | `sancho-i` | Sancho I el Craso | 956-958, 960-966 | Hermano. Depuesto, viaja a Córdoba para tratamiento, restaurado. Epíteto canónico |
| 8 | `ordono-iv` | Ordoño IV el Malo | 958-960 | Hijo de Alfonso IV. Usurpador. Epíteto consolidado |
| 9 | `ramiro-iii` | Ramiro III | 966-984 | Hijo de Sancho I. Derrotas frente a Almanzor |
| 10 | `bermudo-ii` | Bermudo II el Gotoso | 982/984-999 | Pretendiente, vence a Ramiro III. Saqueo de León por Almanzor (988) |
| 11 | `alfonso-v` | Alfonso V | 999-1028 | Fueros de León (1017). Muere en sitio de Viseu |
| 12 | `bermudo-iii` | Bermudo III | 1028-1037 | Muere en Tamarón frente a Fernando I |

### Sub_entidad `castilla-independiente` (1065-1072) — 1 rey solo

| id | Slug | Nombre | Reinado | Notas |
|---|---|---|---|---|
| 14 | `sancho-ii` | Sancho II el Fuerte | 1065-1072 | Solo Castilla. Asesinado en Zamora |

### Sub_entidad `leon-castilla-unidos` (1037-1157) — 4 reyes

| id | Slug | Nombre | Reinado | Notas |
|---|---|---|---|---|
| 13 | `fernando-i` | Fernando I el Magno | 1037-1065 | Hijo de Sancho III de Pamplona. Conde de Castilla, rey de León desde 1037 |
| 15 | `alfonso-vi` | Alfonso VI el Bravo | 1065-1109 | Rey de León 1065-1072, todo desde 1072. Toma Toledo (1085). Derrota en Sagrajas (1086) |
| 16 | `urraca-i` | Urraca I | 1109-1126 | Hija de Alfonso VI. Reina por derecho propio. Casada con Alfonso I de Aragón (anulado) |
| 17 | `alfonso-vii` | Alfonso VII el Emperador | 1126-1157 | Hijo de Urraca y Raimundo de Borgoña. Coronado emperador en León (1135). Divide reino entre hijos |

### Sub_entidad `dos-reinos` (1157-1230) — 5 reyes con linaje

#### `linaje: castilla` (3 reyes)

| id | Slug | Nombre | Reinado | Notas |
|---|---|---|---|---|
| 18 | `sancho-iii` | Sancho III el Deseado | 1157-1158 | Reinado brevísimo. Sin epíteto canónico fuerte |
| 19 | `alfonso-viii` | Alfonso VIII el Noble | 1158-1214 | Las Navas de Tolosa (1212). Funda Universidad de Palencia. Epíteto canónico |
| 20 | `enrique-i` | Enrique I | 1214-1217 | Niño-rey. Muere por accidente en Palencia. Sucede su hermana Berenguela, que abdica en Fernando III |

#### `linaje: leon` (2 reyes)

| id | Slug | Nombre | Reinado | Notas |
|---|---|---|---|---|
| 21 | `fernando-ii` | Fernando II | 1157-1188 | Funda Ciudad Rodrigo. Disputas con Castilla |
| 22 | `alfonso-ix` | Alfonso IX | 1188-1230 | Cortes de León (1188), primeras europeas con tercer estado. Funda Universidad de Salamanca (1218) |

### Sub_entidad `corona-castilla` (desde 1230) — 1 rey en este bloque

| id | Slug | Nombre | Reinado | Notas |
|---|---|---|---|---|
| 23 | `fernando-iii` | Fernando III el Santo | 1217 Castilla, 1230 unión, hasta 1252 | Hijo de Alfonso IX y Berenguela. Toma Córdoba (1236), Sevilla (1248). Canonizado en 1671. Epíteto canónico |

### Retratos a descargar (los 23, ningún pre-descargado)

`public/portraits/` contiene únicamente los retratos consolidados de bloques anteriores (Asturias, Al-Ándalus, visigodos parciales). **Los 23 retratos del bloque 910-1230 deben descargarse desde cero.**

URLs Wikimedia validadas (16 del Museo del Prado, 7 alternativas):

```
garcia-i      https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Garc%C3%ADa_I%2C_rey_de_Le%C3%B3n.jpg/500px-Garc%C3%ADa_I%2C_rey_de_Le%C3%B3n.jpg
ordono-ii     https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Ordo%C3%B1o_II_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-Ordo%C3%B1o_II_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg
fruela-ii     https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Fruela_II_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-Fruela_II_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg
alfonso-iv    https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Alfonso_IV_el_Monje%2C_rey_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-Alfonso_IV_el_Monje%2C_rey_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg
ramiro-ii     https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Ramiro_II_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-Ramiro_II_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg
ordono-iii    https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Ordo%C3%B1o_III_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-Ordo%C3%B1o_III_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg
sancho-i      https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Sancho_I_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-Sancho_I_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg
ordono-iv     https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Ordono_IV_of_Leon_big.jpg/500px-Ordono_IV_of_Leon_big.jpg
ramiro-iii    https://upload.wikimedia.org/wikipedia/commons/7/7c/Retrato-132-Rey_de_Le%C3%B3n-Ramiro_III.jpg
bermudo-ii    https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Bermudo_II_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-Bermudo_II_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg
alfonso-v     https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Alfonso_V_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-Alfonso_V_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg
bermudo-iii   https://upload.wikimedia.org/wikipedia/commons/2/28/Bermudo_III_de_Le%C3%B3n.jpg
fernando-i    https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Fernando_I%2C_rey_de_Castilla_y_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-Fernando_I%2C_rey_de_Castilla_y_Le%C3%B3n_%28Museo_del_Prado%29.jpg
sancho-ii     https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sancho_II_de_Castilla_%28Museo_del_Prado%29.jpg/500px-Sancho_II_de_Castilla_%28Museo_del_Prado%29.jpg
alfonso-vi    https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/El_rey_Alfonso_VI_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-El_rey_Alfonso_VI_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg
urraca-i      https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Urraca_I%2C_reina_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-Urraca_I%2C_reina_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg
alfonso-vii   https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Alfonso_VII_el_Emperador%2C_rey_de_Castilla_y_Le%C3%B3n.jpg/500px-Alfonso_VII_el_Emperador%2C_rey_de_Castilla_y_Le%C3%B3n.jpg
sancho-iii    https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Sancho_III_de_Castilla_%28Museo_del_Prado%29.jpg/500px-Sancho_III_de_Castilla_%28Museo_del_Prado%29.jpg
alfonso-viii  https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Alonso_VIII_-_Rey_de_Castilla_-_A%C3%B1o_1214_%2811983220125%29.jpg/500px-Alonso_VIII_-_Rey_de_Castilla_-_A%C3%B1o_1214_%2811983220125%29.jpg
enrique-i     https://upload.wikimedia.org/wikipedia/commons/3/36/Enrique_I_de_Castilla.jpg
fernando-ii   https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Fernando_II_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-Fernando_II_de_Le%C3%B3n_%28Museo_del_Prado%29.jpg
alfonso-ix    https://upload.wikimedia.org/wikipedia/commons/3/39/Alfonso_IX_Rex.jpg
fernando-iii  https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Fernando_III_el_Santo%2C_rey_de_Castilla_y_Le%C3%B3n_%28Museo_del_Prado%29.jpg/500px-Fernando_III_el_Santo%2C_rey_de_Castilla_y_Le%C3%B3n_%28Museo_del_Prado%29.jpg
```

Descargar **uno por uno con `sleep 2` entre peticiones**. Wikimedia rate-limita (HTTP 429) si se intentan 23 descargas concurrentes.

### Atribuciones a añadir en ATTRIBUTIONS.md

Crear nueva sección "## Retratos leoneses y castellanos" tras "## Retratos asturianos". Las filas:

| `<slug>.webp` | Título Commons | Autor / Origen | Año |
|---|---|---|---|
| `garcia-i.webp` | García I, rey de León.jpg | Anónimo / no identificado | s. XIX |
| `ordono-ii.webp` | Ordoño II de León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `fruela-ii.webp` | Fruela II de León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `alfonso-iv.webp` | Alfonso IV el Monje, rey de León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `ramiro-ii.webp` | Ramiro II de León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `ordono-iii.webp` | Ordoño III de León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `sancho-i.webp` | Sancho I de León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `ordono-iv.webp` | Ordono IV of Leon big.jpg | Anónimo, retrato imaginario | s. XIX-XX |
| `ramiro-iii.webp` | Retrato-132-Rey de León-Ramiro III.jpg | Grabado de *Retratos de los reyes de España* | 1788 |
| `bermudo-ii.webp` | Bermudo II de León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `alfonso-v.webp` | Alfonso V de León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `bermudo-iii.webp` | Bermudo III de León.jpg | Anónimo / no identificado | s. XIX-XX |
| `fernando-i.webp` | Fernando I, rey de Castilla y León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `sancho-ii.webp` | Sancho II de Castilla (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `alfonso-vi.webp` | El rey Alfonso VI de León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `urraca-i.webp` | Urraca I, reina de León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `alfonso-vii.webp` | Alfonso VII el Emperador, rey de Castilla y León.jpg | Anónimo / no identificado | s. XIX |
| `sancho-iii.webp` | Sancho III de Castilla (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `alfonso-viii.webp` | Alonso VIII - Rey de Castilla - Año 1214.jpg | Anónimo / fotografía de retrato del s. XIX | s. XIX |
| `enrique-i.webp` | Enrique I de Castilla.jpg | Anónimo / retrato genérico | s. XIX-XX |
| `fernando-ii.webp` | Fernando II de León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |
| `alfonso-ix.webp` | Alfonso IX Rex.jpg | Anónimo / no identificado | s. XIX-XX |
| `fernando-iii.webp` | Fernando III el Santo, rey de Castilla y León (Museo del Prado).jpg | Serie cronológica del Museo del Prado | c. 1850-1856 |

## León-Castilla 1230-1474 (siguiente bloque) — 12 reyes

Sub_entidad: `corona-castilla`.

| Slug | Nombre | Reinado | Notas |
|---|---|---|---|
| `alfonso-x` | Alfonso X el Sabio | 1252-1284 | Cantigas, Siete Partidas, candidatura imperial |
| `sancho-iv` | Sancho IV el Bravo | 1284-1295 | Toma Tarifa |
| `fernando-iv` | Fernando IV el Emplazado | 1295-1312 | Minoría, regencia de María de Molina |
| `alfonso-xi` | Alfonso XI el Justiciero | 1312-1350 | Salado (1340), peste negra |
| `pedro-i` | Pedro I el Cruel / el Justiciero | 1350-1369 | Guerra civil con Enrique de Trastámara, asesinado en Montiel |
| `enrique-ii` | Enrique II el de las Mercedes | 1369-1379 | Trastámara |
| `juan-i` | Juan I | 1379-1390 | Aljubarrota (1385) |
| `enrique-iii` | Enrique III el Doliente | 1390-1406 | Embajadas a Tamerlán |
| `juan-ii` | Juan II | 1406-1454 | Privanza de Álvaro de Luna |
| `enrique-iv` | Enrique IV el Impotente | 1454-1474 | Crisis sucesoria, La Beltraneja |
| `isabel-i` | Isabel I la Católica | 1474-1504 | Junto con Fernando II de Aragón. Toma de Granada (1492), expulsión de los judíos, viajes colombinos |
| (Juana I) | Juana I | 1504-1555 (nominal) | Rey efectivo Felipe el Hermoso 1504-1506. Encerrada en Tordesillas |

## León-Castilla 1474-1715 (Austrias y primer Borbón)

Sub_entidad sugerida: `austrias` (1516-1700) y `borbones` (1700-1715).

| Slug | Nombre | Reinado en Castilla | También reino en | Notas |
|---|---|---|---|---|
| `carlos-i` | Carlos I (V emperador) | 1516-1556 | aragon, navarra | Carlos I de Castilla = Carlos I de Aragón = Carlos IV de Navarra. Emperador del Sacro Imperio |
| `felipe-ii` | Felipe II | 1556-1598 | aragon, navarra, reino-portugal (desde 1580) | Filipina con Portugal 1580-1640 |
| `felipe-iii` | Felipe III | 1598-1621 | aragon, navarra, reino-portugal | |
| `felipe-iv` | Felipe IV | 1621-1665 | aragon, navarra, reino-portugal (hasta 1640) | Pierde Portugal en 1640 |
| `carlos-ii` | Carlos II el Hechizado | 1665-1700 | aragon, navarra | Sin descendencia, crisis sucesoria → Guerra de Sucesión |
| `felipe-v` | Felipe V (parte 1) | 1700-1715 (cierre Castilla nominal) | aragon, navarra | Decretos de Nueva Planta 1707 (Aragón), Castilla nominal hasta 1715. Es también el primer rey de Aragón borbón y será el último |

**Nota:** entrar en este tramo requiere tener **al menos** Aragón y Pamplona-Navarra existentes como entidades para que `tambien_reino_en` apunte a algo válido. No avanzar este tramo sin las otras coronas instaladas.

## Pamplona-Navarra (entidad esqueleto creada, sin soberanos)

Entidad: `pamplona-navarra`. Sub_entidades sugeridas (decidir al iniciar el bloque): `iniga` (824-905), `jimena` (905-1234), `champaña` (1234-1274), `capeto` (1274-1425), `trastamara-foix` (1425-1517), `austrias-borbon` (1515/1620-1841 con `tambien_reino_en: leon-castilla`).

35 reyes aproximadamente. Lista de cabecera:

- `inigo-arista` (824-851/852)
- `garcia-iniguez` (851/852-882)
- `fortun-garces` (882-905) — depuesto en revolución dinástica
- `sancho-i-garces` (905-925)
- `garcia-i-sanchez` (925-970)
- `sancho-ii-garces-abarca` (970-994)
- `garcia-ii-sanchez` (994-1004)
- `sancho-iii-el-mayor` (1004-1035) — **caso paradigmático de `tambien_reino_en: [leon-castilla]`** porque reinó León 1034-1035 y Castilla como conde
- `garcia-iii-sanchez` (1035-1054)
- `sancho-iv-de-penalen` (1054-1076) — asesinado, Pamplona pasa a Aragón
- *(Aragón gobierna 1076-1134: Sancho Ramírez, Pedro I, Alfonso I el Batallador — sus fichas viven en `aragon` con `tambien_reino_en: [pamplona-navarra]`)*
- `garcia-iv-ramirez` (1134-1150) — restauración pamplonesa
- `sancho-vi-el-sabio` (1150-1194) — primero en titularse "rey de Navarra"
- `sancho-vii-el-fuerte` (1194-1234) — Las Navas de Tolosa, sin descendencia
- `teobaldo-i` (1234-1253) — Casa de Champaña
- `teobaldo-ii` (1253-1270)
- `enrique-i` (1270-1274)
- *(Capetos: Juana I, Felipe I, Luis I, Juan I, Felipe II, Carlos I, Juana II, Felipe III, Carlos II el Malo, Carlos III el Noble — 1274-1425)*
- *(Trastámara: Blanca I, Juan II, Carlos IV, Leonor, Francisco Febo, Catalina — 1425-1517)*
- *(Habsburgo + Borbón post-1515 con `tambien_reino_en` apuntando a leon-castilla)*

## Aragón (entidad esqueleto creada, sin soberanos)

Entidad: `aragon`. Sub_entidades sugeridas: `reino-aragon` (1035-1162), `corona-aragon` (1162-1410), `trastamara` (1412-1516), `austrias-borbon` (1516-1707 con `tambien_reino_en: leon-castilla`).

20 reyes aproximadamente. Lista de cabecera:

- `ramiro-i` (1035-1063) — homónimo del Ramiro I asturiano: convivirán dos URLs canónicas distintas
- `sancho-ramirez` (1063-1094) — también Pamplona desde 1076 → `tambien_reino_en: [pamplona-navarra]`
- `pedro-i` (1094-1104) — también Pamplona → `tambien_reino_en: [pamplona-navarra]`
- `alfonso-i-el-batallador` (1104-1134) — también Pamplona, casado con Urraca de León (anulado) → `tambien_reino_en: [pamplona-navarra]`
- `ramiro-ii-el-monje` (1134-1137) — el rey monje. Abdica
- `petronila` (1137-1164) — niña-reina. Casa con Ramón Berenguer IV de Barcelona → unión dinástica = Corona de Aragón
- `alfonso-ii-el-casto` (1162-1196) — primero de la Corona de Aragón. Hijo de Petronila y Ramón Berenguer IV
- *(Pedro II, Jaime I el Conquistador, Pedro III, Alfonso III, Jaime II, Alfonso IV, Pedro IV el Ceremonioso, Juan I, Martín I — 1196-1410)*
- *(Compromiso de Caspe 1412 → Trastámara: Fernando I, Alfonso V el Magnánimo, Juan II, Fernando II el Católico)*
- *(Habsburgo + Borbón con `tambien_reino_en: [leon-castilla]`, hasta Decretos de Nueva Planta 1707)*

## Cataluña / Condado de Barcelona (entidad esqueleto creada)

Entidad: `cataluña`. Sin sub_entidades probablemente — linaje continuo de condes hasta 1162.

Solo 10-12 condes. Termina en 1162 (Ramón Berenguer IV → muerte → Alfonso II ya como rey de Aragón).

- `wifredo-i-el-velloso` (878-897) — fundador legendario
- `wifredo-ii-borrell` (897-911)
- `suner` (911-947)
- `borrell-ii` (947-992) — independencia de facto del Imperio Carolingio
- `ramon-borrell` (992-1017)
- `berenguer-ramon-i` (1017-1035) — el Curvo
- `ramon-berenguer-i` (1035-1076) — el Viejo. Usatges
- `ramon-berenguer-ii` y `berenguer-ramon-ii` (1076-1097) — co-reinado conflictivo
- `ramon-berenguer-iii` (1097-1131) — el Grande. Provenza
- `ramon-berenguer-iv` (1131-1162) — el Santo. Casa con Petronila de Aragón. Su muerte y la siguiente generación se cuenta ya en `aragon`

## Reino de Portugal (entidad esqueleto creada)

Entidad: `reino-portugal`. Sub_entidades sugeridas: `borgoña` (1139-1383), `avis` (1385-1580), `filipina` (1580-1640 con `tambien_reino_en: leon-castilla`), `bragança` (1640-1910).

35 reyes aproximadamente. Lista de cabecera Borgoña:

- `afonso-i-henriques` (1139-1185) — el Conquistador. Funda el reino
- `sancho-i` (1185-1211) — el Poblador
- `afonso-ii` (1211-1223) — el Gordo
- `sancho-ii` (1223-1248) — el Capelo. Depuesto
- `afonso-iii` (1248-1279) — el Boloñés
- `dinis` (1279-1325) — el Labrador. Funda Universidad de Coimbra
- `afonso-iv` (1325-1357) — el Bravo
- `pedro-i` (1357-1367) — el Justiciero / el Cruel. Inés de Castro
- `fernando-i` (1367-1383) — el Hermoso. Crisis sucesoria

Avís (1385-1580):

- `joao-i` (1385-1433) — Aljubarrota. Casa con Filipa de Lancáster
- `duarte` (1433-1438)
- `afonso-v` (1438-1481) — el Africano
- `joao-ii` (1481-1495) — el Príncipe Perfecto
- `manuel-i` (1495-1521) — el Afortunado. Da Gama, Cabral
- `joao-iii` (1521-1557) — el Piadoso
- `sebastiao` (1557-1578) — Alcazarquivir
- `henrique-i` (1578-1580) — el Cardenal-rey

Filipina (1580-1640):

- `felipe-i-de-portugal` (1580-1598) — = Felipe II de Castilla. **Entidad principal: leon-castilla.** Aparece en reino-portugal solo como referencia cruzada.
- `felipe-ii-de-portugal` (1598-1621) — = Felipe III de Castilla
- `felipe-iii-de-portugal` (1621-1640) — = Felipe IV de Castilla. Pierde Portugal en 1640

Bragança (1640-1910):

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
- `carlos-i` (1889-1908) — asesinado
- `manuel-ii` (1908-1910) — derrocado

## Visigodos (revisar)

Solo Recaredo I está migrado a darasa. Quedan ~30. Fuente: `~/SitesWeb/ibrahim/reges-hispaniae/assets/data.js`.

## Al-Ándalus (revisar)

La sesión previa dejó muchos retratos (numismática almoravide, almohade, nazarí). Verificar coherencia y completitud.

## Decisiones pendientes (registrar antes de empezar cada bloque)

1. **Reinas reinantes**: Urraca de León, Petronila de Aragón, Berenguela de Castilla (regente y luego abdica), Juana I de Castilla, Catalina de Navarra, Maria I y Maria II de Portugal, Isabel I de Castilla. Confirmar que entran como soberanas con id propio (no como consortes).
2. **Antirreyes y pretendientes**: La Beltraneja, archiduque Carlos vs Felipe V, Pedro I vs Enrique II Trastámara. Decidir caso a caso si crear ficha o solo mencionar en el legítimo.
3. **Numeración compartida**: Carlos V de Castilla = Carlos I de Aragón = Carlos IV de Navarra = Carlos I emperador. Política sugerida: el `nombre` del frontmatter usa la numeración de la entidad principal, los `hechos` mencionan las otras numeraciones.
4. **Filipinos**: en Portugal, los tres Felipes de la unión 1580-1640 deben aparecer pero la entidad principal es `leon-castilla`. Convención sugerida: ficha solo en leon-castilla, en reino-portugal aparecen como referencia cruzada vía `tambien_reino_en`.
5. **Final temporal de Portugal**: ¿se cierra en 1910 (proclamación de la república) o sigue con la línea de pretendientes Bragança-Saxe-Coburgo y Bragança-Miguelista hasta hoy? Decisión sugerida: cerrar en 1910 como hito jurídico (fin de la monarquía constitucional). Pretendientes contemporáneos no entran.

## Próximas sesiones (sugerido)

1. **Sesión Trastámara y Reyes Católicos**: León-Castilla 1230-1516 (12 reyes). Schema-stable, sin tambien_reino_en todavía.
2. **Sesión Aragón medieval**: Aragón 1035-1410 (10-12 reyes). Estrena `tambien_reino_en` con Sancho Ramírez, Pedro I, Alfonso I el Batallador apuntando a Pamplona-Navarra (que tendrá que crearse antes o a la vez).
3. **Sesión Pamplona-Navarra hasta 1234**: 16 reyes pamploneses-navarros hasta Sancho VII el Fuerte. Estrena el otro lado de `tambien_reino_en` con Sancho III el Mayor.
4. **Sesión Cataluña**: 10-12 condes de Barcelona, bloque pequeño y autocontenido.
5. **Sesión Portugal Borgoña + Avís**: 17 reyes portugueses 1139-1580.
6. **Sesión Habsburgo**: Carlos V, Felipe II, III, IV, Carlos II en León-Castilla con `tambien_reino_en` apuntando a aragon, navarra y opcionalmente reino-portugal. Caso de máxima complejidad de modelado.
7. **Sesión Borbones siglo XVIII y XIX**: cierres temporales de cada corona (Aragón 1707, Castilla 1715, Navarra 1841).
8. **Sesión Portugal Bragança**: 14 reyes portugueses 1640-1910.

Cada sesión: ~10-15 reyes en formato Sonnet siguiendo `MIGRATION-GUIDE.md`. Verificación final con `npm run build` y commit limpio.
