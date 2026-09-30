export const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'branding', name: 'Identidad & Marca' },
  { id: 'packaging', name: 'Packaging' },
  { id: 'editorial', name: 'Editorial & Print' },
  { id: 'digital', name: 'Web & UI/UX' }
];

export const WORK_PROJECTS = [
  {
    id: 'kanso-coffee',
    title: 'Kanso Coffee Roasters',
    category: 'packaging',
    categoryLabel: 'Packaging & Brand Identity',
    year: '2026',
    client: 'Kanso Coffee Co.',
    location: 'Buenos Aires, Argentina',
    tagline: 'Empaque minimalista inspirado en el diseño artesanal de tostado especial.',
    summary: 'Diseño de identidad visual completa y línea de empaques sostenibles para tostaduría de café de especialidad. Enfocado en materiales táctiles, serigrafía monocromática y código visual por origen del grano.',
    thumbnail: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&w=1200&q=80'
    ],
    accentColor: '#C4A484',
    colorPalette: ['#1A1A1A', '#F5F2EC', '#C4A484', '#8B5A2B'],
    typography: { primary: 'Neue Haas Grotesk', secondary: 'Editorial New' },
    deliverables: ['Identidad Visual', 'Packaging x6', 'Guía de Estilo'],
    featured: true
  },
  {
    id: 'aura-skincare',
    title: 'Aura Botanicals',
    category: 'branding',
    categoryLabel: 'Identidad de Marca',
    year: '2025',
    client: 'Aura Cosmetics',
    location: 'Santiago, Chile',
    tagline: 'Cosmética orgánica consciente con estética límpida y atemporal.',
    summary: 'Branding integral para marca premium de cuidado de la piel. Construido a partir de formas orgánicas puras, tipografía refinada y tonos minerales.',
    thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80'
    ],
    accentColor: '#A8BBA2',
    colorPalette: ['#232A26', '#EBEAE6', '#A8BBA2', '#D8C9B9'],
    typography: { primary: 'Helvética Neue', secondary: 'Playfair Display' },
    deliverables: ['Logotipo', 'Manual de Marca', 'Envases Primarios'],
    featured: true
  },
  {
    id: 'monolith-architecture',
    title: 'Monolith Studio',
    category: 'digital',
    categoryLabel: 'Web Design & Editorial',
    year: '2025',
    client: 'Monolith Arq',
    location: 'Montevideo, Uruguay',
    tagline: 'Plataforma digital interactiva para estudio de arquitectura brutalista.',
    summary: 'Presencia digital y libro de proyectos anual. La grilla estructurada permite que las fotos de arquitectura estructural resalten con la máxima fuerza visual.',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    accentColor: '#3A3D40',
    colorPalette: ['#121212', '#F9F9F9', '#3A3D40'],
    typography: { primary: 'Space Grotesk', secondary: 'Space Mono' },
    deliverables: ['UI/UX Design', 'Sitio Web Responsive', 'Catálogo Editorial'],
    featured: true
  },
  {
    id: 'lumen-journal',
    title: 'Lumen Magazine',
    category: 'editorial',
    categoryLabel: 'Diseño Editorial',
    year: '2025',
    client: 'Lumen Press',
    location: 'Madrid, España',
    tagline: 'Publicación bimestral independiente de arte contemporáneo y ensayo.',
    summary: 'Dirección de arte y diseño de layout para revista impresa de distribución europea. Encuadernación a la vista y composición tipográfica experimental.',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80'
    ],
    accentColor: '#E65100',
    colorPalette: ['#1A1715', '#FAF8F5', '#E65100'],
    typography: { primary: 'Baskerville', secondary: 'Neue Montreal' },
    deliverables: ['Grilla Editorial', 'Infografías', 'Preprensa'],
    featured: false
  },
  {
    id: 'terra-spirits',
    title: 'Terra Small Batch Gin',
    category: 'packaging',
    categoryLabel: 'Packaging Premium',
    year: '2024',
    client: 'Terra Distillery',
    location: 'Mendoza, Argentina',
    tagline: 'Destilado artesanal envuelto en botánica autóctona y bajorrelieve dorado.',
    summary: 'Diseño de botella de edición limitada impreso sobre papel de algodón texturado con bajorrelieve grabado en hot-stamping cobre.',
    thumbnail: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80'
    ],
    accentColor: '#27AE60',
    colorPalette: ['#1C2833', '#F4F6F6', '#27AE60'],
    typography: { primary: 'Bodoni Poster', secondary: 'Agrandir' },
    deliverables: ['Diseño de Etiqueta', 'Caja de Presentación', 'Acabados Especiales'],
    featured: true
  },
  {
    id: 'vanguard-studio',
    title: 'Vanguard Audio Lab',
    category: 'branding',
    categoryLabel: 'Identidad de Marca',
    year: '2024',
    client: 'Vanguard Audio',
    location: 'Berlín, Alemania',
    tagline: 'Identidad sonora y visual para laboratorio de ingeniería en sintetizadores.',
    summary: 'Construcción de logotipo generativo y piezas promocionales basadas en oscilaciones electromagnéticas y retícula modular pura.',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80',
    images: ['https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80'],
    accentColor: '#6C5CE7',
    colorPalette: ['#0B0C10', '#6C5CE7', '#F8F9FA'],
    typography: { primary: 'Syne Bold', secondary: 'Inter' },
    deliverables: ['Identidad Visual', 'System UI', 'Manual de Marca'],
    featured: false
  },
  {
    id: 'nordic-design',
    title: 'Nórdico Furniture',
    category: 'packaging',
    categoryLabel: 'Branding & Packaging',
    year: '2024',
    client: 'Nórdico Co.',
    location: 'Copenhague, Dinamarca',
    tagline: 'Mapeo de empaques planos de ensamblaje para mobiliario minimalista.',
    summary: 'Dirección de arte y embalajes sostenibles con diagramas de instrucciones iconográficos sin texto aplicados directamente a cartón reciclado.',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'],
    accentColor: '#D4AC0D',
    colorPalette: ['#2C3E50', '#ECF0F1', '#D4AC0D'],
    typography: { primary: 'Helvetica Now', secondary: 'Futura' },
    deliverables: ['Diseño de Packaging', 'Iconografía Instructiva'],
    featured: false
  },
  {
    id: 'solaris-energy',
    title: 'Solaris Systems',
    category: 'digital',
    categoryLabel: 'Web UI & Identity',
    year: '2024',
    client: 'Solaris Tech',
    location: 'San Francisco, EEUU',
    tagline: 'Rediseño de plataforma de energía solar limpia e informes ejecutivos.',
    summary: 'Sistema visual para startup de tecnología solar. Interfaz limpia con visualización de datos cuantitativos y manual corporativo.',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'],
    accentColor: '#F39C12',
    colorPalette: ['#1B2631', '#F39C12', '#F4F6F6'],
    typography: { primary: 'Inter', secondary: 'Roboto Mono' },
    deliverables: ['UI/UX Design', 'Brand Identity', 'Icon Set'],
    featured: false
  },
  {
    id: 'alma-wine',
    title: 'Alma de los Andes',
    category: 'packaging',
    categoryLabel: 'Packaging de Colección',
    year: '2024',
    client: 'Bodega Alma',
    location: 'Salta, Argentina',
    tagline: 'Vinos de extrema altura con estampados botánicos dorados.',
    summary: 'Serie de 3 etiquetas para vinos de alta gama en relieve con tipografía caligráfica intervenida a mano por Eber.',
    thumbnail: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80',
    images: ['https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'],
    accentColor: '#8E44AD',
    colorPalette: ['#1A002C', '#8E44AD', '#F5EEF8'],
    typography: { primary: 'Baskerville Pro', secondary: 'Calligraphy Hand' },
    deliverables: ['Diseño de Etiqueta', 'Estuche de Madera'],
    featured: false
  },
  {
    id: 'pulsar-media',
    title: 'Pulsar Culture Press',
    category: 'editorial',
    categoryLabel: 'Diseño Editorial & Afiches',
    year: '2024',
    client: 'Pulsar Press',
    location: 'Buenos Aires, Argentina',
    tagline: 'Monografía impresa sobre arquitectura de tipografía latinoamericana.',
    summary: 'Edición limitada de 500 ejemplares numerados con tapa dura en tela impreso a dos tintas en serigrafía tradicional.',
    thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80',
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80'],
    accentColor: '#C0392B',
    colorPalette: ['#111111', '#C0392B', '#F9F9F9'],
    typography: { primary: 'Futura Bold', secondary: 'Garamond' },
    deliverables: ['Maquetación 180 págs', 'Impresión Serigráfica', 'Preprensa'],
    featured: false
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
