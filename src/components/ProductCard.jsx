import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import {
  Heart,
  Eye,
  ShoppingBag,
  Star,
  Check,
  Zap
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

  const handleQuickView = (e) => {
    e.stopPropagation();
    openQuickView(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      onClick={() => openQuickView(product)}
      className="group relative flex flex-col justify-between rounded-3xl bg-gradient-to-b from-[#131520] via-[#0f1018] to-[#0a0b10] border border-white/10 hover:border-cyan-500/40 p-4 sm:p-5 transition-all duration-300 shadow-xl hover:shadow-[0_20px_45px_rgba(56,189,248,0.12)] cursor-pointer"
    >
      {/* Top Floating Badges */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {product.badge}
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`p-2 rounded-full border transition-all ${
            wishlisted
              ? 'bg-rose-500/20 border-rose-500 text-rose-400'
              : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:border-white/30'
          }`}
          title="Save to Wishlist"
          aria-label="Wishlist"
        >
          <Heart size={15} className={wishlisted ? 'fill-rose-500' : ''} />
        </button>
      </div>

      {/* Product Image Stage */}
      <div className="relative w-full h-52 sm:h-60 flex items-center justify-center p-3 rounded-2xl bg-[#0b0c13]/60 overflow-hidden mb-4 group-hover:bg-[#0b0c13]/40 transition-colors">
        
        {/* Subtle Ambient Radial Backlight on Hover */}
        <div className="absolute inset-0 bg-radial-vignette opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-44 sm:max-h-52 w-auto object-contain transition-transform duration-500 group-hover:scale-108 drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]"
        />

        {/* Quick View Hover Pill */}
        <div className="absolute inset-x-4 bottom-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium flex items-center gap-1.5 shadow-lg">
            <Eye size={13} className="text-cyan-400" />
            <span>Deep Specifications</span>
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        
        <div>
          {/* Department & Brand */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-1">
            <span>{product.brand}</span>
            <span className="text-[10px] text-slate-400 font-mono uppercase">
              {product.category}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline / Micro description */}
          <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-light">
            {product.tagLine}
          </p>

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  title={c.name}
                  style={{ backgroundColor: c.hex }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor === c.name
                      ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-[#0f1018] scale-110'
                      : 'border-white/20 opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
              <span className="text-[10px] text-slate-400 ml-1">
                {selectedColor || product.colors[0].name}
              </span>
            </div>
          )}
        </div>

        {/* Rating, Price & Add To Cart Button */}
        <div className="mt-4 pt-3.5 border-t border-white/5">
          
          <div className="flex items-center justify-between mb-3">
            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-400">
                <Star size={13} className="fill-amber-400" />
                <span className="ml-1 text-xs font-bold text-white">
                  {product.rating}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                ({product.reviewCount})
              </span>
            </div>

            {/* In Stock Indicator */}
            <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>In Stock</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            {/* Price Stack */}
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-white font-mono tracking-tight">
                ${product.price.toLocaleString()}
              </div>
              {product.originalPrice > product.price && (
                <div className="text-[11px] text-slate-500 line-through">
                  ${product.originalPrice.toLocaleString()}
                </div>
              )}
            </div>

            {/* Quick Add To Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-md ${
                addedAnim
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-white/10 hover:bg-cyan-500 hover:text-slate-950 text-white'
              }`}
              title="Add to Vault"
            >
              {addedAnim ? (
                <>
                  <Check size={14} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={14} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
