import React, { useState } from 'react';
import { 
  Stethoscope, 
  Baby, 
  Sparkles, 
  Anchor, 
  Sun, 
  Activity, 
  HeartPulse, 
  Gem, 
  Smile, 
  ShieldAlert, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/practiceData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return Stethoscope;
      case 'Baby': return Baby;
      case 'Sparkles': return Sparkles;
      case 'Anchor': return Anchor;
      case 'Sun': return Sun;
      case 'Activity': return Activity;
      case 'HeartPulse': return HeartPulse;
      case 'Gem': return Gem;
      case 'Smile': return Smile;
      case 'ShieldAlert': return ShieldAlert;
      case 'Layers': return Layers;
      case 'ShieldCheck': return ShieldCheck;
      default: return Stethoscope;
    }
  };

  const categories = ['All', 'General', 'Preventive', 'Restorative', 'Cosmetic', 'Specialised'];

  const filteredServices = activeCategory === 'All'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F0EEE9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E6E0] text-[#5B827F] text-xs font-bold tracking-wide uppercase mb-3 border border-[#E5E2DA]"
          >
            <span className="w-2 h-2 rounded-full bg-[#5B827F]" />
            Our Dental Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight mb-4"
          >
            Dental Care For Every Stage Of Life
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-base sm:text-lg text-[#555555] leading-relaxed"
          >
            From routine check-ups and gentle children's dentistry to dental restorations and cosmetic care, our experienced dentists provide comprehensive, personalised care.
          </motion.p>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#5B827F] text-white shadow-xs scale-105'
                    : 'bg-white text-[#555555] hover:bg-[#E8E6E0] border border-[#E5E2DA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Services Grid (Staggered Scroll Reveal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredServices.map((service, index) => {
            const IconComponent = getServiceIcon(service.iconName);
            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (index % 6) * 0.08, ease: 'easeOut' }}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E2DA] hover:border-[#5B827F]/50 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#5B827F]/10 group-hover:bg-[#5B827F] text-[#5B827F] group-hover:text-white flex items-center justify-center transition-all border border-[#5B827F]/20 group-hover:border-transparent group-hover:scale-105 transform duration-300">
                      <IconComponent className="w-6 h-6 group-hover:rotate-6 transition-transform duration-300" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-[#777777] uppercase px-2.5 py-1 rounded-full bg-[#F0EEE9] border border-[#E5E2DA]">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#5B827F] transition-colors mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-[#E5E2DA] flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5B827F] group-hover:text-[#4A6B68] hover:underline cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onBookService(service.id)}
                    className="px-3.5 py-1.5 rounded-full bg-[#F0EEE9] hover:bg-[#5B827F] text-[#1A1A1A] hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
                    title={`Book for ${service.title}`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Booking Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#E8E6E0] border border-[#D1CEC6] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1A1A1A] mb-1">
              Need advice on the right treatment for you?
            </h3>
            <p className="text-sm text-[#555555]">
              Our dentists are here to discuss your concerns and design a tailored treatment plan.
            </p>
          </div>
          <button
            onClick={() => onBookService('general-dentistry')}
            className="shrink-0 px-7 py-3.5 rounded-full bg-[#5B827F] text-white font-semibold text-sm hover:bg-[#4A6B68] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Check-up</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
