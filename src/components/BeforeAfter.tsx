import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { ArrowLeftRight, Building2, MapPin, Calendar } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { useLanguage } from '@/context/LanguageContext';

import corridorBefore from '@/assets/transformations/corridor-before.jpg';
import corridorAfter from '@/assets/transformations/corridor-after.jpg';
import entranceBefore from '@/assets/transformations/entrance-before.jpg';
import entranceAfter from '@/assets/transformations/entrance-after.jpg';

const transformations = [
  {
    id: 1,
    title: "The Blue Wave Corridor",
    location: "Miami Beach, FL",
    year: "2024",
    architect: "Studio Rodriguez",
    description: "Complete corridor transformation with custom LED-backlit 3D gypsum wave ceiling panels",
    before: corridorAfter,
    after: corridorBefore,
    specs: {
      area: "2,400 sq ft",
      duration: "6 weeks",
      panels: "48 custom units",
    },
  },
  {
    id: 2,
    title: "The Clement Entrance",
    location: "Hollywood, FL",
    year: "2024",
    architect: "Architectural Partners LLC",
    description: "Luxury condominium entrance renovation with decorative gypsum relief panels",
    before: entranceAfter,
    after: entranceBefore,
    specs: {
      area: "800 sq ft",
      duration: "4 weeks",
      panels: "12 facade panels",
    },
  },
];

const BeforeAfterSlider = ({ transformation, t }: { transformation: typeof transformations[0]; t: any }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] md:aspect-[4/3] overflow-hidden rounded-xl cursor-ew-resize select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image (Full) */}
      <img
        src={transformation.before}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* After Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={transformation.after}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-lg">
          <ArrowLeftRight className="w-5 h-5 text-primary-foreground" />
        </div>

        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-20 bg-gradient-to-b from-primary/50 to-transparent blur-sm" />
        
        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-20 bg-gradient-to-t from-primary/50 to-transparent blur-sm" />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full text-sm font-medium text-muted-foreground border border-border/50">
        {t.beforeAfter.before}
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary-foreground">
        {t.beforeAfter.after}
      </div>
    </div>
  );
};

const BeforeAfter = () => {
  const { isGallery } = useMode();
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="transformations" className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            hsl(var(--primary)) 50px,
            hsl(var(--primary)) 51px
          )`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="max-w-4xl mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary" />
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-medium">
              {isGallery ? t.beforeAfter.eyebrowGallery : t.beforeAfter.eyebrowPro}
            </p>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            {isGallery ? (
              <>{t.beforeAfter.titleGallery} <span className="text-gradient-gold italic">After</span></>
            ) : (
              <>{t.beforeAfter.titlePro} <span className="text-gradient-gold italic">Documentation</span></>
            )}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            {isGallery ? t.beforeAfter.descGallery : t.beforeAfter.descPro}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BeforeAfterSlider transformation={transformations[activeIndex]} t={t} />
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Project Selector */}
            <div className="flex gap-3">
              {transformations.map((tr, idx) => (
                <button
                  key={tr.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeIndex === idx
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.beforeAfter.project} {idx + 1}
                </button>
              ))}
            </div>

            {/* Project Details */}
            <div>
              <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                {transformations[activeIndex].title}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {transformations[activeIndex].description}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{transformations[activeIndex].location}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{transformations[activeIndex].year}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground col-span-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span>{t.beforeAfter.architect}: {transformations[activeIndex].architect}</span>
                </div>
              </div>

              {/* Specs */}
              <div className="bg-background rounded-xl p-6 border border-border/50">
                <h4 className="text-sm font-medium text-primary tracking-wider uppercase mb-4">
                  {t.beforeAfter.specs}
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-2xl font-display text-foreground">
                      {transformations[activeIndex].specs.area}
                    </p>
                    <p className="text-sm text-muted-foreground">{t.beforeAfter.area}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-display text-foreground">
                      {transformations[activeIndex].specs.duration}
                    </p>
                    <p className="text-sm text-muted-foreground">{t.beforeAfter.installation}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-display text-foreground">
                      {transformations[activeIndex].specs.panels}
                    </p>
                    <p className="text-sm text-muted-foreground">{t.beforeAfter.components}</p>
                  </div>
                </div>
              </div>

              {/* CTA for Architects */}
              {!isGallery && (
                <motion.div
                  className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-muted-foreground mb-3">
                    {t.beforeAfter.needCad}
                  </p>
                  <button className="text-primary font-medium hover:underline">
                    {t.beforeAfter.requestDocs}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
