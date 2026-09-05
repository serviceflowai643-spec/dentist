import React from 'react';
import { Sun, Gem, Sparkles, ArrowRight, Calendar, CheckCircle } from 'lucide-react';
import { ServiceItem } from '../types';

interface CosmeticDentistryProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenServiceModal: (serviceId: string) => void;
}

export const CosmeticDentistry: React.FC<CosmeticDentistryProps> = ({ onOpenBooking, onOpenServiceModal }) => {
  const cosmeticFeatures = [
    {
      id: 'teeth-whitening',
      icon: Sun,
      title: 'Teeth Whitening',
      desc: 'Safe, professionally supervised whitening treatments designed to lighten deep discoloration and reveal a radiant smile.',
    },
    {
      id: 'crowns-and-veneers',
      icon: Gem,
      title: 'Crowns & Veneers',
      desc: 'Custom-shaded porcelain restorations to reinforce damaged teeth or create natural, harmonious aesthetic alignment.',
    },
    {
      id: 'cosmetic-dentistry',
      icon: Sparkles,
      title: 'Cosmetic Dentistry',
      desc: 'Tailored aesthetic treatment plans focused on symmetry, tooth proportions, and natural smile rejuvenation.',
    },
  ];

  return (
    <section id="cosmetic-dentistry" className="py-20 md:py-28 bg-[#F0EEE9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E6E0] text-[#5B827F] text-xs font-bold tracking-wide uppercase mb-3 border border-[#E5E2DA]">
            <Sparkles className="w-3.5 h-3.5 text-[#5B827F]" />
            Aesthetic Smile Care
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight mb-4">
            Feel More Confident About Your Smile
          </h2>
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            Enhance the natural aesthetics, harmony, and brightness of your teeth with customized cosmetic dental treatments delivered by our experienced Camberwell team.
          </p>
        </div>

        {/* 3 Featured Cosmetic Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-14">
          {cosmeticFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-7 border border-[#E5E2DA] hover:border-[#5B827F]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#5B827F]/10 text-[#5B827F] flex items-center justify-center mb-5 border border-[#5B827F]/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E2DA] flex items-center justify-between">
                  <button
                    onClick={() => onOpenServiceModal(item.id)}
                    className="text-xs sm:text-sm font-semibold text-[#5B827F] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Treatment Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenBooking(item.id)}
                    className="px-3.5 py-1.5 rounded-full bg-[#F0EEE9] hover:bg-[#5B827F] hover:text-white text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner with Smile Image & CTA */}
        <div className="relative rounded-3xl overflow-hidden bg-[#2D2D2D] text-white p-8 sm:p-12 shadow-xl border border-[#3D3D3D]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#2D2D2D]/90 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
            alt="Confident patient smile after gentle cosmetic dental care"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          <div className="relative z-20 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D1CEC6] block mb-2">
              Personalised Consultations
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
              Explore Your Cosmetic Options
            </h3>
            <p className="text-sm sm:text-base text-[#E5E2DA] leading-relaxed mb-8">
              Every smile is unique. We provide honest, transparent consultations to discuss what approach aligns best with your oral health, lifestyle, and goals.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                id="cosmetic-explore-cta"
                onClick={() => onOpenBooking('cosmetic-dentistry')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#1A1A1A] text-sm font-semibold hover:bg-[#F9F8F6] shadow-xs transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Explore Cosmetic Dentistry</span>
              </button>

              <button
                onClick={() => onOpenServiceModal('teeth-whitening')}
                className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>Teeth Whitening Guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
