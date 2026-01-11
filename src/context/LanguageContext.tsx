import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface Translations {
  chat: {
    greeting: string;
    placeholder: string;
    autoReply: string;
    title: string;
    subtitle: string;
  };
  nav: {
    portfolio: string;
    process: string;
    about: string;
    aboutUs: string;
    catalog: string;
    specifications: string;
    downloads: string;
    gallery: string;
    pro: string;
    contact: string;
    contacts: string;
    interiorDecor: string;
    facadeDecor: string;
    services: string;
    showroom: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtitleGallery: string;
    subtitlePro: string;
    viewPortfolio: string;
    watchProcess: string;
    browseCatalog: string;
    downloadCad: string;
    scroll: string;
  };
  stats: {
    projects: string;
    years: string;
    guarantee: string;
    satisfaction: string;
  };
  featured: {
    eyebrowGallery: string;
    eyebrowPro: string;
    titleGallery: string;
    titlePro: string;
    descGallery: string;
    descPro: string;
    viewAll: string;
  };
  videos: {
    eyebrowGallery: string;
    eyebrowPro: string;
    titleGallery: string;
    titlePro: string;
    descGallery: string;
    descPro: string;
    video1Title: string;
    video1Desc: string;
    video2Title: string;
    video2Desc: string;
    video3Title: string;
    video3Desc: string;
  };
  beforeAfter: {
    eyebrowGallery: string;
    eyebrowPro: string;
    titleGallery: string;
    titlePro: string;
    descGallery: string;
    descPro: string;
    before: string;
    after: string;
    project: string;
    architect: string;
    specs: string;
    area: string;
    installation: string;
    components: string;
    requestDocs: string;
    needCad: string;
  };
  about: {
    eyebrow: string;
    title1: string;
    title2: string;
    desc1: string;
    desc2: string;
    cta: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
  };
  process: {
    eyebrow: string;
    titleGallery: string;
    titlePro: string;
    desc: string;
    step1: string;
    step1Desc: string;
    step2: string;
    step2Desc: string;
    step3: string;
    step3Desc: string;
    step4: string;
    step4Desc: string;
    step5: string;
    step5Desc: string;
    step6: string;
    step6Desc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaButton: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    contactTitle: string;
    location: string;
    rights: string;
    privacy: string;
    terms: string;
    company: string;
    estimate: string;
    documentation: string;
  };
  sampleKit: {
    title: string;
    subtitle: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    firmLabel: string;
    firmPlaceholder: string;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
    addressPlaceholder: string;
    submitButton: string;
    freeShipping: string;
    successTitle: string;
    successMessage: string;
    buttonText: string;
  };
  lookbook: {
    badge: string;
    title: string;
    description: string;
    placeholder: string;
    button: string;
    privacy: string;
    successTitle: string;
    successMessage: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    chat: {
      greeting: 'Hello! How can I help you? I will tell you about our gypsum products and help you choose.',
      placeholder: 'Enter your message...',
      autoReply: 'Thank you for your question! Our manager will contact you soon. Or call us: +1 754-300-1010',
      title: 'LuxGyps',
      subtitle: 'Online consultant',
    },
    nav: {
      portfolio: 'Portfolio',
      process: 'Process',
      about: 'About',
      aboutUs: 'About Us',
      catalog: 'Catalog',
      specifications: 'Specifications',
      downloads: 'Downloads',
      gallery: 'Gallery',
      pro: 'Pro',
      contact: 'Contact',
      contacts: 'Contacts',
      interiorDecor: 'Interior Decor',
      facadeDecor: 'Facade Decor',
      services: 'Services',
      showroom: 'Showroom',
    },
    hero: {
      eyebrow: 'Miami Artisan Studio',
      title1: 'Gypsum &',
      title2: 'Concrete Art',
      subtitleGallery: 'Handcrafted elegance. Custom-designed sculptural reliefs that transform spaces into extraordinary experiences.',
      subtitlePro: 'Professional-grade architectural elements. CAD-ready specifications for designers and architects.',
      viewPortfolio: 'View Portfolio',
      watchProcess: 'Watch Process',
      browseCatalog: 'Browse Catalog',
      downloadCad: 'Download CAD Files',
      scroll: 'Scroll',
    },
    stats: {
      projects: 'Projects Completed',
      years: 'Years of Excellence',
      guarantee: 'Installation Guarantee',
      satisfaction: 'Client Satisfaction',
    },
    featured: {
      eyebrowGallery: 'Featured Works',
      eyebrowPro: 'Recent Projects',
      titleGallery: 'Sculptural',
      titlePro: 'Project',
      descGallery: 'Each piece is a unique collaboration between artisan craftsmanship and architectural vision. We produce, we install, we guarantee—for 5 years.',
      descPro: 'Browse our completed installations with full technical specifications and CAD files available for your next project.',
      viewAll: 'View Complete Portfolio',
    },
    videos: {
      eyebrowGallery: 'Behind the Scenes',
      eyebrowPro: 'Process Videos',
      titleGallery: 'Artistry in',
      titlePro: 'Technical',
      descGallery: 'Experience the mesmerizing journey of creation. From raw material to sculptural masterpiece, witness the hands that shape luxury.',
      descPro: 'Detailed documentation of our manufacturing process, techniques, and quality control procedures.',
      video1Title: 'The Art of Sculpting',
      video1Desc: 'Watch our master artisans shape raw gypsum into timeless art',
      video2Title: 'Precision Craftsmanship',
      video2Desc: 'Every detail matters in creating architectural masterpieces',
      video3Title: 'From Vision to Reality',
      video3Desc: 'The journey of transforming concepts into sculptural excellence',
    },
    beforeAfter: {
      eyebrowGallery: 'Transformations',
      eyebrowPro: 'Case Studies',
      titleGallery: 'Before &',
      titlePro: 'Project',
      descGallery: 'Witness the dramatic impact of our sculptural installations. Drag the slider to reveal the transformation.',
      descPro: 'Complete project documentation with specifications, timelines, and installation details for your reference.',
      before: 'Before',
      after: 'After',
      project: 'Project',
      architect: 'Architect',
      specs: 'Project Specifications',
      area: 'Coverage Area',
      installation: 'Installation',
      components: 'Components',
      requestDocs: 'Request Project Documentation →',
      needCad: 'Need CAD files or detailed specifications for this project?',
    },
    about: {
      eyebrow: 'About LuxGyps',
      title1: 'Not a Store.',
      title2: 'An Atelier.',
      desc1: 'We are not a "supermarket of stucco." LuxGyps is an artisan studio where every sculptural element is conceived, designed, and handcrafted specifically for your space. This is bespoke craftsmanship at its finest.',
      desc2: 'Based in Miami\'s Design District, we serve discerning clients throughout South Florida—from Star Island mansions to Coral Gables historic restorations, from Brickell penthouses to Palm Beach estates.',
      cta: 'Schedule a Studio Visit',
      feature1Title: 'Artisan Crafted',
      feature1Desc: 'Every piece hand-finished by master sculptors with decades of experience.',
      feature2Title: '5-Year Guarantee',
      feature2Desc: 'Full structural warranty on all installations. We stand behind our work.',
      feature3Title: 'Miami\'s Premier',
      feature3Desc: 'Trusted by top designers, architects, and luxury homeowners since 2009.',
      feature4Title: 'Turnkey Solutions',
      feature4Desc: 'From concept to installation. We handle design, production, and fitting.',
    },
    process: {
      eyebrow: 'Our Craft',
      titleGallery: 'The',
      titlePro: 'Technical',
      desc: 'From initial concept to final installation, every step is executed with precision and passion. This is not mass production—this is bespoke artistry.',
      step1: 'Concept',
      step1Desc: 'We begin with your vision, translating ideas into sculptural possibilities.',
      step2: 'Design',
      step2Desc: 'Detailed sketches and 3D modeling bring the concept to life digitally.',
      step3: 'Mold Creation',
      step3Desc: 'CNC precision combined with hand-sculpting creates the master form.',
      step4: 'Casting',
      step4Desc: 'Expert artisans pour and cure premium gypsum compositions.',
      step5: 'Finishing',
      step5Desc: 'Hand-applied finishes from matte white to brushed gold.',
      step6: 'Installation',
      step6Desc: 'Professional installation with 5-year structural guarantee.',
      ctaTitle: 'Ready to Transform Your Space?',
      ctaDesc: 'Book a consultation and receive a custom proposal within 48 hours.',
      ctaButton: 'Book Consultation',
    },
    footer: {
      desc: 'Miami\'s premier artisan studio for custom gypsum and concrete interiors. We produce, we install, we guarantee - transforming spaces into sculptural experiences since 2000.',
      quickLinks: 'Quick Links',
      contactTitle: 'Contact',
      location: 'Miami Design District',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      company: 'Company',
      estimate: 'Request Estimate',
      documentation: 'Documentation',
    },
    sampleKit: {
      title: 'Miami Sample Box',
      subtitle: 'For Design Professionals',
      description: 'Request a curated box of our finest gypsum textures and finishes. Experience the quality firsthand before specifying for your project.',
      nameLabel: 'Your Name',
      namePlaceholder: 'John Smith',
      firmLabel: 'Firm Name',
      firmPlaceholder: 'Architecture Studio',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      addressLabel: 'Shipping Address',
      addressPlaceholder: '123 Design District, Miami, FL 33137',
      submitButton: 'Request Sample Box',
      freeShipping: 'Free shipping to all US addresses. Ships within 3-5 business days.',
      successTitle: 'Request Received!',
      successMessage: 'Your sample box will ship within 3-5 business days.',
      buttonText: 'Order Sample Box',
    },
    lookbook: {
      badge: 'Free Download',
      title: 'Miami Gypsum Trends 2025',
      description: 'Discover the hottest interior design trends featuring sculptural gypsum elements in Miami\'s most prestigious homes.',
      placeholder: 'Enter your email',
      button: 'Download Lookbook',
      privacy: 'We respect your privacy. Unsubscribe anytime.',
      successTitle: 'Check Your Inbox!',
      successMessage: 'Your lookbook is on its way.',
    },
  },
  es: {
    chat: {
      greeting: '¡Hola! ¿Cómo puedo ayudarte? Te contaré sobre nuestros productos de yeso y te ayudaré a elegir.',
      placeholder: 'Escribe tu mensaje...',
      autoReply: '¡Gracias por tu pregunta! Nuestro gerente se pondrá en contacto contigo pronto. O llámanos: +1 754-300-1010',
      title: 'LuxGyps',
      subtitle: 'Consultor en línea',
    },
    nav: {
      portfolio: 'Portafolio',
      process: 'Proceso',
      about: 'Nosotros',
      aboutUs: 'Sobre Nosotros',
      catalog: 'Catálogo',
      specifications: 'Especificaciones',
      downloads: 'Descargas',
      gallery: 'Galería',
      pro: 'Pro',
      contact: 'Contacto',
      contacts: 'Contactos',
      interiorDecor: 'Decoración Interior',
      facadeDecor: 'Decoración Fachada',
      services: 'Servicios',
      showroom: 'Showroom',
    },
    hero: {
      eyebrow: 'Estudio Artesanal Miami',
      title1: 'Yeso y',
      title2: 'Arte en Concreto',
      subtitleGallery: 'Elegancia artesanal. Relieves escultóricos diseñados a medida que transforman espacios en experiencias extraordinarias.',
      subtitlePro: 'Elementos arquitectónicos de grado profesional. Especificaciones listas para CAD para diseñadores y arquitectos.',
      viewPortfolio: 'Ver Portafolio',
      watchProcess: 'Ver Proceso',
      browseCatalog: 'Ver Catálogo',
      downloadCad: 'Descargar Archivos CAD',
      scroll: 'Deslizar',
    },
    stats: {
      projects: 'Proyectos Completados',
      years: 'Años de Excelencia',
      guarantee: 'Garantía de Instalación',
      satisfaction: 'Satisfacción del Cliente',
    },
    featured: {
      eyebrowGallery: 'Obras Destacadas',
      eyebrowPro: 'Proyectos Recientes',
      titleGallery: 'Obras Maestras',
      titlePro: 'Portafolio de',
      descGallery: 'Cada pieza es una colaboración única entre artesanía y visión arquitectónica. Producimos, instalamos, garantizamos—por 5 años.',
      descPro: 'Explore nuestras instalaciones completadas con especificaciones técnicas completas y archivos CAD disponibles para su próximo proyecto.',
      viewAll: 'Ver Portafolio Completo',
    },
    videos: {
      eyebrowGallery: 'Detrás de Escenas',
      eyebrowPro: 'Videos del Proceso',
      titleGallery: 'Arte en',
      titlePro: 'Proceso',
      descGallery: 'Experimente el fascinante viaje de la creación. Desde la materia prima hasta la obra maestra escultórica, sea testigo de las manos que dan forma al lujo.',
      descPro: 'Documentación detallada de nuestro proceso de fabricación, técnicas y procedimientos de control de calidad.',
      video1Title: 'El Arte de Esculpir',
      video1Desc: 'Observe cómo nuestros artesanos maestros dan forma al yeso crudo en arte atemporal',
      video2Title: 'Artesanía de Precisión',
      video2Desc: 'Cada detalle importa al crear obras maestras arquitectónicas',
      video3Title: 'De la Visión a la Realidad',
      video3Desc: 'El viaje de transformar conceptos en excelencia escultórica',
    },
    beforeAfter: {
      eyebrowGallery: 'Transformaciones',
      eyebrowPro: 'Casos de Estudio',
      titleGallery: 'Antes y',
      titlePro: 'Documentación de',
      descGallery: 'Sea testigo del impacto dramático de nuestras instalaciones escultóricas. Arrastre el control deslizante para revelar la transformación.',
      descPro: 'Documentación completa del proyecto con especificaciones, cronogramas y detalles de instalación para su referencia.',
      before: 'Antes',
      after: 'Después',
      project: 'Proyecto',
      architect: 'Arquitecto',
      specs: 'Especificaciones del Proyecto',
      area: 'Área de Cobertura',
      installation: 'Instalación',
      components: 'Componentes',
      requestDocs: 'Solicitar Documentación del Proyecto →',
      needCad: '¿Necesita archivos CAD o especificaciones detalladas para este proyecto?',
    },
    about: {
      eyebrow: 'Sobre LuxGyps',
      title1: 'No es una Tienda.',
      title2: 'Es un Atelier.',
      desc1: 'No somos un "supermercado de estuco". LuxGyps es un estudio artesanal donde cada elemento escultórico es concebido, diseñado y elaborado a mano específicamente para su espacio. Esta es artesanía a medida en su máxima expresión.',
      desc2: 'Con sede en el Distrito de Diseño de Miami, servimos a clientes exigentes en todo el sur de Florida—desde mansiones en Star Island hasta restauraciones históricas en Coral Gables, desde penthouses en Brickell hasta propiedades en Palm Beach.',
      cta: 'Agendar Visita al Estudio',
      feature1Title: 'Artesanía Manual',
      feature1Desc: 'Cada pieza terminada a mano por escultores maestros con décadas de experiencia.',
      feature2Title: 'Garantía de 5 Años',
      feature2Desc: 'Garantía estructural completa en todas las instalaciones. Respaldamos nuestro trabajo.',
      feature3Title: 'Premier en Miami',
      feature3Desc: 'Confianza de los mejores diseñadores, arquitectos y propietarios de lujo desde 2009.',
      feature4Title: 'Soluciones Llave en Mano',
      feature4Desc: 'Desde el concepto hasta la instalación. Manejamos diseño, producción y montaje.',
    },
    process: {
      eyebrow: 'Nuestro Oficio',
      titleGallery: 'El Proceso',
      titlePro: 'Flujo de Trabajo',
      desc: 'Desde el concepto inicial hasta la instalación final, cada paso se ejecuta con precisión y pasión. Esto no es producción en masa—esto es arte a medida.',
      step1: 'Concepto',
      step1Desc: 'Comenzamos con su visión, traduciendo ideas en posibilidades escultóricas.',
      step2: 'Diseño',
      step2Desc: 'Bocetos detallados y modelado 3D dan vida al concepto digitalmente.',
      step3: 'Creación de Molde',
      step3Desc: 'Precisión CNC combinada con escultura manual crea la forma maestra.',
      step4: 'Fundición',
      step4Desc: 'Artesanos expertos vierten y curan composiciones de yeso premium.',
      step5: 'Acabado',
      step5Desc: 'Acabados aplicados a mano desde blanco mate hasta oro cepillado.',
      step6: 'Instalación',
      step6Desc: 'Instalación profesional con garantía estructural de 5 años.',
      ctaTitle: '¿Listo para Transformar su Espacio?',
      ctaDesc: 'Reserve una consulta y reciba una propuesta personalizada en 48 horas.',
      ctaButton: 'Reservar Consulta',
    },
    footer: {
      desc: 'El estudio artesanal premier de Miami para interiores personalizados de yeso y concreto. Producimos, instalamos, garantizamos - transformando espacios en experiencias escultóricas desde 2000.',
      quickLinks: 'Enlaces Rápidos',
      contactTitle: 'Contacto',
      location: 'Distrito de Diseño de Miami',
      rights: 'Todos los derechos reservados.',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      company: 'Empresa',
      estimate: 'Solicitar Presupuesto',
      documentation: 'Documentación',
    },
    sampleKit: {
      title: 'Caja de Muestras Miami',
      subtitle: 'Para Profesionales del Diseño',
      description: 'Solicite una caja curada con nuestras mejores texturas y acabados de yeso. Experimente la calidad de primera mano antes de especificar para su proyecto.',
      nameLabel: 'Su Nombre',
      namePlaceholder: 'Juan García',
      firmLabel: 'Nombre de la Firma',
      firmPlaceholder: 'Estudio de Arquitectura',
      emailLabel: 'Correo Electrónico',
      phoneLabel: 'Teléfono',
      addressLabel: 'Dirección de Envío',
      addressPlaceholder: '123 Design District, Miami, FL 33137',
      submitButton: 'Solicitar Caja de Muestras',
      freeShipping: 'Envío gratis a todas las direcciones de EE.UU. Envío en 3-5 días hábiles.',
      successTitle: '¡Solicitud Recibida!',
      successMessage: 'Su caja de muestras se enviará en 3-5 días hábiles.',
      buttonText: 'Ordenar Caja de Muestras',
    },
    lookbook: {
      badge: 'Descarga Gratis',
      title: 'Tendencias de Yeso Miami 2025',
      description: 'Descubra las tendencias de diseño interior más populares con elementos de yeso escultórico en las casas más prestigiosas de Miami.',
      placeholder: 'Ingrese su correo',
      button: 'Descargar Lookbook',
      privacy: 'Respetamos su privacidad. Puede cancelar en cualquier momento.',
      successTitle: '¡Revise su Bandeja!',
      successMessage: 'Su lookbook está en camino.',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t: translations[language],
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
