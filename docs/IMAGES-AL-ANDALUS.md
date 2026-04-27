# docs/IMAGES-AL-ANDALUS.md — Inventario de imágenes para fichas de Al-Ándalus

Documento de trabajo para la **sesión especializada de descarga y atribución de imágenes**. Recoge los soberanos andalusíes con `img: null` en sus fichas, prioriza candidatos según la jerarquía cerrada en `docs/PLAN-AL-ANDALUS.md` § *Decisiones editoriales → 3*, y proporciona los comandos exactos de descarga, conversión y atribución cuando hay candidato firme.

**Última actualización:** 2026-04-26 (segunda sesión, post-ejecución parcial)
**Estado:** 71 fichas totales en al-Ándalus · **28 con imagen, 43 sin imagen**. La sesión de imágenes del 2026-04-26 procesó 25 fichas en bloques temáticos (almorávides, almohades, nazaríes prioritarios, taifas mayores, emirato independiente).

## Sesión 2026-04-26 — bloques ejecutados

| Bloque | Fichas con imagen añadida | Fichas pendientes |
|--------|---------------------------|-------------------|
| Califato (sesión anterior) | 3 (Abd al-Rahman III, al-Hakam II, Hisham II) | Almanzor (img: null por decisión), 6 fichas de la fitna |
| Almorávides | **3** (Yusuf ibn Tashfin, Ali ibn Yusuf, Tashfin ibn Ali) | 0 — bloque completo |
| Almohades | **6** (Abd al-Mu'min, Yusuf I almohade, Yaqub al-Mansur, Muhammad al-Nasir, Yusuf II al-Mustansir, Abd Allah al-Adil) | Yahya al-Mu'tasim (img: null por decisión), Idris al-Ma'mun (sin candidato firme localizado) |
| Nazaríes prioritarios | **3** (Muhammad V, Yusuf I nazarí, Boabdil con su casco) | Muley Hacén (encontrado homónimo hafsí de Túnez, descartado por riesgo de confusión) |
| Taifas mayores | **7** (Badis ibn Habus, al-Mu'tadid, al-Muqtadir con la Aljafería, al-Mu'tamid con su tumba, al-Qadir, Abd Allah al-Mansur con su lápida, Yahya al-Mansur aftasí) | Habus, Sulayman ibn Hud, al-Ma'mun, al-Muzaffar aftasí, al-Mutawakkil, al-Mu'tamin, al-Musta'in II, Imad al-Dawla — 8 sin candidato firme |
| Emirato independiente | **6** (Abd al-Rahman I, Hisham I, al-Hakam I, Abd al-Rahman II, Muhammad I, Abd Allah ibn Muhammad) | al-Mundhir (sin candidato firme — reinado de 2 años) |

**Total añadido en la sesión: 25 fichas.** Combinado con las 3 anteriores, la cobertura visual de Al-Ándalus pasa de 4% a **39%**.

## Pendientes prioritarios para la siguiente sesión de imágenes

1. **Muley Hacén** — buscar dinar nazarí oriental específico, o aceptar `img: null`. Evitar confusión con Muley Hassen hafsí (Túnez s. XVI).
2. **Resto de nazaríes con acuñación** — Muhammad I Ibn al-Ahmar (fundador, alta prioridad), Muhammad II al-Faqih, Muhammad III, Muhammad IV, Yusuf II nazarí, Yusuf III, Muhammad IX al-Aysar, Muhammad X, al-Zagal. ~9 fichas.
3. **Resto de taifas mayores** — Habus, Sulayman ibn Hud, al-Ma'mun (acuñación dhúnnuní), al-Muzaffar aftasí, al-Mutawakkil, al-Mu'tamin, al-Musta'in II, Imad al-Dawla. ~8 fichas.
4. **Fitna del califato** — Muhammad II al-Mahdi, Sulayman al-Mustain, Ali ibn Hammud, Abd al-Rahman IV, Abd al-Rahman V, Hisham III. ~6 fichas con `img: null` que podrían encontrar acuñaciones de la fitna en una búsqueda más específica.
5. **Almohade pendiente** — Idris al-Ma'mun (1 ficha).

**Total pendiente con candidato potencial: ~25 fichas.** Algunas pueden quedar definitivamente como `img: null` por decisión documentada (~10-12 fichas, ver § *Tareas adicionales → 5*).

## Recordatorio de la jerarquía de imágenes

Decisión editorial cerrada del plan (orden de preferencia):

1. **Moneda contemporánea** (dírham, dinar, fels) o **inscripción epigráfica** auténtica.
2. **Objeto material atribuido** (casco, espada, sello, basín) si la autenticidad es razonable.
3. **Miniatura en manuscrito coetáneo o cercano** (árabe o cristiano).
4. **Último recurso:** representación posterior (decimonónica, moderna), *siempre* marcada en `imgCredit` con la fórmula explícita: «Representación idealizada [año], no retrato auténtico».

**Si no hay candidato 1-3 disponible y la opción 4 lleva riesgo pedagógico** (especialmente para Ibrahim, audiencia primaria con TEA + AACC), preferir `img: null` con placeholder de inicial. Esta es la decisión adoptada en la sesión actual para todas las fichas sin material contemporáneo localizado.

## Procedimiento estándar por ficha

```bash
cd /Users/abkrim/SitesWeb/ibrahim/darasa/public/portraits

# 1. Resolver thumb URL via Commons API
curl -fsS -A "darasa/1.0 (educational; abdelkarim@aichadigital.es)" \
  "https://commons.wikimedia.org/w/api.php?action=query&titles=File:NOMBRE_EXACTO.jpg&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json" \
  | python3 -c "import sys, json; print(json.load(sys.stdin)['query']['pages'][list(json.load(sys.stdin)['query']['pages'])[0]]['imageinfo'][0]['thumburl'])"

# 2. Descargar
curl -fsS -A "darasa/1.0 (educational; abdelkarim@aichadigital.es)" \
  -o SLUG.jpg \
  "URL_THUMB_500px"

# 3. Resamplear a 240 px
sips -s format jpeg --resampleWidth 240 SLUG.jpg --out SLUG_240.jpg >/dev/null

# 4. Convertir a webp calidad 85
cwebp -q 85 -mt SLUG_240.jpg -o SLUG.webp

# 5. Limpiar intermedios
rm SLUG.jpg SLUG_240.jpg

# 6. Editar ficha: cambiar img: null por img: "/portraits/SLUG.webp"
#    y añadir imgCredit con descripción + atribución
# 7. Añadir fila a public/portraits/ATTRIBUTIONS.md
```

## Estado de cobertura por sub-entidad

### Emirato dependiente (711-756) — 3 fichas

| Slug | Prioridad | Candidato | Notas |
|------|-----------|-----------|-------|
| tariq-ibn-ziyad | 4 (riesgo) | — | Sin material auténtico. Las representaciones del s. XIX son orientalistas idealizadas. **Dejar `img: null`** salvo decisión explícita. |
| musa-ibn-nusayr | 4 (riesgo) | — | Igual que Tariq. |
| yusuf-al-fihri | 4 (riesgo) | — | Igual. |

**Recomendación:** mantener los tres con `img: null`.

### Emirato independiente (756-929) — 7 fichas

| Slug | Prioridad | Candidato | Notas |
|------|-----------|-----------|-------|
| abd-al-rahman-i | 1 | Buscar dírham emiral · *FUENTES*: «no hay retratos contemporáneos. Los hay en miniaturas posteriores y en la historiografía decimonónica.» | Acuñación emiral existe pero menos abundante que las califales. Investigar Commons: «Dirham emirate Cordoba», «Abd al-Rahman I dirham». |
| hisham-i | 1 | Buscar dírham emiral. | Similar. |
| al-hakam-i | 1 | Buscar dírham emiral. | Similar. |
| abd-al-rahman-ii | 1 | **Alta prioridad** · *FUENTES*: «dirhams del emirato (Abd al-Rahman II especialmente, Madinat al-Andalus como ceca)». | Dírhams abundantes. Buscar «Dirham Abd al-Rahman II Madinat al-Andalus». |
| muhammad-i | 1 | Dírham emiral. | Acuñación documentada. |
| al-mundhir | 1 | Dírham emiral. | Reinado breve, acuñación escasa. Verificar Commons. |
| abd-allah-ibn-muhammad | 1 | Dírham emiral. | Periodo de crisis: acuñación posiblemente limitada. |

**Recomendación:** priorizar Abd al-Rahman II (oferta abundante) en una primera ronda. Los demás dependen de qué haya en Commons.

### Califato (929-1031) — 7 fichas pendientes (3 ya completadas)

| Slug | Estado | Prioridad | Notas |
|------|--------|-----------|-------|
| abd-al-rahman-iii | ✓ HECHO | — | `Dirham_abd_al_rahman_iii_20384.jpg` |
| al-hakam-ii | ✓ HECHO | — | `Dirham_al_hakam_ii_19953.jpg` (Madinat al-Zahra) |
| hisham-ii | ✓ HECHO | — | `Dirham_hisham_ii_20043.jpg` |
| almanzor | 4 (riesgo) | — | Sin acuñación propia (era hachib, no califa). Las monedas del período llevan el nombre de Hisham II. **Dejar `img: null`**. |
| muhammad-ii-al-mahdi | 1 | Buscar dírham fitna. | Acuñación efímera. |
| sulayman-al-mustain | 1 | Buscar dírham bereber. | Acuñación documentada en el norte. |
| ali-ibn-hammud | 1 | Buscar dírham hammudí. | Acuñación distintiva. |
| abd-al-rahman-iv | 1 | Difícil — reinado de semanas. | Posiblemente sin acuñación. |
| abd-al-rahman-v | 1 | Difícil — 47 días. | Posiblemente sin acuñación. |
| hisham-iii | 1 | Buscar dírham último califa. | Acuñación final omeya. |

### Taifas principales (1031-1094) — 16 fichas

| Slug | Linaje | Prioridad | Notas |
|------|--------|-----------|-------|
| habus-ibn-maksan | Ziríes | 1 | Acuñación zirí granadina escasa pero existente. |
| abd-allah-al-mansur | Aftasíes | 1 | Buscar dírham aftasí. |
| sulayman-ibn-hud | Hudíes | 1 | Hudíes acuñaron abundantemente. Buscar «Dirham Hud Zaragoza». |
| badis-ibn-habus | Ziríes | 1 | Reinado largo · acuñación documentada. |
| al-mutadid | Abbadíes | 1-3 | Acuñación abbadí · alternativa: imágenes del Alcázar de Sevilla. |
| al-mamun | Dhúnnuníes | 1 | Acuñación toledana. |
| al-muzaffar-ibn-al-aftas | Aftasíes | 1 | Acuñación aftasí. |
| al-muqtadir-ibn-hud | Hudíes | 1-3 | Acuñación hudí abundante · alternativa: Aljafería. |
| yahya-al-mansur-aftasi | Aftasíes | 1 | Reinado breve. |
| al-mutamid-ibn-abbad | Abbadíes | 3-4 | *FUENTES* localiza: «[Retrato de al-Mu'tamid por Khalil Gibran](https://commons.wikimedia.org/wiki/File:Al-Mu'tamid_ibn_Abbad_by_Khalil_Gibran.png) (1922, dominio público)». **Marcar como representación moderna**. Alternativa: tumba en Aghmat o columna en el Alcázar de Sevilla. |
| al-muzaffar-yahya | Aftasíes | 4 | Sin material — reinado de meses. |
| al-mutawakkil | Aftasíes | 1 | Buscar dírham aftasí tardío. |
| al-qadir | Dhúnnuníes | 1 | Acuñación toledana → valenciana. |
| al-mutamin | Hudíes | 3 | Posibilidad: manuscrito del *Kitab al-Istikmal* — buscar copias en Commons o bibliotecas digitales. |
| al-mustain | Hudíes | 1 | Acuñación hudí tardía. |
| imad-al-dawla | Hudíes | 1 | Acuñación de Rueda · escasa. |

### Almorávides (1086-1147) — 3 fichas

| Slug | Prioridad | Candidato | Notas |
|------|-----------|-----------|-------|
| yusuf-ibn-tashfin | 1 | **Muy alta prioridad** · *FUENTES*: «[Dinar de Yusuf b. Tasufín](https://commons.wikimedia.org/wiki/File:Yusuf_Ben_Tasfin_dinar_22562.jpg)», «[Dinar AH 498/1104-1105](https://commons.wikimedia.org/wiki/File:Dinar_of_Yusuf_b._Tashufin,_AH_498_(AD_1104-1105).jpg)». Numismática almorávide abundante y de calidad. | Candidato firme. |
| ali-ibn-yusuf | 1 | Categoría Commons: «Almoravid coins» · seleccionar un dinar de su reinado (1106-1143). | Buscar específico. |
| tashfin-ibn-ali | 1 | Acuñación final almorávide. | Verificar Commons. |

### Almohades (1147-1232) — 8 fichas

| Slug | Prioridad | Candidato | Notas |
|------|-----------|-----------|-------|
| abd-al-mumin | 1 | Categoría Commons: «[Almohad coins](https://commons.wikimedia.org/wiki/Category:Almohad_coins)». Mizmar cuadrado en plata, dinar de oro. | Buscar específico. |
| yusuf-i-almohade | 1 | Acuñación almohade (mizmar) · alternativa: Giralda (foto del minarete contemporáneo). | Alta probabilidad de candidato firme. |
| yaqub-al-mansur | 1-2 | Mizmar califal almohade · alternativa: la Giralda terminada bajo su reinado o la torre del Oro de Sevilla (almohade tardía). | Candidato fuerte. |
| muhammad-al-nasir | 1 | Mizmar califal almohade. | Verificar. |
| yusuf-ii-al-mustansir | 1 | Mizmar tardío. | Reinado de 11 años · acuñación documentada. |
| abd-allah-al-adil | 1 | Mizmar de la fitna almohade. | Acuñación discutida — verificar. |
| yahya-al-mutasim | 4 (riesgo) | — | Acuñación rival posiblemente sin verificar. **Dejar `img: null`**. |
| idris-al-mamun | 1 | Acuñación tardía almohade. | Verificar. |

### Nazaríes (1232-1492) — 24 fichas

Tras la sesión de cierre de nazaríes (2026-04-26): cobertura completa con 24 fichas (incluido Ismail IV en id 68 y la cronología 1462-1464 precisada). Los ids del bloque se desplazaron en +1 en los tres últimos al añadir Ismail IV.

| id | Slug | Prioridad | Candidato | Notas |
|----|------|-----------|-----------|-------|
| 48 | muhammad-i-ibn-al-ahmar | 1-2 | Dinar nazarí inicial · alternativa: la Alcazaba de la Alhambra (su obra) · mausoleo en la Rauda. | Múltiples candidatos firmes. |
| 49 | muhammad-ii-al-faqih | 1 | Dinar nazarí. | Acuñación documentada. |
| 50 | muhammad-iii | 1 | Dinar nazarí. | |
| 51 | **nasr** | 1 | Dinar nazarí emiral. | Verificar Commons. Reinado de seis años, acuñación documentada. |
| 52 | **ismail-i** | 1-3 | Dinar nazarí · alternativa: representaciones cristianas posteriores a Sierra Elvira (1319). | Verificar. |
| 53 | muhammad-iv | 1 | Dinar nazarí. | |
| 54 | yusuf-i-nazari | 2 | **Alta prioridad** · alternativa: Puerta de la Justicia de la Alhambra (su obra) · Palacio de Comares. | Candidato firme. |
| 55 | **muhammad-v** | 2 | **Máxima prioridad** · alternativas: Sala de los Leones, Mexuar, fachada de Comares — todas obra suya, fotos abundantes en Commons. | El sultán cumbre — merece imagen. La Sala de los Leones es referencia visual canónica. |
| 56 | **ismail-ii** | 4 (riesgo) | — | Reinado de 10 meses, acuñación dudosa. **Probable `img: null`**. |
| 57 | **muhammad-vi-al-galib** | 4 (riesgo) | — | Conocido como «el Bermejo». Sin acuñación clara. La leyenda del **Diamante del Bermejo** asociado a su ejecución por Pedro I podría ser candidato si Commons lo tiene fotografiado en la corona británica. **Probable `img: null`**. |
| 58 | yusuf-ii-nazari | 1 | Dinar nazarí breve. | |
| 59 | **muhammad-vii** | 1 | Dinar nazarí. | Reinado de 16 años, acuñación esperable. |
| 60 | yusuf-iii | 2 | Manuscrito del *Diwan* de Yusuf III · si Commons tiene página. | Verificar. |
| 61 | **muhammad-viii-al-mutamassik** | 1 | Dinar nazarí (dos reinados). | Verificar Commons. |
| 62 | muhammad-ix-al-aysar | 1 | Dinar nazarí. | Acuñación de los cuatro reinados. |
| 63 | yusuf-iv | 1 | Dinar nazarí brevísimo. | Difícil. |
| 64 | **yusuf-v** | 4 (riesgo) | — | Dos reinados breves. Sin material contemporáneo claro. **Probable `img: null`**. |
| 65 | muhammad-x | 1 | Dinar nazarí. | |
| 66 | **sad-al-mustain** | 1 | Dinar nazarí. | Tres reinados, padre de Muley Hacén — acuñación probable abundante. |
| 67 | **ismail-iii** | 4 (riesgo) | — | Reinado de semanas, sin acuñación. **Mantener `img: null`**. |
| 68 | **ismail-iv** | 4 (riesgo) | — | Pretendiente Abencerraje desde Málaga, sin acuñación oficial. **Mantener `img: null`**. |
| 69 | abu-l-hasan-ali | 1-2 | Dinar nazarí · alternativa: fortalezas de su reinado, Mondújar (lugar de su muerte). | Candidato disponible. |
| 70 | boabdil | 2-3 | *FUENTES* da pista directa: «**preferir el casco atribuido**, moneda nazarí, o miniatura sobre Pradilla/Fortuny por defecto. Si no hay opción 1-3, ficha sin imagen es preferible a representación moderna sin marcar». **Candidato firme:** [«Casque arabe de Abd Allah Muhammad, dit Boabdil»](https://commons.wikimedia.org/wiki/File:Casque_arabe_de_Abd_Allah_Muhammad,_dit_Boabdil,_dernier_sultan_de_la_dynastie_arabe_nasride_de_Grenade,_PH81211.jpg) — objeto material atribuido. | **Prioritario.** El casco es objeto material auténtico (prioridad 2). Evitar a toda costa Pradilla 1882 y Fortuny por defecto. |
| 71 | al-zagal | 1 | Dinar nazarí oriental (Málaga, Almería). | Acuñación durante la guerra. |

**Negrita:** fichas añadidas en las dos últimas sesiones de cobertura nazarí (2026-04-25 y 2026-04-26). 11 fichas nuevas: Nasr, Ismail I, Muhammad V (cumbre), Ismail II, Muhammad VI, Muhammad VII, Muhammad VIII, Yusuf V, Sa'd, Ismail III, Ismail IV.

## Tareas adicionales para la sesión de imágenes

Más allá de la descarga, la sesión especializada debe contemplar:

1. **Coherencia visual del grid** — Las cards de soberanos en `/hispania/al-andalus/` mezclan ahora monedas (240×120 horizontales) con placeholders (240×240 cuadrados de inicial). Cuando se añadan imágenes nuevas, vigilar que las proporciones queden consistentes dentro de cada linaje. Si una taifa tiene 5 fichas y 3 con dírham horizontal y 2 con placeholder, considera una opción de ratio fijo en el CSS (`aspect-ratio: 1` o similar) para card-rey-thumb.

2. **Atribución exhaustiva** — Cada imagen añadida debe entrar en `public/portraits/ATTRIBUTIONS.md` con la fila completa: archivo local, título original Commons, autor/origen, año original, año de Hégira si aplica.

3. **Verificación de licencia** — Para piezas numismáticas de museos (LACMA, Museo Arqueológico Oliva, Museu d'Història de Barcelona, etc.), comprobar que la fotografía está realmente en dominio público o bajo licencia compatible con CC BY-SA 4.0. Las monedas en sí son anónimas y de dominio público por antigüedad, pero la fotografía puede tener derechos.

4. **Decisión sobre rotación de imágenes** — Algunas fichas tienen 2-3 candidatos (p.ej. al-Mu'tamid: retrato de Gibran 1922, columna del Alcázar, tumba de Aghmat). Decidir cuál se elige y por qué.

5. **Fichas con `img: null` deliberado** — Las siguientes **deberían quedar sin imagen** por razones documentales o pedagógicas (sin acuñación contemporánea, reinados de semanas, pretendientes paralelos sin corte propia, o riesgo de pasar representación idealizada como auténtica):
   - Emirato dependiente: Tariq ibn Ziyad, Musa ibn Nusayr, Yusuf al-Fihrí
   - Califato: Almanzor (hachib, no califa); Abd al-Rahman IV (semanas), Abd al-Rahman V (47 días)
   - Taifas: al-Muzaffar Yahya aftasí (meses)
   - Almohades: Yahya al-Mu'tasim (rival magrebí, sin acuñación verificada)
   - Nazaríes: Ismail II (10 meses), Muhammad VI «el Bermejo» (decapitado por Pedro I antes de consolidar acuñación), Yusuf V (dos reinados breves), Ismail III (semanas), **Ismail IV** (pretendiente desde Málaga sin acuñación oficial), Yusuf IV (un mes)
   
   La sesión de imágenes debe respetar esta decisión y no rellenarlas con representaciones decimonónicas idealizadas. El placeholder de inicial es preferible.

## Bloque de comandos por figura prioritaria

Comandos pre-rellenados para los 5 candidatos firmes documentados en este plan. Ejecutar cada bloque en sesión de imágenes.

### Yusuf ibn Tashfin (almorávide fundador)

```bash
cd /Users/abkrim/SitesWeb/ibrahim/darasa/public/portraits
curl -fsS -A "darasa/1.0 (educational; abdelkarim@aichadigital.es)" \
  -o yusuf-ibn-tashfin.jpg \
  "https://commons.wikimedia.org/wiki/Special:FilePath/Yusuf_Ben_Tasfin_dinar_22562.jpg?width=500"
sips -s format jpeg --resampleWidth 240 yusuf-ibn-tashfin.jpg --out yusuf-ibn-tashfin_240.jpg >/dev/null
cwebp -q 85 -mt yusuf-ibn-tashfin_240.jpg -o yusuf-ibn-tashfin.webp
rm yusuf-ibn-tashfin.jpg yusuf-ibn-tashfin_240.jpg
# Editar la ficha y ATTRIBUTIONS.md
```

### Boabdil (casco atribuido — opción de máxima prioridad pedagógica)

```bash
cd /Users/abkrim/SitesWeb/ibrahim/darasa/public/portraits
# Resolver URL primero — el nombre tiene caracteres especiales que requieren codificación
curl -fsS -A "darasa/1.0 (educational; abdelkarim@aichadigital.es)" \
  "https://commons.wikimedia.org/w/api.php?action=query&titles=File:Casque%20arabe%20de%20Abd%20Allah%20Muhammad%2C%20dit%20Boabdil%2C%20dernier%20sultan%20de%20la%20dynastie%20arabe%20nasride%20de%20Grenade%2C%20PH81211.jpg&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json"
# Anotar la thumburl devuelta y descargar con curl
```

### Abd al-Rahman II (dírhams abundantes)

```bash
# Buscar primero entre las opciones disponibles
curl -fsS -A "darasa/1.0 (educational; abdelkarim@aichadigital.es)" \
  "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=Dirham+Abd+al-Rahman+II&srnamespace=6&format=json&srlimit=10"
# Elegir el de mejor estado y proceder con el procedimiento estándar
```

## Resumen ejecutivo para sesión de imágenes

Estado al **2026-04-26**: Al-Ándalus tiene **71 fichas** totales. **3 con imagen** (los tres califas principales con dírham omeya), **68 con `img: null`**.

- **Fichas a actualizar (con candidato firme localizado):** ~6-8 (Yusuf ibn Tashfin, Boabdil con su casco, Abd al-Rahman II, Muhammad V con la Sala de los Leones, posiblemente Yusuf I nazarí con la Puerta de la Justicia, posiblemente al-Muqtadir hudí con la Aljafería).
- **Fichas a actualizar (con candidato a verificar):** ~40 (resto del emirato independiente, fitna omeya, taifas mayores, almorávides, almohades, nazaríes con acuñación).
- **Fichas a mantener `img: null` por decisión:** **15** (lista completa en § *Tareas adicionales → 5*). Conquistadores islámicos, Almanzor, fitna efímera del califato, pretendientes paralelos almohades, varios nazaríes de reinado brevísimo o sin acuñación oficial (incluyendo el bloque 1462 de Ismail III, Ismail IV y Muhammad VI «el Bermejo»).
- **Tiempo estimado de sesión:** 5-7 horas si todo va bien (búsqueda + descarga + atribución + edición ficha + verificación visual). Hacer en bloques temáticos: una sub-entidad por bloque, en este orden recomendado:
  1. Almorávides (3 fichas, numismática abundante y limpia)
  2. Almohades (8 fichas, mizmares cuadrados distintivos)
  3. Califato fitna (los que tienen acuñación)
  4. Nazaríes con candidato firme (Muhammad V, Boabdil, Muley Hacén, Yusuf I)
  5. Resto nazarí (numismática que requiere búsqueda)
  6. Taifas mayores (16 fichas, numismática variada)
  7. Emirato independiente (7 fichas)
- **Output esperado:** 50-55 fichas con imagen, `ATTRIBUTIONS.md` ampliado a ~60 entradas, manifesto coherente del grid de la página de al-Ándalus, ~15 fichas mantenidas como `img: null` documentado.
