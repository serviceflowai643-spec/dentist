import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { PRACTICE_INFO } from '../data/practiceData';

interface MobileActionBarProps {
  onOpenBooking: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E5E2DA] p-3 shadow-lg lg:hidden">
      <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
        {/* Call Button */}
        <a
          id="mobile-action-call"
          href={`tel:${PRACTICE_INFO.phoneClean}`}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[#5B827F] text-[#5B827F] font-bold text-sm bg-[#F9F8F6] active:bg-[#5B827F]/10 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>Call Practice</span>
        </a>

        {/* Book Button */}
        <button
          id="mobile-action-book"
          onClick={onOpenBooking}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#5B827F] text-white font-bold text-sm active:bg-[#4A6B68] shadow-sm transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Online</span>
        </button>
      </div>
    </div>
  );
};
