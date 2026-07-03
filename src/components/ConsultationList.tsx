import { ConsultationRequest, TIMBERS, MODELS } from '../types';
import { Trash2, Calendar, FileText, Settings, Sparkles, X, Mail, Phone, ExternalLink } from 'lucide-react';

interface ConsultationListProps {
  requests: ConsultationRequest[];
  onDeleteRequest: (id: string) => void;
  onClose: () => void;
}

export default function ConsultationList({ requests, onDeleteRequest, onClose }: ConsultationListProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-end">
      <div className="bg-brand-bg h-full max-w-lg w-full shadow-2xl flex flex-col justify-between border-l border-outline-variant/30 relative">
        
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-outline-variant/30 flex justify-between items-center bg-brand-low">
          <div>
            <span className="font-sans font-extrabold text-[9px] tracking-[0.2em] text-walnut-gold uppercase block mb-1">
              LOGGED PORTFOLIO
            </span>
            <h3 className="font-serif text-2xl font-medium text-primary">
              Saved Consultations
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-brand-container rounded-full text-brand-clay cursor-pointer"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {requests.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
              <div className="p-4 bg-brand-low rounded-full">
                <FileText className="w-12 h-12 text-brand-clay/40 stroke-[1.2]" />
              </div>
              <p className="font-serif text-lg font-medium text-primary">
                No active enquiries
              </p>
              <p className="font-sans text-xs text-brand-clay max-w-xs leading-relaxed">
                Configure your custom timber model dimensions inside our Bespoke Studio and submit an inquiry to persist design drafts here.
              </p>
            </div>
          ) : (
            requests.map((req) => {
              const model = MODELS.find(m => m.id === req.design.modelId);
              const timber = TIMBERS.find(t => t.id === req.design.timberId);

              return (
                <div 
                  key={req.id} 
                  className="bg-white border border-outline-variant/30 p-5 rounded-xs shadow-xs space-y-4 hover:shadow-md transition-shadow relative"
                >
                  {/* Status Indicator Badge */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-serif text-base font-semibold text-primary block">
                        {model?.name || 'Custom Furniture'}
                      </span>
                      <span className="font-sans text-[10px] italic text-brand-clay/80">
                        {timber?.name} species
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider">
                        Design #{req.id.split('-')[1]}
                      </span>
                      <span className="font-sans text-[9px] text-brand-clay/70">
                        {req.createdAt}
                      </span>
                    </div>
                  </div>

                  {/* Dimension Specifications table */}
                  <div className="bg-brand-low p-3.5 rounded-xs grid grid-cols-3 gap-2 text-center font-mono text-[10px] text-brand-clay border border-outline-variant/10">
                    <div>
                      <span className="block text-[8px] opacity-65 uppercase">WIDTH</span>
                      <span className="font-bold text-primary">{req.design.width}cm</span>
                    </div>
                    <div>
                      <span className="block text-[8px] opacity-65 uppercase">DEPTH</span>
                      <span className="font-bold text-primary">{req.design.depth}cm</span>
                    </div>
                    <div>
                      <span className="block text-[8px] opacity-65 uppercase">HEIGHT</span>
                      <span className="font-bold text-primary">{req.design.height}cm</span>
                    </div>
                  </div>

                  {/* Specs & valuation lines */}
                  <div className="space-y-1.5 font-sans text-xs text-brand-clay">
                    <div className="flex justify-between">
                      <span>Valuation Estimate:</span>
                      <span className="font-serif font-bold text-primary">${req.design.estimatedPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FSC Eco Index:</span>
                      <span className="font-bold text-brand-sage">{req.design.sustainabilityIndex}% Perfect</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Finish Coating:</span>
                      <span className="capitalize">{req.design.finish.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support Legs:</span>
                      <span className="capitalize">{req.design.baseType.replace('_', ' ')}</span>
                    </div>
                  </div>

                  {/* Client Details Box */}
                  <div className="bg-brand-low/50 p-3 rounded-xs space-y-1.5 border border-outline-variant/10 font-sans text-[11px] text-brand-clay">
                    <div className="flex items-center gap-1.5">
                      <Settings className="w-3.5 h-3.5 text-walnut-gold" />
                      <span className="font-bold uppercase tracking-wider text-[9px]">Draft Design Owner</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{req.clientName}</span>
                      <div className="flex gap-2">
                        {req.clientPhone && <Phone className="w-3 h-3 text-brand-clay" />}
                        <Mail className="w-3 h-3 text-brand-clay" />
                      </div>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center">
                    <div className="flex items-center gap-1 bg-brand-sage/10 text-primary px-2.5 py-1 rounded-xs font-sans font-bold text-[9px] uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-walnut-gold animate-pulse" />
                      <span>Review in progress</span>
                    </div>

                    <button
                      onClick={() => onDeleteRequest(req.id)}
                      className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
                      aria-label="Delete saved consultation"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="font-sans text-[10px] font-bold uppercase tracking-wider">Delete</span>
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-6 border-t border-outline-variant/30 bg-brand-low font-sans text-[11px] text-brand-clay leading-relaxed space-y-3">
          <p>
            Your persistent drafts are cached locally in your container browser environment. Clearing browser session data may affect your saved creations lists.
          </p>
          <div className="flex justify-between font-bold text-primary">
            <span>TOTAL SAVED DRAFTS:</span>
            <span>{requests.length} DESIGNS</span>
          </div>
        </div>

      </div>
    </div>
  );
}
