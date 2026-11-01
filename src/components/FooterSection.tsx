import React from 'react';

interface FooterSectionProps {
  bookingLink: string;
  whatsappNumber: string;
  email: string;
  city: string;
  businessName: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  bookingLink,
  whatsappNumber,
  email,
  city,
  businessName,
}) => {
  return (
    <footer
      id="footer"
      data-theme="ink"
      className="relative bg-[#1F2429] text-[#F6F1E7] film-grain py-14 sm:py-20 px-5 sm:px-8 border-t border-[rgba(246,241,231,0.12)]"
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Logo on cream rounded panel + City */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="bg-[#F6F1E7] px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 shadow-xs">
            <img
              src="/logo.png"
              alt={businessName}
              className="h-6 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-serif text-xl tracking-wider font-semibold text-[#1F2429]">
              {businessName.toUpperCase()}
            </span>
          </div>

          <span className="text-sm text-[#F6F1E7]/60 tracking-wide">
            {city}
          </span>
        </div>

        {/* Center: Three contact links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#F6F1E7]/80">
          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E8A33D] transition-colors"
          >
            Book a 20 minute call
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E8A33D] transition-colors"
          >
            Message me on WhatsApp
          </a>
          <a
            href={`mailto:${email}`}
            className="hover:text-[#E8A33D] transition-colors"
          >
            {email}
          </a>
        </div>

        {/* Right: Year and Business name */}
        <div className="text-sm text-[#F6F1E7]/60">
          © 2026 {businessName}
        </div>
      </div>
    </footer>
  );
};
