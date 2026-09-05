import React from 'react';
import { Calendar, UserCheck, HeartPulse, Smile, ArrowRight } from 'lucide-react';
import { PATIENT_JOURNEY_STEPS } from '../data/practiceData';

interface PatientJourneyProps {
  onOpenBooking: () => void;
}

export const PatientJourney: React.FC<PatientJourneyProps> = ({ onOpenBooking }) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0: return Calendar;
      case 1: return UserCheck;
      case 2: return HeartPulse;
      case 3: return Smile;
      default: return Calendar;
    }
  };

  return (
    <section id="patient-journey" className="py-20 md:py-28 bg-[#F9F8F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E6E0] text-[#5B827F] text-xs font-bold tracking-wide uppercase mb-3 border border-[#E5E2DA]">
            Your Experience
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight mb-4">
            A Seamless Patient Journey
          </h2>
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            From your very first enquiry to maintaining long-term oral wellness, we make every step of your dental care straightforward, comfortable, and transparent.
          </p>
        </div>

        {/* 4 Steps with connecting line */}
        <div className="relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-[#E5E2DA] -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PATIENT_JOURNEY_STEPS.map((stepItem, idx) => {
              const Icon = getStepIcon(idx);
              return (
                <div
                  key={stepItem.step}
                  className="bg-white rounded-2xl p-7 border border-[#E5E2DA] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Step Number Badge & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="w-9 h-9 rounded-full bg-[#5B827F] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        {stepItem.step}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#5B827F]/10 text-[#5B827F] flex items-center justify-center border border-[#5B827F]/20">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-2.5">
                      {stepItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#E5E2DA] text-[11px] font-bold text-[#5B827F] flex items-center gap-1">
                    <span>Step {idx + 1} of 4</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#5B827F] text-white text-sm font-semibold hover:bg-[#4A6B68] shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Start Your Journey — Book an Appointment</span>
          </button>
        </div>

      </div>
    </section>
  );
};
