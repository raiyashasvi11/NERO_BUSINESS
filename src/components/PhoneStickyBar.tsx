import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface PhoneStickyBarProps {
  bookingLink: string;
}

export const PhoneStickyBar: React.FC<PhoneStickyBarProps> = ({ bookingLink }) => {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Appear once hero scrolls away (~500px down)
      const scrolledPastHero = window.scrollY > 480;
      setVisible(scrolledPastHero);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={shouldReduceMotion ? false : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#F6F1E7]/95 backdrop-blur-md border-t border-[rgba(31,36,41,0.12)] md:hidden shadow-lg"
        >
          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-full text-center text-sm font-semibold bg-[#E8A33D] text-[#1F2429] shadow-sm flex items-center justify-center cursor-pointer active:scale-98 transition-transform"
          >
            Book a 20 minute call
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
