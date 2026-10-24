import type React from "react";

/**
 * WATQ OFFICIAL MASTER BRAND IDENTITY
 * Insignia: The Universal Personality Lens (100% Perfection Standard)
 *
 * Geometry:
 * - 100% G2 Continuous Filleted Keystones (No jagged corners or raw poly-slices)
 * - Concentric Golden Ratio Compass System (Outer R=170, Aperture r=64, Singularity Core r=24)
 * - 120.00° Triad Radial Rotational Symmetry
 * - Constant 20.0px Optical Corridor Gutters
 * - Monolithic 100% Solid Monochrome (#FFFFFF / #000000)
 *
 * Philosophy:
 * - Universal Psychological Trinity across all personality frameworks:
 *     1. Cognition (Mind, Perception, Openness) - Top Keystone
 *     2. Affect (Emotion, Values, Agreeableness) - Lower-Left Keystone
 *     3. Conation (Drive, Action, Conscientiousness) - Lower-Right Keystone
 * - Central Singularity Core: The Authentic Self (Das Selbst / Wathiqa)
 */

export interface WatqPrismMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  variant?: "monochrome" | "mono-white" | "mono-black" | "light";
  className?: string;
}

export const WatqPrismMark: React.FC<WatqPrismMarkProps> = ({
  size = 40,
  color = "#FFFFFF",
  variant = "monochrome",
  className,
  ...props
}) => {
  const fillColor = variant === "light" || variant === "mono-black" ? "#000000" : color;

  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Watq Universal Personality Lens"
      {...props}
    >
      {/* Facet 1: Cognitive Dimension (Mind & Perception) */}
      <path
        d="M 310.14 203.73 L 381.58 162.49 Q 391.97 156.49 385.02 146.71 A 170 170 0 0 0 114.98 146.71 Q 108.03 156.49 118.42 162.49 L 189.86 203.73 Q 200.26 209.73 208.63 201.17 A 64 64 0 0 1 291.37 201.17 Q 299.74 209.73 310.14 203.73 Z"
        fill={fillColor}
      />
      {/* Facet 2: Affective Dimension (Emotion & Values) */}
      <path
        d="M 179.86 221.05 L 108.42 179.81 Q 98.03 173.81 93.04 184.72 A 170 170 0 0 0 228.06 418.58 Q 240.00 419.71 240.00 407.71 L 240.00 325.21 Q 240.00 313.21 228.39 310.24 A 64 64 0 0 1 187.02 238.59 Q 190.26 227.05 179.86 221.05 Z"
        fill={fillColor}
      />
      {/* Facet 3: Conative Dimension (Will & Drive) */}
      <path
        d="M 260.00 325.21 L 260.00 407.71 Q 260.00 419.71 271.94 418.58 A 170 170 0 0 0 406.96 184.72 Q 401.97 173.81 391.58 179.81 L 320.14 221.05 Q 309.74 227.05 312.98 238.59 A 64 64 0 0 1 271.61 310.24 Q 260.00 313.21 260.00 325.21 Z"
        fill={fillColor}
      />
      {/* Central Singularity Core: The Authentic Self (Das Selbst / Wathiqa) */}
      <circle cx="250" cy="250" r="24" fill={fillColor} />
    </svg>
  );
};

export interface WatqFullLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  markSize?: number;
  theme?: "dark" | "light";
  showTagline?: boolean;
}

export const WatqFullLogo: React.FC<WatqFullLogoProps> = ({
  markSize = 36,
  theme = "dark",
  showTagline = true,
  className = "",
  ...props
}) => {
  const isDark = theme === "dark";
  const primaryTextColor = isDark ? "#FFFFFF" : "#000000";
  const taglineColor = isDark ? "#8E8E93" : "#636366";
  const dividerColor = isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.14)";
  const markColor = isDark ? "#FFFFFF" : "#000000";

  return (
    <div className={`inline-flex items-center gap-3 sm:gap-4 select-none ${className}`} {...props}>
      <WatqPrismMark size={markSize} color={markColor} />
      <div
        className="hidden sm:block h-5 sm:h-7 w-[1.5px]"
        style={{ backgroundColor: dividerColor }}
      />
      <div className="flex flex-col justify-center">
        <span
          className="font-extrabold tracking-[-0.04em] leading-none"
          style={{
            fontSize: `${markSize * 0.68}px`,
            color: primaryTextColor,
            fontFamily: "var(--font-display), Space Grotesk, Inter, sans-serif",
          }}
        >
          Watq
        </span>
        {showTagline && (
          <span
            className="hidden sm:block font-semibold tracking-[0.20em] text-[10px] mt-1 leading-none uppercase"
            style={{
              color: taglineColor,
              fontFamily: "Inter, -apple-system, sans-serif",
            }}
          >
            Personality Decoded.
          </span>
        )}
      </div>
    </div>
  );
};

export interface WatqAppIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const WatqAppIcon: React.FC<WatqAppIconProps> = ({ size = 64, className, ...props }) => (
  <svg
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Watq App Icon"
    {...props}
  >
    <rect width="512" height="512" rx="114" fill="#050505" />
    <rect
      x="2"
      y="2"
      width="508"
      height="508"
      rx="112"
      stroke="rgba(255, 255, 255, 0.16)"
      strokeWidth="2.5"
    />
    <g transform="translate(256, 256) scale(0.82) translate(-250, -250)">
      <path
        d="M 310.14 203.73 L 381.58 162.49 Q 391.97 156.49 385.02 146.71 A 170 170 0 0 0 114.98 146.71 Q 108.03 156.49 118.42 162.49 L 189.86 203.73 Q 200.26 209.73 208.63 201.17 A 64 64 0 0 1 291.37 201.17 Q 299.74 209.73 310.14 203.73 Z"
        fill="#FFFFFF"
      />
      <path
        d="M 179.86 221.05 L 108.42 179.81 Q 98.03 173.81 93.04 184.72 A 170 170 0 0 0 228.06 418.58 Q 240.00 419.71 240.00 407.71 L 240.00 325.21 Q 240.00 313.21 228.39 310.24 A 64 64 0 0 1 187.02 238.59 Q 190.26 227.05 179.86 221.05 Z"
        fill="#FFFFFF"
      />
      <path
        d="M 260.00 325.21 L 260.00 407.71 Q 260.00 419.71 271.94 418.58 A 170 170 0 0 0 406.96 184.72 Q 401.97 173.81 391.58 179.81 L 320.14 221.05 Q 309.74 227.05 312.98 238.59 A 64 64 0 0 1 271.61 310.24 Q 260.00 313.21 260.00 325.21 Z"
        fill="#FFFFFF"
      />
      <circle cx="250" cy="250" r="24" fill="#FFFFFF" />
    </g>
  </svg>
);

export default WatqPrismMark;
