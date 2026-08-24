import React from 'react';
import { GlobalService, Language } from '../types';
import { 
  ExternalLink, 
  Info, 
  Star, 
  Bookmark,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

interface ServiceCardProps {
  service: GlobalService;
  lang: Language;
  isFavorite: boolean;
  onToggleFavorite: (serviceId: string) => void;
  onSelectService: (service: GlobalService) => void;
  onTrackRecent?: (service: GlobalService) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  lang,
  isFavorite,
  onToggleFavorite,
  onSelectService,
  onTrackRecent,
}) => {
  const isArabic = lang === 'ar';
  const displayName = isArabic && service.nameAr ? service.nameAr : service.name;
  const description = isArabic ? (service.shortDescriptionAr || service.descriptionAr) : (service.shortDescription || service.description);

  const handleOpenService = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onTrackRecent) onTrackRecent(service);
    window.open(service.websiteUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id={`service-card-${service.id}`}
      onClick={() => onSelectService(service)}
      className="group relative flex flex-col justify-between bg-white dark:bg-slate-900/95 rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500/80 transition-all duration-200 hover:-translate-y-1 cursor-pointer text-start backdrop-blur-sm"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          
          {/* Logo & Category */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl object-contain bg-slate-50 dark:bg-white p-1.5 shadow-sm border border-slate-200/60 dark:border-transparent shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
              <img 
                src={service.logoUrl} 
                alt={service.name} 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {service.stackRole || service.categoryId}
                </span>
                {service.verified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" title="Verified" />
                )}
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                {displayName}
              </h3>
            </div>
          </div>

          {/* Actions & Match Score */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {service.matchScore && service.matchScore > 80 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-600/50 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                {service.matchScore}%
              </span>
            )}
            
            <button
              id={`fav-btn-${service.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(service.id);
              }}
              title={isFavorite ? (isArabic ? 'إزالة من المفضلة' : 'Remove from favorites') : (isArabic ? 'إضافة إلى المفضلة' : 'Add to favorites')}
              className={`p-2 rounded-xl transition-colors ${
                isFavorite 
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800' 
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {description}
        </p>

        {/* Key Attributes Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {service.freePlan ? (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80">
              {isArabic ? 'خطة مجانية متاحة' : 'Free Tier'}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              ${service.startingPrice}/mo
            </span>
          )}

          {service.languages.includes('ar') && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80">
              🇸🇦 {isArabic ? 'واجهة عربية' : 'Arabic UI'}
            </span>
          )}

          <span className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
            {service.userLevel[0]}
          </span>
        </div>
      </div>

      {/* Footer Details & Action Bar */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        {/* Rating */}
        <div className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{service.rating}</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">({service.reviewCount})</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onSelectService(service)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{isArabic ? 'التفاصيل' : 'Details'}</span>
          </button>

          <button
            onClick={handleOpenService}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
            title={isArabic ? 'فتح الموقع الرسمي للخدمة' : 'Open official service site'}
          >
            <span>{isArabic ? 'الموقع' : 'Visit'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
