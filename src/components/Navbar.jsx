import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Camera,
  Watch,
  Zap,
  ArrowRight
} from 'lucide-react';

const CATEGORIES_MENU = [
  { name: 'Mobiles', count: '4 Models', icon: Smartphone, desc: 'Titanium & Bionic Flagships' },
  { name: 'Laptops', count: '4 Workstations', icon: Laptop, desc: 'M4 Max & OLED Gaming' },
  { name: 'Headphones', count: '4 Studios', icon: Headphones, desc: 'ANC & Spatial Acoustics' },
  { name: 'Smart TVs', count: '4 Displays', icon: Tv, desc: '8K Neo QLED & OLED evo' },
  { name: 'Cameras', count: '4 Systems', icon: Camera, desc: 'Full-Frame & Cinematic 8K' },
  { name: 'Smartwatches', count: '4 Editions', icon: Watch, desc: 'Sapphire & Grade 5 Titanium' },
  { name: 'Accessories', count: '4 Essentials', icon: Zap, desc: '250W GaN & Precision Gear' },
];

export default function Navbar() {
  const {
    totalItems,
    subtotal,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setActiveCategory
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategorySelect = (catName) => {
    setActiveCategory(catName);
    setCategoryDropdownOpen(false);
    setMobileMenuOpen(false);
    const element = document.getElementById('catalog-section');
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -80 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -80 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-3.5 px-4 md:px-8 ${
          isScrolled
            ? 'backdrop-blur-2xl bg-[#08090d]/80 border-b border-white/[0.08] shadow-[0_15px_30px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Mark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 shrink-0"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <div className="w-full h-full bg-[#0d0e15] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <span className="font-extrabold text-lg tracking-tighter text-white">A</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-wider text-white font-outfit uppercase">
                  ACCESS
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8] animate-pulse" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 -mt-1 font-semibold">
                PRECISION TECH
              </span>
            </div>
          </a>

          {/* Centered Floating Dock Menu (Desktop) */}
          <nav className="hidden lg:flex items-center bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl px-5 py-2 rounded-full shadow-inner gap-1">
            <button
              onClick={() => scrollToSection('hero-section')}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              Flagship 2026
            </button>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={() => setCategoryDropdownOpen(false)}
            >
              <button
                onClick={() => scrollToSection('categories-section')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <span>Collections</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`}
                />
              </button>

              {/* Mega Dropdown */}
              <AnimatePresence>
                {categoryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 p-2.5 rounded-2xl bg-[#10121a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl z-50"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 py-1.5">
                      Curated Departments
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {CATEGORIES_MENU.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <button
                            key={cat.name}
                            onClick={() => handleCategorySelect(cat.name)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors group text-left w-full"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-white/5 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                                <Icon size={16} />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                  {cat.name}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {cat.desc}
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {cat.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => scrollToSection('promo-section')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-amber-300/90 hover:text-amber-200 hover:bg-amber-400/10 transition-all"
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>Offers</span>
            </button>

            <button
              onClick={() => scrollToSection('catalog-section')}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              All Products
            </button>

            <button
              onClick={() => scrollToSection('faq-section')}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              Concierge & FAQ
            </button>
          </nav>

          {/* Right Action Island */}
          <div className="flex items-center gap-2.5">
            {/* Search Pill */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-slate-300 hover:text-white transition-all text-xs group"
              title="Search electronics"
            >
              <Search size={15} className="group-hover:text-cyan-400 transition-colors" />
              <span className="hidden sm:inline text-slate-400 font-normal">Search vault</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-slate-400 bg-white/5 rounded border border-white/10 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Pill */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-slate-300 hover:text-white transition-all group"
              title="Curated Wishlist"
            >
              <Heart size={17} className="group-hover:text-rose-400 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-rose-500/50">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Pill Dock */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all transform active:scale-95"
            >
              <div className="relative">
                <ShoppingBag size={16} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white text-slate-950 text-[10px] font-extrabold flex items-center justify-center shadow-md animate-bounce">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-mono font-bold tracking-tight">
                ${subtotal.toLocaleString()}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-white/5 border border-white/10 text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[72px] bg-[#090a10]/95 backdrop-blur-2xl z-30 p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="space-y-6">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Navigation
              </div>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => scrollToSection('hero-section')}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-left text-white font-semibold hover:bg-white/10"
                >
                  <span>Flagship 2026 Showcase</span>
                  <ArrowRight size={16} className="text-cyan-400" />
                </button>
                <button
                  onClick={() => scrollToSection('promo-section')}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-left text-amber-300 font-semibold hover:bg-white/10"
                >
                  <span>Special Offers (-40%)</span>
                  <Sparkles size={16} className="text-amber-400" />
                </button>
                <button
                  onClick={() => scrollToSection('catalog-section')}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-left text-white font-semibold hover:bg-white/10"
                >
                  <span>Explore Full Catalog</span>
                  <ArrowRight size={16} className="text-cyan-400" />
                </button>
              </div>

              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold pt-2">
                Browse By Category
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES_MENU.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleCategorySelect(cat.name)}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 text-left hover:bg-white/10 text-slate-200"
                    >
                      <Icon size={16} className="text-cyan-400 shrink-0" />
                      <span className="text-xs font-medium">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                ACCESS Electronics Worldwide © 2026
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs"
              >
                View Cart ({totalItems})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
