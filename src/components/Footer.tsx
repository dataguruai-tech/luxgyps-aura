import { motion } from 'framer-motion';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/luxgyps-logo.svg';
const Footer = () => {
  const {
    t
  } = useLanguage();
  const socialLinks = [{
    icon: Instagram,
    href: 'https://instagram.com/luxgyps',
    label: 'Instagram'
  }];
  const quickLinks = [{
    label: t.nav.portfolio,
    href: '#portfolio'
  }, {
    label: t.nav.process,
    href: '#process'
  }, {
    label: t.nav.about,
    href: '#about'
  }, {
    label: t.nav.contact,
    href: '#contact'
  }];
  return <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.a href="/" className="inline-flex items-center gap-3 mb-6" whileHover={{
            scale: 1.02
          }}>
              <img src={logo} alt="LuxGyps" className="h-10 w-10" />
              <span className="font-display text-2xl tracking-wide">
                <span className="text-foreground">Lux</span>
                <span className="text-primary">Gyps</span>
              </span>
            </motion.a>
            <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(social => <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }} aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </motion.a>)}
              <motion.a href="https://houzz.com/luxgyps" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }} aria-label="Houzz">
                <span className="text-xs font-sans font-bold">Hz</span>
              </motion.a>
              <motion.a href="https://pinterest.com/luxgyps" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }} aria-label="Pinterest">
                <span className="text-xs font-sans font-bold">P</span>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-6">{t.footer.contactTitle}</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+17543001010" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  +1 (754) 300-1010
                </a>
              </li>
              <li>
                <a href="mailto:hello@luxgyps.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                  hello@luxgyps.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary mt-1" />
                  <span>
                    {t.footer.location}<br />
                    Florida, USA
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} LuxGyps. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#privacy" className="hover:text-foreground transition-colors">{t.footer.privacy}</a>
            <a href="#terms" className="hover:text-foreground transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;