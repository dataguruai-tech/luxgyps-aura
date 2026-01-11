import { motion } from 'framer-motion';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/luxgyps-logo.svg';

// Custom SVG icons for TikTok and Facebook
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/luxgyps', label: 'Instagram' },
    { icon: TikTokIcon, href: 'https://tiktok.com/@luxgyps', label: 'TikTok' },
    { icon: FacebookIcon, href: 'https://facebook.com/luxgyps', label: 'Facebook' },
  ];

  const catalogLinks = [
    { label: t.nav.interiorDecor, href: '#interior' },
    { label: t.nav.facadeDecor, href: '#facade' },
    { label: t.nav.gallery, href: '#portfolio' },
    { label: t.nav.services, href: '#process' },
  ];

  const companyLinks = [
    { label: t.nav.aboutUs, href: '#about' },
    { label: t.nav.showroom, href: '#showroom', comingSoon: true },
    { label: t.nav.contacts, href: '#contact' },
    { label: t.footer.privacy, href: '#privacy' },
  ];

  return (
    <footer className="bg-charcoal-deep border-t border-border/30">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column - Left side with logo and bio */}
          <div className="md:col-span-5 lg:col-span-4">
            <motion.a 
              href="/" 
              className="inline-flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} alt="LuxGyps" className="h-12 w-12" />
              <span className="font-display text-2xl tracking-wide">
                <span className="text-foreground">Lux</span>
                <span className="text-primary">Gyps</span>
              </span>
            </motion.a>
            
            {/* Since badge */}
            <div className="mb-6">
              <div className="inline-block border border-primary/30 px-4 py-2 rounded">
                <span className="text-xs text-primary/70 tracking-[0.2em] uppercase block">since</span>
                <span className="font-display text-3xl text-primary">2000</span>
              </div>
            </div>
            
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed text-sm">
              {t.footer.desc}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <a 
                href="tel:+17543001010"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-primary" />
                +1 (754) 300-1010
              </a>
              <a 
                href="mailto:hello@luxgyps.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-primary" />
                hello@luxgyps.com
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>
                  {t.footer.location}<br />
                  Florida, USA
                </span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
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
            </div>
          </div>

          {/* Navigation Columns - Right side */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Catalog Column */}
              <div>
                <h4 className="font-display text-lg text-foreground mb-6 uppercase tracking-wider text-sm">
                  {t.nav.catalog}
                </h4>
                <ul className="space-y-3">
                  {catalogLinks.map((link) => (
                    <li key={link.label}>
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h4 className="font-display text-lg text-foreground mb-6 uppercase tracking-wider text-sm">
                  {t.footer.company}
                </h4>
                <ul className="space-y-3">
                  {companyLinks.map((link) => (
                    <li key={link.label}>
                      <a 
                        href={link.href}
                        className={`text-sm ${
                          link.comingSoon 
                            ? 'text-muted-foreground/50 cursor-not-allowed' 
                            : 'text-muted-foreground hover:text-foreground transition-colors'
                        }`}
                      >
                        {link.label}
                        {link.comingSoon && (
                          <span className="ml-2 text-[10px] text-primary">Soon</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Column */}
              <div>
                <h4 className="font-display text-lg text-foreground mb-6 uppercase tracking-wider text-sm">
                  {t.footer.contactTitle}
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#estimate"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {t.footer.estimate}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#samples"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {t.sampleKit.buttonText}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#docs"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {t.footer.documentation}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} LuxGyps. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#privacy" className="hover:text-foreground transition-colors">{t.footer.privacy}</a>
            <a href="#terms" className="hover:text-foreground transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;