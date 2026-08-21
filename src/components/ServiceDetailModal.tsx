import React, { useState, useEffect } from 'react';
import { GoogleService, Language } from '../types';
import { getTranslation } from '../data/translations';
import { ServiceIcon } from './ServiceIcon';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Check, 
  Star, 
  DollarSign, 
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
          title: `${displayName} - GServia`,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="service-detail-modal-card"
        className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-3xl shadow-2xl border-2 border-[#2a2a2a] overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[#222222] flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            
            {/* Service Icon */}
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-black border-2 border-yellow-400/50 shadow-md"
            >
              <ServiceIcon name={service.iconName} className="w-8 h-8 text-yellow-400" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-yellow-400/15 text-yellow-300 border border-yellow-400/40">
                  {t.verifiedService}
                </span>
                {service.releaseYear && (
                  <span className="text-xs text-yellow-400 font-bold">
                    {t.releaseYear} {service.releaseYear}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {displayName}
              </h2>
              {secondaryName && (
                <span className="text-xs font-bold text-neutral-300 block mt-0.5">
                  {secondaryName}
                </span>
              )}
            </div>

          </div>

          {/* Close Button */}
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-[#1a1a1a] rounded-xl transition-colors"
            title="Close"
          >
            <X className="w-5 h-5 text-yellow-400" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Detailed Overview Paragraph */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-yellow-400 mb-2">
              {lang === 'ar' ? 'نبذة عن الخدمة' : 'Service Overview'}
            </h4>
            <p className="text-neutral-200 leading-relaxed text-sm sm:text-base font-medium">
              {description}
            </p>
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-yellow-400 mb-3">
              {t.features}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {features.map((feat, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-black border border-[#262626] text-xs sm:text-sm text-neutral-200 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Meta Information Cards: Pricing & Platforms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            <div className="p-3.5 rounded-xl bg-black border border-[#262626]">
              <span className="text-xs font-bold text-neutral-300 block mb-1">
                {t.pricing}
              </span>
              <span className="text-sm font-black text-yellow-400 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-yellow-400" />
                {pricing}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black border border-[#262626]">
              <span className="text-xs font-bold text-neutral-300 block mb-1">
                {t.supportedPlatforms}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {service.platforms.map((p, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-[#151515] text-white text-[11px] font-black uppercase border border-[#333333]">
                    {p}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Safe Link Security Notice */}
          <div className="p-3.5 rounded-xl bg-black border-2 border-yellow-400/40 flex items-center gap-3 text-xs text-white">
            <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0" />
            <span className="font-bold">
              {lang === 'ar' 
                ? 'رابط رسمي مباشر وآمن 100% يقودك مباشرة إلى خوادم Google الرسمية.' 
                : '100% secure official direct URL redirecting straight to official Google servers.'}
            </span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-[#222222] bg-black flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            
            {/* Share / Copy Link Button */}
            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#151515] text-white border border-[#333333] hover:border-yellow-400/50 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-yellow-400" /> : <Share2 className="w-4 h-4 text-yellow-400" />}
              <span>{copied ? t.copiedUrl : t.shareService}</span>
            </button>

            {/* Favorite Button */}
            <button
              onClick={() => onToggleFavorite(service.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                isFavorite
                  ? 'bg-yellow-400/20 text-yellow-300 border-yellow-400/50'
                  : 'bg-[#151515] text-white border-[#333333] hover:border-yellow-400/50'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-yellow-400'}`} />
              <span>{isFavorite ? t.removeFromFavorites : t.addToFavorites}</span>
            </button>

          </div>

          {/* Launch Official Link */}
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDirectLaunch}
            className="px-6 py-2.5 rounded-xl text-xs font-black text-black bg-yellow-400 hover:bg-yellow-300 shadow-md shadow-yellow-400/20 transition-all hover:scale-105 flex items-center gap-2"
          >
            <span>{t.directAccess}</span>
            <ExternalLink className="w-4 h-4 text-black" />
          </a>

        </div>

      </div>
    </div>
  );
};
