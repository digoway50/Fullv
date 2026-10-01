import React from 'react';

interface HotspotProps {
  id: string;
  top: string;
  left: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const Hotspot: React.FC<HotspotProps> = ({
  top,
  left,
  label,
  isActive,
  onClick,
}) => {
  return (
    <div
      style={{ top, left }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={`View details for ${label}`}
        className="relative flex items-center justify-center p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 rounded-full"
      >
        {/* Outer subtle ripple */}
        <span
          className={`absolute inset-0 rounded-full transition-all duration-700 pointer-events-none ${
            isActive
              ? 'bg-sky-400/50 animate-ping scale-150'
              : 'bg-white/30 group-hover:scale-125'
          }`}
        />

        {/* Concentric glass ring */}
        <span
          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md ${
            isActive
              ? 'border-sky-500 bg-sky-50/90 shadow-sky-400/40 ring-4 ring-sky-300/40 scale-110'
              : 'border-white/80 bg-white/40 group-hover:bg-white/70 group-hover:border-white shadow-slate-900/10'
          }`}
        >
          {/* Inner core circle */}
          <span
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-sky-600 scale-110 ring-2 ring-white'
                : 'bg-slate-700/70 group-hover:bg-sky-700'
            }`}
          />
        </span>

        {/* Floating Tooltip Tag on hover / active */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none whitespace-nowrap transition-all duration-200 z-30 ${
            isActive
              ? 'opacity-100 -translate-y-1'
              : 'opacity-0 group-hover:opacity-100 -translate-y-0 group-hover:-translate-y-1'
          }`}
        >
          <div className="bg-slate-900/90 text-white text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-md shadow-lg backdrop-blur-sm border border-slate-700/50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>{label}</span>
          </div>
          {/* Tooltip caret */}
          <div className="w-2 h-2 bg-slate-900/90 rotate-45 mx-auto -mt-1 border-r border-b border-slate-700/50" />
        </div>
      </button>
    </div>
  );
};
