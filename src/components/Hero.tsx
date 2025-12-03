import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { useLanguage } from '@/context/LanguageContext';
import roseRelief from '@/assets/rose-relief.jpg';
import logo from '@/assets/luxgyps-logo.svg';

const Hero = () => {
  const { isGallery } = useMode();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.img
          src={roseRelief}
          alt="Gypsum Rose Relief"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className={`absolute inset-0 ${
          isGallery 
            ? 'bg-gradient-to-b from-background/90 via-background/70 to-background' 
            : 'bg-gradient-to-b from-background/80 via-background/60 to-background'
        }`} />
        
        {/* Decorative Gold Border */}
        <motion.div 
          className="absolute top-8 left-8 right-8 bottom-8 border border-primary/20 pointer-events-none"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div 
            className="flex items-center justify-center gap-3 mb-8"
            variants={itemVariants}
          >
            <img src={logo} alt="LuxGyps" className="h-12 w-12 md:h-14 md:w-14" />
            <span className="font-display text-3xl md:text-4xl tracking-wide">
              <span className="text-foreground">Lux</span>
              <span className="text-primary">Gyps</span>
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p 
            className="text-primary tracking-[0.3em] uppercase text-sm font-medium mb-6"
            variants={itemVariants}
          >
            {t.hero.eyebrow}
          </motion.p>

          {/* Main Heading */}
          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8"
            variants={itemVariants}
          >
            <span className="text-foreground">{t.hero.title1}</span>
            <br />
            <span className="text-gradient-gold italic">{t.hero.title2}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
          >
            {isGallery ? t.hero.subtitleGallery : t.hero.subtitlePro}
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            {isGallery ? (
              <>
                <motion.a
                  href="#portfolio"
                  className="group flex items-center gap-3 px-8 py-4 rounded-full btn-gold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium">{t.hero.viewPortfolio}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="#process"
                  className="group flex items-center gap-3 px-8 py-4 rounded-full btn-outline-gold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-5 h-5" />
                  <span className="font-medium">{t.hero.watchProcess}</span>
                </motion.a>
              </>
            ) : (
              <>
                <motion.a
                  href="#catalog"
                  className="group flex items-center gap-3 px-8 py-4 rounded-full btn-gold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium">{t.hero.browseCatalog}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="#downloads"
                  className="group flex items-center gap-3 px-8 py-4 rounded-full btn-outline-gold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium">{t.hero.downloadCad}</span>
                </motion.a>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
