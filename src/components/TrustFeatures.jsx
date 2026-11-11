import React from 'react';
import {
  ShieldCheck,
  Plane,
  RotateCcw,
  Headphones
} from 'lucide-react';

const PERKS = [
  {
    icon: Plane,
    title: 'Priority Air Express',
    description: 'Dispatched within 4 hours via climate-controlled air transport. Zero shock damage guaranteed.',
    badge: 'SAME-DAY TRACKED'
  },
  {
    icon: ShieldCheck,
    title: '2-Year Concierge Warranty',
    description: 'Direct manufacturer coverage bundled with ACCESS replacement warranty. 100% genuine guaranteed.',
    badge: 'OEM CERTIFIED'
  },
  {
    icon: RotateCcw,
    title: '30-Day Effortless Returns',
    description: 'Return within 30 days in original packaging with zero restocking penalty.',
    badge: 'ZERO RESTOCK'
  },
  {
    icon: Headphones,
    title: '24/7 Dedicated Concierge',
    description: 'Speak directly with hardware engineers for setup, firmware updates, and calibration.',
    badge: 'HUMAN ENGINEERS'
  }
];

export default function TrustFeatures() {
  return (
    <section className="py-20 border-t border-[#f5f2eb]/10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={i}
                className="p-8 border border-[#f5f2eb]/15 bg-[#101010] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <Icon size={20} className="text-[#f5f2eb]" />
                    <span className="text-[9px] font-mono tracking-widest text-[#9c978b] border border-[#f5f2eb]/15 px-2 py-0.5">
                      {perk.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#f5f2eb] mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-[#9c978b] leading-relaxed font-light">
                    {perk.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
