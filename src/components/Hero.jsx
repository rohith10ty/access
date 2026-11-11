import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  ShoppingBag,
  Eye,
  CheckCircle2,
  ChevronRight,
  Star,
  Cpu,
  Layers
} from 'lucide-react';

const HERO_SHOWCASE = [
  {
    id: 'mob-01',
    name: 'iPhone 16 Pro Max',
    tagline: 'Titanium Grade 5. A18 Pro Silicon.',
    price: 1199,
    originalPrice: 1299,
    category: 'Mobiles',
    badge: 'Flagship 2026',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=85',
    colorHex: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    specs: [
      { label: 'Processor', value: 'A18 Pro 3nm' },
      { label: 'Display', value: '6.9" 120Hz XDR' },
      { label: 'Optics', value: '48MP 5x Telephoto' },
      { label: 'Body', value: 'Grade 5 Titanium' }
    ]
  },
  {
    id: 'lap-01',
    name: 'MacBook Pro 16" M4 Max',
    tagline: 'Unprecedented 16-Core Compute Power.',
    price: 3499,
    originalPrice: 3899,
    category: 'Laptops',
    badge: 'Pro Monster',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85',
    colorHex: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.35)',
    specs: [
      { label: 'Silicon', value: 'M4 Max 40-Core GPU' },
      { label: 'Memory', value: '64GB Unified' },
      { label: 'Screen', value: 'Liquid Retina XDR' },
      { label: 'Battery', value: 'Up to 24 Hours' }
    ]
  },
  {
    id: 'aud-01',
    name: 'Sony WH-1000XM5 Studio ANC',
    tagline: 'Acoustic Silence. Dual V1+QN1 Processors.',
    price: 349,
    originalPrice: 399,
    category: 'Headphones',
    badge: 'Spatial Acoustics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85',
    colorHex: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.35)',
    specs: [
      { label: 'Driver', value: '30mm Carbon Fiber' },
      { label: 'Noise Shield', value: 'Dual V1 Processor' },
      { label: 'Playtime', value: '30h Continuous' },
      { label: 'Acoustics', value: 'LDAC Hi-Res' }
    ]
  },
  {
    id: 'tv-01',
    name: 'LG G4 OLED evo 65" 4K',
    tagline: 'Micro Lens Array with Brightness Booster Max.',
    price: 2299,
    originalPrice: 2799,
    category: 'Smart TVs',
    badge: 'Cinema Master',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=85',
    colorHex: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    specs: [
      { label: 'Panel', value: 'OLED evo MLA 4K' },
      { label: 'Refresh', value: '144Hz VRR Gaming' },
      { label: 'AI Brain', value: 'alpha 11 Dual NPU' },
      { label: 'Mount', value: 'Zero-Gap Flush' }
    ]
  }
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart, openQuickView, setActiveCategory } = useCart();
  const activeProduct = HERO_SHOWCASE[activeIndex];
  const ambientGlowRef = useRef(null);

  // Auto cycle active hero product every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SHOWCASE.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // GSAP subtle floating aura
  useEffect(() => {
    if (ambientGlowRef.current) {
      gsap.to(ambientGlowRef.current, {
        scale: 1.15,
        opacity: 0.7,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);

  const scrollToCatalog = (category = 'All') => {
    setActiveCategory(category);
    const element = document.getElementById('catalog-section');
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -90 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToOffers = () => {
    const element = document.getElementById('promo-section');
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -90 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero-section"
      className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-tech-grid"
    >
      {/* Dynamic Ambient Glow Behind Hero */}
      <div
        ref={ambientGlowRef}
        style={{
          background: `radial-gradient(circle at 50% 35%, ${activeProduct.glowColor} 0%, rgba(8,9,13,0) 65%)`
        }}
        className="absolute inset-0 pointer-events-none transition-colors duration-1000 -z-10"
      />

      {/* Cyber Grid Mask Overlay */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==============================================================
            CENTERED & JUSTIFIED HERO HEADLINE & ACTIONS (ABOVE THE FOLD)
        ============================================================== */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center justify-center">
          
          {/* Top Tech Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl mb-3.5 shadow-md shadow-cyan-500/5"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-300">
              ACCESS 2026 ARCHITECTURE • NEXT-GEN HARDWARE SHOWCASE
            </span>
            <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-bold">
              VERIFIED
            </span>
          </motion.div>

          {/* Centered Headline - Crisp & Balanced for all viewports */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.1] text-center"
          >
            Engineered Beyond Tomorrow.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Experienced Today.
            </span>
          </motion.h1>

          {/* Centered Justified Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3.5 text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl text-center leading-relaxed font-light"
          >
            The definitive nexus of computational supremacy, titanium mobile engineering, studio acoustic isolation, and cinema-grade OLED optics. Certified genuine and delivered in lightning speed.
          </motion.p>

          {/* Centered Dual CTAs - ALWAYS PROMINENTLY VISIBLE IN THE VIEWPORT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-3.5"
          >
            <button
              onClick={() => scrollToCatalog('All')}
              className="group relative px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 overflow-hidden"
            >
              <span className="relative z-10">Explore 2026 Flagships</span>
              <ArrowRight size={15} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <button
              onClick={scrollToOffers}
              className="px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-amber-400/50 text-slate-200 hover:text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 backdrop-blur-xl group"
            >
              <Flame size={15} className="text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Unlock Vault Deals</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300">
                -40% OFF
              </span>
            </button>
          </motion.div>

          {/* Centered Micro-Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-y-1 gap-x-5 text-[11px] text-slate-400 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-cyan-400" />
              <span>Same-Day Priority Dispatch</span>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-indigo-400" />
              <span>2-Year Full Brand Warranty</span>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span>4.9/5 Rating (12,400+ Verified)</span>
            </div>
          </motion.div>
        </div>

        {/* ==============================================================
            INTERACTIVE 3D PRODUCT SHOWCASE CAROUSEL
        ============================================================== */}
        <div className="mt-8 max-w-5xl mx-auto">
          
          {/* Flagship Selector Tabs */}
          <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
            {HERO_SHOWCASE.map((item, index) => {
              const isCurrent = index === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                    isCurrent
                      ? 'text-white bg-white/10 border border-white/20 shadow-md'
                      : 'text-slate-400 hover:text-slate-200 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05]'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: item.colorHex }}
                  />
                  <span>{item.name}</span>
                  {isCurrent && (
                    <motion.div
                      layoutId="heroTabIndicator"
                      className="absolute inset-0 rounded-lg border border-cyan-400/60 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Stage Display Card */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#141622]/90 to-[#0d0e15]/95 border border-white/10 p-5 sm:p-8 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Top Bar of Stage */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                  {activeProduct.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeProduct.category} Department
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                  ${activeProduct.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 line-through">
                  ${activeProduct.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Showcase Stage Grid */}
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
              
              {/* Left Column: Key Highlights & Live Specs */}
              <div className="w-full lg:w-1/3 space-y-3.5 text-center lg:text-left order-2 lg:order-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id + '-info'}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                        {activeProduct.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-cyan-400 mt-0.5 font-medium">
                        {activeProduct.tagline}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {activeProduct.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] backdrop-blur"
                        >
                          <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                            {spec.label}
                          </div>
                          <div className="text-xs font-semibold text-slate-100 mt-0.5 truncate">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-2">
                      <button
                        onClick={() => addToCart(activeProduct)}
                        className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/30 transition-all active:scale-95"
                      >
                        <ShoppingBag size={14} />
                        <span>Add To Vault</span>
                      </button>

                      <button
                        onClick={() => openQuickView(activeProduct)}
                        className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-xs flex items-center gap-1.5 border border-white/10 transition-colors"
                      >
                        <Eye size={14} />
                        <span>Inspect</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Center Stage: The 3D High-Res Product Image with Glow Halo */}
              <div className="w-full lg:w-2/3 flex items-center justify-center relative order-1 lg:order-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id + '-image'}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.35 }}
                    className="relative group w-full max-w-md h-64 sm:h-80 flex items-center justify-center"
                  >
                    {/* Glowing Backlight Disc */}
                    <div
                      style={{
                        background: `radial-gradient(circle, ${activeProduct.colorHex}55 0%, rgba(0,0,0,0) 70%)`
                      }}
                      className="absolute inset-0 w-full h-full rounded-full blur-2xl -z-10 animate-pulse-slow"
                    />

                    {/* Centered High-Resolution Hardware Image */}
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      className="max-h-60 sm:max-h-72 w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Floating Telemetry Callout Pills */}
                    <div className="hidden sm:block absolute top-2 right-0 p-2 rounded-xl bg-[#0b0c12]/85 backdrop-blur-xl border border-white/10 shadow-lg text-left">
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                        STATUS
                      </div>
                      <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Certified In Stock
                      </div>
                    </div>

                    <div className="hidden sm:block absolute bottom-2 left-0 p-2 rounded-xl bg-[#0b0c12]/85 backdrop-blur-xl border border-white/10 shadow-lg text-left">
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                        AIR DISPATCH
                      </div>
                      <div className="text-[11px] font-semibold text-cyan-300 mt-0.5">
                        Free Express Air
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Bottom Progress Bar Indicator for auto-rotation */}
            <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px]">0{activeIndex + 1}</span>
                <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    key={activeIndex}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 7, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                  />
                </div>
                <span className="font-mono text-[11px]">0{HERO_SHOWCASE.length}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    setActiveIndex(
                      (prev) => (prev - 1 + HERO_SHOWCASE.length) % HERO_SHOWCASE.length
                    )
                  }
                  className="p-1 rounded bg-white/5 hover:bg-white/10 text-white"
                  title="Previous flagship"
                >
                  <ChevronRight size={13} className="rotate-180" />
                </button>
                <button
                  onClick={() =>
                    setActiveIndex((prev) => (prev + 1) % HERO_SHOWCASE.length)
                  }
                  className="p-1 rounded bg-white/5 hover:bg-white/10 text-white"
                  title="Next flagship"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
