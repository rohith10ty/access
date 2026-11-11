import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import {
  Clock,
  Tag,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';

export default function PromoBanners() {
  const { applyCoupon, setActiveCategory } = useCart();
  const [copiedCode, setCopiedCode] = useState('');

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
        window.lenis.scrollTo(element, { offset: -70 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="promo-section" className="py-24 border-t border-[#f5f2eb]/10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#9c978b]">
              ARCHIVE PROMOTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f5f2eb] tracking-tight mt-2">
              Curated Releases & Vault Codes
            </h2>
            <p className="text-sm text-[#9c978b] mt-2 max-w-xl font-light">
              Limited inventory tiers allocated for verified members. Claim immediate savings across flagship mobile, computing, and acoustic systems.
            </p>
          </div>

          {/* Flash Clock in Cream & Black */}
          <div className="flex items-center gap-3 py-2 px-4 border border-[#f5f2eb]/15 bg-[#101010] shrink-0">
            <Clock size={15} className="text-[#f5f2eb]" />
            <div className="text-xs text-[#9c978b] uppercase tracking-wider">
              Allocation Closes:
            </div>
            <div className="flex items-center gap-1 font-mono font-bold text-xs text-[#f5f2eb]">
              <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* 2 Clean Architectural Cards in Cream & Black */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <div className="border border-[#f5f2eb]/15 bg-[#101010] p-8 sm:p-10 flex flex-col justify-between group hover:border-[#f5f2eb]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs tracking-widest uppercase font-semibold text-[#9c978b]">
                <span>FLAGSHIP PASS</span>
                <span className="text-[#f5f2eb] font-mono">-15% DISCOUNT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#f5f2eb] mt-4 leading-tight">
                Titanium Mobile & Studio Audio
              </h3>
              <p className="text-sm text-[#9c978b] mt-3 font-light leading-relaxed">
                Apply voucher <strong className="text-[#f5f2eb] font-mono">ACCESS2026</strong> for an instant 15% reduction across all iPhone 16 Pro Max, Pixel 9 Pro XL, and Sony WH-1000XM5 orders.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#f5f2eb]/10 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => handleCopy('ACCESS2026')}
                className="px-5 py-2.5 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                {copiedCode === 'ACCESS2026' ? (
                  <>
                    <Check size={14} />
                    <span>Applied to Vault</span>
                  </>
                ) : (
                  <>
                    <Tag size={14} />
                    <span>Apply Code ACCESS2026</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleExplorePromo('Mobiles')}
                className="text-xs font-semibold text-[#f5f2eb] hover:text-white flex items-center gap-1.5 uppercase tracking-wider"
              >
                <span>Browse Eligible Gear</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-[#f5f2eb]/15 bg-[#101010] p-8 sm:p-10 flex flex-col justify-between group hover:border-[#f5f2eb]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs tracking-widest uppercase font-semibold text-[#9c978b]">
                <span>CINEMA PURIST</span>
                <span className="text-[#f5f2eb] font-mono">-10% DISCOUNT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#f5f2eb] mt-4 leading-tight">
                OLED evo & 8K Cinema Displays
              </h3>
              <p className="text-sm text-[#9c978b] mt-3 font-light leading-relaxed">
                Apply voucher <strong className="text-[#f5f2eb] font-mono">PRODIGY10</strong> for a 10% credit across all LG OLED G4 and Samsung Neo QLED 8K flagship displays with free wall mounting.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#f5f2eb]/10 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => handleCopy('PRODIGY10')}
                className="px-5 py-2.5 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                {copiedCode === 'PRODIGY10' ? (
                  <>
                    <Check size={14} />
                    <span>Applied to Vault</span>
                  </>
                ) : (
                  <>
                    <Tag size={14} />
                    <span>Apply Code PRODIGY10</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleExplorePromo('Smart TVs')}
                className="text-xs font-semibold text-[#f5f2eb] hover:text-white flex items-center gap-1.5 uppercase tracking-wider"
              >
                <span>Browse Displays</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
