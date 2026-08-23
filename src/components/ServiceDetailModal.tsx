import React, { useState, useEffect } from 'react';
import { GlobalService, Language } from '../types';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  XCircle,
  Star, 
  ShieldCheck,
  Share2,
  Bookmark,
  Sparkles,
  ArrowRight,
  Layers
} from 'lucide-react';

interface ServiceDetailModalProps {
  service: GlobalService | null;
  onClose: () => void;
  lang: Language;
  isFavorite: boolean;
  onToggleFavorite: (serviceId: string) => void;
  onTrackRecent?: (service: GlobalService) => void;
  onSelectAlternative?: (altId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  lang,
  isFavorite,
  onToggleFavorite,
  onTrackRecent,
  onSelectAlternative,
}) => {
  const [copied, setCopied] = useState(false);
  const isArabic = lang === 'ar';

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

  const displayName = isArabic && service.nameAr ? service.nameAr : service.name;
  const description = isArabic ? service.descriptionAr : service.description;
  const features = isArabic ? (service.featuresAr || service.features) : service.features;
  const pros = isArabic ? (service.prosAr || service.pros) : service.pros;
  const cons = isArabic ? (service.consAr || service.cons) : service.cons;
  const howToStart = isArabic ? (service.howToStartAr || service.howToStart) : service.howToStart;
  const bestFor = isArabic ? service.bestForAr : service.bestFor;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayName} - Gservia Intelligence`,
          text: description,
          url: service.websiteUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(service.websiteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectLaunch = () => {
    if (onTrackRecent) onTrackRecent(service);
  };

  return (
    <div 
      id="service-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="service-detail-modal-card"
        className="relative w-full max-w-2xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200 text-white text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/70 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <img 
              src={service.logoUrl} 
              alt={service.name} 
              className="w-14 h-14 rounded-2xl object-contain bg-white p-1.5 shadow-md shrink-0" 
            />

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {displayName}
                </h3>
                {service.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/80">
                    <ShieldCheck className="w-3 h-3" />
                    {isArabic ? 'خدمة معتمدة' : 'Verified'}
                  </span>
                )}
                {service.freePlan && (
                  <span className="text-[10px] font-bold text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-800">
                    {isArabic ? 'خطة مجانية متاحة' : 'Free Tier'}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400">
                {service.stackRole || service.categoryId} • {service.websiteUrl.replace('https://', '')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleFavorite(service.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isFavorite 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                  : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
              }`}
              title={isFavorite ? 'Remove favorite' : 'Add favorite'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-sm text-slate-200">
          
          {/* Main Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">
              {isArabic ? 'عن الخدمة ودورها:' : 'About Service:'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Best For Callout */}
          {bestFor && (
            <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs">
              <strong className="text-blue-400 block mb-1">
                {isArabic ? '🎯 الأنسب لمن ولأي مهمة؟' : '🎯 Best Suited For:'}
              </strong>
              <span>{bestFor}</span>
            </div>
          )}

          {/* Pricing & Ratings Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-0.5">{isArabic ? 'نموذج السعر' : 'Pricing Model'}</span>
              <span className="font-bold text-white uppercase">{service.pricingType}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-0.5">{isArabic ? 'سعر البداية' : 'Starts At'}</span>
              <span className="font-bold text-white">
                {service.startingPrice === 0 ? (isArabic ? 'مجاني للبدء' : '$0 / Free') : `$${service.startingPrice}/mo`}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-0.5">{isArabic ? 'التقييم العام' : 'User Rating'}</span>
              <span className="font-bold text-amber-400 flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-amber-400" />
                {service.rating} ({service.reviewCount})
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-0.5">{isArabic ? 'دعم العربية' : 'Arabic Support'}</span>
              <span className="font-bold text-white">
                {service.languages.includes('ar') ? '🇸🇦 كامل' : '🌐 إنجليزية'}
              </span>
            </div>
          </div>

          {/* Key Features */}
          {features && features.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                {isArabic ? 'أبرز الميزات والإمكانيات:' : 'Key Features:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros & Cons (مزايا وعيوب) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Pros */}
            <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
              <h5 className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isArabic ? 'أبرز الإيجابيات والمزايا:' : 'Pros & Advantages:'}</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/30">
              <h5 className="text-xs font-bold text-rose-400 mb-2 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" />
                <span>{isArabic ? 'نقاط الضعف والقيود:' : 'Cons & Trade-offs:'}</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How to Start Step by Step */}
          {howToStart && howToStart.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                {isArabic ? 'كيف تبدأ استخدام الخدمة خطوة بخطوة:' : 'How to get started step-by-step:'}
              </h4>
              <div className="space-y-1.5">
                {howToStart.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="w-5 h-5 rounded-full bg-blue-900/60 text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alternatives */}
          {service.alternatives && service.alternatives.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                {isArabic ? 'بدائل أخرى مقترحة لنفس الغرض:' : 'Suggested Alternatives:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.alternatives.map((alt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (onSelectAlternative) onSelectAlternative(alt);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors capitalize flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>{alt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer / Official Action Link */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 text-start">
            <span className="font-semibold text-slate-400 block">
              {isArabic ? 'إخلاء مسؤولية الشفافية:' : 'Transparency Note:'}
            </span>
            {isArabic ? 'Gservia دليل رقمي مستقل يرشدك للموقع الرسمي المباشر.' : 'Gservia is an independent discovery platform pointing to verified official sites.'}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <a
              href={service.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDirectLaunch}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <span>{isArabic ? 'زيارة الموقع الرسمي للخدمة' : 'Visit Official Service'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
