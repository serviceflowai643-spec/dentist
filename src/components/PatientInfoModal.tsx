import React from 'react';
import { X, CreditCard, ShieldCheck, MapPin, CheckCircle, FileText, Calendar, Phone } from 'lucide-react';
import { PATIENT_INFO_ITEMS, PRACTICE_INFO } from '../data/practiceData';

interface PatientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const PatientInfoModal: React.FC<PatientInfoModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E5E2DA] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 bg-[#F9F8F6] border-b border-[#E5E2DA] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#5B827F] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#5B827F]/10 border border-[#5B827F]/20 inline-block mb-2">
              Patient Guide
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Patient Information & FAQs
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

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Quick checklist */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DA]">
            <h4 className="font-serif text-base font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#5B827F]" />
              What to Bring to Your Appointment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#555555]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#5B827F]" />
                <span>Physical or Digital Private Health Fund card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#5B827F]" />
                <span>Medicare card (if eligible for CDBS)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#5B827F]" />
                <span>Current medication list or health notes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#5B827F]" />
                <span>Any previous dental x-rays if available</span>
              </div>
            </div>
          </div>

          {/* Detailed Info Cards */}
          <div className="space-y-4">
            {PATIENT_INFO_ITEMS.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-[#E5E2DA] bg-white">
                <h5 className="font-bold text-sm text-[#1A1A1A] mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5B827F]" />
                  {item.title}
                </h5>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 sm:px-8 bg-[#F9F8F6] border-t border-[#E5E2DA] flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`tel:${PRACTICE_INFO.phoneClean}`}
            className="text-xs font-bold text-[#5B827F] hover:underline flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            Questions? Call us at {PRACTICE_INFO.phone}
          </a>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[#5B827F] hover:bg-[#4A6B68] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#E5E2DA] text-[#1A1A1A] text-xs sm:text-sm font-semibold hover:bg-[#E8E6E0] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
