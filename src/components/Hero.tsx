import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MagneticButton } from './MagneticButton.tsx';
import { FallbackPanel } from './FallbackPanel.tsx';

interface HeroProps {
  bookingLink: string;
  whatsappNumber: string;
}

export const Hero: React.FC<HeroProps> = ({ bookingLink, whatsappNumber }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Arch picture moves a little slower than the page
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={containerRef}
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-32 px-5 sm:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left text column (on phone sits below arch: order-2 lg:order-1) */}
        <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center">
          {/* Small line */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <span className="text-sm sm:text-base font-semibold tracking-wider uppercase text-[#1F2429]/75">
              For business owens in Chennai
            </span>
          </motion.div>

          {/* Headline in very large serif type */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={shouldReduceMotion ? false : { y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-serif text-[44px] sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.0] text-[#1F2429] tracking-tight"
            >
              Every enquiry and repair, in{' '}
              <span className="italic text-[#E8A33D] font-normal">one</span> place.
            </motion.h1>
          </div>

          {/* One plain line saying what I set up */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="text-[17px] sm:text-[18px] leading-[1.6] text-[#1F2429]/85 max-w-[68ch] mb-8 font-normal"
          >
            I build a simple form and a plain list that shows every enquiry and repair in one place, then hand it over for a one time setup fee and a small monthly fee to keep it running.
          </motion.p>

          {/* Buttons: Book a 20 min call & WhatsApp */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <MagneticButton
              href={bookingLink}
              className="px-8 py-4 rounded-full text-base font-semibold bg-[#E8A33D] text-[#1F2429] hover:bg-[#dba032] shadow-sm tracking-normal"
            >
              Book a 20 minute call
            </MagneticButton>

            <MagneticButton
              href={`https://wa.me/${whatsappNumber}`}
              className="px-6 py-4 rounded-full text-base font-medium text-[#1F2429] hover:bg-[#1F2429]/5 border border-[rgba(31,36,41,0.18)]"
            >
              Message me on WhatsApp
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right arch frame picture (on phone sits above text: order-1 lg:order-2) */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
          <motion.div
            style={shouldReduceMotion ? {} : { y: parallaxY }}
            initial={
              shouldReduceMotion
                ? false
                : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }
            }
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none aspect-[4/5] sm:aspect-[3/4]"
          >
            {/* Arch frame container */}
            <div className="w-full h-full arch-frame overflow-hidden shadow-md border border-[rgba(31,36,41,0.12)]">
              <FallbackPanel
                imageSrc="/me.jpg"
                altText="Yashasvi Rai"
                outlineText="YR"
                isArch={true}
              />
            </div>

            {/* Small floating card on its corner */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="absolute bottom-4 left-4 sm:bottom-6 sm:-left-4 lg:-bottom-5 lg:-left-6 bg-[#F6F1E7]/95 backdrop-blur-md border border-[rgba(31,36,41,0.14)] px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-xl z-20"
            >
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#E8A33D] mb-0.5">
                Founder of Nero
              </p>
              <p className="font-serif text-lg sm:text-xl font-medium text-[#1F2429] leading-tight">
                Yashasvi Rai
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
