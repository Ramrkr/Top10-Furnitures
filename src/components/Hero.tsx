import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-brand-bg select-none" id="hero">
      {/* Background Image and Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Artisanal Workspace - Solid Timber Monolith Table"
          className="w-full h-full object-cover scale-102 transform duration-1000"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuArmnrPTWyj3a5_0l5q_WSPbuyYccxM-LnNkuRFl7JnLHT7vdlKfDZ2e1dd806Bm_utTUKfJzCI9co7gVkquMzfxRF8NZWKpZXoMtU_4m6txK6eXa5YiJ18LEyK13-Q-mpcv9t6hkMgNTFdIkGADZiIUcKO5Rcr4L4kJvkJunMWvI8ClSJMoqt8JwY6c08y_9PWDv8RIInAQuHp9ES2KuHn6DGbkGeq9uOu0wmQrJCBo5GGHMPrbHAEAweM7ECBajxW6y57AlcInxA"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary/25 backdrop-brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-black/30" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto w-full pt-16">
        <div className="max-w-2xl text-white">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block font-sans font-extrabold text-[11px] tracking-[0.25em] uppercase text-apricot-tint mb-4"
          >
            ARTISANAL TIMBER & SPACE
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-5xl md:text-7xl font-semibold mb-6 leading-[1.05] tracking-tight drop-shadow-md"
          >
            Crafting the Soul of Your Space
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-lg md:text-xl font-light mb-10 text-white/90 leading-relaxed max-w-lg drop-shadow-sm"
          >
            Bespoke wooden furniture and visionary interior design tailored to your lifestyle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={onExploreClick}
              className="group bg-brand-bg text-tertiary px-9 py-4.5 font-sans font-extrabold text-xs tracking-widest uppercase hover:bg-apricot-tint hover:text-primary hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3.5 rounded-xs cursor-pointer active:scale-98"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        onClick={onExploreClick}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 hover:text-white cursor-pointer transition-colors duration-300 hidden md:flex flex-col items-center gap-2 animate-bounce"
        aria-label="Scroll Down"
      >
        <span className="font-sans font-bold text-[9px] tracking-[0.2em] uppercase opacity-80">Discover</span>
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}
