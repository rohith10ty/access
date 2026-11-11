import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import {
  X,
  Heart,
  ShoppingBag
} from 'lucide-react';

export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart
  } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = productsData.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="relative w-full max-w-md bg-[#0a0a0a] border-l border-[#f5f2eb]/15 shadow-2xl flex flex-col h-full z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#f5f2eb]/10 bg-[#0e0e0e]">
            <div className="flex items-center gap-3">
              <Heart size={18} className="text-[#f5f2eb]" />
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#f5f2eb]">
                  Curated Wishlist
                </h2>
                <p className="text-xs text-[#9c978b]">
                  {wishlist.length} saved models
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="text-[#9c978b] hover:text-[#f5f2eb] p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length > 0 ? (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border border-[#f5f2eb]/10 bg-[#121212] flex items-center gap-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-contain bg-[#080808] p-1 border border-[#f5f2eb]/10 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-[#f5f2eb] truncate">
                      {product.name}
                    </h3>
                    <div className="text-xs font-mono font-bold text-[#f5f2eb] mt-1">
                      ${product.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => {
                        addToCart(product);
                        toggleWishlist(product);
                      }}
                      className="px-3 py-1 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-[10px] uppercase flex items-center gap-1"
                    >
                      <ShoppingBag size={11} />
                      <span>Move</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="text-[10px] text-[#636058] hover:text-[#f5f2eb] uppercase tracking-wider"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-24 text-center">
                <Heart size={24} className="mx-auto text-[#636058] mb-3" />
                <p className="text-xs font-bold text-[#f5f2eb] uppercase tracking-wider">
                  Wishlist is empty
                </p>
                <p className="text-xs text-[#9c978b] mt-1 font-light">
                  Click the heart icon on any product to save it.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
