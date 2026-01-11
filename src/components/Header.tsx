import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/luxgyps-logo.svg';

const Header = () => {
  const { mode, toggleMode, isGallery } = useMode();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // New unified navigation structure
  const navItems = [
    { label: t.nav.aboutUs, href: '#about' },
    { label: t.nav.interiorDecor, href: '#interior' },
    { label: t.nav.facadeDecor, href: '#facade' },
    { label: t.nav.gallery, href: '#portfolio' },
    { label: t.nav.services, href: '#process' },
    { label: t.nav.showroom, href: '#showroom', disabled: true, comingSoon: true },
    { label: t.nav.contacts, href: '#contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div 
        className="mx-4 mt-4 rounded-full border border-border/50 backdrop-blur-xl bg-background/80"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <img src={logo} alt="LuxGyps" className="h-8 w-8" />
            <span className="font-display text-xl tracking-wide">
              <span className="text-foreground">Lux</span>
              <span className="text-primary">Gyps</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.disabled ? undefined : item.href}
                className={`text-sm font-semibold uppercase tracking-[0.15em] relative group ${
                  item.disabled 
                    ? 'text-muted-foreground/50 cursor-not-allowed' 
                    : 'text-muted-foreground hover:text-foreground transition-colors'
                }`}
                whileHover={item.disabled ? {} : { y: -2 }}
                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
              >
                {item.label}
                {item.comingSoon && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] text-primary font-medium tracking-normal whitespace-nowrap">
                    Coming Soon
                  </span>
                )}
                {!item.disabled && (
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-border/50 text-sm font-medium hover:border-primary/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="uppercase text-muted-foreground">{language}</span>
            </motion.button>

            {/* Mode Toggle */}
            <motion.button
              onClick={toggleMode}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 text-sm font-medium hover:border-primary/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isGallery ? (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    className="flex items-center gap-2"
                  >
                    <Moon className="w-4 h-4 text-primary" />
                    <span className="hidden sm:inline text-muted-foreground">{t.nav.gallery}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pro"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    className="flex items-center gap-2"
                  >
                    <Sun className="w-4 h-4 text-primary" />
                    <span className="hidden sm:inline text-muted-foreground">{t.nav.pro}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Phone CTA */}
            <motion.a
              href="tel:+17543001010"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full btn-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+1 (754) 300-1010</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border/50 overflow-hidden"
            >
              <nav className="flex flex-col p-4 gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.disabled ? undefined : item.href}
                    className={`px-4 py-3 rounded-lg uppercase tracking-wider text-sm font-semibold ${
                      item.disabled 
                        ? 'text-muted-foreground/50 cursor-not-allowed' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors'
                    }`}
                    onClick={(e) => {
                      if (item.disabled) {
                        e.preventDefault();
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                  >
                    {item.label}
                    {item.comingSoon && (
                      <span className="ml-2 text-[10px] text-primary font-medium tracking-normal">
                        Coming Soon
                      </span>
                    )}
                  </a>
                ))}
                <a
                  href="tel:+17543001010"
                  className="flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-full btn-gold"
                >
                  <Phone className="w-4 h-4" />
                  <span>+1 (754) 300-1010</span>
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;