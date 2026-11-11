import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { CheckCircle2, ShoppingBag, Heart, AlertCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = CheckCircle2;
          let iconColor = 'text-cyan-400';

          if (toast.type === 'cart') {
            Icon = ShoppingBag;
            iconColor = 'text-emerald-400';
          } else if (toast.type === 'success') {
            Icon = Heart;
            iconColor = 'text-rose-400';
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            iconColor = 'text-amber-400';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto bg-[#12141c]/95 backdrop-blur-xl border border-white/10 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3.5"
            >
              <div className={`p-2 rounded-xl bg-white/5 ${iconColor}`}>
                <Icon size={18} />
              </div>

              {toast.meta?.image && (
                <img
                  src={toast.meta.image}
                  alt="item"
                  className="w-10 h-10 object-cover rounded-lg border border-white/10 shrink-0"
                />
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{toast.message}</p>
                {toast.meta?.price && (
                  <p className="text-xs text-cyan-400 font-semibold">${toast.meta.price.toLocaleString()}</p>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-1 transition-colors"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
