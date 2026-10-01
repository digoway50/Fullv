import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hotspot } from './components/Hotspot';
import { FeatureBreakdown } from './components/FeatureBreakdown';
import { BrandModals } from './components/BrandModals';
import { FEATURES_DATA } from './data/productData';

export default function App() {
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>('sherwani');
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [selectedFabricTone, setSelectedFabricTone] = useState('pure-white');
  const [brandModalType, setBrandModalType] = useState<'collections' | 'about' | null>(null);

  const handleToggleFeature = (id: string) => {
    if (activeFeatureId === id) {
      setActiveFeatureId(null);
    } else {
      setActiveFeatureId(id);
      const featureIndexMap: Record<string, number> = {
        sherwani: 0,
        fabric: 1,
        plate: 2,
        daman: 3,
        salwar: 4,
      };
      if (featureIndexMap[id] !== undefined) {
        setActiveSegmentIndex(featureIndexMap[id]);
      }
    }
  };

  const handleSelectSegment = (index: number) => {
    setActiveSegmentIndex(index);
    const featureKeys: ('sherwani' | 'fabric' | 'plate' | 'daman' | 'salwar')[] = [
      'sherwani',
      'fabric',
      'plate',
      'daman',
      'salwar',
    ];
    setActiveFeatureId(featureKeys[index] || null);
  };

  return (
    <div className="min-h-screen bg-[#9bbad2] text-slate-800 flex flex-col justify-between relative selection:bg-[#0f2135] selection:text-white">
      {/* Top Header Navbar */}
      <Navbar
        onOpenCollections={() => setBrandModalType('collections')}
        onOpenAbout={() => setBrandModalType('about')}
      />

      {/* Main Hero Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-14 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Brand Title, Description, Segmented Indicator & Sandal Thumbnails */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-4 lg:pt-8 z-10">
            <div>
              {/* Bold Stacked Heading as specified: 'THE TRADITIONAL, REDEFINED.' */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-[#0f2135] tracking-tight leading-[0.95] mb-5">
                THE
                <br />
                TRADITIONAL,
                <br />
                REDEFINED.
              </h1>

              {/* Description text */}
              <p className="text-sm sm:text-base text-slate-800/90 font-normal leading-relaxed max-w-sm mb-6">
                The artisanal quality and bespoke comfort, crafted through centuries
                of heritage tailoring and perfected for modern sophistication.
                Pure fabric, timeless elegance.
              </p>
            </div>

            {/* Segmented bar */}
            <div className="pt-4 lg:pt-16">
              {/* 5-Segment Indicator Bar (Matching the screenshot indicator) */}
              <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white/30 backdrop-blur-md border border-white/50 mb-4 shadow-xs">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSegment(idx)}
                    aria-label={`View angle ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSegmentIndex === idx
                        ? 'w-10 bg-white shadow-xs'
                        : 'w-6 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Central Photo of South Asian Man in White Kurta-Shalwar with Hotspots */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* The Image Container with Hotspots */}
            <div className="relative w-full max-w-[430px] rounded-3xl overflow-hidden shadow-2xl shadow-sky-950/20 border border-white/60 bg-gradient-to-b from-[#b3cee4] to-[#9bbad2]">
              {/* Central photo of the South Asian man wearing white kurta-shalwar set */}
              <img
                src="/src/assets/images/fleex_kurta_model_1790884646861.jpg"
                alt="South Asian man wearing Fleex Garment white traditional kurta-shalwar set"
                className="w-full h-auto object-cover select-none transition-transform duration-700"
              />

              {/* Interactive Hotspots positioned over key garment features */}
              {FEATURES_DATA.map((feature) => (
                <Hotspot
                  key={feature.id}
                  id={feature.id}
                  top={feature.hotspot.top}
                  left={feature.hotspot.left}
                  label={feature.hotspot.label}
                  isActive={activeFeatureId === feature.id}
                  onClick={() => handleToggleFeature(feature.id)}
                />
              ))}

              {/* Active feature highlight indicator banner inside photo */}
              {activeFeatureId && (
                <div className="absolute bottom-3 left-3 right-3 z-20 bg-slate-900/80 backdrop-blur-md text-white p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    <span className="font-semibold">
                      {FEATURES_DATA.find((f) => f.id === activeFeatureId)?.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById(`feature-${activeFeatureId}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[11px] text-sky-300 hover:text-white underline cursor-pointer"
                  >
                    View Specs &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Feature Breakdown Column */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <FeatureBreakdown
              features={FEATURES_DATA}
              activeFeatureId={activeFeatureId}
              onToggleFeature={handleToggleFeature}
              selectedFabricTone={selectedFabricTone}
              onChangeFabricTone={setSelectedFabricTone}
            />
          </div>

        </div>
      </main>

      {/* Footer Links & Copyright */}
      <Footer />

      {/* Brand Modals */}
      <BrandModals
        type={brandModalType}
        onClose={() => setBrandModalType(null)}
      />
    </div>
  );
}
