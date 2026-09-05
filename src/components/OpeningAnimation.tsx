import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OpeningAnimationProps {
  onComplete?: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total duration: 1.8 seconds before fading out completely
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1700);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="opening-curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F9F8F6] pointer-events-none select-none"
        >
          {/* Subtle ambient lighting */}
          <div className="absolute w-96 h-96 rounded-full bg-[#E8E6E0]/60 blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center justify-center text-center px-6 relative z-10">
            {/* 0.2s–0.9s: Logo Reveal (Fade in + slight scale 95%->100% + subtle upward shift) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#5B827F] text-white flex items-center justify-center shadow-lg mb-5"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-9 h-9 sm:w-11 sm:h-11"
              >
                <path d="M12 2C7.5 2 4 4.5 4 8c0 3 1.5 5.5 3 8.5 1 2 2 4.5 5 4.5s4-2.5 5-4.5c1.5-3 3-5.5 3-8.5 0-3.5-3.5-6-8-6z" />
                <path d="M9 10c1 .5 2 .5 3 0" />
              </svg>
            </motion.div>

            {/* 0.8s–1.3s: Brand Title & Tagline Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75, ease: 'easeOut' }}
            >
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
                Camberwell Junction Dental
              </h1>
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#5B827F] uppercase mt-1">
                Family & Preventive Dentistry
              </p>
            </motion.div>

            {/* Subtle progress indicator line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: 'easeInOut' }}
              className="w-24 h-[2px] bg-[#5B827F]/40 rounded-full mt-5 origin-center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
