import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUp, Calendar, Heart, Shield } from 'lucide-react';
import { PRACTICE_INFO, OPENING_HOURS, SERVICES } from '../data/practiceData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPatientInfo: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'accessibility') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenPatientInfo, onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Our Dentists', href: '#dentists' },
    { label: 'Services', href: '#services' },
    { label: 'Patient Information', onClick: onOpenPatientInfo },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#1A1A1A] text-[#D1CEC6] pt-16 pb-28 lg:pb-16 border-t border-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#2D2D2D]">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5B827F] text-white flex items-center justify-center font-bold">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M12 2C7.5 2 4 4.5 4 8c0 3 1.5 5.5 3 8.5 1 2 2 4.5 5 4.5s4-2.5 5-4.5c1.5-3 3-5.5 3-8.5 0-3.5-3.5-6-8-6z" />
                  <path d="M9 10c1 .5 2 .5 3 0" />
                </svg>
              </div>
              <div>
                <span className="block font-serif text-lg font-bold text-white tracking-tight">
                  {PRACTICE_INFO.name}
                </span>
                <span className="block text-[11px] font-bold tracking-widest text-[#8CB1AE] uppercase">
                  Camberwell VIC
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A09D95] leading-relaxed max-w-sm">
              Professional dental care for individuals and families in Camberwell. Providing gentle, high-quality general, preventive, and cosmetic dentistry.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5B827F] hover:bg-[#4A6B68] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book an Appointment</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-[#A09D95] hover:text-[#8CB1AE] transition-colors cursor-pointer text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-[#A09D95] hover:text-[#8CB1AE] transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Key Treatments */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Treatments
            </h4>
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-[#A09D95]">
              <li>• General & Preventive Care</li>
              <li>• Children's Dentistry (CDBS)</li>
              <li>• Cosmetic Dentistry & Whitening</li>
              <li>• Dental Implants & Bridges</li>
              <li>• Crowns, Veneers & Dentures</li>
              <li>• Root Canal & Gum Therapy</li>
              <li>• Wisdom Teeth Care</li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Practice Information
            </h4>
            <div className="space-y-2.5 text-xs text-[#A09D95]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8CB1AE] shrink-0 mt-0.5" />
                <span>1/2 Prospect Hill Road, Camberwell VIC 3124</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8CB1AE] shrink-0" />
                <a href={`tel:${PRACTICE_INFO.phoneClean}`} className="hover:text-white font-medium">
                  {PRACTICE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8CB1AE] shrink-0" />
                <a href={`mailto:${PRACTICE_INFO.email}`} className="hover:text-white truncate">
                  {PRACTICE_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#8CB1AE] shrink-0 mt-0.5" />
                <div>
                  <span className="block">Mon–Fri: 8:15 AM – 5:15 PM</span>
                  <span className="block">Sat: 8:45 AM – 3:30 PM</span>
                  <span className="block text-[#777777]">Sun: Closed</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <div>
            © {new Date().getFullYear()} Camberwell Junction Dental. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenLegal('accessibility')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Accessibility
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
