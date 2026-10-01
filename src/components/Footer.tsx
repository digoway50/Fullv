import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, ShieldCheck, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'terms' | 'contact' | null>(null);

  return (
    <footer className="w-full py-6 px-6 sm:px-10 lg:px-14 border-t border-white/20 mt-12 bg-sky-900/5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-800">
        {/* Footer Links (Left side as in screenshot) */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setModalType('terms')}
            className="hover:text-black transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            Terms
          </button>
          <button
            type="button"
            onClick={() => setModalType('contact')}
            className="hover:text-black transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            Contact
          </button>
          <span className="hidden md:inline text-slate-400">·</span>
          <span className="hidden md:inline text-slate-600">
            Artisanal Menswear & Heritage Tailoring
          </span>
        </div>

        {/* Copyright notice (Right side as in screenshot) */}
        <div className="text-right">
          <p>© Fleex Garment 2024. All rights reserved.</p>
        </div>
      </div>

      {/* Terms / Contact Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 border border-slate-200">
            <button
              onClick={() => setModalType(null)}
              type="button"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            {modalType === 'terms' ? (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-sky-800" />
                  <h3 className="text-lg font-bold text-[#0f2135]">Terms & Guarantee</h3>
                </div>
                <div className="text-xs text-slate-600 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                  <p>
                    <strong>1. Bespoke Craftsmanship Guarantee:</strong> Every Fleex Garment Kurta-Shalwar ensemble is produced with preshrunk Belgian-Normandy flax and Egyptian cotton yarns. Slight grain texture variations reflect authentic handloom processing.
                  </p>
                  <p>
                    <strong>2. Complimentary Tailoring Alterations:</strong> We provide 30-day complimentary adjustments on all sleeve lengths, collar heights, and shalwar paincha hems.
                  </p>
                  <p>
                    <strong>3. Global Express Delivery:</strong> Orders ship in signature cedar wardrobe boxes via expedited courier with tracking.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5 text-sky-800" />
                  <h3 className="text-lg font-bold text-[#0f2135]">Artisan Concierge</h3>
                </div>
                <div className="text-xs text-slate-600 space-y-4">
                  <p>
                    Have custom sizing questions, wedding party orders, or fabric sample requests? Our master tailors are available for private consultations.
                  </p>
                  <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-sky-700" />
                      <span>concierge@fleexgarment.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-sky-700" />
                      <span>+1 (800) 582-FLEEX · WhatsApp Tailor Line</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-sky-700" />
                      <span>Flagship Atelier: 14 Heritage Mall, Lahore & Knightsbridge, London</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-5 py-2 bg-[#122438] text-white text-xs font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
