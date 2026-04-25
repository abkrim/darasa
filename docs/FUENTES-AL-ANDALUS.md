# docs/FUENTES-AL-ANDALUS.md — Inventario de fuentes para el contenido de Al-Ándalus

Entregable de la **Fase 0** de `docs/PLAN-AL-ANDALUS.md`. Verifica qué fuentes primarias y secundarias están disponibles antes de redactar fichas de soberano.

**Última actualización:** 2026-04-25 (tercera revisión: 0 huecos reales tras verificación manual del maintainer)
**Estado:** Inventario consolidado. Cobertura RAH completa de todos los soberanos clave de las 7 sub-entidades. Único pendiente menor (no bloqueante): URL RAH de Yusuf II al-Mustansir almohade.

## Cómo se ha hecho la verificación

- **RAH (`dbe.rah.es`):** búsquedas con Google `site:dbe.rah.es` para nombres clave en su forma habitual castellanizada y arabizada. Cuando aparecía la entrada, se anota el ID numérico de la URL canónica.
- **Dialnet (`dialnet.unirioja.es`):** localización del **perfil de autor** (`servlet/autor?codigo=N`) para los cuatro arabistas de referencia del plan. Permite descubrir todos sus artículos sin necesidad de listarlos uno a uno.
- **Wikimedia Commons:** consulta directa al endpoint `action=query&list=search&srnamespace=6` con palabras clave arabizadas + tipo de objeto (`dirham`, `dinar`, `portrait`).
- **Monografías:** verificación cruzada de editorial, año y reediciones en Dialnet, Marcial Pons, AbeBooks y Internet Archive.

## Resumen ejecutivo

- **RAH cubre prácticamente toda la dinastía nazarí** (Muhammad I-XII, Yusuf I-IV) y los principales califas omeyas (Abd al-Rahman I-V, Hisam I-III, al-Hakam I-II, Almanzor con dos entradas, Sanchuelo, fitna completa).
- **Tras la segunda batida (2026-04-25), las taifas principales también tienen cobertura RAH amplia:** Zaragoza con 5 hudíes; Toledo con al-Qadir y al-Mamún; Granada zirí con Badis y Habus; Badajoz con los 5 aftasíes principales; Sevilla con al-Mutamid y al-Mu'tadid.
- **Almohades:** la dinastía completa cubierta. Yaqub al-Mansur (vencedor de Alarcos 1195) localizado en el sitio moderno [`historia-hispanica.rah.es`](https://historia-hispanica.rah.es/biografias/27024-al-mansur).
- **Emirato dependiente:** Tariq b. Ziyad ([8506](https://dbe.rah.es/biografias/8506/tariq-b-ziyad)) **sí tiene entrada propia**; junto con Musa b. Nusayr y otros walis, la sub-entidad foundational queda cubierta.
- **Emirato independiente completo:** Muhammad I (852-886) localizado en el sitio moderno [`historia-hispanica.rah.es`](https://historia-hispanica.rah.es/biografias/32126-muhammad-i) tras búsqueda manual del maintainer.
- **Wikimedia Commons** ofrece numismática abundante (dirhams omeyas, dinares almorávides) y retratos idealizados decimonónicos para Boabdil. Para emires dependientes y taifas menores prácticamente no hay representación visual contemporánea.

> **Nota historiográfica importante (RAH):** la numeración de los últimos sultanes nazaríes ha sido corregida con fuentes árabes del periodo. Lo que tradicionalmente se llamaba *Muhammad XII = Boabdil* es ahora **Muhammad XI** en RAH, mientras que *Muhammad XII* designa a **al-Zagal**. El plan `docs/PLAN-AL-ANDALUS.md` (Fase 4) asume la numeración antigua y debe ajustarse antes de crear fichas.

## Cobertura por sub-entidad

### 1. Emirato dependiente (711-756)

**Figuras clave a documentar:** Tariq ibn Ziyad, Musa ibn Nusayr, Abd al-Aziz ibn Musa, los waliatos sucesivos hasta Yusuf al-Fihrí.

**Cobertura RAH:**
- [Tariq b. Ziyad](https://dbe.rah.es/biografias/8506/tariq-b-ziyad) — caudillo de la conquista 711.
- [Musà b. Nusayr](https://dbe.rah.es/biografias/27605/musa-b-nusayr) — gobernador de Ifriqiya, dirige la conquista.
- [Yusuf b. 'Abd al-Rahman al-Fihrí](https://dbe.rah.es/biografias/9519/yusuf-b-abd-al-rahman-al-fihri) — último wali, 19º emir dependiente.
- [Hudayfa b. al-Ahwas b. al-Qaysí](https://dbe.rah.es/biografias/16976/hudayfa-b-al-ahwas-b-al-qaysi) — 8º emir.
- [Ayyub b. Habib Al-Lajmi](https://dbe.rah.es/biografias/10611/ayyub-b-habib-al-lajmi) — gobernador interino tras Abd al-Aziz, sobrino de Musa.
- [Abd al-Malik b. Qatan al-Fihri](https://dbe.rah.es/biografias/4448/abd-al-malik-b-qatan-al-fihri) — emir hacia 732.

**Cobertura sólida** tras segunda batida (Tariq encontrado bajo grafía `tariq-b-ziyad`). Sub-entidad foundational queda documentada para los hitos clave de la conquista y los waliatos posteriores.

**Dialnet:** búsquedas por "emirato dependiente" + "wilāya" + "al-Andalus" devuelven muchos artículos contextualizadores. Chalmeta (1994) es la referencia central.

**Monografías:**
- **Chalmeta, P.** (1994/2003) *Invasión e islamización: la sumisión de Hispania y la formación de al-Andalus*. Mapfre, Madrid (1ª ed., 439 pp); Univ. Jaén, 2003 (2ª ed., 461 pp). Disponible en Internet Archive.
- **Lévi-Provençal, E.** (1944-1953) *Histoire de l'Espagne musulmane*, **Tomo 1: La conquête et l'émirat hispano-umaiyade, 710-912**. Maisonneuve / Brill.

**Wikimedia Commons:** numismática hispano-musulmana temprana (felus de gobernadores) existe pero es escasa y requiere búsqueda específica. No hay retratos contemporáneos. Las representaciones decimonónicas de Tariq son idealizadas (s. XIX, romanticismo orientalista) y deben marcarse como tales en `imgCredit`.

### 2. Emirato independiente (756-929)

**Figuras clave:** Abd al-Rahman I al-Dakhil, Hisham I, Al-Hakam I, Abd al-Rahman II, Muhammad I, Al-Mundhir, Abdallah ibn Muhammad.

**Cobertura RAH:**
- [Abd al-Rahman I](https://dbe.rah.es/biografias/4452/abd-al-rahman-i) + redirección [Abderramán I](https://dbe.rah.es/biografias/78772/abderraman-i) — *al-Dakhil*, fundador.
- [Hisam I](https://dbe.rah.es/biografias/12045/hisam-i) — segundo emir.
- [Al-Hakam I](http://dbe.rah.es/biografias/7920/al-hakam-i) — tercer emir, Día del Foso.
- [Abd al-Rahman II](https://dbe.rah.es/biografias/4456/abd-al-rahman-ii) + [Abderramán II](https://dbe.rah.es/biografias/5534/abderraman-ii) — apogeo cultural del emirato.
- [Muhammad I](https://historia-hispanica.rah.es/biografias/32126-muhammad-i) — emir 852-886, sucesor de Abd al-Rahman II. *URL en sitio moderno RAH `historia-hispanica.rah.es`; verificada manualmente por el maintainer (la búsqueda Google a `dbe.rah.es` no la indexaba bien).*
- [Mundir I](https://dbe.rah.es/biografias/17846/mundir-i) — al-Mundhir.
- [Abd Allah](https://dbe.rah.es/biografias/4486/abd-allah) — Abdallah ibn Muhammad, último emir antes del califato.

**Cobertura completa.** Todos los emires omeyas tienen ficha RAH localizada.

**Dialnet:** [Maribel Fierro](https://dialnet.unirioja.es/servlet/autor?codigo=76094) tiene producción extensa sobre el emirato independiente y la formación del islam andalusí (heterodoxia, *muwallad*, conflictos de Ibn Hafsun). Su tesis y los artículos de los 80 son foundational.

**Monografías:**
- **Lévi-Provençal**, Tomo 1 (cubre hasta 912).
- **Kennedy, H.** (1996, reimpr. Routledge 2014) *Muslim Spain and Portugal: A Political History of al-Andalus*. Cubre el periodo entero. **Nota:** el plan dice "2014" pero la primera edición es 1996. La 2014 es reimpresión Routledge.
- **Manzano Moreno, E.** (2006) *Conquistadores, emires y califas: los omeyas y la formación de al-Ándalus*. Crítica. Recomendada como lectura única que cubre 711-1031 con bibliografía actualizada (no en el plan original — añadir).

**Wikimedia Commons:** abundancia de **dirhams del emirato** (Abd al-Rahman II especialmente, Madinat al-Andalus como ceca). Pocos retratos; los hay en miniaturas posteriores (manuscritos del s. XIII-XIV) y en la historiografía decimonónica española.

### 3. Califato de Córdoba (929-1031)

**Figuras clave:** Abd al-Rahman III, Al-Hakam II, Hisham II, Almanzor (al-Mansur, hachib), fitna (Suleiman al-Mustain, Muhammad II, Hisham III).

**Cobertura RAH (la más densa de todo Al-Ándalus, completada en segunda batida):**
- [Abd al-Rahman III](https://dbe.rah.es/biografias/4459/abd-al-rahman-iii) + redirección [Abderramán III](https://dbe.rah.es/biografias/8369/abderraman-iii) — proclama el califato 929.
- [Al-Hakam II](https://dbe.rah.es/biografias/7925/al-hakam-ii) — Medina Azahara, mecenas intelectual.
- [Hisam II](http://dbe.rah.es/biografias/12047/hisam-ii) — califa nominal bajo Almanzor.
- [Almanzor](https://dbe.rah.es/biografias/6566/almanzor) — entrada breve.
- [Abu 'Amir Muhammad b. 'Abd Allah b. Muhammad b. Abi 'Amir al-Ma'afiri, al-Mansur Bi-llah](https://dbe.rah.es/biografias/9188/abu-amir-muhammad-b-abd-allah-b-muhammad-b-abi-amir-al-maafiri-al-mansur-bi-llah) — entrada extensa académica.
- [Al-Mansur](https://dbe.rah.es/biografias/4799/al-mansur) — tercera entrada por título.
- [Sanchuelo](https://dbe.rah.es/biografias/7495/sanchuelo) — Abd al-Rahman Sanchuelo, hijo de Almanzor.
- **Fitna 1009-1031 (cobertura completa):**
  - [Muhammad II al-Mahdi](https://dbe.rah.es/biografias/13883/muhammad-ii) — califa de la fitna.
  - [Sulayman al-Musta'in](https://dbe.rah.es/biografias/15052/sulayman-al-mustain) — califa berber.
  - [Abd al-Rahman IV](https://dbe.rah.es/biografias/4461/abd-al-rahman-iv) + [Abderramán IV](https://dbe.rah.es/biografias/8371/abderraman-iv).
  - [Abd al-Rahman V](https://dbe.rah.es/biografias/4466/abd-al-rahman-v).
  - [Hisam III](https://dbe.rah.es/biografias/12050/hisam-iii) — *al-Mu'tadd*, último califa, depuesto noviembre 1031.
  - [Ali b. Hammud](https://dbe.rah.es/biografias/16893/ali-b-hammud) — primer califa hammudí (no marwaní), durante la fitna.
  - [Yahwar b. Muhammad b. Yahwar](https://dbe.rah.es/biografias/17933/yahwar-b-muhammad-b-yahwar) — primer regidor de la taifa de Córdoba post-abolición.

**Cobertura completa.** Tanto el califato omeya pleno como la fitna entera quedan documentados en RAH con entradas individuales accionables.

**Dialnet:** Maribel Fierro es **la** especialista en el califato (autora de la monografía de referencia, ver abajo). [Manuela Marín](https://dialnet.unirioja.es/servlet/extaut?codigo=517105) cubre la historia social y cultural del periodo (*Mujeres en al-Andalus*, etc.).

**Monografías:**
- **Fierro, M.** (2010) *Abderramán III y el califato omeya de Córdoba*. **Nerea**, Donostia-San Sebastián. 292 pp. ISBN 9788496431850. **Corrección al plan:** la editorial es Nerea, no Akal.
- **Lévi-Provençal**, Tomo 2 (912-1031) y Tomo 3 (Le siècle du Califat de Cordoue).
- **Kennedy** (1996/2014).
- **Vallvé, J.** (1986) *La división territorial de la España musulmana*. CSIC. Útil para entender la estructura administrativa del califato.

**Wikimedia Commons:** **dirhams de Abd al-Rahman III abundantes** ([Dirham abd al rahman iii 20384](https://commons.wikimedia.org/wiki/File:Dirham_abd_al_rahman_iii_20384.jpg) y al menos 10 más, varios acuñados en Madinat al-Zahra). [Dírhams del Museu Arqueològic d'Oliva](https://commons.wikimedia.org/wiki/File:Dírhams_d'argent,_Museu_Arqueològic_d'Oliva.JPG). Para Almanzor solo representaciones idealizadas tardías. Para el resto del califato, dirhams disponibles a partir de búsqueda específica por nombre del emir.

### 4. Primeras Taifas (1031-1086)

**Figuras decididas en plan (Fase 3) con ficha completa:** Sevilla (al-Mu'tamid + padre), Toledo (al-Mamún, al-Qadir), Zaragoza (al-Muqtadir), Granada zirí (Badis), Badajoz (aftasíes), Valencia (post-Cid).

**Cobertura RAH (completa tras segunda batida):**
- **Sevilla (abbadíes):**
  - [Al-Mu'tadid](https://dbe.rah.es/biografias/17966/al-mutadid) — padre de al-Mu'tamid, segundo abbadí.
  - [Al-Mu'tamid ibn Abbad](https://dbe.rah.es/biografias/17995/al-mutamid-ibn-abbad) — tercer abbadí, poeta-rey.
- **Toledo (dhúnnuníes):**
  - [Yahya b. Ismail b. Yahya al-Ma'mun](https://dbe.rah.es/biografias/17898/yahya-b-ismail-b-yahya-al-mamun) — segundo dhúnnuní, †1075. Encontrado bajo nombre completo arabizado.
  - [Al-Qadir](https://dbe.rah.es/biografias/15858/al-qadir) — Yaḥyā b. Ismā‛īl b. Yaḥyā, tercer y último dhúnnuní de Toledo, †1092 en Valencia.
- **Zaragoza (hudíes, dinastía completa):**
  - [Sulayman b. Hud](https://dbe.rah.es/biografias/8633/sulayman-b-hud) — fundador, Lérida (1031-1046) y Zaragoza (1038-1046).
  - [Al-Muqtadir b. Hud](https://dbe.rah.es/biografias/7878/al-muqtadir-b-hud) — Zaragoza 1047-1081.
  - [Al-Mu'tamin](https://dbe.rah.es/biografias/15640/al-mutamin) — hijo de al-Muqtadir, 1081-1085.
  - [Ahmad b. Yusuf b. Hud al-Musta'in](https://dbe.rah.es/biografias/7883/ahmad-b-yusuf-b-hud-al-mustain) — 4º hudí.
  - [Abd al-Malik 'Imad al-Dawla](https://dbe.rah.es/biografias/7472/abd-al-malik-imad-al-dawla) — último hudí.
- **Granada zirí:**
  - [Habus b. Maksan b. Ziri](https://dbe.rah.es/biografias/13355/habus-b-maksan-b-ziri) — segundo zirí de Granada (~1019-1038).
  - [Badis b. Habus](https://dbe.rah.es/biografias/17795/badis-b-habus) — hijo de Habus (1038-?), construye la alcazaba.
- **Badajoz (aftasíes, los 5 con ficha):**
  - [Abd Allah b. Muhammad b. Maslama b. al-Aftas](https://dbe.rah.es/biografias/17684/abd-allah-b-muhammad-b-maslama-b-al-aftas) — *al-Mansur*, fundador (1022-).
  - [Al-Muzaffar b. al-Aftas](http://dbe.rah.es/biografias/17691/al-muzaffar-b-al-aftas) — segundo aftasí.
  - [Yahyà al-Mansur](https://dbe.rah.es/biografias/17689/yahya-al-mansur) — tercer aftasí, †1072 en Mérida.
  - [Al-Muzaffar Yahyà](https://dbe.rah.es/biografias/17847/al-muzaffar-yahya).
  - [Al-Mutawakkil](https://dbe.rah.es/biografias/16918/al-mutawakkil) — Umar al-Mutawakkil, cuarto y último aftasí (1072-1095/1085).
- **Valencia post-Cid:** [Al-Qadir](https://dbe.rah.es/biografias/15858/al-qadir) cubre el periodo (gobierna en Valencia tras perder Toledo en 1085, †1092 asesinado por Ibn Yahhaf). [Ibn Yahhaf](https://dbe.rah.es/biografias/17911/ibn-yahhaf) tiene entrada propia.

**Cobertura completa de las 6 taifas principales** definidas en el plan.

**Dialnet:** [Pierre Guichard](https://dialnet.unirioja.es/servlet/autor?codigo=78185) es referencia obligada para Valencia y la transición taifa→almorávide; falleció en 2021. Muchos artículos en *Mélanges de la Casa de Velázquez*.

**Monografías:**
- **Wasserstein, D.** (1985) *The Rise and Fall of the Party-Kings: Politics and Society in Islamic Spain, 1002-1086*. Princeton. La obra de referencia en inglés sobre las taifas como sistema político.
- **Viguera Molins, M. J.** (coord.) (1994) *Los reinos de taifas: al-Andalus en el siglo XI*. Vol. VIII de *Historia de España Menéndez Pidal*. Espasa-Calpe. Capítulos por especialistas, taifa por taifa.
- **Lévi-Provençal**, Tomo 3 (cubre el final del califato y la transición).

**Wikimedia Commons:** [Retrato de al-Mu'tamid por Khalil Gibran](https://commons.wikimedia.org/wiki/File:Al-Mu'tamid_ibn_Abbad_by_Khalil_Gibran.png) (1922, dominio público — buena candidatura para la ficha de Sevilla, marcando como representación moderna). [Tumba de al-Mu'tamid](https://commons.wikimedia.org/wiki/File:Tumulo_Al-Mu'tamid.jpg) en Marruecos. [Columna conmemorativa en el Alcázar de Sevilla](https://commons.wikimedia.org/wiki/File:Column_of_King_Al-Mutamid_-_Jardin_de_la_Galera_-_Alcazar_of_Seville.JPG). Para el resto de taifas, monedas (dirhams y dinares fragmentarios). Es **el periodo con menos retratística** disponible.

### 5. Almorávides (1086-1147)

**Figuras clave:** Yusuf ibn Tashfin, Ali ibn Yusuf, Tashfin ibn Ali.

**Cobertura RAH (excelente, los tres):**
- [Yusuf b. Tasufín](https://dbe.rah.es/biografias/9157/yusuf-b-tasufin) + redirección [Ibn Tashfín](https://dbe.rah.es/biografias/9162/ibn-tashfin).
- [Alí b. Yusuf b. Tasufín](http://dbe.rah.es/biografias/6237/ali-b-yusuf-b-tasufin) — hijo de Yusuf.
- [Tasufín b. Alí](https://dbe.rah.es/biografias/9598/tasufin-b-ali) — 3º y último soberano almorávide en al-Andalus.

**Dialnet:** la obra clásica es **Bosch Vilá, J.** *Los almorávides* (1956, reedición 1990 con estudio preliminar de Emilio Molina López, Univ. Granada).

**Monografías:**
- **Bosch Vilá, J.** (1990) *Los almorávides*. Univ. Granada (reedición de 1956). Sigue siendo la referencia en español.
- **Kennedy** (1996/2014) capítulos sobre almorávides.

**Wikimedia Commons:** [Dinar de Yusuf b. Tasufín](https://commons.wikimedia.org/wiki/File:Yusuf_Ben_Tasfin_dinar_22562.jpg), [Dinar AH 498/1104-1105](https://commons.wikimedia.org/wiki/File:Dinar_of_Yusuf_b._Tashufin,_AH_498_(AD_1104-1105).jpg). La numismática almorávide es **abundante y de calidad** (oro de alta ley) y debe ser la imagen primaria por defecto para esta sub-entidad.

### 6. Almohades (1147-1232)

**Figuras clave:** Abd al-Mumin, Abu Yaqub Yusuf I, Yaqub al-Mansur (vencedor de Alarcos), Muhammad al-Nasir (derrotado en Las Navas), Yusuf II, Abd al-Wahid, Abd Allah al-Adil, Yahya, Abu l-Ula Idris al-Ma'mun.

**Cobertura RAH (casi completa tras segunda batida):**
- [Abd al-Mu'min](https://dbe.rah.es/biografias/7485/abd-al-mumin) — fundador, derrota a los almorávides en Tremecén (1145) y toma Marrakech (1147).
- [Yusuf I](https://dbe.rah.es/biografias/9472/yusuf-i) — *Abu Ya'qub Yusuf b. 'Abd al-Mu'min*, segundo califa (1163-1184). Encontrado bajo numeración nominal "Yusuf I" sin desambiguar respecto a los nazaríes.
- [Al-Mansur](https://historia-hispanica.rah.es/biografias/27024-al-mansur) — *Abu Yusuf Ya'qub al-Mansur*, tercer califa (1184-1199). **Vencedor de Alarcos (1195).** *URL en sitio moderno RAH `historia-hispanica.rah.es`; verificada manualmente por el maintainer (la búsqueda Google a `dbe.rah.es` no la indexaba bien).*
- [Muhammad al-Nasir](https://dbe.rah.es/biografias/126284/muhammad-al-nasir) — cuarto soberano almohade, derrotado en Las Navas (1212).
- Yusuf II al-Mustansir — referenciado como hijo de al-Nasir (su muerte en 1224 detona el periodo de inestabilidad). URL RAH no verificada en esta batida; comprobar en próxima ronda.
- [Yahyà b. al-Nasir](https://dbe.rah.es/biografias/9583/yahya-b-al-nasir) — califa durante la crisis post-Las Navas.
- [Abu l-'Ula' Idris](https://dbe.rah.es/biografias/9580/abu-l-ula-idris) — Idris al-Ma'mun.
- [Abd Allah b. Ya'qub al-Mansur al-'Adil](https://dbe.rah.es/biografias/9575/abd-allah-b-yaqub-al-mansur-al-adil) — califa tardío, post-Las Navas.

**Cobertura prácticamente completa.** Solo queda pendiente verificar URL RAH de Yusuf II al-Mustansir almohade (existencia documentada por referencias indirectas en otras entradas).

**Dialnet:** **Pascual Pasamar Lázaro**, **María Jesús Viguera Molins**, **Vicente Salvatierra**. Búsqueda recomendada por sub-temas: "almohades + al-Andalus + fiscalidad", "almohades + Alarcos", "almohades + cerámica" (la cultura material almohade es prolífica).

**Monografías:**
- **Viguera Molins, M. J.** (coord.) (1997) *El retroceso territorial de al-Andalus: almorávides y almohades, siglos XI al XIII*. Vol. VIII-2 de *Historia de España Menéndez Pidal*. Espasa-Calpe. Continuación del vol. VIII para taifas.
- **Huici Miranda, A.** (1956-1957) *Historia política del imperio almohade*, 2 vols. (reeditado 2000, Univ. Granada). Obra clásica, sigue siendo central.
- **Fierro, M.** (ed.) (2008) *El cuerpo derrotado: cómo trataban musulmanes y cristianos a los enemigos vencidos (Península Ibérica, ss. VIII-XIII)*. CSIC. Útil para entender la simbólica del periodo almohade-cristiano.

**Wikimedia Commons:** numismática almohade (mizmares cuadrados de plata, dinares de oro) — categoría [Almohad coins](https://commons.wikimedia.org/wiki/Category:Almohad_coins) cubre la dinastía. Pocos retratos contemporáneos. La iconografía cristiana de Las Navas (códices, miniaturas) ofrece representaciones polémicas pero no biográficas.

### 7. Reino Nazarí de Granada (1232-1492)

**Figuras clave:** Muhammad I (Ibn al-Ahmar, fundador) hasta Muhammad XII al-Zagal y Muhammad XI Boabdil (último, **renumerado** según RAH y fuentes árabes recientes).

**Cobertura RAH (excelente, prácticamente toda la dinastía):**
- [Muhammad I](https://dbe.rah.es/biografias/6494/muhammad-i) — fundador, Ibn al-Ahmar.
- [Muhammad II](https://dbe.rah.es/biografias/6551/muhammad-ii) — *al-Faqih*.
- [Muhammad III](https://dbe.rah.es/biografias/6552/muhammad-iii).
- [Muhammad IV](http://dbe.rah.es/biografias/6553/muhammad-iv).
- [Muhammad IX](https://dbe.rah.es/biografias/14010/muhammad-ix) — *al-Aysar*, el Zurdo.
- [Muhammad X](https://dbe.rah.es/biografias/6559/muhammad-x).
- [Muhammad XI](https://dbe.rah.es/biografias/7510/muhammad-xi) — **Boabdil** según renumeración corregida.
- [Muhammad XII](https://dbe.rah.es/biografias/6560/muhammad-xii) — **al-Zagal**.
- [Boabdil](https://dbe.rah.es/biografias/7512/boabdil) — entrada con título tradicional, redirige a la corregida.
- [Yusuf I](https://dbe.rah.es/biografias/6215/yusuf-i), [Yusuf II](https://dbe.rah.es/biografias/6241/yusuf-ii), [Yusuf III](https://dbe.rah.es/biografias/6277/yusuf-iii), [Yusuf IV](https://dbe.rah.es/biografias/6281/yusuf-iv).
- [Abu l-Hasan 'Ali](https://dbe.rah.es/biografias/4817/abu-l-hasan-ali) — Muley Hacén, padre de Boabdil.
- [Aisa bint al-Ahmar](https://dbe.rah.es/biografias/136408/aisa-bint-al-ahmar) — madre de Boabdil.
- [Ibn al-Jatib](https://dbe.rah.es/biografias/16901/ibn-al-jatib) — visir y cronista (no soberano, pero ficha útil para contextualizar).

**Dialnet:** **[Bárbara Boloix Gallardo](https://dialnet.unirioja.es/servlet/autor?codigo=1424490)** (Univ. Granada) es la voz contemporánea más activa sobre nazaríes. **[Rachel Arié](https://dialnet.unirioja.es/servlet/autor?codigo=174916)** (1924-2018) fue la referencia francesa clásica.

**Monografías:**
- **Arié, R.** (1973) *L'Espagne musulmane au temps des Nasrides (1232-1492)*. De Boccard, París. Con ediciones revisadas posteriores. **La** monografía de referencia.
- **Arié, R.** (1982) *España musulmana (siglos VIII-XV)*. Vol. III de *Historia de España* dirigida por Tuñón de Lara. Editorial Labor, Barcelona, 560 pp. Útil como visión panorámica de Al-Ándalus completo desde la óptica nazarí.
- **Boloix Gallardo, B.** (2017) *Ibn al-Ahmar: Vida y reinado del primer sultán de Granada (1195-1273)*. Univ. Granada / Patronato de la Alhambra. 268 pp. ISBN 9788433860798. **Imprescindible para Muhammad I.**
- **Boloix Gallardo, B.** (2013) *Las sultanas de la Alhambra: las grandes desconocidas del reino nazarí de Granada (siglos XIII-XV)*. Patronato de la Alhambra y el Generalife / Comares. 312 pp. Prólogo de Rachel Arié.
- **Peinado Santaella, R.** (varias obras) sobre Granada en el final del s. XV.

**Wikimedia Commons:** la sub-entidad **mejor cubierta visualmente**.
- Boabdil: [retrato del s. XVII](https://commons.wikimedia.org/wiki/File:Portrait_of_Muhammad_XII_of_Granada,_17th_century.jpg), [pintura "El rey chico"](https://commons.wikimedia.org/wiki/File:El_rey_chico_de_Granada.jpg) (s. XV), [casco atribuido a Boabdil](https://commons.wikimedia.org/wiki/File:Casque_arabe_de_Abd_Allah_Muhammad,_dit_Boabdil,_dernier_sultan_de_la_dynastie_arabe_nasride_de_Grenade,_PH81211.jpg), [tumba (Maqam) de Sidi Bel Kacem](https://commons.wikimedia.org/wiki/File:A_tomb_(Maqam)_of_Muhammad_XII_of_Granada_knows_as_Boabdil.jpg) en Marruecos, lienzo decimonónico de la entrega de Granada (Pradilla, 1882). Más de 2200 archivos relacionados solo en la búsqueda "Boabdil Granada".
- Para los demás sultanes, monedas (dinares de oro nazaríes) y miniaturas en manuscritos cristianos contemporáneos. **Casi ninguno tiene retrato auténtico**; las representaciones decimonónicas (Mariano Fortuny, Francisco Pradilla) son idealizaciones románticas.

## Bibliografía base verificada (corregida respecto al plan)

Las cuatro monografías del `PLAN-AL-ANDALUS.md` § *Fase 0 → 3. Monografías base*, con datos editoriales corregidos:

| Plan original | Datos verificados |
|---------------|-------------------|
| Lévi-Provençal, *Histoire de l'Espagne Musulmane* (clásica) | **3 vols.**, Maisonneuve & Cie / E.J. Brill, **1944-1953** (reediciones posteriores). Tomo 1: La conquête et l'émirat hispano-umaiyade, 710-912; Tomo 2: Le Califat Umaiyade de Cordoue, 912-1031; Tomo 3: Le siècle du Califat de Cordoue. |
| Kennedy, H. *Muslim Spain and Portugal* (2014) | Edición original **Longman, 1996**. La 2014 es reimpresión Routledge. Subtítulo: *A Political History of al-Andalus*. |
| Fierro, M. *Abderramán III y el califato omeya de Córdoba* (2011, Akal) | **Editorial Nerea** (no Akal), Donostia-San Sebastián, **2010** (no 2011). 292 pp. ISBN 9788496431850. Serie Media. |
| Chalmeta, P. *Invasión e islamización* (1994) | **Mapfre, 1994** (439 pp). Reedición revisada Univ. Jaén, 2003 (461 pp). Subtítulo: *La sumisión de Hispania y la formación de al-Andalus*. |

### Monografías complementarias añadidas tras Fase 0

- **Manzano Moreno, E.** (2006) *Conquistadores, emires y califas: los omeyas y la formación de al-Ándalus*. Crítica. Cubre 711-1031 con bibliografía actualizada.
- **Wasserstein, D.** (1985) *The Rise and Fall of the Party-Kings*. Princeton. Para taifas.
- **Viguera Molins, M. J.** (coord.) (1994 y 1997) Vols. VIII y VIII-2 de *Historia de España Menéndez Pidal*: taifas + almorávides/almohades.
- **Bosch Vilá, J.** (1956/1990) *Los almorávides*. Univ. Granada.
- **Huici Miranda, A.** (1956-1957/2000) *Historia política del imperio almohade*. Univ. Granada (reed.).
- **Arié, R.** (1973) *L'Espagne musulmane au temps des Nasrides (1232-1492)*. De Boccard.
- **Boloix Gallardo, B.** (2017) *Ibn al-Ahmar*. Univ. Granada / Patronato Alhambra.
- **Vallvé, J.** (1986) *La división territorial de la España musulmana*. CSIC.

## Autores Dialnet a consultar prioritariamente

Perfiles verificados:

| Autor | Codigo Dialnet | Especialidad |
|-------|---------------|--------------|
| María Isabel (Maribel) Fierro Bello | [76094](https://dialnet.unirioja.es/servlet/autor?codigo=76094) (autor) / [511277](https://dialnet.unirioja.es/servlet/extaut?codigo=511277) (autor extendido) | Califato omeya, heterodoxia, formación del islam andalusí |
| Manuela Marín Niño | [517105](https://dialnet.unirioja.es/servlet/extaut?codigo=517105) | Historia social y cultural, mujeres en al-Andalus, *Al-Qantara* |
| Pierre Guichard | [78185](https://dialnet.unirioja.es/servlet/autor?codigo=78185) | Estructuras tribales, Valencia, transición taifa→almorávide |
| Joaquín Vallvé Bermejo | [1295155](https://dialnet.unirioja.es/servlet/autor?codigo=1295155) | División territorial, geografía administrativa |
| Bárbara Boloix Gallardo | [1424490](https://dialnet.unirioja.es/servlet/autor?codigo=1424490) | Nazaríes, Muhammad I, sultanas |
| Rachel Arié | [174916](https://dialnet.unirioja.es/servlet/autor?codigo=174916) | Nazaríes (clásica) |

## Decisiones derivadas de la Fase 0 que afectan al plan

1. **Numeración nazarí (Boabdil = Muhammad XI, no XII):** RAH y fuentes árabes recientes corrigen la numeración tradicional. El plan `docs/PLAN-AL-ANDALUS.md` § *Fase 4* asume la numeración antigua (Boabdil = XII). **Acción:** actualizar el plan para reflejar la numeración corregida antes de crear las fichas, y añadir nota editorial en cada ficha afectada explicando la divergencia entre la numeración tradicional y la actualmente aceptada.
2. **Editorial Fierro y fecha:** `PLAN-AL-ANDALUS.md` lista "Fierro, M. *Abderramán III y el califato omeya de Córdoba* (2011, Akal)". La verificación da **2010, Nerea**. Corregir cita.
3. **Fecha Kennedy:** `PLAN-AL-ANDALUS.md` lista "Kennedy, H. *Muslim Spain and Portugal* (2014)". Es **1996** (Longman); 2014 es reimpresión Routledge. Citar la edición 1996 como original, indicar reimpresión si se usa la copia física Routledge.
4. **Tariq ibn Ziyad sin entrada RAH directa:** redactar su ficha apoyándose en Chalmeta (1994), Manzano Moreno (2006) y Lévi-Provençal Tomo 1. Marcar el hueco RAH como nota al cuerpo.
5. **Almanzor (al-Mansur) sí merece ficha:** la decisión 1 de `PLAN-AL-ANDALUS.md` § *Decisiones pendientes* propone "sí ficha, con `sub_entidad: califato`". RAH avala esa decisión: dos entradas independientes (breve + extensa académica) confirman su tratamiento como figura de primer nivel pese al rol formal de hachib.
6. **Imágenes:** la regla "preferir moneda o inscripción contemporánea" del plan se confirma operativa para Abd al-Rahman III (dirhams abundantes), almorávides (dinares), y se vuelve obligatoria para emires dependientes y taifas (no hay alternativa). Para Boabdil hay tantas representaciones que el reto será **no caer en la pintura decimonónica idealizada por defecto**: priorizar el casco, la moneda nazarí y, si existe, miniatura contemporánea sobre Pradilla.

## Estado de cobertura RAH

Tras la verificación manual del maintainer (2026-04-25), **los 2 huecos residuales identificados quedaron resueltos en el sitio moderno `historia-hispanica.rah.es`** (Google indexa peor las URL nuevas):

- ✓ **Muhammad I, emir independiente** (852-886) → [historia-hispanica.rah.es/biografias/32126-muhammad-i](https://historia-hispanica.rah.es/biografias/32126-muhammad-i).
- ✓ **Yaqub al-Mansur, califa almohade** (1184-1199, vencedor de Alarcos) → [historia-hispanica.rah.es/biografias/27024-al-mansur](https://historia-hispanica.rah.es/biografias/27024-al-mansur).

**Resueltos en la segunda batida automatizada** (24 entradas RAH localizadas via Google `site:dbe.rah.es`): Tariq b. Ziyad, Hisam I, al-Hakam I, al-Hakam II, Hisam II, Hisam III, Sulayman al-Musta'in, Muhammad II al-Mahdi, Abd al-Rahman V, Sanchuelo, 'Ali b. Hammud, Yusuf I almohade, Muhammad al-Nasir, Yahyà b. al-Nasir, Idris al-Ma'mun, al-'Adil, Badis, Habus, al-Mu'tadid sevillano, Yahya al-Ma'mun toledano, los 5 aftasíes de Badajoz.

**Pendiente menor (no bloqueante):** verificar URL RAH de Yusuf II al-Mustansir almohade. Su existencia está documentada por referencias indirectas en otras entradas (su muerte en 1224 detona la crisis post-Las Navas).

### Nota operativa: dos plataformas RAH

La RAH publica el material biográfico en dos sitios paralelos:

- **`dbe.rah.es`** (clásico, *Diccionario Biográfico Electrónico*) — URL del tipo `/biografias/{N}/{slug}`. Bien indexada por Google.
- **`historia-hispanica.rah.es`** (moderno, *Historia Hispánica*) — URL del tipo `/biografias/{N}-{slug}`. Indexación de Google peor; mejor verificar manualmente desde el navegador.

Ambas plataformas conviven y referencian a las mismas fichas (con IDs distintos). Para citar en `fuentes` de cada soberano, **preferir la URL clásica `dbe.rah.es` cuando exista** porque su indexación es más estable; usar `historia-hispanica.rah.es` cuando la clásica no esté localizada (caso de Muhammad I emir y Yaqub al-Mansur almohade).

## Próximos pasos

Conforme al `PLAN-AL-ANDALUS.md` § *Plan de ejecución*:

1. **Actualizar `PLAN-AL-ANDALUS.md`** con las correcciones derivadas de Fase 0 (numeración nazarí, editorial Fierro, fecha Kennedy, monografías complementarias añadidas).
2. **Validar con el maintainer las decisiones pendientes** del plan original (sigue procediendo: Almanzor sí, taifas mixtas, criterio retratos, transliteración, fechas hiyríes en cuerpo).
3. **Resolver los huecos RAH** del apartado anterior (sesión corta, búsqueda manual en `dbe.rah.es`).
4. **Crear `src/content/hispania/entidades/al-andalus.yaml`** con las 7 sub-entidades.
5. **Validar tokens de color** (`--c-andalus-ink` / `--c-andalus-solid` en `tokens.css`); decidir si las sub-fases necesitan tokens propios o variaciones de luminosidad.
6. **Iniciar Fase 1 (Califato)** con Abd al-Rahman III como primera ficha (mejor cobertura de fuentes y de imágenes).

## Criterio de cierre de Fase 0

- [x] Cobertura RAH inventariada por sub-entidad con URLs canónicas.
- [x] Autores Dialnet identificados con código de perfil.
- [x] Las 4 monografías base verificadas (con correcciones de editorial/año).
- [x] Monografías complementarias identificadas por sub-entidad.
- [x] Inventario Wikimedia Commons por sub-entidad con ejemplos concretos.
- [x] Decisiones derivadas que afectan al plan documentadas.
- [x] Huecos pendientes listados y accionables.
