import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import {
  Search,
  X,
  ShoppingBag
} from 'lucide-react';

export default function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    openQuickView,
    addToCart,
    setActiveCategory
  } = useCart();

  const [term, setTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = productsData.filter((p) => {
    if (!term.trim()) return false;
    const query = term.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.tagLine.toLowerCase().includes(query)
    );
  }).slice(0, 6);

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    openQuickView(product);
  };

  const handleCategoryShortcut = (cat) => {
    setActiveCategory(cat);
    setIsSearchOpen(false);
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm -z-10"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-[#0e0e0e] border border-[#f5f2eb]/20 shadow-2xl overflow-hidden"
        >
          {/* Bar */}
          <div className="p-4 sm:p-5 border-b border-[#f5f2eb]/10 flex items-center gap-3 bg-[#121212]">
            <Search size={18} className="text-[#f5f2eb] shrink-0" />
            <input
              type="text"
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search by model, brand, or specifications..."
              className="w-full bg-transparent text-sm text-[#f5f2eb] placeholder:text-[#636058] focus:outline-none"
            />
            {term && (
              <button onClick={() => setTerm('')} className="text-[#9c978b] hover:text-[#f5f2eb]">
                <X size={15} />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[9px] text-[#636058] border border-[#f5f2eb]/15">
              ESC
            </kbd>
          </div>

          {/* Quick Categories */}
          <div className="px-5 py-2.5 bg-[#080808] border-b border-[#f5f2eb]/10 flex items-center gap-2 overflow-x-auto text-[11px] text-[#9c978b] scrollbar-none">
            <span className="font-semibold text-[#636058] shrink-0 uppercase tracking-wider">Department:</span>
            {['Mobiles', 'Laptops', 'Headphones', 'Smart TVs', 'Cameras', 'Smartwatches'].map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryShortcut(c)}
                className="px-2.5 py-0.5 border border-[#f5f2eb]/10 hover:border-[#f5f2eb]/40 text-[#9c978b] hover:text-[#f5f2eb] transition-colors shrink-0"
              >
                {c}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="p-4 max-h-96 overflow-y-auto space-y-2">
            {term.trim() === '' ? (
              <div className="p-8 text-center text-xs text-[#9c978b]">
                <p className="font-semibold text-[#f5f2eb] uppercase tracking-wider">Suggested Searches</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {['iPhone 16 Pro Max', 'M4 Max', 'Sony WH-1000XM5', 'LG G4 OLED', 'Garmin Epix Pro'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setTerm(s)}
                      className="px-3 py-1 bg-[#141414] border border-[#f5f2eb]/10 hover:border-[#f5f2eb]/30 text-[#f5f2eb] text-xs transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="flex items-center justify-between p-3 border border-[#f5f2eb]/10 hover:border-[#f5f2eb]/30 bg-[#121212] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-contain bg-[#080808] p-1 border border-[#f5f2eb]/10"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#f5f2eb]">
                        {product.name}
                      </div>
                      <p className="text-[10px] text-[#9c978b] line-clamp-1 mt-0.5">
                        {product.tagLine}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#f5f2eb]">
                      ${product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="p-1.5 bg-[#f5f2eb] text-[#080808] hover:bg-white"
                      title="Add to Vault"
                    >
                      <ShoppingBag size={13} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#9c978b]">
                No hardware found matching "{term}".
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
