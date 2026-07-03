/**
 * Types representing furniture design system, products, and user state.
 */

export interface Timber {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  sustainabilityScore: number; // 0 to 100
  hardnessJanka: number; // Janka hardness index
  basePricePerDm3: number; // Base multiplier for size calculations
  colorHex: string; // To render approximate wood color
  grainType: string;
}

export interface FurnitureCategory {
  id: string;
  name: string;
  description: string;
}

export interface FurnitureModel {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
  widthRange: [number, number]; // min, max in cm
  depthRange: [number, number]; // min, max in cm
  heightRange: [number, number]; // min, max in cm
  defaultWidth: number;
  defaultDepth: number;
  defaultHeight: number;
}

export interface CustomDesign {
  id: string;
  modelId: string;
  timberId: string;
  width: number;
  depth: number;
  height: number;
  finish: 'matte_oil' | 'satin_wax' | 'raw_sanded';
  baseType: 'wooden_tapered' | 'steel_hairpin' | 'plinth_block';
  sustainabilityIndex: number; // computed
  estimatedPrice: number; // computed
}

export interface ConsultationRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredContact: 'email' | 'phone';
  design: CustomDesign;
  status: 'pending' | 'reviewed' | 'scheduled' | 'completed';
  notes: string;
  createdAt: string;
}

export const TIMBERS: Timber[] = [
  {
    id: 'teakwood',
    name: 'Sagar Teak / Thekku',
    scientificName: 'Tectona grandis',
    description: 'The king of timbers. Sourced from sustainably managed Nilgiri plantations. Exceptionally strong, weather-proof, termite-resistant, and rich in natural golden oils.',
    sustainabilityScore: 94,
    hardnessJanka: 1070,
    basePricePerDm3: 45,
    colorHex: '#9c6d3a',
    grainType: 'Straight, prominent golden-brown rings with fine dark veins',
  },
  {
    id: 'rosewood',
    name: 'Indian Rosewood / Eetti',
    scientificName: 'Dalbergia latifolia',
    description: 'Exquisite deep reddish-purple premium hardwood. Hand-crafted by heritage Tamil artisans. Extremely dense with high-contrast swirl patterns.',
    sustainabilityScore: 89,
    hardnessJanka: 1720,
    basePricePerDm3: 60,
    colorHex: '#321610',
    grainType: 'Interlocking deep purple veins and dark chocolate swirls',
  },
  {
    id: 'mahogany',
    name: 'Premium Mahogany',
    scientificName: 'Swietenia mahagoni',
    description: 'Sustainably farmed reddish-brown timber with a uniform texture. Beautifully resilient, highly prized for high-end wardrobes and wall panelling.',
    sustainabilityScore: 92,
    hardnessJanka: 900,
    basePricePerDm3: 32,
    colorHex: '#782f1b',
    grainType: 'Elegant ribbon grain with smooth, uniform satin texture',
  },
  {
    id: 'gurjan_plywood',
    name: 'BWR Gurjan Plywood',
    scientificName: 'Dipterocarpus alatus',
    description: '100% Gurjan timber core Boiling Water Resistant (BWR) plywood. The premium Indian standard for anti-termite, water-proof, and structural durability.',
    sustainabilityScore: 98,
    hardnessJanka: 1100,
    basePricePerDm3: 20,
    colorHex: '#cc9966',
    grainType: 'Multi-layered high-density core edges',
  }
];

export const CATEGORIES: FurnitureCategory[] = [
  { id: 'Bed', name: 'Beds & Cots', description: 'Royal Cots and platform beds carved from Nilgiri teakwood.' },
  { id: 'wardrobe', name: 'Wardrobes', description: 'Architectural sliding and sliding-door wardrobe systems with premium brass fixtures.' },
  { id: 'tv_unit', name: 'TV Units', description: 'Lowline credenzas and console units with integrated wire channels and acoustic slat backings.' },
  { id: 'dining_table', name: 'Dining Tables', description: 'Gathering pieces designed for grand South Indian family conversations.' },
  { id: 'table', name: 'Study Desks', description: 'Work surfaces and writing desks with clean lines and premium brass inlays.' },
  { id: 'doors', name: 'Main Doors', description: 'Imposing front entries and pivot doors with traditional Chettinad carving details.' },
  { id: 'dressing_table', name: 'Dressing Tables', description: 'Floating vanities with integrated timber framed mirror mounts and storage.' },
  { id: 'others', name: 'Heritage Seating', description: 'Ergonomic chairs, loungers, and modular bookshelves with south Indian craft accents.' }
];

export const MODELS: FurnitureModel[] = [
  {
    id: 'model-wardrobe',
    categoryId: 'wardrobe',
    name: 'The Tanjore Teak Wardrobe',
    description: 'Stately floor-to-ceiling wardrobe featuring seamless integrated brass-inlaid handle details, soft-close sliding doors, and modular compartments.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    basePrice: 145000,
    widthRange: [120, 280],
    depthRange: [55, 75],
    heightRange: [180, 260],
    defaultWidth: 180,
    defaultDepth: 60,
    defaultHeight: 220,
  },
  {
    id: 'model-tv-unit',
    categoryId: 'tv_unit',
    name: 'The Nilgiri Rosewood TV Unit',
    description: 'Contemporary television console unit with a sliding slatted timber face and integrated warm acoustic backing panels.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    basePrice: 65000,
    widthRange: [120, 240],
    depthRange: [40, 60],
    heightRange: [45, 65],
    defaultWidth: 180,
    defaultDepth: 45,
    defaultHeight: 55,
  },
  {
    id: 'model-dining-table',
    categoryId: 'dining_table',
    name: 'The Sagar Teak Dining Table',
    description: 'A solid wood table with interlocking traditional joinery and hand-chamfered under-bevel.',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80',
    basePrice: 95000,
    widthRange: [140, 260],
    depthRange: [80, 110],
    heightRange: [72, 78],
    defaultWidth: 200,
    defaultDepth: 90,
    defaultHeight: 75,
  },
  {
    id: 'model-desk',
    categoryId: 'table',
    name: 'The Cauvery Rosewood Desk',
    description: 'A minimalist workspace featuring curved leg-rests and integrated channels for clean wire management.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    basePrice: 75000,
    widthRange: [110, 180],
    depthRange: [60, 85],
    heightRange: [70, 78],
    defaultWidth: 140,
    defaultDepth: 70,
    defaultHeight: 74,
  },
  {
    id: 'model-door',
    categoryId: 'doors',
    name: 'The Karaikudi Heritage Pivot Door',
    description: 'An imposing entrance pivot door milled from select heartwood boards, with custom vertical fluting and heavy-duty brass pivot handles.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    basePrice: 85000,
    widthRange: [80, 150],
    depthRange: [4, 10],
    heightRange: [200, 260],
    defaultWidth: 100,
    defaultDepth: 5,
    defaultHeight: 230,
  },
  {
    id: 'model-dressing-table',
    categoryId: 'dressing_table',
    name: 'The Mysore Sandalwood Dressing Table',
    description: 'A wall-mounted vanity console with twin soft-close drawers, velvet organizers, and solid timber framed mirror mount.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    basePrice: 55000,
    widthRange: [80, 160],
    depthRange: [40, 60],
    heightRange: [70, 90],
    defaultWidth: 120,
    defaultDepth: 45,
    defaultHeight: 75,
  },
  {
    id: 'model-lounge-chair',
    categoryId: 'others',
    name: 'The Madurai Rosewood Lounger',
    description: 'Contoured premium rosewood sheets configured for highly ergonomic lounge seating with zero metal fasteners.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUKzmLGheGdguRdFv3YbC0hT97Yq5GelOurRBg5DMPZTzFBBWSUC5ffshWqG87cwkrGNjdl_KMmO2RtTUD2WvmPKV5Tc7kUquFyskOItfUcWe2VE1Nzih13Tyl6465DYBGOim-BCyJ3hLaBpB9F2rgDCfW1AXBJUOf-HWTTFSDajJOY3hTf-WB17xeBEwYrxucQRZSDLQ5uBx_o-toCtYv2Y_Bt4RXvZFhzXpUpMwQiH689D9EWuPHWX-IQiM94MMgxet9Dbkxmd0',
    basePrice: 42000,
    widthRange: [60, 80],
    depthRange: [70, 90],
    heightRange: [65, 80],
    defaultWidth: 70,
    defaultDepth: 78,
    defaultHeight: 72,
  },
  {
    id: 'model-shelves',
    categoryId: 'others',
    name: 'The Malabar Modular Bookshelf',
    description: 'A modular shelving design showcasing precision CNC plywood interlocking tabs and teakwood veneer finish.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWycl4C3sowYvAAq5QOZ-7p-tZh8UG4MHceTUyOJWIkeESh6a5_ncHHDaBQg4kt9wKVWOuZpqPuoQ5NtTrjt6-km9n8Ud0OrOhS5tzJuTq_6ngVsO0PBc9YRHk-jVYQgCc88yXhVP6lVCNPDdZwKwVVg07Wu-kuqp5tczizbMctaAksrCx7O7ZpOLSds2bhKLBdum9qvunYzPL1vSiYiMwugqqmoi6OcTPhhwt7vQB1y29lpuXHu9S6eQzkyiDtBkpqP5HF2th8MI',
    basePrice: 48000,
    widthRange: [80, 240],
    depthRange: [30, 50],
    heightRange: [100, 220],
    defaultWidth: 120,
    defaultDepth: 35,
    defaultHeight: 160,
  }
];

export function calculateDesignMetrics(design: Omit<CustomDesign, 'id' | 'sustainabilityIndex' | 'estimatedPrice'>) {
  const model = MODELS.find(m => m.id === design.modelId);
  const timber = TIMBERS.find(t => t.id === design.timberId);
  if (!model || !timber) return { price: 0, sustainabilityIndex: 100 };

  // Calculate volume in dm^3 (liters)
  const volDm3 = (design.width * design.depth * design.height) / 1000;
  
  // Base cost + (volume * timber multiplier) + legs modifier + finish modifier
  const timberCostMultiplier = timber.basePricePerDm3;
  
  let baseCost = model.basePrice;
  const sizeCostFactor = volDm3 * timberCostMultiplier;
  
  let legsCost = 0;
  if (design.baseType === 'steel_hairpin') legsCost = 6500;
  if (design.baseType === 'plinth_block') legsCost = 12000;
  
  let finishCost = 0;
  if (design.finish === 'matte_oil') finishCost = 4000;
  if (design.finish === 'satin_wax') finishCost = 6000;

  const estimatedPrice = Math.round(baseCost + sizeCostFactor + legsCost + finishCost);

  // Sustainability rating calculation out of 100
  // Higher timber sustainability core score + finish modifier (matte oil is 100% natural, wax is 90%, raw is 100%)
  let finishMod = 0;
  if (design.finish === 'matte_oil') finishMod = 2;
  if (design.finish === 'raw_sanded') finishMod = 2;
  if (design.finish === 'satin_wax') finishMod = -2;

  // Base types: steel hairpin has slightly higher carbon footprint than wooden taper
  let baseMod = 0;
  if (design.baseType === 'steel_hairpin') baseMod = -5;
  if (design.baseType === 'plinth_block') baseMod = -1;

  const sustainabilityIndex = Math.min(100, Math.max(50, timber.sustainabilityScore + finishMod + baseMod));

  return {
    estimatedPrice,
    sustainabilityIndex
  };
}
