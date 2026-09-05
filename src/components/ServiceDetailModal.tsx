import React from 'react';
import { X, Check, Calendar, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBook: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose, onBook }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E5E2DA] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-[#F9F8F6] border-b border-[#E5E2DA] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#5B827F] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#5B827F]/10 border border-[#5B827F]/20 inline-block mb-2">
              {service.category} Service
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#888888] hover:text-[#1A1A1A] hover:bg-[#E8E6E0] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-xs font-bold text-[#888888] uppercase tracking-wider mb-2">
              About This Treatment
            </h4>
            <p className="text-sm text-[#555555] leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Key Benefits */}
          <div>
            <h4 className="text-xs font-bold text-[#888888] uppercase tracking-wider mb-3">
              Key Patient Benefits
            </h4>
            <div className="space-y-2.5">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2D2D2D]">
                  <div className="w-5 h-5 rounded-full bg-[#5B827F]/15 text-[#5B827F] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Duration & Clinical Note */}
          <div className="p-4 rounded-xl bg-[#F9F8F6] border border-[#E5E2DA] flex items-center justify-between text-xs">
            <span className="text-[#666666] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#5B827F]" />
              Estimated Duration:
            </span>
            <span className="font-bold text-[#1A1A1A]">
              {service.durationEstimate || 'Consultation & Exam'}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 bg-[#F9F8F6] border-t border-[#E5E2DA] flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              onBook(service.id);
            }}
            className="flex-1 py-3 px-6 rounded-full bg-[#5B827F] hover:bg-[#4A6B68] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment for {service.title}</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full border border-[#E5E2DA] text-[#1A1A1A] text-xs sm:text-sm font-semibold hover:bg-[#E8E6E0] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
