import { useState } from 'react';
import { Leaf, Cpu, Award, ArrowUpRight, X, Play } from 'lucide-react';

interface PlywoodBentoProps {
  onShopNowClick: (modelId: string, timberId: string) => void;
}

export default function PlywoodBento({ onShopNowClick }: PlywoodBentoProps) {
  const [activeModal, setActiveModal] = useState<'integrity' | 'eco' | 'precision' | null>(null);

  const modalContents = {
    integrity: {
      title: 'Structural Layering & Integrity',
      subtitle: 'Premium Multi-ply Hardwood Birch',
      paragraphs: [
        'Our plywood features 18 alternating thin layers of premium Birch wood, cross-banded and heat-pressed to achieve load capacities exceeding traditional solid wood of equal weight. There are no hollow voids or knot filler inside.',
        'This architectural grain structure entirely avoids seasonal expansion, bowing, or warping, allowing us to implement radical cantilevered furniture forms and ultra-thin profiles without compromising durability.'
      ],
      metric: 'Load capacity: Up to 380kg',
    },
    eco: {
      title: 'Soy-Based Eco Core Adhesives',
      subtitle: 'Zero-VOC Formaldehyde-Free Bonding',
      paragraphs: [
        'Unlike industrial plywood which utilizes urea-formaldehyde adhesives that off-gas toxic chemical vapors into homes over decades, our lumber utilizes 100% natural, soy-based adhesives.',
        'This matches the highest environmental standards (LEED, CARB Phase 2, and FSC certification), ensuring absolutely pristine indoor air quality and safe environments for children and pets.'
      ],
      metric: 'VOC emission rating: 0.00 ppm',
    },
    precision: {
      title: 'CNC-Milled Robotics & Craft',
      subtitle: 'Digital Fab-Lab 0.1mm Precision Tolerance',
      paragraphs: [
        'We blend hand-shaving craft with automated 3-axis CNC router technology. Complex joineries like mortise-and-tenons, jigsaw interlocking seams, and dowel channels are calculated to 0.1mm tolerance.',
        'This robotic precision ensures that every tab snaps snugly into place, maximizing structural lock. Each part is hand-beveled and sanded with premium oils for a premium tactile finish.'
      ],
      metric: 'Assembly tolerance: 0.1mm',
    }
  };

  return (
    <section className="py-24 md:py-36 bg-white" id="plywood">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="font-sans font-extrabold text-[11px] tracking-[0.25em] text-primary uppercase block mb-4">
            MODERN SOLUTIONS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-brand-ebony tracking-tight">
            Plywood Innovation
          </h2>
          <p className="mt-5 text-brand-clay font-sans text-base md:text-lg leading-relaxed">
            Highlighting the beauty and versatility of high-grade plywood furniture—minimalist, durable, and sustainable.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[750px] relative">
          
          {/* Card 1: Structural Integrity (Left Column, Large) */}
          <div 
            onClick={() => setActiveModal('integrity')}
            className="md:col-span-2 md:row-span-2 bg-brand-low p-8 md:p-12 flex flex-col justify-end group overflow-hidden relative rounded-xs border border-outline-variant/20 hover:border-primary/40 cursor-pointer shadow-xs hover:shadow-md transition-all duration-500 select-none"
          >
            {/* Background Image with hover zoom */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-104">
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUKzmLGheGdguRdFv3YbC0hT97Yq5GelOurRBg5DMPZTzFBBWSUC5ffshWqG87cwkrGNjdl_KMmO2RtTUD2WvmPKV5Tc7kUquFyskOItfUcWe2VE1Nzih13Tyl6465DYBGOim-BCyJ3hLaBpB9F2rgDCfW1AXBJUOf-HWTTFSDajJOY3hTf-WB17xeBEwYrxucQRZSDLQ5uBx_o-toCtYv2Y_Bt4RXvZFhzXpUpMwQiH689D9EWuPHWX-IQiM94MMgxet9Dbkxmd0')` }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-black/20 to-transparent" />
            </div>

            <div className="relative z-10 text-white">
              <span className="inline-flex items-center gap-1.5 bg-white/25 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest mb-4">
                <Award className="w-3 h-3 text-apricot-tint" />
                Architectural Multi-ply
              </span>
              <h3 className="font-serif text-3xl font-medium mb-3 flex items-center gap-2">
                Structural Integrity
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="font-sans text-sm text-white/80 max-w-sm leading-relaxed">
                Layered strength that challenges the limits of furniture geometry. Click to inspect the grain.
              </p>
            </div>
          </div>

          {/* Card 2: Sustainable Core (Top Right, Horizontal) */}
          <div 
            onClick={() => setActiveModal('eco')}
            className="md:col-span-2 md:row-span-1 bg-brand-low p-8 flex items-center justify-between group rounded-xs border border-outline-variant/20 hover:border-primary/40 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 select-none"
          >
            <div className="max-w-[70%]">
              <span className="font-sans font-extrabold text-[10px] tracking-[0.2em] text-primary mb-2 block uppercase">
                01. ECO-CORE
              </span>
              <h3 className="font-serif text-2xl font-semibold text-tertiary mb-2 flex items-center gap-2">
                Sustainable Core
                <ArrowUpRight className="w-4.5 h-4.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="font-sans text-sm text-brand-clay leading-relaxed">
                Zero-VOC plant-based adhesives for pristine, healthy interior environments.
              </p>
            </div>
            <div className="p-5 bg-white rounded-full text-brand-sage/80 group-hover:text-primary transition-colors">
              <Leaf className="w-12 h-12 stroke-[1.2]" />
            </div>
          </div>

          {/* Card 3: Precision Cut (Bottom Right Grid Left, Small) */}
          <div 
            onClick={() => setActiveModal('precision')}
            className="md:col-span-1 md:row-span-1 bg-brand-low p-8 flex flex-col justify-center text-center group rounded-xs border border-outline-variant/20 hover:border-primary/40 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 select-none"
          >
            <div className="mx-auto p-4 bg-white rounded-full text-brand-clay group-hover:scale-105 transition-all mb-4">
              <Cpu className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h4 className="font-sans font-extrabold text-[10px] tracking-widest text-brand-ebony uppercase block mb-1">
              Precision Cut
            </h4>
            <p className="font-sans text-xs text-brand-clay leading-relaxed">
              CNC-milled joinery down to 0.1mm tolerance.
            </p>
          </div>

          {/* Card 4: New Release Shop Now (Bottom Right Grid Right, Small) */}
          <div 
            onClick={() => onShopNowClick('model-lounge-chair', 'plywood')}
            className="md:col-span-1 md:row-span-1 bg-tertiary text-white p-8 flex flex-col justify-between group rounded-xs border border-transparent hover:bg-primary cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 select-none"
          >
            <div>
              <span className="font-sans font-extrabold text-[10px] tracking-[0.2em] mb-3 block text-apricot-tint uppercase">
                NEW RELEASE
              </span>
              <p className="font-serif text-2xl font-medium leading-tight mb-2">
                The Plywood Lounge Series
              </p>
            </div>
            
            <button className="text-left font-sans font-extrabold text-[11px] tracking-widest uppercase border-b border-white/40 pb-1 w-fit group-hover:border-white transition-all flex items-center gap-1">
              SHOP NOW
              <Play className="w-2.5 h-2.5 fill-white" />
            </button>
          </div>

        </div>

        {/* Bento Cell detail Modal dialog */}
        {activeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-brand-bg rounded-xs border border-outline-variant/40 shadow-2xl max-w-lg w-full overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-sans font-extrabold text-[9px] tracking-[0.2em] text-walnut-gold uppercase block mb-1">
                      {modalContents[activeModal].subtitle}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-medium text-primary">
                      {modalContents[activeModal].title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="p-1.5 hover:bg-brand-low rounded-full text-brand-clay"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 my-6">
                  {modalContents[activeModal].paragraphs.map((p, idx) => (
                    <p key={idx} className="font-sans text-sm text-brand-clay leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="bg-brand-low px-4 py-3 border-l-2 border-primary rounded-r-xs flex justify-between items-center">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-clay">
                    Precision Metric
                  </span>
                  <span className="font-mono text-xs font-semibold text-primary">
                    {modalContents[activeModal].metric}
                  </span>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      onShopNowClick('model-lounge-chair', 'plywood');
                    }}
                    className="bg-primary text-white px-6 py-2.5 font-sans font-bold text-xs tracking-wider uppercase rounded-xs hover:bg-tertiary transition-colors"
                  >
                    Configure Plywood Lounge
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
