import { motion } from 'framer-motion';
import { Award, Shield, Hammer, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Hammer,
    title: "Artisan Crafted",
    description: "Every piece hand-finished by master sculptors with decades of experience."
  },
  {
    icon: Shield,
    title: "5-Year Guarantee",
    description: "Full structural warranty on all installations. We stand behind our work."
  },
  {
    icon: Award,
    title: "Miami's Premier",
    description: "Trusted by top designers, architects, and luxury homeowners since 2009."
  },
  {
    icon: Sparkles,
    title: "Turnkey Solutions",
    description: "From concept to installation. We handle design, production, and fitting."
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-medium mb-4">
              About LuxGyps
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Not a Store.<br />
              <span className="text-gradient-gold italic">An Atelier.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              We are not a "supermarket of stucco." LuxGyps is an artisan studio where 
              every sculptural element is conceived, designed, and handcrafted specifically 
              for your space. This is bespoke craftsmanship at its finest.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Based in Miami's Design District, we serve discerning clients throughout 
              South Florida—from Star Island mansions to Coral Gables historic restorations, 
              from Brickell penthouses to Palm Beach estates.
            </p>

            {/* CTA */}
            <motion.a
              href="tel:+17543001010"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full btn-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a Studio Visit
            </motion.a>
          </motion.div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
