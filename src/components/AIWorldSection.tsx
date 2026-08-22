import React from 'react';
import { GoogleService, Language } from '../types';
import { getTranslation } from '../data/translations';
import { ServiceIcon } from './ServiceIcon';
import { 
  Sparkles, 
  ExternalLink, 
  Info, 
  CheckCircle2, 
  Star,
  ArrowUpRight
} from 'lucide-react';

interface AIWorldSectionProps {
  services: GoogleService[];
  lang: Language;
  favorites: string[];
  onToggleFavorite: (serviceId: string) => void;
  onSelectService: (service: GoogleService) => void;
  onTrackRecent?: (service: GoogleService) => void;
}

export const AIWorldSection: React.FC<AIWorldSectionProps> = ({
  services,
  lang,
  favorites,
  onToggleFavorite,
  onSelectService,
  onTrackRecent,
}) => {
  const t = getTranslation(lang);
  const aiServices = services.filter((s) => s.isAI || s.categoryId === 'ai-tools');

  return (
    <section 
      id="ai-universe" 
      className="relative py-16 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{t.aiSectionBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.aiSectionTitle}
          </h2>
          
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {t.aiSectionSubtitle}
          </p>
        </div>

        {/* Featured AI Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiServices.map((service) => {
            const isFav = favorites.includes(service.id);
            const displayName = lang === 'ar' && service.nameAr ? service.nameAr : service.name;
            const description = lang === 'ar' ? service.descriptionAr : service.descriptionEn;
            const features = lang === 'ar' ? service.featuresAr : service.featuresEn;

            const handleCardClick = () => {
              if (onTrackRecent) onTrackRecent(service);
              window.open(service.url, '_blank', 'noopener,noreferrer');
            };

            return (
              <div
                key={service.id}
                id={`ai-card-${service.id}`}
                onClick={handleCardClick}
                className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 hover:-translate-y-1.5 cursor-pointer text-slate-900 dark:text-white"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs group-hover:scale-105 group-hover:border-blue-400 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-950/30 transition-all duration-200"
                    >
                      <ServiceIcon name={service.iconName} className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-xs">
                        {lang === 'ar' ? (service.badgeAr || 'AI Tool') : (service.badgeEn || 'AI Tool')}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(service.id);
                        }}
                        className={`p-2 rounded-xl transition-colors ${
                          isFav ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800' : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={isFav ? t.removeFromFavorites : t.addToFavorites}
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{displayName}</span>
                    <ArrowUpRight className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-all opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 font-normal">
                    {description}
                  </p>

                  {/* Top 2 Features Pill */}
                  <div className="space-y-2 mb-6">
                    {features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(service);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>{t.learnMore}</span>
                  </button>

                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onTrackRecent) onTrackRecent(service);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                  >
                    <span>{t.openService}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

