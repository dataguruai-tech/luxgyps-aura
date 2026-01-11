import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers3, Frame, Columns, Flame, LayoutGrid, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from './ProductCard';
import CategorySidebar from './CategorySidebar';

// Import product images
import quiltedPanel from '@/assets/gallery/quilted-panel.jpg';
import renaissanceSwirl from '@/assets/gallery/renaissance-swirl.jpg';
import hexGlow from '@/assets/gallery/hex-glow.jpg';
import theEye from '@/assets/gallery/the-eye.jpg';
import poseidon from '@/assets/gallery/poseidon.jpg';
import rhino from '@/assets/gallery/rhino.jpg';
import goldenWave from '@/assets/gallery/golden-wave.jpg';
import crocodile from '@/assets/gallery/crocodile.jpg';
import africanQueen from '@/assets/gallery/african-queen.jpg';
import whiteRays from '@/assets/gallery/white-rays.jpg';
import bronzeLiving from '@/assets/gallery/bronze-living.jpg';

// Archive images for more products
import ceilingMedallion from '@/assets/archive/ceiling-medallion.jpg';
import floralCeiling from '@/assets/archive/floral-ceiling.jpg';
import baroqueMedallion from '@/assets/archive/baroque-medallion.jpg';
import whiteRosette from '@/assets/archive/white-rosette.jpg';
import rococoFrame from '@/assets/archive/rococo-frame.jpg';
import geometricWall from '@/assets/archive/geometric-wall.jpg';
import corinthianColumns from '@/assets/archive/corinthian-columns.jpg';
import goldPilasters from '@/assets/archive/gold-pilasters.jpg';
import interiorColumn from '@/assets/archive/interior-column.jpg';
import marbleFireplace from '@/assets/archive/marble-fireplace.jpg';
import brickFireplace from '@/assets/archive/brick-fireplace.jpg';
import rusticFireplace from '@/assets/archive/rustic-fireplace.jpg';

interface Product {
  id: string;
  title: string;
  titleEs: string;
  category: string;
  image: string;
  pricePerSqFt: number;
  dimensions: { width: number; height: number; depth: number };
}

const products: Product[] = [
  // 3D Panels
  { id: 'panel-1', title: 'Art Deco Wave Panel', titleEs: 'Panel Onda Art Deco', category: 'panels', image: goldenWave, pricePerSqFt: 24.99, dimensions: { width: 48, height: 48, depth: 3 } },
  { id: 'panel-2', title: 'Quilted Diamond Panel', titleEs: 'Panel Diamante Acolchado', category: 'panels', image: quiltedPanel, pricePerSqFt: 29.99, dimensions: { width: 36, height: 36, depth: 4 } },
  { id: 'panel-3', title: 'Hexagonal LED Panel', titleEs: 'Panel Hexagonal LED', category: 'panels', image: hexGlow, pricePerSqFt: 44.99, dimensions: { width: 48, height: 48, depth: 2 } },
  { id: 'panel-4', title: 'White Linear Rays', titleEs: 'Rayos Lineales Blancos', category: 'panels', image: whiteRays, pricePerSqFt: 19.99, dimensions: { width: 72, height: 36, depth: 2 } },
  { id: 'panel-5', title: 'Geometric Backlit Panel', titleEs: 'Panel Geométrico Retroiluminado', category: 'panels', image: geometricWall, pricePerSqFt: 54.99, dimensions: { width: 48, height: 96, depth: 3 } },
  { id: 'panel-6', title: 'Bronze Living Panel', titleEs: 'Panel Living Bronce', category: 'panels', image: bronzeLiving, pricePerSqFt: 39.99, dimensions: { width: 60, height: 48, depth: 4 } },
  
  // Moldings & Rosettes
  { id: 'mold-1', title: 'Baroque Ceiling Medallion', titleEs: 'Medallón de Techo Barroco', category: 'moldings', image: baroqueMedallion, pricePerSqFt: 89.99, dimensions: { width: 36, height: 36, depth: 6 } },
  { id: 'mold-2', title: 'Classic White Rosette', titleEs: 'Roseta Blanca Clásica', category: 'moldings', image: whiteRosette, pricePerSqFt: 64.99, dimensions: { width: 24, height: 24, depth: 4 } },
  { id: 'mold-3', title: 'Floral Ceiling Relief', titleEs: 'Relieve de Techo Floral', category: 'moldings', image: floralCeiling, pricePerSqFt: 34.99, dimensions: { width: 48, height: 48, depth: 3 } },
  { id: 'mold-4', title: 'Grand Medallion', titleEs: 'Gran Medallón', category: 'moldings', image: ceilingMedallion, pricePerSqFt: 124.99, dimensions: { width: 48, height: 48, depth: 8 } },
  { id: 'mold-5', title: 'Rococo Wall Frame', titleEs: 'Marco de Pared Rococó', category: 'moldings', image: rococoFrame, pricePerSqFt: 44.99, dimensions: { width: 36, height: 48, depth: 3 } },
  
  // Columns & Pilasters
  { id: 'col-1', title: 'Corinthian Column', titleEs: 'Columna Corintia', category: 'columns', image: corinthianColumns, pricePerSqFt: 149.99, dimensions: { width: 18, height: 96, depth: 18 } },
  { id: 'col-2', title: 'Gold Leaf Pilaster', titleEs: 'Pilastra con Hoja de Oro', category: 'columns', image: goldPilasters, pricePerSqFt: 199.99, dimensions: { width: 12, height: 108, depth: 6 } },
  { id: 'col-3', title: 'Interior Fluted Column', titleEs: 'Columna Acanalada Interior', category: 'columns', image: interiorColumn, pricePerSqFt: 119.99, dimensions: { width: 14, height: 96, depth: 14 } },
  
  // Fireplaces
  { id: 'fire-1', title: 'Classic Marble Mantel', titleEs: 'Manto de Mármol Clásico', category: 'fireplaces', image: marbleFireplace, pricePerSqFt: 299.99, dimensions: { width: 72, height: 54, depth: 12 } },
  { id: 'fire-2', title: 'Rustic Brick Surround', titleEs: 'Marco de Ladrillo Rústico', category: 'fireplaces', image: brickFireplace, pricePerSqFt: 179.99, dimensions: { width: 84, height: 60, depth: 18 } },
  { id: 'fire-3', title: 'Traditional Stone Hearth', titleEs: 'Hogar de Piedra Tradicional', category: 'fireplaces', image: rusticFireplace, pricePerSqFt: 219.99, dimensions: { width: 96, height: 72, depth: 24 } },
  
  // High Relief Sculptures
  { id: 'relief-1', title: 'Poseidon High Relief', titleEs: 'Alto Relieve Poseidón', category: 'reliefs', image: poseidon, pricePerSqFt: 199.99, dimensions: { width: 48, height: 72, depth: 8 } },
  { id: 'relief-2', title: 'African Queen Portrait', titleEs: 'Retrato Reina Africana', category: 'reliefs', image: africanQueen, pricePerSqFt: 249.99, dimensions: { width: 36, height: 48, depth: 6 } },
  { id: 'relief-3', title: 'Renaissance Swirl', titleEs: 'Espiral Renacentista', category: 'reliefs', image: renaissanceSwirl, pricePerSqFt: 279.99, dimensions: { width: 60, height: 72, depth: 10 } },
  { id: 'relief-4', title: 'The Eye Sculpture', titleEs: 'Escultura El Ojo', category: 'reliefs', image: theEye, pricePerSqFt: 189.99, dimensions: { width: 36, height: 36, depth: 8 } },
  { id: 'relief-5', title: 'Crocodile Emergence', titleEs: 'Emergencia del Cocodrilo', category: 'reliefs', image: crocodile, pricePerSqFt: 329.99, dimensions: { width: 72, height: 48, depth: 12 } },
  { id: 'relief-6', title: 'Rhino Breakthrough', titleEs: 'Ruptura del Rinoceronte', category: 'reliefs', image: rhino, pricePerSqFt: 399.99, dimensions: { width: 84, height: 60, depth: 18 } },
];

const categories = [
  { id: 'all', label: 'All Products', labelEs: 'Todos los Productos', icon: LayoutGrid, count: products.length },
  { id: 'panels', label: '3D Panels', labelEs: 'Paneles 3D', icon: Layers3, count: products.filter(p => p.category === 'panels').length },
  { id: 'moldings', label: 'Moldings & Rosettes', labelEs: 'Molduras y Rosetas', icon: Frame, count: products.filter(p => p.category === 'moldings').length },
  { id: 'columns', label: 'Columns & Pilasters', labelEs: 'Columnas y Pilastras', icon: Columns, count: products.filter(p => p.category === 'columns').length },
  { id: 'fireplaces', label: 'Fireplaces', labelEs: 'Chimeneas', icon: Flame, count: products.filter(p => p.category === 'fireplaces').length },
  { id: 'reliefs', label: 'High Reliefs', labelEs: 'Altos Relieves', icon: Layers3, count: products.filter(p => p.category === 'reliefs').length },
];

const ProductCatalog = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Number of items per row based on screen size (we'll show 2 rows = 8 items on desktop)
  const INITIAL_ITEMS = 8;

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const visibleProducts = isExpanded ? filteredProducts : filteredProducts.slice(0, INITIAL_ITEMS);
  const hasMore = filteredProducts.length > INITIAL_ITEMS;

  return (
    <section id="catalog" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="max-w-4xl mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary" />
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-medium">
              {language === 'en' ? 'Product Catalog' : 'Catálogo de Productos'}
            </p>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            {language === 'en' ? 'Shop Our' : 'Explora Nuestra'}{' '}
            <span className="text-gradient-gold italic">
              {language === 'en' ? 'Collection' : 'Colección'}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            {language === 'en'
              ? 'Browse our curated selection of architectural elements. Add items to your quote list and request professional pricing.'
              : 'Explore nuestra selección curada de elementos arquitectónicos. Añade artículos a tu lista y solicita precios profesionales.'
            }
          </p>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium"
          >
            {showMobileFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
            {language === 'en' ? 'Filter' : 'Filtrar'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={(cat) => {
                setActiveCategory(cat);
                setShowMobileFilters(false);
              }}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <ProductCard
                      id={product.id}
                      title={language === 'en' ? product.title : product.titleEs}
                      category={categories.find(c => c.id === product.category)?.label || product.category}
                      image={product.image}
                      pricePerSqFt={product.pricePerSqFt}
                      dimensions={product.dimensions}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Show More / Show Less Button */}
            {hasMore && (
              <motion.div 
                className="mt-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-primary/30 rounded-full text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <span className="font-medium tracking-wide">
                    {isExpanded 
                      ? (language === 'en' ? 'Show Less' : 'Mostrar Menos')
                      : (language === 'en' 
                          ? `View All ${filteredProducts.length} Products` 
                          : `Ver los ${filteredProducts.length} Productos`)
                    }
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-primary" />
                  </motion.div>
                </button>
              </motion.div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  {language === 'en' ? 'No products found in this category.' : 'No se encontraron productos en esta categoría.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
