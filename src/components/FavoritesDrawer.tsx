import React, { useEffect } from 'react';
import { GoogleService, Language } from '../types';
import { getTranslation } from '../data/translations';
import { ServiceIcon } from './ServiceIcon';
import { 
  X, 
  Star, 
  ExternalLink, 
  Trash2, 
  Info,
  ArrowUpRight
} from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allServices: GoogleService[];
  lang: Language;
  onToggleFavorite: (serviceId: string) => void;
  onSelectService: (service: GoogleService) => void;
  onTrackRecent?: (service: GoogleService) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  allServices,
  lang,
  onToggleFavorite,
  onSelectService,
  onTrackRecent,
}) => {
  const t = getTranslation(lang);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const favoriteServices = allServices.filter((s) => favorites.includes(s.id));

  return (
    <div 
      id="favorites-drawer-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="favorites-drawer-panel"
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-s border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-end duration-300 text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                {t.favoritesTitle}
              </h3>
              <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                {favoriteServices.length} {lang === 'ar' ? 'خدمات محفوظة للوصول السريع' : 'quick launch items'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {favoriteServices.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Star className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                {t.favoritesEmptyTitle}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed font-normal">
                {t.favoritesEmptyDesc}
              </p>
            </div>
          ) : (
            favoriteServices.map((service) => {
              const displayName = lang === 'ar' && service.nameAr ? service.nameAr : service.name;

              const handleOpenDirect = () => {
                if (onTrackRecent) onTrackRecent(service);
                window.open(service.url, '_blank', 'noopener,noreferrer');
              };

              return (
                <div 
                  key={service.id}
                  onClick={handleOpenDirect}
                  className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer hover:shadow-md"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 group-hover:border-blue-400 transition-colors"
                    >
                      <ServiceIcon name={service.iconName} className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div className="min-w-0 pe-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1">
                        <span>{displayName}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block font-normal">
                        {service.url.replace('https://', '')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(service);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                      title={t.learnMore}
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
                      title={t.openService}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onTrackRecent) onTrackRecent(service);
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(service.id);
                      }}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                      title={t.removeFromFavorites}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {favoriteServices.length > 0 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center bg-slate-50 dark:bg-slate-900/90">
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              {lang === 'ar' ? 'انقر على أي خدمة للانتقال إليها مباشرة ↗' : 'Click on any service to open directly ↗'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

