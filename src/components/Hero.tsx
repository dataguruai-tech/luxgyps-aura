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
        {/* Mobile: center gradient, Desktop: side gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/70 to-background/90 lg:bg-gradient-to-r lg:from-background/95 lg:via-background/85 lg:to-background/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4 min-h-screen items-center">
          
          {/* Left Side - Content */}
          <motion.div
            className="pt-28 pb-8 lg:py-0 lg:pr-8 text-center order-1 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Since Badge - Smaller on mobile */}
            <motion.div
              className="flex justify-center mb-4 lg:mb-8"
              variants={itemVariants}
            >
              <img src={since2000Badge} alt="Since 2000" className="h-12 sm:h-14 lg:h-16 w-auto object-contain" />
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              className="text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-medium mb-4 lg:mb-6"
              variants={itemVariants}
            >
              Miami Artisan Studio
            </motion.p>

            {/* Main Heading - Optimized for mobile */}
            <motion.h1
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1] sm:leading-[0.95] mb-5 lg:mb-8"
              variants={itemVariants}
            >
              <span className="text-foreground">{t.hero.title1}</span>
              <br />
              <span className="text-gradient-gold italic">{t.hero.title2}</span>
            </motion.h1>

            {/* Subheading - Tighter on mobile */}
            <motion.p
              className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md mb-6 lg:mb-10 leading-relaxed mx-auto"
              variants={itemVariants}
            >
              {isGallery ? t.hero.subtitleGallery : t.hero.subtitlePro}
            </motion.p>

            {/* CTAs - Stack vertically on mobile, horizontal on tablet+ */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              variants={itemVariants}
            >
              {isGallery ? (
                <>
                  <motion.a
                    href="#portfolio"
                    className="group flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full btn-gold text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium">{t.hero.viewPortfolio}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <motion.a
                    href="#process"
                    className="group flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full btn-outline-gold text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">{t.hero.watchProcess}</span>
                  </motion.a>
                </>
              ) : (
                <>
                  <motion.a
                    href="#catalog"
                    className="group flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full btn-gold text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium">{t.hero.browseCatalog}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <motion.button
                    onClick={onSampleKitClick}
                    className="group flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full btn-outline-gold text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">{t.sampleKit.buttonText}</span>
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Right Side - Photo Stack */}
          {/* Mobile: smaller, positioned below content. Desktop: large, right side */}
          <div className="relative h-[45vh] sm:h-[50vh] lg:h-[85vh] flex items-center justify-center lg:justify-end lg:pr-8 order-2 lg:order-2">
            {/* Photo Stack Container - Smaller on mobile */}
            <div className="relative w-[70%] sm:w-[75%] lg:w-[85%] max-w-xs sm:max-w-sm lg:max-w-md aspect-[3/4]">
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
                      <div className="w-full h-full bg-cream p-1.5 sm:p-2 rounded-sm shadow-2xl">
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

            {/* Decorative corner elements - Hidden on mobile */}
            <div className="absolute top-[5%] right-[5%] w-12 sm:w-16 h-12 sm:h-16 border-t border-r border-primary/20 z-0 hidden sm:block" />
            <div className="absolute bottom-[5%] left-[5%] w-12 sm:w-16 h-12 sm:h-16 border-b border-l border-primary/20 z-0 hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Mobile scroll indicator */}
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
