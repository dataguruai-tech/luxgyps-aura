import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import roseRelief from '@/assets/rose-relief.jpg';
import goldenWave from '@/assets/golden-wave.jpg';
import poseidonRelief from '@/assets/poseidon-relief.jpg';
import rhinoRelief from '@/assets/rhino-relief.jpg';

const works = [
  {
    id: 1,
    title: "The Rose Spiral",
    category: "Ceiling Relief",
    description: "Monumental organic rose form sculpted in architectural gypsum",
    image: roseRelief,
  },
  {
    id: 2,
    title: "Golden Wave",
    category: "Wall Panel",
    description: "Abstract fluid dynamics captured in brushed gold finish with LED backlighting",
    image: goldenWave,
  },
  {
    id: 3,
    title: "Poseidon's Gaze",
    category: "High Relief",
    description: "Classical mythology meets contemporary sculptural technique",
    image: poseidonRelief,
  },
  {
    id: 4,
    title: "Rhino Breakthrough",
    category: "3D Installation",
    description: "Dramatic wildlife sculpture emerging through architectural elements",
    image: rhinoRelief,
  },
];

const FeaturedWorks = () => {
  const { isGallery } = useMode();

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-medium mb-4">
            {isGallery ? "Featured Works" : "Recent Projects"}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            {isGallery ? (
              <>Sculptural <span className="text-gradient-gold italic">Masterpieces</span></>
            ) : (
              <>Project <span className="text-gradient-gold italic">Portfolio</span></>
            )}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {isGallery 
              ? "Each piece is a unique collaboration between artisan craftsmanship and architectural vision. We produce, we install, we guarantee—for 5 years."
              : "Browse our completed installations with full technical specifications and CAD files available for your next project."}
          </p>
        </motion.div>

        {/* Works Grid - Masonry Style */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Large Featured Item */}
          <motion.article
            className="group relative overflow-hidden rounded-lg cursor-pointer md:row-span-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[3/4] md:aspect-auto md:h-full overflow-hidden">
              <motion.img
                src={works[0].image}
                alt={works[0].title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-primary text-sm font-medium mb-2">{works[0].category}</p>
                  <h3 className="font-display text-3xl text-foreground mb-2">{works[0].title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {works[0].description}
                  </p>
                </div>
                <motion.div
                  className="flex-shrink-0 w-14 h-14 rounded-full border border-primary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowUpRight className="w-6 h-6 text-primary" />
                </motion.div>
              </div>
            </div>
            <div className="absolute top-6 right-6 w-10 h-10">
              <div className="absolute top-0 right-0 w-full h-px bg-primary/40" />
              <div className="absolute top-0 right-0 w-px h-full bg-primary/40" />
            </div>
          </motion.article>

          {/* Smaller Items */}
          {works.slice(1).map((work, index) => (
            <motion.article
              key={work.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.15 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <motion.img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-primary text-sm font-medium mb-2">{work.category}</p>
                    <h3 className="font-display text-2xl text-foreground mb-2">{work.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {work.description}
                    </p>
                  </div>
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8">
                <div className="absolute top-0 right-0 w-full h-px bg-primary/40" />
                <div className="absolute top-0 right-0 w-px h-full bg-primary/40" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="#all-works"
            className="group flex items-center gap-3 px-8 py-4 rounded-full btn-outline-gold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-medium">View All Projects</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
