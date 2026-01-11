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
  const [rotation, setRotation] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
      setRotation((prev) => prev + 120); // Rotate 120 degrees each time
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-muted">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 min-h-screen items-center">
          
          {/* Left Side - Content with Background */}
          <div className="relative lg:h-screen flex items-center">
            {/* Background Rose Relief */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.img
                src={roseRelief}
                alt="Gypsum Rose Relief"
                className="w-full h-full object-cover opacity-20"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/95 to-muted/80" />
            </div>

            <motion.div
              className="relative z-10 py-32 lg:py-0 lg:pr-12 px-4 lg:px-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Decorative line */}
              <motion.div 
                className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary to-transparent hidden lg:block"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

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
              className="mb-10 inline-flex flex-col items-center"
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
          </div>

          {/* Right Side - Rotating Image Carousel */}
          <div className="relative h-[50vh] lg:h-screen flex items-center justify-center">
            {/* Background decorative circle */}
            <motion.div
              className="absolute w-[80%] aspect-square rounded-full border border-primary/10"
              animate={{ rotate: rotation }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute w-[90%] aspect-square rounded-full border border-primary/5"
              animate={{ rotate: -rotation / 2 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  className="absolute inset-4 lg:inset-8"
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={carouselImages[currentImage].src}
                    alt={carouselImages[currentImage].alt}
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent rounded-lg" />
                </motion.div>
              </AnimatePresence>

              {/* Image indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImage(index);
                      setRotation(index * 120);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentImage === index
                        ? 'w-8 bg-primary'
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-primary/30" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-primary/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
