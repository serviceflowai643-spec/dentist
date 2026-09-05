import React, { useState } from 'react';
import { Calendar, Shield, Stethoscope, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { DENTISTS } from '../data/practiceData';
import { Dentist } from '../types';

interface DentistTeamProps {
  onBookWithDentist: (dentistId: string) => void;
  onOpenBooking: () => void;
}

export const DentistTeam: React.FC<DentistTeamProps> = ({ onBookWithDentist, onOpenBooking }) => {
  return (
    <section id="dentists" className="py-20 md:py-28 bg-[#F0EEE9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E6E0] text-[#5B827F] text-xs font-bold tracking-wide uppercase mb-3 border border-[#E5E2DA]"
          >
            <span className="w-2 h-2 rounded-full bg-[#5B827F]" />
            Our Dentists
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight mb-4"
          >
            Meet Our Dentists
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-base sm:text-lg text-[#555555] leading-relaxed"
          >
            Our team of six experienced and dedicated dentists provides collaborative, gentle, and comprehensive dental care for individuals and families in Camberwell.
          </motion.p>
        </div>

        {/* Dentists Grid (Doctor 1 → Doctor 2 → Doctor 3 → Doctor 4 → Doctor 5 → Doctor 6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {DENTISTS.map((dentist, index) => {
            const isPrincipal = dentist.role.includes('Principal');

            return (
              <motion.div
                key={dentist.id}
                id={`dentist-card-${dentist.id}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                className={`group bg-white rounded-3xl overflow-hidden border ${
                  isPrincipal ? 'border-[#5B827F]/70 ring-1 ring-[#5B827F]/20' : 'border-[#E5E2DA]'
                } shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                <div>
                  {/* Doctor Photograph with High Quality Aspect Ratio and Zoom */}
                  <div className="relative aspect-[4/5] bg-[#E8E6E0] overflow-hidden">
                    <img
                      src={dentist.image}
                      alt={`${dentist.name} - ${dentist.role} at Camberwell Junction Dental`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Subtle aesthetic gradient overlay at bottom of photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent opacity-60 pointer-events-none" />

                    {/* Role Pill Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span
                        className={`text-xs font-semibold px-3.5 py-1 rounded-full ${
                          isPrincipal
                            ? 'bg-[#5B827F] text-white shadow-xs'
                            : 'bg-white/95 backdrop-blur-md text-[#1A1A1A] border border-[#E5E2DA] shadow-2xs'
                        }`}
                      >
                        {dentist.role}
                      </span>
                    </div>

                    {/* Availability Tag */}
                    <div className="absolute bottom-3.5 right-3.5">
                      <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#1A1A1A]/80 text-[#E5E2DA] backdrop-blur-xs shadow-xs">
                        {dentist.availableDays}
                      </span>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#5B827F] transition-colors">
                        {dentist.name}
                      </h3>
                    </div>
                    <p className="text-xs font-bold text-[#5B827F] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>{dentist.role}</span>
                    </p>
                    <p className="text-sm text-[#666666] leading-relaxed mb-2">
                      {dentist.bio}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0">
                  <button
                    onClick={() => onBookWithDentist(dentist.id)}
                    className="w-full py-3 px-4 rounded-full border border-[#D1CEC6] group-hover:border-[#5B827F] text-[#1A1A1A] group-hover:text-white group-hover:bg-[#5B827F] text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs group-hover:shadow-md active:scale-[0.98]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book with {dentist.name.replace('Dr ', '')}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Team Overview Callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:px-8 sm:py-4 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
            <div className="flex items-center gap-2 text-sm text-[#555555]">
              <Shield className="w-4 h-4 text-[#5B827F]" />
              <span>Welcoming all existing & new patients to Camberwell Junction Dental</span>
            </div>
            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 rounded-full bg-[#5B827F] text-white text-xs sm:text-sm font-semibold hover:bg-[#4A6B68] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xs"
            >
              Request an Appointment
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
