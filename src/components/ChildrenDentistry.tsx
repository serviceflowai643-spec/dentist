import React from 'react';
import { Baby, Sparkles, Heart, Check, Calendar, ArrowRight } from 'lucide-react';

interface ChildrenDentistryProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenServiceModal: (serviceId: string) => void;
}

export const ChildrenDentistry: React.FC<ChildrenDentistryProps> = ({ onOpenBooking, onOpenServiceModal }) => {
  const points = [
    'Fun, calm, and positive introductory visits',
    'Gentle examinations, cleans, and preventive fluoride',
    'Protective fissure sealants for growing molars',
    'Child Dental Benefits Schedule (CDBS) bulk-billing supported for eligible families',
    'Oral hygiene & dietary guidance tailored for young children',
  ];

  return (
    <section id="childrens-dentistry" className="py-20 md:py-28 bg-[#F9F8F6] relative overflow-hidden border-t border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text / Info */}
          <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E6E0] text-[#5B827F] text-xs font-bold tracking-wide uppercase mb-4 border border-[#E5E2DA]">
              <Baby className="w-3.5 h-3.5" />
              Family & Paediatric Care
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] leading-tight mb-5">
              Great Dental Habits<br />
              <span className="text-[#5B827F] italic">Start Early</span>
            </h2>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-6 font-normal">
              We understand that positive early experiences shape a child's lifelong attitude toward dental health. Our team focuses on gentle, reassuring visits in a welcoming environment where children feel safe and engaged.
            </p>

            <div className="space-y-3 mb-8 w-full">
              {points.map((pt) => (
                <div key={pt} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#5B827F]/10 text-[#5B827F] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-[#555555]">{pt}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="childrens-dentistry-cta"
                onClick={() => onOpenBooking('childrens-dentistry')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#5B827F] text-white text-sm font-semibold hover:bg-[#4A6B68] shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Children's Dentistry</span>
              </button>

              <button
                onClick={() => onOpenServiceModal('childrens-dentistry')}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-white border border-[#E5E2DA] text-[#1A1A1A] text-sm font-semibold hover:bg-[#F0EEE9] transition-colors cursor-pointer"
              >
                <span>Learn More About Child Care</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Friendly Family Image */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-3 rounded-3xl bg-[#E8E6E0] transform rotate-1" />
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white aspect-[4/3] sm:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80"
                  alt="Friendly child dental care at Camberwell Junction Dental"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-3 sm:left-4 bg-white p-4 rounded-2xl shadow-lg border border-[#E5E2DA]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#5B827F] text-white flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1A1A1A]">Medicare CDBS Accepted</span>
                    <span className="block text-[11px] text-[#777777]">Eligible children 0–17 years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
