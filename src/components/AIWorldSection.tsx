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
      className="relative py-16 sm:py-20 bg-black border-b border-[#222222] overflow-hidden"
    >
      {/* Subtle Yellow Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border-2 border-yellow-400/50 text-yellow-400 text-xs font-black mb-4 shadow-lg shadow-yellow-400/10">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
            <span>{t.aiSectionBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.aiSectionTitle}
          </h2>
          
          <p className="mt-3 text-neutral-200 text-base sm:text-lg leading-relaxed font-medium">
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
                className="group relative flex flex-col justify-between bg-[#0a0a0a] rounded-2xl p-6 border-2 border-[#262626] shadow-xl hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-white"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center bg-black border-2 border-yellow-400/40 shadow-sm group-hover:scale-110 group-hover:border-yellow-400 group-hover:shadow-yellow-400/20 transition-all duration-300"
                    >
                      <ServiceIcon name={service.iconName} className="w-7 h-7 text-yellow-400" />
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-yellow-400/15 text-yellow-300 border border-yellow-400/40">
                        {lang === 'ar' ? (service.badgeAr || 'AI Tool') : (service.badgeEn || 'AI Tool')}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(service.id);
                        }}
                        className={`p-2 rounded-xl transition-colors ${
                          isFav ? 'text-yellow-400 bg-yellow-400/20' : 'text-neutral-400 hover:text-yellow-400'
                        }`}
                        title={isFav ? t.removeFromFavorites : t.addToFavorites}
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-yellow-400 text-yellow-400' : 'text-yellow-400'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-black text-white tracking-tight mb-2 group-hover:text-yellow-400 transition-colors flex items-center justify-between">
                    <span>{displayName}</span>
                    <ArrowUpRight className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300 transition-all opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="text-sm text-neutral-200 leading-relaxed mb-5 font-medium">
                    {description}
                  </p>

                  {/* Top 2 Features Pill */}
                  <div className="space-y-2 mb-6">
                    {features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-200 font-bold bg-black p-2 rounded-lg border border-[#222222]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-[#222222] flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(service);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#151515] hover:bg-[#252525] border border-[#333333] hover:border-yellow-400/40 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5 text-yellow-400" />
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
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-black text-black bg-yellow-400 hover:bg-yellow-300 shadow-md shadow-yellow-400/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                  >
                    <span>{t.openService}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-black" />
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
