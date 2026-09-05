import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation, 
  Calendar, 
  ExternalLink,
  Car,
  Train
} from 'lucide-react';
import { motion } from 'motion/react';
import { PRACTICE_INFO, OPENING_HOURS } from '../data/practiceData';

interface ContactAndLocationProps {
  onOpenBooking: () => void;
}

export const ContactAndLocation: React.FC<ContactAndLocationProps> = ({ onOpenBooking }) => {
  const [currentDayName, setCurrentDayName] = useState<string>('');
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false);

  useEffect(() => {
    // Check Melbourne local time
    try {
      const now = new Date();
      const melbourneTimeStr = now.toLocaleString('en-US', { timeZone: 'Australia/Melbourne' });
      const melbourneDate = new Date(melbourneTimeStr);
      
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = dayNames[melbourneDate.getDay()];
      setCurrentDayName(day);

      const hours = melbourneDate.getHours();
      const minutes = melbourneDate.getMinutes();
      const decimalTime = hours + minutes / 60;

      if (day === 'Sunday') {
        setIsOpenNow(false);
      } else if (day === 'Saturday') {
        setIsOpenNow(decimalTime >= 8.75 && decimalTime < 15.5);
      } else {
        setIsOpenNow(decimalTime >= 8.25 && decimalTime < 17.25);
      }
    } catch {
      setCurrentDayName('Today');
    }
  }, []);

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F0EEE9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E6E0] text-[#5B827F] text-xs font-bold tracking-wide uppercase mb-3 border border-[#E5E2DA]"
          >
            <span className="w-2 h-2 rounded-full bg-[#5B827F]" />
            Contact & Visit
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight mb-4"
          >
            Find Us in Camberwell
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-base sm:text-lg text-[#555555] leading-relaxed"
          >
            Conveniently located at Camberwell Junction with easy parking and direct access via trains and trams.
          </motion.p>
        </div>

        {/* Main Grid: Practice Details & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Contact Cards & Opening Hours */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6"
          >
            
            {/* Business Contact Card */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E5E2DA] shadow-xs">
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">
                {PRACTICE_INFO.name}
              </h3>
              <p className="text-sm text-[#666666] mb-6">
                Professional dental care for individuals and families in Camberwell VIC.
              </p>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#5B827F]/10 text-[#5B827F] flex items-center justify-center shrink-0 border border-[#5B827F]/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider">Practice Address</span>
                    <p className="text-sm font-bold text-[#1A1A1A]">
                      {PRACTICE_INFO.address.street}
                    </p>
                    <p className="text-xs text-[#666666]">
                      {PRACTICE_INFO.address.suburb} {PRACTICE_INFO.address.state} {PRACTICE_INFO.address.postcode}, {PRACTICE_INFO.address.country}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#5B827F]/10 text-[#5B827F] flex items-center justify-center shrink-0 border border-[#5B827F]/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider">Telephone</span>
                    <a
                      href={`tel:${PRACTICE_INFO.phoneClean}`}
                      className="text-sm font-bold text-[#5B827F] hover:underline"
                    >
                      {PRACTICE_INFO.phone}
                    </a>
                    <span className="block text-[11px] text-[#888888]">Direct reception bookings & enquiries</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#5B827F]/10 text-[#5B827F] flex items-center justify-center shrink-0 border border-[#5B827F]/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#888888] uppercase tracking-wider">Email</span>
                    <a
                      href={`mailto:${PRACTICE_INFO.email}`}
                      className="text-sm font-semibold text-[#1A1A1A] hover:text-[#5B827F]"
                    >
                      {PRACTICE_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[#E5E2DA] flex flex-wrap gap-3">
                <a
                  href={PRACTICE_INFO.address.googleMapsDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-xs sm:text-sm font-semibold hover:bg-[#5B827F] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>

                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5B827F] text-white text-xs sm:text-sm font-semibold hover:bg-[#4A6B68] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>

            {/* Opening Hours Table Card */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E5E2DA] shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#5B827F]" />
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Opening Hours</h3>
                </div>

                {/* Live Status Pill */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    isOpenNow
                      ? 'bg-[#5B827F]/10 text-[#5B827F] border border-[#5B827F]/20'
                      : 'bg-[#F0EEE9] text-[#666666] border border-[#E5E2DA]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-[#5B827F] animate-pulse' : 'bg-[#888888]'}`}
                  />
                  {isOpenNow ? 'Open Now (Melbourne Time)' : 'Closed Now (Melbourne Time)'}
                </span>
              </div>

              <div className="space-y-2 divide-y divide-[#E5E2DA]">
                {OPENING_HOURS.map((slot) => {
                  const isToday = currentDayName === slot.day;
                  return (
                    <div
                      key={slot.day}
                      className={`flex items-center justify-between py-2 text-xs sm:text-sm ${
                        isToday ? 'font-bold text-[#5B827F] bg-[#5B827F]/10 px-2.5 rounded-lg' : 'text-[#555555]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {slot.day}
                        {isToday && <span className="text-[10px] text-[#5B827F] font-bold uppercase">(Today)</span>}
                      </span>
                      <span className={slot.isOpen ? 'text-[#1A1A1A] font-medium' : 'text-[#888888]'}>
                        {slot.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive Map & Transit Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6"
          >
            
            {/* Map Embed Container */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E5E2DA] shadow-xs">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-[#E8E6E0] border border-[#E5E2DA]">
                <iframe
                  title="Camberwell Junction Dental Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d145.05697!3d-37.82772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6422b5efc1cbb%3A0x959e7a8370d97036!2s1%2F2%20Prospect%20Hill%20Rd%2C%20Camberwell%20VIC%203124!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
                  className="w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Map Label */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E5E2DA] shadow-xs text-xs font-bold text-[#1A1A1A]">
                  1/2 Prospect Hill Rd, Camberwell VIC
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#666666]">
                <span>Near Camberwell Junction & Burke Road shopping strip</span>
                <a
                  href={PRACTICE_INFO.address.googleMapsDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#5B827F] hover:underline flex items-center gap-1"
                >
                  Open in Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Parking & Transport Transit Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-[#E5E2DA]">
                <div className="flex items-center gap-2.5 mb-2 text-[#5B827F]">
                  <Car className="w-4 h-4" />
                  <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Parking</span>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Street parking available along Prospect Hill Road and adjacent streets, plus multi-level parking at The Well (2 mins walk).
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-[#E5E2DA]">
                <div className="flex items-center gap-2.5 mb-2 text-[#5B827F]">
                  <Train className="w-4 h-4" />
                  <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Public Transport</span>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">
                  250m to Camberwell Railway Station (Belgrave, Lilydale, Alamein lines) and Tram Routes 70 & 75 right at the junction.
                </p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
