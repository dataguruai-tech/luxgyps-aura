import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface QuoteItem {
  id: string;
  title: string;
  category: string;
  image: string;
  pricePerSqFt: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  quantity: number;
}

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearQuote: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  totalItems: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((newItem: Omit<QuoteItem, 'quantity'>) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === newItem.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  }, [removeItem]);

  const clearQuote = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <QuoteContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearQuote,
      isOpen,
      setIsOpen,
      totalItems,
    }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within QuoteProvider');
  }
  return context;
};
