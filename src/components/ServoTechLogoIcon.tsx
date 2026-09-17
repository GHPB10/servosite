import React from 'react';

interface ServoTechLogoIconProps {
  className?: string;
  size?: number | string;
}

export function ServoTechLogoIcon({ className = "w-10 h-10", size }: ServoTechLogoIconProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div 
      className={`rounded-xl sm:rounded-2xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 shrink-0 overflow-hidden ${className}`}
      style={style}
    >
      <svg 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-[68%] h-[68%]"
      >
        {/* Top Horizontal Bar */}
        <path 
          d="M12 16H52" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        {/* Outer Chevron / Shield Triangle */}
        <path 
          d="M16 26L32 48L48 26" 
          stroke="white" 
          strokeWidth="5.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Inner Downward Triangle */}
        <polygon 
          points="24,26 40,26 32,38" 
          fill="white" 
        />
      </svg>
    </div>
  );
}

export const SERVO_TECH_FAVICON_DATA_URI = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="servoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="url(#servoGrad)"/>
  <path d="M12 16H52" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
  <path d="M16 26L32 48L48 26" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  <polygon points="24,26 40,26 32,38" fill="#ffffff"/>
</svg>
`)}`;
