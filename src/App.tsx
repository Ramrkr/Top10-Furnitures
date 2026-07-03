import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Craftsmanship from './components/Craftsmanship';
import DesignStudio from './components/DesignStudio';
import PlywoodBento from './components/PlywoodBento';
import ProductsCatalog from './components/ProductsCatalog';
import BespokeJourney from './components/BespokeJourney';
import ConsultationList from './components/ConsultationList';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import { ConsultationRequest } from './types';
import { Sparkles, Mail, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Saved designs state (Durable Local Client State)
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [requestsDrawerOpen, setRequestsDrawerOpen] = useState(false);
  
  // Bespoke customizer link states (pre-loading)
  const [preselectedModel, setPreselectedModel] = useState<string | undefined>(undefined);
  const [preselectedTimber, setPreselectedTimber] = useState<string | undefined>(undefined);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lumber_grain_consultations');
      if (stored) {
        setRequests(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse local storage consultations', e);
    }
  }, []);

  // Save to local storage
  const handleAddRequest = (newRequest: ConsultationRequest) => {
    const updated = [newRequest, ...requests];
    setRequests(updated);
    localStorage.setItem('lumber_grain_consultations', JSON.stringify(updated));
  };

  const handleDeleteRequest = (id: string) => {
    const filtered = requests.filter(r => r.id !== id);
    setRequests(filtered);
    localStorage.setItem('lumber_grain_consultations', JSON.stringify(filtered));
  };

  // Scroll to section helper
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Pre-load bespoke configurator with selection and scroll down
  const handlePreloadBespoke = (modelId: string, timberId: string) => {
    setPreselectedModel(modelId);
    setPreselectedTimber(timberId);
    handleScrollToSection('bespoke');
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-brand-bg relative flex flex-col antialiased">
      {/* Absolute background wood grain noise overlay */}
      <div className="grain-overlay" />

      {/* Luxury Navigation Header */}
      <Header 
        onNavClick={handleScrollToSection} 
        onRequestViewClick={() => setRequestsDrawerOpen(true)}
        requestCount={requests.length}
      />

      {/* Main app sections */}
      <main className="flex-1">
        
        {/* Full screen Hero section */}
        <Hero onExploreClick={() => handleScrollToSection('products-catalog')} />

        {/* Detailed Craftsmanship story block */}
        <Craftsmanship />

         {/* Curated Products Catalog */}
        <ProductsCatalog onConfigureClick={handlePreloadBespoke} />

        {/* Interior Studio light simulator layout showcase */}
        <DesignStudio />


        {/* Modular Bento grid featuring plywood design innovation */}
        {/*<PlywoodBento onShopNowClick={handlePreloadBespoke} />*/}

        {/* Bespoke interactive constructor room */}
        <BespokeJourney 
          initialModelId={preselectedModel}
          initialTimberId={preselectedTimber}
          onConsultationSubmit={handleAddRequest}
        />

      </main>

      {/* Saved Consultations Sidebar Drawer */}
      {requestsDrawerOpen && (
        <ConsultationList 
          requests={requests}
          onDeleteRequest={handleDeleteRequest}
          onClose={() => setRequestsDrawerOpen(false)}
        />
      )}

      {/* Clean Architectural footer block */}
      <Footer onNavClick={handleScrollToSection} />

      {/* Floating WhatsApp DM Support */}
      <WhatsAppFloating />
    </div>
  );
}
