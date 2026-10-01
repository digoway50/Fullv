import React from 'react';

export const SherwaniIllustration: React.FC<{ className?: string }> = ({ className = 'w-28 h-20' }) => (
  <svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body / Shoulders */}
    <path
      d="M10 100 L35 48 C50 42 62 38 70 38 L90 38 C98 38 110 42 125 48 L150 100"
      stroke="#1e3a5f"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#f4f8fb"
    />
    {/* Collar ban (Mandarin / Sherwani stand collar) */}
    <path
      d="M62 38 C62 26 70 20 80 20 C90 20 98 26 98 38 Z"
      stroke="#1e3a5f"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#ffffff"
    />
    {/* Inner collar rim */}
    <path
      d="M66 36 C70 24 90 24 94 36"
      stroke="#3b82f6"
      strokeWidth="1.2"
      strokeDasharray="2 2"
    />
    {/* Collar embroidery decorative line */}
    <path
      d="M64 30 C72 26 88 26 96 30"
      stroke="#60a5fa"
      strokeWidth="1.5"
    />
    {/* Center placket */}
    <path
      d="M80 38 L80 100"
      stroke="#1e3a5f"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Buttons */}
    <circle cx="80" cy="48" r="2.2" fill="#1e3a5f" />
    <circle cx="80" cy="60" r="2.2" fill="#1e3a5f" />
    <circle cx="80" cy="72" r="2.2" fill="#1e3a5f" />
    <circle cx="80" cy="84" r="2.2" fill="#1e3a5f" />
    <circle cx="80" cy="96" r="2.2" fill="#1e3a5f" />
  </svg>
);

export const KurteBundKurteIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-16' }) => (
  <div className="flex items-center gap-3">
    <svg viewBox="0 0 110 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Lower folded fabric layer */}
      <path
        d="M20 35 L75 18 C82 16 92 20 95 26 L98 42 C99 48 94 53 88 56 L35 72 C28 74 20 70 18 64 L16 48 C15 41 17 36 20 35 Z"
        fill="#93c5fd"
        fillOpacity="0.4"
        stroke="#1e3a5f"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Upper folded fabric layer */}
      <path
        d="M22 28 L72 12 C79 10 88 14 91 20 L88 36 C87 42 81 46 75 48 L28 62 C22 64 15 60 14 54 L17 40 C18 34 20 29 22 28 Z"
        fill="#dbeafe"
        stroke="#1e3a5f"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Woven fabric texture lines */}
      <path d="M30 26 L42 22" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M46 22 L58 18" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M62 17 L74 13" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M26 36 L38 32" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M42 32 L54 28" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M58 27 L70 23" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M24 46 L36 42" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M40 42 L52 38" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M56 37 L68 33" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
    <div className="text-right leading-tight">
      <span className="block text-xs font-semibold text-slate-800 tracking-wider">bund</span>
      <span className="block text-xs font-semibold text-slate-800 tracking-wider">kufe</span>
    </div>
  </div>
);

export const PlateDetailIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-20' }) => (
  <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Shoulders & Neck outline */}
    <path
      d="M15 45 L40 30 C50 26 70 26 80 30 L105 45"
      stroke="#1e3a5f"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Collar ban */}
    <path
      d="M48 28 C48 18 54 14 60 14 C66 14 72 18 72 28 Z"
      stroke="#1e3a5f"
      strokeWidth="2.2"
      fill="#ffffff"
    />
    {/* Prominent stitched center plate/placket */}
    <rect
      x="56"
      y="28"
      width="8"
      height="65"
      rx="1"
      stroke="#1e3a5f"
      strokeWidth="2"
      fill="#e0f2fe"
    />
    {/* Tailored pleat stitch lines */}
    <line x1="53" y1="36" x2="53" y2="88" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="67" y1="36" x2="67" y2="88" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 2" />
    {/* Buttonholes & thread loop */}
    <circle cx="60" cy="38" r="1.5" fill="#1e3a5f" />
    <circle cx="60" cy="52" r="1.5" fill="#1e3a5f" />
    <circle cx="60" cy="66" r="1.5" fill="#1e3a5f" />
    <circle cx="60" cy="80" r="1.5" fill="#1e3a5f" />
  </svg>
);

export const DamanColalIllustration: React.FC<{ className?: string }> = ({ className = 'w-28 h-16' }) => (
  <div className="flex items-center gap-3">
    <div className="text-left leading-tight">
      <span className="block text-xs font-semibold text-slate-800 tracking-wider">daman</span>
      <span className="block text-xs font-semibold text-slate-800 tracking-wider">colal</span>
    </div>
    <svg viewBox="0 0 130 75" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Kurta hemline outline with distinctive side slit (chaak) and curved edge */}
      <path
        d="M10 10 L10 50 C10 60 25 65 65 65 C105 65 120 60 120 50 L120 10"
        stroke="#1e3a5f"
        strokeWidth="2"
        strokeLinecap="round"
        fill="#f0f9ff"
      />
      {/* Inner finished hem stitch line */}
      <path
        d="M16 12 L16 48 C16 56 28 60 65 60 C102 60 114 56 114 48 L114 12"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />
      {/* Side chaak slit indicators */}
      <line x1="6" y1="18" x2="14" y2="18" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round" />
      <line x1="116" y1="18" x2="124" y2="18" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

export const SalwarGharIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <div className="flex items-center gap-3">
    <div className="text-left leading-tight">
      <span className="block text-xs font-semibold text-slate-800 tracking-wider">salwar</span>
      <span className="block text-xs font-semibold text-slate-800 tracking-wider">ghar</span>
    </div>
    <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Traditional voluminous Shalwar trousers outline */}
      <path
        d="M15 15 L95 15 L90 70 C88 85 82 95 80 98 L68 98 C66 94 65 85 64 70 L55 50 L46 70 C45 85 44 94 42 98 L30 98 C28 95 22 85 20 70 Z"
        stroke="#1e3a5f"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="#f8fafc"
      />
      {/* Ghera pleat fall lines */}
      <path d="M28 15 C26 40 32 65 35 96" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M42 15 C40 35 44 60 48 85" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
      <path d="M68 15 C70 35 66 60 62 85" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
      <path d="M82 15 C84 40 78 65 75 96" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Cuffed bottom hems (paincha) */}
      <rect x="29" y="96" width="14" height="4" rx="1" fill="#1e3a5f" />
      <rect x="67" y="96" width="14" height="4" rx="1" fill="#1e3a5f" />
    </svg>
  </div>
);
