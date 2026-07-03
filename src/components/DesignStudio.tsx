import { useState, useEffect, FormEvent } from 'react';
import { 
  Compass, 
  Sun, 
  Eye, 
  ChevronRight, 
  ChevronLeft, 
  Sliders, 
  Star, 
  Quote, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Layers, 
  User, 
  Mail, 
  Phone,
  Clock,
  Hammer,
  Paintbrush,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Slides data for Services Provided
const SERVICES_SLIDES = [
  {
    title: 'Precision Modular Kitchens',
    tagline: 'FUNCTIONAL MINIMALISM',
    description: 'We construct modular wet/dry kitchens with premium BWR Gurjan multi-ply cores and high-pressure nanotech laminates. Engineered with dual-sink drainage, anti-termite cores, and customized for Indian heavy steel cookware.',
    features: ['Concealed Blum/Hettich soft-close systems', 'Integrated wooden finger pull tracks', 'Eco-adhesive anti-borer core'],
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    metric: 'BWR Marine Grade Durability'
  },
  {
    title: 'Cozy Living Room Havens',
    tagline: 'SPATIAL DEPTH & ACOUSTICS',
    description: 'Bespoke Sagar Teakwood ceiling panel rafters, traditional Athangudi clay borders, and built-in lowline TV credenzas align beautifully. We optimize grain directions to stretch light paths, making modern spaces feel larger yet intrinsically warm.',
    features: ['Acoustic wood panel buffers', 'Dowel-locked floating shelves', 'Warm lighting channel routes'],
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
    metric: 'Teakwood acoustic panels: +28% absorption'
  },
  {
    title: 'Tailored Bedroom Sanctuaries',
    tagline: 'RESTFUL TIMBER PATTERNS',
    description: 'Floor-to-ceiling multi-door wardrobe systems in rich Indian Rosewood, integrated brass handle rails, and king-size beds crafted with Nilgiri Teak. Every element promotes pristine indoor air quality.',
    features: ['Integrated bedside charging slots', 'Under-bed dustproof timber drawers', 'Satin rub non-toxic natural wax coating'],
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    metric: 'Zero-VOC Certified Sanctuary'
  },
  {
    title: 'High-End Office & Creative Studios',
    tagline: 'COGNITIVE CLARITY & FOCUS',
    description: 'Workstations carved gracefully using vacuum-formed plywood sheets. Reducing right angles minimizes cognitive friction and guides sightlines towards natural outdoor spaces for Chennai & Bangalore tech professionals.',
    features: ['Recessed flush cable trays', 'Ergonomic plywood elbow guides', 'Hidden dual-pivot storage doors'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    metric: 'Engineered for 12h+ comfort'
  }
];

// Slides data for Previous Projects Done by Us
const PROJECTS_SLIDES = [
  {
    name: 'The Athangudi Heritage Villa',
    location: 'Karaikudi, Tamil Nadu',
    year: '2024',
    scope: 'Traditional Chettinad Renovation',
    description: 'A stunning preservation project integrating grand Nilgiri teak pillars, handmade Athangudi floor tiles, and high-performance custom Rosewood modular wardrobes.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    metric: 'Heritage timber restored: 3.5 Tons'
  },
  {
    name: 'The ECR Beachfront Penthouse',
    location: 'Chennai, Tamil Nadu',
    year: '2025',
    scope: 'Modern 3 BHK Coastal Suite',
    description: 'Expansive modern layout with solid Sagar Teak wood pivot entry doors, acoustic slatted bedroom walls, and a master modular kitchen crafted from water-resistant Gurjan timber.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    metric: '100% Water-Resistant Core'
  },
  {
    name: 'The Nilgiri Foothills Retreat',
    location: 'Ooty, Tamil Nadu',
    year: '2023',
    scope: '2 BHK Mountain Cabin',
    description: 'A cozy mountain retreat showcasing solid Mahogany bed frames, fluted wall acoustics, and hand-rubbed linseed oil finishes for high-elevation comfort.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    metric: 'Zero-VOC Natural Linseed Coat'
  }
];

// Testimonials
const TESTIMONIALS = [
  {
    quote: "The modular kitchen fits like an absolute glove down to the millimeter. There are no sloppy spacers or generic covers—everything is solid, heavy, tactile wood. Ebco soft-close systems are incredibly smooth.",
    author: "Aravind Swamy",
    role: "Principal Architect",
    location: "Chennai, TN",
    project: "ECR Beachfront Villa",
    rating: 5
  },
  {
    quote: "We chose the 3 BHK Chettinad Classic package. The wood selection of genuine Sagar Teak and Gurjan plywood is outstanding. Absolutely no chemical odours, just natural wood fragrance.",
    author: "Meenakshi Sundaram",
    role: "Heritage Preservationist",
    location: "Madurai, TN",
    project: "3 BHK Ancestral Home",
    rating: 5
  },
  {
    quote: "Their wardrobe door-opening fluted design is legendary, but the acoustic ceiling slats in my video production room in Coimbatore made the biggest difference.",
    author: "Karthik Raja",
    role: "Creative Director",
    location: "Coimbatore, TN",
    project: "2 BHK Studio Cabin",
    rating: 5
  }
];

// BHK package estimate specs
const BHK_PACKAGES = {
  '1bhk': { name: '1 BHK Starter', basePrice: 450000, timeToComplete: '4-5 Weeks', description: 'Covers 1 Living Room with Athangudi borders, 1 Modular Kitchen with BWR Gurjan core, 1 Bedroom Wardrobe, and 1 Vanity.' },
  '2bhk': { name: '2 BHK Classic', basePrice: 680000, timeToComplete: '5-6 Weeks', description: 'Covers 1 Living Room with Teak wood rafters, 1 Modular Kitchen, 2 Bedrooms (Wardrobes), and 1 Entry Pivot Door.' },
  '3bhk': { name: '3 BHK Royal Suite', basePrice: 950000, timeToComplete: '6-8 Weeks', description: 'Covers 1 Living Room with acoustic teak slats, 1 Luxury Kitchen, 3 Bedrooms (Wardrobes & Desks), and Karaikudi main door.' },
  '4bhk': { name: '4 BHK Grand Manor', basePrice: 1400000, timeToComplete: '8-10 Weeks', description: 'Covers complete custom wood paneling, 1 Premium Island Kitchen, 4 Bedrooms, and bespoke entryway credenzas.' },
  '5bhk': { name: '5 BHK Palace Estate', basePrice: 1950000, timeToComplete: '10-12 Weeks', description: 'Full coverage. Includes integrated timber ceilings, modular library shelving, dual kitchens, and custom pivot entries.' },
  'custom': { name: 'Custom Design', basePrice: 300000, timeToComplete: 'Tailored timeline', description: 'Fully tailored design. Configure your own custom room counts, premium fittings, and timber grades.' }
};

const TIMBER_MULTIPLIERS = {
  'gurjan': { name: 'BWR Gurjan Plywood (Borer Proof)', rate: 1.0 },
  'mahogany': { name: 'Premium Mahogany (Treated)', rate: 1.2 },
  'teakwood': { name: 'Sagar Teak (Grade-A)', rate: 1.5 },
  'rosewood': { name: 'Indian Rosewood (Super Luxury)', rate: 1.8 }
};

const FITTING_GRADES = {
  'standard': { name: 'Ebco Soft-Close Runners (Standard)', price: 0 },
  'gourmet': { name: 'Hettich/Blum Soft-Close Systems', price: 45000 },
  'elite': { name: 'Hafele / Blum Touchless Hydraulic Hinges', price: 95000 }
};

const FLOORING_OPTIONS = {
  'none': { name: 'Keep Existing Flooring', price: 0 },
  'tiles': { name: 'Double-Charged Vitrified Tiles (Modern Standard)', price: 45000 },
  'granite': { name: 'Polished Sadahalli Granite Flooring', price: 85000 },
  'athangudi': { name: 'Heritage Athangudi Handmade Clay Tiles (Tamil Nadu)', price: 125000 },
  'marble': { name: 'Premium Royal Italian Marble Flooring', price: 240000 }
};

export default function DesignStudio() {
  // Carousel states
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Door opening visual states
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [isDoorAnimating, setIsDoorAnimating] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  // Customizer form values
  const [selectedBhk, setSelectedBhk] = useState<keyof typeof BHK_PACKAGES>('2bhk');
  const [selectedTimberGrade, setSelectedTimberGrade] = useState<keyof typeof TIMBER_MULTIPLIERS>('gurjan');
  const [selectedFittings, setSelectedFittings] = useState<keyof typeof FITTING_GRADES>('gourmet');
  const [selectedFlooring, setSelectedFlooring] = useState<keyof typeof FLOORING_OPTIONS>('none');
  const [acousticPanels, setAcousticPanels] = useState(false);
  const [customWardrobeCount, setCustomWardrobeCount] = useState(1);

  // Consultation scheduler states
  const [selectedDate, setSelectedDate] = useState('2026-07-06');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 AM');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Interactive Sun Position Simulator for main panel
  const [sunPosition, setSunPosition] = useState<'morning' | 'noon' | 'sunset'>('noon');

  const sunSettings = {
    morning: {
      overlayClass: 'bg-amber-500/10 mix-blend-color-burn',
      brightness: 'brightness-105 saturate-110',
      description: 'Morning (8:00 AM): Soft amber warmth highlighting custom kitchen layouts and morning meditation light.',
    },
    noon: {
      overlayClass: 'bg-transparent',
      brightness: 'brightness-100 saturate-100',
      description: 'Noon (12:00 PM): Bright neutral illumination casting zero-glare shadows over structural workspace desks.',
    },
    sunset: {
      overlayClass: 'bg-orange-600/25 mix-blend-overlay',
      brightness: 'brightness-90 saturate-125 contrast-105',
      description: 'Sunset (6:00 PM): Striking crimson glow casting architectural long shadows along bedroom panels.',
    },
  };

  // Autoplay intervals for carousels
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveServiceIdx((prev) => (prev + 1) % SERVICES_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Calculate current estimate price
  const calculateEstimate = () => {
    const packageBase = BHK_PACKAGES[selectedBhk].basePrice;
    const woodMult = TIMBER_MULTIPLIERS[selectedTimberGrade].rate;
    const fittingsCost = FITTING_GRADES[selectedFittings].price;
    const flooringCost = FLOORING_OPTIONS[selectedFlooring].price;
    const panelsCost = acousticPanels ? 75000 : 0;
    const wardrobeExtra = (customWardrobeCount - 1) * 120000;

    return Math.round((packageBase * woodMult) + fittingsCost + flooringCost + panelsCost + wardrobeExtra);
  };

  // Carbon sequestered estimation based on BHK and wood choice
  const calculateCarbonSequestered = () => {
    const baseCarbon = selectedBhk === '1bhk' ? 2.5 : selectedBhk === '2bhk' ? 4.2 : selectedBhk === '3bhk' ? 6.1 : selectedBhk === '4bhk' ? 8.2 : selectedBhk === '5bhk' ? 10.5 : 3.0;
    const woodMult = selectedTimberGrade === 'gurjan' ? 1.0 : selectedTimberGrade === 'mahogany' ? 1.2 : selectedTimberGrade === 'teakwood' ? 1.4 : 1.6;
    return (baseCarbon * woodMult).toFixed(1);
  };

  const handleOpenDoor = () => {
    setIsDoorAnimating(true);
    // Simulate handle latching click, then swing open
    setTimeout(() => {
      setIsDoorOpen(true);
      setTimeout(() => {
        setShowCustomizer(true);
        setIsDoorAnimating(false);
      }, 950);
    }, 400);
  };

  const handleCloseCustomizer = () => {
    setShowCustomizer(false);
    setIsDoorOpen(false);
  };

  const handleScheduleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <section className="py-24 md:py-36 bg-brand-low border-t border-outline-variant/30" id="interior">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <span className="font-sans font-extrabold text-[11px] tracking-[0.25em] text-primary uppercase block mb-4">
              ARCHITECTURAL INTEGRATION
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-primary tracking-tight leading-tight">
              Designing Cohesive Environments
            </h2>
            <p className="mt-5 text-brand-clay font-sans text-base md:text-lg leading-relaxed">
              We translate our custom furniture logic into complete living systems. Utilizing healthy materials, zero-VOC adhesives, and precision engineering for flawless spatial flow.
            </p>
          </div>

          {/* Customize CTA Button with animation preview */}
          <div>
            <button
              onClick={handleOpenDoor}
              className="bg-primary hover:bg-tertiary text-white font-sans font-extrabold text-xs tracking-widest uppercase py-4.5 px-8 rounded-xs shadow-md hover:shadow-lg transition-all flex items-center gap-3 group cursor-pointer relative overflow-hidden"
              id="btn-custom-interiors"
            >
              <Sliders className="w-4 h-4 text-apricot-tint animate-pulse" />
              <span>Customize Your Interiors</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>

        {/* DOOR OPENING INTERACTIVE SCREEN (Framer Motion swing doors) */}
        <AnimatePresence>
          {isDoorAnimating || isDoorOpen ? (
            <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              
              {!showCustomizer ? (
                /* Swing door visual panels */
                <div className="relative w-full max-w-2xl aspect-[1.2/1] bg-slate-950 border border-white/10 overflow-hidden rounded-xs flex shadow-2xl" style={{ perspective: '1500px' }}>
                  
                  {/* Left Premium Teak/Rosewood Fluted Wardrobe Door */}
                  <motion.div 
                    initial={{ x: 0 }}
                    animate={{ x: isDoorOpen ? '-100%' : 0, rotateY: isDoorOpen ? -110 : 0, z: isDoorOpen ? -100 : 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                    className="w-1/2 h-full flex flex-col justify-between p-8 relative shadow-2xl origin-left"
                    style={{ 
                      backgroundImage: 'repeating-linear-gradient(90deg, #5c301c, #5c301c 15px, #422115 15px, #422115 30px)',
                      borderRight: '2px solid rgba(0,0,0,0.5)',
                      boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.4)'
                    }}
                  >
                    {/* Brass Inlay panel trim */}
                    <div className="absolute inset-4 border border-amber-400/15 pointer-events-none" />
                    
                    <div>
                      <span className="font-mono text-[9px] text-amber-400/60 uppercase tracking-widest block font-bold">CHETTINAD HERITAGE</span>
                      <h4 className="font-serif text-xl text-amber-200 mt-2 font-medium tracking-wide">TEAKWOOD CORE</h4>
                    </div>

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                      {/* Realistic vertical brass bar handle */}
                      <div className="w-2.5 h-28 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-sm border border-amber-200/40 shadow-md relative">
                        <div className="absolute inset-x-0 top-1.5 h-1 bg-amber-600/30" />
                        <div className="absolute inset-x-0 bottom-1.5 h-1 bg-amber-600/30" />
                      </div>
                    </div>

                    <span className="font-mono text-[8px] text-amber-400/40 font-bold">© 2026 TAMIL NADU CRAFT</span>
                  </motion.div>

                  {/* Right Premium Teak/Rosewood Fluted Wardrobe Door */}
                  <motion.div 
                    initial={{ x: 0 }}
                    animate={{ x: isDoorOpen ? '100%' : 0, rotateY: isDoorOpen ? 110 : 0, z: isDoorOpen ? -100 : 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                    className="w-1/2 h-full flex flex-col justify-between p-8 relative shadow-2xl origin-right"
                    style={{ 
                      backgroundImage: 'repeating-linear-gradient(90deg, #4f2817, #4f2817 15px, #381c10 15px, #381c10 30px)',
                      borderLeft: '2px solid rgba(0,0,0,0.5)',
                      boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.4)'
                    }}
                  >
                    {/* Brass Inlay panel trim */}
                    <div className="absolute inset-4 border border-amber-400/15 pointer-events-none" />

                    <div className="text-right">
                      <span className="font-mono text-[9px] text-amber-400/60 uppercase tracking-widest block font-bold">BESPOKE DESIGN</span>
                      <h4 className="font-serif text-xl text-amber-200 mt-2 font-medium tracking-wide">SOUTH INDIAN STUDIO</h4>
                    </div>

                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                      {/* Realistic vertical brass bar handle */}
                      <div className="w-2.5 h-28 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-sm border border-amber-200/40 shadow-md relative">
                        <div className="absolute inset-x-0 top-1.5 h-1 bg-amber-600/30" />
                        <div className="absolute inset-x-0 bottom-1.5 h-1 bg-amber-600/30" />
                      </div>
                    </div>

                    <span className="font-mono text-[8px] text-amber-400/40 text-right font-bold block">SECURE WOOD CO.</span>
                  </motion.div>

                  {/* Center Brass Medallion */}
                  <motion.div
                    animate={{ scale: isDoorOpen ? 0 : 1, opacity: isDoorOpen ? 0 : 1 }}
                    className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border-4 border-amber-300 flex flex-col items-center justify-center text-amber-950 font-sans font-extrabold text-[9px] tracking-widest text-center shadow-xl cursor-pointer"
                    onClick={handleOpenDoor}
                  >
                    <Compass className="w-6 h-6 mb-1 text-amber-950 animate-spin-slow" />
                    <span>ENTER PLANNER</span>
                  </motion.div>

                </div>
              ) : (
                /* INTERIOR PACKAGE CUSTOMIZER PANEL */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-brand-bg rounded-xs border border-outline-variant/40 shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left Column: Estimator parameters */}
                    <div className="lg:col-span-7 space-y-8">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-sans font-extrabold text-[9px] tracking-widest text-walnut-gold uppercase block mb-1">
                            INTERMEDIATE VALUATIONS
                          </span>
                          <h3 className="font-serif text-2xl md:text-3xl font-medium text-primary">
                            Interior Layout Planner
                          </h3>
                        </div>
                        <button 
                          type="button"
                          onClick={handleCloseCustomizer}
                          className="px-3.5 py-1.5 border border-outline-variant/40 hover:border-primary/50 text-[10px] font-sans font-extrabold uppercase tracking-widest text-primary hover:bg-brand-low/40 rounded-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Back to Home</span>
                        </button>
                      </div>

                      {/* Packages Selector */}
                      <div className="space-y-3">
                        <label className="font-sans text-xs uppercase font-bold tracking-wider text-brand-clay">
                          Step 1: Select Space Composition / BHK size
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {(Object.keys(BHK_PACKAGES) as Array<keyof typeof BHK_PACKAGES>).map((key) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setSelectedBhk(key)}
                              className={`p-3 text-left border rounded-xs transition-all flex flex-col justify-between h-24 cursor-pointer select-none ${
                                selectedBhk === key
                                  ? 'border-primary bg-brand-low shadow-xs'
                                  : 'border-outline-variant/20 bg-white hover:bg-brand-low/40'
                              }`}
                            >
                              <span className="font-mono text-[10px] text-brand-clay block uppercase">{key.toUpperCase()} Package</span>
                              <span className="font-serif text-sm font-bold text-primary block mt-1 line-clamp-1">{BHK_PACKAGES[key].name}</span>
                              <span className="font-sans text-xs text-brand-clay font-medium block mt-1">₹{BHK_PACKAGES[key].basePrice.toLocaleString()}+</span>
                            </button>
                          ))}
                        </div>
                        <p className="font-sans text-xs text-brand-clay italic mt-1.5">
                          {BHK_PACKAGES[selectedBhk].description}
                        </p>
                      </div>

                      {/* Premium Toggles / Sliders */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Timber species Selection */}
                        <div className="space-y-3">
                          <label className="font-sans text-xs uppercase font-bold tracking-wider text-brand-clay">
                            Step 2: Timber Species / Sourcing
                          </label>
                          <div className="space-y-2">
                            {(Object.keys(TIMBER_MULTIPLIERS) as Array<keyof typeof TIMBER_MULTIPLIERS>).map((tKey) => (
                              <button
                                key={tKey}
                                type="button"
                                onClick={() => setSelectedTimberGrade(tKey)}
                                className={`w-full p-2.5 text-left border rounded-xs font-sans text-xs transition-all flex justify-between items-center cursor-pointer ${
                                  selectedTimberGrade === tKey
                                    ? 'border-primary bg-brand-low font-bold text-primary'
                                    : 'border-outline-variant/10 bg-white text-brand-clay hover:bg-brand-low/50'
                                }`}
                              >
                                <span>{TIMBER_MULTIPLIERS[tKey].name}</span>
                                <span className="font-mono text-[10px] opacity-75">
                                  {TIMBER_MULTIPLIERS[tKey].rate === 1.0 ? 'Base' : `+${Math.round((TIMBER_MULTIPLIERS[tKey].rate - 1) * 100)}%`}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Fitting Grades */}
                        <div className="space-y-3">
                          <label className="font-sans text-xs uppercase font-bold tracking-wider text-brand-clay">
                            Step 3: Fitting Grades
                          </label>
                          <div className="space-y-2">
                            {(Object.keys(FITTING_GRADES) as Array<keyof typeof FITTING_GRADES>).map((fKey) => (
                              <button
                                key={fKey}
                                type="button"
                                onClick={() => setSelectedFittings(fKey)}
                                className={`w-full p-2.5 text-left border rounded-xs font-sans text-xs transition-all flex justify-between items-center cursor-pointer ${
                                  selectedFittings === fKey
                                    ? 'border-primary bg-brand-low font-bold text-primary'
                                    : 'border-outline-variant/10 bg-white text-brand-clay hover:bg-brand-low/50'
                                }`}
                              >
                                <span>{FITTING_GRADES[fKey].name.split(' ')[0]} Grade</span>
                                <span className="font-mono text-[10px] opacity-75">
                                  {FITTING_GRADES[fKey].price === 0 ? 'Included' : `+₹${FITTING_GRADES[fKey].price.toLocaleString()}`}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Flooring and Extra Addons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        
                        {/* Flooring selection */}
                        <div className="space-y-3">
                          <label className="font-sans text-xs uppercase font-bold tracking-wider text-brand-clay block">
                            Step 4: Flooring Selections
                          </label>
                          <select
                            value={selectedFlooring}
                            onChange={(e) => setSelectedFlooring(e.target.value as keyof typeof FLOORING_OPTIONS)}
                            className="w-full bg-white border border-outline-variant/30 text-brand-ebony p-3 rounded-xs font-sans text-xs focus:outline-none focus:border-primary"
                          >
                            {(Object.keys(FLOORING_OPTIONS) as Array<keyof typeof FLOORING_OPTIONS>).map((f) => (
                              <option key={f} value={f}>
                                {FLOORING_OPTIONS[f].name} {FLOORING_OPTIONS[f].price > 0 ? `(+₹${FLOORING_OPTIONS[f].price.toLocaleString()})` : ''}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Dynamic Wardrobe slide count */}
                        <div className="space-y-3">
                          <label className="font-sans text-xs uppercase font-bold tracking-wider text-brand-clay flex justify-between">
                            <span>Step 5: Master Wardrobes</span>
                            <span className="font-mono font-bold text-primary">{customWardrobeCount} Units</span>
                          </label>
                          <div className="flex items-center gap-3 mt-1">
                            <button
                              type="button"
                              onClick={() => setCustomWardrobeCount(prev => Math.max(1, prev - 1))}
                              className="w-9 h-9 border border-outline-variant/30 hover:border-primary/50 rounded-xs flex items-center justify-center font-sans font-bold text-base text-primary bg-white hover:bg-brand-low/50 cursor-pointer transition-colors active:scale-95"
                            >
                              -
                            </button>
                            <span className="font-mono font-bold text-xs text-primary w-10 text-center bg-white border border-outline-variant/15 py-1.5 rounded-xs shadow-xs">
                              {customWardrobeCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => setCustomWardrobeCount(prev => Math.min(5, prev + 1))}
                              className="w-9 h-9 border border-outline-variant/30 hover:border-primary/50 rounded-xs flex items-center justify-center font-sans font-bold text-base text-primary bg-white hover:bg-brand-low/50 cursor-pointer transition-colors active:scale-95"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex justify-between font-mono text-[8px] text-brand-clay/70 mt-1">
                            <span>1 Wardrobe (Incl.)</span>
                            <span>5 Wardrobes (+₹4,80,000)</span>
                          </div>
                        </div>

                      </div>

                      {/* Acoustic Slat panels toggle */}
                      <div className="bg-white p-4 border border-outline-variant/20 rounded-xs flex items-center justify-between">
                        <div className="max-w-[80%]">
                          <span className="font-serif text-xs font-bold text-primary block">
                            Integrated Acoustic Wood Paneling
                          </span>
                          <p className="font-sans text-[11px] text-brand-clay mt-0.5 leading-snug">
                            Install hand-waxed vertical timber sound dampening panels on critical living room and master bed headboard focal walls.
                          </p>
                        </div>
                        <button
                          onClick={() => setAcousticPanels(!acousticPanels)}
                          className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${acousticPanels ? 'bg-primary' : 'bg-slate-300'}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${acousticPanels ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>

                    </div>

                    {/* Right Column: Calculations & Scheduler Submission (5 Columns) */}
                    <div className="lg:col-span-5 bg-brand-low p-6 rounded-xs border border-outline-variant/30 flex flex-col justify-between gap-6">
                      
                      {/* Price Estimate Dashboard */}
                      <div className="space-y-4">
                        <span className="font-sans font-extrabold text-[9px] tracking-widest text-primary uppercase block">
                          ROBOTIC MILLING PRICE MODEL
                        </span>

                        <div className="flex justify-between items-baseline border-b border-outline-variant/20 pb-4">
                          <span className="font-serif text-3xl font-medium text-primary">
                            ₹{calculateEstimate().toLocaleString()}
                          </span>
                          <span className="font-sans text-xs text-brand-clay font-bold">
                            APPROXIMATE ESTIMATE
                          </span>
                        </div>

                        <div className="space-y-2.5 font-sans text-xs text-brand-clay">
                          <div className="flex justify-between">
                            <span>Base package size:</span>
                            <span className="font-bold text-primary">{BHK_PACKAGES[selectedBhk].name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Selected Wood Species:</span>
                            <span className="font-bold">{TIMBER_MULTIPLIERS[selectedTimberGrade].name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hardware mechanism:</span>
                            <span>{selectedFittings === 'standard' ? 'Friction glide' : selectedFittings === 'gourmet' ? 'Blum Soft-Close' : 'Smart Touchless'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time to complete:</span>
                            <span className="font-mono text-[11px] font-bold text-primary">{BHK_PACKAGES[selectedBhk].timeToComplete}</span>
                          </div>
                          <div className="flex justify-between text-brand-sage font-bold">
                            <span>Est. Carbon sequestered:</span>
                            <span>{calculateCarbonSequestered()} Tons CO₂</span>
                          </div>
                        </div>
                      </div>

                      {/* Booking / Enquiry Form */}
                      <div className="border-t border-outline-variant/30 pt-6">
                        <span className="font-sans font-extrabold text-[9px] tracking-widest text-primary uppercase block mb-3">
                          SCHEDULE DESIGN CONSULTATION
                        </span>

                        {!isSubmitted ? (
                          <form onSubmit={handleScheduleSubmit} className="space-y-3.5">
                            
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <label className="font-sans text-[10px] uppercase font-bold text-brand-clay">Date</label>
                                <input 
                                  type="date"
                                  value={selectedDate}
                                  onChange={(e) => setSelectedDate(e.target.value)}
                                  className="w-full bg-white border border-outline-variant/20 p-2 text-xs rounded-xs focus:outline-none focus:border-primary text-brand-ebony"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="font-sans text-[10px] uppercase font-bold text-brand-clay">Time</label>
                                <select
                                  value={selectedTimeSlot}
                                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                                  className="w-full bg-white border border-outline-variant/20 p-2 text-xs rounded-xs focus:outline-none focus:border-primary text-brand-ebony"
                                >
                                  <option>09:00 AM</option>
                                  <option>10:00 AM</option>
                                  <option>11:30 AM</option>
                                  <option>02:00 PM</option>
                                  <option>04:00 PM</option>
                                </select>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="font-sans text-[10px] uppercase font-bold text-brand-clay">Your Name</label>
                              <input 
                                type="text"
                                required
                                placeholder="Meenakshi Sundaram"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                className="w-full bg-white border border-outline-variant/20 px-3 py-2 text-xs rounded-xs focus:outline-none focus:border-primary text-brand-ebony"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-sans text-[10px] uppercase font-bold text-brand-clay">Email Address</label>
                              <input 
                                type="email"
                                required
                                placeholder="meenakshi@example.com"
                                value={clientEmail}
                                onChange={(e) => setClientEmail(e.target.value)}
                                className="w-full bg-white border border-outline-variant/20 px-3 py-2 text-xs rounded-xs focus:outline-none focus:border-primary text-brand-ebony"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-primary hover:bg-tertiary text-white font-sans font-extrabold text-[10px] tracking-widest uppercase py-3.5 rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-apricot-tint" />
                              Submit Estimator & Book Slots
                            </button>

                          </form>
                        ) : (
                          <div className="bg-white border border-brand-sage/20 p-5 rounded-xs text-center space-y-3">
                            <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
                            <h4 className="font-serif text-sm font-semibold text-primary">Estimator Saved & Booked!</h4>
                            <p className="font-sans text-[11px] text-brand-clay leading-relaxed">
                              We have registered your booking for <span className="font-bold text-primary">{selectedDate} at {selectedTimeSlot}</span>. A master wood designer will present your full schematic on a shared video link.
                            </p>
                            <button
                              onClick={() => setIsSubmitted(false)}
                              className="text-[10px] font-sans font-bold text-primary underline block mx-auto cursor-pointer"
                            >
                              Edit Booking details
                            </button>
                          </div>
                        )}

                      </div>

                    </div>

                  </div>
                </motion.div>
              )}

            </div>
          ) : null}
        </AnimatePresence>

        {/* 1. SERVICES PROVIDED CAROUSEL/SLIDESHOW (Interactive slide list) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          
          {/* Left Side: Services Narratives & Controls */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <span className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary uppercase block mb-3">
              01. CUSTOM SERVICES
            </span>
            
            <h3 className="font-serif text-3xl md:text-4xl font-medium text-primary mb-6 tracking-tight leading-snug">
              Material-Forward Spaces
            </h3>

            {/* Slider Text Carousel */}
            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeServiceIdx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <span className="font-sans font-extrabold text-[10px] tracking-wider text-walnut-gold uppercase">
                    {SERVICES_SLIDES[activeServiceIdx].tagline}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-tertiary">
                    {SERVICES_SLIDES[activeServiceIdx].title}
                  </h4>
                  <p className="font-sans text-sm md:text-base text-brand-clay leading-relaxed">
                    {SERVICES_SLIDES[activeServiceIdx].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setActiveServiceIdx((prev) => (prev - 1 + SERVICES_SLIDES.length) % SERVICES_SLIDES.length)}
                className="p-2 border border-outline-variant/30 bg-white text-brand-clay hover:bg-brand-low rounded-full transition-colors cursor-pointer"
                aria-label="Previous service slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Dot indicators */}
              <div className="flex gap-1.5">
                {SERVICES_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveServiceIdx(idx)}
                    className={`h-1.5 rounded-full transition-all ${activeServiceIdx === idx ? 'w-5 bg-primary' : 'w-1.5 bg-slate-300'}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveServiceIdx((prev) => (prev + 1) % SERVICES_SLIDES.length)}
                className="p-2 border border-outline-variant/30 bg-white text-brand-clay hover:bg-brand-low rounded-full transition-colors cursor-pointer"
                aria-label="Next service slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Side: Services Visual Slider with Luminosity Simulator */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-4">
            <div className="relative overflow-hidden shadow-2xl rounded-xs aspect-[1.5/1]">
              
              {/* Image slide with dynamic sun lighting */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeServiceIdx}
                  alt={SERVICES_SLIDES[activeServiceIdx].title}
                  className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${sunSettings[sunPosition].brightness}`}
                  src={SERVICES_SLIDES[activeServiceIdx].image}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>
              
              {/* Sun overlay tint */}
              <div className={`absolute inset-0 transition-colors duration-1000 pointer-events-none ${sunSettings[sunPosition].overlayClass}`} />

              {/* Dynamic tag embedded inside picture */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-apricot-tint animate-pulse" />
                <span>{SERVICES_SLIDES[activeServiceIdx].metric}</span>
              </div>
            </div>

            {/* Luminosity Simulator Slider Toggles */}
            <div className="bg-brand-container p-4 rounded-xs border border-outline-variant/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <span className="font-sans font-extrabold text-[9px] tracking-widest text-brand-clay uppercase block mb-1">
                  Luminosity Simulator
                </span>
                <p className="font-sans text-xs text-brand-clay leading-relaxed">
                  {sunSettings[sunPosition].description}
                </p>
              </div>

              <div className="flex gap-1.5 bg-white p-1 border border-outline-variant/30 rounded-xs self-stretch sm:self-auto justify-center">
                {(['morning', 'noon', 'sunset'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setSunPosition(pos)}
                    className={`px-3 py-1.5 font-sans font-bold text-[9px] uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                      sunPosition === pos
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-brand-clay hover:bg-brand-low'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* SERVICE OFFERINGS DIRECTORY */}
        <div className="border-t border-outline-variant/20 pt-16 mb-20 animate-fade-in">
          <div className="max-w-3xl mb-12">
            <span className="font-sans font-extrabold text-[10px] tracking-[0.2em] text-primary uppercase block mb-2">
              01.5 CHANNELS OF EXECUTION
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-medium text-primary tracking-tight">
              Our Turnkey Services
            </h3>
            <p className="font-sans text-xs md:text-sm text-brand-clay mt-1.5 leading-relaxed">
              Premium, end-to-end execution across Chennai and Bangalore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            {/* Category 1: Structural & Civil Works */}
            <div className="border border-outline-variant/15 rounded-xs p-6 bg-white/50 backdrop-blur-xs">
              <div className="flex items-center gap-3 mb-4">
                <LayoutGrid className="w-4 h-4 text-walnut-gold" />
                <h4 className="font-serif text-sm font-bold text-primary uppercase tracking-wide">Structural & Civil Works</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Wall Plastering",
                  "Gypsum False Ceiling",
                  "Grid Ceiling Installation",
                  "Tile & Marble Flooring"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-sans text-xs text-brand-clay">
                    <span className="w-1.5 h-1.5 bg-walnut-gold/50 rounded-xs" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category 2: Custom Carpentry */}
            <div className="border border-outline-variant/15 rounded-xs p-6 bg-white/50 backdrop-blur-xs">
              <div className="flex items-center gap-3 mb-4">
                <Hammer className="w-4 h-4 text-walnut-gold" />
                <h4 className="font-serif text-sm font-bold text-primary uppercase tracking-wide">Custom Carpentry</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Modular Kitchen Cabinets",
                  "Walk-in Closets",
                  "TV Entertainment Units",
                  "Shoe Racks",
                  "Study Tables",
                  "Bed Frames with Storage",
                  "Pooja cabinet",
                  "Sliding & Hinged Wardrobes"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-sans text-xs text-brand-clay">
                    <span className="w-1.5 h-1.5 bg-walnut-gold/50 rounded-xs" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category 3: Aesthetics, Finishing, & Decor */}
            <div className="border border-outline-variant/15 rounded-xs p-6 bg-white/50 backdrop-blur-xs">
              <div className="flex items-center gap-3 mb-4">
                <Paintbrush className="w-4 h-4 text-walnut-gold" />
                <h4 className="font-serif text-sm font-bold text-primary uppercase tracking-wide">Aesthetics & Finish</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Wall Putty & Priming",
                  "Emulsion & Texture Painting",
                  "Wallpaper Application",
                  "Glass Shower Partitions",
                  "Decorative Mirror Mounting",
                  "Window Blinds & Curtains"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-sans text-xs text-brand-clay">
                    <span className="w-1.5 h-1.5 bg-walnut-gold/50 rounded-xs" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* 2. PREVIOUS PROJECTS PORTFOLIO SLIDESHOW */}
        <div className="border-t border-outline-variant/20 pt-24 mb-24">
          <div className="max-w-3xl mb-12">
            <span className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary uppercase block mb-3">
              02. PORTFOLIO SHOWCASE
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-medium text-primary tracking-tight">
              Previous Masterwork Projects
            </h3>
            <p className="font-sans text-sm md:text-base text-brand-clay mt-2">
              Explore actual full-scale installations crafted for our luxury clients across Chennai, Bangalore, and Tamil Nadu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Project Image Slider (8 Columns) */}
            <div className="lg:col-span-8 relative rounded-xs overflow-hidden aspect-[1.6/1] shadow-xl bg-brand-low">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProjectIdx}
                  src={PROJECTS_SLIDES[activeProjectIdx].image}
                  alt={PROJECTS_SLIDES[activeProjectIdx].name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              
              {/* Floating specifications label */}
              <div className="absolute bottom-4 left-4 bg-primary/90 text-white px-4 py-2 text-xs font-mono rounded-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-apricot-tint" />
                <span>{PROJECTS_SLIDES[activeProjectIdx].metric}</span>
              </div>
            </div>

            {/* Project Specifications Card (4 Columns) */}
            <div className="lg:col-span-4 bg-white p-8 border border-outline-variant/30 rounded-xs flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex justify-between items-start font-mono text-[9px] text-brand-clay/75">
                  <span>EST. PROJECT DRAFT</span>
                  <span>{PROJECTS_SLIDES[activeProjectIdx].year}</span>
                </div>

                <div>
                  <h4 className="font-serif text-2xl font-bold text-primary">
                    {PROJECTS_SLIDES[activeProjectIdx].name}
                  </h4>
                  <span className="font-sans text-xs text-walnut-gold font-bold block mt-1 uppercase">
                    {PROJECTS_SLIDES[activeProjectIdx].location}
                  </span>
                </div>

                <div className="bg-brand-low px-3 py-2 border-l border-primary text-[10px] font-sans font-bold uppercase text-brand-clay">
                  Scope: {PROJECTS_SLIDES[activeProjectIdx].scope}
                </div>

                <p className="font-sans text-xs text-brand-clay leading-relaxed">
                  {PROJECTS_SLIDES[activeProjectIdx].description}
                </p>
              </div>

              {/* Toggles */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-outline-variant/20">
                <span className="font-sans text-[10px] font-bold text-brand-clay">
                  PROJECT {activeProjectIdx + 1} OF {PROJECTS_SLIDES.length}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveProjectIdx((prev) => (prev - 1 + PROJECTS_SLIDES.length) % PROJECTS_SLIDES.length)}
                    className="p-1.5 bg-brand-low hover:bg-brand-high rounded-full text-primary cursor-pointer"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveProjectIdx((prev) => (prev + 1) % PROJECTS_SLIDES.length)}
                    className="p-1.5 bg-brand-low hover:bg-brand-high rounded-full text-primary cursor-pointer"
                    aria-label="Next project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 3. TESTIMONIALS SECTION */}
        <div className="border-t border-outline-variant/20 pt-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans font-extrabold text-[11px] tracking-[0.2em] text-primary uppercase block mb-3">
              03. CLIENTS REVIEWS
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-medium text-primary tracking-tight">
              Acoustic & Aesthetic Validation
            </h3>
          </div>

          <div className="max-w-4xl mx-auto bg-brand-container p-10 md:p-16 border border-outline-variant/30 rounded-xs relative overflow-hidden shadow-xs">
            {/* Large background Quote sign */}
            <Quote className="absolute -top-6 -left-6 w-32 h-32 text-primary/5 opacity-8 pointer-events-none" />

            <div className="relative min-h-[160px] flex flex-col justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonialIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <p className="font-serif text-lg md:text-xl font-medium text-tertiary leading-relaxed italic">
                    "{TESTIMONIALS[activeTestimonialIdx].quote}"
                  </p>

                  <div className="flex justify-center gap-1">
                    {[...Array(TESTIMONIALS[activeTestimonialIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-walnut-gold fill-walnut-gold" />
                    ))}
                  </div>

                  <div>
                    <h5 className="font-sans font-bold text-sm text-primary">
                      {TESTIMONIALS[activeTestimonialIdx].author}
                    </h5>
                    <span className="font-sans text-xs text-brand-clay">
                      {TESTIMONIALS[activeTestimonialIdx].role} &mdash; {TESTIMONIALS[activeTestimonialIdx].location}
                    </span>
                  </div>

                  <span className="inline-block bg-white border border-outline-variant/20 px-3 py-1 rounded-full text-[9px] font-sans font-extrabold text-walnut-gold uppercase tracking-wider">
                    {TESTIMONIALS[activeTestimonialIdx].project}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Testimonials Toggler buttons */}
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonialIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${activeTestimonialIdx === i ? 'bg-primary w-6' : 'bg-slate-300'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
