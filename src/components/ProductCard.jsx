import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import {
  Heart,
  Eye,
  ShoppingBag,
  Star,
  Check
} from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useCart();
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors[0] ? product.colors[0].name : null
  );
  const [addedAnim, setAddedAnim] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1, selectedColor);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1400);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={() => openQuickView(product)}
      className="group relative flex flex-col justify-between border border-[#f5f2eb]/15 hover:border-[#f5f2eb]/40 bg-[#101010] p-6 transition-all duration-300 cursor-pointer"
    >
      {/* Top Bar: Badge & Wishlist */}
      <div className="flex items-center justify-between mb-4 z-10">
        <div className="flex items-center gap-2">
          {product.badge && (
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#f5f2eb] px-2 py-0.5 border border-[#f5f2eb]/20 bg-[#080808]">
              {product.badge}
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="text-[10px] font-mono font-bold text-[#9c978b]">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        <button
          onClick={handleWishlist}
          className={`p-1.5 transition-colors ${
            wishlisted ? 'text-[#f5f2eb]' : 'text-[#636058] hover:text-[#f5f2eb]'
          }`}
          aria-label="Wishlist"
        >
          <Heart size={16} className={wishlisted ? 'fill-[#f5f2eb]' : ''} />
        </button>
      </div>

      {/* Product Image Stage */}
      <div className="relative w-full h-52 sm:h-60 flex items-center justify-center p-4 bg-[#080808] mb-5 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-44 sm:max-h-52 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Inspect Pill */}
        <div className="absolute inset-x-4 bottom-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-3 py-1 bg-[#080808] border border-[#f5f2eb]/30 text-[#f5f2eb] text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1.5 shadow-xl">
            <Eye size={12} />
            <span>Specifications</span>
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#9c978b] mb-1">
            <span>{product.brand}</span>
            <span>{product.category}</span>
          </div>

          <h3 className="text-base font-bold text-[#f5f2eb] group-hover:text-white transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#9c978b] mt-1 line-clamp-1 font-light">
            {product.tagLine}
          </p>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  title={c.name}
                  style={{ backgroundColor: c.hex }}
                  className={`w-3 h-3 rounded-full border transition-all ${
                    selectedColor === c.name
                      ? 'border-[#f5f2eb] ring-1 ring-[#f5f2eb] scale-110'
                      : 'border-[#f5f2eb]/20 opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
              <span className="text-[10px] text-[#9c978b] ml-1">
                {selectedColor || product.colors[0].name}
              </span>
            </div>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-5 pt-4 border-t border-[#f5f2eb]/10 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-bold text-[#f5f2eb] font-mono tracking-tight">
              ${product.price.toLocaleString()}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-[11px] text-[#636058] line-through font-mono">
                ${product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all ${
              addedAnim
                ? 'bg-[#ffffff] text-[#080808]'
                : 'bg-[#f5f2eb] hover:bg-white text-[#080808]'
            }`}
          >
            {addedAnim ? (
              <>
                <Check size={13} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
