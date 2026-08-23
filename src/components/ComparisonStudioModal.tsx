import React, { useState } from 'react';
import { Language, GlobalService } from '../types';
import { GLOBAL_SERVICES } from '../data/servicesData';
import { compareServices } from '../services/intelligenceEngine';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Star, 
  ShieldCheck, 
  ExternalLink, 
  Scale, 
  Sparkles,
  Plus
} from 'lucide-react';

interface ComparisonStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialServiceIds?: string[];
}

export const ComparisonStudioModal: React.FC<ComparisonStudioModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialServiceIds = ['shopify', 'salla']
}) => {
  const isArabic = lang === 'ar';
  const [selectedIds, setSelectedIds] = useState<string[]>(initialServiceIds);

  if (!isOpen) return null;

  const comparison = compareServices(selectedIds);

  const toggleService = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter(s => s !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds([selectedIds[1], selectedIds[2], id]);
      }
    }
  };

  const presetComparisons = [
    { titleEn: 'Shopify vs Salla (E-Commerce)', titleAr: 'شوبيفاي ضد سلة (المتاجر)', ids: ['shopify', 'salla'] },
    { titleEn: 'Canva vs Figma (Design)', titleAr: 'كانفا ضد فيجما (التصميم)', ids: ['canva', 'figma'] },
    { titleEn: 'ChatGPT vs Google Gemini (AI)', titleAr: 'شات جي بي تي ضد جوجل جيميني (الذكاء الاصطناعي)', ids: ['chatgpt', 'gemini'] },
    { titleEn: 'Notion vs ClickUp (Productivity)', titleAr: 'نوشن ضد كليك أب (إدارة المشاريع)', ids: ['notion', 'clickup'] },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="comparison-modal-card"
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {isArabic ? 'محرك المقارنة المباشرة (Gservia Compare)' : 'Direct Services Comparison Engine'}
              </h3>
              <p className="text-xs text-slate-400">
                {isArabic ? 'مقارنة حيادية بالميزات والأسعار والفروقات الجوهرية' : 'Unbiased head-to-head comparison on pricing & capabilities'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-950/60 flex items-center gap-2 overflow-x-auto text-start">
          <span className="text-xs font-bold text-slate-400 shrink-0">
            {isArabic ? 'مقارنات جاهزة:' : 'Popular Matches:'}
          </span>
          {presetComparisons.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIds(preset.ids)}
              className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 transition-colors shrink-0"
            >
              {isArabic ? preset.titleAr : preset.titleEn}
            </button>
          ))}
        </div>

        {/* Modal Body / Table */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-start space-y-6">
          
          {/* Verdict Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-blue-500/40">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h4 className="text-sm font-black text-white">
                {isArabic ? 'خلاصة قرار Gservia الذكي:' : 'Gservia Intelligence Verdict:'}
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="font-bold text-blue-400 block">{isArabic ? 'للشركات والمشاريع:' : 'Best for Business:'}</span>
                <span>{isArabic ? comparison.verdict.bestForBusinessAr : comparison.verdict.bestForBusiness}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="font-bold text-emerald-400 block">{isArabic ? 'للمبتدئين والسرعة:' : 'Best for Beginners:'}</span>
                <span>{isArabic ? comparison.verdict.bestForBeginnersAr : comparison.verdict.bestForBeginners}</span>
              </div>
            </div>
          </div>

          {/* Comparison Matrix Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[650px] grid grid-cols-3 gap-4">
              
              {/* Feature Header Column */}
              <div className="space-y-4 pt-16 text-xs font-bold text-slate-400">
                <div className="h-10 flex items-center border-b border-slate-800">{isArabic ? 'الخطة المجانية' : 'Free Plan'}</div>
                <div className="h-10 flex items-center border-b border-slate-800">{isArabic ? 'سعر البداية' : 'Starting Price'}</div>
                <div className="h-10 flex items-center border-b border-slate-800">{isArabic ? 'التقييم العام' : 'User Rating'}</div>
                <div className="h-10 flex items-center border-b border-slate-800">{isArabic ? 'اللغة العربية' : 'Arabic Interface'}</div>
                <div className="h-10 flex items-center border-b border-slate-800">{isArabic ? 'المستوى المستهدف' : 'Target Level'}</div>
                <div className="h-24 flex items-center border-b border-slate-800">{isArabic ? 'أبرز المزايا' : 'Key Advantages'}</div>
                <div className="h-20 flex items-center border-b border-slate-800">{isArabic ? 'أبرز القيود' : 'Limitations'}</div>
                <div className="h-12 flex items-center">{isArabic ? 'الموقع الرسمي' : 'Official Site'}</div>
              </div>

              {/* Service Columns */}
              {comparison.services.map((service) => (
                <div 
                  key={service.id} 
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col space-y-4 shadow-lg relative"
                >
                  {/* Service Header */}
                  <div className="h-16 flex items-center gap-3 border-b border-slate-800 pb-2">
                    <img 
                      src={service.logoUrl} 
                      alt={service.name} 
                      className="w-10 h-10 rounded-xl object-contain bg-white p-1 shrink-0" 
                    />
                    <div>
                      <h5 className="text-sm font-black text-white">{isArabic ? (service.nameAr || service.name) : service.name}</h5>
                      <span className="text-[10px] text-slate-400 font-medium">{service.stackRole || service.categoryId}</span>
                    </div>
                  </div>

                  {/* Free Plan */}
                  <div className="h-10 flex items-center border-b border-slate-800 text-xs">
                    {service.freePlan ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> {isArabic ? 'نعم، مجاني متاح' : 'Yes, Free Plan'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 font-semibold">
                        <XCircle className="w-4 h-4" /> {isArabic ? 'تجربة مجانية فقط' : 'Trial Only'}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="h-10 flex items-center border-b border-slate-800 text-xs font-bold text-white">
                    {service.startingPrice === 0 ? (isArabic ? 'مجاني للبدء' : '$0 Free') : `$${service.startingPrice}/mo (${service.currency})`}
                  </div>

                  {/* Rating */}
                  <div className="h-10 flex items-center border-b border-slate-800 text-xs font-bold text-amber-400 gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{service.rating} ({service.reviewCount} {isArabic ? 'مراجعة' : 'reviews'})</span>
                  </div>

                  {/* Arabic */}
                  <div className="h-10 flex items-center border-b border-slate-800 text-xs font-semibold text-slate-200">
                    {service.languages.includes('ar') ? '🇸🇦 كاملة' : '🌐 إنجليزية فقط'}
                  </div>

                  {/* User Level */}
                  <div className="h-10 flex items-center border-b border-slate-800 text-xs text-slate-300">
                    {service.userLevel.join(', ')}
                  </div>

                  {/* Pros */}
                  <div className="h-24 overflow-y-auto border-b border-slate-800 text-[11px] text-slate-300 space-y-1">
                    {(isArabic ? service.prosAr : service.pros).slice(0, 2).map((p, i) => (
                      <div key={i} className="flex items-start gap-1 text-emerald-400">
                        <span>•</span>
                        <span className="text-slate-300">{p}</span>
                      </div>
                    ))}
                  </div>

                  {/* Cons */}
                  <div className="h-20 overflow-y-auto border-b border-slate-800 text-[11px] text-slate-400 space-y-1">
                    {(isArabic ? service.consAr : service.cons).slice(0, 2).map((c, i) => (
                      <div key={i} className="flex items-start gap-1 text-rose-400">
                        <span>•</span>
                        <span className="text-slate-400">{c}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="h-12 flex items-center pt-2">
                    <a
                      href={service.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-1"
                    >
                      <span>{isArabic ? 'الموقع الرسمي' : 'Visit Service'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* Add more to compare */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {isArabic ? 'أضف خدمة أخرى إلى المقارنة:' : 'Add other service to compare:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {GLOBAL_SERVICES.filter(s => !selectedIds.includes(s.id)).slice(0, 5).map(s => (
                <button
                  key={s.id}
                  onClick={() => toggleService(s.id)}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center gap-1 border border-slate-700"
                >
                  <Plus className="w-3 h-3" />
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
