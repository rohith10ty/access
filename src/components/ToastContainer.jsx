import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Check, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-[#121212] border border-[#f5f2eb]/20 p-3.5 shadow-2xl flex items-center gap-3 text-xs text-[#f5f2eb]"
          >
            <div className="p-1 border border-[#f5f2eb]/30 text-[#f5f2eb]">
              <Check size={12} />
            </div>

            {toast.meta?.image && (
              <img
                src={toast.meta.image}
                alt="thumb"
                className="w-8 h-8 object-contain bg-[#080808] p-0.5 border border-[#f5f2eb]/10 shrink-0"
              />
            )}

            <div className="flex-1 min-w-0 font-medium truncate">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#9c978b] hover:text-[#f5f2eb] p-1"
            >
              <X size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
