import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, FileText, Trash2, ShoppingBag } from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import QuoteRequestForm from './QuoteRequestForm';

const QuoteBasket = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, clearQuote } = useQuote();
  const { language } = useLanguage();
  const [showForm, setShowForm] = useState(false);

  const estimatedTotal = items.reduce((sum, item) => {
    const sqFt = (item.dimensions.width * item.dimensions.height) / 144;
    return sum + (sqFt * item.pricePerSqFt * item.quantity);
  }, 0);

  return (
    <>
      {/* Floating Quote Button */}
      <AnimatePresence>
        {totalItems > 0 && !isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-40 flex items-center gap-3 px-5 py-3.5 rounded-full bg-card border border-primary/30 text-foreground shadow-lg shadow-primary/10 hover:border-primary/50 hover:shadow-primary/20 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <FileText className="w-5 h-5 text-primary" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span className="font-medium text-sm tracking-wide text-foreground">
              {language === 'en' ? 'Request Quote' : 'Solicitar Cotización'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quote Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-xl text-foreground">
                    {language === 'en' ? 'Quote List' : 'Lista de Cotización'}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    ({totalItems} {language === 'en' ? 'items' : 'artículos'})
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      {language === 'en' 
                        ? 'Your quote list is empty' 
                        : 'Tu lista de cotización está vacía'
                      }
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4 p-4 bg-card border border-border/50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.dimensions.width}" × {item.dimensions.height}" × {item.dimensions.depth}"
                        </p>
                        <p className="text-sm text-primary font-medium">
                          ${item.pricePerSqFt.toFixed(2)}/sq ft
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2 bg-muted rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-background rounded-full transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-background rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {language === 'en' ? 'Estimated Total' : 'Total Estimado'}
                    </span>
                    <span className="font-display text-xl text-foreground">
                      ${estimatedTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {language === 'en' 
                      ? 'Final pricing will be confirmed after consultation.'
                      : 'El precio final se confirmará después de la consulta.'
                    }
                  </p>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={clearQuote}
                      className="px-4 py-3 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                    >
                      {language === 'en' ? 'Clear' : 'Limpiar'}
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setShowForm(true);
                      }}
                      className="flex-1 py-3 rounded-lg btn-gold text-sm font-medium"
                    >
                      {language === 'en' ? 'Request Quote' : 'Solicitar Cotización'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quote Request Form Modal */}
      <QuoteRequestForm 
        isOpen={showForm} 
        onClose={() => setShowForm(false)} 
      />
    </>
  );
};

export default QuoteBasket;
