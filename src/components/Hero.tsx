import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Package, ChevronLeft, ChevronRight } from 'lucide-react';
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
  { front: interior1, back: interior2, label: 'Гостиная' },
  { front: interior2, back: interior3, label: 'Классика' },
  { front: interior3, back: interior4, label: 'Холл' },
  { front: interior4, back: interior5, label: 'Столовая' },
  { front: interior5, back: interior6, label: 'Спальня' },
  { front: interior6, back: interior1, label: 'Вестибюль' },
];

const Hero = ({ onSampleKitClick }: HeroProps) => {
  const { isGallery } = useMode();
  const { t } = useLanguage();
  const [currentSet, setCurrentSet] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate image pairs
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentSet((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentSet((prev) => (prev + 1) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSet(index);
  };

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
          <div className="relative h-[60vh] lg:h-[85vh] flex items-center justify-center lg:justify-end">
            {/* Back Image */}
            <motion.div
              key={`back-${currentSet}`}
              className="absolute right-0 top-[10%] w-[55%] h-[70%] z-10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                className="w-full h-full overflow-hidden shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={carouselImages[currentSet].back}
                  alt="Interior design"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Front Image */}
            <motion.div
              key={`front-${currentSet}`}
              className="absolute left-0 lg:left-auto lg:right-[35%] bottom-[5%] w-[60%] h-[65%] z-20"
              initial={{ opacity: 0, x: -50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                className="w-full h-full overflow-hidden shadow-2xl"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <img
                  src={carouselImages[currentSet].front}
                  alt="Interior design"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-[15%] right-[5%] z-30 flex items-center gap-3">
              <motion.button
                onClick={goToPrev}
                className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSet === index
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-primary/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            {/* Current Slide Label */}
            <motion.div 
              key={`label-${currentSet}`}
              className="absolute top-[5%] left-[10%] lg:left-auto lg:right-[50%] z-30"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs tracking-[0.2em] text-primary/70 uppercase">
                {String(currentSet + 1).padStart(2, '0')} / {String(carouselImages.length).padStart(2, '0')}
              </span>
            </motion.div>

            {/* Decorative corner elements */}
            <div className="absolute top-[5%] right-[5%] w-20 h-20 border-t-2 border-r-2 border-primary/20 z-0" />
            <div className="absolute bottom-[0%] left-[5%] lg:left-auto lg:right-[45%] w-20 h-20 border-b-2 border-l-2 border-primary/20 z-30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
