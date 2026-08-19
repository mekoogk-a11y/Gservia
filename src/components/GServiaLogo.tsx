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
    md: { icon: 'w-9 h-9', text: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'w-16 h-16', text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Geometric GServia Gateway Emblem */}
      <div 
        className={`${currentSize.icon} relative rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-1 flex items-center justify-center shadow-md shadow-blue-500/10 border border-slate-700/80 group-hover:border-blue-500/50 transition-colors shrink-0`}
      >
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle Outer Gateway Segment */}
          <circle cx="24" cy="24" r="20" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="2" strokeDasharray="3 3"/>
          <path d="M 36 14 A 16 16 0 1 0 40 24 L 24 24 L 24 20 L 41 20 A 18 18 0 1 1 37 11 Z" fill="url(#gserviaGradInner)"/>
          <circle cx="24" cy="24" r="3.5" fill="#38BDF8"/>
          
          {/* 4 Spark Accent Dots */}
          <circle cx="24" cy="4" r="1.5" fill="#4285F4"/>
          <circle cx="44" cy="24" r="1.5" fill="#EA4335"/>
          <circle cx="24" cy="44" r="1.5" fill="#34A853"/>
          <circle cx="4" cy="24" r="1.5" fill="#FBBC05"/>

          <defs>
            <linearGradient id="gserviaGradInner" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8"/>
              <stop offset="0.5" stopColor="#2563EB"/>
              <stop offset="1" stopColor="#1D4ED8"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-start">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-tight ${currentSize.text} text-slate-900 dark:text-white`}>
              GServia
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          </div>
          {subtitle && (
            <span className={`${currentSize.sub} font-medium text-slate-500 dark:text-slate-400 tracking-normal mt-0.5`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
