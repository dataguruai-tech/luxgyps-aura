import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/luxgyps-logo.svg';

const UnderConstruction = () => {
  const { language, setLanguage } = useLanguage();

  const content = {
    en: {
      subtitle: 'Website Under Development',
      message: 'Crafting Excellence in Miami. Coming Soon.',
      tagline: 'Premium Architectural Elements & Sculptural Art'
    },
    es: {
      subtitle: 'Sitio Web en Desarrollo',
      message: 'Creando Excelencia en Miami. Próximamente.',
      tagline: 'Elementos Arquitectónicos Premium y Arte Escultural'
    }
  };

  const t = content[language] || content.en;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
    >
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Center Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        {/* Corner Accents */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-l border-t border-primary" />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-r border-t border-primary" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-l border-b border-primary" />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r border-b border-primary" />

        {/* Main Card */}
        <div className="relative border border-primary/40 bg-card/80 backdrop-blur-md p-8 md:p-12 lg:p-16 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <img 
              src={logo} 
              alt="LuxGyps" 
              className="h-12 md:h-16 mx-auto"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary tracking-[0.15em] uppercase mb-2"
          >
            LUXGYPS
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-serif text-sm md:text-base text-foreground/60 tracking-[0.2em] uppercase mb-8"
          >
            Miami Artisan Studio
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-foreground/80 text-base md:text-lg font-light tracking-wide mb-4"
          >
            {t.subtitle}
          </motion.p>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="font-serif text-lg md:text-xl text-foreground/90 italic mb-6"
          >
            {t.message}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-foreground/50 text-xs md:text-sm tracking-[0.1em] uppercase mb-10"
          >
            {t.tagline}
          </motion.p>

          {/* Language Selector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={() => setLanguage('en')}
              className={`relative text-sm tracking-[0.15em] uppercase transition-colors duration-300 pb-1 ${
                language === 'en' 
                  ? 'text-primary' 
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
            >
              EN
              {language === 'en' && (
                <motion.div
                  layoutId="lang-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                />
              )}
            </button>
            
            <span className="text-foreground/20">|</span>
            
            <button
              onClick={() => setLanguage('es')}
              className={`relative text-sm tracking-[0.15em] uppercase transition-colors duration-300 pb-1 ${
                language === 'es' 
                  ? 'text-primary' 
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
            >
              ES
              {language === 'es' && (
                <motion.div
                  layoutId="lang-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                />
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-0 right-0 text-center"
      >
        <p className="text-foreground/30 text-xs tracking-[0.2em] uppercase">
          Since 2000
        </p>
      </motion.div>
    </motion.div>
  );
};

export default UnderConstruction;
