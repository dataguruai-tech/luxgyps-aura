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
import archedCeiling from '@/assets/archive/arched-ceiling.jpg';
import goldPilasters from '@/assets/archive/gold-pilasters.jpg';
import chandelierCeiling from '@/assets/archive/chandelier-ceiling.jpg';
import marbleFireplace from '@/assets/archive/marble-fireplace.jpg';
import palaceConstruction from '@/assets/archive/palace-construction.jpg';
import domeInterior from '@/assets/archive/dome-interior.jpg';
import statueFountain from '@/assets/archive/statue-fountain.jpg';
import floralCeiling from '@/assets/archive/floral-ceiling.jpg';
import grandColumns from '@/assets/archive/grand-columns.jpg';
import rotundaDome from '@/assets/archive/rotunda-dome.jpg';
import baroqueMedallion from '@/assets/archive/baroque-medallion.jpg';
import rococoFrame from '@/assets/archive/rococo-frame.jpg';
import muralPanels from '@/assets/archive/mural-panels.jpg';
import geometricWall from '@/assets/archive/geometric-wall.jpg';
import artisanWorkshop from '@/assets/archive/artisan-workshop.jpg';
import mosaicFountain from '@/assets/archive/mosaic-fountain.jpg';
import marblePilasters from '@/assets/archive/marble-pilasters.jpg';
import clayRelief from '@/assets/archive/clay-relief.jpg';
import litFence from '@/assets/archive/lit-fence.jpg';
import fauxMarbleColumns from '@/assets/archive/faux-marble-columns.jpg';
import brickFireplace from '@/assets/archive/brick-fireplace.jpg';
import artNouveauFacade from '@/assets/archive/art-nouveau-facade.jpg';
import onyxColumn from '@/assets/archive/onyx-column.jpg';
import balustradeFence from '@/assets/archive/balustrade-fence.jpg';
import skyCeiling from '@/assets/archive/sky-ceiling.jpg';
import outdoorKitchen from '@/assets/archive/outdoor-kitchen.jpg';
import femaleSculpture from '@/assets/archive/female-sculpture.jpg';
import ornateFacade from '@/assets/archive/ornate-facade.jpg';
import cofferedAtrium from '@/assets/archive/coffered-atrium.jpg';
import rusticFireplace from '@/assets/archive/rustic-fireplace.jpg';
import whiteRosette from '@/assets/archive/white-rosette.jpg';
import floralWallRelief from '@/assets/archive/floral-wall-relief.jpg';
import windowColumns from '@/assets/archive/window-columns.jpg';
import terracottaColumn from '@/assets/archive/terracotta-column.jpg';
import baroquePortal from '@/assets/archive/baroque-portal.jpg';
import activeFireplace from '@/assets/archive/active-fireplace.jpg';
import goldenArchway from '@/assets/archive/golden-archway.jpg';
import fauxMarbleBase from '@/assets/archive/faux-marble-base.jpg';
import workshopElements from '@/assets/archive/workshop-elements.jpg';
import estateFence from '@/assets/archive/estate-fence.jpg';

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
  { id: 130, title: 'Arched Ceiling', titleEs: 'Techo Arqueado', category: 'Archive', description: 'Ornate arched ceiling with gold accents', image: archedCeiling },
  { id: 131, title: 'Gold Pilasters', titleEs: 'Pilastras Doradas', category: 'Archive', description: 'Corinthian pilasters with gold leaf details', image: goldPilasters },
  { id: 132, title: 'Chandelier Ceiling', titleEs: 'Techo con Lámpara', category: 'Archive', description: 'Crystal chandelier with gold molding ceiling', image: chandelierCeiling },
  { id: 133, title: 'Marble Fireplace', titleEs: 'Chimenea de Mármol', category: 'Archive', description: 'Classic marble fireplace in construction', image: marbleFireplace },
  { id: 134, title: 'Palace Construction', titleEs: 'Construcción de Palacio', category: 'Archive', description: 'Grand entrance with gold ornaments', image: palaceConstruction },
  { id: 135, title: 'Dome Interior', titleEs: 'Interior con Cúpula', category: 'Archive', description: 'Palatial interior with glass dome', image: domeInterior },
  { id: 136, title: 'Statue Fountain', titleEs: 'Fuente con Estatua', category: 'Archive', description: 'Classical statue niche with fountain', image: statueFountain },
  { id: 137, title: 'Floral Ceiling', titleEs: 'Techo Floral', category: 'Archive', description: 'Textured floral ceiling pattern', image: floralCeiling },
  { id: 138, title: 'Grand Columns', titleEs: 'Grandes Columnas', category: 'Archive', description: 'Monumental column entrance', image: grandColumns },
  { id: 139, title: 'Rotunda Dome', titleEs: 'Cúpula Rotonda', category: 'Archive', description: 'Elegant rotunda with skylight dome', image: rotundaDome },
  { id: 140, title: 'Baroque Medallion', titleEs: 'Medallón Barroco', category: 'Archive', description: 'Ornate floral ceiling medallion with gold accents', image: baroqueMedallion },
  { id: 141, title: 'Rococo Frame', titleEs: 'Marco Rococó', category: 'Archive', description: 'White rococo wall frame molding', image: rococoFrame },
  { id: 142, title: 'Mural Panels', titleEs: 'Paneles Murales', category: 'Archive', description: 'Landscape mural panels with rococo frames', image: muralPanels },
  { id: 143, title: 'Geometric Wall', titleEs: 'Pared Geométrica', category: 'Archive', description: 'Modern backlit geometric wall panels', image: geometricWall },
  { id: 144, title: 'Artisan Workshop', titleEs: 'Taller Artesano', category: 'Archive', description: 'Master craftsman with curved molding', image: artisanWorkshop },
  { id: 145, title: 'Mosaic Fountain', titleEs: 'Fuente Mosaico', category: 'Archive', description: 'Ornate tiered fountain with gold mosaic', image: mosaicFountain },
  { id: 146, title: 'Marble Pilasters', titleEs: 'Pilastras de Mármol', category: 'Archive', description: 'Faux marble pilasters with green accents', image: marblePilasters },
  { id: 147, title: 'Clay Relief', titleEs: 'Relieve en Arcilla', category: 'Archive', description: 'Classical figural relief in clay', image: clayRelief },
  { id: 148, title: 'Lit Fence', titleEs: 'Cerca Iluminada', category: 'Archive', description: 'Decorative fence with night lighting', image: litFence },
  { id: 149, title: 'Faux Marble Columns', titleEs: 'Columnas Mármol Falso', category: 'Archive', description: 'Fluted columns with faux marble finish', image: fauxMarbleColumns },
  { id: 150, title: 'Brick Fireplace', titleEs: 'Chimenea de Ladrillo', category: 'Archive', description: 'Custom brick BBQ fireplace complex', image: brickFireplace },
  { id: 151, title: 'Art Nouveau Facade', titleEs: 'Fachada Art Nouveau', category: 'Archive', description: 'Historic Art Nouveau building restoration', image: artNouveauFacade },
  { id: 152, title: 'Onyx Column', titleEs: 'Columna de Ónix', category: 'Archive', description: 'Faux onyx marble column with gold base', image: onyxColumn },
  { id: 153, title: 'Balustrade Fence', titleEs: 'Cerca Balaustrada', category: 'Archive', description: 'Black granite balustrade with decorative fence', image: balustradeFence },
  { id: 154, title: 'Sky Ceiling', titleEs: 'Techo Cielo', category: 'Archive', description: 'Painted sky ceiling with gold moldings', image: skyCeiling },
  { id: 155, title: 'Outdoor Kitchen', titleEs: 'Cocina Exterior', category: 'Archive', description: 'Brick outdoor kitchen with sink', image: outdoorKitchen },
  { id: 156, title: 'Female Sculpture', titleEs: 'Escultura Femenina', category: 'Archive', description: 'Classical female figure sculpture in workshop', image: femaleSculpture },
  { id: 157, title: 'Ornate Facade', titleEs: 'Fachada Ornamentada', category: 'Archive', description: 'Historic facade restoration with detailed moldings', image: ornateFacade },
  { id: 158, title: 'Coffered Atrium', titleEs: 'Atrio Artesonado', category: 'Archive', description: 'Grand atrium with coffered ceiling and ionic columns', image: cofferedAtrium },
  { id: 159, title: 'Rustic Fireplace', titleEs: 'Chimenea Rústica', category: 'Archive', description: 'Large brick fireplace complex with wood storage', image: rusticFireplace },
  { id: 160, title: 'White Rosette', titleEs: 'Roseta Blanca', category: 'Archive', description: 'Ornate white ceiling rosette with baroque details', image: whiteRosette },
  { id: 161, title: 'Floral Wall Relief', titleEs: 'Relieve Floral de Pared', category: 'Archive', description: 'Elegant white floral wall bas-relief', image: floralWallRelief },
  { id: 162, title: 'Window Columns', titleEs: 'Columnas de Ventana', category: 'Archive', description: 'Corinthian columns framing large window', image: windowColumns },
  { id: 163, title: 'Terracotta Column', titleEs: 'Columna Terracota', category: 'Archive', description: 'Faux terracotta marble column outdoor', image: terracottaColumn },
  { id: 164, title: 'Baroque Portal', titleEs: 'Portal Barroco', category: 'Archive', description: 'Ornate baroque doorway with relief panels', image: baroquePortal },
  { id: 165, title: 'Active Fireplace', titleEs: 'Chimenea Activa', category: 'Archive', description: 'Brick fireplace with active fire', image: activeFireplace },
  { id: 166, title: 'Golden Archway', titleEs: 'Arco Dorado', category: 'Archive', description: 'Grand archway with gold Corinthian columns', image: goldenArchway },
  { id: 167, title: 'Faux Marble Base', titleEs: 'Base de Mármol Falso', category: 'Archive', description: 'Column base with green marble inlay', image: fauxMarbleBase },
  { id: 168, title: 'Workshop Elements', titleEs: 'Elementos de Taller', category: 'Archive', description: 'Architectural elements in production', image: workshopElements },
  { id: 169, title: 'Estate Fence', titleEs: 'Cerca de Finca', category: 'Archive', description: 'Decorative estate fence with lanterns', image: estateFence },
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
