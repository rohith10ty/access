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
  ArrowUpRight
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'Mobiles',
    name: 'Mobiles',
    tagline: 'Titanium Bionics',
    count: '4 Models',
    icon: Smartphone,
    color: 'from-cyan-500/20 to-blue-600/20',
    borderColor: 'hover:border-cyan-400/50',
    accentColor: '#38bdf8',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Laptops',
    name: 'Laptops',
    tagline: 'M4 Max & Workstations',
    count: '4 Models',
    icon: Laptop,
    color: 'from-indigo-500/20 to-purple-600/20',
    borderColor: 'hover:border-indigo-400/50',
    accentColor: '#818cf8',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Headphones',
    name: 'Headphones',
    tagline: 'Spatial Studio Acoustics',
    count: '4 Models',
    icon: Headphones,
    color: 'from-emerald-500/20 to-teal-600/20',
    borderColor: 'hover:border-emerald-400/50',
    accentColor: '#34d399',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Smart TVs',
    name: 'Smart TVs',
    tagline: '8K Neo QLED & OLED evo',
    count: '4 Displays',
    icon: Tv,
    color: 'from-amber-500/20 to-orange-600/20',
    borderColor: 'hover:border-amber-400/50',
    accentColor: '#fbbf24',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Cameras',
    name: 'Cameras',
    tagline: 'Full-Frame & Cinematic 8K',
    count: '4 Systems',
    icon: Camera,
    color: 'from-rose-500/20 to-pink-600/20',
    borderColor: 'hover:border-rose-400/50',
    accentColor: '#fb7185',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Smartwatches',
    name: 'Smartwatches',
    tagline: 'Titanium & Sapphire Glass',
    count: '4 Editions',
    icon: Watch,
    color: 'from-sky-500/20 to-cyan-600/20',
    borderColor: 'hover:border-sky-400/50',
    accentColor: '#38bdf8',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Accessories',
    name: 'Accessories',
    tagline: 'GaN Power & Desk Tech',
    count: '4 Essentials',
    icon: Zap,
    color: 'from-violet-500/20 to-fuchsia-600/20',
    borderColor: 'hover:border-violet-400/50',
    accentColor: '#c084fc',
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
        window.lenis.scrollTo(element, { offset: -80 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="categories-section" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1 rounded-full">
            SEVEN CORE DEPARTMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Curated Category Ecosystem
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Hand-selected by our hardware curators. Each product meets uncompromising benchmarks for build quality, silicon efficiency, and repairability.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.name;

            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={() => handleSelectCategory(cat.name)}
                className={`group cursor-pointer relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#141622] to-[#0c0d13] border p-5 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                  isSelected
                    ? 'border-cyan-400 ring-2 ring-cyan-400/20'
                    : `border-white/10 ${cat.borderColor}`
                }`}
              >
                {/* Background image preview with blur overlay */}
                <div className="absolute inset-0 opacity-15 group-hover:opacity-30 transition-opacity duration-500">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d13] via-[#0c0d13]/80 to-transparent" />
                </div>

                {/* Top Row: Icon & Count */}
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-black/40 px-2 py-1 rounded-md border border-white/5">
                    {cat.count}
                  </span>
                </div>

                {/* Bottom Row: Name, Tagline & Action Arrow */}
                <div className="relative z-10">
                  <div className="text-[11px] text-slate-400 font-medium">
                    {cat.tagline}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {cat.name}
                    </h3>
                    <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-cyan-500 group-hover:text-black text-slate-400 flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Quick Filter Reset Card */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            onClick={() => handleSelectCategory('All')}
            className={`cursor-pointer rounded-2xl border p-5 flex flex-col justify-center items-center text-center transition-all duration-300 shadow-xl ${
              activeCategory === 'All'
                ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300'
                : 'bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider">
              {activeCategory === 'All' ? '✓ Showing All' : 'Show All 28 Products'}
            </span>
            <span className="text-[11px] text-slate-400 mt-1">
              Reset category filters
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
