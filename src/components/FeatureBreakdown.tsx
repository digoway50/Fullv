import React from 'react';
import { ChevronUp, ChevronDown, Sparkles, Check, Info } from 'lucide-react';
import { FeatureDetail } from '../types';
import {
  SherwaniIllustration,
  KurteBundKurteIllustration,
  PlateDetailIllustration,
  DamanColalIllustration,
  SalwarGharIllustration,
} from './LineIllustrations';

interface FeatureBreakdownProps {
  features: FeatureDetail[];
  activeFeatureId: string | null;
  onToggleFeature: (id: string) => void;
  selectedFabricTone: string;
  onChangeFabricTone: (tone: string) => void;
}

export const FeatureBreakdown: React.FC<FeatureBreakdownProps> = ({
  features,
  activeFeatureId,
  onToggleFeature,
  selectedFabricTone,
  onChangeFabricTone,
}) => {
  const renderIllustration = (id: string) => {
    switch (id) {
      case 'sherwani':
        return <SherwaniIllustration className="w-28 h-20 my-1" />;
      case 'fabric':
        return <KurteBundKurteIllustration className="w-24 h-16 my-1" />;
      case 'plate':
        return <PlateDetailIllustration className="w-24 h-20 my-1" />;
      case 'daman':
        return <DamanColalIllustration className="w-28 h-16 my-1" />;
      case 'salwar':
        return <SalwarGharIllustration className="w-24 h-24 my-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full lg:w-[350px] xl:w-[380px] shrink-0">
      <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-5 shadow-xl shadow-slate-900/5 transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/60">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#0f2135]">
              Interactive Feature Breakdown
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Select any section to inspect craftsmanship & fit
            </p>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-sky-800 bg-sky-100/80 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-sky-600" />
            5 Points
          </span>
        </div>

        {/* Accordion Panels List */}
        <div className="space-y-3 mt-3">
          {features.map((feature) => {
            const isExpanded = activeFeatureId === feature.id;

            return (
              <div
                key={feature.id}
                id={`feature-${feature.id}`}
                className={`rounded-2xl transition-all duration-300 border ${
                  isExpanded
                    ? 'bg-sky-50/70 border-sky-300 shadow-md shadow-sky-900/5 ring-1 ring-sky-300/60'
                    : 'bg-white/60 border-white/90 hover:bg-white/90 hover:border-slate-200'
                }`}
              >
                {/* Header Button */}
                <button
                  type="button"
                  onClick={() => onToggleFeature(feature.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-3.5 flex items-start justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-2xl"
                >
                  <div className="flex-1">
                    <span className="block text-base font-bold text-[#0f2135] leading-snug">
                      {feature.title}
                    </span>
                    <span className="block text-xs font-medium text-slate-600 uppercase tracking-wider">
                      {feature.subtitle}
                    </span>
                  </div>

                  <div className="p-1 rounded-full text-slate-600 hover:text-slate-900 transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-sky-700 stroke-[2.5]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-sky-100/60 transition-all animate-fadeIn">
                    {/* Illustration Container */}
                    <div className="flex justify-center items-center py-2 bg-white/75 rounded-xl border border-sky-100/80 shadow-xs mb-3">
                      {renderIllustration(feature.id)}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-700 font-medium leading-relaxed mb-3">
                      {feature.description}
                    </p>

                    {/* Feature Specific Controls / Customizers */}
                    {feature.id === 'sherwani' && (
                      <div className="mb-3 p-2.5 bg-white/60 rounded-xl border border-slate-200/60">
                        <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                          Collar Profile
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <button
                            type="button"
                            className="px-2.5 py-1.5 bg-sky-600 text-white font-medium rounded-lg shadow-xs flex items-center justify-between"
                          >
                            <span>Standard 1.25"</span>
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            className="px-2.5 py-1.5 bg-white text-slate-700 hover:bg-slate-50 font-medium rounded-lg border border-slate-200"
                          >
                            <span>Slim 1.0" Ban</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {feature.id === 'fabric' && (
                      <div className="mb-3 p-2.5 bg-white/60 rounded-xl border border-slate-200/60">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                            Fabric Shade
                          </span>
                          <span className="text-[11px] text-sky-800 font-medium capitalize">
                            {selectedFabricTone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {[
                            { id: 'pure-white', color: 'bg-white', label: 'Pristine White' },
                            { id: 'ivory', color: 'bg-[#faf7ee]', label: 'Soft Ivory' },
                            { id: 'mist-sky', color: 'bg-[#e2edf6]', label: 'Mist Sky' },
                          ].map((swatch) => (
                            <button
                              key={swatch.id}
                              type="button"
                              onClick={() => onChangeFabricTone(swatch.id)}
                              title={swatch.label}
                              className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${
                                selectedFabricTone === swatch.id
                                  ? 'border-sky-600 ring-2 ring-sky-300 scale-105 shadow-xs'
                                  : 'border-slate-300 hover:scale-105'
                              } ${swatch.color}`}
                            >
                              {selectedFabricTone === swatch.id && (
                                <Check className="w-3.5 h-3.5 text-slate-800 stroke-[3]" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Craftsmanship Note */}
                    <div className="p-2.5 bg-sky-100/50 rounded-xl border border-sky-200/60 mb-3">
                      <div className="flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-sky-900 leading-snug">
                          {feature.craftsmanshipNote}
                        </p>
                      </div>
                    </div>

                    {/* Specification Table */}
                    <div className="space-y-1 pt-1 border-t border-sky-100/70">
                      {feature.specifications.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-[11px] text-slate-600 py-0.5"
                        >
                          <span className="text-slate-500">{spec.label}</span>
                          <span className="font-semibold text-slate-800 text-right">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
