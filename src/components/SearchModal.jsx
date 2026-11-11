import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import {
  Search,
  X,
  ArrowRight,
  Star,
  ExternalLink,
  ShoppingBag,
  Sparkles
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

  // Keyboard shortcut listener for ⌘K / Ctrl+K and ESC
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
        window.lenis.scrollTo(element, { offset: -80 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md -z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-[#11131c] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3">
            <Search size={20} className="text-cyan-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search by model, department, silicon, or specs..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none"
            />
            {term && (
              <button
                onClick={() => setTerm('')}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] text-slate-400 bg-white/5 border border-white/10 rounded">
              ESC
            </kbd>
          </div>

          {/* Quick Categories Bar */}
          <div className="px-5 py-2.5 bg-white/[0.02] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-400 scrollbar-none">
            <span className="font-semibold text-slate-500 shrink-0">Jump to:</span>
            {['Mobiles', 'Laptops', 'Headphones', 'Smart TVs', 'Cameras', 'Smartwatches'].map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryShortcut(c)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors shrink-0"
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search Results / Suggestions */}
          <div className="p-4 max-h-96 overflow-y-auto space-y-2">
            {term.trim() === '' ? (
              <div className="p-6 text-center text-xs text-slate-400">
                <p className="font-semibold text-slate-300">Popular Searches Today</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {['iPhone 16 Pro Max', 'M4 Max', 'Sony WH-1000XM5', 'LG G4 OLED', 'Garmin Epix Pro', 'Anker 250W'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setTerm(s)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
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
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-contain bg-black/40 rounded-xl p-1 border border-white/5"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {product.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {product.tagLine}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      ${product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
                      title="Add to Vault"
                    >
                      <ShoppingBag size={13} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                No electronics found matching "{term}". Try searching for Apple, Sony, or OLED.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
