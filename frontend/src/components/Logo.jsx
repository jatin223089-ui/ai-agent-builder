import React from "react";

// Minimalist geometric logo matching UI style
export default function Logo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ff4d00', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ff4d00', stopOpacity: 0.8 }} />
        </linearGradient>
      </defs>
      
      {/* Main geometric shape - Three overlapping squares forming "F" */}
      <g>
        {/* Top horizontal bar */}
        <rect x="8" y="8" width="24" height="4" fill="url(#logoGrad)" />
        
        {/* Vertical bar */}
        <rect x="8" y="8" width="4" height="24" fill="url(#logoGrad)" />
        
        {/* Middle horizontal bar */}
        <rect x="8" y="18" width="16" height="4" fill="url(#logoGrad)" opacity="0.9" />
        
        {/* Accent dot */}
        <circle cx="30" cy="10" r="2" fill="#ff4d00" />
      </g>
    </svg>
  );
}
