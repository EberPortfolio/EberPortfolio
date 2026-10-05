// Pending content from Eber is left empty on purpose: every block that depends
// on it (last name, CV, LinkedIn, experience) stays hidden until it is filled in.
export const EBER_PROFILE = {
  name: 'Eber',
  lastName: '', // TODO: apellido de Eber
  role: 'Diseñador gráfico, ilustrador y tipógrafo',
  location: 'Buenos Aires', // TODO: confirmar
  email: 'eber.crio@gmail.com',
  // Shown as typed; the WhatsApp link uses the digits only
  phone: '+54 9 11 3012-1986',
  cvUrl: '', // TODO: link al CV en PDF (por ejemplo, subido a Cloudinary)
  social: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ebersantonocito/' },
    { name: 'Behance', url: 'https://www.behance.net/crio' },
    { name: 'Instagram', url: 'https://www.instagram.com/eber.arg/' }
  ],
  industries: ['Industria textil', 'Entretenimiento', 'Contenidos infantiles']
};

export const whatsappUrl = EBER_PROFILE.phone
  ? `https://wa.me/${EBER_PROFILE.phone.replace(/\D/g, '')}`
  : '';

export const fullName = [EBER_PROFILE.name, EBER_PROFILE.lastName].filter(Boolean).join(' ');

// Trayectoria: { period: '2019 — 2024', role: 'Director de arte', company: 'Empresa' }
export const EXPERIENCE = [];

// Docencia: { period: '2020 — Hoy', role: 'Docente de Tipografía', institution: 'Universidad' }
export const TEACHING = [];

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
  headline: 'Me interesa transformar ideas en conceptos visuales sólidos, coherentes y con personalidad.',
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
      text: 'Como docente universitario profundicé en la conceptualización, la tipografía y los nuevos medios, integrando la práctica profesional con una mirada reflexiva sobre el diseño.'
    }
  ],
  lookingFor: 'Hoy busco nuevos desafíos en roles creativos senior, liderazgo de equipos y proyectos donde el diseño aporte valor estratégico al negocio.'
};

