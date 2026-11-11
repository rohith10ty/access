import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const {
    totalItems,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setActiveCategory
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id, category = null) => {
    if (category) {
      setActiveCategory(category);
    }
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -70 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-[#f5f2eb]/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          
          {/* Minimalist Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2"
          >
            <span className="font-outfit font-extrabold text-xl tracking-[0.25em] text-[#f5f2eb] uppercase">
              ACCESS
            </span>
          </a>

          {/* Clean Minimal Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo('catalog-section')}
              className="text-xs uppercase tracking-[0.18em] font-medium text-[#9c978b] hover:text-[#f5f2eb] transition-colors"
            >
              Catalog
            </button>
            <button
              onClick={() => scrollTo('categories-section')}
              className="text-xs uppercase tracking-[0.18em] font-medium text-[#9c978b] hover:text-[#f5f2eb] transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => scrollTo('promo-section')}
              className="text-xs uppercase tracking-[0.18em] font-medium text-[#9c978b] hover:text-[#f5f2eb] transition-colors"
            >
              Special Offers
            </button>
            <button
              onClick={() => scrollTo('faq-section')}
              className="text-xs uppercase tracking-[0.18em] font-medium text-[#9c978b] hover:text-[#f5f2eb] transition-colors"
            >
              Support & FAQ
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-[#9c978b] hover:text-[#f5f2eb] transition-colors p-1.5"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.75} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative text-[#9c978b] hover:text-[#f5f2eb] transition-colors p-1.5"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.75} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-1 w-3.5 h-3.5 bg-[#f5f2eb] text-[#080808] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 text-[#9c978b] hover:text-[#f5f2eb] transition-colors p-1.5"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.75} />
              {totalItems > 0 && (
                <span className="w-4 h-4 bg-[#f5f2eb] text-[#080808] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#f5f2eb] p-1.5"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[70px] bg-[#080808]/98 backdrop-blur-2xl z-40 p-8 flex flex-col justify-between md:hidden border-b border-[#f5f2eb]/10"
          >
            <div className="space-y-6">
              <button
                onClick={() => scrollTo('catalog-section')}
                className="block w-full text-left text-lg font-medium text-[#f5f2eb] tracking-wider uppercase py-2 border-b border-[#f5f2eb]/10"
              >
                Catalog
              </button>
              <button
                onClick={() => scrollTo('categories-section')}
                className="block w-full text-left text-lg font-medium text-[#f5f2eb] tracking-wider uppercase py-2 border-b border-[#f5f2eb]/10"
              >
                Categories
              </button>
              <button
                onClick={() => scrollTo('promo-section')}
                className="block w-full text-left text-lg font-medium text-[#f5f2eb] tracking-wider uppercase py-2 border-b border-[#f5f2eb]/10"
              >
                Special Offers
              </button>
              <button
                onClick={() => scrollTo('faq-section')}
                className="block w-full text-left text-lg font-medium text-[#f5f2eb] tracking-wider uppercase py-2 border-b border-[#f5f2eb]/10"
              >
                Support & FAQ
              </button>
            </div>

            <div className="pt-6 text-xs text-[#9c978b] tracking-widest uppercase">
              ACCESS • Modern Electronics
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
