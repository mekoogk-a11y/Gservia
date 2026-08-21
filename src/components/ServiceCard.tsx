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
      className="group relative flex flex-col justify-between bg-[#0a0a0a] rounded-2xl p-5 sm:p-6 border-2 border-[#222222] shadow-xl shadow-black hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer focus-within:ring-2 focus-within:ring-yellow-400"
    >
      {/* Top Bar */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          
          {/* Icon with Yellow Accent */}
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-black border-2 border-yellow-400/40 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:border-yellow-400 group-hover:shadow-yellow-400/20"
          >
            <ServiceIcon name={service.iconName} className="w-6 h-6 text-yellow-400" />
          </div>

          {/* Badges & Favorite Action */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {badge && (
              <span 
                className="px-2.5 py-1 rounded-full text-[11px] font-black tracking-wide bg-yellow-400/15 text-yellow-300 border border-yellow-400/40 shadow-xs"
              >
                {badge}
              </span>
            )}
            
            {/* Bookmark / Favorite Button */}
            <button
              id={`fav-btn-${service.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(service.id);
              }}
              title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
              className={`p-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                isFavorite 
                  ? 'text-yellow-400 bg-yellow-400/20 border border-yellow-400/40' 
                  : 'text-neutral-400 hover:text-yellow-400 hover:bg-[#1a1a1a]'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-yellow-400'}`} />
            </button>
          </div>
        </div>

        {/* Titles with direct link indication */}
        <div className="mb-2.5">
          <h3 className="text-lg font-black text-white tracking-tight group-hover:text-yellow-400 transition-colors flex items-center justify-between gap-1.5">
            <span>{displayName}</span>
            <ArrowUpRight className="w-4 h-4 text-yellow-400 transition-all opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </h3>
          {secondaryName && (
            <span className="text-xs font-semibold text-neutral-300 block mt-0.5">
              {secondaryName}
            </span>
          )}
        </div>

        {/* Short Description in Crisp White */}
        <p className="text-sm text-neutral-200 line-clamp-2 leading-relaxed mb-4 font-medium">
          {description}
        </p>
      </div>

      {/* Footer Details & Action Buttons */}
      <div className="pt-4 border-t border-[#222222]" onClick={(e) => e.stopPropagation()}>
        
        {/* Supported Platforms & Pricing Tag */}
        <div className="flex items-center justify-between text-[11px] text-neutral-300 mb-3.5 font-bold">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-yellow-400" />
            <span>{service.pricingAr ? (lang === 'ar' ? service.pricingAr.split('/')[0] : service.pricingEn.split('/')[0]) : 'Free'}</span>
          </span>
          <span className="flex items-center gap-1 text-yellow-400">
            {service.releaseYear && <span>{service.releaseYear}</span>}
          </span>
        </div>

        {/* Dual Actions: Open Official Link & Learn More Modal */}
        <div className="grid grid-cols-2 gap-2">
          
          {/* Learn More Button */}
          <button
            id={`learn-more-${service.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectService(service);
            }}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#151515] hover:bg-[#252525] border border-[#333333] hover:border-yellow-400/50 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <Info className="w-3.5 h-3.5 text-yellow-400" />
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
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black text-black bg-yellow-400 hover:bg-yellow-300 shadow-md shadow-yellow-400/20 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <span>{t.openService}</span>
            <ExternalLink className="w-3.5 h-3.5 text-black" />
          </a>

        </div>

      </div>
    </div>
  );
};
