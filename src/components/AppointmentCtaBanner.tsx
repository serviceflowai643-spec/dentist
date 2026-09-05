import React from 'react';
import { Calendar, Phone, ArrowRight, Clock, MapPin } from 'lucide-react';
import { PRACTICE_INFO } from '../data/practiceData';

interface AppointmentCtaBannerProps {
  onOpenBooking: () => void;
}

export const AppointmentCtaBanner: React.FC<AppointmentCtaBannerProps> = ({ onOpenBooking }) => {
  return (
    <section id="appointment-cta" className="py-16 md:py-24 bg-[#F9F8F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#2D2D2D] text-white shadow-xl border border-[#3D3D3D]">
          {/* Background Image with warm overlay */}
          <img
            src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1600&q=80"
            alt="Camberwell Junction Dental modern practice"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#2D2D2D]/95 to-[#2D2D2D]/80" />

          {/* Content */}
          <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5B827F]/25 text-[#D1CEC6] text-xs font-bold uppercase tracking-wider mb-4 border border-[#5B827F]/35">
              Personalised Family Dentistry
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4 leading-tight">
              Ready To Take Care Of Your Smile?
            </h2>

            <p className="text-base sm:text-lg text-[#D1CEC6] font-normal leading-relaxed mb-8 max-w-xl">
              Book an appointment with the Camberwell Junction Dental team. We look forward to welcoming you and your family.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                id="cta-banner-book-btn"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#5B827F] text-white text-base font-semibold hover:bg-[#4A6B68] active:scale-[0.99] shadow-md transition-all cursor-pointer group"
              >
                <Calendar className="w-5 h-5" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                id="cta-banner-call-btn"
                href={`tel:${PRACTICE_INFO.phoneClean}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-base font-semibold transition-all backdrop-blur-xs"
              >
                <Phone className="w-5 h-5 text-[#8CB1AE]" />
                <span>Call {PRACTICE_INFO.phone}</span>
              </a>
            </div>

            {/* Quick Practice Details */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#D1CEC6]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8CB1AE] shrink-0" />
                <span>{PRACTICE_INFO.address.street}, Camberwell VIC 3124</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8CB1AE] shrink-0" />
                <span>Mon–Fri: 8:15am – 5:15pm | Sat: 8:45am – 3:30pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
