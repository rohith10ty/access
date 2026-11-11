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
      className="relative h-[100dvh] max-h-screen flex flex-col justify-between items-center text-center px-6 sm:px-10 pt-24 pb-6 sm:pb-8 bg-[#080808] select-none overflow-hidden"
    >
      {/* Subtle Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(245,242,235,0.03)_0%,rgba(8,8,8,1)_70%)] pointer-events-none -z-10" />

      {/* Top Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="tracking-[0.25em] text-[10px] uppercase font-semibold text-[#9c978b]"
      >
        ACCESS • 2026 HARDWARE ARCHIVE
      </motion.div>

      {/* Center Headline & Manifesto */}
      <div className="max-w-4xl mx-auto my-auto flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold text-[#f5f2eb] tracking-tight leading-[1.08]"
        >
          Engineered Beyond Tomorrow.
          <br />
          <span className="font-light italic text-[#9c978b]">
            Experienced Today.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-xs sm:text-sm md:text-base text-[#9c978b] max-w-xl leading-relaxed font-light"
        >
          The definitive nexus of computational dominance, acoustic purity, and titanium precision. Hand-curated electronics designed for discerning collectors and professionals worldwide.
        </motion.p>
      </div>

      {/* Bottom Area: Buttons, Micro Indicators & Clearly Visible Bounce Arrow */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex flex-col items-center gap-3.5 z-10"
      >
        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={scrollToCatalog}
            className="px-7 py-3 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-xs uppercase tracking-[0.16em] transition-all flex items-center gap-2.5 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore 2026 Flagships</span>
            <ArrowRight size={13} />
          </button>

          <button
            onClick={scrollToOffers}
            className="px-7 py-3 border border-[#f5f2eb]/30 hover:border-[#f5f2eb] text-[#f5f2eb] hover:bg-[#f5f2eb]/5 font-semibold text-xs uppercase tracking-[0.16em] transition-all"
          >
            <span>Unlock Vault Deals</span>
          </button>
        </div>

        {/* Micro Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#9c978b] font-medium pt-1">
          <span>Priority Air Dispatch</span>
          <span className="opacity-40">•</span>
          <span>2-Year Manufacturer Care</span>
          <span className="opacity-40">•</span>
          <span>100% Verified Authentic</span>
        </div>

        {/* Clean Bounce Scroll Arrow - Always Fully In-View */}
        <button
          onClick={scrollToCatalog}
          className="text-[#9c978b] hover:text-[#f5f2eb] p-1.5 transition-colors cursor-pointer"
          aria-label="Scroll to catalog"
        >
          <ArrowDown size={17} className="animate-bounce" />
        </button>
      </motion.div>

    </section>
  );
}
