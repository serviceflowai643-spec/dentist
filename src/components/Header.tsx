import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Clock, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { PRACTICE_INFO } from '../data/practiceData';

interface HeaderProps {
  onOpenBooking: (serviceId?: string, dentistId?: string) => void;
  onOpenPatientInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenPatientInfo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Our Dentists', href: '#dentists' },
    { label: 'Services', href: '#services' },
    { label: 'Patient Information', onClick: onOpenPatientInfo },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (link: { label: string; href?: string; onClick?: () => void }) => {
    setMobileMenuOpen(false);
    if (link.onClick) {
      link.onClick();
    } else if (link.href) {
      const element = document.querySelector(link.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Notification / Quick Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.35, ease: 'easeOut' }}
        className="bg-[#1A1A1A] text-[#E5E2DA] text-xs py-2 px-4 border-b border-[#2D2D2D] hidden md:block"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-[#D1CEC6]">
              <MapPin className="w-3.5 h-3.5 text-[#5B827F]" />
              {PRACTICE_INFO.address.full}
            </span>
            <span className="flex items-center gap-1.5 text-[#D1CEC6]">
              <Clock className="w-3.5 h-3.5 text-[#5B827F]" />
              Mon–Fri 8:15am–5:15pm | Sat 8:45am–3:30pm
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[#F2B66D] flex items-center gap-1 font-medium">
              ★ 4.7/5 on Google (98 Reviews)
            </span>
            <span className="text-[#555555]">|</span>
            <a
              href={`tel:${PRACTICE_INFO.phoneClean}`}
              className="font-medium text-white hover:text-[#5B827F] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#5B827F]" />
              {PRACTICE_INFO.phone}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main Sticky Header */}
      <motion.header
        id="main-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 1.4, ease: 'easeOut' }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F9F8F6]/95 backdrop-blur-md shadow-xs border-b border-[#E5E2DA] py-3'
            : 'bg-[#F9F8F6] py-4 md:py-5 border-b border-[#E5E2DA]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo / Wordmark */}
          <motion.a
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.45 }}
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Camberwell Junction Dental Home"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#5B827F] text-white flex items-center justify-center shadow-xs group-hover:bg-[#4A6B68] transition-colors">
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
              <span className="block font-serif text-lg md:text-xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#5B827F] transition-colors">
                Camberwell Junction
              </span>
              <span className="block text-[10px] md:text-[11px] font-semibold tracking-[0.2em] text-[#5B827F] uppercase -mt-0.5">
                Dental Practice
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link, idx) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 1.55 + idx * 0.05 }}
                onClick={() => handleNavClick(link)}
                className="text-[14px] font-medium text-[#555555] hover:text-[#5B827F] transition-colors cursor-pointer py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#5B827F] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3 md:space-x-4">
            {/* Phone CTA */}
            <motion.a
              id="header-phone-btn"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 1.75 }}
              href={`tel:${PRACTICE_INFO.phoneClean}`}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#1A1A1A] hover:text-[#5B827F] hover:bg-[#E8E6E0] transition-all duration-200 hover:-translate-y-0.5"
              aria-label="Call Camberwell Junction Dental"
            >
              <Phone className="w-4 h-4 text-[#5B827F]" />
              <span className="font-semibold">{PRACTICE_INFO.phone}</span>
            </motion.a>

            {/* Book Appointment CTA Button */}
            <motion.button
              id="header-book-btn"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.85 }}
              onClick={() => onOpenBooking()}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#5B827F] text-white text-xs sm:text-sm font-semibold hover:bg-[#4A6B68] hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] shadow-xs transition-all duration-200 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="px-3.5 py-1.5 rounded-full bg-[#5B827F] text-white text-xs font-semibold hover:bg-[#4A6B68] active:scale-[0.98] transition-all"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#1A1A1A] hover:bg-[#E8E6E0] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#F9F8F6] border-b border-[#E5E2DA] px-4 pt-3 pb-6 mt-3 space-y-3"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="text-left py-2 px-3 rounded-lg text-base font-medium text-[#1A1A1A] hover:bg-[#E8E6E0] hover:text-[#5B827F] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E5E2DA] flex flex-col gap-2.5">
              <a
                href={`tel:${PRACTICE_INFO.phoneClean}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-[#5B827F] text-[#5B827F] font-semibold text-sm hover:bg-[#5B827F]/10"
              >
                <Phone className="w-4 h-4" />
                Call {PRACTICE_INFO.phone}
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#5B827F] text-white font-semibold text-sm shadow-xs hover:bg-[#4A6B68]"
              >
                <Calendar className="w-4 h-4" />
                Book an Appointment
              </button>
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
};
