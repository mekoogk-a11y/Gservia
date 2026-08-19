import React from 'react';
import { GoogleService, Language } from '../types';
import { getTranslation } from '../data/translations';
import { ServiceIcon } from './ServiceIcon';
import { History, X, ExternalLink, Trash2, ArrowUpRight } from 'lucide-react';

interface RecentServicesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recentServices: GoogleService[];
  onClearRecent: () => void;
  lang: Language;
  onSelectService: (service: GoogleService) => void;
}

export const RecentServicesDrawer: React.FC<RecentServicesDrawerProps> = ({
  isOpen,
  onClose,
  recentServices,
  onClearRecent,
  lang,
  onSelectService,
}) => {
  const t = getTranslation(lang);

  if (!isOpen) return null;

  const handleLaunch = (service: GoogleService) => {
    window.open(service.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="recent-services-drawer-overlay"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      onClick={onClose}
    >
      <div 
        id="recent-services-drawer"
        className="fixed inset-y-0 end-0 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-s border-slate-200 dark:border-slate-800 flex flex-col z-50 text-slate-900 dark:text-white transform transition-transform animate-in slide-in-from-end duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{t.recentTitle}</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {recentServices.length} {lang === 'ar' ? 'خدمات تم تصفحها' : 'services opened'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {recentServices.length > 0 && (
              <button
                onClick={onClearRecent}
                title={lang === 'ar' ? 'مسح السجل' : 'Clear History'}
                className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of Recent Services */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {recentServices.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <History className="w-8 h-8 opacity-40" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                {t.recentEmpty}
              </p>
            </div>
          ) : (
            recentServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleLaunch(service)}
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700/60 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: `${service.colorHex}15`, color: service.colorHex }}
                  >
                    <ServiceIcon name={service.iconName} className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {lang === 'ar' && service.nameAr ? service.nameAr : service.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {lang === 'ar' ? service.descriptionAr : service.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ms-2">
                  <span className="p-2 rounded-xl text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <span className="text-xs text-slate-400">
            {lang === 'ar' ? 'البيانات تُحفظ محلياً في متصفحك فقط' : 'History is saved locally on your device'}
          </span>
        </div>
      </div>
    </div>
  );
};
