import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

const Stats = () => {
  const { t } = useLanguage();

  const stats = [
    { value: 250, suffix: '+', label: t.stats.projects },
    { value: 25, suffix: '+', label: t.stats.years },
    { value: 5, suffix: ' Year', label: t.stats.guarantee },
    { value: 100, suffix: '%', label: t.stats.satisfaction },
  ];

  return (
    <section className="relative z-20 py-20 md:py-28 bg-background border-y border-border/30 mt-[-1px]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="font-sans font-semibold text-4xl md:text-5xl lg:text-6xl text-gradient-gold mb-3">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted-foreground text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
