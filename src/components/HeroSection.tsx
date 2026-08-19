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
    { id: 'all', label: t.popularFiltersAll, icon: Globe2, color: 'hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400' },
    { id: 'popular', label: t.popularFiltersPopular, icon: Flame, color: 'hover:border-red-500 hover:text-red-600 dark:hover:text-red-400' },
    { id: 'ai', label: t.popularFiltersAI, icon: Sparkles, color: 'hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400' },
    { id: 'business', label: t.popularFiltersBusiness, icon: Briefcase, color: 'hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400' },
    { id: 'dev', label: t.popularFiltersDev, icon: Code2, color: 'hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400' },
    { id: 'productivity', label: t.popularFiltersProductivity, icon: FileSpreadsheet, color: 'hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400' },
  ];

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden text-slate-900 dark:text-white"
    >
      {/* Background Google-inspired Subtle Ambient Refractions */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-45 dark:opacity-25 blur-3xl -z-10">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-blue-500/25"></div>
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-indigo-500/20"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full bg-cyan-400/20"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 rounded-full bg-purple-500/20"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle Brand & Independent Notice Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="font-black text-blue-600 dark:text-blue-400">GServia</span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-slate-600 dark:text-slate-300 font-medium">
            {lang === 'ar' ? 'بوابة مستقلة لـ 50+ خدمة رسمية' : 'Independent Gateway to 50+ Official Services'}
          </span>
        </div>

        {/* Main Big Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-6">
          GServia
          <span className="block mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            {t.heroHeadline}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-10">
          {t.heroSubheadline}
        </p>

        {/* Big Smart Search Box */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <div className="relative flex items-center bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-500/5 dark:shadow-black/50 border-2 border-slate-200/90 dark:border-slate-800 focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
            
            {/* Search Icon */}
            <div className="ps-4 sm:ps-5 pe-2 text-slate-400 dark:text-slate-500">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </div>

            {/* Input Element */}
            <input
              ref={searchInputRef}
              id="main-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="w-full py-4 sm:py-5 px-2 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base font-medium focus:outline-none"
            />

            {/* Clear button if search is not empty */}
            {searchQuery && (
              <button
                id="search-clear-btn"
                onClick={() => setSearchQuery('')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title={t.clearSearch}
                aria-label={t.clearSearch}
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Search Shortcut Hint on Desktop */}
            <div className="pe-4 hidden sm:flex items-center">
              <kbd className="px-2 py-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-xs">
                Ctrl K
              </kbd>
            </div>
          </div>

          {/* Live Search Status Bar */}
          {searchQuery && (
            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2 animate-in fade-in duration-200">
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {t.resultsCount.replace('{count}', filteredCount.toString())} ({filteredCount})
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-red-500 underline transition-colors"
              >
                {t.clearSearch}
              </button>
            </div>
          )}
        </div>

        {/* Quick Filter Buttons */}
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
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md shadow-slate-900/10 scale-105'
                    : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-xs ' + btn.color
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Key Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/70 text-center">
            <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 block mb-0.5">50+</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{lang === 'ar' ? 'خدمة رسمية موثقة' : 'Official Tools'}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/70 text-center">
            <span className="text-xl sm:text-2xl font-black text-indigo-500 block mb-0.5">15</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{lang === 'ar' ? 'تصنيفاً منظماً' : 'Categories'}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/70 text-center">
            <span className="text-xl sm:text-2xl font-black text-emerald-500 block mb-0.5">100%</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{lang === 'ar' ? 'روابط مباشرة وآمنة' : 'Direct & Safe Links'}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/70 text-center">
            <span className="text-xl sm:text-2xl font-black text-cyan-500 block mb-0.5">30</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{lang === 'ar' ? 'لغة عالمية' : 'Global Languages'}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
