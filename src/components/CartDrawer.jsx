import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Percent,
  Truck
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    totalItems,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    finalTotal,
    freeShippingThreshold,
    freeShippingProgress,
    isFreeShipping,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
    setIsCheckoutOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Slide-out Drawer Panel */}
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
              <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Your Hardware Vault</h2>
                <p className="text-xs text-slate-400">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in staging
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-400 hover:text-rose-300 transition-colors px-2 py-1"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close Cart"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-4 bg-white/[0.02] border-b border-white/5">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Truck size={14} className="text-cyan-400" />
                <span>
                  {isFreeShipping
                    ? '🎉 You unlocked FREE Priority Air Shipping!'
                    : `Add $${amountNeededForFreeShipping} more for FREE Air Shipping`}
                </span>
              </span>
              <span className="font-mono text-cyan-400">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length > 0 ? (
              cartItems.map((item, idx) => (
                <motion.div
                  key={`${item.product.id}-${item.selectedColor}-${idx}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 flex items-center gap-3.5 transition-colors group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain bg-black/40 rounded-xl p-1.5 border border-white/5 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-white truncate">
                      {item.product.name}
                    </h3>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Finish: <span className="text-slate-200">{item.selectedColor}</span>
                    </div>
                    <div className="text-xs font-extrabold text-cyan-400 font-mono mt-1">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                      title="Remove Item"
                    >
                      <Trash2 size={13} />
                    </button>

                    <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)
                        }
                        className="p-1 hover:bg-white/10 text-slate-400 hover:text-white rounded transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)
                        }
                        className="p-1 hover:bg-white/10 text-slate-400 hover:text-white rounded transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-4">
                  <ShoppingBag size={24} />
                </div>
                <p className="text-sm font-semibold text-white">Your vault is empty</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Discover our flagship electronics catalog and add models to your private collection.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Start Exploring
                </button>
              </div>
            )}
          </div>

          {/* Footer Calculation & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#131622] space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter code (ACCESS2026)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white uppercase placeholder:normal-case placeholder:text-slate-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-cyan-500 hover:text-slate-950 text-white font-bold text-xs transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Applied Promo Pill */}
              {appliedCoupon && (
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Check size={14} />
                    <span>{appliedCoupon.code} applied (-{appliedCoupon.rate * 100}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-slate-400 hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}

              {couponError && (
                <p className="text-[11px] text-amber-400">{couponError}</p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-400 border-t border-white/5 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white">${subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Voucher Markdown:</span>
                    <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Priority Courier:</span>
                  <span className="font-mono text-white">
                    {shippingFee === 0 ? (
                      <span className="text-cyan-400 font-bold">FREE</span>
                    ) : (
                      `$${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Sales Tax (8%):</span>
                  <span className="font-mono text-white">${taxAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Estimated Total:</span>
                  <span className="text-cyan-400 font-mono text-base">
                    ${finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all active:scale-98"
              >
                <span>Express Secure Checkout</span>
                <ArrowRight size={15} />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck size={13} className="text-cyan-400" />
                <span>256-Bit SSL Encrypted & Concierge Protected</span>
              </div>

            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
