import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Package } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { useLanguage } from '@/context/LanguageContext';
import roseRelief from '@/assets/rose-relief.jpg';
import since2000Badge from '@/assets/since-2000-badge.png';

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
  interior1,
  interior2,
  interior3,
  interior4,
  interior5,
  interior6,
];

const Hero = ({ onSampleKitClick }: HeroProps) => {
  const { isGallery } = useMode();
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);
  const [imageStack, setImageStack] = useState<number[]>([0]);

  const SLIDE_DURATION = 5000;

  const goToNext = useCallback(() => {
    const nextIndex = (currentImage + 1) % carouselImages.length;
    setCurrentImage(nextIndex);
    setImageStack(prev => [...prev.slice(-3), nextIndex]); // Keep last 4 images in stack
  }, [currentImage]);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(goToNext, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [goToNext]);

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

  // Random rotation for photo stack effect
  const getRandomRotation = (index: number) => {
    const rotations = [-3, 2, -1.5, 3, -2, 1.5];
    return rotations[index % rotations.length];
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
        {/* Mobile: center gradient, Tablet: diagonal, Desktop: side gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/70 to-background/90 md:bg-gradient-to-br md:from-background/90 md:via-background/60 md:to-background/40 lg:bg-gradient-to-r lg:from-background/95 lg:via-background/85 lg:to-background/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Mobile: single column, Tablet: side-by-side balanced, Desktop: 2-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-4 min-h-screen items-center">
          
          {/* Left Side - Content */}
          <motion.div
            className="pt-28 pb-8 md:pt-24 md:pb-0 lg:py-0 lg:pr-8 text-center md:text-left order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Since Badge - Optimized for tablet */}
            <motion.div
              className="flex justify-center md:justify-start mb-4 md:mb-6 lg:mb-8"
              variants={itemVariants}
            >
              <img src={since2000Badge} alt="Since 2000" className="h-12 sm:h-14 md:h-14 lg:h-16 w-auto object-contain" />
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              className="text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm md:text-xs font-medium mb-4 md:mb-4 lg:mb-6"
              variants={itemVariants}
            >
              Miami Artisan Studio
            </motion.p>

            {/* Main Heading - Tablet-optimized sizing */}
            <motion.h1
              className="font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-6xl xl:text-7xl leading-[1] sm:leading-[0.95] md:leading-[0.9] mb-5 md:mb-6 lg:mb-8"
              variants={itemVariants}
            >
              <span className="text-foreground">{t.hero.title1}</span>
              <br />
              <span className="text-gradient-gold italic">{t.hero.title2}</span>
            </motion.h1>

            {/* Subheading - Optimized for tablet */}
            <motion.p
              className="text-muted-foreground text-sm sm:text-base md:text-base max-w-xs sm:max-w-md md:max-w-sm lg:max-w-md mb-6 md:mb-8 lg:mb-10 leading-relaxed mx-auto md:mx-0"
              variants={itemVariants}
            >
              {isGallery ? t.hero.subtitleGallery : t.hero.subtitlePro}
            </motion.p>

            {/* CTAs - Tablet: horizontal with refined sizing */}
            <motion.div
              className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 sm:gap-4 md:gap-3"
              variants={itemVariants}
            >
              {isGallery ? (
                <>
                  <motion.a
                    href="#portfolio"
                    className="group flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 md:px-6 py-3.5 sm:py-4 md:py-3 rounded-full btn-gold text-sm sm:text-base md:text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium">{t.hero.viewPortfolio}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <motion.a
                    href="#process"
                    className="group flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 md:px-6 py-3.5 sm:py-4 md:py-3 rounded-full btn-outline-gold text-sm sm:text-base md:text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" />
                    <span className="font-medium">{t.hero.watchProcess}</span>
                  </motion.a>
                </>
              ) : (
                <>
                  <motion.a
                    href="#catalog"
                    className="group flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 md:px-6 py-3.5 sm:py-4 md:py-3 rounded-full btn-gold text-sm sm:text-base md:text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium">{t.hero.browseCatalog}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <motion.button
                    onClick={onSampleKitClick}
                    className="group flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 md:px-6 py-3.5 sm:py-4 md:py-3 rounded-full btn-outline-gold text-sm sm:text-base md:text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" />
                    <span className="font-medium">{t.sampleKit.buttonText}</span>
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Right Side - Photo Stack */}
          {/* Mobile: smaller below, Tablet: elegant side placement, Desktop: large right */}
          <div className="relative h-[45vh] sm:h-[50vh] md:h-[70vh] lg:h-[85vh] flex items-center justify-center md:justify-center lg:justify-end lg:pr-8 order-2">
            {/* Photo Stack Container - Tablet: centered elegantly */}
            <div className="relative w-[70%] sm:w-[75%] md:w-[90%] lg:w-[85%] max-w-xs sm:max-w-sm md:max-w-[280px] lg:max-w-md aspect-[3/4]">
              {/* Static base shadows for depth */}
              <div 
                className="absolute inset-0 bg-background/20 rounded-sm shadow-2xl hidden sm:block"
                style={{ transform: 'rotate(-4deg) translate(-8px, 12px)' }}
              />
              <div 
                className="absolute inset-0 bg-background/30 rounded-sm shadow-xl hidden sm:block"
                style={{ transform: 'rotate(2deg) translate(6px, 8px)' }}
              />
              
              {/* Animated photo stack */}
              <AnimatePresence>
                {imageStack.map((imgIndex, stackIndex) => {
                  const isTop = stackIndex === imageStack.length - 1;
                  const depth = imageStack.length - 1 - stackIndex;
                  
                  return (
                    <motion.div
                      key={`${imgIndex}-${stackIndex}`}
                      className="absolute inset-0"
                      initial={isTop ? { 
                        opacity: 0, 
                        scale: 1.1, 
                        y: -100,
                        rotate: getRandomRotation(imgIndex) + 5
                      } : false}
                      animate={{ 
                        opacity: Math.max(0, 1 - depth * 0.25),
                        scale: 1 - depth * 0.03,
                        y: depth * 8,
                        x: depth * -4,
                        rotate: getRandomRotation(imgIndex),
                        zIndex: 10 - depth
                      }}
                      exit={{ 
                        opacity: 0,
                        scale: 0.95,
                        transition: { duration: 0.3 }
                      }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      style={{ zIndex: 10 - depth }}
                    >
                      {/* Photo frame effect */}
                      <div className="w-full h-full bg-cream p-1.5 sm:p-2 md:p-2 rounded-sm shadow-2xl">
                        <div className="w-full h-full overflow-hidden">
                          <motion.img
                            src={carouselImages[imgIndex]}
                            alt="Interior design"
                            className="w-full h-full object-cover"
                            animate={isTop ? { scale: [1, 1.02, 1] } : {}}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Decorative corner elements - Show on tablet+ */}
            <div className="absolute top-[5%] right-[5%] md:top-[8%] md:right-[8%] w-12 sm:w-16 md:w-12 h-12 sm:h-16 md:h-12 border-t border-r border-primary/20 z-0 hidden md:block" />
            <div className="absolute bottom-[5%] left-[5%] md:bottom-[8%] md:left-[8%] w-12 sm:w-16 md:w-12 h-12 sm:h-16 md:h-12 border-b border-l border-primary/20 z-0 hidden md:block" />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet scroll indicator - Hidden on desktop */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 lg:hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-display">Scroll</span>
        <motion.div 
          className="w-px h-6 bg-gradient-to-b from-primary/40 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
