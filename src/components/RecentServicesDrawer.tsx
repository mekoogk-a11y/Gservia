import React from 'react';
import { GoogleService, Language } from '../types';
import { getTranslation } from '../data/translations';
import { ServiceIcon } from './ServiceIcon';
import { History, X, Trash2, ArrowUpRight } from 'lucide-react';

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
}) => {
  const t = getTranslation(lang);

  if (!isOpen) return null;

  const handleLaunch = (service: GoogleService) => {
    window.open(service.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="recent-services-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in"
      onClick={onClose}
    >
      <div 
        id="recent-services-drawer"
        className="fixed inset-y-0 end-0 w-full max-w-md bg-[#0a0a0a] shadow-2xl border-s-2 border-[#262626] flex flex-col z-50 text-white transform transition-transform animate-in slide-in-from-end duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-black border-2 border-yellow-400/40 text-yellow-400">
              <History className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-black text-lg text-white">{t.recentTitle}</h3>
              <span className="text-xs text-yellow-400 font-bold">
                {recentServices.length} {lang === 'ar' ? 'خدمات تم تصفحها' : 'services opened'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {recentServices.length > 0 && (
              <button
                onClick={onClearRecent}
                title={lang === 'ar' ? 'مسح السجل' : 'Clear History'}
                className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-[#1a1a1a] transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
            >
              <X className="w-5 h-5 text-yellow-400" />
            </button>
          </div>
        </div>

        {/* List of Recent Services */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {recentServices.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-black border-2 border-yellow-400/30 flex items-center justify-center text-yellow-400">
                <History className="w-8 h-8 opacity-60 text-yellow-400" />
              </div>
              <p className="text-sm text-neutral-300 max-w-xs font-medium">
                {t.recentEmpty}
              </p>
            </div>
          ) : (
            recentServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleLaunch(service)}
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-black border-2 border-[#222222] hover:border-yellow-400 transition-all cursor-pointer shadow-black"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#0e0e0e] border border-yellow-400/30"
                  >
                    <ServiceIcon name={service.iconName} className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-sm text-white truncate group-hover:text-yellow-400 transition-colors">
                      {lang === 'ar' && service.nameAr ? service.nameAr : service.name}
                    </h4>
                    <p className="text-xs text-neutral-300 truncate font-medium">
                      {lang === 'ar' ? service.descriptionAr : service.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ms-2">
                  <span className="p-2 rounded-xl text-black bg-yellow-400 group-hover:bg-yellow-300 transition-colors shadow-xs">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#222222] text-center bg-black">
          <span className="text-xs text-yellow-400 font-bold">
            {lang === 'ar' ? 'البيانات تُحفظ محلياً في متصفحك فقط' : 'History is saved locally on your device'}
          </span>
        </div>
      </div>
    </div>
  );
};
