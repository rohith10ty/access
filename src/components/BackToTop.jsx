import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 bg-[#121212] hover:bg-[#f5f2eb] border border-[#f5f2eb]/20 hover:border-[#f5f2eb] text-[#f5f2eb] hover:text-[#080808] transition-all duration-300 shadow-2xl flex items-center gap-2 group"
          aria-label="Back to top"
        >
          <ArrowUp size={15} className="group-hover:-translate-y-0.5 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest font-bold hidden sm:inline">
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
