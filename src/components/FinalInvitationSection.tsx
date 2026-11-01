import React from 'react';
import { MagneticButton } from './MagneticButton.tsx';

interface FinalInvitationSectionProps {
  bookingLink: string;
  whatsappNumber: string;
  email: string;
}

export const FinalInvitationSection: React.FC<FinalInvitationSectionProps> = ({
  bookingLink,
  whatsappNumber,
  email,
}) => {
  return (
    <section
      id="invitation"
      data-theme="ink"
      className="relative bg-[#1F2429] text-[#F6F1E7] film-grain py-24 sm:py-32 md:py-40 px-5 sm:px-8 border-t border-[rgba(246,241,231,0.08)] text-center overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Big serif headline */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F6F1E7] tracking-tight leading-[1.04] mb-10 max-w-[20ch]">
          Let's give your evenings back
        </h2>

        {/* Booking button in accent colour */}
        <div className="mb-8">
          <MagneticButton
            href={bookingLink}
            className="px-9 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold bg-[#E8A33D] text-[#1F2429] hover:bg-[#dba032] shadow-md tracking-normal"
          >
            Book a 20 minute call
          </MagneticButton>
        </div>

        {/* WhatsApp and email as plain links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[16px] text-[#F6F1E7]/80">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E8A33D] transition-colors underline underline-offset-4 decoration-[rgba(246,241,231,0.3)] hover:decoration-[#E8A33D]"
          >
            Message me on WhatsApp
          </a>
          <span className="hidden sm:inline text-[#F6F1E7]/25">•</span>
          <a
            href={`mailto:${email}`}
            className="hover:text-[#E8A33D] transition-colors underline underline-offset-4 decoration-[rgba(246,241,231,0.3)] hover:decoration-[#E8A33D]"
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  );
};
