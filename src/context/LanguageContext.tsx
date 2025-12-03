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
    catalog: string;
    specifications: string;
    downloads: string;
    gallery: string;
    pro: string;
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
      catalog: 'Catalog',
      specifications: 'Specifications',
      downloads: 'Downloads',
      gallery: 'Gallery',
      pro: 'Pro',
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
      catalog: 'Catálogo',
      specifications: 'Especificaciones',
      downloads: 'Descargas',
      gallery: 'Galería',
      pro: 'Pro',
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
