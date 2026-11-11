import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Plane,
  RotateCcw,
  Headphones,
  CheckCircle2,
  Lock
} from 'lucide-react';

const PERKS = [
  {
    icon: Plane,
    title: 'Priority Global Air Express',
    description: 'Dispatched within 4 hours via climate-controlled air courier. Zero shock damage guaranteed.',
    badge: 'Same-Day Tracked'
  },
  {
    icon: ShieldCheck,
    title: '2-Year Concierge Warranty',
    description: 'Direct manufacturer coverage bundled with ACCESS replacement warranty. 100% genuine guaranteed.',
    badge: 'AppleCare & OEM'
  },
  {
    icon: RotateCcw,
    title: '30-Day Frictionless Returns',
    description: 'Changed your mind? Return within 30 days in original packaging with zero restocking penalty.',
    badge: 'No Questions Asked'
  },
  {
    icon: Headphones,
    title: '24/7 Dedicated Tech Support',
    description: 'Speak directly with certified hardware engineers for setup, firmware updates, and calibration.',
    badge: 'Human Engineers'
  }
];

export default function TrustFeatures() {
  return (
    <section className="py-16 border-y border-white/5 bg-[#090b12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                      {perk.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {perk.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
