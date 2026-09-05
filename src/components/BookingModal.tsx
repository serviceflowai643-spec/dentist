import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SERVICES, DENTISTS, PRACTICE_INFO } from '../data/practiceData';
import { BookingRequest } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedDentistId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedDentistId,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState(preselectedServiceId || 'General Check-up & Clean');
  const [preferredDentist, setPreferredDentist] = useState(preselectedDentistId || 'Any Available Dentist');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (8:15 AM – 12:00 PM)');
  const [notes, setNotes] = useState('');
  
  // Anti-spam honeypot
  const [hpWebsite, setHpWebsite] = useState('');

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Client-side field validations
    const cleanName = fullName.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanNotes = notes.trim();

    if (!cleanName || cleanName.length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Phone validation
    const phoneCleanDigits = cleanPhone.replace(/[\s\-()]/g, '');
    if (!phoneCleanDigits || phoneCleanDigits.length < 8) {
      setErrorMessage('Please enter a valid phone number (at least 8 digits).');
      return;
    }

    if (!preferredDate) {
      setErrorMessage('Please select your preferred appointment date.');
      return;
    }

    const selectedDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
      setErrorMessage('Please select a valid date (today or in the future).');
      return;
    }

    if (!preferredTime) {
      setErrorMessage('Please select a preferred time window.');
      return;
    }

    if (!reason) {
      setErrorMessage('Please choose a reason or service for your visit.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/appointments/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          preferredDate,
          preferredTime,
          reason,
          preferredDentist,
          notes: cleanNotes,
          hp_website: hpWebsite, // Bot honeypot
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "We couldn't submit your request right now. Please call us directly to arrange your appointment.");
      }

      // Successful server-side dispatch
      const newBooking: BookingRequest = {
        id: data.bookingId || `CJD-${Date.now().toString().slice(-6)}`,
        fullName: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        reason: reason,
        preferredDentist: preferredDentist,
        preferredDate: preferredDate,
        preferredTime: preferredTime,
        notes: cleanNotes,
        createdAt: new Date().toISOString(),
        status: 'Pending Confirmation',
      };

      // Save for local reference
      try {
        const existing = JSON.parse(localStorage.getItem('cjd_bookings') || '[]');
        existing.push(newBooking);
        localStorage.setItem('cjd_bookings', JSON.stringify(existing));
      } catch {
        // ignore local storage error
      }

      setSubmittedBooking(newBooking);
      setIsSubmitted(true);
      setErrorMessage('');

      // Reset form fields after successful submission
      setFullName('');
      setPhone('');
      setEmail('');
      setNotes('');
      setHpWebsite('');
    } catch (err: unknown) {
      console.error('Booking submission error:', err);
      setErrorMessage(
        "We couldn't submit your request right now. Please call us directly to arrange your appointment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setSubmittedBooking(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E5E2DA] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 bg-[#F9F8F6] border-b border-[#E5E2DA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5B827F] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                {isSubmitted ? 'Appointment Request Sent' : 'Request an Appointment'}
              </h3>
              <p className="text-xs text-[#666666]">
                Camberwell Junction Dental • (03) 9882 1187
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-[#888888] hover:text-[#1A1A1A] hover:bg-[#E8E6E0] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {isSubmitted && submittedBooking ? (
            <div className="text-center py-2 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#5B827F]/15 border border-[#5B827F]/30 text-[#5B827F] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">
                  Request Received
                </h4>
                <p className="text-sm font-medium text-[#2D4543] bg-[#5B827F]/10 p-4 rounded-2xl border border-[#5B827F]/20 max-w-md mx-auto leading-relaxed">
                  Thank you! Your appointment request has been received. Our team will contact you shortly to confirm your appointment.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-[#F9F8F6] rounded-2xl p-5 border border-[#E5E2DA] text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between pb-2 border-b border-[#E5E2DA]">
                  <span className="text-[#888888]">Reference ID</span>
                  <span className="font-mono font-bold text-[#5B827F]">{submittedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Patient Name</span>
                  <span className="font-bold text-[#1A1A1A]">{submittedBooking.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Email</span>
                  <span className="font-semibold text-[#1A1A1A]">{submittedBooking.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Phone Contact</span>
                  <span className="font-semibold text-[#1A1A1A]">{submittedBooking.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Service / Reason</span>
                  <span className="font-semibold text-[#1A1A1A]">{submittedBooking.reason}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Dentist</span>
                  <span className="font-semibold text-[#1A1A1A]">{submittedBooking.preferredDentist}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E5E2DA]">
                  <span className="text-[#888888]">Requested Date & Time</span>
                  <span className="font-semibold text-[#1A1A1A]">{submittedBooking.preferredDate} ({submittedBooking.preferredTime})</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`tel:${PRACTICE_INFO.phoneClean}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#5B827F] text-[#5B827F] text-xs font-semibold hover:bg-[#5B827F]/10 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call (03) 9882 1187</span>
                </a>
                <button
                  onClick={handleClose}
                  className="px-7 py-3 rounded-full bg-[#5B827F] text-white text-xs font-semibold hover:bg-[#4A6B68] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Spam Honeypot Field (hidden for users, filled only by dumb bots) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="hp_website">Website</label>
                <input
                  type="text"
                  id="hp_website"
                  name="hp_website"
                  value={hpWebsite}
                  onChange={(e) => setHpWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Error Message Banner */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm space-y-2">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">{errorMessage}</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <a
                      href={`tel:${PRACTICE_INFO.phoneClean}`}
                      className="inline-flex items-center gap-1.5 font-bold text-red-700 hover:text-red-900 underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call (03) 9882 1187 directly</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Informational Guidance Notice */}
              <div className="p-3.5 rounded-2xl bg-[#5B827F]/10 border border-[#5B827F]/20 text-xs text-[#2D4543] flex items-start gap-2.5">
                <span className="text-base leading-none">💡</span>
                <span>
                  Submit your request below. Our friendly reception team will check the appointment book and contact you shortly to confirm your exact time.
                </span>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Patient Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#888888] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    placeholder="e.g. Sarah Jenkins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E2DA] focus:outline-none focus:ring-2 focus:ring-[#5B827F]/30 focus:border-[#5B827F] text-sm text-[#1A1A1A] bg-[#F9F8F6]/60 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      disabled={isSubmitting}
                      placeholder="e.g. sarah@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E2DA] focus:outline-none focus:ring-2 focus:ring-[#5B827F]/30 focus:border-[#5B827F] text-sm text-[#1A1A1A] bg-[#F9F8F6]/60 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#888888] absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      disabled={isSubmitting}
                      placeholder="e.g. 0412 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E2DA] focus:outline-none focus:ring-2 focus:ring-[#5B827F]/30 focus:border-[#5B827F] text-sm text-[#1A1A1A] bg-[#F9F8F6]/60 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Reason for Visit / Service */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Reason for Visit / Treatment <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  disabled={isSubmitting}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2DA] focus:outline-none focus:ring-2 focus:ring-[#5B827F]/30 focus:border-[#5B827F] text-sm text-[#1A1A1A] bg-[#F9F8F6]/60 disabled:opacity-50 cursor-pointer"
                >
                  <option value="General Check-up & Clean">General Check-up & Clean</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title} ({s.category})
                    </option>
                  ))}
                  <option value="Emergency Dental / Tooth Pain">Emergency Dental / Tooth Pain</option>
                  <option value="Children Dentistry">Children's Dental Check-up</option>
                  <option value="Cosmetic Consultation (Veneers / Whitening)">Cosmetic Consultation (Veneers / Whitening)</option>
                  <option value="Other Consultation">Other Dental Concern</option>
                </select>
              </div>

              {/* Preferred Dentist */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Preferred Dentist (Optional)
                </label>
                <select
                  disabled={isSubmitting}
                  value={preferredDentist}
                  onChange={(e) => setPreferredDentist(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2DA] focus:outline-none focus:ring-2 focus:ring-[#5B827F]/30 focus:border-[#5B827F] text-sm text-[#1A1A1A] bg-[#F9F8F6]/60 disabled:opacity-50 cursor-pointer"
                >
                  <option value="Any Available Dentist">Any Available Dentist</option>
                  {DENTISTS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#888888] absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="date"
                      required
                      disabled={isSubmitting}
                      min={new Date().toISOString().split('T')[0]}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E2DA] focus:outline-none focus:ring-2 focus:ring-[#5B827F]/30 focus:border-[#5B827F] text-sm text-[#1A1A1A] bg-[#F9F8F6]/60 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                    Preferred Time Window <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#888888] absolute left-3.5 top-3 pointer-events-none" />
                    <select
                      required
                      disabled={isSubmitting}
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E2DA] focus:outline-none focus:ring-2 focus:ring-[#5B827F]/30 focus:border-[#5B827F] text-sm text-[#1A1A1A] bg-[#F9F8F6]/60 disabled:opacity-50 cursor-pointer"
                    >
                      <option value="Morning (8:15 AM – 12:00 PM)">Morning (8:15 AM – 12:00 PM)</option>
                      <option value="Early Afternoon (12:00 PM – 2:30 PM)">Early Afternoon (12:00 PM – 2:30 PM)</option>
                      <option value="Late Afternoon (2:30 PM – 5:15 PM)">Late Afternoon (2:30 PM – 5:15 PM)</option>
                      <option value="Saturday (8:45 AM – 3:30 PM)">Saturday (8:45 AM – 3:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Additional Message / Symptoms (Optional)
                </label>
                <textarea
                  rows={2}
                  disabled={isSubmitting}
                  placeholder="Any particular concerns, sensitivity, dental health history, or preferences..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2DA] focus:outline-none focus:ring-2 focus:ring-[#5B827F]/30 focus:border-[#5B827F] text-sm text-[#1A1A1A] bg-[#F9F8F6]/60 resize-none disabled:opacity-50"
                />
              </div>

              {/* Submit Button with Loading State */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-appointment-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-[#5B827F] hover:bg-[#4A6B68] disabled:bg-[#5B827F]/60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Request Appointment</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-[#888888] mt-2">
                  No immediate payment required. Our team will verify appointment availability.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
