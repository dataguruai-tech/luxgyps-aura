import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface TextureLoupeProps {
  imageSrc: string;
  isActive: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
}

const TextureLoupe = ({ imageSrc, isActive, containerRef }: TextureLoupeProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const loupeSize = 140;
  const zoomLevel = 1.8;

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Calculate the position for the zoomed image
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      setImagePosition({ x: percentX, y: percentY });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [isActive, containerRef]);

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
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
            backgroundSize: `${zoomLevel * 100}%`,
            backgroundPosition: `${imagePosition.x}% ${imagePosition.y}%`,
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
