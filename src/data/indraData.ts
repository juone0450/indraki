import { FilmProject, DiscographyItem, TechnicalGear } from '../types';

export const FILMS_DATA: FilmProject[] = [
  {
    id: 'film-01',
    sheetNo: 'SHEET 01',
    revision: 'REV C // 4K LOG',
    title: 'NEBLINA SUR',
    year: '2025',
    role: 'Dirección, Dirección de Fotografía & Diseño Sonoro',
    format: '35mm Anamórfico Kodak 5219 (500T)',
    aspectRatio: '2.39:1',
    lens: 'Panavision C-Series Anamorphic (40mm / 75mm)',
    soundFormat: 'Dolby Atmos + Master Cinta Magnética 1/2"',
    duration: '14:20',
    logline: 'Un convoy de remolcadores desciende por el Río de la Plata en medio de una niebla eléctrica que descalibra los radares de navegación y altera la frecuencia de las sirenas portuarias.',
    location: 'Puerto de Montevideo & Isla de Ratas (Uruguay)',
    awards: 'Premio Especial del Jurado Mejor Fotografía — BAFICI 2025 / Selección Oficial Rotterdam',
    colorPalette: ['#12151B', '#374151', '#D9B98C', '#FF4D22'],
    stillPlaceholder: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80',
    technicalNotes: [
      'Exposición forzada +1 stop para amplificar grano en zonas de sombra.',
      'Sonido directo capturado con micrófonos hidrofónicos bajo el casco de los remolcadores.',
      'Mezcla de bajos afinada en 43.2 Hz para resonancia física en salas de cine.'
    ]
  },
  {
    id: 'film-02',
    sheetNo: 'SHEET 02',
    revision: 'REV A // DCI-P3',
    title: 'RÍO MUTANTE',
    year: '2024',
    role: 'Dirección & Producción Musical',
    format: 'Super 16mm (Aaton XTR Prod) + ARRI LF Digital',
    aspectRatio: '1.85:1',
    lens: 'Zeiss Super Speed MkIII T1.3',
    soundFormat: 'Cuadrafónico 96kHz / 24-Bit PCM',
    duration: '09:45',
    logline: 'Una coreografía industrial en los galpones abandonados de La Boca; el choque entre el pulso del bandoneón microtonal y las descargas de transformadores de alta tensión.',
    location: 'Barracas & La Boca, Buenos Aires (Argentina)',
    awards: 'Mejor Cortometraje Experimental — Festival Internacional de Mar del Plata',
    colorPalette: ['#0A0A0A', '#1E293B', '#FF4D22', '#FAF7F2'],
    stillPlaceholder: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    technicalNotes: [
      'Filtro Black Pro-Mist 1/2 constante para velar las luces de vapor de sodio.',
      'Bandoneón Doble A de 1938 pasado por pedales analógicos fuzz y pitch-shift octavador.',
      'Sincronía estroboscópica a 12 FPS en secuencias de quiebre.'
    ]
  },
  {
    id: 'film-03',
    sheetNo: 'SHEET 03',
    revision: 'REV B // 65MM RES',
    title: 'MONTEVIDEO VAPOR',
    year: '2024',
    role: 'Dirección & Composición Electroacústica',
    format: '65mm Gran Formato + Escaneo Óptico 8K',
    aspectRatio: '1.43:1 (IMAX Ratio)',
    lens: 'Hasselblad Prime Lenses rehoused by Cineovision',
    soundFormat: '7.1 Surround Masterizado en Studer A800',
    duration: '18:10',
    logline: 'Estudio de la luz cenicienta del invierno oriental sobre las fachadas Art Déco de la Ciudad Vieja y el eco de los tambores de candombe rebotando en el hormigón mojado.',
    location: 'Ciudad Vieja & Barrio Sur, Montevideo',
    awards: 'Premio a la Innovación Sonora — Festival de Cinema de Curtas Vila do Conde',
    colorPalette: ['#1C1917', '#78716C', '#D9B98C', '#E63B10'],
    stillPlaceholder: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    technicalNotes: [
      'Rodaje exclusivo en la hora azul y madrugadas de neblina húmeda (98% RH).',
      'Tambores chico, repique y piano grabados en cámara anecoica y reamplificados en túneles del ferrocarril central.',
      'Copia maestra en emulsión positiva de 70mm.'
    ]
  },
  {
    id: 'film-04',
    sheetNo: 'SHEET 04',
    revision: 'REV D // VINTAGE',
    title: 'CARA O CRUZ EN EL PUERTO',
    year: '2023',
    role: 'Codirección & Banda Sonora Original',
    format: '16mm Bolex H16 Reflex + Ópticas Switar',
    aspectRatio: '1.33:1 (Standard 4:3)',
    lens: 'Kern-Paillard Switar 10mm & 25mm T1.4',
    soundFormat: 'Cinta Abierta 1/4" Mono Hi-Fi',
    duration: '06:12',
    logline: 'Un thriller lírico sobre dos contrabandistas de bobinas cinematográficas en la Dársena Sur, filmado en película vencida en 1994.',
    location: 'Dársena Sur, Avellaneda (Argentina)',
    awards: 'Mención Especial del Jurado — FICUNAM',
    colorPalette: ['#171717', '#404040', '#D9B98C', '#F3EFE6'],
    stillPlaceholder: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    technicalNotes: [
      'Película Kodak Plus-X procesada manualmente en laboratorio casero con café y vitamina C.',
      'Efectos sonoros generados exclusivamente con una máquina de escribir Olivetti y sintetizador modular Korg MS-20.'
    ]
  }
];

export const DISCOGRAPHY_DATA: DiscographyItem[] = [
  {
    id: 'track-01',
    trackCode: 'INDRA-TRK-01',
    title: 'DELIRIO DEL ESTUARIO (INTRO)',
    album: 'Delirio del Estuario (LP)',
    year: '2025',
    duration: '03:45',
    bpm: 64,
    key: 'F# Minor',
    stems: ['Sub Bass (45Hz)', 'Bandoneón Procesado', 'Ruido de Río y Viento', 'Pulso Mecánico'],
    masterSpecs: '24-Bit / 96kHz • Studer A800 MkIII Tape Saturation • -14.2 LUFS',
    mood: 'Tenebroso, Atmosférico, Hipnótico',
    description: 'Apertura del álbum conceptual. La bruma del Río de la Plata traducida en un zumbido de frecuencia subsónica con respiraciones de fuelle de bandoneón filtradas.'
  },
  {
    id: 'track-02',
    trackCode: 'INDRA-TRK-02',
    title: 'VAPOR DE SODIO Y 808',
    album: 'Delirio del Estuario (LP)',
    year: '2025',
    duration: '04:18',
    bpm: 72,
    key: 'A Minor',
    stems: ['808 Sub Kick', 'Luz de Sodio Hiss', 'Fuelle Detuned', 'Caja Roland 707'],
    masterSpecs: '24-Bit / 96kHz • Manley Massive Passive EQ • -12.8 LUFS',
    mood: 'Nocturno, Pesado, Cinematográfico',
    description: 'El sonido de una caminata bajo el alumbrado anaranjado de Barracas a las 4 AM. Graves demoledores que conviven con acordes disonantes.'
  },
  {
    id: 'track-03',
    trackCode: 'INDRA-TRK-03',
    title: 'NOCHE DE ADUANA (TEMA CENTRAL)',
    album: 'Neblina Sur (Original Soundtrack)',
    year: '2025',
    duration: '05:02',
    bpm: 58,
    key: 'D Minor',
    stems: ['Sirenas Portuarias', 'Cello Prep.', 'Gong Hidráulico', 'Sub Drone'],
    masterSpecs: 'Dolby Atmos Print Master • Neve 1073 Preamp Saturation',
    mood: 'Furtivo, Denso, Tectónico',
    description: 'Pieza angular de la banda sonora ganadora en BAFICI. Mezcla grabaciones de campo del canal de acceso con osciladores Buchla modulados al compás del oleaje.'
  },
  {
    id: 'track-04',
    trackCode: 'INDRA-TRK-04',
    title: 'CIUDAD VIEJA / REVERBERANCIA',
    album: 'Frecuencias del Plata (EP)',
    year: '2024',
    duration: '03:14',
    bpm: 68,
    key: 'C Minor',
    stems: ['Campanas Catedral', 'Candombe Subterráneo', 'Tape Delay RE-201', 'Bandoneón Solo'],
    masterSpecs: 'Masterizado directo a vinilo de corte DMM (Direct Metal Mastering)',
    mood: 'Elegíaco, Arquitectónico, Brutalista',
    description: 'Captura de respuestas al impulso (IR) de la bóveda del Palacio Salvo fusionada con percusiones de madera y ecos de cinta magnética.'
  }
];

export const TECHNICAL_SPECS: TechnicalGear[] = [
  {
    category: 'OPTICAL RIGS',
    item: 'Panavision Ultra Panatar 1.3x Anamorphic',
    spec: 'Vidrio T1.4, flare horizontal ámbar calibrado a mano',
    serialRef: 'PAN-ANA-8492',
    roleInStudio: 'Lentes primarios para captura de neblina y luces de sodio'
  },
  {
    category: 'CINEMA CAMERAS',
    item: 'ARRI Alexa 35 & Bolex H16 Reflex',
    spec: 'Sensor Super 35 4.6K LogC4 + Emulsión 16mm manual',
    serialRef: 'CAM-ST-003',
    roleInStudio: 'Hibridación analógica-digital de grano y rango dinámico'
  },
  {
    category: 'ANALOG TAPE',
    item: 'Studer A800 MkIII 24-Track 2" Tape Recorder',
    spec: 'Calibrado a 30 IPS con cinta ATR Master Tape',
    serialRef: 'STU-MK3-1981',
    roleInStudio: 'Compresión natural y calidez armónica de transitorios sonoros'
  },
  {
    category: 'ACOUSTIC REEDS',
    item: 'Bandoneón Doble A (Premier Alfred Arnold, 1938)',
    spec: '71 voces, lengüetas de zinc, afinación 442 Hz tratada',
    serialRef: 'AA-ZINC-3801',
    roleInStudio: 'Generador microtonal y núcleo armónico de identidad rioplatense'
  },
  {
    category: 'DSP & CONVERSION',
    item: 'Burl Mothership B80 Dante / Lavry Quintessence DA',
    spec: 'Conversión Discrete Class-A a 192kHz / 32-bit float',
    serialRef: 'BURL-B80-DNT',
    roleInStudio: 'Transferencia libre de distorsión digital entre cinta y DAW'
  }
];

export const MANIFESTO_TEXTS = {
  header: 'INDRAKI — MANIFIESTO DEL DELIRIO CINEMATOGRÁFICO',
  subtitle: 'Crónica Técnica de la Resistencia Sonora y Óptica en el Río de la Plata',
  instagram: 'https://www.instagram.com/indraki13/',
  instagramHandle: '@indraki13',
  youtubeEmbedUrl: 'https://www.youtube.com/embed/-nDtNHDbX1M?si=zOpdYezKGNSP9maJ',
  metadata: {
    sheet: 'SHEET M-00',
    revision: 'REV 1.4 // CLASIFICACIÓN PÚBLICA',
    location: 'COORD 34°36\'12" S, 58°22\'54" W // RÍO DE LA PLATA',
    datum: 'DATUM 00 120.000 // POS X',
    date: 'OCTUBRE 2025'
  },
  theses: [
    {
      num: '01',
      title: 'EL RÍO COMO MATERIA VISCOSA Y DISONANTE',
      quote: '«El Río de la Plata no es agua: es una lámina de mercurio y limo que absorbe los agudos y multiplica la presión de los graves.»',
      body: 'Nuestra geografía no tolera la esterilidad del sonido digital sin fricción. Entre Montevideo y Buenos Aires no hay horizonte transparente; hay un estuario de barcos varados, chimeneas petroquímicas y un rumor continuo de motores diésel que late a 50 Hertz. Crear sonido e imagen aquí exige aceptar la turbiedad como verdad estética. La claridad aséptica es una imposición colonial de los laboratorios del norte; nosotros trabajamos con el barro acústico, el zumbido de la tierra y la reverberación de los muelles de hormigón oxidado.'
    },
    {
      num: '02',
      title: 'EL GRANO ÓPTICO NO ES NOSTALGIA, ES DENSIDAD CUÁNTICA',
      quote: '«Filmar en emulsión de 35mm y 16mm no es romanticismo retro; es la negativa política a reducir la luz a una cuadrícula matemática de píxeles.»',
      body: 'La película de haluro de plata reacciona a los fotones con una danza molecular caótica. Cada fotograma es irrepetible. Cuando colocamos una lente anamórfica Panavision frente a un faro portuario en plena noche rioplatense, no buscamos un artefacto "vintage": buscamos la violencia física de la luz refractada rasgando el negativo. El grano es la piel viva del tiempo cinematográfico; su textura física nos recuerda que toda imagen es un choque material entre el sol, la química y el delirio.'
    },
    {
      num: '03',
      title: 'EL BANDONEÓN COMO MUTACIÓN ELECTROACÚSTICA',
      quote: '«Desarmar el fuelle sagrado, meterle micrófonos de contacto piezoeléctricos y pasarlo por un oscilador analógico al límite del colapso.»',
      body: 'El tango histórico suele momificarse en museos para turistas. Para nosotros, el bandoneón Alfred Arnold de 1938 es un generador de frecuencias brutas: una máquina de viento que gime como un animal herido en el puerto. Al conectarlo a preamplificadores a válvulas saturados y filtros de paso bajo, el bandoneón abandona la nostalgia y se transforma en un sub-oscilador telúrico capaz de derrumbar paredes en un club de techno o musicalizar la agonía de una barcaza a la deriva.'
    },
    {
      num: '04',
      title: 'LA ESTÉTICA DEL PLANO ARQUITECTÓNICO Y LA DISCIPLINA INDUSTRIAL',
      quote: '«El delirio artístico carece de impacto si no está respaldado por la precisión quirúrgica de un plano de ingeniería.»',
      body: 'Rechazamos el caos desprolijo. El arte más radical nace del rigor de la llamada de rodaje (call sheet), de la calibración milimétrica del foco, de la hoja de ruta técnica que registra la temperatura del revelador a 20.0°C y la afinación de cada pista de cinta en -14 LUFS. El arte es ingeniería de los afectos. Este archivo no es una vidriera publicitaria; es un depósito de planos de batalla, registros de frecuencias y artefactos lumínicos listos para ser reactivados por cualquier operador que comprenda la urgencia de la señal.'
    }
  ],
  callSheetLog: [
    { call: 'CALL 01', time: '02:30 ART', scene: 'ESCENA 14 EXT. PUERTO', notes: 'Temperatura 6°C. Neblina natural espesor 80m. Rodaje con Panavision 40mm a T1.4. Prohibido uso de LED aséptico.' },
    { call: 'CALL 02', time: '05:15 ART', scene: 'ESCENA 19 INT. SILO ABANDONADO', notes: 'Prueba de sub-graves en tiempo real con 4 subwoofers Meyer Sound. Vibración del zinc del techo grabada en canal 3.' },
    { call: 'CALL 03', time: '18:45 ART', scene: 'ESCENA 27 EXT. ESCOLLERA SARANDÍ', notes: 'Hora azul. Viento del este 35 nudos. Tomas de plano general con emulsión Kodak 250D sobreexpeusta.' }
  ]
};
