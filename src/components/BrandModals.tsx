import React from 'react';
import { X, Sparkles, Award, Shield, CheckCircle2 } from 'lucide-react';

interface BrandModalProps {
  type: 'collections' | 'about' | null;
  onClose: () => void;
  onSelectCollection?: (name: string) => void;
}

export const BrandModals: React.FC<BrandModalProps> = ({
  type,
  onClose,
  onSelectCollection,
}) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {type === 'collections' ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-sky-600" />
              <h3 className="text-xl font-bold text-[#0f2135]">
                Fleex Garment Collections
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Curated ensembles blending courtly Subcontinental heritage with contemporary tailoring.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Heritage Ivory & Pearl',
                  season: 'Core Collection · Year-Round',
                  desc: 'Egyptian Giza cotton-linen kurte with signature sherwani ban and handcrafted peshawari footwear.',
                  badge: 'Featured in Current View',
                },
                {
                  title: 'Raw Silk & Jamawar Vestments',
                  season: 'Festive & Wedding 2026',
                  desc: 'Heavy mulberry raw silk tunics accented with gold zardozi and bespoke churidar pairings.',
                  badge: 'Ceremonial',
                },
                {
                  title: 'Subtle Pastel Batiste',
                  season: 'Summer Eid & Lawn Series',
                  desc: 'Ultra-lightweight voile weaves in powder blue, pistachio green, and morning mist.',
                  badge: 'High Summer',
                },
                {
                  title: 'Black Obsidian & Charcoal',
                  season: 'Evening Aristocrat',
                  desc: 'Double-twist midnight black poplin with tone-on-tone patti stitch embroidery.',
                  badge: 'Monochrome',
                },
              ].map((col, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (onSelectCollection) onSelectCollection(col.title);
                    onClose();
                  }}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/40 cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-sky-800 bg-sky-100/70 px-2 py-0.5 rounded-full">
                        {col.badge}
                      </span>
                      <span className="text-[10px] text-slate-400">{col.season}</span>
                    </div>
                    <h4 className="font-bold text-sm text-[#0f2135] mt-2 mb-1">{col.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{col.desc}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center text-xs font-semibold text-sky-700">
                    <span>View Lookbook & Fabrics &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-sky-600" />
              <h3 className="text-xl font-bold text-[#0f2135]">About Fleex Garment</h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              The Traditional, Redefined: Re-engineering South Asian menswear for modern life.
            </p>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <p>
                Founded on the premise that traditional eastern menswear should never compromise on comfort, structural fit, or everyday versatility, <strong>Fleex Garment</strong> re-engineers classic Kurta-Shalwars, Sherwanis, and handcrafted leather footwear.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-1">Long-Staple Fibers</span>
                  <span>Pure Giza cotton and Normandy flax spun to resist heat and humid climates.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-1">Anatomical Drape</span>
                  <span>Calculated armhole depth and shoulder slopes eliminating traditional pull or collar choking.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-1">Master Cobblers</span>
                  <span>Authentic Peshawari footwear with zero-wear break-in memory foam beds.</span>
                </div>
              </div>
              <p>
                Every garment is individually cut and inspected at our ateliers before dispatch in custom garment-care trunks with brass travel hangers.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#122438] text-white text-xs font-semibold rounded-xl hover:bg-[#1c3857]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
