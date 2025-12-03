import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useCallback, useRef, useState } from 'react';
import TextureLoupe from './TextureLoupe';

interface Work {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  work: Work | null;
  works: Work[];
  onNavigate: (direction: 'prev' | 'next') => void;
}

const ImageLightbox = ({ isOpen, onClose, work, works, onNavigate }: ImageLightboxProps) => {
  const currentIndex = work ? works.findIndex(w => w.id === work.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < works.length - 1;
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && hasPrev) onNavigate('prev');
    if (e.key === 'ArrowRight' && hasNext) onNavigate('next');
  }, [onClose, onNavigate, hasPrev, hasNext]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!work) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-10 p-3 rounded-full bg-card/80 border border-border hover:bg-card transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.button>

            {/* Navigation - Previous */}
            {hasPrev && (
              <motion.button
                onClick={() => onNavigate('prev')}
                className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-card/80 border border-border hover:bg-card transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </motion.button>
            )}

            {/* Navigation - Next */}
            {hasNext && (
              <motion.button
                onClick={() => onNavigate('next')}
                className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-card/80 border border-border hover:bg-card transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </motion.button>
            )}

            {/* Image Container */}
            <motion.div
              className="relative max-w-6xl w-full max-h-[85vh] flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold Frame */}
              <div 
                ref={imageContainerRef}
                className="relative rounded-lg overflow-hidden border-2 border-primary/30 shadow-2xl cursor-none"
                onMouseEnter={() => setIsHoveringImage(true)}
                onMouseLeave={() => setIsHoveringImage(false)}
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-primary z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-primary z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-primary z-10 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-primary z-10 pointer-events-none" />

                {/* Image */}
                <motion.img
                  key={work.id}
                  src={work.image}
                  alt={work.title}
                  className="w-full max-h-[70vh] object-contain bg-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Texture Loupe */}
                <AnimatePresence>
                  {isHoveringImage && (
                    <TextureLoupe
                      imageSrc={work.image}
                      isActive={true}
                      containerRef={imageContainerRef}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Info Panel */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-primary text-sm font-medium tracking-wider uppercase mb-2">
                  {work.category}
                </p>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                  {work.title}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                  {work.description}
                </p>
                
                {/* Image Counter */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">
                    {currentIndex + 1} / {works.length}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
