import React from 'react';

/**
 * WATQ OFFICIAL MASTER BRAND IDENTITY
 * Single Abstract Mark: The Psychometric Prism
 * Document: WATQ-BRD-01 // Brand Identity & Guidelines
 * 
 * Symbolism:
 * - Single iconic geometric prism decoding the spectrum of human personality
 * - Refractive facets subtly forming an architectural "W" (Watq)
 * - Electric Cyan (#38BDF8) center wedge (Active Psychometric Lens)
 * - Stark White / Slate outer pillars
 */

export interface WatqPrismMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  variant?: 'duotone' | 'monochrome';
  color?: string;
  accentColor?: string;
}

export const WatqPrismMark: React.FC<WatqPrismMarkProps> = ({
  size = 40,
  variant = 'duotone',
  color = '#FFFFFF',
  accentColor = '#38BDF8',
  className,
  ...props
}) => {
  const isDuotone = variant === 'duotone';
  const centerColor = isDuotone ? accentColor : color;
  const rightColor = isDuotone ? '#A5B4FC' : color;

  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Watq Psychometric Prism Mark"
      {...props}
    >
      {/* Facet 1: Left Pillar */}
      <path
        d="M 90 150 L 150 150 L 210 325 L 165 350 L 90 150 Z"
        fill={color}
      />
      {/* Facet 2: Center Refractive Wedge */}
      <path
        d="M 215 175 L 285 175 L 250 350 L 215 175 Z"
        fill={centerColor}
      />
      {/* Facet 3: Right Pillar */}
      <path
        d="M 350 150 L 410 150 L 335 350 L 290 325 L 350 150 Z"
        fill={rightColor}
      />
    </svg>
  );
};

export interface WatqFullLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  markSize?: number;
  variant?: 'duotone' | 'monochrome';
  theme?: 'dark' | 'light';
  showTagline?: boolean;
}

export const WatqFullLogo: React.FC<WatqFullLogoProps> = ({
  markSize = 36,
  variant = 'duotone',
  theme = 'dark',
  showTagline = true,
  className = '',
  ...props
}) => {
  const isDark = theme === 'dark';
  const primaryTextColor = isDark ? '#FFFFFF' : '#0F172A';
  const markBaseColor = isDark ? '#FFFFFF' : '#1E1B4B';
  const taglineColor = isDark ? '#94A3B8' : '#64748B';
  const dividerColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.12)';

  return (
    <div
      className={`inline-flex items-center gap-3.5 select-none ${className}`}
      {...props}
    >
      <WatqPrismMark
        size={markSize}
        variant={variant}
        color={markBaseColor}
        accentColor="#38BDF8"
      />
      <div
        className="h-7 w-[1.5px]"
        style={{ backgroundColor: dividerColor }}
      />
      <div className="flex flex-col justify-center">
        <span
          className="font-extrabold tracking-[-0.04em] leading-none"
          style={{
            fontSize: `${markSize * 0.68}px`,
            color: primaryTextColor,
            fontFamily: 'Inter, -apple-system, sans-serif',
          }}
        >
          WATQ
        </span>
        {showTagline && (
          <span
            className="font-semibold tracking-[0.16em] text-[10px] mt-1 leading-none uppercase"
            style={{
              color: taglineColor,
              fontFamily: 'Inter, -apple-system, sans-serif',
            }}
          >
            Personality Decoded.
          </span>
        )}
      </div>
    </div>
  );
};
export default WatqPrismMark;
