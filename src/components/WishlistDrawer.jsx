import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Star
} from 'lucide-react';

export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    openQuickView
  } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = productsData.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="relative w-full max-w-md bg-[#0f111a] border-l border-white/10 shadow-2xl flex flex-col h-full z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#131622]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400">
                <Heart size={18} className="fill-rose-500/40" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Curated Wishlist</h2>
                <p className="text-xs text-slate-400">
                  {wishlist.length} saved {wishlist.length === 1 ? 'flagship' : 'flagships'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlistedProducts.length > 0 ? (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 flex items-center gap-3.5 transition-colors group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain bg-black/40 rounded-xl p-1.5 border border-white/5 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-white truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-400 mt-0.5">
                      <Star size={11} className="fill-amber-400" />
                      <span className="text-white font-semibold">{product.rating}</span>
                      <span className="text-slate-400">({product.reviewCount})</span>
                    </div>
                    <div className="text-xs font-extrabold text-cyan-400 font-mono mt-1">
                      ${product.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => {
                        addToCart(product);
                        toggleWishlist(product);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md shadow-cyan-500/20"
                      title="Move to Cart"
                    >
                      <ShoppingBag size={12} />
                      <span>Move</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="text-slate-400 hover:text-rose-400 text-[11px] text-center"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-4">
                  <Heart size={24} />
                </div>
                <p className="text-sm font-semibold text-white">No items in your wishlist</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Tap the heart icon on any product in our catalog to save it for later comparison.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
