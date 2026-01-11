import { motion } from 'framer-motion';
import { Instagram, Phone, Mail, MapPin, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/luxgyps-logo.svg';
import columnDivider from '@/assets/footer-column-divider.png';

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

  const navItemsLeft = [
    { label: language === 'en' ? 'Catalog' : 'Catálogo', href: '#catalog' },
    { label: language === 'en' ? 'Gallery' : 'Galería', href: '#gallery' },
    { label: language === 'en' ? 'Services' : 'Servicios', href: '#process' },
    { label: language === 'en' ? 'Payment' : 'Pago', href: '#payment' },
    { label: language === 'en' ? 'Documentation' : 'Documentación', href: '#docs' },
  ];

  const navItemsRight = [
    { label: 'Showroom', href: '#showroom' },
    { label: language === 'en' ? 'Facades' : 'Fachadas', href: '#portfolio' },
    { label: language === 'en' ? 'About' : 'Nosotros', href: '#about' },
    { label: language === 'en' ? 'Delivery' : 'Entrega', href: '#delivery' },
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
    <footer className="relative">
      {/* Main Footer - Reference Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[200px]">
        
        {/* Left Section - Brand (Dark Brown) */}
        <div className="lg:col-span-2 bg-[hsl(var(--gold-dark))] px-6 py-10 flex flex-col justify-between">
          <div>
            <motion.a 
              href="/" 
              className="inline-flex items-center gap-2 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} alt="LuxGyps" className="h-12 w-auto brightness-0 invert opacity-80" />
            </motion.a>
            
            <div className="font-display text-white/50 italic text-sm mb-1">
              {language === 'en' ? 'Artisan Studio' : 'Estudio Artesanal'}
            </div>
            
            <div className="font-display text-white/40 text-xs tracking-[0.15em] uppercase mb-0.5">
              since
            </div>
            <div className="font-display text-white/90 text-4xl tracking-wider font-light">
              2015
            </div>
          </div>
        </div>

        {/* Middle Section - Contact (Olive/Gold) */}
        <div className="lg:col-span-4 bg-[hsl(var(--gold-muted))] px-6 py-10">
          {/* Contact Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-2 text-white/80">
              <MapPin className="w-3.5 h-3.5 mt-1 shrink-0 text-white/50" />
              <span className="text-sm">{t.footer.location}, Florida, USA</span>
            </div>
            
            <motion.a 
              href="mailto:hello@luxgyps.com"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
              whileHover={{ x: 2 }}
            >
              hello@luxgyps.com
            </motion.a>
            
            <motion.a 
              href="tel:+17543001010"
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors text-base font-semibold"
              whileHover={{ x: 2 }}
            >
              +1 (754) 300-1010
            </motion.a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2 mb-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Legal Links */}
          <motion.a 
            href="#terms"
            className="inline-flex items-center gap-2 text-primary/80 hover:text-primary transition-colors text-sm"
            whileHover={{ x: 2 }}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.footer.privacy} & {t.footer.terms}</span>
          </motion.a>
        </div>

        {/* Column Divider */}
        <div className="lg:col-span-2 relative hidden lg:block bg-muted">
          <img 
            src={columnDivider} 
            alt="" 
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>

        {/* Right Section - Navigation (Dark) */}
        <div className="lg:col-span-4 bg-secondary px-8 py-10">
          {/* Navigation Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {/* Left Nav Column */}
            <div className="space-y-3">
              {navItemsLeft.map((link) => (
                <motion.a 
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-foreground/70 hover:text-primary transition-colors text-sm uppercase tracking-wider"
                  whileHover={{ x: 4 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            
            {/* Right Nav Column */}
            <div className="space-y-3">
              {navItemsRight.map((link) => (
                <motion.a 
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-foreground/70 hover:text-primary transition-colors text-sm uppercase tracking-wider"
                  whileHover={{ x: 4 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-background border-t border-border/30 py-3 px-6">
        <p className="text-muted-foreground text-xs text-center">
          © {new Date().getFullYear()} LuxGyps. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
