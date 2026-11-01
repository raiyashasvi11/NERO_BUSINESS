import React, { useState } from 'react';

interface FallbackPanelProps {
  imageSrc?: string;
  altText: string;
  outlineText: string;
  className?: string;
  isArch?: boolean;
}

export const FallbackPanel: React.FC<FallbackPanelProps> = ({
  imageSrc,
  altText,
  outlineText,
  className = '',
  isArch = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-gradient-to-br from-[#1F2429] via-[#2A333C] to-[#E8A33D]/40 ${
        isArch ? 'arch-frame' : 'rounded-[28px]'
      } ${className}`}
    >
      {/* SVG feTurbulence fine film grain layer */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='panelNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23panelNoise)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle geometric light accent */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#E8A33D]/15 blur-3xl pointer-events-none z-[1]" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#3E5C76]/25 blur-3xl pointer-events-none z-[1]" />

      {/* Huge outline serif typography for initials or card number */}
      <div className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none p-4">
        <span
          className="font-serif text-[110px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-none tracking-tight select-none"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(246, 241, 231, 0.45)',
          }}
        >
          {outlineText}
        </span>
      </div>

      {/* Real image if available in public folder */}
      {imageSrc && !imageError && (
        <img
          src={imageSrc}
          alt={altText}
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover z-[3]"
        />
      )}
    </div>
  );
};
