import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Package,
  Layers,
  Cpu,
  Check,
  Plus,
  Minus
} from 'lucide-react';

export default function ProductDetailsModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isWishlisted
  } = useCart();

  const [activeImage, setActiveImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'features' | 'inbox'
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImage(quickViewProduct.image);
      setSelectedColor(
        quickViewProduct.colors && quickViewProduct.colors[0]
          ? quickViewProduct.colors[0].name
          : ''
      );
      setQuantity(1);
      setActiveTab('specs');
    }
  }, [quickViewProduct]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeQuickView();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeQuickView]);

  if (!quickViewProduct) return null;

  const wishlisted = isWishlisted(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity, selectedColor);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1500);
  };

  const imagesList = quickViewProduct.gallery && quickViewProduct.gallery.length > 0
    ? quickViewProduct.gallery
    : [quickViewProduct.image];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl -z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#11131c] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header Close Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141724]/80">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                {quickViewProduct.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Model: {quickViewProduct.id.toUpperCase()}
              </span>
            </div>

            <button
              onClick={closeQuickView}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body: Two Columns */}
          <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Visual Gallery Stage */}
            <div className="flex flex-col gap-4">
              {/* Main Preview */}
              <div className="relative w-full h-72 sm:h-88 rounded-2xl bg-[#090a10] border border-white/5 flex items-center justify-center p-6 overflow-hidden">
                <img
                  src={activeImage}
                  alt={quickViewProduct.name}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-all duration-300"
                />

                {quickViewProduct.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                    {quickViewProduct.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails row */}
              {imagesList.length > 1 && (
                <div className="flex items-center gap-2.5">
                  {imagesList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 rounded-xl bg-[#090a10] border p-1 overflow-hidden transition-all ${
                        activeImage === img
                          ? 'border-cyan-400 ring-2 ring-cyan-400/30 scale-105'
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="thumb"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Value Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <ShieldCheck size={16} className="text-cyan-400 mx-auto mb-1" />
                  <span className="text-[10px] font-medium text-slate-300 block">
                    Official Warranty
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <Truck size={16} className="text-indigo-400 mx-auto mb-1" />
                  <span className="text-[10px] font-medium text-slate-300 block">
                    Express Air Post
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <RotateCcw size={16} className="text-emerald-400 mx-auto mb-1" />
                  <span className="text-[10px] font-medium text-slate-300 block">
                    30-Day Returns
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Deep Specifications & Ordering */}
            <div className="flex flex-col justify-between space-y-6">
              
              <div>
                {/* Brand & Name */}
                <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                  {quickViewProduct.brand} Certified
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {quickViewProduct.name}
                </h2>

                {/* Rating & Stock */}
                <div className="flex items-center gap-3 mt-2.5">
                  <div className="flex items-center text-amber-400">
                    <Star size={14} className="fill-amber-400" />
                    <span className="ml-1 text-xs font-bold text-white">
                      {quickViewProduct.rating}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    ({quickViewProduct.reviewCount} verified reviews)
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {quickViewProduct.stockCount} Units Left
                  </span>
                </div>

                {/* Pricing Block */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white font-mono">
                    ${quickViewProduct.price.toLocaleString()}
                  </span>
                  {quickViewProduct.originalPrice > quickViewProduct.price && (
                    <>
                      <span className="text-sm text-slate-500 line-through font-mono">
                        ${quickViewProduct.originalPrice.toLocaleString()}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-bold">
                        Save ${quickViewProduct.originalPrice - quickViewProduct.price} (-{quickViewProduct.discountPercentage}%)
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Color Selector */}
                {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                  <div className="mt-5">
                    <div className="text-xs font-semibold text-slate-300 mb-2">
                      Finish Color: <span className="text-cyan-400 font-bold">{selectedColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {quickViewProduct.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          style={{ backgroundColor: c.hex }}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${
                            selectedColor === c.name
                              ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-110'
                              : 'border-white/20 opacity-80 hover:opacity-100'
                          }`}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Navigation: Specs | Features | In the Box */}
                <div className="mt-6">
                  <div className="flex items-center border-b border-white/10 gap-4 text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab('specs')}
                      className={`pb-2 transition-colors relative ${
                        activeTab === 'specs'
                          ? 'text-cyan-400'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Specifications
                      {activeTab === 'specs' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('features')}
                      className={`pb-2 transition-colors relative ${
                        activeTab === 'features'
                          ? 'text-cyan-400'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Key Capabilities
                      {activeTab === 'features' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('inbox')}
                      className={`pb-2 transition-colors relative ${
                        activeTab === 'inbox'
                          ? 'text-cyan-400'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Included Gear
                      {activeTab === 'inbox' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                      )}
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="pt-3">
                    {activeTab === 'specs' && quickViewProduct.specs && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                          <div
                            key={key}
                            className="p-2 rounded-lg bg-white/[0.02] border border-white/5"
                          >
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">
                              {key}
                            </span>
                            <span className="text-white font-medium truncate block">
                              {val}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'features' && quickViewProduct.features && (
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {quickViewProduct.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeTab === 'inbox' && (
                      <div className="text-xs text-slate-300 space-y-2">
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <span className="text-slate-400 font-semibold block text-[11px] mb-1">
                            Package Contents:
                          </span>
                          <p>{quickViewProduct.inBox || 'Hardware unit, Power adapter, Quick guide'}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <span className="text-slate-400 font-semibold block text-[11px] mb-1">
                            Factory Warranty:
                          </span>
                          <p className="text-emerald-400 font-medium">{quickViewProduct.warranty}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Add To Cart CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 text-xs font-bold text-white font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
                    addedSuccess
                      ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/25'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check size={16} />
                      <span>Added to Vault!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Add to Vault • ${(quickViewProduct.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Toggle Button */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`p-3 rounded-xl border transition-colors ${
                    wishlisted
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart size={16} className={wishlisted ? 'fill-rose-500' : ''} />
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
