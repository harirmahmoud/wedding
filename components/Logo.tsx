import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Islamic Jasmine Pattern Logo */}
      <svg 
        viewBox="0 0 80 80" 
        className="w-12 h-12 md:w-14 md:h-14"
        fill="none"
      >
        {/* Four jasmine petals in Islamic geometric style */}
        <g className="fill-primary">
          {/* Top petal */}
          <path d="M40 8 C35 15, 30 20, 32 28 C34 32, 38 35, 40 35 C42 35, 46 32, 48 28 C50 20, 45 15, 40 8 Z" />
          <circle cx="40" cy="10" r="3" />
          
          {/* Right petal */}
          <path d="M72 40 C65 35, 60 30, 52 32 C48 34, 45 38, 45 40 C45 42, 48 46, 52 48 C60 50, 65 45, 72 40 Z" />
          <circle cx="70" cy="40" r="3" />
          
          {/* Bottom petal */}
          <path d="M40 72 C45 65, 50 60, 48 52 C46 48, 42 45, 40 45 C38 45, 34 48, 32 52 C30 60, 35 65, 40 72 Z" />
          <circle cx="40" cy="70" r="3" />
          
          {/* Left petal */}
          <path d="M8 40 C15 45, 20 50, 28 48 C32 46, 35 42, 35 40 C35 38, 32 34, 28 32 C20 30, 15 35, 8 40 Z" />
          <circle cx="10" cy="40" r="3" />
        </g>
        
        {/* Center circle */}
        <circle cx="40" cy="40" r="6" className="fill-accent" />
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-bold text-foreground tracking-wide">
            Yasmine Events
          </span>
          <span className="text-xs md:text-sm text-muted-foreground italic">
            La beauté de chaque moment
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
