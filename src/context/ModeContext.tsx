import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Mode = 'gallery' | 'pro';

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  isGallery: boolean;
  isPro: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('gallery');

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'pro') {
      root.classList.add('day-mode');
    } else {
      root.classList.remove('day-mode');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'gallery' ? 'pro' : 'gallery');
  };

  return (
    <ModeContext.Provider value={{
      mode,
      setMode,
      toggleMode,
      isGallery: mode === 'gallery',
      isPro: mode === 'pro',
    }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
