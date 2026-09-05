import React from 'react';
import { Users, CheckCircle2, HeartHandshake, SmilePlus } from 'lucide-react';
import { WHY_CHOOSE_US_CARDS } from '../data/practiceData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return Users;
      case 'CheckCircle2': return CheckCircle2;
      case 'HeartHandshake': return HeartHandshake;
      case 'SmilePlus': return SmilePlus;
      default: return CheckCircle2;
    }
  };

  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-[#F9F8F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E6E0] text-[#5B827F] text-xs font-bold tracking-wide uppercase mb-3 border border-[#E5E2DA]">
            Our Commitment
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight mb-4">
            Why Patients Choose Camberwell Junction Dental
          </h2>
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            We combine high clinical standards with a warm, gentle touch, creating a comfortable dental experience for individuals and families in Camberwell.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WHY_CHOOSE_US_CARDS.map((card) => {
            const Icon = getIcon(card.icon);
            return (
              <div
                key={card.number}
                className="group relative bg-white rounded-2xl p-7 sm:p-8 border border-[#E5E2DA] hover:border-[#5B827F]/50 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Big Number & Top Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#D1CEC6] group-hover:text-[#5B827F] transition-colors">
                      {card.number}
                    </span>
                    <div className="w-11 h-11 rounded-full bg-[#5B827F]/10 group-hover:bg-[#5B827F] text-[#5B827F] group-hover:text-white flex items-center justify-center transition-all border border-[#5B827F]/20">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3 group-hover:text-[#5B827F] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom decorative bar */}
                <div className="mt-8 pt-4 border-t border-[#E5E2DA] flex items-center justify-between text-xs text-[#888888]">
                  <span>Camberwell Junction</span>
                  <span className="w-2 h-2 rounded-full bg-[#D1CEC6] group-hover:bg-[#5B827F] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
