import { motion } from 'framer-motion';
import { Award, Shield, Hammer, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Hammer,
      title: t.about.feature1Title,
      description: t.about.feature1Desc
    },
    {
      icon: Shield,
      title: t.about.feature2Title,
      description: t.about.feature2Desc
    },
    {
      icon: Award,
      title: t.about.feature3Title,
      description: t.about.feature3Desc
    },
    {
      icon: Sparkles,
      title: t.about.feature4Title,
      description: t.about.feature4Desc
    }
  ];

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
              {t.about.eyebrow}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              {t.about.title1}<br />
              <span className="text-gradient-gold italic">{t.about.title2}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {t.about.desc1}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              {t.about.desc2}
            </p>

            {/* CTA */}
            <motion.a
              href="tel:+17543001010"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full btn-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.about.cta}
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
