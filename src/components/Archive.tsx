import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Archive as ArchiveIcon } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Archive images
import horsesRelief from '@/assets/archive/horses-relief.png';
import teamDoorway from '@/assets/archive/team-doorway.png';
import facade1 from '@/assets/archive/facade-1.png';
import facade2 from '@/assets/archive/facade-2.png';
import facade3 from '@/assets/archive/facade-3.png';
import facade4 from '@/assets/archive/facade-4.png';
import facade5 from '@/assets/archive/facade-5.png';
import spaBathroom from '@/assets/archive/spa-bathroom.png';
import ornateDoors from '@/assets/archive/ornate-doors.png';
import workshopMold from '@/assets/archive/workshop-mold.png';

const archiveImages = [
  { src: horsesRelief, title: 'Horses Relief', titleEs: 'Relieve de Caballos' },
  { src: teamDoorway, title: 'Artisan Team', titleEs: 'Equipo Artesano' },
  { src: facade1, title: 'Classic Facade I', titleEs: 'Fachada Clásica I' },
  { src: facade2, title: 'Classic Facade II', titleEs: 'Fachada Clásica II' },
  { src: facade3, title: 'Classic Facade III', titleEs: 'Fachada Clásica III' },
  { src: facade4, title: 'Classic Facade IV', titleEs: 'Fachada Clásica IV' },
  { src: facade5, title: 'Classic Facade V', titleEs: 'Fachada Clásica V' },
  { src: spaBathroom, title: 'Spa Bathroom', titleEs: 'Baño Spa' },
  { src: ornateDoors, title: 'Ornate Doors', titleEs: 'Puertas Ornamentadas' },
  { src: workshopMold, title: 'Workshop Process', titleEs: 'Proceso de Taller' },
];

const Archive = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isGallery } = useMode();
  const { language } = useLanguage();

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg border transition-all duration-300 ${
            isGallery
              ? 'border-gold/30 bg-gold/5 hover:bg-gold/10 text-gold'
              : 'border-border bg-muted/50 hover:bg-muted text-foreground'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <ArchiveIcon className="w-5 h-5" />
          <span className="font-serif text-lg tracking-wide">
            {language === 'es' ? 'Archivo' : 'Archive'}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>

        {/* Collapsible Carousel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-8">
                <Carousel
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {archiveImages.map((image, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="relative group"
                        >
                          <div
                            className={`relative aspect-[3/4] rounded-lg overflow-hidden ${
                              isGallery
                                ? 'ring-1 ring-gold/20'
                                : 'ring-1 ring-border'
                            }`}
                          >
                            <img
                              src={image.src}
                              alt={language === 'es' ? image.titleEs : image.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            {/* Overlay */}
                            <div
                              className={`absolute inset-0 transition-opacity duration-300 ${
                                isGallery
                                  ? 'bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100'
                                  : 'bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100'
                              }`}
                            />
                            {/* Title */}
                            <div
                              className={`absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${
                                isGallery ? 'text-white' : 'text-foreground'
                              }`}
                            >
                              <p className="font-serif text-sm">
                                {language === 'es' ? image.titleEs : image.title}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious
                    className={`-left-4 ${
                      isGallery
                        ? 'bg-gold/20 border-gold/40 text-gold hover:bg-gold/30'
                        : 'bg-background border-border'
                    }`}
                  />
                  <CarouselNext
                    className={`-right-4 ${
                      isGallery
                        ? 'bg-gold/20 border-gold/40 text-gold hover:bg-gold/30'
                        : 'bg-background border-border'
                    }`}
                  />
                </Carousel>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Archive;
