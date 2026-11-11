import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Tag,
  Copy,
  Check,
  Zap,
  Percent,
  Gift
} from 'lucide-react';

export default function PromoBanners() {
  const { applyCoupon, setActiveCategory } = useCart();
  const [copiedCode, setCopiedCode] = useState('');

  // Live countdown timer state (e.g. 14h 28m 42s)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 52
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  const handleExplorePromo = (category) => {
    setActiveCategory(category);
    const element = document.getElementById('catalog-section');
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -80 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="promo-section" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles size={13} className="text-amber-400" />
              <span>LIMITED ACCESS ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Exclusive Hardware Drops & Promos
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Strictly limited allocation for verified members. Claim instant tier credits, zero-interest financing, and factory bundle kits.
            </p>
          </div>

          {/* Flash Clock */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#141622] border border-white/10 shrink-0">
            <Clock size={18} className="text-cyan-400" />
            <div className="text-xs font-medium text-slate-300">
              Vault Closes In:
            </div>
            <div className="flex items-center gap-1 font-mono font-bold text-sm text-white">
              <span className="p-1 rounded bg-white/10">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span className="p-1 rounded bg-white/10">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span className="p-1 rounded bg-white/10 text-cyan-400">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* 3 Prominent Featured Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Main Hero Banner (Large) */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#131b2e] via-[#0f1422] to-[#090b12] border border-cyan-500/30 p-8 sm:p-10 flex flex-col justify-between shadow-2xl group"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />
            
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-6">
              <div className="max-w-md">
                <span className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-[11px] font-bold uppercase tracking-wider border border-cyan-400/30">
                  FLAGSHIP SEASON PASS
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 leading-tight">
                  Titanium Mobile & Ultra Audio Bundle
                </h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Unlock an instant 15% markdown across all iPhone 16 Pro Max and Sony WH-1000XM5 orders with our launch voucher. Includes complimentary ACCESS Express Courier.
                </p>

                {/* Promo Code Pill */}
                <div className="mt-6 inline-flex items-center gap-3 p-1.5 pl-4 rounded-xl bg-black/40 border border-white/15">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-cyan-400" />
                    <span className="font-mono text-xs font-bold text-white tracking-wider">
                      ACCESS2026
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy('ACCESS2026')}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {copiedCode === 'ACCESS2026' ? (
                      <>
                        <Check size={13} />
                        <span>Copied & Applied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Apply -15%</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Product Badge Showcase */}
              <div className="relative shrink-0 hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80"
                  alt="Flagship"
                  className="w-48 h-48 object-cover rounded-2xl border border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-3 -right-3 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-mono font-extrabold text-xs shadow-lg">
                  SAVE $180+
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Zap size={14} className="text-cyan-400" />
                <span>Expires at 6:00 PM • First 100 Redemptions Only</span>
              </div>
              <button
                onClick={() => handleExplorePromo('Mobiles')}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 group-hover:translate-x-1 transition-all"
              >
                <span>Shop Eligible Mobiles & Audio</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Cinema & Workstation Drop */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1f1624] via-[#14101e] to-[#0a0812] border border-purple-500/30 p-8 flex flex-col justify-between shadow-2xl group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700" />

            <div>
              <span className="px-3 py-1 rounded-full bg-purple-400/20 text-purple-300 text-[11px] font-bold uppercase tracking-wider border border-purple-400/30">
                ENTERTAINMENT SUITE
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-4 leading-snug">
                $600 Trade-In Credit on 8K & OLED evo Displays
              </h3>
              <p className="text-slate-300 text-sm mt-3">
                Upgrade any existing display or TV for an instant $600 appraisal credit towards the LG G4 OLED evo or Samsung Neo QLED 8K series.
              </p>
            </div>

            <div className="mt-8">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    PROMO CODE
                  </div>
                  <div className="font-mono text-xs font-bold text-purple-300">
                    PRODIGY10
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('PRODIGY10')}
                  className="px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Percent size={13} />
                  <span>Get 10% Extra</span>
                </button>
              </div>

              <button
                onClick={() => handleExplorePromo('Smart TVs')}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <span>Browse Smart TVs</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
