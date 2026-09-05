import React from 'react';
import { Users, Heart, Sparkles, MapPin } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      icon: Users,
      title: 'Experienced Dental Team',
      desc: '6 dedicated practitioners providing collaborative, gentle care',
    },
    {
      icon: Heart,
      title: 'Family Friendly Care',
      desc: 'Comfortable & calming treatments for every generation',
    },
    {
      icon: Sparkles,
      title: 'Comprehensive Services',
      desc: 'From routine check-ups & cleanings to cosmetic smile care',
    },
    {
      icon: MapPin,
      title: 'Convenient Camberwell Location',
      desc: '1/2 Prospect Hill Road, right at Camberwell Junction',
    },
  ];

  return (
    <section id="trust-strip" className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-sm border border-[#E5E2DA] p-5 sm:p-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E2DA]">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-start gap-4 ${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
              >
                <div className="w-11 h-11 rounded-full bg-[#5B827F]/10 text-[#5B827F] flex items-center justify-center shrink-0 border border-[#5B827F]/20">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-[#1A1A1A] mb-0.5">{item.title}</h2>
                  <p className="text-xs text-[#666666] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
