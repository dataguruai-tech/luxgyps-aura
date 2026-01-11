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

  const SLIDE_DURATION = 6000;

  const goToNext = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNext, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [goToNext]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Split Background - Rose Relief Left, Carousel Right */}
      <div className="absolute inset-0 flex">
        {/* Left Side - Rose Relief (Gypsum Flower) */}
        <div className="w-full lg:w-1/2 relative">
          <motion.img
            src={roseRelief}
            alt="Gypsum Rose Relief"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/90" />
        </div>
        
        {/* Right Side - Carousel Images */}
        <div className="hidden lg:block w-1/2 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img
                src={carouselImages[currentImage]}
                alt="Interior design"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/80" />
        </div>
      </div>
      
      {/* Top & Bottom gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/40 pointer-events-none" />
      
      {/* Subtle noise texture for depth */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 xl:px-24">
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Laurel Badge - Subtle & Elegant */}
          <motion.div 
            className="mb-12"
            variants={itemVariants}
          >
            <div className="relative w-20 h-16 flex items-center justify-center">
              <img 
                src={laurelWreath} 
                alt="Laurel wreath" 
                className="absolute inset-0 w-full h-full object-contain opacity-80"
              />
              <div className="relative flex flex-col items-center justify-center z-10">
                <span className="text-[6px] tracking-[0.3em] text-primary uppercase font-medium">since</span>
                <span className="font-display text-base text-primary font-semibold tracking-wide leading-none">2010</span>
              </div>
            </div>
          </motion.div>

          {/* Main Heading - Ultra Premium Typography */}
          <motion.div className="mb-8" variants={itemVariants}>
            <h1 className="font-display leading-[0.9] tracking-[-0.02em]">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground">
                {t.hero.title1}
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-gradient-gold italic mt-2">
                {t.hero.title2}
              </span>
            </h1>
          </motion.div>

          {/* Decorative Line */}
          <motion.div 
            className="w-24 h-px bg-primary/60 mb-8 origin-left"
            variants={lineVariants}
          />

          {/* Subheading */}
          <motion.p
            className="text-muted-foreground text-lg md:text-xl max-w-lg mb-12 leading-relaxed font-light"
            variants={itemVariants}
          >
            {isGallery ? t.hero.subtitleGallery : t.hero.subtitlePro}
          </motion.p>

          {/* CTAs - Refined */}
          <motion.div
            className="flex flex-wrap items-center gap-6"
            variants={itemVariants}
          >
            {isGallery ? (
              <>
                <motion.a
                  href="#portfolio"
                  className="group relative flex items-center gap-4 px-10 py-5 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button background */}
                  <div className="absolute inset-0 btn-gold rounded-none" />
                  <span className="relative z-10 font-medium tracking-wider text-sm uppercase text-background">
                    {t.hero.viewPortfolio}
                  </span>
                  <ArrowRight className="relative z-10 w-4 h-4 text-background group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="#process"
                  className="group flex items-center gap-4 px-10 py-5 border border-primary/30 hover:border-primary/60 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-4 h-4 text-primary" />
                  <span className="font-medium tracking-wider text-sm uppercase text-primary">
                    {t.hero.watchProcess}
                  </span>
                </motion.a>
              </>
            ) : (
              <>
                <motion.a
                  href="#catalog"
                  className="group relative flex items-center gap-4 px-10 py-5 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 btn-gold rounded-none" />
                  <span className="relative z-10 font-medium tracking-wider text-sm uppercase text-background">
                    {t.hero.browseCatalog}
                  </span>
                  <ArrowRight className="relative z-10 w-4 h-4 text-background group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.button
                  onClick={onSampleKitClick}
                  className="group flex items-center gap-4 px-10 py-5 border border-primary/30 hover:border-primary/60 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Package className="w-4 h-4 text-primary" />
                  <span className="font-medium tracking-wider text-sm uppercase text-primary">
                    {t.sampleKit.buttonText}
                  </span>
                </motion.button>
              </>
            )}
          </motion.div>

          {/* Bottom Info Bar */}
          <motion.div
            className="mt-20 pt-8 border-t border-border/30"
            variants={itemVariants}
          >
            <div className="flex flex-wrap items-center gap-x-12 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="tracking-wide">Miami, FL</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="tracking-wide">Premium Artisan Studio</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="tracking-wide">5-Year Guarantee</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Progress Indicator */}
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-2">
        <span className="text-xs text-muted-foreground tracking-widest mb-2">
          {String(currentImage + 1).padStart(2, '0')} / {String(carouselImages.length).padStart(2, '0')}
        </span>
        <div className="flex gap-1.5">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-8 h-0.5 transition-all duration-500 ${
                idx === currentImage 
                  ? 'bg-primary' 
                  : 'bg-foreground/20 hover:bg-foreground/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 lg:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l border-t border-primary/10" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-primary/10" />
    </section>
  );
};

export default Hero;
