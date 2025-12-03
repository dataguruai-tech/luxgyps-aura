import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface CrosshairCursorProps {
  isActive: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
}

const CrosshairCursor = ({ isActive, containerRef }: CrosshairCursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isOverButton, setIsOverButton] = useState(false);
  const animationRef = useRef<number>(0);

  // Generate random dimensions that change periodically
  useEffect(() => {
    if (!isActive) return;
    
    const generateDimensions = () => {
      // Random dimensions between 12" and 96" (typical architectural range)
      const widthInches = Math.floor(Math.random() * 84) + 12;
      const heightInches = Math.floor(Math.random() * 84) + 12;
      setDimensions({ width: widthInches, height: heightInches });
    };

    generateDimensions();
    const interval = setInterval(generateDimensions, 800);
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, [role="button"]') !== null;
      setIsOverButton(isInteractive);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [isActive, containerRef]);

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

      {/* Width dimension (top) */}
      <motion.div 
        className="absolute flex items-center gap-1"
        style={{
          left: 8,
          top: -lineLength - 4,
        }}
        key={dimensions.width}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-3 w-px bg-primary/60" />
        <span className="text-[10px] font-mono text-primary tracking-wider bg-background/80 px-1.5 py-0.5 rounded">
          {dimensions.width}"
        </span>
        <div className="h-3 w-px bg-primary/60" />
      </motion.div>

      {/* Height dimension (right) */}
      <motion.div 
        className="absolute flex flex-col items-center gap-1"
        style={{
          left: lineLength + 8,
          top: -20,
        }}
        key={dimensions.height}
        initial={{ opacity: 0, x: -3 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-3 h-px bg-primary/60" />
        <span className="text-[10px] font-mono text-primary tracking-wider bg-background/80 px-1.5 py-0.5 rounded whitespace-nowrap">
          {dimensions.height}"
        </span>
        <div className="w-3 h-px bg-primary/60" />
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
