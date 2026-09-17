import React from 'react';

interface ServoTechLogoIconProps {
  className?: string;
  size?: number | string;
  variant?: 'gradient' | 'plain' | 'white';
}

/**
 * Official Servo Tech Logo Symbol (3-stroke chiral delta monogram)
 * Extracted with pixel-perfect geometric precision from official brand asset.
 */
export function ServoTechLogoIcon({ 
  className = "w-10 h-10", 
  size,
  variant = 'gradient'
}: ServoTechLogoIconProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div 
      className={`rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 overflow-hidden ${
        variant === 'gradient'
          ? 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25'
          : variant === 'white'
          ? 'bg-white text-slate-950 shadow-md'
          : 'bg-transparent text-white'
      } ${className}`}
      style={style}
    >
      <svg 
        viewBox="0 0 1024 1024" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-[74%] h-[74%]"
      >
        {/* Stroke 1: Top Horizontal Trapezoid */}
        <polygon points="192,246 640,246 586,354 254,354" />
        
        {/* Stroke 2: Upper-Right Angled Diagonal Bar */}
        <polygon points="722,246 832,246 602,656 548,550" />
        
        {/* Stroke 3: Lower-Left Angled Diagonal Arm pointing to Bottom Apex */}
        <polygon points="288,412 398,412 512,798" />
      </svg>
    </div>
  );
}

export const SERVO_TECH_FAVICON_DATA_URI = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="servoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" rx="220" fill="url(#servoGrad)"/>
  <g fill="#ffffff">
    <polygon points="192,246 640,246 586,354 254,354" />
    <polygon points="722,246 832,246 602,656 548,550" />
    <polygon points="288,412 398,412 512,798" />
  </g>
</svg>
`)}`;
