import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  MessageSquare,
  Mail,
  Phone
} from 'lucide-react';

const FAQS = [
  {
    q: 'Are all products authentic, factory-sealed, and backed by manufacturer warranty?',
    a: 'Every device sold on ACCESS is sourced through authorized tier-1 global distributors. Each item has its unique IMEI / serial number verified against official manufacturer registers prior to dispatch and qualifies for full official warranty.'
  },
  {
    q: 'How fast is Priority Air Delivery and which couriers are utilized?',
    a: 'Orders placed before 2:00 PM are dispatched on the same day via priority temperature-regulated air cargo (FedEx Custom Critical or DHL Express Worldwide). Deliveries typically arrive in 24 to 48 hours with full live telemetry GPS tracking.'
  },
  {
    q: 'What is your 30-Day Return & Replacement Policy?',
    a: 'We offer an unconditional 30-day return policy. If you are not completely satisfied with the ergonomic feel, color, or performance of your purchase, submit a return through your ACCESS concierge portal for a full refund.'
  },
  {
    q: 'How can I apply promo codes like ACCESS2026 or PRODIGY10?',
    a: 'You can apply your promo code directly from the special offers section with a single click, or type it into the voucher input inside the shopping cart drawer. The markdown is immediately computed across eligible flagship hardware.'
  },
  {
    q: 'Do you offer installment financing or trade-in programs?',
    a: 'Yes. At checkout, you can select flexible 0% APR installment financing with Apple Pay Later or Affirm. We also offer up to $600 instant trade-in appraisals on legacy smart TVs, cameras, and laptops towards new 2026 models.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq-section" className="py-24 border-t border-[#f5f2eb]/10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#9c978b]">
              TRANSPARENCY & ASSURANCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f5f2eb] tracking-tight mt-2">
              Frequently Answered Questions
            </h2>
            <p className="text-sm text-[#9c978b] mt-2 max-w-xl font-light">
              Everything you need to know regarding authentication, air courier dispatch, and warranty standards.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#f5f2eb]/15 bg-[#101010] transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#f5f2eb]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#9c978b] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#f5f2eb]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-[#9c978b] leading-relaxed border-t border-[#f5f2eb]/10 pt-4 font-light">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Support Concierge Card */}
          <div className="lg:col-span-5">
            <div className="p-8 border border-[#f5f2eb]/15 bg-[#101010] flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#9c978b]">
                  HARDWARE CONCIERGE
                </span>
                <h3 className="text-2xl font-extrabold text-[#f5f2eb] mt-3">
                  Need Hardware Consultation?
                </h3>
                <p className="text-xs text-[#9c978b] mt-2 font-light leading-relaxed">
                  Our certified tech architects are available 24/7 to assist with workstation builds, acoustic room matching, or enterprise volume orders.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="p-4 border border-[#f5f2eb]/10 bg-[#080808]">
                    <div className="text-[10px] uppercase tracking-wider text-[#636058] font-bold">
                      Real-Time Chat
                    </div>
                    <div className="text-xs font-semibold text-[#f5f2eb] mt-0.5">
                      Average response: Under 60 seconds
                    </div>
                  </div>

                  <div className="p-4 border border-[#f5f2eb]/10 bg-[#080808]">
                    <div className="text-[10px] uppercase tracking-wider text-[#636058] font-bold">
                      Direct Email Desk
                    </div>
                    <div className="text-xs font-semibold text-[#f5f2eb] mt-0.5">
                      concierge@access-tech.io
                    </div>
                  </div>

                  <div className="p-4 border border-[#f5f2eb]/10 bg-[#080808]">
                    <div className="text-[10px] uppercase tracking-wider text-[#636058] font-bold">
                      Toll-Free Hotline
                    </div>
                    <div className="text-xs font-semibold text-[#f5f2eb] mt-0.5">
                      +1 (800) 420-ACCESS (24/7)
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#f5f2eb]/10 flex items-center justify-between text-xs text-[#9c978b]">
                <span className="text-[#f5f2eb] font-semibold uppercase tracking-wider">
                  Concierge Desk Online
                </span>
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
