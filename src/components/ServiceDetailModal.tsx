import React, { useState, useEffect } from 'react';
import { GoogleService, Language } from '../types';
import { getTranslation } from '../data/translations';
import { ServiceIcon } from './ServiceIcon';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  Star, 
  DollarSign, 
  Globe, 
  ShieldCheck,
  Share2
} from 'lucide-react';

interface ServiceDetailModalProps {
  service: GoogleService | null;
  onClose: () => void;
  lang: Language;
  isFavorite: boolean;
  onToggleFavorite: (serviceId: string) => void;
  onTrackRecent?: (service: GoogleService) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  lang,
  isFavorite,
  onToggleFavorite,
  onTrackRecent,
}) => {
  const [copied, setCopied] = useState(false);
  const t = getTranslation(lang);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!service) return null;

  const displayName = lang === 'ar' && service.nameAr ? service.nameAr : service.name;
  const secondaryName = lang === 'ar' && service.nameAr ? service.name : undefined;
  const description = lang === 'ar' ? service.detailedInfoAr : service.detailedInfoEn;
  const features = lang === 'ar' ? service.featuresAr : service.featuresEn;
  const pricing = lang === 'ar' ? service.pricingAr : service.pricingEn;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayName} - Google Services Hub`,
          text: lang === 'ar' ? service.descriptionAr : service.descriptionEn,
          url: service.url,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
      }
    }

    navigator.clipboard.writeText(service.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectLaunch = () => {
    if (onTrackRecent) onTrackRecent(service);
  };

  return (
    <div 
      id="service-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="service-detail-modal-card"
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            
            {/* Service Icon */}
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
              style={{
                backgroundColor: `${service.colorHex}20`,
                border: `1px solid ${service.colorHex}40`
              }}
            >
              <ServiceIcon name={service.iconName} className="w-8 h-8" colorHex={service.colorHex} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  {t.verifiedService}
                </span>
                {service.releaseYear && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    {t.releaseYear} {service.releaseYear}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {displayName}
              </h2>
              {secondaryName && (
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  {secondaryName}
                </span>
              )}
            </div>

          </div>

          {/* Close Button */}
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Detailed Overview Paragraph */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              {lang === 'ar' ? 'نبذة عن الخدمة' : 'Service Overview'}
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              {description}
            </p>
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              {t.features}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {features.map((feat, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Meta Information Cards: Pricing & Platforms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block mb-1">
                {t.pricing}
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                {pricing}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block mb-1">
                {t.supportedPlatforms}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {service.platforms.map((p, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold uppercase border border-slate-200 dark:border-slate-600">
                    {p}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Safe Link Security Notice */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center gap-3 text-xs text-blue-800 dark:text-blue-300">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>
              {lang === 'ar' 
                ? 'رابط رسمي مباشر وآمن 100% يقودك مباشرة إلى خوادم Google الرسمية.' 
                : '100% secure official direct URL redirecting straight to official Google servers.'}
            </span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            
            {/* Share / Copy Link Button */}
            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4 text-blue-500" />}
              <span>{copied ? t.copiedUrl : t.shareService}</span>
            </button>

            {/* Favorite Button */}
            <button
              onClick={() => onToggleFavorite(service.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                isFavorite
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
              <span>{isFavorite ? t.removeFromFavorites : t.addToFavorites}</span>
            </button>

          </div>

          {/* Launch Official Link */}
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDirectLaunch}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 transition-all hover:scale-105 flex items-center gap-2"
          >
            <span>{t.directAccess}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

        </div>

      </div>
    </div>
  );
};
