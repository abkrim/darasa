# Enriquecimiento nazarí — tesis Sánchez Carrasco (2021)

**Fecha:** 2026-06-20
**Alcance aprobado:** Cuarteto (marco + ocaso) — fichas de Muhammad I, Abu-l-Hasan (Muley Hacén), al-Zagal, Boabdil + cláusula en la entidad `al-andalus`.
**Método:** inferencia dirigida sobre la tesis (lectura por secciones vía 3 agentes de investigación). Huecos no inventados: cada cambio lleva cita verbatim + página.
**Decisiones del usuario:** incluir sólidos **y** opcionales · párrafo de capitulaciones de Boabdil en **un párrafo tenso** · correcciones de fecha/lugar contestadas **suavizadas, sin sobrescribir** RAH.

## Fuente (cita canónica, capa 2 «localizable»)

Citar SIEMPRE por el handle DIGIBUG, **nunca** por el PDF local. Cadena exacta para `fuentes:`:

```
Sánchez Carrasco, J. J. (2021). La Vega de Granada en el tránsito del Reino Nazarí al Reino de Granada [tesis doctoral, dir. C. Trillo San José]. Universidad de Granada. https://digibug.ugr.es/handle/10481/71756
```

---

## 1. `muhammad-i-ibn-al-ahmar.md` — marco económico-territorial

**Añadir `hecho`** (tras «Hito arquitectónico»):

```yaml
  - { k: "Hito hidráulico", v: "Ordena la Acequia Real para abastecer la Alhambra · 1238" }
```

Cita: «Muhammad I en 1238 ordena construir la Acequia Real, que iba a la Alhambra» (p. 355). Único dato hidráulico atribuible a él en persona.

**Editar cuerpo, párrafo 2** (precisión de parias, opcional aprobado): «pago de parias anuales» → «pago de parias anuales — que las crónicas castellanas cifran en torno a 150.000 maravedíes —». Cita: p. 243.

**Añadir cuerpo, nuevo párrafo 3** (marco económico — heredado, no obra suya):

> El reino que dejaba consolidado se asentaba sobre la **Vega de Granada**, el espacio agrario más densamente irrigado de al-Ándalus. La gran red de acequias que la vertebraba no era obra nazarí: se había gestado desde época emiral y se consolidó bajo los ziríes en el siglo XI, ampliándose después con almorávides y almohades. Muhammad I la heredó y la puso al servicio de su nueva capital — suya es la orden, en **1238**, de abrir la **Acequia Real** que conducía el agua hasta la Alhambra. Sobre ese sustrato hidráulico y un poblamiento de centenares de alquerías reposaría la economía del último emirato peninsular durante los dos siglos y medio siguientes.

Citas: «la mayor red de acequias que existió en al-Andalus, comenzó a gestarse desde época emiral» (p. 352); «tiene sus bases en la taifa de Granada, aunque fue ampliado por almorávides y almohades» (p. 353); >300 alquerías en la Iḥāṭa (p. 204).

**Añadir `fuente`:** tesis (cadena canónica).

---

## 2. `abu-l-hasan-ali.md` — Muley Hacén

**Editar cuerpo, párrafo 2** (mito marcado como mito + fecha de Alhama suavizada). Tras «el primer asalto musulmán en décadas.» insertar:

> La cronística castellana puso en su boca una réplica célebre — que en Granada ya no se acuñaba moneda para parias, sino hierros de lanza —, pero la frase es muy probablemente invención literaria de Hernando del Pulgar, el más subjetivo de los cronistas del momento.

Y cambiar «conquistó Alhama el 1 de marzo de 1482» → «conquistó Alhama a finales de febrero de 1482» (suavizado; no se impone el 28-feb de la tesis sobre RAH). Citas: frase de Pulgar (p. 413); Alhama (p. 415).

**Añadir `hecho`** (opcional aprobado — el emir como propietario agrario):

```yaml
  - { k: "Patrimonio", v: "Propietario agrario en la Vega: vende una finca en el Nublo · 1472" }
```

Cita: «En este manuscrito fechado en 1472, Muley Hacén vende una finca…» (pp. 406-407).

**Añadir `fuente`:** tesis.

---

## 3. `al-zagal.md`

**Editar cuerpo** (papel sobre la Vega). Tras «contrastó con el vasallaje aceptado por Boabdil.» insertar:

> Sobre la propia Vega de Granada dejó impronta militar: en 1485 interceptó cerca de la capital una cabalgada de la guarnición castellana de Alhama que regresaba cargada de botín, y en 1488 las alquerías de El Padul y Alhendín, en el acceso sur a la comarca, pasaron a su obediencia.

Citas: cabalgada de Alhama (p. 431); El Padul y Alhendín (p. 442).

**Editar cuerpo, párrafo de la capitulación** (suavizado, ítem 9): «El 22 de diciembre de 1489, cercado y aislado, capituló entregando sus territorios a Fernando el Católico» → «El 22 de diciembre de 1489, tras la caída de Baza y cercado en el altiplano, capituló entregando a Fernando el Católico las plazas que aún controlaba — Guadix, Almería y la propia Baza —». Cita: p. 443. (No se borra el dato «Almería»; se añade contexto Baza/Guadix.)

**Ampliar nota de numeración** (blockquote existente), añadir al final:

> Una tercera convención, la de la historiografía nazarí especializada (Sánchez Carrasco, 2021), lo numera como Muhammad XIII.

Cita: p. 861.

**Añadir `fuente`:** tesis.

---

## 4. `boabdil.md` — capitulaciones y tránsito (la veta rica)

**Añadir `hecho`** (opcional aprobado, tras «Capitulación»):

```yaml
  - { k: "Negociación", v: "Entrega negociada por los alcaides Aben Comixa y el Muleh · 77 artículos" }
```

Cita: «Las negociaciones para la entrega… los alcaides Aben Comixa y el Muleh… consta de 77 artículos» (p. 456).

**Editar cuerpo, párrafo 3** (ofensiva final de 1490, opcional aprobado). Antes de «Los Reyes Católicos cercaron la ciudad desde 1491» insertar:

> En julio de 1490 intentó aún romper el cerco con una última ofensiva a gran escala — recuperó y arrasó el castillo de Alhendín y atacó Salobreña en busca de auxilio norteafricano —, sin éxito.

Citas: Alhendín (p. 446); Salobreña (p. 447).

**Añadir cuerpo, nuevo párrafo** (un párrafo tenso — mecánica del incumplimiento), tras «promesas violadas sistemáticamente en las décadas siguientes.»:

> Esa violación no fue un accidente, sino un proceso. El propio documento de rendición — el «Privilegio de Asiento y Capitulación», setenta y siete artículos firmados el 25 de noviembre de 1491 — fue concebido por la Corona como una solución temporal, modificable «según conveniencia militar o política». La tolerancia de los primeros años (1492-1495) sirvió sobre todo para que las élites nazaríes, Boabdil incluido, optaran por el exilio y dejaran a la población sin cabezas visibles. El primer artículo quebrantado fue el de las armas: aprovechando el hambre de una Vega arrasada por la guerra, las autoridades cambiaron a los granadinos sus armas por harina. El proceso culminó con la conversión forzosa — Reino de Granada en 1501, resto de Castilla el 12 de febrero de 1502 —, en flagrante contradicción con el artículo que prohibía obligar «á ningund moro nin mora… á que se torne cristiano». Décadas más tarde, el morisco Francisco Núñez Muley se lo recordaría a Felipe II: «la conversión fue por fuerza contra lo capitulado por los señores Reyes Católicos cuando el rey Abdilehi les entregó esta ciudad».

Citas: documento temporal (pp. 463, 466); tolerancia instrumental (p. 466); armas por harina (p. 474); conversión forzosa (pp. 499, 504); artículo religioso (p. 495); Núñez Muley (p. 505).

**Editar cuerpo, párrafo de la entrega** (desmitificación + 2-vs-6 enero + Alfacar). Sustituir «El 2 de enero de 1492 Boabdil entregó las llaves de la Alhambra a Fernando e Isabel y abandonó la ciudad.» por:

> El 2 de enero de 1492 Boabdil salió de Granada y entregó las llaves de la Alhambra — había adelantado la entrega, prevista en las capitulaciones para el 6 de enero, ante el temor a una revuelta en la ciudad descontenta (el último foco en rendirse había sido Alfacar, al norte de la Vega, el 22 de diciembre). La escena real dista de la estampa romántica que fijó Francisco Pradilla en 1882: la reina Isabel se mantuvo apartada en un cerro por seguridad, las llaves pasaron al conde de Tendilla — nombrado alcaide de la Alhambra — y Fernando no consintió que el sultán se apease a besarle las manos.

(El resto del párrafo —leyenda de al-Maqqari, frase apócrifa de Aisha, exilio— se conserva igual.) Citas: entrega adelantada y escena (p. 457); Alfacar (p. 457).

**Ampliar nota de numeración** (blockquote existente), añadir al final:

> La historiografía nazarí especializada (Sánchez Carrasco, 2021) coincide con la tradición castellana en numerarlo Muhammad XII y reserva el XIII para al-Zagal — señal de que el cómputo dinástico nazarí sigue sin estar fijado.

Citas: pp. 861-862.

**Añadir `fuente`:** tesis.

---

## 5. `al-andalus.yaml` — cláusula de entidad

**Editar `desc`** (cláusula sobre la Vega como motor económico). En la frase final del reino nazarí, «el reino nazarí de Granada — último reducto andalusí desde 1232 — capitula…» →

> el reino nazarí de Granada — último reducto andalusí desde 1232, sostenido económicamente por la fértil Vega de Granada y su regadío intensivo — capitula ante los Reyes Católicos el 2 de enero de 1492.

Citas: policultivo intensivo de regadío (p. 352); «importantísima para la economía de la capital» (p. 203).

**Añadir `fuente`:** tesis.

---

## Descartado (registro de lo NO incorporado)

- **Fundación de Madīnat Garnāṭa** atribuida a Muhammad I — la ciudad la fundan los ziríes (s. XI, p. 164); la ficha ya lo evita correctamente.
- **Muerte de Boabdil «en combate»** (Dramatis Personae, p. 862) — debatida; se conserva el cauto «h. 1533» de la ficha.
- **Estructura administrativa del *iqlīm al-Faḥṣ*** (alcaides, distritos, pp. 194-199) — corresponde al s. XIV (Ibn al-Jaṭīb, visir de Muhammad V), no a Muhammad I.
- **Fechas/lugares de la tesis impuestos sobre RAH** — por decisión del usuario, Alhama y el lugar de capitulación de al-Zagal se suavizan, no se sobrescriben.

## Validación post-edición

1. `npm run build` → debe seguir en 258 páginas, 0 errores Zod.
2. Revisar que las 5 fichas/entidad citan la tesis por handle DIGIBUG (nunca el PDF).
3. Commit de contenido (no mezclar con infra). Despliegue opcional vía rsync como usuario `darasa`.
