import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import ProductCard from './ProductCard';
import {
  Search,
  ArrowUpDown,
  X,
  Check,
  RefreshCw
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

  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        if (activeCategory !== 'All' && product.category !== activeCategory) {
          return false;
        }

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

        if (product.price > priceRange[1]) {
          return false;
        }

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
    <section id="catalog-section" className="py-24 border-t border-[#f5f2eb]/10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#9c978b]">
              HARDWARE VAULT
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f5f2eb] tracking-tight mt-2">
              Full Product Archive
            </h2>
            <p className="text-sm text-[#9c978b] mt-2 max-w-xl font-light">
              28 certified flagships engineered in titanium, carbon fiber, and unthrottled silicon.
            </p>
          </div>

          <div className="text-xs text-[#9c978b] font-mono shrink-0">
            SHOWING <span className="text-[#f5f2eb] font-bold">{filteredProducts.length}</span> OF {productsData.length} MODELS
          </div>
        </div>

        {/* Clean Filter Controls Bar in Cream & Black */}
        <div className="border border-[#f5f2eb]/15 bg-[#101010] p-6 mb-10">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9c978b]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, silicon, or specifications..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#080808] border border-[#f5f2eb]/15 focus:border-[#f5f2eb] focus:outline-none text-[#f5f2eb] text-xs placeholder:text-[#636058] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9c978b] hover:text-[#f5f2eb]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* In-Stock & Sorting */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`flex items-center gap-2 px-4 py-2.5 border text-xs font-semibold transition-all ${
                  inStockOnly
                    ? 'bg-[#f5f2eb] text-[#080808] border-[#f5f2eb]'
                    : 'bg-[#080808] border-[#f5f2eb]/15 text-[#9c978b] hover:text-[#f5f2eb]'
                }`}
              >
                <div
                  className={`w-3 h-3 flex items-center justify-center border ${
                    inStockOnly ? 'border-[#080808]' : 'border-[#636058]'
                  }`}
                >
                  {inStockOnly && <Check size={10} strokeWidth={3} />}
                </div>
                <span>In Stock Only</span>
              </button>

              <div className="flex items-center bg-[#080808] border border-[#f5f2eb]/15 px-3 py-1">
                <ArrowUpDown size={13} className="text-[#9c978b] mr-2 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-[#f5f2eb] text-xs font-semibold focus:outline-none cursor-pointer py-1.5"
                >
                  <option value="featured" className="bg-[#101010] text-[#f5f2eb]">
                    Featured First
                  </option>
                  <option value="price-low" className="bg-[#101010] text-[#f5f2eb]">
                    Price: Low to High
                  </option>
                  <option value="price-high" className="bg-[#101010] text-[#f5f2eb]">
                    Price: High to Low
                  </option>
                  <option value="rating" className="bg-[#101010] text-[#f5f2eb]">
                    Highest Rating
                  </option>
                  <option value="discount" className="bg-[#101010] text-[#f5f2eb]">
                    Biggest Markdown
                  </option>
                </select>
              </div>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="mt-6 pt-4 border-t border-[#f5f2eb]/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#f5f2eb] text-[#080808]'
                      : 'bg-[#080808] text-[#9c978b] hover:text-[#f5f2eb] border border-[#f5f2eb]/10'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Price Range Slider */}
          <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-4 text-xs text-[#9c978b]">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#f5f2eb]">Price Limit:</span>
              <input
                type="range"
                min="90"
                max="4000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-32 sm:w-48 accent-[#f5f2eb] cursor-pointer"
              />
              <span className="font-mono font-bold text-[#f5f2eb]">
                ${priceRange[1].toLocaleString()}
              </span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="flex items-center gap-1.5 text-[#f5f2eb] hover:underline text-xs"
              >
                <RefreshCw size={11} />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

        </div>

        {/* Product Cards Grid */}
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
          <div className="py-20 text-center border border-[#f5f2eb]/15 bg-[#101010] p-8 max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-[#f5f2eb]">No products found</h3>
            <p className="text-xs text-[#9c978b] mt-2 font-light">
              Try adjusting your price ceiling or selecting "All" categories.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-5 px-6 py-2.5 bg-[#f5f2eb] text-[#080808] font-bold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
