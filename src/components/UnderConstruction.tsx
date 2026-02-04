import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/luxgyps-logo.svg';

const UnderConstruction = () => {
  const { language, setLanguage } = useLanguage();

  const content = {
    en: {
      subtitle: 'Website Under Development'
    },
    es: {
      subtitle: 'Sitio Web en Desarrollo'
    }
  };

  const t = content[language] || content.en;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-3xl overflow-hidden"
    >
      {/* Center Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative w-full max-w-sm md:max-w-md"
      >
        {/* Main Card */}
        <div className="relative border border-primary/40 bg-neutral-950/50 p-10 md:p-14 text-center flex flex-col items-center">
          {/* Logo - Top */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <img 
              src={logo} 
              alt="LuxGyps" 
              className="h-8 md:h-10 mx-auto"
            />
          </motion.div>

          {/* COMING SOON - Font 1: Cinzel - Massive */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl text-primary tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            COMING SOON
          </motion.h1>
          
          {/* Subtitle - Font 2: Inter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-sans text-lg md:text-xl text-zinc-300 font-light tracking-wide mb-14"
          >
            {t.subtitle}
          </motion.p>

          {/* Language Selector - Font 2: Inter - Bottom of frame */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-5"
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
    </motion.div>
  );
};

export default UnderConstruction;
