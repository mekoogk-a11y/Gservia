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
      <div className="py-16 text-center bg-[#0a0a0a] rounded-3xl border-2 border-[#262626] p-8 shadow-2xl max-w-2xl mx-auto text-white">
        <div className="w-16 h-16 rounded-2xl bg-[#111111] text-yellow-400 flex items-center justify-center mx-auto mb-4 border-2 border-yellow-400/40 shadow-lg shadow-yellow-400/10">
          <SearchX className="w-8 h-8 text-yellow-400" />
        </div>
        <h3 className="text-xl font-black mb-2 text-white">
          {t.noResultsTitle}
        </h3>
        <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6 font-medium">
          {t.noResultsDesc}
        </p>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {searchSuggestions.map((term, idx) => (
            <button
              key={idx}
              onClick={() => onSearchSuggestion(term)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#151515] hover:bg-yellow-400 hover:text-black text-white border border-[#333333] transition-all"
            >
              {term}
            </button>
          ))}
        </div>

        <button
          onClick={onClearSearch}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black text-black bg-yellow-400 hover:bg-yellow-300 shadow-lg shadow-yellow-400/20 transition-all"
        >
          <RefreshCw className="w-4 h-4 text-black" />
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
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#222222]">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-black border-2 border-yellow-400/50 flex items-center justify-center shadow-md">
                  <ServiceIcon name={cat.iconName} className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {catTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-medium">
                    {catDesc}
                  </p>
                </div>
              </div>

              <span className="text-xs font-black text-yellow-400 bg-[#111111] px-3.5 py-1.5 rounded-xl border border-[#2a2a2a]">
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
