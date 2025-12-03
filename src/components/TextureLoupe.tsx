import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TextureLoupeProps {
  imageSrc: string;
  isActive: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  size?: number;
  zoom?: number;
}

const TextureLoupe = ({ imageSrc, isActive, containerRef, size = 160, zoom = 10 }: TextureLoupeProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isOverButton, setIsOverButton] = useState(false);
  const loupeSize = size;
  const zoomLevel = zoom;

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    setContainerSize({ width: rect.width, height: rect.height });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setPosition({ x: e.clientX, y: e.clientY });
      setContainerSize({ width: rect.width, height: rect.height });
      
      // Calculate pixel offset for proper centering
      // The zoomed image should show what's under the cursor at the center of the loupe
      const bgX = -(x * zoomLevel - loupeSize / 2);
      const bgY = -(y * zoomLevel - loupeSize / 2);
      setImagePosition({ x: bgX, y: bgY });
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, [role="button"]') !== null;
      setIsOverButton(isInteractive);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [isActive, containerRef, zoomLevel, loupeSize]);

  if (!isActive) return null;
  
  const shouldShow = !isOverButton;

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: shouldShow ? 1 : 0, scale: shouldShow ? 1 : 0.8 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
      style={{
        left: position.x - loupeSize / 2,
        top: position.y - loupeSize / 2,
        width: loupeSize,
        height: loupeSize,
      }}
    >
      {/* Loupe container */}
      <div 
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          boxShadow: '0 0 0 3px hsl(var(--primary)), 0 0 20px rgba(212, 175, 55, 0.4), 0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {/* Zoomed image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${containerSize.width * zoomLevel}px ${containerSize.height * zoomLevel}px`,
            backgroundPosition: `${imagePosition.x}px ${imagePosition.y}px`,
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Crosshair overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-full h-px bg-primary/30" />
          <div className="absolute w-px h-full bg-primary/30" />
        </div>
        
        {/* Inner glow */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.2)',
          }}
        />
      </div>
      
      {/* Label */}
      <motion.div 
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-[10px] tracking-wider uppercase text-primary/80 font-medium bg-background/80 px-2 py-1 rounded">
          {zoomLevel}× Texture Detail
        </span>
      </motion.div>
    </motion.div>
  );
};

export default TextureLoupe;
