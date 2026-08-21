import React from 'react';

interface GServiaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitle?: string;
}

export const GServiaLogo: React.FC<GServiaLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  subtitle,
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', sub: 'text-[11px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'w-16 h-16', text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Stark Black & Yellow Geometric Emblem */}
      <div 
        className={`${currentSize.icon} relative rounded-xl bg-black p-1 flex items-center justify-center shadow-lg shadow-yellow-500/10 border-2 border-yellow-400 group-hover:border-yellow-300 transition-colors shrink-0`}
      >
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer Yellow Gateway */}
          <circle cx="24" cy="24" r="20" stroke="#FACC15" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.4"/>
          <path d="M 36 14 A 16 16 0 1 0 40 24 L 24 24 L 24 20 L 41 20 A 18 18 0 1 1 37 11 Z" fill="url(#gserviaGradYellow)"/>
          <circle cx="24" cy="24" r="3.5" fill="#FFFFFF"/>
          
          {/* Spark Accent Dots in Yellow */}
          <circle cx="24" cy="4" r="2" fill="#FACC15"/>
          <circle cx="44" cy="24" r="2" fill="#FDE047"/>
          <circle cx="24" cy="44" r="2" fill="#EAB308"/>
          <circle cx="4" cy="24" r="2" fill="#CA8A04"/>

          <defs>
            <linearGradient id="gserviaGradYellow" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF08A"/>
              <stop offset="0.5" stopColor="#FACC15"/>
              <stop offset="1" stopColor="#CA8A04"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-start">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-tight ${currentSize.text} text-white`}>
              GServia
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-sm shadow-yellow-400"></span>
          </div>
          {subtitle && (
            <span className={`${currentSize.sub} font-semibold text-neutral-200 tracking-normal mt-0.5`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
