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
  const [activeTab, setActiveTab] = useState('specs');
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/85 backdrop-blur-md -z-10"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-[#0c0c0c] border border-[#f5f2eb]/20 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#f5f2eb]/10 bg-[#101010]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#f5f2eb] uppercase tracking-widest px-2 py-0.5 border border-[#f5f2eb]/20">
                {quickViewProduct.category}
              </span>
              <span className="text-xs text-[#9c978b] font-mono">
                {quickViewProduct.id.toUpperCase()}
              </span>
            </div>

            <button
              onClick={closeQuickView}
              className="text-[#9c978b] hover:text-[#f5f2eb] p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Visuals */}
            <div className="flex flex-col gap-4">
              <div className="w-full h-72 sm:h-88 bg-[#080808] border border-[#f5f2eb]/10 flex items-center justify-center p-6">
                <img
                  src={activeImage}
                  alt={quickViewProduct.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {imagesList.length > 1 && (
                <div className="flex items-center gap-2">
                  {imagesList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 bg-[#080808] border p-1 transition-all ${
                        activeImage === img
                          ? 'border-[#f5f2eb]'
                          : 'border-[#f5f2eb]/15 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] uppercase tracking-wider text-[#9c978b]">
                <div className="p-2 border border-[#f5f2eb]/10 bg-[#101010]">
                  Official Warranty
                </div>
                <div className="p-2 border border-[#f5f2eb]/10 bg-[#101010]">
                  Priority Air Post
                </div>
                <div className="p-2 border border-[#f5f2eb]/10 bg-[#101010]">
                  30-Day Returns
                </div>
              </div>
            </div>

            {/* Content & Specs */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#9c978b] font-semibold">
                  {quickViewProduct.brand} • CERTIFIED
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f5f2eb] mt-1">
                  {quickViewProduct.name}
                </h2>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-[#f5f2eb] font-mono">
                    ${quickViewProduct.price.toLocaleString()}
                  </span>
                  {quickViewProduct.originalPrice > quickViewProduct.price && (
                    <span className="text-sm text-[#636058] line-through font-mono">
                      ${quickViewProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#9c978b] mt-4 leading-relaxed font-light">
                  {quickViewProduct.description}
                </p>

                {/* Color Selector */}
                {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                  <div className="mt-5">
                    <div className="text-xs font-semibold text-[#f5f2eb] mb-2">
                      Finish: <span className="text-[#9c978b]">{selectedColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {quickViewProduct.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          style={{ backgroundColor: c.hex }}
                          className={`w-6 h-6 rounded-full border transition-all ${
                            selectedColor === c.name
                              ? 'border-[#f5f2eb] ring-2 ring-[#f5f2eb]/40 scale-110'
                              : 'border-[#f5f2eb]/20 opacity-70 hover:opacity-100'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Specs Tabs */}
                <div className="mt-6">
                  <div className="flex items-center border-b border-[#f5f2eb]/10 gap-6 text-xs font-semibold uppercase tracking-wider">
                    <button
                      onClick={() => setActiveTab('specs')}
                      className={`pb-2 transition-colors relative ${
                        activeTab === 'specs' ? 'text-[#f5f2eb]' : 'text-[#636058] hover:text-[#f5f2eb]'
                      }`}
                    >
                      Specifications
                      {activeTab === 'specs' && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f5f2eb]" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('features')}
                      className={`pb-2 transition-colors relative ${
                        activeTab === 'features' ? 'text-[#f5f2eb]' : 'text-[#636058] hover:text-[#f5f2eb]'
                      }`}
                    >
                      Capabilities
                      {activeTab === 'features' && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f5f2eb]" />
                      )}
                    </button>
                  </div>

                  <div className="pt-4">
                    {activeTab === 'specs' && quickViewProduct.specs && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                          <div key={key} className="p-2.5 bg-[#080808] border border-[#f5f2eb]/10">
                            <span className="text-[9px] uppercase tracking-wider text-[#636058] font-bold block">
                              {key}
                            </span>
                            <span className="text-[#f5f2eb] font-medium truncate block mt-0.5">
                              {val}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'features' && quickViewProduct.features && (
                      <ul className="space-y-2 text-xs text-[#9c978b]">
                        {quickViewProduct.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check size={13} className="text-[#f5f2eb] mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#f5f2eb]/10 flex items-center gap-3">
                <div className="flex items-center border border-[#f5f2eb]/20 bg-[#080808] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-[#9c978b] hover:text-[#f5f2eb]"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-[#f5f2eb]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-[#9c978b] hover:text-[#f5f2eb]"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  <span>Add to Vault • ${(quickViewProduct.price * quantity).toLocaleString()}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`p-3 border transition-colors ${
                    wishlisted
                      ? 'border-[#f5f2eb] text-[#f5f2eb]'
                      : 'border-[#f5f2eb]/20 text-[#636058] hover:text-[#f5f2eb]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={15} className={wishlisted ? 'fill-[#f5f2eb]' : ''} />
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
