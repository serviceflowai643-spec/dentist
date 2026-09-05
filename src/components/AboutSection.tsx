import React from 'react';
import { ArrowRight, MapPin, Users, HeartHandshake, ShieldCheck, Phone, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { PRACTICE_INFO } from '../data/practiceData';

const PRACTICE_PHOTO_URL = '/assets/camberwell_dental_practice.jpg';


interface AboutSectionProps {
  onScrollToDentists: () => void;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onScrollToDentists, onOpenBooking }) => {
  const highlights = [
    {
      title: 'Central Junction Location',
      desc: 'Conveniently situated at 1/2 Prospect Hill Road in Camberwell with easy access to parking, trams, and trains.',
    },
    {
      title: 'Collaborative Clinical Team',
      desc: 'A dedicated group of six registered dentists providing comprehensive care across general and family dentistry.',
    },
    {
      title: 'Preventive & Family Focus',
      desc: 'Guiding long-term oral wellness with gentle hygiene treatments, thorough check-ups, and children’s dental visits.',
    },
    {
      title: 'Tailored Dental Care',
      desc: 'Personalised treatment planning with clear, transparent advice tailored to your comfort and individual priorities.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F9F8F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Eyebrow */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E6E0] text-[#5B827F] text-xs font-bold tracking-wide uppercase mb-3 border border-[#E5E2DA]"
          >
            <span className="w-2 h-2 rounded-full bg-[#5B827F]" />
            Our Practice & Location
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] leading-tight"
          >
            Your Local Dental Practice in Camberwell
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#555555] leading-relaxed font-normal"
          >
            Visit Camberwell Junction Dental at our practice in the heart of Camberwell, providing professional dental care for individuals and families.
          </motion.p>
        </div>

        {/* 50/50 Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Real Practice Photograph */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 relative"
          >
            <div className="relative group">
              {/* Soft background offset frame */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-[#E8E6E0]/80 transform -rotate-1 transition-transform group-hover:rotate-0 duration-300" />
              
              {/* Practice Image Container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#E5E2DA] bg-white aspect-[4/3] sm:aspect-[1/1] max-h-[540px]">
                <img
                  src={PRACTICE_PHOTO_URL}
                  alt="Camberwell Junction Dental practice in Camberwell"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-transparent opacity-60" />

                {/* Top Badge: Verified Physical Location */}
                <div className="absolute top-4 left-4 glass-card px-3.5 py-1.5 rounded-full border border-white/80 shadow-md flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#5B827F]" />
                  <span className="text-xs font-bold text-[#1A1A1A]">
                    1/2 Prospect Hill Rd, Camberwell VIC
                  </span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 glass-card p-3.5 sm:p-4 rounded-2xl border border-white/80 shadow-lg text-[#1A1A1A]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5B827F]">
                      Camberwell Junction Dental
                    </span>
                    <span className="text-[11px] font-semibold text-[#555555] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#5B827F]" /> Level 1 Practice
                    </span>
                  </div>
                  <p className="text-xs text-[#555555] leading-snug">
                    Located on Prospect Hill Road at Camberwell Junction, conveniently situated above Australia Post.
                  </p>
                </div>
              </div>

              {/* Floating Accent Card: 6 Registered Dentists */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#E5E2DA] max-w-[220px] hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#5B827F] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1A1A1A]">6 Experienced Dentists</span>
                    <span className="block text-[11px] text-[#777777]">Serving the Community</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Editorial & Practice Attributes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B827F]/10 text-[#5B827F] text-xs font-bold tracking-wide uppercase mb-3 border border-[#5B827F]/20">
              Camberwell Family Dentistry
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] leading-tight mb-5">
              Personalised Dental Care in the Heart of Camberwell
            </h3>

            <p className="text-base text-[#555555] leading-relaxed mb-6 font-normal">
              At Camberwell Junction Dental, our team of six registered practitioners is committed to delivering thorough, respectful, and gentle dental treatments. We welcome new patients of all ages, from young children having their very first dental visit to adults maintaining lifelong oral health.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-8">
              {highlights.map((item) => (
                <div key={item.title} className="p-4 rounded-2xl bg-white border border-[#E5E2DA] shadow-2xs hover:border-[#5B827F]/40 transition-colors">
                  <span className="block text-xs font-bold text-[#1A1A1A] mb-1">{item.title}</span>
                  <span className="block text-xs text-[#666666] leading-relaxed">{item.desc}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <button
                id="about-request-appointment-btn"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#5B827F] hover:bg-[#4A6B68] text-white text-sm font-semibold transition-all cursor-pointer shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Request an Appointment</span>
              </button>

              <button
                id="about-meet-dentists-btn"
                onClick={onScrollToDentists}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#E5E2DA] text-[#1A1A1A] text-sm font-semibold hover:bg-[#F0EEE9] hover:border-[#5B827F]/40 transition-all cursor-pointer group shadow-2xs"
              >
                <span>Meet Our Dentists</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#5B827F]" />
              </button>

              <a
                href={`tel:${PRACTICE_INFO.phoneClean}`}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#5B827F] hover:underline px-2 py-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>(03) 9882 1187</span>
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
