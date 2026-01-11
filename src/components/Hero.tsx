import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Package } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { useLanguage } from '@/context/LanguageContext';
import roseRelief from '@/assets/rose-relief.jpg';

// Interior images for carousel
import interior1 from '@/assets/hero/interior-living-1.jpg';
import interior2 from '@/assets/hero/interior-living-2.jpg';
import interior3 from '@/assets/hero/interior-living-3.jpg';
import interior4 from '@/assets/hero/interior-living-4.jpg';
import interior5 from '@/assets/hero/interior-living-5.jpg';
import interior6 from '@/assets/hero/interior-living-6.jpg';

interface HeroProps {
  onSampleKitClick?: () => void;
}

const carouselImages = [
  { front: interior1, back: interior2 },
  { front: interior2, back: interior3 },
  { front: interior3, back: interior4 },
  { front: interior4, back: interior5 },
  { front: interior5, back: interior6 },
  { front: interior6, back: interior1 },
];

const Hero = ({ onSampleKitClick }: HeroProps) => {
  const { isGallery } = useMode();
  const { t } = useLanguage();
  const [currentSet, setCurrentSet] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  const goToNext = useCallback(() => {
    setCurrentSet((prev) => (prev + 1) % carouselImages.length);
    setProgress(0);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSet((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setProgress(0);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSet(index);
    setProgress(0);
  }, []);

  // Auto-rotate with smooth progress
  useEffect(() => {
    if (isPaused) return;
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + (100 / (SLIDE_DURATION / 50));
      });
    }, 50);
    
    return () => clearInterval(progressInterval);
  }, [isPaused, goToNext]);

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
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full Screen Background - Rose Relief */}
      <div className="absolute inset-0">
        <motion.img
          src={roseRelief}
          alt="Gypsum Rose Relief"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 min-h-screen items-center">
          
          {/* Left Side - Content */}
          <motion.div
            className="py-32 lg:py-0 lg:pr-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.p
              className="text-primary tracking-[0.3em] uppercase text-sm font-medium mb-6"
              variants={itemVariants}
            >
              {t.hero.eyebrow}
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] mb-8"
              variants={itemVariants}
            >
              <span className="text-foreground">{t.hero.title1}</span>
              <br />
              <span className="text-gradient-gold italic">{t.hero.title2}</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-muted-foreground text-base md:text-lg max-w-md mb-10 leading-relaxed"
              variants={itemVariants}
            >
              {isGallery ? t.hero.subtitleGallery : t.hero.subtitlePro}
            </motion.p>

            {/* Since Badge */}
            <motion.div 
              className="mb-10 inline-flex flex-col items-start"
              variants={itemVariants}
            >
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase italic">since</span>
              <span className="font-display text-4xl md:text-5xl text-primary font-semibold">2010</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4"
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
                  <motion.button
                    onClick={onSampleKitClick}
                    className="group flex items-center gap-3 px-8 py-4 rounded-full btn-outline-gold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Package className="w-5 h-5" />
                    <span className="font-medium">{t.sampleKit.buttonText}</span>
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Right Side - Overlapping Images Carousel */}
          <div 
            className="relative h-[60vh] lg:h-[85vh] flex items-center justify-center lg:justify-end"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Back Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`back-${currentSet}`}
                className="absolute right-0 top-[10%] w-[55%] h-[70%] z-10"
                initial={{ opacity: 0, scale: 0.95, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.02, x: -20 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div 
                  className="w-full h-full overflow-hidden shadow-2xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img
                    src={carouselImages[currentSet].back}
                    alt="Interior design"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Front Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`front-${currentSet}`}
                className="absolute left-0 lg:left-auto lg:right-[35%] bottom-[5%] w-[60%] h-[65%] z-20"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -20 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div 
                  className="w-full h-full overflow-hidden shadow-2xl"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <img
                    src={carouselImages[currentSet].front}
                    alt="Interior design"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Stylish Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
              {/* Prev Arrow */}
              <motion.button
                onClick={goToPrev}
                className="group relative w-10 h-10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 rounded-full border border-primary/30 group-hover:border-primary/60 transition-colors" />
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </motion.button>

              {/* Progress Indicators */}
              <div className="flex items-center gap-1">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="group relative h-8 flex items-center justify-center px-1"
                  >
                    {/* Background bar */}
                    <div className={`h-[2px] transition-all duration-300 ${
                      currentSet === index ? 'w-8 bg-primary/20' : 'w-4 bg-primary/10 group-hover:bg-primary/20'
                    }`}>
                      {/* Progress fill */}
                      {currentSet === index && (
                        <motion.div
                          className="h-full bg-primary origin-left"
                          style={{ width: `${progress}%` }}
                          transition={{ duration: 0.05, ease: "linear" }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Next Arrow */}
              <motion.button
                onClick={goToNext}
                className="group relative w-10 h-10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 rounded-full border border-primary/30 group-hover:border-primary/60 transition-colors" />
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.button>
            </div>

            {/* Slide Counter */}
            <motion.div 
              className="absolute top-[5%] right-[5%] z-30 flex items-baseline gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="font-display text-3xl text-primary font-light">
                {String(currentSet + 1).padStart(2, '0')}
              </span>
              <span className="text-primary/40 text-sm">/</span>
              <span className="text-primary/40 text-sm">
                {String(carouselImages.length).padStart(2, '0')}
              </span>
            </motion.div>

            {/* Decorative corner elements */}
            <div className="absolute top-[5%] right-[15%] w-16 h-16 border-t border-r border-primary/20 z-0" />
            <div className="absolute bottom-[15%] left-[5%] lg:left-auto lg:right-[50%] w-16 h-16 border-b border-l border-primary/20 z-30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
