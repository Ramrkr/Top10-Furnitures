import { useState } from 'react';
import { motion } from 'motion/react';
import { TIMBERS, Timber } from '../types';
import { Sparkles, Trees, Info } from 'lucide-react';

export default function Craftsmanship() {
  const [selectedTimber, setSelectedTimber] = useState<Timber>(TIMBERS[0]);

  return (
    <section className="py-24 md:py-36 bg-brand-bg relative overflow-hidden" id="craftsmanship">
      {/* Decorative organic shapes */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-apricot-tint/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-brand-sage/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image with Hover Effect & Soft Backdrop */}
          <div className="lg:col-span-6 relative group">
            <div className="absolute -inset-4 bg-brand-highest rounded-sm -z-10 group-hover:scale-102 group-hover:bg-apricot-tint/30 transition-all duration-700 ease-out" />
            <div className="relative overflow-hidden aspect-[4/5] shadow-2xl rounded-xs">
              <img
                alt="Craftsmanship Detail - Hand carving raw timber grain with carpentry chisels"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWycl4C3sowYvAAq5QOZ-7p-tZh8UG4MHceTUyOJWIkeESh6a5_ncHHDaBQg4kt9wKVWOuZpqPuoQ5NtTrjt6-km9n8Ud0OrOhS5tzJuTq_6ngVsO0PBc9YRHk-jVYQgCc88yXhVP6lVCNPDdZwKwVVg07Wu-kuqp5tczizbMctaAksrCx7O7ZpOLSds2bhKLBdum9qvunYzPL1vSiYiMwugqqmoi6OcTPhhwt7vQB1y29lpuXHu9S6eQzkyiDtBkpqP5HF2th8MI"
                referrerPolicy="no-referrer"
              />
              
              {/* Soft overlay when displaying timber features */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 p-8 flex flex-col justify-end text-white">
                <p className="font-serif text-lg font-medium tracking-wide mb-1 text-apricot-tint">
                  {selectedTimber.name}
                </p>
                <p className="font-sans text-xs italic opacity-85 mb-3">
                  {selectedTimber.scientificName}
                </p>
                <p className="font-sans text-sm opacity-90 leading-relaxed max-w-sm">
                  {selectedTimber.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Stats */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <span className="font-sans font-extrabold text-[11px] tracking-[0.25em] text-primary uppercase">
              TRADITION & PRECISION
            </span>
            
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-primary leading-tight tracking-tight">
              The Art of the Grain
            </h2>
            
            <p className="font-sans text-base md:text-lg text-brand-clay leading-relaxed">
              Our South Indian master craftsmen from Tamil Nadu transform raw, sustainable timbers into generational heirloom pieces. Every joint, lock, and natural oil finish is a testament to our dedication to local heritage. We source our premium Teak, Rosewood, and Mahogany from government-managed forestries, ensuring each piece supports local craft while maintaining strict environmental responsibility.
            </p>

            {/* Interactive Timber Selector */}
            <div className="bg-brand-low p-5 border border-outline-variant/30 rounded-xs">
              <span className="font-sans font-extrabold text-[9px] tracking-0.15em text-brand-clay uppercase block mb-3">
                Tap to explore our sustainably sourced timbers:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {TIMBERS.map((timber) => (
                  <button
                    key={timber.id}
                    onClick={() => setSelectedTimber(timber)}
                    className={`px-4 py-2 font-sans font-bold text-[11px] uppercase tracking-wider transition-all duration-300 rounded-xs cursor-pointer ${
                      selectedTimber.id === timber.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white text-brand-clay hover:bg-brand-high border border-outline-variant/20'
                    }`}
                  >
                    {timber.name}
                  </button>
                ))}
              </div>

              {/* Timber stats details */}
              <div className="mt-4 pt-4 border-t border-outline-variant/30 grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-brand-clay mb-0.5">
                    <Trees className="w-3.5 h-3.5 text-walnut-gold" />
                    <span className="font-sans text-[10px] uppercase font-bold tracking-wider">Sustainability</span>
                  </div>
                  <span className="font-serif text-lg font-semibold text-primary">
                    {selectedTimber.sustainabilityScore}% Rating
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-brand-clay mb-0.5">
                    <Info className="w-3.5 h-3.5 text-walnut-gold" />
                    <span className="font-sans text-[10px] uppercase font-bold tracking-wider">Janka Hardness</span>
                  </div>
                  <span className="font-serif text-lg font-semibold text-primary">
                    {selectedTimber.hardnessJanka} lbf
                  </span>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-24 bg-primary/30" />

            {/* Big Heritage Stats */}
            <div className="flex gap-12 md:gap-16">
              <div>
                <span className="font-serif text-4xl md:text-5xl font-semibold text-primary leading-none block mb-2">
                  25+
                </span>
                <span className="font-sans font-bold text-[11px] tracking-widest text-brand-clay uppercase block">
                  Years Experience
                </span>
              </div>
              <div>
                <span className="font-serif text-4xl md:text-5xl font-semibold text-primary leading-none block mb-2">
                  100%
                </span>
                <span className="font-sans font-bold text-[11px] tracking-widest text-brand-clay uppercase block">
                  Sustainable
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
