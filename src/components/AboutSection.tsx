import React, { useState } from 'react';
import { MagneticButton } from './MagneticButton.tsx';

interface AboutSectionProps {
  bookingLink: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ bookingLink }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-20 sm:py-28 md:py-36 px-5 sm:px-8 max-w-3xl mx-auto bg-[#F6F1E7]">
      <div className="border border-[rgba(31,36,41,0.12)] rounded-[28px] p-8 sm:p-12 md:p-16 bg-[#F6F1E7] shadow-xs">
        {/* Header with me.jpg small and round */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border border-[rgba(31,36,41,0.16)] bg-gradient-to-br from-[#1F2429] to-[#3E5C76] relative flex items-center justify-center">
            <span className="font-serif text-2xl text-[#F6F1E7] font-normal select-none">
              YR
            </span>
            {!imgError && (
              <img
                src="/me.jpg"
                alt="Yashasvi Rai"
                onError={() => setImgError(true)}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>

          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#1F2429]/60">
              About me
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1F2429] font-medium tracking-tight">
              A note from Yashasvi Rai
            </h2>
          </div>
        </div>

        {/* Letter body */}
        <div className="space-y-5 text-[18px] sm:text-[20px] leading-[1.65] text-[#1F2429]/85 font-normal max-w-[68ch]">
          <p>
            I am a fresher with new-gen ideas to upgrade businesses.
          </p>
          <p>
            I run Nero from Chennai to solve a real headache for business owens: your enquiries and repair notes belong in one clean place, not scattered across chats and paper. I build the form, set up the list, and keep it running for you.
          </p>
        </div>

        {/* Handwritten signature in Caveat font */}
        <div className="mt-8 pt-4">
          <p
            className="text-4xl sm:text-5xl text-[#1F2429] font-normal select-none"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Yashasvi
          </p>
          <p className="text-xs uppercase tracking-wider text-[#1F2429]/60 mt-1 font-semibold">
            Founder of Nero, Chennai
          </p>
        </div>

        {/* Booking button under letter */}
        <div className="mt-10 pt-8 border-t border-[rgba(31,36,41,0.12)]">
          <MagneticButton
            href={bookingLink}
            className="px-8 py-4 rounded-full text-base font-semibold bg-[#E8A33D] text-[#1F2429] hover:bg-[#dba032] shadow-sm"
          >
            Book a 20 minute call with Yashasvi
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
