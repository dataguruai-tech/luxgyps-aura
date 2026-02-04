import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/luxgyps-logo.svg';

const UnderConstruction = () => {
  const { language, setLanguage } = useLanguage();

  const content = {
    en: {
      subtitle: "Miami's Premier Artisan Stucco Studio",
      comingSoon: 'Coming Soon'
    },
    es: {
      subtitle: 'Estudio de Estuco Artesanal Premier de Miami',
      comingSoon: 'Próximamente'
    }
  };

  const t = content[language] || content.en;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xl"
    >
      {/* Subtle Decorative Lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
      </div>

      {/* Center Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative w-full max-w-md md:max-w-lg lg:max-w-xl"
      >
        {/* Corner Accents */}
        <div className="absolute -top-4 -left-4 w-10 h-10 border-l border-t border-primary/80" />
        <div className="absolute -top-4 -right-4 w-10 h-10 border-r border-t border-primary/80" />
        <div className="absolute -bottom-4 -left-4 w-10 h-10 border-l border-b border-primary/80" />
        <div className="absolute -bottom-4 -right-4 w-10 h-10 border-r border-b border-primary/80" />

        {/* Main Card */}
        <div className="relative border border-primary bg-neutral-900/40 backdrop-blur-lg p-10 md:p-14 lg:p-16 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <img 
              src={logo} 
              alt="LuxGyps" 
              className="h-10 md:h-12 mx-auto"
            />
          </motion.div>

          {/* Title - Font 1: Cinzel */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl text-primary tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            LUXGYPS AURA
          </motion.h1>
          
          {/* Subtitle - Font 2: Inter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-sans text-sm md:text-base text-zinc-400 tracking-wide mb-10"
          >
            {t.subtitle}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="w-20 h-px bg-primary/60 mx-auto mb-10"
          />

          {/* Coming Soon - Font 1: Cinzel */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-lg md:text-xl text-white/90 tracking-[0.2em] uppercase mb-12"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {t.comingSoon}
          </motion.p>

          {/* Language Selector - Font 2: Inter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex items-center justify-center gap-6"
          >
            <button
              onClick={() => setLanguage('en')}
              className={`relative font-sans text-xs tracking-[0.1em] uppercase transition-colors duration-300 pb-1.5 ${
                language === 'en' 
                  ? 'text-primary' 
                  : 'text-zinc-500 hover:text-zinc-300'
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
            
            <span className="text-zinc-700">|</span>
            
            <button
              onClick={() => setLanguage('es')}
              className={`relative font-sans text-xs tracking-[0.1em] uppercase transition-colors duration-300 pb-1.5 ${
                language === 'es' 
                  ? 'text-primary' 
                  : 'text-zinc-500 hover:text-zinc-300'
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

      {/* Bottom Branding - Font 2: Inter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <p className="font-sans text-zinc-600 text-[10px] tracking-[0.15em] uppercase">
          Since 2000 - Miami, FL
        </p>
      </motion.div>
    </motion.div>
  );
};

export default UnderConstruction;
