import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  Sparkles
} from 'lucide-react';

const FAQS = [
  {
    q: 'Are all products authentic, factory-sealed, and backed by manufacturer warranty?',
    a: 'Absolutely. Every device sold on ACCESS is sourced through authorized tier-1 global distributors (Apple Authorized, Sony Professional, Samsung Enterprise). Each item has its unique IMEI / serial number verified against official manufacturer registers prior to dispatch and qualifies for full official warranty.'
  },
  {
    q: 'How fast is Priority Air Delivery and which couriers are utilized?',
    a: 'Orders placed before 2:00 PM are dispatched on the same day via priority temperature-regulated air cargo (FedEx Custom Critical or DHL Express Worldwide). Deliveries across North America and Europe typically arrive in 24 to 48 hours with full live telemetry GPS tracking.'
  },
  {
    q: 'What is your 30-Day Return & Replacement Policy?',
    a: 'We offer an unconditional 30-day return policy. If you are not completely satisfied with the ergonomic feel, color, or performance of your purchase, submit a return through your ACCESS concierge portal. We provide a prepaid air label and inspect items for instant full refunds or immediate replacements.'
  },
  {
    q: 'How can I apply promo codes like ACCESS2026 or PRODIGY10?',
    a: 'You can apply your promo code directly from the flash deals section on the homepage with a single click, or type it into the voucher input inside the shopping cart drawer. The markdown is immediately computed across eligible flagship hardware.'
  },
  {
    q: 'Do you offer installment financing or trade-in programs?',
    a: 'Yes. At checkout, you can select flexible 0% APR installment financing across 3, 6, or 12 months with Apple Pay Later or Affirm. We also offer up to $600 instant trade-in appraisals on legacy smart TVs, cameras, and laptops towards new 2026 models.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq-section" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold mb-3">
            <HelpCircle size={13} className="text-cyan-400" />
            <span>TRANSPARENCY & ASSURANCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Answered Questions
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Everything you need to know regarding authentication, air courier dispatch, and our concierge warranty standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* FAQ Accordion (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#141724] border-cyan-500/40 shadow-lg'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.q}
                    </span>
                    <div
                      className={`p-1.5 rounded-full bg-white/5 text-slate-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-cyan-400 bg-cyan-500/20' : ''
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Customer Support Concierge Card (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#161a29] to-[#0c0e17] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
              
              <div className="relative z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest">
                  LIVE CONCIERGE DESK
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-4">
                  Need Hardware Consultation?
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Our certified tech architects are online 24/7 to assist with workstation builds, acoustic room matching, or enterprise order volume.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400">
                      <MessageSquare size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Real-Time Chat
                      </span>
                      <p className="text-xs font-semibold text-white">
                        Average response: Under 60 seconds
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400">
                      <Mail size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Direct Email Desk
                      </span>
                      <p className="text-xs font-semibold text-white">
                        concierge@access-electronics.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Toll-Free Hotline
                      </span>
                      <p className="text-xs font-semibold text-white">
                        +1 (800) 420-ACCESS (24/7)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Concierge Desk Online
                </span>
                <span className="text-slate-500">San Francisco, CA</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
