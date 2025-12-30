import React from 'react';

const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Flowers */}
      <svg
        className="absolute top-20 left-10 w-16 h-16 text-primary/20 animate-float"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 15 C45 25, 35 30, 35 40 C35 50, 45 55, 50 55 C55 55, 65 50, 65 40 C65 30, 55 25, 50 15 Z" />
        <path d="M30 35 C35 40, 35 50, 40 55 C45 60, 45 70, 40 75 C35 70, 25 65, 25 55 C25 45, 25 40, 30 35 Z" />
        <path d="M70 35 C65 40, 65 50, 60 55 C55 60, 55 70, 60 75 C65 70, 75 65, 75 55 C75 45, 75 40, 70 35 Z" />
        <circle cx="50" cy="45" r="8" className="fill-accent/30" />
      </svg>

      <svg
        className="absolute top-40 right-20 w-12 h-12 text-rose-medium/30 animate-float"
        style={{ animationDelay: '1s' }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 10 C40 20, 25 25, 25 40 C25 55, 40 65, 50 65 C60 65, 75 55, 75 40 C75 25, 60 20, 50 10 Z" />
        <circle cx="50" cy="40" r="10" className="fill-gold/40" />
      </svg>

      <svg
        className="absolute bottom-40 left-20 w-14 h-14 text-primary/15 animate-float"
        style={{ animationDelay: '2s' }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <ellipse cx="50" cy="25" rx="12" ry="20" />
        <ellipse cx="30" cy="45" rx="12" ry="20" transform="rotate(-45 30 45)" />
        <ellipse cx="70" cy="45" rx="12" ry="20" transform="rotate(45 70 45)" />
        <ellipse cx="35" cy="70" rx="12" ry="20" transform="rotate(-20 35 70)" />
        <ellipse cx="65" cy="70" rx="12" ry="20" transform="rotate(20 65 70)" />
        <circle cx="50" cy="50" r="8" className="fill-accent/30" />
      </svg>

      {/* Butterflies with wing flapping */}
      <div className="absolute top-60 right-40 animate-butterfly-fly">
        <svg
          className="w-10 h-10 text-primary/30"
          viewBox="0 0 100 100"
        >
          {/* Left wings */}
          <g className="origin-right animate-wing-flap">
            <ellipse cx="25" cy="40" rx="22" ry="18" fill="currentColor" />
            <ellipse cx="28" cy="62" rx="14" ry="10" fill="currentColor" />
          </g>
          {/* Right wings */}
          <g className="origin-left animate-wing-flap" style={{ animationDelay: '0.1s' }}>
            <ellipse cx="75" cy="40" rx="22" ry="18" fill="currentColor" />
            <ellipse cx="72" cy="62" rx="14" ry="10" fill="currentColor" />
          </g>
          {/* Body */}
          <rect x="48" y="30" width="4" height="45" rx="2" className="fill-foreground/40" />
          <path d="M48 30 Q44 18 40 12" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M52 30 Q56 18 60 12" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="absolute bottom-60 right-10 animate-butterfly-fly" style={{ animationDelay: '3s' }}>
        <svg
          className="w-8 h-8 text-rose-medium/30"
          viewBox="0 0 100 100"
        >
          <g className="origin-right animate-wing-flap" style={{ animationDelay: '0.05s' }}>
            <ellipse cx="25" cy="40" rx="22" ry="18" fill="currentColor" />
            <ellipse cx="28" cy="62" rx="14" ry="10" fill="currentColor" />
          </g>
          <g className="origin-left animate-wing-flap" style={{ animationDelay: '0.15s' }}>
            <ellipse cx="75" cy="40" rx="22" ry="18" fill="currentColor" />
            <ellipse cx="72" cy="62" rx="14" ry="10" fill="currentColor" />
          </g>
          <rect x="48" y="30" width="4" height="45" rx="2" className="fill-foreground/30" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-5 animate-butterfly-fly" style={{ animationDelay: '6s' }}>
        <svg
          className="w-6 h-6 text-accent/40"
          viewBox="0 0 100 100"
        >
          <g className="origin-right animate-wing-flap">
            <ellipse cx="25" cy="40" rx="22" ry="18" fill="currentColor" />
            <ellipse cx="28" cy="62" rx="14" ry="10" fill="currentColor" />
          </g>
          <g className="origin-left animate-wing-flap" style={{ animationDelay: '0.1s' }}>
            <ellipse cx="75" cy="40" rx="22" ry="18" fill="currentColor" />
            <ellipse cx="72" cy="62" rx="14" ry="10" fill="currentColor" />
          </g>
          <rect x="48" y="30" width="4" height="45" rx="2" className="fill-foreground/30" />
        </svg>
      </div>

      <div className="absolute top-1/3 left-1/4 animate-butterfly-fly" style={{ animationDelay: '9s' }}>
        <svg
          className="w-7 h-7 text-gold/30"
          viewBox="0 0 100 100"
        >
          <g className="origin-right animate-wing-flap" style={{ animationDelay: '0.08s' }}>
            <ellipse cx="25" cy="40" rx="22" ry="18" fill="currentColor" />
            <ellipse cx="28" cy="62" rx="14" ry="10" fill="currentColor" />
          </g>
          <g className="origin-left animate-wing-flap" style={{ animationDelay: '0.18s' }}>
            <ellipse cx="75" cy="40" rx="22" ry="18" fill="currentColor" />
            <ellipse cx="72" cy="62" rx="14" ry="10" fill="currentColor" />
          </g>
          <rect x="48" y="30" width="4" height="45" rx="2" className="fill-foreground/30" />
        </svg>
      </div>

      {/* More flowers at bottom */}
      <svg
        className="absolute bottom-20 right-1/4 w-20 h-20 text-primary/10 animate-float"
        style={{ animationDelay: '3s' }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 5 C42 18, 30 22, 30 35 C30 48, 42 55, 50 55 C58 55, 70 48, 70 35 C70 22, 58 18, 50 5 Z" />
        <path d="M25 30 C32 38, 32 52, 38 60 C44 68, 44 82, 38 90" strokeWidth="2" stroke="currentColor" fill="none" />
        <path d="M75 30 C68 38, 68 52, 62 60 C56 68, 56 82, 62 90" strokeWidth="2" stroke="currentColor" fill="none" />
        <circle cx="50" cy="38" r="10" className="fill-gold-light/40" />
      </svg>

      {/* Islamic geometric accent */}
      <div className="absolute top-10 right-10 w-32 h-32 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon 
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            className="text-accent"
          />
          <polygon 
            points="50,20 80,35 80,65 50,80 20,65 20,35" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            className="text-primary"
          />
        </svg>
      </div>

      <div className="absolute bottom-10 left-10 w-24 h-24 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
          <polygon 
            points="50,10 85,30 85,70 50,90 15,70 15,30" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            className="text-accent"
          />
        </svg>
      </div>
    </div>
  );
};

export default FloatingElements;
