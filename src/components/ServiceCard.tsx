import React from 'react';
import { GoogleService, Language } from '../types';
import { getTranslation } from '../data/translations';
import { ServiceIcon } from './ServiceIcon';
import { 
  ExternalLink, 
  Info, 
  Star, 
  Globe, 
  ArrowUpRight 
} from 'lucide-react';

interface ServiceCardProps {
  service: GoogleService;
  lang: Language;
  isFavorite: boolean;
  onToggleFavorite: (serviceId: string) => void;
  onSelectService: (service: GoogleService) => void;
  onTrackRecent?: (service: GoogleService) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  lang,
  isFavorite,
  onToggleFavorite,
  onSelectService,
  onTrackRecent,
}) => {
  const t = getTranslation(lang);

  const displayName = lang === 'ar' && service.nameAr ? service.nameAr : service.name;
  const secondaryName = lang === 'ar' && service.nameAr ? service.name : undefined;
  const description = lang === 'ar' ? service.descriptionAr : service.descriptionEn;
  const badge = lang === 'ar' ? service.badgeAr : service.badgeEn;

  // Direct open handler with recent tracking
  const handleOpenService = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onTrackRecent) onTrackRecent(service);
    window.open(service.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id={`service-card-${service.id}`}
      onClick={handleOpenService}
      className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 hover:-translate-y-1 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500"
    >
      {/* Top Bar */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          
          {/* Icon Container */}
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs transition-transform duration-200 group-hover:scale-105 group-hover:border-blue-400 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-950/30"
          >
            <ServiceIcon name={service.iconName} className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>

          {/* Badges & Favorite Action */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {badge && (
              <span 
                className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-xs"
              >
                {badge}
              </span>
            )}
            
            {/* Favorite Star Button */}
            <button
              id={`fav-btn-${service.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(service.id);
              }}
              title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
              className={`p-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isFavorite 
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800' 
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
            </button>
          </div>
        </div>

        {/* Titles with direct link indication */}
        <div className="mb-2.5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between gap-1.5">
            <span>{displayName}</span>
            <ArrowUpRight className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-all opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </h3>
          {secondaryName && (
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mt-0.5">
              {secondaryName}
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {/* Footer Details & Action Buttons */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800" onClick={(e) => e.stopPropagation()}>
        
        {/* Supported Platforms & Pricing Tag */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-3.5 font-medium">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>{service.pricingAr ? (lang === 'ar' ? service.pricingAr.split('/')[0] : service.pricingEn.split('/')[0]) : 'Free'}</span>
          </span>
          <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500 font-semibold">
            {service.releaseYear && <span>{service.releaseYear}</span>}
          </span>
        </div>

        {/* Dual Actions: Learn More & Open Official Service */}
        <div className="grid grid-cols-2 gap-2">
          
          {/* Learn More Button */}
          <button
            id={`learn-more-${service.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectService(service);
            }}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Info className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>{t.learnMore}</span>
          </button>

          {/* Direct Open Official Service Link */}
          <a
            id={`open-link-${service.id}`}
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              if (onTrackRecent) onTrackRecent(service);
            }}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>{t.openService}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

        </div>

      </div>
    </div>
  );
};

