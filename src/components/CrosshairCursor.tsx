import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CrosshairCursorProps {
  isActive: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  maxWidth?: number; // Max dimension in inches for X axis
  maxHeight?: number; // Max dimension in inches for Y axis
}

const CrosshairCursor = ({ 
  isActive, 
  containerRef, 
  maxWidth = 96, 
  maxHeight = 72 
}: CrosshairCursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isOverButton, setIsOverButton] = useState(false);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      
      // Calculate position as percentage of container
      const percentX = Math.max(0, Math.min(1, relativeX / rect.width));
      const percentY = Math.max(0, Math.min(1, relativeY / rect.height));
      
      // Convert to inches based on position
      const widthInches = (percentX * maxWidth).toFixed(1);
      const heightInches = (percentY * maxHeight).toFixed(1);
      
      setPosition({ x: e.clientX, y: e.clientY });
      setDimensions({ 
        width: parseFloat(widthInches), 
        height: parseFloat(heightInches) 
      });
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, [role="button"]') !== null;
      setIsOverButton(isInteractive);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [isActive, containerRef, maxWidth, maxHeight]);

  if (!isActive) return null;
  
  const shouldShow = !isOverButton;
  const lineLength = 60;

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldShow ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {/* Horizontal line */}
      <div 
        className="absolute bg-primary/90"
        style={{
          width: lineLength * 2,
          height: 1,
          left: -lineLength,
          top: 0,
        }}
      />
      
      {/* Vertical line */}
      <div 
        className="absolute bg-primary/90"
        style={{
          width: 1,
          height: lineLength * 2,
          left: 0,
          top: -lineLength,
        }}
      />

      {/* Center dot */}
      <div 
        className="absolute w-1.5 h-1.5 bg-primary rounded-full"
        style={{
          left: -3,
          top: -3,
        }}
      />

      {/* X dimension (horizontal position) */}
      <motion.div 
        className="absolute flex items-center gap-1"
        style={{
          left: 8,
          top: -lineLength - 4,
        }}
        key={`x-${dimensions.width}`}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
      >
        <span className="text-[10px] font-mono text-primary tracking-wider bg-background/90 px-1.5 py-0.5 rounded border border-primary/20">
          X: {dimensions.width}"
        </span>
      </motion.div>

      {/* Y dimension (vertical position) */}
      <motion.div 
        className="absolute flex flex-col items-center gap-1"
        style={{
          left: lineLength + 8,
          top: -8,
        }}
        key={`y-${dimensions.height}`}
        initial={{ opacity: 0, x: -3 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.15 }}
      >
        <span className="text-[10px] font-mono text-primary tracking-wider bg-background/90 px-1.5 py-0.5 rounded border border-primary/20 whitespace-nowrap">
          Y: {dimensions.height}"
        </span>
      </motion.div>

      {/* Coordinates label (bottom-left) */}
      <div 
        className="absolute whitespace-nowrap"
        style={{
          left: -lineLength,
          top: lineLength + 8,
        }}
      >
        <span className="text-[9px] font-mono text-primary/70 tracking-wide bg-background/80 px-1.5 py-0.5 rounded">
          SPEC MODE
        </span>
      </div>

      {/* Corner brackets for architectural feel */}
      <svg 
        className="absolute text-primary/40"
        width="20" 
        height="20"
        style={{ left: -lineLength - 10, top: -lineLength - 10 }}
      >
        <path d="M0 15 L0 0 L15 0" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg 
        className="absolute text-primary/40"
        width="20" 
        height="20"
        style={{ left: lineLength - 5, top: -lineLength - 10 }}
      >
        <path d="M5 0 L20 0 L20 15" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg 
        className="absolute text-primary/40"
        width="20" 
        height="20"
        style={{ left: -lineLength - 10, top: lineLength - 5 }}
      >
        <path d="M0 5 L0 20 L15 20" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg 
        className="absolute text-primary/40"
        width="20" 
        height="20"
        style={{ left: lineLength - 5, top: lineLength - 5 }}
      >
        <path d="M5 20 L20 20 L20 5" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </motion.div>
  );
};

export default CrosshairCursor;
