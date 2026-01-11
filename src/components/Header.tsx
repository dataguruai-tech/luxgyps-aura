import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Sun, Moon, Globe, FileText, ChevronDown } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useQuote } from '@/context/QuoteContext';
import logo from '@/assets/luxgyps-logo.svg';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItem {
  label: string;
  href: string;
  disabled?: boolean;
  comingSoon?: boolean;
}

const HEADER_OFFSET = 100; // Offset for fixed header height

const Header = () => {
  const {
    mode,
    toggleMode,
    isGallery
  } = useMode();
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  const { totalItems, setIsOpen: setQuoteOpen } = useQuote();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [decorDropdownOpen, setDecorDropdownOpen] = useState(false);

  // Navigation items based on the sitemap
  const navItems = {
    about: { label: language === 'en' ? 'About Us' : 'Nosotros', href: '#about' },
    decor: {
      label: language === 'en' ? 'Decor' : 'Decoración',
      items: [
        { label: language === 'en' ? 'Interior Decor' : 'Decoración Interior', href: '#portfolio' },
        { label: language === 'en' ? 'Facade Decor' : 'Decoración Fachada', href: '#catalog' },
      ]
    },
    gallery: { label: language === 'en' ? 'Gallery' : 'Galería', href: '#gallery' },
    services: { label: language === 'en' ? 'Services' : 'Servicios', href: '#process' },
    showroom: { label: 'Showroom', href: '#showroom', comingSoon: true },
    contacts: { label: language === 'en' ? 'Contacts' : 'Contactos', href: '#footer' },
  };

  const allNavItems = [
    navItems.about,
    ...navItems.decor.items,
    navItems.gallery,
    navItems.services,
    navItems.showroom,
    navItems.contacts,
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - HEADER_OFFSET;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setMobileMenuOpen(false);
    setDecorDropdownOpen(false);
  }, []);

  return <TooltipProvider>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6">
        <motion.div className="mt-4 rounded-full border border-border/50 backdrop-blur-xl bg-background/80" initial={{
        y: -100,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}>
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            {/* Logo */}
            <motion.a href="/" className="flex-shrink-0 flex items-center gap-3" whileHover={{
            scale: 1.02
          }}>
              <img src={logo} alt="LuxGyps" className="h-14 sm:h-16 xl:h-[4.5rem] w-auto" />
              <span className="font-display text-xl sm:text-2xl xl:text-[1.75rem] tracking-wide whitespace-nowrap">
                <span className="text-foreground">Lux</span>
                <span className="text-primary">Gyps</span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex flex-1 items-center justify-center gap-6 2xl:gap-8">
              {/* About Us */}
              <motion.a 
                href={navItems.about.href} 
                onClick={(e) => handleNavClick(e, navItems.about.href)}
                className="font-display text-sm uppercase tracking-[0.12em] text-foreground/80 hover:text-primary transition-colors duration-300 relative group whitespace-nowrap" 
                whileHover={{ y: -1 }}
              >
                {navItems.about.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full" />
              </motion.a>

              {/* Decor Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setDecorDropdownOpen(true)}
                onMouseLeave={() => setDecorDropdownOpen(false)}
              >
                <button className="flex items-center gap-1.5 font-display text-sm uppercase tracking-[0.12em] text-foreground/80 hover:text-primary transition-colors duration-300 whitespace-nowrap">
                  {navItems.decor.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${decorDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {decorDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[200px] py-2 bg-card border border-border rounded-xl shadow-xl z-50"
                    >
                      {navItems.decor.items.map((item) => (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="block px-4 py-2.5 font-display text-sm uppercase tracking-[0.1em] text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                          whileHover={{ x: 4 }}
                        >
                          {item.label}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Gallery */}
              <motion.a 
                href={navItems.gallery.href} 
                onClick={(e) => handleNavClick(e, navItems.gallery.href)}
                className="font-display text-sm uppercase tracking-[0.12em] text-foreground/80 hover:text-primary transition-colors duration-300 relative group whitespace-nowrap" 
                whileHover={{ y: -1 }}
              >
                {navItems.gallery.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full" />
              </motion.a>

              {/* Services */}
              <motion.a 
                href={navItems.services.href} 
                onClick={(e) => handleNavClick(e, navItems.services.href)}
                className="font-display text-sm uppercase tracking-[0.12em] text-foreground/80 hover:text-primary transition-colors duration-300 relative group whitespace-nowrap" 
                whileHover={{ y: -1 }}
              >
                {navItems.services.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full" />
              </motion.a>

              {/* Showroom - Coming Soon */}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="font-display text-sm uppercase tracking-[0.12em] text-muted-foreground/40 cursor-not-allowed select-none whitespace-nowrap">
                    {navItems.showroom.label}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-primary text-primary-foreground font-sans text-xs tracking-wider uppercase px-3 py-1.5">
                  {language === 'en' ? 'Coming Soon' : 'Próximamente'}
                </TooltipContent>
              </Tooltip>

              {/* Contacts */}
              <motion.a 
                href={navItems.contacts.href} 
                onClick={(e) => handleNavClick(e, navItems.contacts.href)}
                className="font-display text-sm uppercase tracking-[0.12em] text-foreground/80 hover:text-primary transition-colors duration-300 relative group whitespace-nowrap" 
                whileHover={{ y: -1 }}
              >
                {navItems.contacts.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full" />
              </motion.a>
            </nav>

            {/* Actions */}
            <div className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2">
              {/* Language Toggle - Minimal */}
              <motion.button 
                onClick={toggleLanguage} 
                className="relative w-9 h-9 rounded-full flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-display text-[11px] uppercase tracking-wider font-medium">{language}</span>
              </motion.button>

              {/* Divider */}
              <div className="hidden sm:block w-px h-5 bg-border/60" />

              {/* Mode Toggle - Icon Only */}
              <motion.button 
                onClick={toggleMode} 
                className="relative w-9 h-9 rounded-full flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isGallery ? (
                    <motion.div 
                      key="gallery" 
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="pro" 
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Quote Basket Button */}
              <AnimatePresence>
                {totalItems > 0 && (
                  <>
                    <div className="hidden sm:block w-px h-5 bg-border/60" />
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={() => setQuoteOpen(true)}
                      className="relative w-9 h-9 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileText className="w-4 h-4" />
                      <motion.span 
                        className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center px-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        {totalItems}
                      </motion.span>
                    </motion.button>
                  </>
                )}
              </AnimatePresence>

              {/* Divider */}
              <div className="hidden lg:block w-px h-5 bg-border/60" />

              {/* Phone CTA - Elegant Button */}
              <motion.a 
                href="tel:+17543001010" 
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:brightness-110 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="font-sans text-xs font-semibold tracking-wide whitespace-nowrap">+1 (754) 300-1010</span>
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button className="xl:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} whileTap={{
              scale: 0.95
            }}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && <motion.div initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: 'auto',
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} className="xl:hidden border-t border-border/50 overflow-hidden">
                <nav className="flex flex-col p-6 gap-1">
                  {allNavItems.map((item, index) => 'comingSoon' in item && item.comingSoon ? <div key={item.label} className="flex items-center justify-between px-4 py-3 rounded-lg">
                        <span className="font-display text-base uppercase tracking-[0.15em] text-muted-foreground/50">
                          {item.label}
                        </span>
                        <span className="font-sans text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
                          {language === 'en' ? 'Coming Soon' : 'Próximamente'}
                        </span>
                      </div> : <motion.a 
                        key={item.label} 
                        href={item.href} 
                        className="px-4 py-3 rounded-lg font-display text-base uppercase tracking-[0.15em] text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300" 
                        onClick={(e) => handleNavClick(e, item.href)} 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: index * 0.05 }}
                      >
                        {item.label}
                      </motion.a>)}
                  <motion.a href="tel:+17543001010" className="flex items-center justify-center gap-2 mt-4 px-4 py-3 rounded-full btn-gold" initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }}>
                    <Phone className="w-4 h-4" />
                    <span className="font-sans text-sm tracking-wider">+1 (754) 300-1010</span>
                  </motion.a>
                </nav>
              </motion.div>}
          </AnimatePresence>
        </motion.div>
      </header>
    </TooltipProvider>;
};
export default Header;