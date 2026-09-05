import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { PRACTICE_INFO } from '../data/practiceData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'accessibility' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E5E2DA] overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#F9F8F6] border-b border-[#E5E2DA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#5B827F]/10 text-[#5B827F] flex items-center justify-center border border-[#5B827F]/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              {type === 'privacy' && 'Privacy Policy'}
              {type === 'terms' && 'Terms of Service'}
              {type === 'accessibility' && 'Accessibility Statement'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#888888] hover:text-[#1A1A1A] hover:bg-[#E8E6E0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 overflow-y-auto text-xs sm:text-sm text-[#555555] leading-relaxed space-y-4">
          {type === 'privacy' && (
            <>
              <p>
                At <strong>{PRACTICE_INFO.name}</strong>, we are committed to respecting and protecting the privacy of your personal and medical information in accordance with the Australian Privacy Principles (APPs) and the Privacy Act 1988 (Cth).
              </p>
              <h4 className="font-bold text-[#1A1A1A] text-sm">Collection of Health & Personal Information</h4>
              <p>
                We collect information necessary to deliver quality dental and healthcare services. This includes contact details, medical and dental history, diagnostic x-rays, and payment or private health insurance details.
              </p>
              <h4 className="font-bold text-[#1A1A1A] text-sm">Use & Disclosure</h4>
              <p>
                Your information is used strictly to provide dental diagnosis, clinical care, appointment scheduling, and electronic health fund processing (HICAPS). We never sell or share your data with third-party marketers.
              </p>
              <h4 className="font-bold text-[#1A1A1A] text-sm">Contact Us</h4>
              <p>
                If you have queries regarding your personal records or privacy, contact our practice at {PRACTICE_INFO.phone} or {PRACTICE_INFO.email}.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                Welcome to the website of <strong>{PRACTICE_INFO.name}</strong> (1/2 Prospect Hill Road, Camberwell VIC 3124).
              </p>
              <h4 className="font-bold text-[#1A1A1A] text-sm">Appointment Requests & Confirmations</h4>
              <p>
                Submitting an appointment request through our website indicates your preference. An appointment is only finalized once our team contacts you directly to confirm date and time availability.
              </p>
              <h4 className="font-bold text-[#1A1A1A] text-sm">General Information Disclaimer</h4>
              <p>
                Content on this website is for general educational purposes and does not replace individualized clinical examination and medical diagnosis by a registered dental practitioner.
              </p>
              <h4 className="font-bold text-[#1A1A1A] text-sm">Cancellations</h4>
              <p>
                We kindly request at least 24 hours notice for appointment rescheduling or cancellations so we may assist other patients in need.
              </p>
            </>
          )}

          {type === 'accessibility' && (
            <>
              <p>
                <strong>{PRACTICE_INFO.name}</strong> is committed to ensuring digital accessibility for all patients, including people with disabilities.
              </p>
              <h4 className="font-bold text-[#1A1A1A] text-sm">Design Standards</h4>
              <p>
                This website is built conforming to WCAG 2.1 AA guidelines, featuring readable typography contrast, keyboard navigation support, screen-reader semantic structures, and responsive touch targets.
              </p>
              <h4 className="font-bold text-[#1A1A1A] text-sm">Physical Clinic Accessibility</h4>
              <p>
                Our practice at 1/2 Prospect Hill Road, Camberwell provides accessible entry options. If you require special mobility assistance or accommodations during your visit, please inform us when booking.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F9F8F6] border-t border-[#E5E2DA] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#5B827F] text-white text-xs font-semibold hover:bg-[#4A6B68] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
