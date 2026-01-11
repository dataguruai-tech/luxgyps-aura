import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Package } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { useLanguage } from '@/context/LanguageContext';
import roseRelief from '@/assets/rose-relief.jpg';
import laurelWreath from '@/assets/laurel-wreath.png';

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
            {/* Since Badge with Laurel */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              variants={itemVariants}
            >
              <div className="relative w-10 h-9 flex items-center justify-center">
                <img src={laurelWreath} alt="" className="absolute inset-0 w-full h-full object-contain" />
                <span className="relative font-display text-xs text-primary font-medium z-10">10</span>
              </div>
              <span className="text-primary/60 text-xs tracking-[0.2em] uppercase">since 2010</span>
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

          {/* Right Side - Photo Stack */}
          <div className="relative h-[60vh] lg:h-[85vh] flex items-center justify-center lg:justify-end lg:pr-8">
            {/* Photo Stack Container */}
            <div className="relative w-[85%] max-w-md aspect-[3/4]">
              {/* Static base shadows for depth */}
              <div 
                className="absolute inset-0 bg-background/20 rounded-sm shadow-2xl"
                style={{ transform: 'rotate(-4deg) translate(-8px, 12px)' }}
              />
              <div 
                className="absolute inset-0 bg-background/30 rounded-sm shadow-xl"
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
                      <div className="w-full h-full bg-cream p-2 rounded-sm shadow-2xl">
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

            {/* Decorative corner elements */}
            <div className="absolute top-[5%] right-[5%] w-16 h-16 border-t border-r border-primary/20 z-0" />
            <div className="absolute bottom-[5%] left-[5%] w-16 h-16 border-b border-l border-primary/20 z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
