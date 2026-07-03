import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Mail, Clock, Building2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop with click-to-close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Centering wrapper */}
          <div className="flex min-h-screen items-center justify-center p-4 md:p-6 text-center">
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-brand-bg border border-outline-variant/30 shadow-2xl rounded-xs max-w-lg w-full max-h-[85vh] overflow-y-auto relative z-50 p-6 md:p-8 text-left"
            >
            {/* Sticky/Absolute prominent top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-brand-clay hover:text-primary hover:bg-brand-low/60 rounded-full transition-all cursor-pointer border border-outline-variant/20 bg-white"
              aria-label="Close modal"
              id="modal-close-top-btn"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <span className="font-sans font-extrabold text-[10px] tracking-[0.2em] text-walnut-gold uppercase block mb-2">
                  DIRECT CHANNELS
                </span>
                <h3 className="font-serif text-2xl font-semibold text-primary tracking-tight">
                  Consultation Hotlines
                </h3>
                <p className="font-sans text-xs text-brand-clay mt-1 leading-relaxed pr-6">
                  Connect with our timber atelier or general design team directly for bespoke estimates.
                </p>
              </div>

              <div className="h-[1px] bg-outline-variant/20" />

              {/* Contact Numbers List */}
              <div className="space-y-3">
                
                {/* Hub 1: Chennai Hub */}
                <div className="flex items-start gap-4 p-3 hover:bg-brand-low/40 rounded-xs transition-colors group border border-transparent hover:border-outline-variant/20">
                  <div className="p-2 bg-primary/5 rounded-xs text-primary group-hover:bg-primary/10 transition-colors">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-serif text-sm font-bold text-primary">Chennai Design Hub</h4>
                      <span className="font-mono text-[9px] text-walnut-gold tracking-widest uppercase">HEAD OFFICE</span>
                    </div>
                    <a href="tel:+914424999999" className="font-sans text-xs text-brand-ebony hover:text-primary font-bold block transition-colors mt-0.5">
                      +91 44 2499 9999
                    </a>
                    <span className="font-sans text-[10px] text-brand-clay block">
                      RK Salai, Mylapore, Chennai, TN 600004
                    </span>
                  </div>
                </div>

                {/* Hub 2: Bangalore Atelier */}
                <div className="flex items-start gap-4 p-3 hover:bg-brand-low/40 rounded-xs transition-colors group border border-transparent hover:border-outline-variant/20">
                  <div className="p-2 bg-primary/5 rounded-xs text-primary group-hover:bg-primary/10 transition-colors">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-serif text-sm font-bold text-primary">Bangalore Atelier</h4>
                      <span className="font-mono text-[9px] text-brand-clay tracking-widest uppercase">STUDIO</span>
                    </div>
                    <a href="tel:+918041234567" className="font-sans text-xs text-brand-ebony hover:text-primary font-bold block transition-colors mt-0.5">
                      +91 80 4123 4567
                    </a>
                    <span className="font-sans text-[10px] text-brand-clay block">
                      Koramangala 4th Block, Bengaluru, KA 560034
                    </span>
                  </div>
                </div>

                {/* Hub 3: Coimbatore Workshop */}
                <div className="flex items-start gap-4 p-3 hover:bg-brand-low/40 rounded-xs transition-colors group border border-transparent hover:border-outline-variant/20">
                  <div className="p-2 bg-primary/5 rounded-xs text-primary group-hover:bg-primary/10 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-serif text-sm font-bold text-primary">Coimbatore Workshop & Forestry</h4>
                      <span className="font-mono text-[9px] text-brand-clay tracking-widest uppercase">MANUFACTURING</span>
                    </div>
                    <a href="tel:+919840012345" className="font-sans text-xs text-brand-ebony hover:text-primary font-bold block transition-colors mt-0.5">
                      +91 98400 12345
                    </a>
                    <span className="font-sans text-[10px] text-brand-clay block">
                      62 Avinashi Road, Coimbatore, TN 641018
                    </span>
                  </div>
                </div>

              </div>

              <div className="h-[1px] bg-outline-variant/20" />

              {/* Supporting metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-brand-clay">
                  <Clock className="w-3.5 h-3.5 text-walnut-gold" />
                  <span>Mon - Sat: 9:00 - 19:00</span>
                </div>
                <div className="flex items-center gap-2 text-brand-clay">
                  <Mail className="w-3.5 h-3.5 text-walnut-gold" />
                  <a href="mailto:bespoke@lumberandgrain.in" className="hover:text-primary font-semibold transition-colors">
                    bespoke@lumberandgrain.in
                  </a>
                </div>
              </div>

              {/* Explicit Footer Close Button */}
              {/*<div className="pt-2 flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-primary hover:bg-tertiary text-white font-sans font-bold text-[10px] tracking-widest uppercase px-5 py-2.5 rounded-xs transition-all duration-200 active:scale-95 cursor-pointer"
                  id="modal-close-footer-btn"
                >
                  Close Window
                </button>
              </div>*/}
            </div>
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  );
}
