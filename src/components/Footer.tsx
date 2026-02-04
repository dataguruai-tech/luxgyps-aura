import { motion } from 'framer-motion';
import { Instagram, Phone, Mail, MapPin, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/luxgyps-logo.svg';
import columnDivider from '@/assets/footer-column-divider.png';
import since2000Badge from '@/assets/since-2000-badge.png';

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
    { icon: Instagram, href: 'https://www.instagram.com/luxgyps?utm_source=qr', label: 'Instagram' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@luxgyps?_r=1&_t=ZP-937eI07Wixq', label: 'TikTok' },
    { icon: FacebookIcon, href: 'https://www.facebook.com/profile.php?id=61579767850641#', label: 'Facebook' },
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
    { label: language === 'en' ? 'Contact' : 'Contacto', href: '#footer' },
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
    <footer id="footer" className="relative">
      {/* Top Separator Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      {/* Main Footer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[280px] border-t border-primary/20">
        
        {/* Left Section - Brand & Contact */}
        <div className="lg:col-span-5 bg-secondary px-8 py-12 flex flex-col justify-center items-center">
          <div className="text-left">
            {/* Logo & Tagline */}
            <motion.a 
              href="/" 
              className="inline-flex items-center gap-3 mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} alt="LuxGyps" className="h-14 sm:h-16 w-auto" />
              <span className="font-display text-xl sm:text-2xl tracking-wide whitespace-nowrap">
                <span className="text-foreground">Lux</span>
                <span className="text-primary">Gyps</span>
              </span>
            </motion.a>
            
            <div className="flex items-center gap-3 mb-8">
              <span className="font-display text-primary/80 italic text-sm">
                {language === 'en' ? 'Artisan Studio' : 'Estudio Artesanal'}
              </span>
              <span className="text-muted-foreground">•</span>
              <img src={since2000Badge} alt="Since 2000" className="h-10 w-auto object-contain" />
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0 text-primary/60" />
                <span className="text-sm">{t.footer.location}, Florida, USA</span>
              </div>
              
              <motion.a 
                href="mailto:hello@luxgyps.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                whileHover={{ x: 3 }}
              >
                <Mail className="w-4 h-4 text-primary/60" />
                hello@luxgyps.com
              </motion.a>
              
              <motion.a 
                href="tel:+17543001010"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors text-base font-medium"
                whileHover={{ x: 3 }}
              >
                <Phone className="w-4 h-4 text-primary/60" />
                +1 (754) 300-1010
              </motion.a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-start gap-3 mt-8">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Column Divider */}
        <div className="lg:col-span-2 relative hidden lg:flex items-center justify-center overflow-hidden">
          {/* Split background - left matches left section, right matches right section */}
          <div className="absolute inset-0 flex">
            <div className="w-1/2 bg-secondary" />
            <div className="w-1/2 bg-card" />
          </div>
          <img 
            src={columnDivider} 
            alt="" 
            className="h-full w-auto object-contain relative z-10"
          />
        </div>

        {/* Right Section - Navigation */}
        <div className="lg:col-span-5 bg-card px-8 py-12">
          <h3 className="font-display text-primary text-sm uppercase tracking-[0.2em] mb-8">
            {language === 'en' ? 'Navigation' : 'Navegación'}
          </h3>
          
          {/* Navigation Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {/* Left Nav Column */}
            <div className="space-y-4">
              {navItemsLeft.map((link) => (
                <motion.a 
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider"
                  whileHover={{ x: 4 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            
            {/* Right Nav Column */}
            <div className="space-y-4">
              {navItemsRight.map((link) => (
                <motion.a 
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider"
                  whileHover={{ x: 4 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <motion.a 
              href="#terms"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs uppercase tracking-wider"
              whileHover={{ x: 3 }}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.footer.privacy} & {t.footer.terms}</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-charcoal-deep border-t border-border/20 py-4 px-6">
        <p className="text-muted-foreground text-xs text-center tracking-wider">
          © {new Date().getFullYear()} LuxGyps. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
