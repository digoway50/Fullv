import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenCollections: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCollections,
  onOpenAbout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 w-full pt-6 pb-2 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo (Matching the stacked bold typography from the design) */}
        <a
          href="#"
          className="group block leading-[0.88] select-none focus:outline-none"
        >
          <span className="block text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f2135] transition-colors group-hover:text-sky-900">
            Fleex
          </span>
          <span className="block text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f2135] transition-colors group-hover:text-sky-900">
            Garment
          </span>
        </a>

        {/* Desktop Navigation Menu (Top Right as requested) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-semibold text-[#0f2135]">
          <button
            type="button"
            onClick={onOpenCollections}
            className="hover:text-sky-800 transition-colors py-1 relative group cursor-pointer"
          >
            <span>Collections</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0f2135] transition-all group-hover:w-full" />
          </button>

          <button
            type="button"
            onClick={onOpenAbout}
            className="hover:text-sky-800 transition-colors py-1 relative group cursor-pointer"
          >
            <span>About Us</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0f2135] transition-all group-hover:w-full" />
          </button>

          <a
            href="#account"
            className="hover:text-sky-800 transition-colors py-1 relative group cursor-pointer"
          >
            <span>Account</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0f2135] transition-all group-hover:w-full" />
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/60 text-[#0f2135]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/80 shadow-lg space-y-3 animate-fadeIn">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCollections();
            }}
            className="block w-full text-left py-2 font-bold text-sm text-[#0f2135]"
          >
            Collections
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout();
            }}
            className="block w-full text-left py-2 font-bold text-sm text-[#0f2135]"
          >
            About Us
          </button>
          <a
            href="#account"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-sm text-[#0f2135]"
          >
            Account
          </a>
        </div>
      )}
    </header>
  );
};
