import React, { useEffect } from 'react';
import { GlobalService, Language } from '../types';
import { getTranslation } from '../data/translations';
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
  allServices: GlobalService[];
  lang: Language;
  onToggleFavorite: (serviceId: string) => void;
  onSelectService: (service: GlobalService) => void;
  onTrackRecent?: (service: GlobalService) => void;
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
        className="w-full max-w-md bg-slate-900 h-full shadow-2xl border-s border-slate-800 flex flex-col animate-in slide-in-from-end duration-300 text-white text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-black text-lg text-white">
                {t.favoritesTitle}
              </h3>
              <span className="text-xs text-amber-400 font-bold">
                {favoriteServices.length} {lang === 'ar' ? 'خدمات محفوظة' : 'saved services'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {favoriteServices.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-950/50 border border-amber-800 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Star className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">
                {t.favoritesEmptyTitle}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed font-normal">
                {t.favoritesEmptyDesc}
              </p>
            </div>
          ) : (
            favoriteServices.map((service) => {
              const displayName = lang === 'ar' && service.nameAr ? service.nameAr : service.name;
              const targetUrl = service.websiteUrl || (service as any).url;

              const handleOpenDirect = () => {
                if (onTrackRecent) onTrackRecent(service);
                if (targetUrl) window.open(targetUrl, '_blank', 'noopener,noreferrer');
              };

              return (
                <div 
                  key={service.id}
                  onClick={handleOpenDirect}
                  className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 transition-all cursor-pointer hover:shadow-md"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={service.logoUrl}
                      alt={service.name}
                      className="w-10 h-10 rounded-xl object-contain bg-white p-1 border border-slate-700 shrink-0 group-hover:scale-105 transition-transform"
                    />

                    <div className="min-w-0 pe-2">
                      <h4 className="font-bold text-white text-sm truncate group-hover:text-blue-400 flex items-center gap-1">
                        <span>{displayName}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <span className="text-[11px] text-slate-400 truncate block font-normal">
                        {targetUrl ? targetUrl.replace('https://', '') : ''}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(service);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title={t.learnMore}
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-xs"
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
                      className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
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
        <div className="p-4 border-t border-slate-800 text-center bg-slate-950">
          <span className="text-xs text-slate-400 font-medium">
            {lang === 'ar' ? 'يمكنك الوصول لخدماتك المفضلة بنقرة واحدة دائماً' : 'Access your top tools with 1-click'}
          </span>
        </div>
      </div>
    </div>
  );
};
