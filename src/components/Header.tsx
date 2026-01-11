import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Sun, Moon, Globe, FileText } from 'lucide-react';
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

  // Grouped navigation items
  const navGroups = {
    main: [
      { label: language === 'en' ? 'About' : 'Nosotros', href: '#about', comingSoon: false },
      { label: language === 'en' ? 'Portfolio' : 'Portafolio', href: '#portfolio', comingSoon: false },
    ],
    products: [
      { label: language === 'en' ? 'Catalog' : 'Catálogo', href: '#catalog', comingSoon: false },
      { label: language === 'en' ? 'Gallery' : 'Galería', href: '#gallery', comingSoon: false },
    ],
    services: [
      { label: language === 'en' ? 'Services' : 'Servicios', href: '#process', comingSoon: false },
      { label: language === 'en' ? 'Showroom' : 'Showroom', href: '#showroom', comingSoon: true },
      { label: language === 'en' ? 'Contact' : 'Contacto', href: '#contact', comingSoon: false },
    ],
  };

  const allNavItems = [...navGroups.main, ...navGroups.products, ...navGroups.services];

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
            {/* Logo - Prevent squashing */}
            <motion.a href="/" className="flex-shrink-0 flex items-center gap-3" whileHover={{
            scale: 1.02
          }}>
              <img src={logo} alt="LuxGyps" className="h-14 sm:h-16 xl:h-[4.5rem] w-auto" />
              <span className="font-display text-xl sm:text-2xl xl:text-[1.75rem] tracking-wide whitespace-nowrap">
                <span className="text-foreground">Lux</span>
                <span className="text-primary">Gyps</span>
              </span>
            </motion.a>

            {/* Desktop Navigation - Grouped Style */}
            <nav className="hidden xl:flex flex-1 items-center justify-center">
              {/* Main Group */}
              <div className="flex items-center gap-4 2xl:gap-5">
                {navGroups.main.map(item => (
                  <motion.a 
                    key={item.label} 
                    href={item.href} 
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="font-display text-sm uppercase tracking-[0.12em] text-foreground/80 hover:text-primary transition-colors duration-300 relative group whitespace-nowrap" 
                    whileHover={{ y: -1 }}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                  </motion.a>
                ))}
              </div>
              
              {/* Divider */}
              <span className="mx-4 2xl:mx-6 w-px h-4 bg-border/50" />
              
              {/* Products Group */}
              <div className="flex items-center gap-4 2xl:gap-5">
                {navGroups.products.map(item => (
                  <motion.a 
                    key={item.label} 
                    href={item.href} 
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="font-display text-sm uppercase tracking-[0.12em] text-foreground/80 hover:text-primary transition-colors duration-300 relative group whitespace-nowrap" 
                    whileHover={{ y: -1 }}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                  </motion.a>
                ))}
              </div>
              
              {/* Divider */}
              <span className="mx-4 2xl:mx-6 w-px h-4 bg-border/50" />
              
              {/* Services Group */}
              <div className="flex items-center gap-4 2xl:gap-5">
                {navGroups.services.map(item => 
                  item.comingSoon ? (
                    <Tooltip key={item.label} delayDuration={0}>
                      <TooltipTrigger asChild>
                        <span className="font-display text-sm uppercase tracking-[0.12em] text-muted-foreground/40 cursor-not-allowed select-none whitespace-nowrap">
                          {item.label}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-primary text-primary-foreground font-sans text-xs tracking-wider uppercase px-3 py-1.5">
                        {language === 'en' ? 'Coming Soon' : 'Próximamente'}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <motion.a 
                      key={item.label} 
                      href={item.href} 
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="font-display text-sm uppercase tracking-[0.12em] text-foreground/80 hover:text-primary transition-colors duration-300 relative group whitespace-nowrap" 
                      whileHover={{ y: -1 }}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                    </motion.a>
                  )
                )}
              </div>
            </nav>

            {/* Actions - Prevent squashing */}
            <div className="flex-shrink-0 flex items-center gap-2 lg:gap-3">
              {/* Language Toggle */}
              <motion.button onClick={toggleLanguage} className="flex items-center gap-1.5 px-2.5 py-2 rounded-full border border-border/50 font-sans text-xs font-medium hover:border-primary/50 transition-colors" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span className="uppercase text-muted-foreground tracking-wider">{language}</span>
              </motion.button>

              {/* Mode Toggle */}
              <motion.button onClick={toggleMode} className="flex items-center gap-2 px-3 py-2 rounded-full border border-border/50 font-sans text-xs font-medium hover:border-primary/50 transition-colors" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                <AnimatePresence mode="wait">
                  {isGallery ? <motion.div key="gallery" initial={{
                  opacity: 0,
                  rotate: -90
                }} animate={{
                  opacity: 1,
                  rotate: 0
                }} exit={{
                  opacity: 0,
                  rotate: 90
                }} className="flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5 text-primary" />
                      <span className="hidden sm:inline text-muted-foreground tracking-wide uppercase">{t.nav.gallery}</span>
                    </motion.div> : <motion.div key="pro" initial={{
                  opacity: 0,
                  rotate: -90
                }} animate={{
                  opacity: 1,
                  rotate: 0
                }} exit={{
                  opacity: 0,
                  rotate: 90
                }} className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-primary" />
                      <span className="hidden sm:inline text-muted-foreground tracking-wide uppercase">{t.nav.pro}</span>
                    </motion.div>}
                </AnimatePresence>
              </motion.button>

              {/* Quote Basket Button */}
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={() => setQuoteOpen(true)}
                    className="relative flex items-center gap-2 px-3 py-2 rounded-full border border-primary/50 bg-primary/10 hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="hidden sm:inline font-sans text-xs font-medium text-foreground tracking-wide">
                      {language === 'en' ? 'Quote' : 'Cotización'}
                    </span>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Phone CTA */}
              <motion.a href="tel:+17543001010" className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full btn-gold" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                <Phone className="w-3.5 h-3.5" />
                <span className="font-sans text-xs font-medium tracking-wider whitespace-nowrap">+1 (754) 300-1010</span>
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
                  {allNavItems.map((item, index) => item.comingSoon ? <div key={item.label} className="flex items-center justify-between px-4 py-3 rounded-lg">
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