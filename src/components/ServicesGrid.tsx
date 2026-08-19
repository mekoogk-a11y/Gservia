import React from 'react';
import { GoogleService, ServiceCategory, Language } from '../types';
import { getTranslation } from '../data/translations';
import { ServiceCard } from './ServiceCard';
import { ServiceIcon } from './ServiceIcon';
import { SearchX, RefreshCw } from 'lucide-react';

interface ServicesGridProps {
  services: GoogleService[];
  categories: ServiceCategory[];
  selectedCategory: string;
  searchQuery: string;
  onClearSearch: () => void;
  onSearchSuggestion: (term: string) => void;
  lang: Language;
  favorites: string[];
  onToggleFavorite: (serviceId: string) => void;
  onSelectService: (service: GoogleService) => void;
  onTrackRecent?: (service: GoogleService) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  services,
  categories,
  selectedCategory,
  searchQuery,
  onClearSearch,
  onSearchSuggestion,
  lang,
  favorites,
  onToggleFavorite,
  onSelectService,
  onTrackRecent,
}) => {
  const t = getTranslation(lang);

  // Suggestions for empty state
  const searchSuggestions = lang === 'ar'
    ? ['بريد', 'فيديو', 'ذكاء اصطناعي', 'مستندات', 'خرائط', 'تخزين', 'اعلانات', 'سحابة']
    : ['email', 'video', 'AI', 'docs', 'maps', 'storage', 'ads', 'cloud'];

  // If no services match search or filter
  if (services.length === 0) {
    return (
      <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs max-w-2xl mx-auto text-slate-900 dark:text-white">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-200 dark:border-amber-800/60">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">
          {t.noResultsTitle}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
          {t.noResultsDesc}
        </p>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {searchSuggestions.map((term, idx) => (
            <button
              key={idx}
              onClick={() => onSearchSuggestion(term)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        <button
          onClick={onClearSearch}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{t.clearSearch}</span>
        </button>
      </div>
    );
  }

  // If there's an active search query or a specific category selected, show flat grid
  if (searchQuery.trim() !== '' || selectedCategory !== 'all') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            lang={lang}
            isFavorite={favorites.includes(service.id)}
            onToggleFavorite={onToggleFavorite}
            onSelectService={onSelectService}
            onTrackRecent={onTrackRecent}
          />
        ))}
      </div>
    );
  }

  // Grouped by categories view
  return (
    <div className="space-y-14">
      {categories.map((cat) => {
        const catServices = services.filter((s) => s.categoryId === cat.id);
        if (catServices.length === 0) return null;

        const catTitle = lang === 'ar' ? cat.titleAr : cat.titleEn;
        const catDesc = lang === 'ar' ? cat.descriptionAr : cat.descriptionEn;

        return (
          <div key={cat.id} id={`category-group-${cat.id}`} className="scroll-mt-24">
            
            {/* Category Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center shadow-xs">
                  <ServiceIcon name={cat.iconName} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {catTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {catDesc}
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                {catServices.length} {lang === 'ar' ? 'خدمة' : 'tools'}
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {catServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  lang={lang}
                  isFavorite={favorites.includes(service.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectService={onSelectService}
                  onTrackRecent={onTrackRecent}
                />
              ))}
            </div>

          </div>
        );
      })}
    </div>
  );
};
