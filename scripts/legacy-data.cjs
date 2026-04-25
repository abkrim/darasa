/* ==========================================================
   Atlas de Hispania — data
   Dinastías + reyes. Contenido adaptado para uso educativo.
   Retratos: Wikimedia Commons (dominio público).
   ========================================================== */

  'use strict';

  // Dinastías — mapeo a tokens CSS (.c-<slug>) de tokens.css
  var DYNASTIES = [
    {
      id: 'visigodos',
      slug: 'visigodos',
      name: 'Reino visigodo',
      shortName: 'Visigodos',
      colorVar: '--c-visigodos',
      start: 418,
      end: 711,
      row: 0,
      description: 'Los visigodos establecieron su reino en Hispania tras el colapso de Roma. Capital: Toledo. Recaredo I se convirtió al catolicismo en el III Concilio de Toledo (589). Su fin llegó con la conquista árabe-bereber.',
      sampleReyes: [
        { nombre: 'Eurico', r: '466–484', nota: 'Primer rey de toda Hispania' },
        { nombre: 'Leovigildo', r: '568–586', nota: 'Unificador' },
        { nombre: 'Recaredo I', r: '586–601', nota: 'Conversión al catolicismo' },
        { nombre: 'Rodrigo', r: '710–711', nota: 'Último rey visigodo' }
      ],
      tags: ['Germánicos', 'Toledo', 'Catolicismo', 'ss. V–VIII']
    },
    {
      id: 'al-andalus',
      slug: 'al-andalus',
      name: 'Al-Ándalus — Califato',
      shortName: 'Al-Ándalus',
      colorVar: '--c-andalus',
      start: 711,
      end: 1031,
      row: 2,
      description: 'Tras la conquista de Tariq ibn Ziyad (711), nació Al-Ándalus. El emirato independiente desde 756 culminó en el Califato de Córdoba (929), que brilló como centro cultural de Occidente hasta la fitna de 1031.',
      sampleReyes: [
        { nombre: 'Abd al-Rahman I', r: '756–788', nota: 'Funda el emirato independiente' },
        { nombre: 'Abd al-Rahman III', r: '912–961', nota: 'Primer califa de Córdoba' },
        { nombre: 'Almanzor', r: '978–1002', nota: 'Hachib, máximo poder de facto' }
      ],
      tags: ['Omeyas', 'Califato', 'Córdoba', 'ss. VIII–XI']
    },
    {
      id: 'taifas',
      slug: 'taifas',
      name: 'Taifas y reinos sucesores',
      shortName: 'Taifas',
      colorVar: '--c-taifas',
      start: 1031,
      end: 1492,
      row: 2,
      description: 'Tras la caída del Califato, Al-Ándalus se fragmentó en reinos de taifas. Llegaron los almorávides (1086) y almohades (1147). El último reducto fue el reino nazarí de Granada, conquistado por los Reyes Católicos el 2 de enero de 1492.',
      sampleReyes: [
        { nombre: 'Al-Mutamid de Sevilla', r: '1069–1091', nota: 'Rey poeta' },
        { nombre: 'Muhammad XII (Boabdil)', r: '1482–1492', nota: 'Último emir de Granada' }
      ],
      tags: ['Taifas', 'Almorávides', 'Almohades', 'Nazaríes', 'ss. XI–XV']
    },
    {
      id: 'norte',
      slug: 'norte',
      name: 'Reinos cristianos del norte',
      shortName: 'Reinos N.',
      colorVar: '--c-norte',
      start: 718,
      end: 1479,
      row: 4,
      description: 'Desde Asturias (718, Pelayo en Covadonga) comenzó la Reconquista. Asturias → León → Castilla crecieron hacia el sur. Navarra y los condados catalanes formaron Aragón. La unión de Castilla y Aragón en 1479 preparó la España moderna.',
      sampleReyes: [
        { nombre: 'Pelayo', r: '718–737', nota: 'Fundador del reino de Asturias' },
        { nombre: 'Alfonso II el Casto', r: '791–842', nota: 'Santiago de Compostela' },
        { nombre: 'Fernando III el Santo', r: '1217–1252', nota: 'Unió Castilla y León' },
        { nombre: 'Alfonso X el Sabio', r: '1252–1284', nota: 'Escuelas de traductores' },
        { nombre: 'Jaime I el Conquistador', r: '1213–1276', nota: 'Rey de Aragón' }
      ],
      tags: ['Asturias', 'León', 'Castilla', 'Aragón', 'Navarra', 'Reconquista']
    },
    {
      id: 'catolicos',
      slug: 'catolicos',
      name: 'Reyes Católicos',
      shortName: 'R. Católicos',
      colorVar: '--c-catolicos',
      start: 1479,
      end: 1516,
      row: 0,
      description: 'Isabel I de Castilla y Fernando II de Aragón unificaron sus coronas. En 1492: conquista de Granada, expulsión de los judíos y llegada de Colón a América. Establecieron la Inquisición y sentaron las bases del Imperio.',
      sampleReyes: [
        { nombre: 'Isabel I de Castilla', r: '1474–1504', nota: 'Reina de Castilla' },
        { nombre: 'Fernando II de Aragón', r: '1479–1516', nota: 'Rey de Aragón' }
      ],
      tags: ['Unificación', '1492', 'América', 'Granada', 'Inquisición']
    },
    {
      id: 'habsburgo',
      slug: 'habsburgo',
      name: 'Casa de Habsburgo',
      shortName: 'Habsburgo',
      colorVar: '--c-habsburgo',
      start: 1516,
      end: 1700,
      row: 0,
      description: 'Los Austrias gobernaron el mayor imperio de su época. Carlos I heredó España, Flandes, Nápoles y América. Felipe II añadió Portugal (1580). El Siglo de Oro convivió con el declive político. Carlos II, el Hechizado, fue el último Habsburgo.',
      sampleReyes: [
        { nombre: 'Carlos I (Carlos V)', r: '1516–1556', nota: 'Primer rey de España unificada' },
        { nombre: 'Felipe II', r: '1556–1598', nota: 'El rey prudente. Anexiona Portugal' },
        { nombre: 'Felipe III', r: '1598–1621', nota: 'Expulsión de los moriscos' },
        { nombre: 'Felipe IV', r: '1621–1665', nota: 'Velázquez en su corte' },
        { nombre: 'Carlos II', r: '1665–1700', nota: 'Último Habsburgo' }
      ],
      tags: ['Austrias', 'Imperio', 'Siglo de Oro', 'América', 'ss. XVI–XVII']
    },
    {
      id: 'borbon',
      slug: 'borbon',
      name: 'Casa de Borbón',
      shortName: 'Borbón',
      colorVar: '--c-borbon',
      start: 1700,
      end: 2025,
      row: 0,
      description: 'Felipe V (nieto de Luis XIV) inició los Borbones tras la Guerra de Sucesión. Carlos III modernizó el país. El siglo XIX trajo guerras napoleónicas y pérdida de colonias. Tras la II República, el franquismo y la Transición, Juan Carlos I restauró la monarquía democrática. Hoy reina Felipe VI.',
      sampleReyes: [
        { nombre: 'Felipe V', r: '1700–1746', nota: 'Primer Borbón' },
        { nombre: 'Carlos III', r: '1759–1788', nota: 'El mejor alcalde de Madrid' },
        { nombre: 'Fernando VII', r: '1808/1813–1833', nota: 'Restauración absolutista' },
        { nombre: 'Isabel II', r: '1833–1868', nota: 'Primera reina de España' },
        { nombre: 'Alfonso XII', r: '1874–1885', nota: 'Restauración borbónica' },
        { nombre: 'Juan Carlos I', r: '1975–2014', nota: 'Transición democrática' },
        { nombre: 'Felipe VI', r: '2014–hoy', nota: 'Rey actual' }
      ],
      tags: ['Borbones', 'Ilustración', 's. XIX', 'Democracia', 'ss. XVIII–XXI']
    },
    {
      id: 'republica',
      slug: 'republica',
      name: 'República y Franquismo',
      shortName: 'Rep./Franco',
      colorVar: '--c-republica',
      start: 1931,
      end: 1975,
      row: 2,
      special: true,
      description: 'Segunda República (1931–1939), Guerra Civil española (1936–1939) y Dictadura del general Francisco Franco (1939–1975). La monarquía estuvo suprimida. En 1975 Juan Carlos I restauró la monarquía constitucional e impulsó la Transición democrática.',
      sampleReyes: [],
      tags: ['II República', 'Guerra Civil', 'Franquismo', '1931–1975']
    }
  ];

  // Reyes visigodos — 34 monarcas, de Ataúlfo a Rodrigo.
  // img:null => se renderiza placeholder con inicial.
  var VISIGODOS = [
    { slug: 'ataulfo', id: 1, nombre: 'Ataúlfo', epiteto: '', inicio: 410, fin: 415, capital: 'Narbona / Barcelona', img: '../assets/portraits/ataulfo.webp', imgCredit: 'Wikimedia Commons, dominio público.', desc: 'Primer rey visigodo en Hispania. Entró en la península ibérica cruzando los Pirineos. Casó con Gala Placidia, hermana del emperador romano. Fue asesinado en Barcelona por sus propios hombres.', hechos: [ { k: 'Capital', v: 'Narbona · Barcelona' }, { k: 'Fin de reinado', v: 'Asesinato' }, { k: 'Origen', v: 'Sucesor de Alarico' } ] },
    { slug: 'valia', id: 2, nombre: 'Valia', epiteto: '', inicio: 415, fin: 418, capital: 'Tolosa', img: null, desc: 'Elegido rey tras el asesinato de Ataúlfo. Firmó un foedus con Roma y combatió a vándalos y alanos en Hispania en nombre del Imperio. Sentó las bases del reino visigodo como federado romano.', hechos: [ { k: 'Capital', v: 'Tolosa (Toulouse)' }, { k: 'Relación con Roma', v: 'Federado' }, { k: 'Logro', v: 'Expulsó a vándalos de Hispania' } ] },
    { slug: 'teodorico-i', id: 3, nombre: 'Teodorico I', epiteto: '', inicio: 418, fin: 451, capital: 'Tolosa', img: '../assets/portraits/teodorico-i.webp', imgCredit: 'Félix Castello, 1635. Dominio público.', desc: 'Largo reinado que consolidó el reino de Tolosa. Murió heroicamente en los Campos Cataláunicos (451) luchando junto a Roma y los hunos de Atila. Su muerte fue un punto de inflexión en la historia de Europa.', hechos: [ { k: 'Batalla clave', v: 'Campos Cataláunicos, 451' }, { k: 'Contra', v: 'Atila y los hunos' }, { k: 'Capital', v: 'Tolosa' } ] },
    { slug: 'turismundo', id: 4, nombre: 'Turismundo', epiteto: '', inicio: 451, fin: 453, capital: 'Tolosa', img: null, desc: 'Hijo de Teodorico I. Proclamado rey en el mismo campo de batalla donde murió su padre. Reinado brevísimo: fue asesinado por sus propios hermanos, que temían su política expansionista.', hechos: [ { k: 'Fin', v: 'Asesinado por sus hermanos' }, { k: 'Duración', v: '2 años' } ] },
    { slug: 'teodorico-ii', id: 5, nombre: 'Teodorico II', epiteto: '', inicio: 453, fin: 466, capital: 'Tolosa', img: null, desc: 'Mató a su hermano Turismundo para hacerse con el poder. Intervino activamente en la política romana, nombrando y deponiendo emperadores. Fue a su vez asesinado por su hermano Eurico.', hechos: [ { k: 'Política', v: 'Árbitro del Imperio Occidental' }, { k: 'Fin', v: 'Asesinado por Eurico' } ] },
    { slug: 'eurico', id: 6, nombre: 'Eurico', epiteto: 'el Grande', inicio: 466, fin: 484, capital: 'Tolosa / Arlés', img: '../assets/portraits/eurico.webp', imgCredit: 'Serie del Museo del Prado, 1854. Dominio público.', desc: 'El primer rey que gobernó toda Hispania. Promulgó el Código de Eurico, primer código legal escrito del mundo germánico. Con la caída del Imperio Romano de Occidente (476) extendió su dominio desde el Loira hasta Gibraltar.', hechos: [ { k: 'Hito legal', v: 'Código de Eurico' }, { k: 'Territorio', v: 'Toda Hispania + sur de Galia' }, { k: 'Fecha clave', v: '476: fin del Imperio' } ] },
    { slug: 'alarico-ii', id: 7, nombre: 'Alarico II', epiteto: '', inicio: 484, fin: 507, capital: 'Tolosa / Arlés', img: null, desc: 'Promulgó el Breviario de Alarico (506), adaptación del derecho romano para los súbditos hispano-romanos. Murió en la batalla de Vouillé (507) contra los francos de Clodoveo, lo que supuso la pérdida de la Galia visigoda.', hechos: [ { k: 'Hito legal', v: 'Breviario de Alarico, 506' }, { k: 'Batalla', v: 'Vouillé, 507' }, { k: 'Pérdida', v: 'Galia visigoda' } ] },
    { slug: 'gesaleico', id: 8, nombre: 'Gesaleico', epiteto: '', inicio: 507, fin: 511, capital: 'Narbona', img: null, desc: 'Hijo ilegítimo de Alarico II. Reinado caótico tras el desastre de Vouillé. Fue depuesto por Teodorico el Grande, rey ostrogodo, que ejerció la tutela sobre el reino visigodo.', hechos: [ { k: 'Contexto', v: 'Tutela ostrogoda' }, { k: 'Fin', v: 'Depuesto por Teodorico el Grande' } ] },
    { slug: 'amalarico', id: 9, nombre: 'Amalarico', epiteto: '', inicio: 511, fin: 531, capital: 'Narbona / Toledo', img: null, desc: 'Nieto de Teodorico el Grande. Primer rey que estableció definitivamente Toledo como capital. Casó con Clotilde, hija del franco Clodoveo. Fue asesinado cuando huía de la derrota ante los francos.', hechos: [ { k: 'Capital', v: 'Toledo (definitiva)' }, { k: 'Relación', v: 'Nieto de Teodorico el Grande' }, { k: 'Fin', v: 'Asesinado en huida' } ] },
    { slug: 'teudis', id: 10, nombre: 'Teudis', epiteto: '', inicio: 531, fin: 548, capital: 'Toledo', img: null, desc: 'General ostrogodo que gobernó de facto antes de ser proclamado rey. Defendió Hispania de los francos con éxito. Fue asesinado por un hombre que fingió estar loco. Toledo se consolida como capital indiscutible.', hechos: [ { k: 'Origen', v: 'General ostrogodo' }, { k: 'Logro', v: 'Frenó a los francos' }, { k: 'Fin', v: 'Asesinado' } ] },
    { slug: 'teudiselo', id: 11, nombre: 'Teudiselo', epiteto: '', inicio: 548, fin: 549, capital: 'Toledo', img: null, desc: 'Reinado de apenas un año. Conocido por su crueldad y vida licenciosa. Fue asesinado durante un banquete por nobles que él había ofendido.', hechos: [ { k: 'Duración', v: '~1 año' }, { k: 'Fin', v: 'Asesinado en un banquete' } ] },
    { slug: 'agila-i', id: 12, nombre: 'Ágila I', epiteto: '', inicio: 549, fin: 554, capital: 'Toledo', img: null, desc: 'Su reinado fue marcado por una grave guerra civil. El noble Atanagildo se rebeló con apoyo del Imperio Bizantino (que ocupó el sureste de Hispania). Ágila fue asesinado por sus propias tropas.', hechos: [ { k: 'Conflicto', v: 'Guerra civil' }, { k: 'Rival', v: 'Atanagildo + Bizancio' }, { k: 'Consecuencia', v: 'Presencia bizantina en España' } ] },
    { slug: 'atanagildo', id: 13, nombre: 'Atanagildo', epiteto: '', inicio: 554, fin: 567, capital: 'Toledo', img: null, desc: 'Llegó al poder con ayuda bizantina, pero luego intentó expulsarlos sin éxito. Los bizantinos mantuvieron la Spania hasta el 625. Buen administrador que consolidó Toledo como la gran capital del reino.', hechos: [ { k: 'Problema', v: 'Bizantinos en el sur' }, { k: 'Capital', v: 'Toledo consolidada' }, { k: 'Fin', v: 'Muerte natural (el único)' } ] },
    { slug: 'leovigildo', id: 14, nombre: 'Leovigildo', epiteto: 'el Grande', inicio: 568, fin: 586, capital: 'Toledo', img: '../assets/portraits/leovigildo.webp', imgCredit: 'Serie del Museo del Prado, 1854. Dominio público.', desc: 'El gran unificador. Conquistó el reino suevo (585), frenó a vascones y cántabros, y expulsó parte de los bizantinos. Creó la primera moneda visigoda con su efigie. Su hijo Hermenegildo se rebeló al convertirse al catolicismo y fue ejecutado.', hechos: [ { k: 'Hito', v: 'Conquistó el reino suevo, 585' }, { k: 'Moneda', v: 'Primer tremis visigodo' }, { k: 'Drama familiar', v: 'Ejecutó a su hijo Hermenegildo' } ] },
    { slug: 'recaredo-i', id: 15, nombre: 'Recaredo I', epiteto: 'el Católico', inicio: 586, fin: 601, capital: 'Toledo', img: '../assets/portraits/recaredo-i.webp', imgCredit: 'Serie del Museo del Prado, 1854. Dominio público.', desc: 'El rey más importante de la historia visigoda. En el III Concilio de Toledo (589) abjuró del arrianismo y convirtió al catolicismo toda la monarquía visigoda, unificando a godos e hispanorromanos bajo una misma fe. Cambió la historia religiosa de España.', hechos: [ { k: 'Hito', v: 'III Concilio de Toledo, 589' }, { k: 'Conversión', v: 'Arrianismo → Catolicismo' }, { k: 'Impacto', v: 'Unificación religiosa del reino' }, { k: 'Padre', v: 'Leovigildo el Grande' } ] },
    { slug: 'liuva-ii', id: 16, nombre: 'Liuva II', epiteto: '', inicio: 601, fin: 603, capital: 'Toledo', img: null, desc: 'Hijo de Recaredo. Depuesto y asesinado por Witerico, que alegó su origen no noble. Tenía unos 18 años cuando fue ejecutado.', hechos: [ { k: 'Fin', v: 'Asesinado por Witerico' }, { k: 'Edad', v: '~18 años' } ] },
    { slug: 'witerico', id: 17, nombre: 'Witerico', epiteto: '', inicio: 603, fin: 610, capital: 'Toledo', img: null, desc: 'General que usurpó el trono. Intentó guerrear contra Bizancio sin éxito. Fue asesinado durante un banquete, igual que otros reyes que le precedieron.', hechos: [ { k: 'Origen', v: 'Usurpador' }, { k: 'Política exterior', v: 'Hostil a Bizancio' }, { k: 'Fin', v: 'Asesinado en banquete' } ] },
    { slug: 'gundemaro', id: 18, nombre: 'Gundemaro', epiteto: '', inicio: 610, fin: 612, capital: 'Toledo', img: null, desc: 'Reinado corto pero marcado por un concilio importante en Toledo que afirmó la primacía de la sede toledana sobre el resto del reino.', hechos: [ { k: 'Concilio', v: 'Primacía de Toledo' }, { k: 'Duración', v: '~2 años' } ] },
    { slug: 'sisebuto', id: 19, nombre: 'Sisebuto', epiteto: '', inicio: 612, fin: 621, capital: 'Toledo', img: null, desc: 'Rey culto y buen guerrero. Arrebató más territorios a los bizantinos. Promovió conversiones forzosas de judíos al catolicismo, medida que marcó negativamente la historia del reino.', hechos: [ { k: 'Política', v: 'Conversión forzosa de judíos' }, { k: 'Militar', v: 'Éxitos contra Bizancio' } ] },
    { slug: 'recaredo-ii', id: 20, nombre: 'Recaredo II', epiteto: '', inicio: 621, fin: 621, capital: 'Toledo', img: null, desc: 'Niño que reinó apenas unos meses tras la muerte de su padre Sisebuto. Murió en circunstancias desconocidas, probablemente envenenado.', hechos: [ { k: 'Edad', v: 'Niño' }, { k: 'Duración', v: 'Meses' } ] },
    { slug: 'suintila', id: 21, nombre: 'Suintila', epiteto: '', inicio: 621, fin: 631, capital: 'Toledo', img: null, desc: 'Logró expulsar definitivamente a los bizantinos de Hispania (625). Por primera vez, los visigodos gobernaron toda la península ibérica sin presencia imperial. Fue depuesto por una revuelta nobiliaria.', hechos: [ { k: 'Hito', v: 'Expulsión total de bizantinos, 625' }, { k: 'Logro', v: 'Hispania 100% visigoda' }, { k: 'Fin', v: 'Deposición nobiliaria' } ] },
    { slug: 'sisenando', id: 22, nombre: 'Sisenando', epiteto: '', inicio: 631, fin: 636, capital: 'Toledo', img: null, desc: 'Subió al trono con ayuda de los francos. Durante su reinado se celebró el IV Concilio de Toledo (633), que reguló la sucesión real y consagró el principio electivo.', hechos: [ { k: 'Concilio', v: 'IV Concilio de Toledo, 633' }, { k: 'Hito', v: 'Principio electivo' } ] },
    { slug: 'chintila', id: 23, nombre: 'Chintila', epiteto: '', inicio: 636, fin: 639, capital: 'Toledo', img: null, desc: 'Rey escogido por el IV Concilio. Se celebró el V Concilio de Toledo que refrendó su elección. Reinado tranquilo pero breve.', hechos: [ { k: 'Concilio', v: 'V Concilio de Toledo' }, { k: 'Duración', v: '~3 años' } ] },
    { slug: 'tulga', id: 24, nombre: 'Tulga', epiteto: '', inicio: 639, fin: 642, capital: 'Toledo', img: null, desc: 'Hijo adolescente de Chintila. Depuesto y tonsurado (obligado a hacerse monje) por Chindasvinto, que usurpó el trono.', hechos: [ { k: 'Fin', v: 'Tonsurado (forzado monje)' }, { k: 'Sucesor', v: 'Chindasvinto (usurpador)' } ] },
    { slug: 'chindasvinto', id: 25, nombre: 'Chindasvinto', epiteto: '', inicio: 642, fin: 653, capital: 'Toledo', img: null, desc: 'Anciano usurpador (llegó al trono con 79 años) pero fortísimo gobernante. Ejecutó a cientos de nobles rivales. Impulsó el Fuero Juzgo, código legal unificado para godos e hispanorromanos.', hechos: [ { k: 'Edad al trono', v: '~79 años' }, { k: 'Obra', v: 'Fuero Juzgo (Liber Iudiciorum)' }, { k: 'Política', v: 'Ejecuciones masivas' } ] },
    { slug: 'recesvinto', id: 26, nombre: 'Recesvinto', epiteto: '', inicio: 653, fin: 672, capital: 'Toledo', img: null, desc: 'Hijo de Chindasvinto. Promulgó el Fuero Juzgo definitivo (654), el primer código legal territorial único de Europa. Fundó la iglesia de San Juan de Baños, que aún se conserva.', hechos: [ { k: 'Hito legal', v: 'Fuero Juzgo, 654' }, { k: 'Monumento', v: 'San Juan de Baños' }, { k: 'Legado', v: 'Base del derecho hispano' } ] },
    { slug: 'wamba', id: 27, nombre: 'Wamba', epiteto: '', inicio: 672, fin: 680, capital: 'Toledo', img: null, desc: 'Anciano elegido rey a regañadientes. Sofocó una gran rebelión en la Galia. Intentó reformas militares. Fue depuesto mediante un engaño: le tonsuraron mientras estaba enfermo, invalidándolo para reinar.', hechos: [ { k: 'Rebelión', v: 'Galia (Paulo)' }, { k: 'Fin', v: 'Tonsurado por engaño' } ] },
    { slug: 'ervigio', id: 28, nombre: 'Ervigio', epiteto: '', inicio: 680, fin: 687, capital: 'Toledo', img: null, desc: 'Llegó al trono por una conspiración. Renovó el Fuero Juzgo y convocó el XII Concilio de Toledo. Política cada vez más dura contra los judíos.', hechos: [ { k: 'Inicio', v: 'Conspiración contra Wamba' }, { k: 'Política', v: 'Antijudaica severa' } ] },
    { slug: 'egica', id: 29, nombre: 'Égica', epiteto: '', inicio: 687, fin: 702, capital: 'Toledo', img: null, desc: 'Yerno de Ervigio, pero enfrentado a él tras su muerte. Reino marcado por epidemias y conflictos. Asoció al trono a su hijo Witiza en 698.', hechos: [ { k: 'Co-rey', v: 'Witiza (desde 698)' }, { k: 'Contexto', v: 'Epidemias y crisis' } ] },
    { slug: 'witiza', id: 30, nombre: 'Witiza', epiteto: '', inicio: 702, fin: 710, capital: 'Toledo', img: null, desc: 'Hijo de Égica. Reinó solo desde 702. Algunas fuentes le atribuyen una política conciliadora; otras lo pintan como tirano. Su muerte inesperada desencadenó la crisis final del reino.', hechos: [ { k: 'Fin', v: 'Muerte inesperada' }, { k: 'Consecuencia', v: 'Crisis sucesoria' } ] },
    { slug: 'rodrigo', id: 31, nombre: 'Rodrigo', epiteto: 'el Último', inicio: 710, fin: 711, capital: 'Toledo', img: null, desc: 'Último rey visigodo. Fue derrotado en la batalla de Guadalete (711) por las tropas árabe-bereberes de Tariq ibn Ziyad. Su muerte en combate abrió las puertas de Hispania al Islam y puso fin a tres siglos de reino visigodo.', hechos: [ { k: 'Batalla final', v: 'Guadalete, 711' }, { k: 'Contra', v: 'Tariq ibn Ziyad' }, { k: 'Consecuencia', v: 'Fin del reino visigodo · inicio de Al-Ándalus' } ] }
  ];

  // Helpers (disponibles como window.*)
  function getDynasty(slug) {
    for (var i = 0; i < DYNASTIES.length; i++) if (DYNASTIES[i].slug === slug) return DYNASTIES[i];
    return null;
  }

  function getVisigodoBySlug(slug) {
    for (var i = 0; i < VISIGODOS.length; i++) if (VISIGODOS[i].slug === slug) return VISIGODOS[i];
    return null;
  }

  function getVisigodoNeighbors(slug) {
    var idx = -1;
    for (var i = 0; i < VISIGODOS.length; i++) if (VISIGODOS[i].slug === slug) { idx = i; break; }
    if (idx === -1) return { prev: null, next: null };
    return {
      prev: idx > 0 ? VISIGODOS[idx - 1] : null,
      next: idx < VISIGODOS.length - 1 ? VISIGODOS[idx + 1] : null
    };
  }


module.exports = { DYNASTIES, VISIGODOS, getDynasty, getVisigodoBySlug, getVisigodoNeighbors };

