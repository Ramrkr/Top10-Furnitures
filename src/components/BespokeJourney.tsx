import { useState, useEffect, FormEvent } from 'react';
import { 
  MODELS, 
  TIMBERS, 
  calculateDesignMetrics, 
  CustomDesign, 
  ConsultationRequest 
} from '../types';
import { Sliders, Leaf, ShieldAlert, Sparkles, Scale, CheckCircle2 } from 'lucide-react';

interface BespokeJourneyProps {
  initialModelId?: string;
  initialTimberId?: string;
  onConsultationSubmit: (request: ConsultationRequest) => void;
}

export default function BespokeJourney({ 
  initialModelId, 
  initialTimberId, 
  onConsultationSubmit 
}: BespokeJourneyProps) {
  
  // Design state
  const [modelId, setModelId] = useState(initialModelId || MODELS[0].id);
  const [timberId, setTimberId] = useState(initialTimberId || TIMBERS[0].id);
  
  const selectedModel = MODELS.find(m => m.id === modelId) || MODELS[0];
  const selectedTimber = TIMBERS.find(t => t.id === timberId) || TIMBERS[0];

  const [width, setWidth] = useState(selectedModel.defaultWidth);
  const [depth, setDepth] = useState(selectedModel.defaultDepth);
  const [height, setHeight] = useState(selectedModel.defaultHeight);
  const [finish, setFinish] = useState<CustomDesign['finish']>('matte_oil');
  const [baseType, setBaseType] = useState<CustomDesign['baseType']>('wooden_tapered');

  // Contact info
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone'>('email');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Update dims when model changes or when initial properties are updated
  useEffect(() => {
    setWidth(selectedModel.defaultWidth);
    setDepth(selectedModel.defaultDepth);
    setHeight(selectedModel.defaultHeight);
  }, [modelId]);

  useEffect(() => {
    if (initialModelId) {
      setModelId(initialModelId);
    }
    if (initialTimberId) {
      setTimberId(initialTimberId);
    }
  }, [initialModelId, initialTimberId]);

  // Real-time calculations
  const { estimatedPrice, sustainabilityIndex } = calculateDesignMetrics({
    modelId,
    timberId,
    width,
    depth,
    height,
    finish,
    baseType
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!clientName.trim() || !clientEmail.trim()) {
      setErrorMsg('Please enter your name and email address to proceed.');
      return;
    }

    const newRequest: ConsultationRequest = {
      id: `req-${Date.now()}`,
      clientName,
      clientEmail,
      clientPhone,
      preferredContact,
      status: 'pending',
      notes: `Custom size request: ${width}cm width x ${depth}cm depth x ${height}cm height. Finish: ${finish.replace('_', ' ')}. Base type: ${baseType.replace('_', ' ')}.`,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      design: {
        id: `design-${Date.now()}`,
        modelId,
        timberId,
        width,
        depth,
        height,
        finish,
        baseType,
        sustainabilityIndex,
        estimatedPrice
      }
    };

    onConsultationSubmit(newRequest);
    setFormSubmitted(true);
    
    // Reset contact fields only
    setClientName('');
    setClientEmail('');
    setClientPhone('');
  };

  return (
    <section className="py-24 md:py-36 bg-brand-bg relative border-t border-outline-variant/30" id="bespoke">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <span className="font-sans font-extrabold text-[11px] tracking-[0.25em] text-primary uppercase block mb-4">
            CRAFT YOUR COMPOSITION
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-primary tracking-tight">
            The Bespoke Studio
          </h2>
          <p className="mt-5 text-brand-clay font-sans text-base md:text-lg leading-relaxed">
            Modify structural dimensioning, specify timber species, and simulate precise real-time pricing and sustainability ratings for your tailored piece.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Panel: Real-Time Schematic Visualizer Blueprint (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-6">
            <div className="bg-brand-low border border-outline-variant/40 rounded-xs p-6 relative overflow-hidden flex flex-col items-center justify-center aspect-square shadow-inner">
              
              {/* Drafting Grid Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#552c00_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Schematic Title */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-brand-clay/70 uppercase tracking-widest flex flex-col">
                <span>CAD BLUEPRINT // S-SERIES</span>
                <span>TOLERANCE: 0.1MM CNC</span>
              </div>

              <div className="absolute top-4 right-4 bg-primary/10 text-primary px-2 py-0.5 rounded-xs font-mono text-[9px] font-bold uppercase tracking-wider">
                {selectedTimber.name}
              </div>

              {/* Dynamic Schematic Render of the Furniture using responsive dimensions */}
              <div className="w-full h-full flex flex-col justify-center items-center mt-6">
                
                {/* Visualizer Frame */}
                <div className="relative w-4/5 h-1/2 flex items-center justify-center">
                  
                  {/* Furniture Model Schematic */}
                  <div className="relative flex flex-col items-center w-full max-w-[280px]">
                    
                    {/* Furniture Top Surface / Shell */}
                    <div 
                      className="rounded-xs transition-all duration-500 ease-out flex items-center justify-center text-[10px] text-white font-mono"
                      style={{
                        backgroundColor: selectedTimber.colorHex,
                        height: selectedModel.id === 'model-shelves' ? `${height / 2.5}px` : '20px',
                        width: `${Math.min(260, Math.max(100, (width / selectedModel.widthRange[1]) * 260))}px`,
                        boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
                        borderBottom: '3px solid rgba(0,0,0,0.3)'
                      }}
                    >
                      {/* Inner shelves indicators for Shelving grid */}
                      {selectedModel.id === 'model-shelves' && (
                        <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-1 gap-1">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="border border-white/25 border-dashed rounded-xs flex items-center justify-center" />
                          ))}
                        </div>
                      )}

                      {/* Seat details for Lounge chair */}
                      {selectedModel.id === 'model-lounge-chair' && (
                        <div className="w-full h-full flex flex-col justify-between p-1">
                          <div className="h-0.5 bg-white/20 w-3/4 rounded-xs" />
                          <div className="h-0.5 bg-black/20 w-full rounded-xs" />
                        </div>
                      )}
                    </div>

                    {/* Furniture Base / Legs */}
                    <div 
                      className="flex justify-between transition-all duration-500 ease-out"
                      style={{
                        width: `${Math.min(240, Math.max(80, (width / selectedModel.widthRange[1]) * 240))}px`,
                        height: selectedModel.id === 'model-shelves' ? '12px' : `${Math.min(110, Math.max(40, (height / selectedModel.heightRange[1]) * 110))}px`
                      }}
                    >
                      {baseType === 'wooden_tapered' && (
                        <>
                          <div className="w-4 bg-primary transform origin-top rotate-6" style={{ backgroundColor: selectedTimber.colorHex, clipPath: 'polygon(0% 0%, 100% 0%, 60% 100%, 20% 100%)' }} />
                          <div className="w-4 bg-primary transform origin-top -rotate-6" style={{ backgroundColor: selectedTimber.colorHex, clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 40% 100%)' }} />
                        </>
                      )}
                      
                      {baseType === 'steel_hairpin' && (
                        <>
                          <div className="w-2.5 border-r border-l border-slate-400 h-full opacity-80" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%, 50% 100%)' }} />
                          <div className="w-2.5 border-r border-l border-slate-400 h-full opacity-80" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%, 50% 100%)' }} />
                        </>
                      )}

                      {baseType === 'plinth_block' && (
                        <div className="w-full bg-slate-900/10 border-t border-outline-variant mt-2" style={{ backgroundColor: `${selectedTimber.colorHex}22`, height: '24px' }} />
                      )}
                    </div>

                  </div>

                </div>

                {/* Dimension Indicators Overlay */}
                <div className="mt-8 grid grid-cols-3 gap-6 text-center w-full border-t border-outline-variant/30 pt-4 font-mono text-[10px] text-brand-clay/90">
                  <div className="flex flex-col border-r border-outline-variant/20">
                    <span className="opacity-65 text-[9px]">WIDTH</span>
                    <span className="font-bold text-primary">{width} cm</span>
                  </div>
                  <div className="flex flex-col border-r border-outline-variant/20">
                    <span className="opacity-65 text-[9px]">DEPTH</span>
                    <span className="font-bold text-primary">{depth} cm</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="opacity-65 text-[9px]">HEIGHT</span>
                    <span className="font-bold text-primary">{height} cm</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Price & Eco metrics dashboard Card */}
            <div className="bg-tertiary text-white p-6 rounded-xs shadow-md border border-transparent">
              <span className="font-sans font-extrabold text-[9px] tracking-widest text-apricot-tint uppercase block mb-1">
                REAL-TIME VALUATION
              </span>
              
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-serif text-3xl font-medium">
                  ₹{estimatedPrice.toLocaleString()}
                </span>
                <span className="font-sans text-[11px] opacity-75">
                  FOB Tamil Nadu, India
                </span>
              </div>

              <div className="space-y-3.5 pt-3.5 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-white/80">
                    <Leaf className="w-4 h-4 text-brand-sage" />
                    <span className="font-sans text-xs">Sustainability Rating</span>
                  </div>
                  <span className="font-sans font-bold text-xs text-brand-sage">
                    {sustainabilityIndex}% Perfect Score
                  </span>
                </div>

                {/* Micro Carbon Rating bar */}
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-brand-sage h-full rounded-full transition-all duration-500"
                    style={{ width: `${sustainabilityIndex}%` }}
                  />
                </div>

                <p className="font-sans text-[11px] text-white/70 leading-relaxed">
                  Every customized design incorporates sustainably harvested timbers under active FSC forest stewardship guidelines. This prevents forest depletion and optimizes local carbon retention index values.
                </p>
              </div>
            </div>

          </div>

          {/* Right Panel: Configurator form controls (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              {/* Category 1: Model Choice */}
              <div>
                <span className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary block mb-3 uppercase">
                  01. SELECT COMPOSITION BASE
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setModelId(model.id)}
                      className={`p-4 text-left border rounded-xs transition-all duration-300 flex flex-col justify-between h-32 cursor-pointer select-none ${
                        modelId === model.id
                          ? 'border-primary bg-brand-low shadow-sm'
                          : 'border-outline-variant/30 bg-white hover:bg-brand-low/50'
                      }`}
                    >
                      <span className="font-serif text-sm font-semibold text-primary">
                        {model.name}
                      </span>
                      <span className="font-sans text-xs text-brand-clay leading-snug line-clamp-2">
                        {model.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category 2: Lumber Type Choice */}
              <div>
                <span className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary block mb-3 uppercase">
                  02. SPECIFY TIMBER SPECIES
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {TIMBERS.map((timber) => (
                    <button
                      key={timber.id}
                      type="button"
                      onClick={() => setTimberId(timber.id)}
                      className={`p-3.5 text-center border rounded-xs transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                        timberId === timber.id
                          ? 'border-primary bg-brand-low shadow-xs font-semibold'
                          : 'border-outline-variant/30 bg-white hover:bg-brand-low/50'
                      }`}
                    >
                      {/* Wood Color Chip */}
                      <div 
                        className="w-5 h-5 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: timber.colorHex }}
                      />
                      <span className="font-sans text-[11px] uppercase tracking-wider text-brand-ebony block">
                        {timber.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category 3: Dimension Sliders */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary uppercase">
                    03. ADJUST DIMENSION SLIDERS
                  </span>
                  <span className="font-sans text-[11px] italic text-brand-clay">
                    Structural limit limits enforced
                  </span>
                </div>
                
                <div className="space-y-6 bg-white p-5 border border-outline-variant/30 rounded-xs">
                  
                  {/* Width slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between font-sans text-xs">
                      <span className="font-bold text-brand-ebony">Width</span>
                      <span className="font-mono text-primary font-semibold">{width} cm</span>
                    </div>
                    <input 
                      type="range"
                      min={selectedModel.widthRange[0]}
                      max={selectedModel.widthRange[1]}
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value))}
                      className="w-full accent-primary h-1 bg-brand-low rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[9px] text-brand-clay/60">
                      <span>Min: {selectedModel.widthRange[0]}cm</span>
                      <span>Max: {selectedModel.widthRange[1]}cm</span>
                    </div>
                  </div>

                  {/* Depth slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between font-sans text-xs">
                      <span className="font-bold text-brand-ebony">Depth</span>
                      <span className="font-mono text-primary font-semibold">{depth} cm</span>
                    </div>
                    <input 
                      type="range"
                      min={selectedModel.depthRange[0]}
                      max={selectedModel.depthRange[1]}
                      value={depth}
                      onChange={(e) => setDepth(parseInt(e.target.value))}
                      className="w-full accent-primary h-1 bg-brand-low rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[9px] text-brand-clay/60">
                      <span>Min: {selectedModel.depthRange[0]}cm</span>
                      <span>Max: {selectedModel.depthRange[1]}cm</span>
                    </div>
                  </div>

                  {/* Height slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between font-sans text-xs">
                      <span className="font-bold text-brand-ebony">Height</span>
                      <span className="font-mono text-primary font-semibold">{height} cm</span>
                    </div>
                    <input 
                      type="range"
                      min={selectedModel.heightRange[0]}
                      max={selectedModel.heightRange[1]}
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                      className="w-full accent-primary h-1 bg-brand-low rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[9px] text-brand-clay/60">
                      <span>Min: {selectedModel.heightRange[0]}cm</span>
                      <span>Max: {selectedModel.heightRange[1]}cm</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Category 4: Finish & Bases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Finish picker */}
                <div>
                  <span className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary block mb-3 uppercase">
                    04. TEXTURED FINISH
                  </span>
                  <div className="space-y-2">
                    {(['matte_oil', 'satin_wax', 'raw_sanded'] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFinish(f)}
                        className={`w-full p-3 text-left border rounded-xs font-sans text-xs transition-all cursor-pointer flex justify-between items-center ${
                          finish === f
                            ? 'border-primary bg-brand-low font-bold text-primary'
                            : 'border-outline-variant/20 bg-white text-brand-clay hover:bg-brand-low/40'
                        }`}
                      >
                        <span>
                          {f === 'matte_oil' ? 'Matte Organic Oil (Natural)' : f === 'satin_wax' ? 'Satin Protective Wax' : 'Raw Sanded Precision'}
                        </span>
                        <span className="font-mono text-[9px] bg-brand-container px-1.5 py-0.5 rounded-xs text-brand-clay">
                          {f === 'matte_oil' ? '+₹4,000' : f === 'satin_wax' ? '+₹6,000' : '+₹0'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Base Type picker */}
                <div>
                  <span className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary block mb-3 uppercase">
                    05. SUPPORT LEG STYLE
                  </span>
                  <div className="space-y-2">
                    {(['wooden_tapered', 'steel_hairpin', 'plinth_block'] as const).map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBaseType(b)}
                        className={`w-full p-3 text-left border rounded-xs font-sans text-xs transition-all cursor-pointer flex justify-between items-center ${
                          baseType === b
                            ? 'border-primary bg-brand-low font-bold text-primary'
                            : 'border-outline-variant/20 bg-white text-brand-clay hover:bg-brand-low/40'
                        }`}
                      >
                        <span>
                          {b === 'wooden_tapered' ? 'Traditional Tapered Wood Legs' : b === 'steel_hairpin' ? 'Royal Brass Hairpin Rods' : 'Chettinad Plinth Solid Block'}
                        </span>
                        <span className="font-mono text-[9px] bg-brand-container px-1.5 py-0.5 rounded-xs text-brand-clay">
                          {b === 'wooden_tapered' ? '+₹0' : b === 'steel_hairpin' ? '+₹6,500' : '+₹12,000'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Category 5: Client Contact & Submission Details */}
              <div className="border-t border-outline-variant/30 pt-8 mt-4">
                <span className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary block mb-4 uppercase">
                  06. SUBMIT BESPOKE ENQUIRY
                </span>
                
                <div className="bg-white p-6 border border-outline-variant/30 rounded-xs space-y-4">
                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-2.5 rounded-xs flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-500" />
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-sans text-[11px] uppercase font-bold tracking-wider text-brand-clay">
                        Full Name *
                      </label>
                      <input 
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Ramakrishnan"
                        className="w-full bg-brand-low border border-outline-variant/30 px-3.5 py-2 text-sm rounded-xs focus:outline-none focus:border-primary text-brand-ebony"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-sans text-[11px] uppercase font-bold tracking-wider text-brand-clay">
                        Email Address *
                      </label>
                      <input 
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g. ram@tamilnaducrafts.in"
                        className="w-full bg-brand-low border border-outline-variant/30 px-3.5 py-2 text-sm rounded-xs focus:outline-none focus:border-primary text-brand-ebony"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-sans text-[11px] uppercase font-bold tracking-wider text-brand-clay">
                        Phone Number
                      </label>
                      <input 
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="e.g. +91 98400 12345"
                        className="w-full bg-brand-low border border-outline-variant/30 px-3.5 py-2 text-sm rounded-xs focus:outline-none focus:border-primary text-brand-ebony"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-sans text-[11px] uppercase font-bold tracking-wider text-brand-clay">
                        Preferred Contact Method
                      </label>
                      <div className="flex gap-2 bg-brand-low p-1 rounded-xs border border-outline-variant/20">
                        <button
                          type="button"
                          onClick={() => setPreferredContact('email')}
                          className={`flex-1 py-1.5 font-sans font-semibold text-xs rounded-xs cursor-pointer ${
                            preferredContact === 'email' ? 'bg-white text-primary shadow-xs' : 'text-brand-clay'
                          }`}
                        >
                          Email
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreferredContact('phone')}
                          className={`flex-1 py-1.5 font-sans font-semibold text-xs rounded-xs cursor-pointer ${
                            preferredContact === 'phone' ? 'bg-white text-primary shadow-xs' : 'text-brand-clay'
                          }`}
                        >
                          Phone Call
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-tertiary text-white font-sans font-extrabold text-xs tracking-widest uppercase py-4 rounded-xs transition-all duration-300 shadow-sm cursor-pointer hover:shadow-md mt-2 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-apricot-tint" />
                    Submit Consultation Enquiry
                  </button>
                </div>
              </div>

            </form>

            {/* Success Feedback Modal */}
            {formSubmitted && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xs border border-outline-variant/40 shadow-2xl max-w-md w-full p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-brand-sage/20 text-brand-sage rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-primary mb-3">
                    Enquiry Received
                  </h3>
                  <p className="font-sans text-sm text-brand-clay leading-relaxed mb-6">
                    We have successfully catalogued your custom <span className="font-bold">{selectedModel.name}</span> configurations. A master wood designer will analyze your dimensional specifications and email your custom material draft within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-primary hover:bg-tertiary text-white px-8 py-3 font-sans font-bold text-xs tracking-wider uppercase rounded-xs transition-colors cursor-pointer w-full"
                  >
                    Return to Studio
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
