import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Building2, MapPin, Wrench } from 'lucide-react';
import { useState } from 'react';
import { useQuote } from '@/context/QuoteContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface QuoteRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteRequestForm = ({ isOpen, onClose }: QuoteRequestFormProps) => {
  const { items, clearQuote, setIsOpen } = useQuote();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectLocation: '',
    installationNeeded: false,
    projectDetails: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: language === 'en' ? 'Quote Request Submitted!' : '¡Solicitud de Cotización Enviada!',
      description: language === 'en' 
        ? 'Our team will contact you within 24 hours.'
        : 'Nuestro equipo te contactará dentro de 24 horas.',
    });

    setTimeout(() => {
      clearQuote();
      setIsOpen(false);
      onClose();
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectLocation: '',
        installationNeeded: false,
        projectDetails: '',
      });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-lg bg-background border border-border rounded-2xl z-[60] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {isSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <CheckCircle className="w-16 h-16 text-primary mb-4" />
                </motion.div>
                <h3 className="font-display text-2xl text-foreground mb-2">
                  {language === 'en' ? 'Quote Requested!' : '¡Cotización Solicitada!'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'en' 
                    ? 'We\'ll be in touch within 24 hours.'
                    : 'Te contactaremos dentro de 24 horas.'
                  }
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div>
                    <h2 className="font-display text-xl text-foreground">
                      {language === 'en' ? 'Request Quote' : 'Solicitar Cotización'}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {items.length} {language === 'en' ? 'items selected' : 'artículos seleccionados'}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {language === 'en' ? 'Your Name' : 'Tu Nombre'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder={language === 'en' ? 'John Smith' : 'Juan García'}
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'en' ? 'Email' : 'Correo'} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'en' ? 'Phone' : 'Teléfono'}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Building2 className="w-4 h-4 inline mr-2" />
                      {language === 'en' ? 'Company / Firm' : 'Empresa / Firma'}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder={language === 'en' ? 'Architecture Studio LLC' : 'Estudio de Arquitectura LLC'}
                    />
                  </div>

                  {/* Project Location */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      {language === 'en' ? 'Project Location' : 'Ubicación del Proyecto'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectLocation}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectLocation: e.target.value }))}
                      className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder={language === 'en' ? 'Miami, FL' : 'Miami, FL'}
                    />
                  </div>

                  {/* Installation Needed */}
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                    <input
                      type="checkbox"
                      id="installation"
                      checked={formData.installationNeeded}
                      onChange={(e) => setFormData(prev => ({ ...prev, installationNeeded: e.target.checked }))}
                      className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                    />
                    <label htmlFor="installation" className="flex items-center gap-2 text-sm">
                      <Wrench className="w-4 h-4 text-muted-foreground" />
                      {language === 'en' 
                        ? 'I need professional installation'
                        : 'Necesito instalación profesional'
                      }
                    </label>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {language === 'en' ? 'Project Details' : 'Detalles del Proyecto'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectDetails: e.target.value }))}
                      className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                      placeholder={language === 'en' 
                        ? 'Tell us about your project, timeline, special requirements...'
                        : 'Cuéntanos sobre tu proyecto, plazos, requisitos especiales...'
                      }
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg btn-gold font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {language === 'en' ? 'Submit Quote Request' : 'Enviar Solicitud'}
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuoteRequestForm;
