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
  const lineLength = 80;

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
        className="absolute bg-primary"
        style={{
          width: lineLength * 2,
          height: 2,
          left: -lineLength,
          top: -1,
          boxShadow: '0 0 8px hsl(var(--primary) / 0.6)',
        }}
      />
      
      {/* Vertical line */}
      <div 
        className="absolute bg-primary"
        style={{
          width: 2,
          height: lineLength * 2,
          left: -1,
          top: -lineLength,
          boxShadow: '0 0 8px hsl(var(--primary) / 0.6)',
        }}
      />

      {/* Center dot */}
      <div 
        className="absolute w-3 h-3 bg-primary rounded-full"
        style={{
          left: -6,
          top: -6,
          boxShadow: '0 0 12px hsl(var(--primary) / 0.8)',
        }}
      />

      {/* X dimension (horizontal position) */}
      <div 
        className="absolute"
        style={{
          left: 10,
          top: -lineLength - 6,
        }}
      >
        <span className="text-xs font-mono text-primary font-semibold tracking-wider bg-background/95 px-2 py-1 rounded border border-primary/40 whitespace-nowrap shadow-lg">
          X: {dimensions.width}"
        </span>
      </div>

      {/* Y dimension (vertical position) */}
      <div 
        className="absolute"
        style={{
          left: lineLength + 10,
          top: -10,
        }}
      >
        <span className="text-xs font-mono text-primary font-semibold tracking-wider bg-background/95 px-2 py-1 rounded border border-primary/40 whitespace-nowrap shadow-lg">
          Y: {dimensions.height}"
        </span>
      </div>

      {/* Coordinates label (bottom-left) */}
      <div 
        className="absolute whitespace-nowrap"
        style={{
          left: -lineLength,
          top: lineLength + 10,
        }}
      >
        <span className="text-[10px] font-mono text-primary font-medium tracking-wide bg-background/90 px-2 py-1 rounded border border-primary/30">
          SPEC MODE
        </span>
      </div>

      {/* Corner brackets for architectural feel */}
      <svg 
        className="absolute text-primary/70"
        width="24" 
        height="24"
        style={{ left: -lineLength - 12, top: -lineLength - 12 }}
      >
        <path d="M0 18 L0 0 L18 0" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg 
        className="absolute text-primary/70"
        width="24" 
        height="24"
        style={{ left: lineLength - 6, top: -lineLength - 12 }}
      >
        <path d="M6 0 L24 0 L24 18" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg 
        className="absolute text-primary/70"
        width="24" 
        height="24"
        style={{ left: -lineLength - 12, top: lineLength - 6 }}
      >
        <path d="M0 6 L0 24 L18 24" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg 
        className="absolute text-primary/70"
        width="24" 
        height="24"
        style={{ left: lineLength - 6, top: lineLength - 6 }}
      >
        <path d="M6 24 L24 24 L24 6" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </motion.div>
  );
};

export default CrosshairCursor;
