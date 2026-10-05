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
    thumbnail: 'web_47-01',
    thumbnailGravity: 'west', // the left panel of the board works as a standalone cover
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
    thumbnail: 'web_owoko-04',
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
    thumbnail: 'web_violetta-03',
    thumbnailGravity: 'west',
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
    thumbnail: 'web_topa-07',
    coverImage: 'web_topa-04',
    imageSize: { width: 2200, height: 1350 },
    deliverables: ['Logo y lettering', 'Packaging', 'Librillo', 'Personajes', 'Objetos 3D'],
    sections: [
      {
        title: 'El disco',
        text: 'Tapa, contratapa con la lista de temas y el disco.',
        images: boards('topa', 6, 5, 17)
      },
      {
        title: 'Logo y lettering',
        text: 'El nombre de Topa en letras infladas, y las variantes tipográficas que se exploraron en el camino.',
        images: boards('topa', 7, 16)
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
  }
];

export const EBER_ART_SECTIONS = [
  { id: 'ilustracion', name: 'Ilustración' },
  { id: 'letras', name: 'Letras & Tipografía' },
  { id: 'docencia', name: 'Docencia & Talleres' }
];

export const EBER_ART_ITEMS = [
  {
    id: 'art-ilustration-1',
    category: 'ilustracion',
    categoryLabel: 'Ilustración de Autor',
    title: 'Retratos Geométricos & Formas Orgánicas',
    year: '2026',
    description: 'Serie personal de exploración vectorial sobre abstracción geométrica y la figura humana.',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ilustración Vectorial', 'Afiches de Autor', 'Edición Limitada']
  },
  {
    id: 'art-ilustration-2',
    category: 'ilustracion',
    categoryLabel: 'Poster Art',
    title: 'Synapse Poster Series',
    year: '2025',
    description: 'Cartelería límpida en serigrafía para eventos culturales independientes.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    tags: ['Serigrafía', 'Cartelería', 'Arte Sonoro']
  },
  {
    id: 'art-letras-1',
    category: 'letras',
    categoryLabel: 'Lettering & Tipografía',
    title: 'Caligrafía Expresiva & Custom Types',
    year: '2026',
    description: 'Estudios de dibujo de letras, fuentes de autor y composiciones caligráficas a tinta sobre papel de algodón.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Lettering', 'Diseño de Tipografía', 'Tinta China']
  },
  {
    id: 'art-letras-2',
    category: 'letras',
    categoryLabel: 'Custom Font Development',
    title: 'Eber Neue Specimen',
    year: '2025',
    description: 'Desarrollo de familia tipográfica propia monoespaciada para sistemas de identidad gráfica.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Glyphs Software', 'Tipo Mono', 'Especímen Tipográfico']
  },
  {
    id: 'art-docencia-1',
    category: 'docencia',
    categoryLabel: 'Docencia & Workshops',
    title: 'Workshop: Diseño de Sistemas de Identidad Visual',
    year: '2026',
    description: 'Talleres intensivos sobre grilla suiza, jerarquía tipográfica y construcción de marcas dirigidos a diseñadores.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    tags: ['Workshops', 'Clases de Tipografía', 'Mentoría de Diseño']
  },
  {
    id: 'art-docencia-2',
    category: 'docencia',
    categoryLabel: 'Conferencias & Charlas',
    title: 'Charla: El Valor del Packaging Táctil en la Era Digital',
    year: '2025',
    description: 'Presentación en encuentros de diseño sobre la selección de materiales, papeles y acabados de autor.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    tags: ['Conferencias', 'Diseño Sustentable', 'Dirección Creativa']
  }
];

// Alias export for compatibility
export const PROJECTS = WORK_PROJECTS;
