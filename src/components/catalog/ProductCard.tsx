import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { useQuote } from '@/context/QuoteContext';
import { useLanguage } from '@/context/LanguageContext';

interface ProductCardProps {
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
}

const ProductCard = ({ id, title, category, image, pricePerSqFt, dimensions }: ProductCardProps) => {
  const { addItem, items } = useQuote();
  const { language } = useLanguage();
  const [isAdding, setIsAdding] = useState(false);
  
  const isInQuote = items.some(item => item.id === id);

  const handleAddToQuote = () => {
    setIsAdding(true);
    addItem({ id, title, category, image, pricePerSqFt, dimensions });
    setTimeout(() => setIsAdding(false), 600);
  };

  const formatDimensions = () => {
    return `${dimensions.width}" × ${dimensions.height}" × ${dimensions.depth}"`;
  };

  return (
    <motion.article
      className="group bg-card border border-border/50 rounded-lg overflow-hidden hover:border-primary/50 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium tracking-wider uppercase text-primary rounded">
            {category}
          </span>
        </div>

        {/* Quick Add Overlay */}
        <motion.div 
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.button
            onClick={handleAddToQuote}
            className={`px-6 py-3 rounded-full font-medium text-sm tracking-wide flex items-center gap-2 transition-all duration-300 ${
              isInQuote || isAdding
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-foreground hover:bg-primary hover:text-primary-foreground'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4" />
                {language === 'en' ? 'Added!' : '¡Añadido!'}
              </>
            ) : isInQuote ? (
              <>
                <Check className="w-4 h-4" />
                {language === 'en' ? 'In Quote' : 'En Cotización'}
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                {language === 'en' ? 'Add to Quote' : 'Añadir a Cotización'}
              </>
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="font-display text-lg md:text-xl text-foreground mb-2 line-clamp-1">
          {title}
        </h3>
        
        {/* Specs */}
        <p className="text-xs text-muted-foreground mb-3 font-mono tracking-wide">
          {formatDimensions()}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-lg font-semibold text-primary">
            ${pricePerSqFt.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">
            / sq ft
          </span>
        </div>

        {/* Add to Quote Button */}
        <motion.button
          onClick={handleAddToQuote}
          className={`w-full py-3 rounded-md font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${
            isInQuote
              ? 'bg-primary/10 text-primary border border-primary/30'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
          whileTap={{ scale: 0.98 }}
        >
          {isInQuote ? (
            <>
              <Check className="w-4 h-4" />
              {language === 'en' ? 'Added to Quote' : 'Añadido'}
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              {language === 'en' ? 'Add to Quote' : 'Añadir a Cotización'}
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
};

export default ProductCard;
