export const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'universos', name: 'Universos de marca' },
  { id: 'identidad', name: 'Identidad visual' },
  { id: 'ilustracion', name: 'Ilustración' },
  { id: 'packaging', name: 'Packaging & producto' }
];

// Images are Cloudinary public IDs (see src/lib/cloudinary.js).
// Optional fields (year, location, role, colorPalette, typography) render only when present.
// Board public IDs follow web_<project>-NN
const boards = (project, ...numbers) => numbers.map((n) => `web_${project}-${String(n).padStart(2, '0')}`);
const slides = (...numbers) => boards('47', ...numbers);

export const WORK_PROJECTS = [
  {
    id: '47-street',
    title: '47 Street',
    client: '47 Street',
    category: 'universos',
    categoryLabel: 'Universo de marca · Personajes',
    subtitle: 'Línea I ♥ 47',
    tagline: 'Un universo de personajes para la línea I ♥ 47, de las bolsas de compra a la papelería y las mochilas.',
    summary: 'Creación y desarrollo del universo visual de I ♥ 47, la línea de 47 Street. Personajes propios —Amanda, Renata y Olivia— que dan vida a bolsas, estampas, agendas, cuadernos, stickers y mochilas, junto con colaboraciones con licencias como Hello Kitty y Snoopy.',
    thumbnail: '47',
    coverImage: 'web_47-03',
    heroImage: 'web_47-03', // shown in the home hero; the card uses the thumbnail
    imageSize: { width: 2200, height: 1350 },
    deliverables: ['Personajes', 'Bolsas & troqueles', 'Estampas', 'Papelería', 'Mochilas', 'Licencias'],
    sections: [
      {
        title: 'Bolsas',
        text: 'Bolsas de compra y de rafia con troqueles propios: cada modelo presenta a una personaje con su propio mundo gráfico, y conviven con las licencias de Hello Kitty y Snoopy.',
        images: slides(1, 2, 4, 5, 6, 7, 8, 10, 9)
      },
      {
        title: 'Personajes y estampas',
        text: 'Amanda, Renata y Olivia, y el sistema de estampas que las rodea: tramas, frases y composiciones que llevan el universo a cada producto.',
        images: slides(11, 12, 13, 14, 15, 16, 17, 18, 19, 26)
      },
      {
        title: 'Papelería',
        text: 'Agendas, cuadernos y planchas de stickers: del armado de la ilustración por capas a la familia completa de productos en góndola.',
        images: slides(20, 21, 22, 24, 25)
      },
      {
        title: 'Mochilas',
        text: 'Del diseño técnico, con la especificación de colores Pantone, al producto terminado.',
        images: slides(27, 28, 29)
      }
    ],
    featured: true
  },
  {
    id: 'owoko',
    title: 'Owoko',
    client: 'Owoko',
    category: 'universos',
    categoryLabel: 'Identidad · Personajes · Indumentaria infantil',
    tagline: 'Una marca de indumentaria infantil construida alrededor de una familia de personajes.',
    summary: 'Identidad, personajes y sistema gráfico para Owoko: del logo y la familia de personajes a las gráficas de las prendas, el e-commerce, las piezas editoriales y el packaging.',
    thumbnail: 'owoko',
    coverImage: 'web_owoko-01',
    imageSize: { width: 2200, height: 1350 },
    deliverables: ['Identidad', 'Personajes', 'Gráficas textiles', 'E-commerce', 'Editorial', 'Packaging'],
    sections: [
      {
        title: 'Identidad y personajes',
        text: 'El logo y una familia de personajes con nombre propio, pensada para vivir en cualquier pieza de la marca.',
        images: boards('owoko', 2, 4, 5, 6, 7, 8, 9, 10)
      },
      {
        title: 'Gráficas y prendas',
        text: 'Gráficas, estampados y bordados aplicados a la colección, del diseño a la prenda fotografiada.',
        images: boards('owoko', 3, 11, 12, 13, 14, 15, 16, 17, 26, 27, 28, 29)
      },
      {
        title: 'Digital',
        text: 'El universo de la marca en el e-commerce y las redes.',
        images: boards('owoko', 18, 19, 20)
      },
      {
        title: 'Editorial y packaging',
        text: 'Libros para colorear, piezas impresas y bolsas.',
        images: boards('owoko', 21, 22, 23, 24, 25, 30)
      }
    ]
  },
  {
    id: 'violetta',
    title: 'Violetta',
    client: 'Disney',
    category: 'ilustracion',
    categoryLabel: 'Ilustración · Apertura de serie',
    tagline: 'Ilustraciones, doodles y storyboard para la apertura de la serie Violetta.',
    summary: 'El proyecto recorre el sketchbook de ilustraciones y doodles, los objetos ilustrados que el equipo de motion modeló en 3D y el storyboard de la secuencia.',
    thumbnail: 'violetta',
    coverImage: 'web_violetta-01',
    imageSize: { width: 2200, height: 1350 },
    deliverables: ['Ilustración', 'Doodles', 'Objetos para 3D', 'Storyboard'],
    sections: [
      {
        title: 'La apertura',
        text: 'La secuencia terminada.',
        video: 'disney_-_opening_violetta_Original'
      },
      {
        title: 'Ilustración y doodles',
        text: 'Un sketchbook de ilustraciones y un sistema de doodles —música, mariposas, corazones, instrumentos— que dan el tono de la apertura.',
        images: boards('violetta', 2, 3, 4, 5, 6, 7, 8, 10, 11, 12)
      },
      {
        title: 'Objetos y escenografía',
        text: 'Eber ilustró los objetos y el equipo de motion los modeló en 3D para armar los sets.',
        images: boards('violetta', 13, 14, 15, 16, 17)
      },
      {
        title: 'Storyboard, títulos y rodaje',
        text: 'El storyboard de la secuencia, los títulos del elenco y el rodaje en chroma.',
        images: boards('violetta', 9, 18, 19, 20, 21, 22)
      }
    ]
  },
  {
    id: 'topa',
    title: 'Topa',
    client: 'Disney Junior',
    category: 'packaging',
    categoryLabel: 'Packaging · Lettering · Ilustración',
    subtitle: 'Me muevo para aquí',
    tagline: 'El disco «Me muevo para aquí» de Topa para Disney Junior, de la tapa al librillo.',
    summary: 'Logo y lettering, packaging del CD, librillo con las letras de las canciones y una familia de personajes y objetos que acompañan cada tema.',
    thumbnail: 'topa',
    coverImage: 'web_topa-07',
    imageSize: { width: 2200, height: 1350 },
    deliverables: ['Logo y lettering', 'Packaging', 'Librillo', 'Personajes', 'Objetos 3D'],
    sections: [
      {
        title: 'El disco',
        text: 'Tapa, contratapa con la lista de temas y el disco.',
        images: boards('topa', 4, 6, 5, 17)
      },
      {
        title: 'Logo y lettering',
        text: 'Las variantes tipográficas que se exploraron hasta llegar a las letras infladas del logo.',
        images: boards('topa', 16)
      },
      {
        title: 'Personajes y objetos',
        text: 'Un elenco de personajes y objetos, del boceto al modelo terminado, que acompaña a cada canción.',
        images: boards('topa', 8, 12, 14)
      },
      {
        title: 'Poses y fotografía',
        text: 'Bocetos de poses, la sesión de fotos y el sistema gráfico que las arma en las piezas.',
        images: boards('topa', 9, 10, 11)
      },
      {
        title: 'Librillo',
        text: 'El armado del librillo, de la grilla en línea a las páginas con las letras de las canciones.',
        images: boards('topa', 13, 15)
      },
      {
        title: 'El mundo de Disney Junior',
        text: 'Escenarios y piezas de marca de Disney Junior.',
        images: boards('topa', 2, 3)
      }
    ]
  },
  {
    id: 'olga',
    title: 'OLGA',
    client: 'OLGA',
    category: 'identidad',
    categoryLabel: 'Merch · Lettering · Ilustración',
    subtitle: 'OLGA Store · Propuesta creativa',
    tagline: 'Merch para los programas de OLGA: un lettering y un universo gráfico para cada uno.',
    summary: 'Propuesta creativa para OLGA Store: lettering, personajes e ilustraciones para las líneas de Jijolines, Tapados de Laburo, Lauchas, Mi primo es así y Sería increíble, aplicados a remeras, buzos y la tienda online.',
    thumbnail: 'Olga_portada',
    coverImage: 'web_olga-28',
    imageSize: { width: 2200, height: 1350 },
    deliverables: ['Lettering', 'Personajes', 'Pixel art', 'Gráficas textiles', 'Tienda online'],
    sections: [
      {
        title: 'La tienda',
        text: 'La propuesta para la tienda online, la marca aplicada y los primeros bocetos.',
        images: boards('olga', 2, 3, 24, 8)
      },
      {
        title: 'Jijolines',
        text: 'Un lettering hecho a mano, del logo a la remera y el buzo.',
        images: boards('olga', 5, 6, 4)
      },
      {
        title: 'Tapados de Laburo',
        text: 'El ají como emblema y el elenco en pixel art, de la pantalla al bordado.',
        images: boards('olga', 7, 9, 10, 11, 12, 13)
      },
      {
        title: 'Lauchas',
        text: 'Lauchas Flacas y El Show de las Lauchas: escudo, tipografía y prendas.',
        images: boards('olga', 17, 20, 21, 15)
      },
      {
        title: 'Mi primo es así',
        text: 'Dos líneas para el programa: las lauchas de «Enhorabuena» y el lettering gótico de «Mi primo es un vampiro».',
        images: boards('olga', 14, 16, 22, 18, 19, 23)
      },
      {
        title: 'Sería increíble',
        text: 'Retratos del elenco en alto contraste, sobre bloques de color.',
        images: boards('olga', 25, 26, 27)
      }
    ]
  },
  {
    id: 'zpezia',
    title: 'Zpëzia',
    client: 'Zpëzia',
    category: 'identidad',
    categoryLabel: 'Identidad · Ilustración · Retail',
    subtitle: 'Accesorios',
    tagline: 'Una marca de accesorios que recorre las culturas del mundo, del logo al local.',
    summary: 'Identidad, ilustración y sistema gráfico para Zpëzia: el logo y el packaging, una familia de estampillas por país, la campaña de fotos, el catálogo y las piezas de temporada, el local y la tienda online.',
    thumbnail: 'zpezia',
    coverImage: 'web_zpezia-01',
    imageSize: { width: 2200, height: 1350 },
    deliverables: ['Logo', 'Ilustración', 'Packaging', 'Estampillas', 'Campaña', 'Catálogo', 'Retail'],
    sections: [
      {
        title: 'Identidad e ilustración',
        text: 'El logo, los animales dibujados a mano y la trama ilustrada que viste las bolsas, junto a la línea de accesorios en dibujo.',
        images: boards('zpezia', 3, 2, 4, 11)
      },
      {
        title: 'Un sello por país',
        text: 'Rusia, India, África, China, Argentina: cada región tiene sus estampillas y su afiche, y juntas arman el mapa de la marca.',
        images: boards('zpezia', 7, 8, 9, 10, 25, 12)
      },
      {
        title: 'Campaña',
        text: 'La sesión de fotos, el backstage y su aplicación en piezas y pantallas.',
        images: boards('zpezia', 13, 14, 16, 20)
      },
      {
        title: 'Catálogo y temporada',
        text: 'El catálogo, armado como un collage de papeles y objetos, y las piezas de cada temporada.',
        images: boards('zpezia', 5, 6, 22, 23, 24, 15)
      },
      {
        title: 'Local y tienda online',
        text: 'El universo de la marca en el local, en el producto y en la web.',
        images: boards('zpezia', 17, 19, 18, 21)
      }
    ]
  },
  {
    id: 'art-attack',
    title: 'Art Attack',
    client: 'Disney Channel Latam',
    category: 'ilustracion',
    categoryLabel: 'Ilustración · Escenografía · TV',
    tagline: 'Los objetos y escenarios de Art Attack para Disney Channel Latam, del dibujo en línea al set.',
    summary: 'Ilustración de los objetos que el equipo de 3D convirtió en escenarios —tijeras, lápices, cohetes, globos—, las gráficas del programa y los muñecos hechos a mano.',
    thumbnail: 'art_attack',
    coverImage: 'web_art_attack-13',
    imageSize: { width: 2200, height: 1350 },
    deliverables: ['Ilustración', 'Objetos para 3D', 'Escenografía', 'Gráficas', 'Muñecos'],
    sections: [
      {
        title: 'El programa',
        text: 'Manualidades paso a paso sobre fondos de colores planos.',
        images: boards('art_attack', 2, 1)
      },
      {
        title: 'Objetos',
        text: 'Cada objeto del set, dibujado en línea y despiezado para que el equipo de 3D lo modelara.',
        images: boards('art_attack', 3, 4)
      },
      {
        title: 'Del boceto al set',
        text: 'Los escenarios en línea y su versión final en 3D.',
        images: boards('art_attack', 5, 6, 7, 8)
      },
      {
        title: 'Gráficas y muñecos',
        text: 'Placas, nubes y piezas gráficas del programa, y un muñeco cosido a mano.',
        images: boards('art_attack', 9, 10, 12, 11)
      }
    ]
  },
  {
    id: 'tecnopolis',
    title: 'Tecnópolis',
    client: 'Tecnópolis',
    category: 'ilustracion',
    categoryLabel: 'Ilustración · Infografía · Afiche',
    subtitle: 'Apolo 11 · Hemisphærium Cœlestis',
    tagline: 'Un afiche infográfico sobre la llegada a la Luna, para exhibir en Tecnópolis.',
    summary: 'Investigación, ilustración y lettering para contar la misión Apolo 11 en una sola pieza: el logo de la misión, una familia de íconos y escenas, y un afiche circular que lo reúne todo.',
    thumbnail: 'tecnopolis',
    coverImage: 'web_tecnopolis-01',
    imageSize: { width: 2200, height: 1350 },
    deliverables: ['Investigación', 'Ilustración', 'Íconos', 'Lettering', 'Afiche infográfico'],
    sections: [
      {
        title: 'Investigación',
        text: 'Fotos de archivo, planos técnicos y documentos de la NASA como punto de partida.',
        images: boards('tecnopolis', 2, 5)
      },
      {
        title: 'Ilustración',
        text: 'Naves, astronautas y la Luna en dos tintas, azul y naranja, en una familia de íconos y escenas.',
        images: boards('tecnopolis', 3, 4, 7, 8)
      },
      {
        title: 'Lettering',
        text: 'El logo de Apolo 11 y el título ornamentado del afiche.',
        images: boards('tecnopolis', 6, 9)
      },
      {
        title: 'El afiche',
        text: 'Todas las piezas organizadas en círculos concéntricos, del detalle al afiche impreso y exhibido en el predio.',
        images: boards('tecnopolis', 10, 11, 12, 13, 14)
      }
    ]
  }
];

export const EBER_ART_SECTIONS = [
  { id: 'ilustracion', name: 'Ilustración' },
  { id: 'letras', name: 'Letras & Tipografía' },
  { id: 'docencia', name: 'Docencia & Talleres' }
];

// Eber Art cases share the shape of WORK_PROJECTS and open in the same detail view
export const EBER_ART_ITEMS = [
  {
    id: 'tipomov',
    title: 'Tipomov',
    client: 'FADU, UBA',
    category: 'docencia',
    categoryLabel: 'Identidad · Tipografía · Docencia',
    subtitle: 'Tipografía y movimiento',
    role: 'Docente e identidad visual',
    tagline: 'La identidad de Tipomov, la materia de tipografía y movimiento de la FADU, donde Eber es docente desde 2021.',
    summary: 'Tipomov es una materia optativa de la FADU (UBA) que estudia la tipografía y su animación como medio de comunicación y expresión. Además de dar clases, Eber se encarga de la identidad visual en redes: hizo el logo y todas las tipografías e ilustraciones.',
    thumbnail: 'tipomov',
    coverImage: 'web_tipomov-01',
    imageSize: { width: 2200, height: 1350 },
    deliverables: ['Logo', 'Tipografías', 'Ilustración', 'Redes', 'Afiches', 'Docencia'],
    sections: [
      {
        title: 'Identidad',
        text: 'El logo, su personaje y las piezas que lo aplican, del sticker al objeto impreso en 3D.',
        images: boards('tipomov', 3, 4, 12, 13)
      },
      {
        title: 'Redes y afiche',
        text: 'El feed de la cátedra, las piezas de cada cursada y el afiche «Universidad pública: futuro siempre».',
        images: boards('tipomov', 5, 6, 11)
      },
      {
        title: 'El taller',
        text: 'La cursada, el equipo docente y los trabajos y procesos de los alumnos.',
        images: boards('tipomov', 2, 7, 8, 9, 10)
      },
      {
        title: 'Exp!',
        text: 'La identidad de Exp!, una muestra sobre tipografía experimental y expresiva en el Complejo C Art Media.',
        images: boards('tipomov', 14, 15, 16)
      }
    ]
  },
  {
    id: 'eber-lettering',
    title: 'Eber Lettering',
    client: 'Eber Studio',
    category: 'letras',
    categoryLabel: 'Lettering · Ilustración · Producto',
    year: '2025',
    tagline: 'Letras de canciones dibujadas a mano que se vuelven stickers, remeras, buzos y totebags.',
    summary: 'Eber Studio es el estudio y la marca propia de Eber: diseño, tipografía e ilustración. Frases de Wos, Cerati, Los Piojos, el Indio Solari y Coldplay, cada una con su propio lettering, y una serie de personajes que conviven en una línea de productos que se vende en su tienda online.',
    thumbnail: 'portada_eber_art',
    coverImage: 'web_eber_lettering-01',
    imageSize: { width: 2200, height: 1350 },
    deliverables: ['Lettering', 'Ilustración', 'Stickers', 'Indumentaria', 'Totebags', 'Tienda online'],
    sections: [
      {
        title: 'Lettering',
        text: 'Cada frase con su propia letra: de la caligrafía de trazo fino a las formas pesadas y entrelazadas, en rojo, amarillo, azul y blanco.',
        images: boards('eber_lettering', 2, 3, 4, 5, 6, 7, 8, 21)
      },
      {
        title: 'Ilustración',
        text: 'Una serie de personajes para hablar de la rutina, la ansiedad, las redes y los mambos de todos los días.',
        images: boards('eber_lettering', 16, 17, 14)
      },
      {
        title: 'Remeras y buzos',
        text: 'Las letras y los personajes llevados a la indumentaria.',
        images: boards('eber_lettering', 11, 12, 13, 15)
      },
      {
        title: 'Totebags',
        text: 'Una línea de bolsas de tela con ilustraciones y frases propias.',
        images: boards('eber_lettering', 18, 19, 20, 22)
      },
      {
        title: 'Stickers y tienda',
        text: 'Las planchas de stickers y la tienda online de la marca, con envíos a todo el país.',
        images: boards('eber_lettering', 9, 10)
      }
    ]
  }
];

// Alias export for compatibility
export const PROJECTS = WORK_PROJECTS;
