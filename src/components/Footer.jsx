import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  ArrowRight,
  Check
} from 'lucide-react';

export default function Footer() {
  const { setActiveCategory, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('Welcome to the ACCESS Dispatch', 'success');
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
        window.lenis.scrollTo(element, { offset: -70 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="border-t border-[#f5f2eb]/10 bg-[#060606] text-[#9c978b] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Newsletter Strip */}
        <div className="p-8 sm:p-12 border border-[#f5f2eb]/15 bg-[#0e0e0e] mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#f5f2eb]">
              NEWSLETTER
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#f5f2eb] mt-2">
              Hardware Intelligence Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-[#9c978b] mt-2 font-light">
              Receive confidential price updates, early allocations of M4 Max silicon, and exclusive VIP access codes.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 bg-[#080808] border border-[#f5f2eb]/20 text-xs text-[#f5f2eb] placeholder:text-[#636058] focus:border-[#f5f2eb] focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#f5f2eb] hover:bg-white text-[#080808] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shrink-0"
            >
              {subscribed ? (
                <>
                  <Check size={14} />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <span>Join</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-16 border-b border-[#f5f2eb]/10">
          
          <div className="col-span-2 space-y-4">
            <span className="font-outfit font-extrabold text-2xl tracking-[0.25em] text-[#f5f2eb] uppercase">
              ACCESS
            </span>
            <p className="text-xs text-[#9c978b] leading-relaxed max-w-sm font-light">
              ACCESS is an independent showroom dedicated to computational supremacy, acoustic isolation, and titanium engineering. Official certified distribution across global creative hubs.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#f5f2eb] uppercase tracking-wider mb-4">
              Departments
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9c978b]">
              {['Mobiles', 'Laptops', 'Headphones', 'Smart TVs', 'Cameras', 'Smartwatches', 'Accessories'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-[#f5f2eb] transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#f5f2eb] uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9c978b]">
              <li>
                <a href="#faq-section" className="hover:text-[#f5f2eb] transition-colors">
                  Frequently Answered Questions
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-[#f5f2eb] transition-colors">
                  Priority Air Tracking
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-[#f5f2eb] transition-colors">
                  30-Day Guarantee
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-[#f5f2eb] transition-colors">
                  Warranty & OEM Care
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#f5f2eb] uppercase tracking-wider mb-4">
              Showroom
            </h4>
            <div className="space-y-2 text-xs text-[#9c978b] font-light">
              <p>450 Mission St, Suite 1200, San Francisco, CA</p>
              <p>+1 (800) 420-ACCESS</p>
              <p>concierge@access-tech.io</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#636058]">
          <div>
            © {new Date().getFullYear()} ACCESS Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase font-mono text-[#9c978b]">
            <span>Apple Pay</span>
            <span>•</span>
            <span>Google Pay</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
