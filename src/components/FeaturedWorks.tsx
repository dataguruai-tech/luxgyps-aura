import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { useState } from 'react';

// Gallery images
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

const works = [
  {
    id: 1,
    title: "The Golden Wave",
    category: "Wall Panel",
    description: "Abstract fluid dynamics captured in brushed gold finish with LED backlighting",
    image: goldenWave,
    size: "large",
  },
  {
    id: 2,
    title: "Poseidon's Gaze",
    category: "High Relief",
    description: "Classical mythology meets contemporary sculptural technique",
    image: poseidon,
    size: "medium",
  },
  {
    id: 3,
    title: "The Eye",
    category: "Light Sculpture",
    description: "Circular iris-like form with integrated ambient lighting",
    image: theEye,
    size: "medium",
  },
  {
    id: 4,
    title: "Bronze Living",
    category: "Interior Installation",
    description: "Luxurious quilted bronze panel with LED frame in contemporary living space",
    image: bronzeLiving,
    size: "large",
  },
  {
    id: 5,
    title: "Rhino Breakthrough",
    category: "3D Installation",
    description: "Dramatic wildlife sculpture emerging through architectural elements",
    image: rhino,
    size: "large",
  },
  {
    id: 6,
    title: "Renaissance Swirl",
    category: "Monumental Relief",
    description: "Complex multi-figure sculptural composition in classical style",
    image: renaissanceSwirl,
    size: "medium",
  },
  {
    id: 7,
    title: "Hex Matrix",
    category: "LED Panel",
    description: "Geometric 3D wall with dynamic amber backlighting",
    image: hexGlow,
    size: "small",
  },
  {
    id: 8,
    title: "The Submerged Hunter",
    category: "High Relief",
    description: "Hyper-realistic crocodile emerging from turbulent waters",
    image: crocodile,
    size: "medium",
  },
  {
    id: 9,
    title: "African Queen",
    category: "Portrait Relief",
    description: "Serene feminine form with intricate tribal patterns",
    image: africanQueen,
    size: "small",
  },
  {
    id: 10,
    title: "Quilted Geometry",
    category: "Wall Panel",
    description: "Soft organic forms in warm bronze with LED frame",
    image: quiltedPanel,
    size: "small",
  },
  {
    id: 10,
    title: "White Rays",
    category: "Ceiling Panel",
    description: "Dynamic linear composition in pristine white gypsum",
    image: whiteRays,
    size: "large",
  },
];

const FeaturedWorks = () => {
  const { isGallery } = useMode();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="max-w-4xl mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary" />
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-medium">
              {isGallery ? "Featured Works" : "Recent Projects"}
            </p>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            {isGallery ? (
              <>Sculptural <span className="text-gradient-gold italic">Masterpieces</span></>
            ) : (
              <>Project <span className="text-gradient-gold italic">Portfolio</span></>
            )}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            {isGallery 
              ? "Each piece is a unique collaboration between artisan craftsmanship and architectural vision. We produce, we install, we guarantee—for 5 years."
              : "Browse our completed installations with full technical specifications and CAD files available for your next project."}
          </p>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {works.map((work, index) => {
            const isLarge = work.size === 'large';
            
            return (
              <motion.article
                key={work.id}
                className={`group relative overflow-hidden rounded-lg cursor-pointer ${
                  isLarge ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(work.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className={`relative overflow-hidden ${
                  isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]'
                }`}>
                  {/* Image */}
                  <motion.img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredId === work.id ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                  
                  {/* Gold Frame on Hover */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === work.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-4 border border-primary/60 rounded-sm" />
                  </motion.div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 right-0 w-full h-px bg-primary" />
                    <div className="absolute top-0 right-0 w-px h-full bg-primary" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-primary text-xs font-medium tracking-wider uppercase mb-2">
                          {work.category}
                        </p>
                        <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-foreground mb-2 leading-tight">
                          {work.title}
                        </h3>
                        <motion.p 
                          className="text-muted-foreground text-sm line-clamp-2 max-w-md"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: hoveredId === work.id ? 1 : 0,
                            y: hoveredId === work.id ? 0 : 10 
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {work.description}
                        </motion.p>
                      </div>
                      
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary/50 flex items-center justify-center bg-background/20 backdrop-blur-sm"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: hoveredId === work.id ? 1 : 0.8,
                          opacity: hoveredId === work.id ? 1 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary))' }}
                      >
                        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Index Number */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-display text-5xl md:text-6xl text-primary/20 font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div 
          className="flex justify-center mt-16 md:mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="#all-works"
            className="group relative flex items-center gap-4 px-10 py-5 rounded-full overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background */}
            <div className="absolute inset-0 border border-primary/50 rounded-full transition-colors group-hover:border-primary group-hover:bg-primary/5" />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="font-medium text-foreground relative z-10">View Complete Portfolio</span>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center relative z-10 group-hover:bg-primary transition-colors">
              <ArrowUpRight className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
