import React from 'react';
import { Phone, Calendar, Star, Users, Heart, ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { PRACTICE_INFO } from '../data/practiceData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenReviews: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenReviews }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-18 lg:pb-28">
      {/* Subtle organic background ambient shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E8E6E0]/70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#F0EEE9]/90 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Sequential Content Entrance */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* 1. Small Trust & Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8E6E0] text-[#5B827F] text-xs md:text-sm font-bold tracking-wide uppercase mb-5 border border-[#E5E2DA]"
            >
              <span className="w-2 h-2 rounded-full bg-[#5B827F]" />
              <span>Trusted Family Dentistry in Camberwell</span>
            </motion.div>

            {/* 2. Main Headline (Line-by-Line entrance) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-serif font-bold tracking-tight text-[#1A1A1A] leading-[1.12] mb-6">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[#1A1A1A]"
              >
                Healthy Smiles.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[#5B827F] italic font-serif"
              >
                Confident Care.
              </motion.span>
            </h1>

            {/* 3. Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.95, ease: 'easeOut' }}
              className="text-lg sm:text-xl text-[#555555] max-w-xl font-normal leading-relaxed mb-8"
            >
              Comprehensive dental care for individuals and families in the heart of Camberwell. Warm, gentle, and tailored to every generation.
            </motion.p>

            {/* 4 & 5. Action Buttons (Book an Appointment & Call the Practice) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              {/* 4. Primary CTA: Book an Appointment */}
              <motion.button
                id="hero-book-btn"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: 2.1, ease: 'easeOut' }}
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#5B827F] text-white text-base font-semibold hover:bg-[#4A6B68] hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer group shadow-md"
              >
                <Calendar className="w-5 h-5 text-white/90" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* 5. Secondary CTA: Call the Practice */}
              <motion.a
                id="hero-call-btn"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: 2.22, ease: 'easeOut' }}
                href={`tel:${PRACTICE_INFO.phoneClean}`}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white border border-[#E5E2DA] text-[#1A1A1A] text-base font-semibold hover:bg-[#F0EEE9] hover:border-[#5B827F]/50 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-2xs"
              >
                <Phone className="w-5 h-5 text-[#5B827F]" />
                <span>Call the Practice</span>
              </motion.a>
            </div>

            {/* 6. Trust & Review Information */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 2.35, ease: 'easeOut' }}
              className="pt-6 border-t border-[#E5E2DA] w-full grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {/* Google Reviews */}
              <button
                onClick={onOpenReviews}
                className="flex items-center gap-3 text-left p-2 rounded-2xl hover:bg-[#E8E6E0]/60 transition-colors group cursor-pointer"
                title="Click to view verified Google reviews"
              >
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#F2B66D] shrink-0">
                  <Star className="w-5 h-5 fill-[#F2B66D] text-[#F2B66D]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm text-[#1A1A1A]">4.7 / 5.0</span>
                    <span className="text-[#F2B66D] text-xs">★★★★★</span>
                  </div>
                  <span className="text-xs text-[#777777] block">98 Google Patient Reviews</span>
                </div>
              </button>

              {/* Experienced Team */}
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-full bg-[#5B827F]/10 border border-[#5B827F]/20 flex items-center justify-center text-[#5B827F] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-sm text-[#1A1A1A] block">6 Registered Dentists</span>
                  <span className="text-xs text-[#777777] block">Collaborative Clinical Team</span>
                </div>
              </div>

              {/* Family Care */}
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-full bg-[#E8E6E0] border border-[#D1CEC6] flex items-center justify-center text-[#5B827F] shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-sm text-[#1A1A1A] block">All Generations</span>
                  <span className="text-xs text-[#777777] block">Preventive & Gentle Care</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 7. Right Column: Hero Image (Gently fades & scales into place) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative back framing */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#5B827F]/15 to-[#E5E2DA]/60 transform rotate-1 blur-xs" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-[#E8E6E0]">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern and welcoming Camberwell Junction Dental clinic interior"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent opacity-60" />

                {/* Floating Location Badge */}
                <div className="absolute top-4 left-4 glass-card px-3.5 py-2 rounded-full border border-white/80 shadow-md">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#5B827F]" />
                    <span className="text-xs font-semibold text-[#1A1A1A]">1/2 Prospect Hill Rd, Camberwell</span>
                  </div>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-2xl border border-white/80 shadow-lg text-[#1A1A1A]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5B827F]">Welcoming Practice</span>
                    <span className="text-[11px] text-[#555555] flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3 text-[#5B827F]" /> Mon–Sat Care
                    </span>
                  </div>
                  <p className="text-xs text-[#555555] leading-snug">
                    Gentle, patient-centred dental treatments in a warm, relaxed clinic setting.
                  </p>
                </div>
              </div>

              {/* Floating Accent Badge: Now Accepting Patients */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#E5E2DA] max-w-[220px] hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#5B827F] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-[#777777]">Now Accepting</span>
                    <span className="block text-xs font-bold text-[#1A1A1A]">New Patients & Families</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
