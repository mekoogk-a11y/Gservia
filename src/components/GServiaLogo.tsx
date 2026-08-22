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
      {/* Distinctive Independent G-Portal Emblem */}
      <div 
        className={`${currentSize.icon} relative rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0 transition-transform duration-200 hover:scale-105`}
      >
        <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center p-1.5">
          <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Geometric Orbit */}
            <circle cx="24" cy="24" r="20" stroke="url(#gserviaOrbit)" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.6"/>
            {/* Distinctive 'G' Gateway Monogram */}
            <path 
              d="M 36 14 A 16 16 0 1 0 40 24 L 24 24 L 24 20 L 41 20 A 18 18 0 1 1 37 11 Z" 
              fill="url(#gserviaGradMain)"
            />
            <circle cx="24" cy="24" r="3.5" fill="#FFFFFF"/>
            
            {/* Orbiting Satellite Points */}
            <circle cx="24" cy="4" r="2" fill="#60A5FA"/>
            <circle cx="44" cy="24" r="2" fill="#818CF8"/>
            <circle cx="24" cy="44" r="2" fill="#34D399"/>
            <circle cx="4" cy="24" r="2" fill="#38BDF8"/>

            <defs>
              <linearGradient id="gserviaGradMain" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60A5FA"/>
                <stop offset="0.5" stopColor="#3B82F6"/>
                <stop offset="1" stopColor="#6366F1"/>
              </linearGradient>
              <linearGradient id="gserviaOrbit" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8"/>
                <stop offset="1" stopColor="#818CF8"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col text-start">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-extrabold tracking-tight ${currentSize.text} text-slate-900 dark:text-white`}>
              GServia
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse shadow-xs shadow-blue-500"></span>
          </div>
          {subtitle && (
            <span className={`${currentSize.sub} font-semibold text-slate-500 dark:text-slate-400 tracking-normal mt-0.5`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

