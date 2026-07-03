import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleWhatsAppClick = () => {
    // Direct DM with pre-filled message
    const message = encodeURIComponent("Hello Lumber & Grain, I'm interested in your custom timber and interior design services!");
    const url = `https://wa.me/919840012345?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            className="hidden md:block bg-primary text-white text-xs font-sans font-semibold py-2 px-3.5 rounded-xs shadow-md border border-white/10"
          >
            Chat with us
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Chat on WhatsApp"
        id="whatsapp-floating-button"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 2C6.446 2 1.92 6.478 1.92 12.01c0 1.93.55 3.81 1.6 5.46L1.5 22.5l5.18-1.34c1.57.85 3.32 1.29 5.08 1.29 5.58 0 10.11-4.48 10.11-10.01C21.87 6.478 17.344 2 12.031 2zm0 1.64c4.68 0 8.48 3.76 8.48 8.37 0 4.61-3.8 8.37-8.48 8.37-1.64 0-3.2-.47-4.55-1.35l-.33-.21-3.37.87.89-3.23-.24-.37c-.94-1.46-1.44-3.15-1.44-4.89-.01-4.6 3.79-8.36 8.48-8.36zm-3.67 4.54c-.11 0-.31.04-.47.21-.16.17-.61.59-.61 1.43s.62 1.64.71 1.76c.09.12 1.22 1.84 2.96 2.58.41.17.74.28.99.36.42.13.8.11 1.1.07.33-.05 1.02-.41 1.16-.81.14-.39.14-.73.1-.81-.04-.08-.16-.12-.33-.21-.17-.08-.99-.48-1.15-.53-.16-.06-.27-.08-.39.1-.11.18-.45.56-.55.67-.1.11-.21.13-.38.04-.17-.08-.71-.26-1.35-.82-.5-.44-.83-1-.93-1.17-.1-.17-.01-.26.08-.34.08-.07.17-.2.25-.3.08-.09.11-.16.17-.26.06-.11.03-.21-.01-.29-.04-.08-.39-.94-.53-1.28-.14-.33-.28-.29-.39-.29l-.33-.01z"/>
        </svg>
      </button>
    </div>
  );
}
