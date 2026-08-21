import React, { useRef, useEffect } from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { GServiaLogo } from './GServiaLogo';
import { 
  Search, 
  X, 
  Sparkles, 
  Flame, 
  Briefcase, 
  Code2, 
  FileSpreadsheet, 
  Globe2,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedQuickFilter: string;
  setSelectedQuickFilter: (filter: string) => void;
  totalServicesCount: number;
  filteredCount: number;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  searchQuery,
  setSearchQuery,
  selectedQuickFilter,
  setSelectedQuickFilter,
  totalServicesCount,
  filteredCount,
  onExploreClick,
}) => {
  const t = getTranslation(lang);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const quickFilterButtons = [
    { id: 'all', label: t.popularFiltersAll, icon: Globe2 },
    { id: 'popular', label: t.popularFiltersPopular, icon: Flame },
    { id: 'ai', label: t.popularFiltersAI, icon: Sparkles },
    { id: 'business', label: t.popularFiltersBusiness, icon: Briefcase },
    { id: 'dev', label: t.popularFiltersDev, icon: Code2 },
    { id: 'productivity', label: t.popularFiltersProductivity, icon: FileSpreadsheet },
  ];

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-black text-white"
    >
      {/* Background Stark Amber/Yellow Subtle Ambient Refractions */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-20 blur-3xl -z-10">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-yellow-400/20"></div>
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-amber-500/15"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full bg-yellow-300/15"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Stark Black & Yellow Independent Notice Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111111] border-2 border-[#333333] text-white text-xs sm:text-sm font-bold mb-6 shadow-lg shadow-black">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
          </span>
          <span className="font-black text-yellow-400">GServia</span>
          <span className="text-[#444444]">|</span>
          <span className="text-white font-bold">
            {lang === 'ar' ? 'بوابة مستقلة لـ 50+ خدمة رسمية' : 'Independent Gateway to 50+ Official Services'}
          </span>
        </div>

        {/* Main Big Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.12] mb-6">
          GServia
          <span className="block mt-2 text-2xl sm:text-4xl lg:text-5xl font-black text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.3)]">
            {t.heroHeadline}
          </span>
        </h1>

        {/* Subtitle in Crisp White */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-neutral-100 font-semibold leading-relaxed mb-10">
          {t.heroSubheadline}
        </p>

        {/* Big Smart Search Box in Stark Black & Yellow */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <div className="relative flex items-center bg-[#0a0a0a] rounded-2xl shadow-2xl shadow-yellow-500/5 border-2 border-[#2b2b2b] focus-within:border-yellow-400 focus-within:ring-4 focus-within:ring-yellow-400/20 transition-all duration-300">
            
            {/* Yellow Search Icon */}
            <div className="ps-4 sm:ps-5 pe-2">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            </div>

            {/* Input Element with Bright White Text */}
            <input
              ref={searchInputRef}
              id="main-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="w-full py-4 sm:py-5 px-2 bg-transparent text-white placeholder-neutral-400 text-sm sm:text-base font-bold focus:outline-none"
            />

            {/* Clear button if search is not empty */}
            {searchQuery && (
              <button
                id="search-clear-btn"
                onClick={() => setSearchQuery('')}
                className="p-2 text-neutral-400 hover:text-yellow-400 transition-colors"
                title={t.clearSearch}
                aria-label={t.clearSearch}
              >
                <X className="w-5 h-5 text-yellow-400" />
              </button>
            )}

            {/* Search Shortcut Hint */}
            <div className="pe-4 hidden sm:flex items-center">
              <kbd className="px-2 py-1 text-[11px] font-black text-yellow-400 bg-black border border-[#333333] rounded-md shadow-xs">
                Ctrl K
              </kbd>
            </div>
          </div>

          {/* Live Search Status Bar */}
          {searchQuery && (
            <div className="mt-2.5 flex items-center justify-between text-xs text-white px-2 animate-in fade-in duration-200">
              <span className="font-bold text-yellow-400">
                {t.resultsCount.replace('{count}', filteredCount.toString())} ({filteredCount})
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-white hover:text-yellow-400 underline transition-colors font-bold"
              >
                {t.clearSearch}
              </button>
            </div>
          )}
        </div>

        {/* Quick Filter Buttons in Stark Black with Yellow Accents */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto mb-12">
          {quickFilterButtons.map((btn) => {
            const Icon = btn.icon;
            const isSelected = selectedQuickFilter === btn.id && !searchQuery;
            return (
              <button
                key={btn.id}
                id={`hero-filter-${btn.id}`}
                onClick={() => {
                  setSelectedQuickFilter(btn.id);
                  if (searchQuery) setSearchQuery('');
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 border-2 ${
                  isSelected
                    ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/20 scale-105'
                    : 'bg-[#111111] text-white border-[#2b2b2b] hover:border-yellow-400/60 hover:text-yellow-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-yellow-400'}`} />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Key Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-[#222222]">
          <div className="p-4 rounded-2xl bg-[#0e0e0e] border border-[#262626] text-center">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 block mb-0.5">50+</span>
            <span className="text-xs font-bold text-white">{lang === 'ar' ? 'خدمة رسمية موثقة' : 'Official Tools'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0e0e0e] border border-[#262626] text-center">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 block mb-0.5">15</span>
            <span className="text-xs font-bold text-white">{lang === 'ar' ? 'تصنيفاً منظماً' : 'Categories'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0e0e0e] border border-[#262626] text-center">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 block mb-0.5">100%</span>
            <span className="text-xs font-bold text-white">{lang === 'ar' ? 'روابط مباشرة وآمنة' : 'Direct & Safe Links'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0e0e0e] border border-[#262626] text-center">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 block mb-0.5">30</span>
            <span className="text-xs font-bold text-white">{lang === 'ar' ? 'لغة عالمية' : 'Global Languages'}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
