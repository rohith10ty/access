import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import {
  X,
  Lock,
  CheckCircle,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    finalTotal,
    clearCart,
    triggerOrderSuccess
  } = useCart();

  const [formData, setFormData] = useState({
    name: 'Alexander Wright',
    email: 'alexander@access-tech.io',
    address: '742 Evergreen Terrace, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '888'
  });

  const [paymentMethod, setPaymentMethod] = useState('applepay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `ACS-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      clearCart();
      triggerOrderSuccess();
    }, 1200);
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderConfirmed(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm -z-10"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#0c0c0c] border border-[#f5f2eb]/20 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#f5f2eb]/10 bg-[#101010]">
            <div className="flex items-center gap-2">
              <Lock size={14} className="text-[#f5f2eb]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#f5f2eb]">
                Encrypted Checkout
              </span>
            </div>
            <button onClick={handleClose} className="text-[#9c978b] hover:text-[#f5f2eb] p-1">
              <X size={16} />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {!orderConfirmed ? (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                
                {/* Method */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#9c978b] mb-2.5">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['applepay', 'card', 'crypto'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`p-3 border text-center transition-all ${
                          paymentMethod === method
                            ? 'bg-[#f5f2eb] text-[#080808] border-[#f5f2eb] font-bold'
                            : 'bg-[#080808] border-[#f5f2eb]/20 text-[#9c978b] hover:text-[#f5f2eb]'
                        }`}
                      >
                        <span className="text-xs block capitalize">
                          {method === 'applepay' ? ' Apple Pay' : method === 'card' ? 'Credit Card' : 'Crypto USDC'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#9c978b]">
                    Delivery Destination
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-[#636058] block mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-[#080808] border border-[#f5f2eb]/20 text-xs text-[#f5f2eb] focus:border-[#f5f2eb] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#636058] block mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-[#080808] border border-[#f5f2eb]/20 text-xs text-[#f5f2eb] focus:border-[#f5f2eb] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="text-[10px] text-[#636058] block mb-1">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-[#080808] border border-[#f5f2eb]/20 text-xs text-[#f5f2eb] focus:border-[#f5f2eb] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#636058] block mb-1">Zip</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-[#080808] border border-[#f5f2eb]/20 text-xs text-[#f5f2eb] focus:border-[#f5f2eb] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Total & Button */}
                <div className="pt-4 border-t border-[#f5f2eb]/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#636058] block">
                      Total
                    </span>
                    <span className="text-2xl font-bold font-mono text-[#f5f2eb]">
                      ${finalTotal.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 max-w-xs py-3.5 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Authorizing...</span>
                    ) : (
                      <>
                        <span>Authorize Order</span>
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                </div>

              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <CheckCircle size={32} className="mx-auto text-[#f5f2eb]" />
                <h3 className="text-2xl font-extrabold text-[#f5f2eb]">
                  Order Authorized
                </h3>
                <p className="text-xs text-[#9c978b] max-w-sm mx-auto font-light leading-relaxed">
                  Thank you, {formData.name}. Your order has been allocated and routed for priority air dispatch.
                </p>

                <div className="p-4 border border-[#f5f2eb]/20 bg-[#080808] max-w-xs mx-auto flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[9px] uppercase tracking-widest text-[#636058] block">
                      Tracking Code
                    </span>
                    <span className="text-xs font-mono font-bold text-[#f5f2eb]">
                      {orderId}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyOrderId}
                    className="px-3 py-1 bg-[#f5f2eb] text-[#080808] text-[10px] uppercase font-bold"
                  >
                    {copiedId ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-[#f5f2eb] text-[#080808] text-xs font-bold uppercase tracking-wider"
                  >
                    Return to Store
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
