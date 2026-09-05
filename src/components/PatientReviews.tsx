import React, { useState } from 'react';
import { CheckCircle2, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { PATIENT_REVIEWS, PRACTICE_INFO } from '../data/practiceData';

interface PatientReviewsProps {
  onOpenBooking: () => void;
}

export const PatientReviews: React.FC<PatientReviewsProps> = ({ onOpenBooking }) => {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#F9F8F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Big Rating Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E6E0] text-[#5B827F] text-xs font-bold tracking-wide uppercase mb-3 border border-[#E5E2DA]">
              <span className="w-2 h-2 rounded-full bg-[#5B827F]" />
              Google Reviews & Patient Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight mb-4">
              What Our Patients Say
            </h2>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
              We are proud to maintain a trusted reputation among individuals and families across Camberwell, Hawthorn, Canterbury, and Melbourne's eastern suburbs.
            </p>
          </motion.div>

          {/* Rating Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E2DA] shadow-xs flex items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1A1A]">4.7</span>
                  <span className="text-sm font-semibold text-[#888888]">/ 5.0</span>
                </div>
                <div className="flex text-amber-500 text-lg mb-1 tracking-wider">
                  {'★★★★★'}
                </div>
                <p className="text-xs text-[#666666] font-medium">
                  Based on 98 Google Reviews
                </p>
              </div>

              <div className="text-right border-l border-[#E5E2DA] pl-6">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5B827F] bg-[#5B827F]/10 px-3 py-1 rounded-full mb-2 border border-[#5B827F]/20">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Practice
                </span>
                <p className="text-[11px] text-[#777777] block">
                  Camberwell VIC 3124
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Cards Grid (Staggered Animation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
          {PATIENT_REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: 'easeOut' }}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E5E2DA] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Source */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500 text-base tracking-wider">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#666666] bg-[#F9F8F6] px-3 py-1 rounded-full border border-[#E5E2DA]">
                    {review.source}
                  </span>
                </div>

                {/* Review Text */}
                <blockquote className="text-sm sm:text-base text-[#333333] leading-relaxed mb-6 italic">
                  "{review.text}"
                </blockquote>
              </div>

              {/* Author & Verification Tag */}
              <div className="pt-4 border-t border-[#E5E2DA] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#5B827F]/10 text-[#5B827F] font-bold text-xs flex items-center justify-center border border-[#5B827F]/20">
                    {review.author[0]}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1A1A1A]">{review.author}</span>
                    <span className="block text-[11px] text-[#888888]">{review.date}</span>
                  </div>
                </div>

                <span className="text-[11px] text-[#5B827F] font-semibold flex items-center gap-1 bg-[#5B827F]/10 px-2.5 py-1 rounded-full border border-[#5B827F]/20">
                  <CheckCircle2 className="w-3 h-3" /> Verified Patient
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={PRACTICE_INFO.address.googleMapsDirectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-[#E5E2DA] text-[#1A1A1A] text-sm font-semibold hover:bg-[#F0EEE9] hover:shadow-xs transition-all"
          >
            <span>See More Patient Reviews</span>
            <ExternalLink className="w-4 h-4 text-[#666666]" />
          </a>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#5B827F] text-white text-sm font-semibold hover:bg-[#4A6B68] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] shadow-xs transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book an Appointment</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
