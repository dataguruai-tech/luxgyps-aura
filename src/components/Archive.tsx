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
import ImageLightbox from './ImageLightbox';

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
import columnsEntrance from '@/assets/archive/columns-entrance.png';
import wallMolding from '@/assets/archive/wall-molding.png';
import columnBase from '@/assets/archive/column-base.png';
import marblePedestal from '@/assets/archive/marble-pedestal.png';
import staircase1 from '@/assets/archive/staircase-1.png';
import staircase2 from '@/assets/archive/staircase-2.png';
import ceilingRoom from '@/assets/archive/ceiling-room.jpg';
import ceilingMedallion from '@/assets/archive/ceiling-medallion.jpg';
import ceilingGrid from '@/assets/archive/ceiling-grid.jpg';
import ceilingOrnate from '@/assets/archive/ceiling-ornate.jpg';
import interiorArch from '@/assets/archive/interior-arch.jpg';
import interiorColumn from '@/assets/archive/interior-column.jpg';
import interiorWindow from '@/assets/archive/interior-window.jpg';
import interiorDoorway from '@/assets/archive/interior-doorway.jpg';
import goldDoors from '@/assets/archive/gold-doors.jpg';
import grandHall from '@/assets/archive/grand-hall.jpg';
import corinthianColumns from '@/assets/archive/corinthian-columns.jpg';
import ceilingRosette from '@/assets/archive/ceiling-rosette.jpg';
import fountainSculpture from '@/assets/archive/fountain-sculpture.jpg';
import goldInterior from '@/assets/archive/gold-interior.jpg';

const archiveWorks = [
  { id: 100, title: 'Horses Relief', titleEs: 'Relieve de Caballos', category: 'Archive', description: 'Sculptural horse relief', image: horsesRelief },
  { id: 101, title: 'Artisan Team', titleEs: 'Equipo Artesano', category: 'Archive', description: 'Our skilled artisans at work', image: teamDoorway },
  { id: 102, title: 'Classic Facade I', titleEs: 'Fachada Clásica I', category: 'Archive', description: 'Exterior architectural details', image: facade1 },
  { id: 103, title: 'Classic Facade II', titleEs: 'Fachada Clásica II', category: 'Archive', description: 'Exterior architectural details', image: facade2 },
  { id: 104, title: 'Classic Facade III', titleEs: 'Fachada Clásica III', category: 'Archive', description: 'Exterior architectural details', image: facade3 },
  { id: 105, title: 'Classic Facade IV', titleEs: 'Fachada Clásica IV', category: 'Archive', description: 'Exterior architectural details', image: facade4 },
  { id: 106, title: 'Classic Facade V', titleEs: 'Fachada Clásica V', category: 'Archive', description: 'Exterior architectural details', image: facade5 },
  { id: 107, title: 'Spa Bathroom', titleEs: 'Baño Spa', category: 'Archive', description: 'Luxury spa interior design', image: spaBathroom },
  { id: 108, title: 'Ornate Doors', titleEs: 'Puertas Ornamentadas', category: 'Archive', description: 'Custom decorative doors', image: ornateDoors },
  { id: 109, title: 'Workshop Process', titleEs: 'Proceso de Taller', category: 'Archive', description: 'Behind the scenes in our workshop', image: workshopMold },
  { id: 110, title: 'Columns Entrance', titleEs: 'Entrada con Columnas', category: 'Archive', description: 'Classic fluted columns with gold accents', image: columnsEntrance },
  { id: 111, title: 'Wall Molding', titleEs: 'Moldura de Pared', category: 'Archive', description: 'Elegant wall molding details', image: wallMolding },
  { id: 112, title: 'Column Base', titleEs: 'Base de Columna', category: 'Archive', description: 'Ornate column base in workshop', image: columnBase },
  { id: 113, title: 'Marble Pedestal', titleEs: 'Pedestal de Mármol', category: 'Archive', description: 'Faux marble pedestal with green inlay', image: marblePedestal },
  { id: 114, title: 'Grand Staircase I', titleEs: 'Escalera Principal I', category: 'Archive', description: 'Gold ornate staircase railings', image: staircase1 },
  { id: 115, title: 'Grand Staircase II', titleEs: 'Escalera Principal II', category: 'Archive', description: 'Marble stairs with decorative balustrade', image: staircase2 },
  { id: 116, title: 'Ceiling Room', titleEs: 'Sala con Techo', category: 'Archive', description: 'Classical ceiling with chandeliers', image: ceilingRoom },
  { id: 117, title: 'Ceiling Medallion', titleEs: 'Medallón de Techo', category: 'Archive', description: 'Ornate ceiling medallion with gold accents', image: ceilingMedallion },
  { id: 118, title: 'Ceiling Grid', titleEs: 'Rejilla de Techo', category: 'Archive', description: 'Coffered ceiling with medallions', image: ceilingGrid },
  { id: 119, title: 'Ornate Ceiling', titleEs: 'Techo Ornamentado', category: 'Archive', description: 'Baroque ceiling with chandelier rosette', image: ceilingOrnate },
  { id: 120, title: 'Interior Arch', titleEs: 'Arco Interior', category: 'Archive', description: 'Ornate arch with acanthus leaves', image: interiorArch },
  { id: 121, title: 'Interior Column', titleEs: 'Columna Interior', category: 'Archive', description: 'Corinthian column with coffered ceiling', image: interiorColumn },
  { id: 122, title: 'Arched Window', titleEs: 'Ventana en Arco', category: 'Archive', description: 'Decorative wall panels with arched window', image: interiorWindow },
  { id: 123, title: 'Ornate Doorway', titleEs: 'Entrada Ornamentada', category: 'Archive', description: 'Baroque doorway with ceiling accents', image: interiorDoorway },
  { id: 124, title: 'Gold Doors', titleEs: 'Puertas Doradas', category: 'Archive', description: 'Elegant doors with gold leaf details', image: goldDoors },
  { id: 125, title: 'Grand Hall', titleEs: 'Gran Salón', category: 'Archive', description: 'Luxurious hall with columns and chandelier', image: grandHall },
  { id: 126, title: 'Corinthian Columns', titleEs: 'Columnas Corintias', category: 'Archive', description: 'Gold-accented Corinthian columns', image: corinthianColumns },
  { id: 127, title: 'Ceiling Rosette', titleEs: 'Roseta de Techo', category: 'Archive', description: 'Ornate ceiling rosette with spiral staircase', image: ceilingRosette },
  { id: 128, title: 'Fountain Sculpture', titleEs: 'Escultura Fuente', category: 'Archive', description: 'Classical fountain with Atlas figures', image: fountainSculpture },
  { id: 129, title: 'Gold Interior', titleEs: 'Interior Dorado', category: 'Archive', description: 'Luxurious interior with gold moldings', image: goldInterior },
];

const Archive = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<typeof archiveWorks[0] | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { isGallery } = useMode();
  const { language } = useLanguage();

  const handleImageClick = (work: typeof archiveWorks[0]) => {
    setSelectedWork(work);
    setLightboxOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!selectedWork) return;
    const currentIndex = archiveWorks.findIndex(w => w.id === selectedWork.id);
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < archiveWorks.length) {
      setSelectedWork(archiveWorks[newIndex]);
    }
  };

  // Format works for lightbox
  const worksForLightbox = archiveWorks.map(w => ({
    id: w.id,
    title: language === 'es' ? w.titleEs : w.title,
    category: w.category,
    description: w.description,
    image: w.image,
  }));

  const selectedForLightbox = selectedWork ? {
    id: selectedWork.id,
    title: language === 'es' ? selectedWork.titleEs : selectedWork.title,
    category: selectedWork.category,
    description: selectedWork.description,
    image: selectedWork.image,
  } : null;

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Toggle Button - Premium Design */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-full"
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
        >
          {/* Background with gradient */}
          <div
            className={`relative py-5 px-8 rounded-sm overflow-hidden transition-all duration-500 ${
              isGallery
                ? 'bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5'
                : 'bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30'
            }`}
          >
            {/* Corner accents */}
            <div className={`absolute top-0 left-0 w-8 h-8 border-l border-t ${isGallery ? 'border-primary/50' : 'border-border'} transition-all duration-300 group-hover:w-12 group-hover:h-12`} />
            <div className={`absolute top-0 right-0 w-8 h-8 border-r border-t ${isGallery ? 'border-primary/50' : 'border-border'} transition-all duration-300 group-hover:w-12 group-hover:h-12`} />
            <div className={`absolute bottom-0 left-0 w-8 h-8 border-l border-b ${isGallery ? 'border-primary/50' : 'border-border'} transition-all duration-300 group-hover:w-12 group-hover:h-12`} />
            <div className={`absolute bottom-0 right-0 w-8 h-8 border-r border-b ${isGallery ? 'border-primary/50' : 'border-border'} transition-all duration-300 group-hover:w-12 group-hover:h-12`} />

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-primary/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            {/* Content */}
            <div className="relative flex items-center justify-center gap-4">
              <div className={`p-2 rounded-full ${isGallery ? 'bg-primary/10' : 'bg-muted'} transition-colors duration-300`}>
                <ArchiveIcon className={`w-5 h-5 ${isGallery ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              
              <span className={`font-display text-xl tracking-[0.2em] uppercase ${isGallery ? 'text-primary' : 'text-foreground'}`}>
                {language === 'es' ? 'Archivo' : 'Archive'}
              </span>
              
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={`${isGallery ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>

            {/* Decorative lines */}
            <div className={`absolute left-1/4 top-1/2 -translate-y-1/2 w-16 h-px ${isGallery ? 'bg-gradient-to-r from-transparent to-primary/30' : 'bg-gradient-to-r from-transparent to-border'}`} />
            <div className={`absolute right-1/4 top-1/2 -translate-y-1/2 w-16 h-px ${isGallery ? 'bg-gradient-to-l from-transparent to-primary/30' : 'bg-gradient-to-l from-transparent to-border'}`} />
          </div>
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
                    {archiveWorks.map((work, index) => (
                      <CarouselItem
                        key={work.id}
                        className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="relative group cursor-pointer"
                          onClick={() => handleImageClick(work)}
                        >
                          <div
                            className={`relative aspect-[3/4] rounded-lg overflow-hidden ${
                              isGallery
                                ? 'ring-1 ring-gold/20'
                                : 'ring-1 ring-border'
                            }`}
                          >
                            <img
                              src={work.image}
                              alt={language === 'es' ? work.titleEs : work.title}
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
                                {language === 'es' ? work.titleEs : work.title}
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

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        work={selectedForLightbox}
        works={worksForLightbox}
        onNavigate={handleNavigate}
      />
    </section>
  );
};

export default Archive;
