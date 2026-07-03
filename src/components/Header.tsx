import { useState } from 'react';
import { Menu, X, Search, PhoneCall, FolderHeart } from 'lucide-react';
import ContactModal from './ContactModal';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  onRequestViewClick: () => void;
  requestCount: number;
}

export default function Header({ onNavClick, onRequestViewClick, requestCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const navItems = [
    { label: 'Products', section: 'products-catalog' },
    { label: 'Custom Furniture', section: 'bespoke' },
    { label: 'Interior Design', section: 'interior' },
    { label: 'About Us', section: 'craftsmanship' }
  ];

  const handleItemClick = (section: string) => {
    onNavClick(section);
    setMobileMenuOpen(false);
  };

  const handleConsultationClick = () => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth < 768);
    if (isMobileDevice) {
      window.location.href = 'tel:+919944259992';
    } else {
      setContactModalOpen(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-brand-bg/90 backdrop-blur-md border-b border-outline-variant/20 shadow-[0_4px_20px_rgba(112,66,20,0.03)] transition-all duration-300">
        <nav className="flex justify-between items-center py-5 px-6 md:px-16 max-w-7xl mx-auto">
          {/* Brand Logo */}
          <button 
            onClick={() => handleItemClick('hero')} 
            className="font-serif text-2xl font-semibold text-primary tracking-tight cursor-pointer hover:opacity-90"
            id="logo-button"
          >
            TopTen Furniture
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-10 items-center">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleItemClick(item.section)}
                className="font-sans font-bold text-[11px] uppercase tracking-[0.15em] text-brand-clay hover:text-primary transition-all duration-300 relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/*<button 
              onClick={() => setSearchOpen(!searchOpen)} 
              className="p-2 text-brand-clay hover:text-primary transition-colors cursor-pointer"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5" />
            </button>*/}

            {requestCount > 0 && (
              <button 
                onClick={onRequestViewClick}
                className="relative p-2 text-brand-clay hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5"
                aria-label="View My Saved Consultations"
              >
                <FolderHeart className="w-5 h-5 text-walnut-gold" />
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                  {requestCount}
                </span>
              </button>
            )}

            <button
              onClick={handleConsultationClick}
              className="hidden sm:flex items-center gap-2 bg-tertiary text-white px-6 py-3 font-sans font-bold text-[11px] tracking-widest uppercase hover:bg-primary transition-all duration-300 active:scale-95 cursor-pointer rounded-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Consultation
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 text-primary cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Search overlay drop-down */}
        {searchOpen && (
          <div className="bg-brand-low border-b border-outline-variant/30 px-6 py-4 transition-all duration-300">
            <div className="max-w-3xl mx-auto flex gap-3">
              <input 
                type="text"
                placeholder="Search collections (e.g. walnut desk, plywood lounge, oak shelving)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white border border-outline-variant/40 rounded-xs px-4 py-2 text-brand-ebony focus:outline-none focus:border-primary text-sm font-sans"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleItemClick('plywood');
                    setSearchOpen(false);
                  }
                }}
              />
              <button 
                onClick={() => {
                  handleItemClick('plywood');
                  setSearchOpen(false);
                }}
                className="bg-primary text-white px-5 py-2 font-sans font-bold text-xs tracking-wider uppercase rounded-xs hover:opacity-90"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-bg border-b border-outline-variant/30 shadow-lg absolute top-full left-0 w-full z-30 transition-all duration-300 py-6 px-6 flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleItemClick(item.section)}
                className="text-left font-sans font-bold text-xs uppercase tracking-[0.15em] text-brand-clay hover:text-primary py-2 border-b border-outline-variant/10"
              >
                {item.label}
              </button>
            ))}
            {requestCount > 0 && (
              <button
                onClick={() => {
                  onRequestViewClick();
                  setMobileMenuOpen(false);
                }}
                className="text-left font-sans font-bold text-xs uppercase tracking-[0.15em] text-walnut-gold hover:text-primary py-2 border-b border-outline-variant/10 flex items-center gap-2"
              >
                My Saved Consultations ({requestCount})
              </button>
            )}
            <button
              onClick={() => {
                handleConsultationClick();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center bg-tertiary text-white py-3 font-sans font-bold text-xs tracking-widest uppercase hover:bg-primary transition-all duration-300"
            >
              Request Consultation
            </button>
          </div>
        )}
      </header>
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
}
