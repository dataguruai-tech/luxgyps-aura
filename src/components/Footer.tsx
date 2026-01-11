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
    <footer className="relative overflow-hidden px-4 sm:px-6 pb-6">
      {/* Main Footer Container - Same style as header */}
      <div className="rounded-2xl border border-border/50 backdrop-blur-xl bg-background/80">
        <div className="px-6 py-8">
          {/* Top Row - Logo, Nav, Actions */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Logo */}
            <motion.a 
              href="/" 
              className="flex-shrink-0 flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} alt="LuxGyps" className="h-12 w-auto" />
              <span className="font-display text-2xl tracking-wide">
                <span className="text-foreground">Lux</span>
                <span className="text-primary">Gyps</span>
              </span>
            </motion.a>

            {/* Navigation - Same style as header */}
            <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
              {Object.values(navItems).map((link) => (
                <motion.a 
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-display text-sm uppercase tracking-[0.12em] text-foreground/80 hover:text-primary transition-colors duration-300 relative group whitespace-nowrap" 
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                </motion.a>
              ))}
            </nav>

            {/* Actions - Social & Phone */}
            <div className="flex items-center gap-3">
              {/* Social Links */}
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-9 h-9 rounded-full flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}

              {/* Divider */}
              <div className="hidden sm:block w-px h-5 bg-border/60" />

              {/* Phone CTA - Elegant Button */}
              <motion.a 
                href="tel:+17543001010" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:brightness-110 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="font-sans text-xs font-semibold tracking-wide whitespace-nowrap">+1 (754) 300-1010</span>
              </motion.a>
            </div>
          </div>

          {/* Bottom Row - Copyright & Links */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground text-xs">
                © {new Date().getFullYear()} LuxGyps. {t.footer.rights}
              </p>
              
              <div className="flex items-center gap-4">
                <motion.a 
                  href="#privacy" 
                  className="font-display text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {t.footer.privacy}
                </motion.a>
                <div className="w-px h-3 bg-border/60" />
                <motion.a 
                  href="#terms" 
                  className="font-display text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {t.footer.terms}
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
