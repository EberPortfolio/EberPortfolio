export const EBER_PROFILE = {
  name: 'Eber',
  title: 'Diseñador Gráfico, Ilustrador & Tipógrafo',
  tagline: 'Identidades visuales, conceptos y universos de marca con personalidad.',
  location: 'Buenos Aires & Remoto',
  availability: 'Abierto a roles creativos senior y nuevos proyectos',
  // TODO: reemplazar por el mail real de Eber
  email: 'eber.design@portfolio.com',
  // TODO: reemplazar por los perfiles reales de Eber (los que no tenga, borrarlos)
  social: [
    { name: 'Behance', url: 'https://behance.net' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' }
  ],
  stats: [
    { value: '10+', label: 'Años de experiencia' },
    { value: '3', label: 'Industrias: textil, entretenimiento e infantil' },
    { value: 'Docente', label: 'Universitario · tipografía y nuevos medios' }
  ],
  industries: ['Industria textil', 'Entretenimiento', 'Contenidos infantiles']
};

export const ABOUT = {
  photos: {
    portrait: {
      publicId: 'about_me',
      alt: 'Retrato en blanco y negro de Eber sosteniendo a su gato gris',
      width: 1122,
      height: 1402
    },
    outdoors: {
      publicId: 'about_me_2',
      alt: 'Eber dibujando sentado en un banco de madera, frente a un lago rodeado de bosque',
      width: 1037,
      height: 1517
    }
  },
  headline: 'Transformo ideas en conceptos visuales sólidos, coherentes y con personalidad.',
  lead: 'Soy diseñador gráfico, ilustrador y tipógrafo, con más de 10 años creando identidades visuales, conceptos y universos de marca. Trabajé en dirección de arte para la industria textil, el entretenimiento y los contenidos infantiles.',
  pillars: [
    {
      title: 'Marcas desde cero',
      text: 'Construyo identidades claras, reconocibles y adaptables, con sistemas visuales que funcionan en producto, retail, entornos digitales y comunicación.'
    },
    {
      title: 'Dirección y ejecución',
      text: 'Lidero equipos creativos, cuido la coherencia estética de las marcas y acompaño cada proyecto desde la idea inicial hasta su implementación.'
    },
    {
      title: 'Docencia universitaria',
      text: 'Enseño conceptualización, tipografía y nuevos medios: una práctica que integra el oficio con una mirada reflexiva sobre el diseño.'
    }
  ],
  lookingFor: 'Hoy busco nuevos desafíos en roles creativos senior, liderazgo de equipos y proyectos donde el diseño aporte valor estratégico al negocio.'
};

export const SERVICES = [
  {
    number: '01',
    title: 'Identidad Visual & Universos de Marca',
    description: 'Marcas desde cero: concepto, logotipo, sistema tipográfico y cromático, y el universo visual que las hace reconocibles en cualquier formato.',
    skills: ['Concepto de marca', 'Logotipo & Isotipo', 'Sistema visual', 'Manual de marca']
  },
  {
    number: '02',
    title: 'Dirección de Arte',
    description: 'Dirección creativa para la industria textil, el entretenimiento y los contenidos infantiles, liderando equipos y cuidando la coherencia estética de cada pieza.',
    skills: ['Liderazgo de equipos', 'Colecciones textiles', 'Key visuals', 'Supervisión estética']
  },
  {
    number: '03',
    title: 'Ilustración & Tipografía',
    description: 'Personajes, ilustración de autor, lettering y diseño tipográfico para dar a cada marca una voz visual propia.',
    skills: ['Ilustración', 'Personajes', 'Lettering', 'Diseño tipográfico']
  },
  {
    number: '04',
    title: 'Sistemas Aplicados',
    description: 'Del concepto a la implementación: aplicaciones en producto, retail, packaging, entornos digitales y comunicación.',
    skills: ['Producto & Retail', 'Packaging', 'Digital', 'Comunicación']
  }
];

export const PROCESS_STEPS = [
  { step: '01', title: 'Entender', desc: 'El negocio, el público y el problema real antes de dibujar la primera línea.' },
  { step: '02', title: 'Conceptualizar', desc: 'Una idea sólida que ordene todas las decisiones visuales posteriores.' },
  { step: '03', title: 'Construir', desc: 'El sistema: tipografía, color, ilustración y reglas que lo hacen coherente.' },
  { step: '04', title: 'Implementar', desc: 'Aplicaciones reales y acompañamiento hasta que la marca vive en el mundo.' }
];
