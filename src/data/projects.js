export const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'universos', name: 'Universos de marca' },
  { id: 'identidad', name: 'Identidad visual' },
  { id: 'ilustracion', name: 'Ilustración' },
  { id: 'packaging', name: 'Packaging & producto' }
];

// Images are Cloudinary public IDs (see src/lib/cloudinary.js).
// Optional fields (year, location, role, colorPalette, typography) render only when present.
const slides = (...numbers) => numbers.map((n) => `web_47-${String(n).padStart(2, '0')}`);

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
