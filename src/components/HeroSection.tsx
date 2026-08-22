import React, { useRef, useEffect } from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
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
  Layers,
  MapPin,
  Mail,
  HardDrive
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
    { id: 'all', label: lang === 'ar' ? 'جميع الخدمات' : 'All Services', icon: Globe2 },
    { id: 'search', label: lang === 'ar' ? 'البحث' : 'Search', icon: Search },
    { id: 'communication', label: lang === 'ar' ? 'التواصل' : 'Communication', icon: Mail },
    { id: 'productivity', label: lang === 'ar' ? 'الإنتاجية' : 'Productivity', icon: FileSpreadsheet },
    { id: 'storage', label: lang === 'ar' ? 'التخزين' : 'Storage', icon: HardDrive },
    { id: 'maps', label: lang === 'ar' ? 'الخرائط' : 'Maps', icon: MapPin },
    { id: 'business', label: lang === 'ar' ? 'الأعمال' : 'Business', icon: Briefcase },
    { id: 'developer', label: lang === 'ar' ? 'المطورون' : 'Developers', icon: Code2 },
  ];

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-14 md:pt-40 md:pb-20 overflow-hidden bg-white dark:bg-[#080c14] text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 dark:opacity-20 blur-3xl -z-10">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-blue-500/20"></div>
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-indigo-500/15"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full bg-cyan-400/15"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Platform Identity Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="font-bold">Gservia</span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span>
            {lang === 'ar' ? 'البوابة الموحدة والمستقلة لخدمات Google الرسمية' : 'Unified Independent Gateway for Official Google Services'}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4">
          Gservia
        </h1>

        {/* Tagline */}
        <p className="max-w-2xl mx-auto text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 mb-8 leading-snug">
          {lang === 'ar' ? 'كل خدمات Google في مكان واحد' : 'All Google Services, One Place'}
        </p>

        {/* Big Smart Search Box */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <div className="relative flex items-center bg-white dark:bg-slate-900/90 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 border-2 border-slate-200 dark:border-slate-700/80 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-200">
            
            {/* Search Icon */}
            <div className="ps-4 sm:ps-5 pe-2">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>

            {/* Input Element */}
            <input
              ref={searchInputRef}
              id="main-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث عن خدمات Google...' : 'Search Google Services...'}
              aria-label={lang === 'ar' ? 'ابحث عن خدمات Google' : 'Search Google Services'}
              className="w-full py-4 sm:py-5 px-2 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-lg font-medium focus:outline-none"
            />

            {/* Clear button if search is not empty */}
            {searchQuery && (
              <button
                id="search-clear-btn"
                onClick={() => setSearchQuery('')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                title={t.clearSearch}
                aria-label={t.clearSearch}
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Search Shortcut Hint */}
            <div className="pe-4 hidden sm:flex items-center">
              <kbd className="px-2 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
                /
              </kbd>
            </div>
          </div>

          {/* Live Search Status Bar */}
          {searchQuery && (
            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 px-2 animate-in fade-in duration-200">
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {lang === 'ar' ? `تم العثور على ${filteredCount} خدمة` : `Found ${filteredCount} services`}
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-600 dark:text-slate-300 hover:underline transition-colors font-semibold"
              >
                {t.clearSearch}
              </button>
            </div>
          )}
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto mb-10">
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
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105'
                    : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 block mb-0.5">50+</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{lang === 'ar' ? 'خدمة رسمية موثقة' : 'Official Services'}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 block mb-0.5">11</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{lang === 'ar' ? 'أقسام منظمة' : 'Curated Categories'}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 block mb-0.5">100%</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{lang === 'ar' ? 'روابط مباشرة وآمنة' : 'Direct & Safe Links'}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 block mb-0.5">30</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{lang === 'ar' ? 'لغة عالمية' : 'Global Languages'}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

