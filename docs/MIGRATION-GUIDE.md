# Guía de migración de soberanos a darasa

Documento operativo dirigido a un agente IA (Sonnet o Opus) que vaya a migrar reyes nuevos al atlas. Asume que el patrón ya está validado con Asturias completa (12 reyes, commit `18753ed`).

**Antes de empezar, leer:**

1. `~/SitesWeb/ibrahim/darasa/CLAUDE.md` — convenciones del proyecto, slugs, content workflow
2. `~/SitesWeb/ibrahim/darasa/DESIGN.md` — sistema cromático (8 colores fijos, no calibrar nuevos)
3. `~/SitesWeb/ibrahim/darasa/docs/MIGRATION-TODO.md` — lista de pendientes y orden recomendado
4. Memoria del proyecto en `~/.claude/projects/-Users-abkrim-SitesWeb-ibrahim-darasa/memory/feedback_historiographic_tone.md` — tono editorial obligatorio

## Flujo de trabajo (un rey)

### 1. Confirmar entidad y sub_entidad

Antes de tocar nada, identificar:

- **Entidad** (slug): `asturias`, `leon-castilla`, `pamplona-navarra`, `aragon`, `cataluña`, `reino-portugal`, `visigodos`, `al-andalus`.
- **Sub_entidad** (si aplica): cada entidad tiene su lista en `entidades/<slug>.yaml`. Si la entidad no tiene sub_entidades en su yaml, omitir el campo en el rey.
- **Linaje** (raro, opcional): solo cuando hay dos linajes paralelos compitiendo en el mismo período (ej. 1157-1230 en León-Castilla con `linaje: castilla` vs `linaje: leon`).
- **`tambien_reino_en`** (raro, opcional): solo cuando un rey ostentó dos coronas distintas como entidades separadas. Casos previstos: Sancho III el Mayor de Pamplona (también León y conde de Castilla/Aragón); Carlos V y descendientes (entidad principal Castilla, también Aragón, Navarra, Portugal). En general el bloque medieval no necesita el campo, las uniones internas se modelan con sub_entidad.

### 2. Buscar retrato en Wikimedia Commons

Preferencia, en orden:

1. **Serie del Museo del Prado** (Luis de Madrazo y otros, c. 1850-1856). Patrón de archivo: `[Nombre] de [Reino] (Museo del Prado).jpg`.
2. **Series de retratos de los reyes de España** del s. XVIII (1788) — grabados, dominio público garantizado.
3. **Numismática** (monedas, sellos, dinares, dírhams) cuando el monarca no tiene retrato y la moneda es identificable. Habitual para soberanos andalusíes.
4. **Manuscritos medievales** (Tumbo A, Liber Testamentorum, Cántigas) cuando hay representación coetánea.
5. **`img: null`** y placeholder con inicial cuando no haya nada adecuado. El render genera un cuadro de color con la inicial automáticamente.

**Búsqueda batch** (ejemplo con 3 reyes):

```bash
for king in "García I León" "Ordoño II León" "Fruela II León"; do
  echo "===== $king ====="
  curl -sG "https://commons.wikimedia.org/w/api.php" \
    --data-urlencode "action=query" \
    --data-urlencode "list=search" \
    --data-urlencode "srsearch=$king Museo del Prado" \
    --data-urlencode "srnamespace=6" \
    --data-urlencode "srlimit=5" \
    --data-urlencode "format=json" | jq -r '.query.search[].title'
done
```

**Obtener URL thumb 500px** y metadata (autor, fecha, licencia) para varios títulos:

```bash
curl -sG "https://commons.wikimedia.org/w/api.php" \
  --data-urlencode "action=query" \
  --data-urlencode "titles=File:T1|File:T2|File:T3" \
  --data-urlencode "prop=imageinfo" \
  --data-urlencode "iiprop=url|extmetadata|size" \
  --data-urlencode "iiurlwidth=500" \
  --data-urlencode "format=json" \
  | jq -r '.query.pages | to_entries[] | "\(.value.title)\t\(.value.imageinfo[0].thumburl)"'
```

### 3. Descargar y optimizar

Para cada rey, una única invocación encadenada:

```bash
slug="garcia-i"
url="https://upload.wikimedia.org/wikipedia/commons/thumb/X/XX/Filename/500px-Filename.jpg"
curl -fsS -A "darasa/1.0 (educational; abdelkarim@aichadigital.es)" \
  -o /tmp/${slug}.jpg "$url" && \
sips -s format jpeg --resampleWidth 240 /tmp/${slug}.jpg --out /tmp/${slug}_240.jpg >/dev/null && \
cwebp -q 85 -mt /tmp/${slug}_240.jpg -o public/portraits/${slug}.webp >/dev/null 2>&1 && \
rm /tmp/${slug}.jpg /tmp/${slug}_240.jpg
```

**Para descargar muchos en paralelo:** usar el script `download_kings.sh` adaptado del que se usó en Asturias (ver commit `18753ed`).

**Verificación:** `ls -lh public/portraits/<slug>.webp` — el tamaño esperado es 8-30 KB.

### 4. Crear el markdown

Ruta: `src/content/hispania/soberanos/<entidad>/<slug>.md`

Plantilla mínima (campos obligatorios marcados con ✱):

```markdown
---
slug: <slug>           # ✱ URL-safe, sin tildes, lowercase, guiones. Ej. "alfonso-vi"
entidad: <entidad>     # ✱ slug de la entidad
sub_entidad: <sub>     # opcional, ver yaml de la entidad
linaje: <linaje>       # opcional, raro
tambien_reino_en: []   # opcional, lista de slugs de entidad
id: <n>                # ✱ ordinal único dentro de la entidad+sub_entidad
nombre: "Nombre"       # ✱ con tildes y mayúsculas correctas
epiteto: "el X"        # opcional, SOLO si está consolidado en historiografía
inicio: NNNN           # ✱ año de inicio del reinado
fin: NNNN              # ✱ año de fin (o null si sigue)
capital: "Ciudad"      # opcional
img: "/portraits/<slug>.webp"   # ✱ o null
imgCredit: "Texto breve, dominio público vía Wikimedia Commons."  # opcional pero requerido si hay img
hechos:
  - { k: "Padre", v: "Nombre" }
  - { k: "Hito", v: "Acontecimiento · año" }
  # 4-7 hechos típicos
fuentes:
  - "Autor (año). Título. Editorial."   # ✱ mínimo 1
  - "Crónica X (siglo)."
---

Texto en Markdown sobre el reinado, 2-5 párrafos.
```

**Convenciones de slug**:

- Sin tildes: `alfonso-vi`, no `alfonsó-vi`.
- Romanos en minúscula con guión: `alfonso-x`, no `alfonso-X`.
- Ñ → n: `ordono-i`, no `ordoño-i`.
- Epíteto NO va en el slug, va en su campo `epiteto`. Ej: `alfonso-x.md` con `epiteto: "el Sabio"`.

**Slugs globalmente únicos (importante):**

El render genera URLs `/hispania/soberanos/<slug>/` sin prefijo de entidad. Por tanto **el slug debe ser único en todo el proyecto**, no solo dentro de la entidad.

Casos previstos de colisión cuando se aborden Pamplona-Navarra y Aragón:

- Sancho I asturiano vs Sancho I de Pamplona-Navarra → uno de los dos lleva sufijo
- García I de León (910-914) vs García I Sánchez de Pamplona (925-970) → uno lleva sufijo
- Ramiro I asturiano (842-850) vs Ramiro I de Aragón (1035-1063) → uno lleva sufijo
- Pedro I de Aragón (1094-1104) vs Pedro I de Castilla el Cruel (1350-1369) → uno lleva sufijo
- Alfonso I el Católico asturiano vs Alfonso I el Batallador de Aragón → uno lleva sufijo

Convención: **el primero en migrarse mantiene el slug corto, el siguiente lleva sufijo `-<entidad>`.** Ejemplos:

- Si `sancho-i.md` ya existe en León, el de Pamplona será `sancho-i-pamplona.md`.
- Si `ramiro-i.md` ya existe en Asturias, el de Aragón será `ramiro-i-aragon.md`.
- Si `pedro-i.md` ya existe en Aragón, el de Castilla será `pedro-i-castilla.md`.

Cuando se cree un slug con sufijo, mencionar en el body Markdown la equivalencia ("también conocido como Sancho I Garcés de Pamplona") y, si aplica, añadir un `hechos` con `k: "Numeración"`, `v: "Sancho I de Pamplona"`.

**Convenciones de hechos** (campos sugeridos en orden de prelación):

- `Padre`, `Madre`, `Esposa` (o `Esposas` si plural), `Hijo` o `Hijos`, `Hija` (cuando hay sucesión por línea femenina relevante)
- `Capital` (si distinta de la entidad), `Hito`, `Victoria`, `Derrota`, `Acto`, `Coyuntura`, `Política exterior`, `Política interior`, `Cultura`
- `Acceso`, `Final`, `Muerte`, `Sucesor`

**Fuentes recurrentes por entidad** (orientativas, ampliar según tema):

- *Asturias*: Crónica de Alfonso III, Crónica Albeldense, Sánchez-Albornoz, Isla Frez, Collins, Fernández Conde
- *León-Castilla*: Crónica de Sampiro, Historia Silense, Crónica Najerense, Lucas de Tuy, Rodrigo Jiménez de Rada, Sánchez-Albornoz, García de Cortázar, O'Callaghan
- *Pamplona-Navarra*: Crónica de los Reyes de Navarra, Lacarra, Martín Duque, Floristán
- *Aragón*: Zurita (Anales), Ubieto Arteta, Sesma Muñoz, Bisson
- *Cataluña*: Gesta Comitum Barcinonensium, Bisson, Sobrequés, Salrach
- *Portugal*: Crónicas de Fernão Lopes, Mattoso, Coelho, Marques

### 5. Tono editorial obligatorio

Resumen del tono aprobado (ver memoria `feedback_historiographic_tone.md` para detalle):

- **Evitar "Reconquista"** como concepto propio. Es nomenclatura del s. XIX. Usar "expansión territorial", "avance hacia el sur", o referirse a hitos concretos.
- **Matizar mitos** sin destruirlos. Covadonga = "escaramuza de escala muy modesta" pero reconociendo su valor mitológico posterior. Tributo de las cien doncellas = construcción del s. XII-XIII, no realidad del VIII.
- **Epítetos solo canónicos**. Si dudas si un epíteto está en historiografía académica, omitirlo.
- **Sucesiones femeninas en `hechos`** cuando explican continuidad dinástica.
- **Sin teleología castellanista**. No presentar a los Reyes Católicos como "fundadores de España", ni a la Reconquista como destino manifiesto, ni a la unión dinástica como hito teleológico. Cada corona se respeta como entidad propia hasta su anexión jurídica.
- **Cuerpo Markdown 2-5 párrafos**. Primer párrafo: framing. Segundos: contexto histórico, política, hechos. Último: sucesión y muerte. No paternalismo ni épica.

### 6. ATTRIBUTIONS.md

Tras descargar imágenes, añadir filas a la sección correspondiente de `public/portraits/ATTRIBUTIONS.md`. Formato:

```markdown
| `<slug>.webp` | [Título.jpg](https://commons.wikimedia.org/wiki/File:Título.jpg) | Autor / Origen | Año original |
```

Si la entidad aún no tiene sección, crearla siguiendo el patrón de "## Retratos asturianos".

### 7. Validación

Antes de cualquier commit:

```bash
npm run build
```

Esperar `[build] Complete!` sin errores. Si Zod falla, corregir el campo señalado.

Verificar páginas generadas:

```bash
npm run build 2>&1 | grep -E "<slug-1>|<slug-2>"
```

Cada rey debe generar `/hispania/soberanos/<slug>/index.html`.

### 8. Commit

Patrón de mensaje (en inglés, primera persona ausente, Co-Authored-By al final):

```
content(<entidad>): migrate <descripción> sovereigns

Lista o párrafo describiendo:
- Qué reyes se han migrado y rango temporal
- Qué sub_entidades estrenan
- Qué decisiones de modelado han sido necesarias
- Qué fuentes principales se han usado
- Qué retratos (Prado, 1788, numismática, etc.)
- Resultado del build (n páginas generadas)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

Stagear **solo los ficheros nuevos o modificados de la migración** — los cambios de sesiones previas en otros ficheros se dejan intactos.

## Checklist por rey

```
[ ] Entidad y sub_entidad identificadas en entidades/<entidad>.yaml
[ ] Retrato encontrado en Commons (Prado preferido)
[ ] webp descargado en public/portraits/<slug>.webp
[ ] Markdown creado con todos los campos obligatorios
[ ] Tono editorial respetado (sin "Reconquista", epítetos canónicos)
[ ] Sucesiones femeninas surgen en hechos cuando aplican
[ ] Fuentes mínimo 2, máximo 5
[ ] Cuerpo 2-5 párrafos
[ ] Fila añadida a ATTRIBUTIONS.md
[ ] Build pasa
[ ] Página /hispania/soberanos/<slug>/ generada
```

## Casos especiales

### Reinas reinantes

Cuando una mujer reina por derecho propio (Urraca de León, Petronila de Aragón, Berenguela de Castilla, Isabel I), entra como soberana con su `id` propio y todos los campos. No se considera consorte ni se omite. El epíteto y los hechos siguen las mismas reglas.

### Co-reinados conyugales

Petronila + Ramón Berenguer IV (Aragón); Juana I + Felipe el Hermoso (Castilla); Reyes Católicos. Modelado: el monarca por derecho de sangre va como soberano principal en su entidad, el consorte se menciona en `hechos` con `k: "Consorte"`. Si ambos son por derecho propio en distintas entidades (RR.CC.), cada uno en la suya y se enlazan vía `tambien_reino_en` o `Consorte`.

### Antirreyes y pretendientes

Cuando hubo dos reyes simultáneos contestados (Pedro I el Cruel vs Enrique II Trastámara, o el archiduque Carlos vs Felipe V), incluir solo al que la historiografía considera reinante de iure. El antirrey se menciona en `hechos` del legítimo. Si el antirrey llegó a controlar territorio efectivo durante años, se puede crear su ficha con `id` distinto y `sub_entidad` específica.

### Períodos de regencia

Cuando un rey accede en minoría de edad (Enrique I de Castilla, Enrique III, Juan II), mencionar la regencia en `hechos` (`k: "Regencia"`, `v: "Madre/abuela/tío entre años X-Y"`). No crear ficha separada para el regente.

### Reyes en múltiples coronas (post-1474)

Cuando lleguemos a Carlos V, Felipe II y siguientes:

- **Entidad principal**: aquella donde sus sucesores inmediatos siguieron reinando, en empate la de mayor peso demográfico/territorial. Por defecto Castilla.
- **`tambien_reino_en`**: lista de slugs de las otras entidades donde reinaron oficialmente con su numeración propia.
- **Una sola URL canónica por persona**, en su entidad principal. Aparece como referencia cruzada en las páginas de las otras entidades (render: cards secundarias visualmente diferentes, opacidad 0.7, borde discontinuo).
- **Numeraciones distintas**: Carlos V de Castilla = Carlos I de Aragón = Carlos IV de Navarra. En el frontmatter, el `nombre` y la numeración pueden mencionar todas las variantes en `hechos` con `k: "Numeración en otras coronas"`.

## Recursos

- **Wikimedia Commons API**: <https://commons.wikimedia.org/w/api.php?action=help>
- **Lista de reyes de la historia hispana**: revisar `~/SitesWeb/ibrahim/reges-hispaniae/assets/data.js` para referencia de orden y nombres canónicos (proyecto legacy).
- **Museo del Prado**: catálogo online en <https://www.museodelprado.es/coleccion/>
- **Real Academia de la Historia**: Diccionario Biográfico Electrónico (DB-e) en <https://dbe.rah.es/>
