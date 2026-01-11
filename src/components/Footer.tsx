import { motion } from 'framer-motion';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/luxgyps-logo.svg';
import columnDivider from '@/assets/footer-column-divider.png';

const Footer = () => {
  const { t } = useLanguage();
  
  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/luxgyps', label: 'Instagram' }
  ];
  
  const quickLinks = [
    { label: t.nav.portfolio, href: '#portfolio' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' }
  ];

  return (
    <footer className="relative bg-background">
      {/* Main Footer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[280px]">
        
        {/* Left Section - Brand & Contact */}
        <div className="lg:col-span-5 bg-secondary px-8 py-12 flex flex-col justify-between">
          <div>
            <motion.a 
              href="/" 
              className="inline-flex items-center gap-3 mb-6" 
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} alt="LuxGyps" className="h-10 w-10" />
              <span className="font-display text-2xl tracking-wide">
                <span className="text-foreground">Lux</span>
                <span className="text-primary">Gyps</span>
              </span>
            </motion.a>
            
            {/* Vintage Since Badge */}
            <div className="inline-flex flex-col items-center px-6 py-4 border border-primary/30 rounded bg-primary/5 mt-4">
              {/* Top Ornament */}
              <div className="flex items-center gap-1 text-primary/50 mb-1">
                <span className="text-lg">❧</span>
                <span className="text-[10px] text-primary/70">✦</span>
                <span className="text-lg scale-x-[-1]">❧</span>
              </div>
              
              {/* Since Text */}
              <span className="text-primary/60 text-xs italic tracking-[0.2em]">since</span>
              
              {/* Year */}
              <span className="font-display text-primary text-4xl font-light tracking-wider">2015</span>
              
              {/* Bottom Ornament */}
              <div className="flex items-center gap-1 text-primary/50 mt-1">
                <span className="text-lg scale-y-[-1]">❧</span>
                <span className="text-[10px] text-primary/70">✦</span>
                <span className="text-lg scale-[-1]">❧</span>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="mt-8 space-y-3">
            <a href="tel:+17543001010" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4 text-primary" />
              +1 (754) 300-1010
            </a>
            <a href="mailto:hello@luxgyps.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-4 h-4 text-primary" />
              hello@luxgyps.com
            </a>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{t.footer.location}, Florida, USA</span>
            </div>
          </div>
        </div>

        {/* Column Divider */}
        <div className="lg:col-span-2 relative hidden lg:flex items-center justify-center bg-secondary overflow-hidden">
          <img 
            src={columnDivider} 
            alt="" 
            className="h-full w-auto object-contain"
          />
        </div>

        {/* Right Section - Navigation */}
        <div className="lg:col-span-5 bg-card px-8 py-12">
          <h4 className="font-display text-lg text-foreground mb-6">{t.footer.contactTitle}</h4>
          <ul className="space-y-3 mb-8">
            {quickLinks.map(link => (
              <li key={link.label}>
                <a 
                  href={link.href} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Social Links */}
          <div className="flex items-center gap-4 mt-8">
            {socialLinks.map(social => (
              <motion.a 
                key={social.label} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
            <motion.a 
              href="https://houzz.com/luxgyps" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }} 
              aria-label="Houzz"
            >
              <span className="text-xs font-sans font-bold">Hz</span>
            </motion.a>
            <motion.a 
              href="https://pinterest.com/luxgyps" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }} 
              aria-label="Pinterest"
            >
              <span className="text-xs font-sans font-bold">P</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-charcoal-deep border-t border-border/20 py-4 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs text-center tracking-wider">
            © {new Date().getFullYear()} LuxGyps. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#privacy" className="hover:text-foreground transition-colors">{t.footer.privacy}</a>
            <a href="#terms" className="hover:text-foreground transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
