import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import ProductCard from './ProductCard';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Filter,
  Check,
  RefreshCw,
  Sparkles
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Mobiles',
  'Laptops',
  'Headphones',
  'Smart TVs',
  'Cameras',
  'Smartwatches',
  'Accessories'
];

export default function ProductListings() {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly
  } = useCart();

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        // Category Filter
        if (activeCategory !== 'All' && product.category !== activeCategory) {
          return false;
        }

        // Search Query Filter
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchBrand = product.brand.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchTag = product.tagLine.toLowerCase().includes(query);
          const matchCategory = product.category.toLowerCase().includes(query);
          if (!matchName && !matchBrand && !matchDesc && !matchTag && !matchCategory) {
            return false;
          }
        }

        // Price Filter
        if (product.price > priceRange[1]) {
          return false;
        }

        // In Stock Filter
        if (inStockOnly && !product.inStock) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.price - b.price;
        }
        if (sortBy === 'price-high') {
          return b.price - a.price;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'discount') {
          return b.discountPercentage - a.discountPercentage;
        }
        // Default: featured
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [activeCategory, searchQuery, sortBy, priceRange, inStockOnly]);

  const resetAllFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange([0, 4000]);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    activeCategory !== 'All' ||
    searchQuery !== '' ||
    sortBy !== 'featured' ||
    priceRange[1] < 4000 ||
    inStockOnly;

  return (
    <section id="catalog-section" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold mb-3">
            <Sparkles size={13} className="text-cyan-400" />
            <span>CERTIFIED INVENTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Curated Hardware Catalog
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Precision engineering from Apple, Sony, Samsung, Leica, ASUS, and Anker. Zero grey market imports.
          </p>
        </div>

        {/* ==============================================================
            SEARCH & FILTER CONTROL BAR
        ============================================================== */}
        <div className="p-4 sm:p-6 rounded-3xl bg-[#12141e]/90 border border-white/10 backdrop-blur-xl shadow-2xl mb-10">
          
          {/* Top Bar: Search Input, In-Stock Toggle, Sort Selector */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Live Search Bar */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by model, brand, processor, or specs..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Quick Controls: Stock & Sorting */}
            <div className="flex items-center gap-3">
              
              {/* In-stock Toggle */}
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-semibold transition-all ${
                  inStockOnly
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                    inStockOnly
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'border-slate-500'
                  }`}
                >
                  {inStockOnly && <Check size={11} strokeWidth={3} />}
                </div>
                <span>In Stock Only</span>
              </button>

              {/* Sort Dropdown */}
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5">
                <ArrowUpDown size={14} className="text-cyan-400 mr-2 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer py-1.5"
                >
                  <option value="featured" className="bg-[#12141e] text-white">
                    Sort: Featured First
                  </option>
                  <option value="price-low" className="bg-[#12141e] text-white">
                    Price: Low to High
                  </option>
                  <option value="price-high" className="bg-[#12141e] text-white">
                    Price: High to Low
                  </option>
                  <option value="rating" className="bg-[#12141e] text-white">
                    Highest Customer Rating
                  </option>
                  <option value="discount" className="bg-[#12141e] text-white">
                    Biggest Markdown
                  </option>
                </select>
              </div>

            </div>

          </div>

          {/* Category Tabs Pill Row */}
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Price Range Slider & Filter Summary */}
          <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-300">Max Budget:</span>
              <input
                type="range"
                min="90"
                max="4000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-32 sm:w-48 accent-cyan-400 cursor-pointer"
              />
              <span className="font-mono font-bold text-cyan-300">
                ${priceRange[1].toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span>
                Displaying{' '}
                <strong className="text-white font-mono">{filteredProducts.length}</strong>{' '}
                of {productsData.length} models
              </span>

              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  <RefreshCw size={12} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* ==============================================================
            PRODUCT CARDS GRID
        ============================================================== */}
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-24 text-center rounded-3xl bg-white/[0.02] border border-white/5 p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400 mb-4">
              <Search size={28} />
            </div>
            <h3 className="text-xl font-bold text-white">No hardware matched your criteria</h3>
            <p className="text-sm text-slate-400 mt-2">
              Try adjusting your price ceiling, removing the search filter, or selecting "All" categories.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-6 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
