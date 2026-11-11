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
  ArrowUpRight,
  Shield,
  Radio
} from 'lucide-react';

const CATEGORIES_MENU = [
  { name: 'Mobiles', count: '4 Flagships', icon: Smartphone, desc: 'Titanium & Bionic Architectures' },
  { name: 'Laptops', count: '4 Workstations', icon: Laptop, desc: 'M4 Max Silicon & Dual-Mode OLED' },
  { name: 'Headphones', count: '4 Studios', icon: Headphones, desc: 'Acoustic Carbon Fiber & Spatial Sound' },
  { name: 'Smart TVs', count: '4 Displays', icon: Tv, desc: 'Micro Lens Array & 8K Quantum Mini-LED' },
  { name: 'Cameras', count: '4 Systems', icon: Camera, desc: 'Full-Frame BIONZ XR & 8.3K N-RAW' },
  { name: 'Smartwatches', count: '4 Editions', icon: Watch, desc: 'Sapphire Crystal & Grade 5 Titanium' },
  { name: 'Accessories', count: '4 Essentials', icon: Zap, desc: '250W GaN Charging & Ergonomics' },
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
  const [activeNav, setActiveNav] = useState('showcase');

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
        window.lenis.scrollTo(element, { offset: -90 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToSection = (id, navKey) => {
    setActiveNav(navKey);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -90 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        
        {/* ==============================================================
            LUXURY ARCHITECTURAL TOP TICKER STRIP
        ============================================================== */}
        <div className="hidden md:flex items-center justify-between px-8 py-1.5 bg-[#050608]/95 border-b border-white/[0.06] text-[10px] tracking-[0.2em] font-medium text-slate-400 select-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Radio size={11} className="animate-pulse" />
              ACCESS ATELIER
            </span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">CERTIFIED 2026 HARDWARE SHOWROOM</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="text-emerald-300 font-mono font-semibold">VAULT DISPATCH ONLINE</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">PRIORITY AIR COURIER // COMPLIMENTARY ON $500+</span>
            <span className="text-white/20">|</span>
            <span className="text-slate-300 font-mono">GLOBAL HUB: SFO / NYC</span>
          </div>
        </div>

        {/* ==============================================================
            MAIN BESPOKE ATELIER NAVIGATION BAR (NO GENERIC FLOATING PILL)
        ============================================================== */}
        <div
          className={`transition-all duration-300 border-b ${
            isScrolled
              ? 'bg-[#08090d]/90 backdrop-blur-2xl border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.8)] py-3 px-6 lg:px-12'
              : 'bg-gradient-to-b from-[#08090d]/95 via-[#08090d]/80 to-transparent border-white/[0.05] py-4 px-6 lg:px-12'
          }`}
        >
          <div className="max-w-[1440px] mx-auto flex items-center justify-between">
            
            {/* Left: Sculpted Luxury Brandmark */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-4 shrink-0"
            >
              {/* Minimalist Monogram Bezel */}
              <div className="relative w-9 h-9 border border-white/20 bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center transition-all duration-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400" />
                <span className="font-outfit font-black text-sm text-white tracking-widest">
                  A
                </span>
              </div>

              {/* Monolithic Brand Name */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-outfit font-extrabold text-xl tracking-[0.22em] text-white uppercase group-hover:text-cyan-300 transition-colors">
                    ACCESS
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-white/5 border border-white/10 text-cyan-400 font-semibold">
                    PRO
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-light -mt-0.5">
                  ATELIER OF COMPUTATION
                </span>
              </div>
            </a>

            {/* Center: High-Fashion Luxury Menu Links with Hairline Indicators */}
            <nav className="hidden lg:flex items-center gap-8">
              
              <button
                onClick={() => scrollToSection('hero-section', 'showcase')}
                className={`relative py-1 text-[11px] uppercase tracking-[0.2em] font-semibold transition-all group ${
                  activeNav === 'showcase' ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>SHOWCASE</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-400 to-indigo-500 transition-transform duration-300 ${
                    activeNav === 'showcase' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>

              {/* Categories Mega Dropdown with Architectural Drawer */}
              <div
                className="relative"
                onMouseEnter={() => setCategoryDropdownOpen(true)}
                onMouseLeave={() => setCategoryDropdownOpen(false)}
              >
                <button
                  onClick={() => scrollToSection('categories-section', 'departments')}
                  className={`relative py-1 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold transition-all group ${
                    categoryDropdownOpen || activeNav === 'departments' ? 'text-cyan-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>DEPARTMENTS</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-cyan-400 transition-transform duration-300 ${
                      categoryDropdownOpen || activeNav === 'departments' ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {categoryDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[26rem] p-4 bg-[#0b0c13]/98 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.9)] z-50 rounded-xl"
                    >
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                        <span>Curated Hardware Collections</span>
                        <span className="text-cyan-400 font-mono">7 DEPARTMENTS</span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-1.5">
                        {CATEGORIES_MENU.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <button
                              key={cat.name}
                              onClick={() => handleCategorySelect(cat.name)}
                              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/[0.04] transition-all group text-left border border-transparent hover:border-white/5"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-white/5 text-slate-300 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                                  <Icon size={15} />
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                                    {cat.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400">
                                    {cat.desc}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {cat.count}
                                </span>
                                <ArrowUpRight size={12} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => scrollToSection('promo-section', 'offers')}
                className={`relative py-1 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold transition-all group ${
                  activeNav === 'offers' ? 'text-amber-300' : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                <Sparkles size={12} className="text-amber-400" />
                <span>LIMITED DROPS</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 transition-transform duration-300 ${
                    activeNav === 'offers' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>

              <button
                onClick={() => scrollToSection('catalog-section', 'catalogue')}
                className={`relative py-1 text-[11px] uppercase tracking-[0.2em] font-semibold transition-all group ${
                  activeNav === 'catalogue' ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>CATALOGUE</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-400 to-indigo-500 transition-transform duration-300 ${
                    activeNav === 'catalogue' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>

              <button
                onClick={() => scrollToSection('faq-section', 'concierge')}
                className={`relative py-1 text-[11px] uppercase tracking-[0.2em] font-semibold transition-all group ${
                  activeNav === 'concierge' ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>CONCIERGE & FAQ</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-400 to-indigo-500 transition-transform duration-300 ${
                    activeNav === 'concierge' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>

            </nav>

            {/* Right: Architectural Action Controls */}
            <div className="flex items-center gap-3">
              
              {/* Luxury Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-3 px-3.5 py-2 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all text-xs group"
                title="Search hardware"
              >
                <Search size={14} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                <span className="text-[11px] tracking-wider uppercase text-slate-400 font-medium">
                  Search Vault
                </span>
                <kbd className="px-1.5 py-0.5 text-[9px] text-slate-400 bg-white/5 border border-white/10 font-mono rounded">
                  ⌘K
                </kbd>
              </button>

              {/* Wishlist Monogram Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-slate-300 hover:text-white transition-all"
                title="Curated Wishlist"
              >
                <Heart size={16} className="hover:text-rose-400 transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-mono font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Luxury Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="group relative flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-[#171a26] to-[#12141f] border border-cyan-500/30 hover:border-cyan-400 text-white transition-all shadow-[0_0_20px_rgba(56,189,248,0.15)] active:scale-95"
              >
                <div className="relative">
                  <ShoppingBag size={15} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-cyan-400 text-slate-950 text-[9px] font-extrabold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>

                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[8px] uppercase tracking-widest text-slate-400 leading-none">
                    VAULT TOTAL
                  </span>
                  <span className="font-mono font-bold text-xs text-white tracking-tight mt-0.5">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
              </button>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 bg-white/5 border border-white/10 text-white"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[76px] bg-[#08090d]/98 backdrop-blur-3xl z-30 p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="space-y-6">
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                NAVIGATION ARCHITECTURE
              </div>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => scrollToSection('hero-section', 'showcase')}
                  className="flex items-center justify-between p-3.5 border border-white/10 bg-white/[0.02] text-left text-white text-xs uppercase tracking-wider font-semibold"
                >
                  <span>2026 Hardware Showcase</span>
                  <ArrowUpRight size={14} className="text-cyan-400" />
                </button>
                <button
                  onClick={() => scrollToSection('promo-section', 'offers')}
                  className="flex items-center justify-between p-3.5 border border-amber-500/20 bg-amber-500/5 text-left text-amber-300 text-xs uppercase tracking-wider font-semibold"
                >
                  <span>Special Hardware Offers (-40%)</span>
                  <Sparkles size={14} className="text-amber-400" />
                </button>
                <button
                  onClick={() => scrollToSection('catalog-section', 'catalogue')}
                  className="flex items-center justify-between p-3.5 border border-white/10 bg-white/[0.02] text-left text-white text-xs uppercase tracking-wider font-semibold"
                >
                  <span>Explore Full 28-Model Catalog</span>
                  <ArrowUpRight size={14} className="text-cyan-400" />
                </button>
              </div>

              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold pt-2">
                Curated Departments
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES_MENU.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleCategorySelect(cat.name)}
                      className="flex items-center gap-2.5 p-3 border border-white/5 bg-white/[0.02] text-left hover:border-cyan-400/40 text-slate-300"
                    >
                      <Icon size={15} className="text-cyan-400 shrink-0" />
                      <span className="text-xs font-medium">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 font-mono">
                ACCESS PRECISION // 2026
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Open Vault ({totalItems})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
