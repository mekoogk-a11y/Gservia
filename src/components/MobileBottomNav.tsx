import React from 'react';
import { MainViewType } from './Navbar';
import { Language } from '../types';
import { 
  Grid, 
  Sparkles, 
  Star, 
  Boxes, 
  ShieldCheck, 
  History
} from 'lucide-react';

interface MobileBottomNavProps {
  currentView: MainViewType;
  onSelectView: (view: MainViewType) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenRecents: () => void;
  lang: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onSelectView,
  favoritesCount,
  onOpenFavorites,
  onOpenRecents,
  lang,
}) => {
  const isArabic = lang === 'ar';

  const navItems = [
    {
      id: 'services',
      label: isArabic ? 'الخدمات' : 'Services',
      icon: Grid,
      action: () => onSelectView('services'),
      isActive: currentView === 'services',
    },
    {
      id: 'ai-hub',
      label: isArabic ? 'عالم AI' : 'AI Hub',
      icon: Sparkles,
      action: () => {
        onSelectView('services');
        setTimeout(() => {
          const el = document.getElementById('ai-universe');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
      isActive: false,
    },
    {
      id: 'favorites',
      label: isArabic ? 'المفضلة' : 'Favorites',
      icon: Star,
      action: onOpenFavorites,
      badge: favoritesCount > 0 ? favoritesCount : undefined,
      isActive: false,
    },
    {
      id: 'integrations',
      label: isArabic ? 'المنظومة' : 'Ecosystem',
      icon: Boxes,
      action: () => onSelectView('integrations'),
      isActive: currentView === 'integrations' || currentView === 'marketplace' || currentView === 'developer',
    },
    {
      id: 'security',
      label: isArabic ? 'الحساب' : 'Account',
      icon: ShieldCheck,
      action: () => onSelectView('security'),
      isActive: currentView === 'security' || currentView === 'dashboard',
    },
  ];

  return (
    <div 
      id="gservia-mobile-bottom-nav"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800/90 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] safe-area-bottom"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-95 ${
                active 
                  ? 'text-blue-600 dark:text-blue-400 font-bold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
              }`}
            >
              {/* Active Glow Pill */}
              {active && (
                <span className="absolute -top-1.5 w-7 h-1 rounded-full bg-blue-600 dark:bg-blue-400 shadow-sm shadow-blue-500"></span>
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${active ? 'scale-110' : ''}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -end-2.5 min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] mt-0.5 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
