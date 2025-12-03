import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useMode } from '@/context/ModeContext';

const LookbookPopup = () => {
  const { t } = useLanguage();
  const { isGallery } = useMode();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem('lookbook-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show popup after 15 seconds in Gallery mode only
    const timer = setTimeout(() => {
      if (isGallery && !isDismissed) {
        setIsVisible(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [isGallery, isDismissed]);

  // Hide if switched to Pro mode
  useEffect(() => {
    if (!isGallery) {
      setIsVisible(false);
    }
  }, [isGallery]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('lookbook-dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit to Supabase quiz_leads table
    console.log('Lookbook email:', email);
    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  if (!isGallery || isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 max-w-sm"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative bg-card border border-primary/30 rounded-2xl p-6 shadow-2xl glow-gold">
            {/* Decorative Corner */}
            <div className="absolute -top-3 -right-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-5 h-5 text-background" />
              </motion.div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted/50 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            {!isSubmitted ? (
              <>
                {/* Content */}
                <div className="mb-4 pr-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                    {t.lookbook.badge}
                  </span>
                  <h4 className="font-display text-xl text-foreground mt-2 leading-tight">
                    {t.lookbook.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t.lookbook.description}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.lookbook.placeholder}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full btn-gold font-medium text-sm flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {t.lookbook.button}
                  </button>
                </form>

                <p className="text-[10px] text-muted-foreground text-center mt-3">
                  {t.lookbook.privacy}
                </p>
              </>
            ) : (
              /* Success State */
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display text-lg text-foreground mb-1">
                  {t.lookbook.successTitle}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t.lookbook.successMessage}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LookbookPopup;
