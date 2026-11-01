import React, { useEffect, useState } from 'react';
import { MagneticButton } from './MagneticButton.tsx';

interface TopBarProps {
  bookingLink: string;
}

export const TopBar: React.FC<TopBarProps> = ({ bookingLink }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOverInk, setIsOverInk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // Check if top bar sits over an ink section
      const inkSections = document.querySelectorAll<HTMLElement>('[data-theme="ink"]');
      let overInk = false;
      const topBarHeight = 72;

      inkSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= topBarHeight && rect.bottom >= 0) {
          overInk = true;
        }
      });

      setIsOverInk(overInk);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine bar background and colors
  let barBg = 'bg-transparent text-[#1F2429] border-transparent';
  if (scrolled) {
    if (isOverInk) {
      // ink with cream text
      barBg = 'bg-[#1F2429] text-[#F6F1E7] border-b border-[rgba(246,241,231,0.12)]';
    } else {
      // cream with hairline border
      barBg = 'bg-[#F6F1E7] text-[#1F2429] border-b border-[rgba(31,36,41,0.12)]';
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${barBg}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="Nero Home">
          {isOverInk ? (
            <div className="bg-[#F6F1E7] px-3 py-1.5 rounded-full inline-flex items-center shadow-xs">
              <img
                src="/logo.png"
                alt="Nero"
                className="h-6 w-auto object-contain"
                onError={(e) => {
                  // Fallback if logo file is somehow not found
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-serif text-xl tracking-wider font-semibold text-[#1F2429] ml-1">
                NERO
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center py-1">
              <img
                src="/logo.png"
                alt="Nero"
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-serif text-2xl tracking-wider font-semibold text-[#1F2429] ml-1.5">
                NERO
              </span>
            </div>
          )}
        </a>

        {/* Center: Three links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium tracking-normal">
          <a
            href="#what-i-do"
            className="hover:opacity-75 transition-opacity"
          >
            What I do
          </a>
          <a
            href="#how-we-start"
            className="hover:opacity-75 transition-opacity"
          >
            How it works
          </a>
          <a
            href="#about"
            className="hover:opacity-75 transition-opacity"
          >
            About
          </a>
        </nav>

        {/* Right: Book a call pill */}
        <div className="flex items-center">
          <MagneticButton
            href={bookingLink}
            className="px-5 py-2 rounded-full text-sm font-semibold bg-[#E8A33D] text-[#1F2429] hover:bg-[#dba032] shadow-xs"
          >
            Book a call
          </MagneticButton>
        </div>
      </div>
    </header>
  );
};
