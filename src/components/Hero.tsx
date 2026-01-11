import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Package } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { useLanguage } from '@/context/LanguageContext';
import roseRelief from '@/assets/rose-relief.jpg';

// Gallery images for rotating carousel
import goldenWave from '@/assets/gallery/golden-wave.jpg';
import poseidon from '@/assets/gallery/poseidon.jpg';
import bronzeLiving from '@/assets/gallery/bronze-living.jpg';

interface HeroProps {
  onSampleKitClick?: () => void;
}

const carouselImages = [
  { src: goldenWave, alt: 'Golden Wave Relief' },
  { src: poseidon, alt: 'Poseidon Relief' },
  { src: bronzeLiving, alt: 'Bronze Living Interior' },
];

const Hero = ({ onSampleKitClick }: HeroProps) => {
  const { isGallery } = useMode();
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-rotate images with stacking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-screen items-center">
          
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
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">since</span>
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

          {/* Right Side - Stacked Image Carousel */}
          <div className="relative h-[50vh] lg:h-[80vh] flex items-center justify-center">
            {/* Stacked Images Container */}
            <div className="relative w-full h-full max-w-lg mx-auto">
              {carouselImages.map((image, index) => {
                const isActive = index === currentImage;
                const isPrev = index === (currentImage - 1 + carouselImages.length) % carouselImages.length;
                const isNext = index === (currentImage + 1) % carouselImages.length;
                
                let zIndex = 0;
                let xOffset = 0;
                let yOffset = 0;
                let scale = 0.85;
                let opacity = 0;
                
                if (isActive) {
                  zIndex = 30;
                  xOffset = 0;
                  yOffset = 0;
                  scale = 1;
                  opacity = 1;
                } else if (isPrev) {
                  zIndex = 20;
                  xOffset = -30;
                  yOffset = 20;
                  scale = 0.92;
                  opacity = 0.6;
                } else if (isNext) {
                  zIndex = 10;
                  xOffset = 30;
                  yOffset = 40;
                  scale = 0.85;
                  opacity = 0.3;
                }
                
                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0 cursor-pointer"
                    style={{ zIndex }}
                    animate={{
                      x: xOffset,
                      y: yOffset,
                      scale,
                      opacity,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => setCurrentImage(index)}
                  >
                    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-40">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImage === index
                      ? 'w-8 bg-primary'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/20" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
