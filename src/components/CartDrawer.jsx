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
  Tag,
  Check,
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
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
              <ShoppingBag size={18} className="text-[#f5f2eb]" />
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#f5f2eb]">
                  Vault Cart
                </h2>
                <p className="text-xs text-[#9c978b]">
                  {totalItems} {totalItems === 1 ? 'model' : 'models'} selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-[#9c978b] hover:text-[#f5f2eb] uppercase tracking-wider"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-[#9c978b] hover:text-[#f5f2eb] p-1"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Free Shipping Strip */}
          <div className="p-4 bg-[#121212] border-b border-[#f5f2eb]/10">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="flex items-center gap-1.5 text-[#f5f2eb]">
                <Truck size={13} />
                <span>
                  {isFreeShipping
                    ? 'Complimentary Priority Air Shipping Unlocked'
                    : `Add $${amountNeededForFreeShipping} for Free Air Shipping`}
                </span>
              </span>
              <span className="font-mono text-[#9c978b]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1 bg-[#252525]">
              <div
                className="h-full bg-[#f5f2eb] transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${idx}`}
                  className="p-4 border border-[#f5f2eb]/10 bg-[#121212] flex items-center gap-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 object-contain bg-[#080808] p-1 border border-[#f5f2eb]/10 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-[#f5f2eb] truncate">
                      {item.product.name}
                    </h3>
                    <div className="text-[10px] text-[#9c978b] mt-0.5">
                      Finish: {item.selectedColor}
                    </div>
                    <div className="text-xs font-bold font-mono text-[#f5f2eb] mt-1">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="text-[#636058] hover:text-[#f5f2eb]"
                    >
                      <Trash2 size={13} />
                    </button>

                    <div className="flex items-center border border-[#f5f2eb]/20 bg-[#080808]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                        className="p-1 hover:bg-[#f5f2eb]/10 text-[#9c978b]"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-5 text-center text-xs font-mono font-bold text-[#f5f2eb]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                        className="p-1 hover:bg-[#f5f2eb]/10 text-[#9c978b]"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-24 text-center">
                <ShoppingBag size={24} className="mx-auto text-[#636058] mb-3" />
                <p className="text-xs font-bold text-[#f5f2eb] uppercase tracking-wider">
                  Your vault is empty
                </p>
                <p className="text-xs text-[#9c978b] mt-1 font-light">
                  Browse our flagship catalog to add hardware.
                </p>
              </div>
            )}
          </div>

          {/* Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#f5f2eb]/10 bg-[#0e0e0e] space-y-4">
              {/* Voucher */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Code (ACCESS2026)"
                  className="flex-1 px-3 py-2 bg-[#080808] border border-[#f5f2eb]/20 text-xs text-[#f5f2eb] uppercase placeholder:normal-case placeholder:text-[#636058] focus:border-[#f5f2eb] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-xs uppercase"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="p-2 border border-[#f5f2eb]/20 bg-[#121212] flex items-center justify-between text-xs text-[#f5f2eb]">
                  <span className="font-mono">{appliedCoupon.code} Applied (-{appliedCoupon.rate * 100}%)</span>
                  <button onClick={removeCoupon} className="text-[#9c978b] hover:text-[#f5f2eb]">
                    <X size={12} />
                  </button>
                </div>
              )}

              {/* Summary */}
              <div className="space-y-1.5 text-xs text-[#9c978b] border-t border-[#f5f2eb]/10 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-[#f5f2eb]">${subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#f5f2eb]">
                    <span>Voucher Credit:</span>
                    <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Air Courier:</span>
                  <span className="font-mono text-[#f5f2eb]">
                    {shippingFee === 0 ? 'COMPLIMENTARY' : `$${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#f5f2eb] pt-2 border-t border-[#f5f2eb]/10">
                  <span>Total:</span>
                  <span className="font-mono">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>Express Checkout</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
