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
    { 
      icon: Instagram, 
      href: 'https://instagram.com/luxgyps', 
      label: 'Instagram'
    },
    { 
      icon: TikTokIcon, 
      href: 'https://tiktok.com/@luxgyps', 
      label: 'TikTok'
    },
    { 
      icon: FacebookIcon, 
      href: 'https://facebook.com/luxgyps', 
      label: 'Facebook'
    },
  ];

  const navItems = {
    about: { label: language === 'en' ? 'About Us' : 'Nosotros', href: '#about' },
    portfolio: { label: language === 'en' ? 'Interior Decor' : 'Decoración Interior', href: '#portfolio' },
    catalog: { label: language === 'en' ? 'Facade Decor' : 'Decoración Fachada', href: '#catalog' },
    gallery: { label: language === 'en' ? 'Gallery' : 'Galería', href: '#gallery' },
    services: { label: language === 'en' ? 'Services' : 'Servicios', href: '#process' },
    contacts: { label: language === 'en' ? 'Contacts' : 'Contactos', href: '#contact' },
  };

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
    <footer className="relative bg-card border-t border-border/30 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-primary/[0.05] pointer-events-none" />
      
      <div className="container relative mx-auto px-6 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <motion.a 
              href="/" 
              className="inline-flex items-center gap-3 mb-6 group"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} alt="LuxGyps" className="h-12 w-12 transition-transform group-hover:rotate-12" />
              <span className="font-display text-3xl tracking-wide">
                <span className="text-foreground">Lux</span>
                <span className="text-primary">Gyps</span>
              </span>
            </motion.a>
            
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed text-sm">
              {t.footer.desc}
            </p>
            
            {/* Social Links - Stylized */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-11 h-11 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 relative z-10" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-foreground mb-6">
              {language === 'en' ? 'Navigation' : 'Navegación'}
            </h4>
            <ul className="space-y-3">
              {Object.values(navItems).map((link) => (
                <li key={link.label}>
                  <motion.a 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-foreground mb-6">
              {t.footer.contactTitle}
            </h4>
            
            <div className="space-y-4">
              {/* Phone */}
              <motion.a 
                href="tel:+17543001010"
                className="group flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-muted/50 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{language === 'en' ? 'Call us' : 'Llámenos'}</p>
                  <p className="text-sm font-medium text-foreground">+1 (754) 300-1010</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              {/* Email */}
              <motion.a 
                href="mailto:hello@luxgyps.com"
                className="group flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-muted/50 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <p className="text-sm font-medium text-foreground">hello@luxgyps.com</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              {/* Location */}
              <div className="flex items-center gap-4 p-3 -mx-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{language === 'en' ? 'Location' : 'Ubicación'}</p>
                  <p className="text-sm font-medium text-foreground">{t.footer.location}</p>
                  <p className="text-sm text-muted-foreground">Florida, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} LuxGyps. {t.footer.rights}
            </p>
            
            <div className="flex items-center gap-1">
              <motion.a 
                href="#privacy" 
                className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                {t.footer.privacy}
              </motion.a>
              <span className="text-border">•</span>
              <motion.a 
                href="#terms" 
                className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
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
