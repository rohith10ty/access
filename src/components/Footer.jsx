import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  Sparkles,
  ArrowRight,
  Check,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Heart,
  Globe
} from 'lucide-react';

export default function Footer() {
  const { setActiveCategory, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('Welcome to the ACCESS Flagship Dispatch', 'success');
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const element = document.getElementById('catalog-section');
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -80 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#06070a] text-slate-300 relative overflow-hidden pt-16 pb-12">
      
      {/* Subtle Glow in Footer Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Dispatch Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#11131e] via-[#0d0f17] to-[#121422] border border-white/10 shadow-2xl mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest">
              HARDWARE INTELLIGENCE DISPATCH
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Never Miss A Flagship Drop
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Receive confidential price cuts, early allocations of M4 Max silicon, and exclusive VIP invitation codes. Strictly zero spam.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder:text-slate-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-cyan-500/25 shrink-0"
            >
              {subscribed ? (
                <>
                  <Check size={15} />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <span>Join Vault</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand & Manifesto (Spans 2 cols on desktop) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-[#0d0e15] rounded-[10px] flex items-center justify-center font-black text-white text-base">
                  A
                </div>
              </div>
              <span className="text-2xl font-black tracking-wider text-white font-outfit uppercase">
                ACCESS<span className="text-cyan-400">.</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-light">
              ACCESS is the premier digital showroom for verified flagship electronics. We partner with authorized manufacturers to bring aerospace-grade design, unthrottled silicon performance, and acoustic mastery directly to global creators.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Globe size={14} />
                <span>Global Express Node</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck size={14} />
                <span>100% Certified Genuine</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Curated Departments
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {['Mobiles', 'Laptops', 'Headphones', 'Smart TVs', 'Cameras', 'Smartwatches', 'Accessories'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Support & Policies */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#faq-section" className="hover:text-cyan-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-cyan-400 transition-colors">
                  Order Tracking & Dispatch
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-cyan-400 transition-colors">
                  30-Day Money-Back Guarantee
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-cyan-400 transition-colors">
                  Warranty & OEM Repair
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-cyan-400 transition-colors">
                  Trade-In & Appraisal
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-cyan-400 transition-colors">
                  Hardware Recycling Program
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Showroom */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Showroom & Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>450 Mission St, Suite 1200, San Francisco, CA 94105</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-cyan-400 shrink-0" />
                <span>+1 (800) 420-ACCESS</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-cyan-400 shrink-0" />
                <span>concierge@access-tech.io</span>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[11px] font-bold text-slate-300 uppercase mb-2">
                Social Channels
              </div>
              <div className="flex items-center gap-2">
                {['𝕏', 'GH', 'YT', 'IG', 'DC'].map((label, i) => (
                  <a
                    key={i}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="w-7 h-7 rounded-lg bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/5 flex items-center justify-center text-[10px] font-bold text-slate-300 transition-all"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} ACCESS Technologies Inc. All rights reserved. Built with React, Vite & Tailwind CSS.
          </div>

          {/* Payment Gateway Badges */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="px-2 py-1 rounded bg-white/5 border border-white/5">Apple Pay</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/5">Google Pay</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/5">Visa</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/5">Mastercard</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/5">Amex</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
