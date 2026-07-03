import { Share2, Globe, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Lumber & Grain | Artisanal Wood Furniture',
        text: 'Bespoke wooden and plywood furniture designed for longevity.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Application link copied to clipboard.');
    }
  };

  return (
    <footer className="w-full pt-20 pb-10 bg-brand-container border-t border-outline-variant/30 text-brand-ebony relative select-none z-10">
      
      {/* 12-Column Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        
        {/* Brand narrative (4 Columns) */}
        <div className="md:col-span-4 space-y-6">
          <button 
            onClick={() => onNavClick('hero')}
            className="font-serif text-2xl font-bold tracking-tight text-primary hover:opacity-85 text-left cursor-pointer"
          >
            TopTen Furnitures
          </button>
          
          <p className="font-sans text-sm text-brand-clay leading-relaxed max-w-sm">
            Crafting timeless furniture and environments since 1998. Every piece tells a story of the forest, the hand, and the home.
          </p>

          {/* Social Icons */}
          {/*<div className="flex gap-3">
            <button 
              onClick={handleShare}
              className="w-10 h-10 rounded-full border border-outline-variant/50 flex items-center justify-center text-brand-clay hover:bg-primary hover:text-white hover:border-transparent transition-all cursor-pointer"
              aria-label="Share App"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <a 
              href="https://ai.studio/build"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-outline-variant/50 flex items-center justify-center text-brand-clay hover:bg-primary hover:text-white hover:border-transparent transition-all"
              aria-label="Google AI Studio Workspace"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>*/}
        </div>

        {/* Column 2: Navigation (2 Columns) */}
        <div className="md:col-span-2 md:col-start-6 space-y-5">
          <h5 className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary uppercase">
            Navigation
          </h5>
          <ul className="space-y-3 font-sans text-sm text-brand-clay">
            <li>
              <button onClick={() => onNavClick('plywood')} className="hover:text-primary transition-colors cursor-pointer text-left">
                Products
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick('bespoke')} className="hover:text-primary transition-colors cursor-pointer text-left">
                Custom Builds
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick('interior')} className="hover:text-primary transition-colors cursor-pointer text-left">
                Interior Studio
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick('craftsmanship')} className="hover:text-primary transition-colors cursor-pointer text-left">
                Sustainability
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Support (2 Columns) */}
        <div className="md:col-span-2 space-y-5">
          <h5 className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary uppercase">
            Support
          </h5>
          <ul className="space-y-3 font-sans text-sm text-brand-clay">
            <li>
              <button onClick={() => onNavClick('bespoke')} className="hover:text-primary transition-colors cursor-pointer text-left">
                Shipping & Returns
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick('craftsmanship')} className="hover:text-primary transition-colors cursor-pointer text-left">
                Care Guide
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick('bespoke')} className="hover:text-primary transition-colors cursor-pointer text-left">
                Contact Us
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick('plywood')} className="hover:text-primary transition-colors cursor-pointer text-left">
                FAQs
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Workshop & Newsletter details (4 Columns) */}
        <div className="md:col-span-4 md:col-start-9 lg:col-span-3 lg:col-start-10 space-y-6">
          <div className="space-y-3">
            <h5 className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary uppercase">
              Join Our Journal
            </h5>
            <p className="font-sans text-xs text-brand-clay leading-relaxed">
              Subscribe for exclusive collection launches and sustainable workshop logs.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Welcome to Lumber & Grain! You have successfully subscribed."); }} className="flex gap-2">
              <input 
                type="email" 
                required
                placeholder="Your email"
                className="flex-1 min-w-0 bg-white border border-outline-variant/30 px-3 py-2 text-xs font-sans rounded-xs focus:outline-none focus:border-primary text-brand-ebony"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-tertiary text-white px-3 py-2 text-[10px] font-sans font-extrabold uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>

          <div className="pt-2 border-t border-outline-variant/20">
            <h5 className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary uppercase mb-2">
              TopTen Furnitures Workshop
            </h5>
            <p className="font-sans text-xs text-brand-clay leading-relaxed">
              VKV Kumaraguru Nagar<br />
              Viswasapuram,<br />
              Coimbatore, Tamil Nadu 641035<br />
              Mon - Sat: 9:00 - 19:00
            </p>
          </div>
        </div>

        {/* Bottom copyright metadata details */}
        <div className="col-span-full mt-12 pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-brand-clay">
          <div className="flex items-center gap-1">
            <span>© {currentYear} TopTen Furnitures. Crafted with longevity in Tamil Nadu.</span>
            <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
          </div>
          <div className="flex gap-6 font-sans font-extrabold text-[10px] tracking-widest text-brand-clay">
            <button className="hover:text-primary transition-colors cursor-pointer">PRIVACY POLICY</button>
            <button className="hover:text-primary transition-colors cursor-pointer">TERMS OF SERVICE</button>
          </div>
        </div>

      </div>

    </footer>
  );
}
