import React from 'react';
import { GoogleService, Language } from '../types';
import { getTranslation } from '../data/translations';
import { ServiceCard } from './ServiceCard';
import { Flame } from 'lucide-react';

interface MostUsedSectionProps {
  services: GoogleService[];
  lang: Language;
  favorites: string[];
  onToggleFavorite: (serviceId: string) => void;
  onSelectService: (service: GoogleService) => void;
  onTrackRecent?: (service: GoogleService) => void;
}

export const MostUsedSection: React.FC<MostUsedSectionProps> = ({
  services,
  lang,
  favorites,
  onToggleFavorite,
  onSelectService,
  onTrackRecent,
}) => {
  const t = getTranslation(lang);
  const popularServices = services.filter((s) => s.isPopular).slice(0, 8);

  return (
    <section id="most-used" className="py-12 sm:py-16 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200/60 dark:border-red-800/50 text-red-600 dark:text-red-400 text-xs font-bold mb-3">
              <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>{lang === 'ar' ? 'شعبية عالمية' : 'Global Favorites'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.mostUsedTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1.5 max-w-2xl">
              {t.mostUsedSubtitle}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>{popularServices.length} {lang === 'ar' ? 'خدمات أساسية' : 'Core Tools'}</span>
          </div>
        </div>

        {/* 4-column Grid for Popular Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {popularServices.map((service) => (
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
    </section>
  );
};
