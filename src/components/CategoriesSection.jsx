import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import {
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Camera,
  Watch,
  Zap,
  ArrowRight
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'Mobiles',
    name: 'Mobiles',
    tagline: 'Titanium & Bionic Architecture',
    count: '4 Models',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Laptops',
    name: 'Laptops',
    tagline: 'M4 Max Silicon & Gaming OLED',
    count: '4 Models',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Headphones',
    name: 'Headphones',
    tagline: 'Acoustic Carbon Fiber & ANC',
    count: '4 Models',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Smart TVs',
    name: 'Smart TVs',
    tagline: 'Micro Lens Array & 8K Displays',
    count: '4 Displays',
    icon: Tv,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Cameras',
    name: 'Cameras',
    tagline: 'Full-Frame & Cinematic 8K',
    count: '4 Systems',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Smartwatches',
    name: 'Smartwatches',
    tagline: 'Titanium & Sapphire Glass',
    count: '4 Editions',
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Accessories',
    name: 'Accessories',
    tagline: '250W GaN Charging & Desk Gear',
    count: '4 Essentials',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=600&q=80'
  }
];

export default function CategoriesSection() {
  const { activeCategory, setActiveCategory } = useCart();

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
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
    <section id="categories-section" className="py-24 border-t border-[#f5f2eb]/10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#9c978b]">
              DEPARTMENT OVERVIEW
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f5f2eb] tracking-tight mt-2">
              Seven Curated Ecosystems
            </h2>
            <p className="text-sm text-[#9c978b] mt-2 max-w-xl font-light">
              Each piece meets stringent requirements for thermal efficiency, silicon integrity, and aerospace materials.
            </p>
          </div>

          <button
            onClick={() => handleSelectCategory('All')}
            className="text-xs uppercase tracking-[0.18em] font-semibold text-[#9c978b] hover:text-[#f5f2eb] transition-colors shrink-0"
          >
            View All 28 Models →
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.name;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.name)}
                className={`group cursor-pointer border p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-[#101010] ${
                  isSelected
                    ? 'border-[#f5f2eb] ring-1 ring-[#f5f2eb]'
                    : 'border-[#f5f2eb]/15 hover:border-[#f5f2eb]/40'
                }`}
              >
                {/* Image Backdrop Subtle */}
                <div className="h-40 w-full overflow-hidden mb-6 bg-[#080808] flex items-center justify-center p-4">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#9c978b] uppercase tracking-wider mb-1">
                    <span>{cat.count}</span>
                    <Icon size={14} className="text-[#f5f2eb]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#f5f2eb] group-hover:text-white transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#9c978b] mt-1 font-light">
                    {cat.tagline}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Reset Card */}
          <div
            onClick={() => handleSelectCategory('All')}
            className={`cursor-pointer border p-6 flex flex-col justify-center items-center text-center transition-all duration-300 bg-[#101010] ${
              activeCategory === 'All'
                ? 'border-[#f5f2eb] text-[#f5f2eb]'
                : 'border-[#f5f2eb]/15 hover:border-[#f5f2eb]/40 text-[#9c978b] hover:text-[#f5f2eb]'
            }`}
          >
            <span className="text-xs uppercase tracking-widest font-bold">
              {activeCategory === 'All' ? '✓ Showing Complete Catalog' : 'Show All 28 Products'}
            </span>
            <span className="text-[11px] text-[#9c978b] mt-2 font-light">
              Clear department filters
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
