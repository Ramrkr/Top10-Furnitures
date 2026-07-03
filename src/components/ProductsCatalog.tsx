import { useState } from 'react';
import { CATEGORIES, MODELS, FurnitureModel, FurnitureCategory } from '../types';
import { ArrowRight, Sliders, Ruler, Box, Sparkles, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductsCatalogProps {
  onConfigureClick: (modelId: string, timberId: string) => void;
}

export default function ProductsCatalog({ onConfigureClick }: ProductsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter products by selected category
  const filteredModels = selectedCategory === 'all'
    ? MODELS
    : MODELS.filter(model => model.categoryId === selectedCategory);

  return (
    <section className="py-24 md:py-36 bg-brand-bg relative border-t border-outline-variant/30" id="products-catalog">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="font-sans font-extrabold text-[11px] tracking-[0.25em] text-primary uppercase block mb-4">
            CURATED ARCHITECTURAL COLLECTIONS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-primary tracking-tight">
            Our Timber Collections
          </h2>
          <p className="mt-5 text-brand-clay font-sans text-base md:text-lg leading-relaxed">
            From seamless floor-to-ceiling wardrobes and lowline slatted TV consoles to grand fluted entrance doors. Browse our full range of customizable millwork.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 max-w-5xl mx-auto">
          {/* "All" Tab */}
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1.5 border ${
              selectedCategory === 'all'
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-white text-brand-clay hover:bg-brand-low border-outline-variant/30'
            }`}
          >
            <span>All Collections</span>
            <span className={`inline-block text-[9px] font-mono px-2 py-0.5 rounded-full ${
              selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-brand-low text-brand-clay'
            }`}>
              {MODELS.length}
            </span>
          </button>

          {CATEGORIES.map((category) => {
            const count = MODELS.filter(m => m.categoryId === category.id).length;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1.5 border ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-white text-brand-clay hover:bg-brand-low border-outline-variant/30'
                }`}
              >
                <span>{category.name}</span>
                <span className={`inline-block text-[9px] font-mono px-2 py-0.5 rounded-full ${
                  selectedCategory === category.id ? 'bg-white/20 text-white' : 'bg-brand-low text-brand-clay'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Description */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="font-serif italic text-base md:text-lg text-brand-clay"
            >
              {selectedCategory === 'all' 
                ? "Every design is calculated with 0.1mm tolerance, ready to be adjusted to your exact blueprints inside our Bespoke Studio."
                : CATEGORIES.find(c => c.id === selectedCategory)?.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredModels.map((product) => {
              const categoryName = CATEGORIES.find(c => c.id === product.categoryId)?.name || 'Collection';
              
              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-outline-variant/30 rounded-xs overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow group select-none"
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-brand-low">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Floating Category Tag */}
                    <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 text-[9px] font-sans font-extrabold uppercase tracking-widest rounded-full">
                      {categoryName}
                    </span>

                    {/* Quick Specs Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                      <div className="text-white space-y-2">
                        <span className="text-[10px] font-mono tracking-wider uppercase opacity-80 block">Dimensional Boundaries</span>
                        <div className="font-sans text-xs space-y-1">
                          <p>Width: {product.widthRange[0]}cm - {product.widthRange[1]}cm</p>
                          <p>Depth: {product.depthRange[0]}cm - {product.depthRange[1]}cm</p>
                          <p>Height: {product.heightRange[0]}cm - {product.heightRange[1]}cm</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-serif text-xl font-medium text-primary">
                          {product.name}
                        </h4>
                        <span className="font-mono text-sm font-semibold text-primary">
                          ₹{product.basePrice.toLocaleString()}+
                        </span>
                      </div>
                      
                      <p className="font-sans text-xs text-brand-clay leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Specification Badges & Assembly Info */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-1.5 bg-brand-low p-2.5 rounded-xs border border-outline-variant/10 text-center font-mono text-[9px] text-brand-clay">
                        <div>
                          <span className="block opacity-65 text-[8px] uppercase">Default W</span>
                          <span className="font-bold text-primary">{product.defaultWidth}cm</span>
                        </div>
                        <div>
                          <span className="block opacity-65 text-[8px] uppercase">Default D</span>
                          <span className="font-bold text-primary">{product.defaultDepth}cm</span>
                        </div>
                        <div>
                          <span className="block opacity-65 text-[8px] uppercase">Default H</span>
                          <span className="font-bold text-primary">{product.defaultHeight}cm</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => onConfigureClick(product.id, 'gurjan_plywood')}
                        className="w-full bg-primary hover:bg-tertiary text-white font-sans font-extrabold text-[10px] tracking-widest uppercase py-3 rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Sliders className="w-3.5 h-3.5 text-apricot-tint" />
                        Configure Bespoke Edition
                        <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
