import { motion } from 'framer-motion';
import { Layers3, Frame, Columns, Flame, LayoutGrid, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Category {
  id: string;
  label: string;
  labelEs: string;
  icon: React.ElementType;
  count: number;
}

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySidebar = ({ categories, activeCategory, onCategoryChange }: CategorySidebarProps) => {
  const { language } = useLanguage();

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="lg:sticky lg:top-32 space-y-2">
        <h3 className="font-display text-lg text-foreground mb-4 px-3">
          {language === 'en' ? 'Categories' : 'Categorías'}
        </h3>
        
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                isActive
                  ? 'bg-primary/10 border border-primary/30 text-primary'
                  : 'hover:bg-muted/50 text-foreground/70 hover:text-foreground'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="flex-1 font-medium text-sm">
                {language === 'en' ? category.label : category.labelEs}
              </span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {category.count}
              </span>
            </motion.button>
          );
        })}

        {/* Trade Program CTA */}
        <div className="mt-8 p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              {language === 'en' ? 'Trade Program' : 'Programa Profesional'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {language === 'en' 
              ? 'Architects & designers get exclusive pricing and priority support.'
              : 'Arquitectos y diseñadores obtienen precios exclusivos y soporte prioritario.'
            }
          </p>
          <motion.a
            href="#trade-register"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            whileHover={{ x: 2 }}
          >
            {language === 'en' ? 'Apply Now →' : 'Aplicar Ahora →'}
          </motion.a>
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;
