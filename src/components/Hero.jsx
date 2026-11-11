import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Hero() {
  const { setActiveCategory } = useCart();

  const scrollToCatalog = () => {
    setActiveCategory('All');
    const element = document.getElementById('catalog-section');
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -70 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToOffers = () => {
    const element = document.getElementById('promo-section');
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -70 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[100vh] flex flex-col justify-between items-center text-center px-6 sm:px-10 pt-32 pb-12 bg-[#080808] select-none"
    >
      {/* Subtle Ambient Vignette (Cream on Black) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(245,242,235,0.04)_0%,rgba(8,8,8,1)_70%)] pointer-events-none -z-10" />

      {/* Top Spacer / Subtle Category Label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="tracking-[0.3em] text-[10px] uppercase font-semibold text-[#9c978b]"
      >
        ACCESS • 2026 HARDWARE ARCHIVE
      </motion.div>

      {/* Centerpiece: Monumental Centered Headline & Manifesto */}
      <div className="max-w-4xl mx-auto my-auto flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#f5f2eb] tracking-tight leading-[1.05]"
        >
          Engineered Beyond Tomorrow.
          <br />
          <span className="font-light italic text-[#9c978b]">
            Experienced Today.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-[#9c978b] max-w-2xl leading-relaxed font-light"
        >
          The definitive nexus of computational dominance, acoustic purity, and titanium precision. Hand-curated electronics designed for discerning collectors and professionals worldwide.
        </motion.p>
      </div>

      {/* Bottom Area: Centered Action Buttons & Micro Indicator (Prominently Above Viewport Fold) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-full flex flex-col items-center gap-6 z-10"
      >
        {/* The 2 Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToCatalog}
            className="px-8 py-3.5 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore 2026 Flagships</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={scrollToOffers}
            className="px-8 py-3.5 border border-[#f5f2eb]/30 hover:border-[#f5f2eb] text-[#f5f2eb] hover:bg-[#f5f2eb]/5 font-semibold text-xs uppercase tracking-[0.16em] transition-all duration-300"
          >
            <span>Unlock Vault Deals</span>
          </button>
        </div>

        {/* Minimalist Micro Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] tracking-[0.2em] uppercase text-[#9c978b] font-medium pt-2">
          <span>Priority Air Dispatch</span>
          <span className="opacity-40">•</span>
          <span>2-Year Manufacturer Care</span>
          <span className="opacity-40">•</span>
          <span>100% Verified Authentic</span>
        </div>

        {/* Gentle Scroll Indicator */}
        <button
          onClick={scrollToCatalog}
          className="text-[#9c978b] hover:text-[#f5f2eb] transition-colors p-1 -mb-2"
          aria-label="Scroll to catalog"
        >
          <ArrowDown size={16} className="animate-bounce" />
        </button>
      </motion.div>

    </section>
  );
}
