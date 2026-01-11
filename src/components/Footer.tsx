import { motion } from 'framer-motion';
import { Instagram, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/luxgyps-logo.svg';

// Custom TikTok icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Custom Facebook icon
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Footer = () => {
  const { language, t } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/luxgyps', label: 'Instagram' },
    { icon: TikTokIcon, href: 'https://tiktok.com/@luxgyps', label: 'TikTok' },
    { icon: FacebookIcon, href: 'https://facebook.com/luxgyps', label: 'Facebook' },
  ];

  const navItems = [
    { label: language === 'en' ? 'About' : 'Nosotros', href: '#about' },
    { label: language === 'en' ? 'Portfolio' : 'Portafolio', href: '#portfolio' },
    { label: language === 'en' ? 'Catalog' : 'Catálogo', href: '#catalog' },
    { label: language === 'en' ? 'Gallery' : 'Galería', href: '#gallery' },
    { label: language === 'en' ? 'Services' : 'Servicios', href: '#process' },
    { label: language === 'en' ? 'Contact' : 'Contacto', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative bg-card border-t border-border/20">
      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 pt-20 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <motion.a 
              href="/" 
              className="inline-flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} alt="LuxGyps" className="h-14 w-auto" />
              <span className="font-display text-3xl tracking-wide">
                <span className="text-foreground">Lux</span>
                <span className="text-primary">Gyps</span>
              </span>
            </motion.a>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">
              {t.footer.desc}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-xs uppercase tracking-[0.25em] text-primary mb-6">
              {language === 'en' ? 'Navigation' : 'Navegación'}
            </h4>
            <ul className="space-y-3">
              {navItems.map((link) => (
                <li key={link.label}>
                  <motion.a 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-xs uppercase tracking-[0.25em] text-primary mb-6">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-4">
              <li>
                <motion.a 
                  href="tel:+17543001010"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <Phone className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
                  <span>+1 (754) 300-1010</span>
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="mailto:hello@luxgyps.com"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <Mail className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
                  <span>hello@luxgyps.com</span>
                </motion.a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
                  <span>{t.footer.location}<br />Florida, USA</span>
                </div>
              </li>
            </ul>
          </div>

          {/* CTA Column */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-xs uppercase tracking-[0.25em] text-primary mb-6">
              {language === 'en' ? 'Get Started' : 'Comenzar'}
            </h4>
            <motion.a 
              href="tel:+17543001010"
              className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{language === 'en' ? 'Request Quote' : 'Solicitar Cotización'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
            
            <p className="mt-4 text-xs text-muted-foreground/70">
              {language === 'en' ? '5-Year Guarantee on all projects' : 'Garantía de 5 años en todos los proyectos'}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-muted-foreground/70 order-2 md:order-1">
              © {new Date().getFullYear()} LuxGyps. {t.footer.rights}
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6 order-1 md:order-2">
              <motion.a 
                href="#privacy" 
                className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
                whileHover={{ y: -1 }}
              >
                {t.footer.privacy}
              </motion.a>
              <motion.a 
                href="#terms" 
                className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
                whileHover={{ y: -1 }}
              >
                {t.footer.terms}
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
