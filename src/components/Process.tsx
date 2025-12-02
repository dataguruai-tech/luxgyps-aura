import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Box, Hammer, Paintbrush, CheckCircle2 } from 'lucide-react';
import { useMode } from '@/context/ModeContext';

const steps = [
  {
    icon: Lightbulb,
    title: "Concept",
    description: "We begin with your vision, translating ideas into sculptural possibilities.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Detailed sketches and 3D modeling bring the concept to life digitally.",
  },
  {
    icon: Box,
    title: "Mold Creation",
    description: "CNC precision combined with hand-sculpting creates the master form.",
  },
  {
    icon: Hammer,
    title: "Casting",
    description: "Expert artisans pour and cure premium gypsum compositions.",
  },
  {
    icon: Paintbrush,
    title: "Finishing",
    description: "Hand-applied finishes from matte white to brushed gold.",
  },
  {
    icon: CheckCircle2,
    title: "Installation",
    description: "Professional installation with 5-year structural guarantee.",
  },
];

const Process = () => {
  const { isGallery } = useMode();

  return (
    <section id="process" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-medium mb-4">
            Our Craft
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            {isGallery ? (
              <>The <span className="text-gradient-gold italic">Artisan</span> Process</>
            ) : (
              <>Technical <span className="text-gradient-gold italic">Workflow</span></>
            )}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From initial concept to final installation, every step is executed with precision and passion. 
            This is not mass production—this is bespoke artistry.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="group relative p-8 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-background border border-primary/50 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">{String(index + 1).padStart(2, '0')}</span>
              </div>

              {/* Icon */}
              <motion.div 
                className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <step.icon className="w-6 h-6 text-primary" />
              </motion.div>

              {/* Content */}
              <h3 className="font-display text-xl text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

              {/* Connector Line (except last in row) */}
              {index % 3 !== 2 && index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl border border-primary/20 bg-card/30 backdrop-blur-sm">
            <div className="text-left">
              <p className="font-display text-2xl text-foreground mb-1">Ready to Transform Your Space?</p>
              <p className="text-muted-foreground">Book a consultation and receive a custom proposal within 48 hours.</p>
            </div>
            <motion.a
              href="#contact"
              className="whitespace-nowrap px-8 py-4 rounded-full btn-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Consultation
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
