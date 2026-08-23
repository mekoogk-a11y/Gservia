import React, { useState } from 'react';
import { GlobalCategory, GlobalService, Language } from '../types';
import { GLOBAL_CATEGORIES, GLOBAL_SERVICES } from '../data/servicesData';
import { ServiceCard } from './ServiceCard';
import { 
  Layers, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft,
  ChevronDown
} from 'lucide-react';

interface CategoriesExplorerViewProps {
  lang: Language;
  onSelectCategory: (categoryId: string) => void;
  onSelectService: (service: GlobalService) => void;
  favorites: string[];
  onToggleFavorite: (serviceId: string) => void;
}

export const CategoriesExplorerView: React.FC<CategoriesExplorerViewProps> = ({
  lang,
  onSelectCategory,
  onSelectService,
  favorites,
  onToggleFavorite,
}) => {
  const isArabic = lang === 'ar';
  const [activeCatId, setActiveCatId] = useState<string>('ai');

  const selectedCategory = GLOBAL_CATEGORIES.find(c => c.id === activeCatId) || GLOBAL_CATEGORIES[0];
  const categoryServices = GLOBAL_SERVICES.filter(s => s.categoryId === activeCatId);

  const bestFree = categoryServices.find(s => s.freePlan);
  const bestPaid = categoryServices.find(s => s.pricingType !== 'free') || categoryServices[0];

  const faqs = [
    {
      qEn: `How does Gservia choose the best ${selectedCategory.name} services?`,
      qAr: `كيف يختار Gservia أفضل خدمات ${selectedCategory.nameAr}؟`,
      aEn: `We evaluate based on security, uptime, transparent pricing, active updates, and verified real-world user feedback.`,
      aAr: `نقوم بالتقييم الدوري بناءً على معايير الأمان، استقرار الخوادم، وضوح الأسعار، ودعم المستخدمين وجودة التجربة الفعلية.`
    },
    {
      qEn: `Are free services in this category safe for commercial use?`,
      qAr: `هل الخدمات المجانية في هذا القسم آمنة للاستخدام التجاري؟`,
      aEn: `Services labeled with the green Verified badge adhere to standard commercial data privacy and encryption compliance.`,
      aAr: `الخدمات التي تحمل شارة التوثيق الخضراء تخضع لمعايير تشفير وخصوصية معتمدة وآمنة للمشاريع والشركات.`
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-start text-white space-y-8">
      
      {/* Category Navigation Pills */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-black text-white">
            {isArabic ? 'دليل التصنيفات والحلول الرقمية' : 'Digital Services Categories Directory'}
          </h2>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {GLOBAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCatId(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                activeCatId === cat.id
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
              }`}
            >
              {isArabic ? cat.nameAr : cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Category Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-slate-800">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-950 text-blue-400 border border-blue-800 uppercase tracking-wider mb-2 inline-block">
          {isArabic ? 'التصنيف المعتمد' : 'Verified Category Hub'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
          {isArabic ? selectedCategory.nameAr : selectedCategory.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed mb-6">
          {isArabic ? selectedCategory.descriptionAr : selectedCategory.description}
        </p>

        {/* Quick Highlights / Best of Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bestFree && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
              <span className="text-emerald-400 font-bold block mb-1">
                {isArabic ? '🟢 أفضل خيار مجاني للبدء:' : '🟢 Best Free Starter Pick:'}
              </span>
              <strong className="text-white text-sm block">{bestFree.name}</strong>
              <p className="text-slate-300 text-[11px] mt-0.5">
                {isArabic ? bestFree.shortDescriptionAr : bestFree.shortDescription}
              </p>
            </div>
          )}

          {bestPaid && (
            <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs">
              <span className="text-blue-400 font-bold block mb-1">
                {isArabic ? '💼 أفضل خيار للشركات والاحتراف:' : '💼 Best for Businesses & Teams:'}
              </span>
              <strong className="text-white text-sm block">{bestPaid.name}</strong>
              <p className="text-slate-300 text-[11px] mt-0.5">
                {isArabic ? bestPaid.shortDescriptionAr : bestPaid.shortDescription}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Services in this category */}
      <div>
        <h3 className="text-lg font-black text-white mb-4">
          {isArabic ? `الخدمات المتوفرة في قسم ${selectedCategory.nameAr} (${categoryServices.length})` : `Available Tools in ${selectedCategory.name} (${categoryServices.length})`}
        </h3>

        {categoryServices.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400">
            {isArabic ? 'جارٍ إضافة وتدقيق المزيد من الخدمات في هذا القسم قريباً...' : 'More verified tools coming soon in this category...'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                lang={lang}
                isFavorite={favorites.includes(service.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectService={onSelectService}
              />
            ))}
          </div>
        )}
      </div>

      {/* Category FAQs */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-400" />
          <h4 className="text-base font-black text-white">
            {isArabic ? 'الأسئلة الشائعة حول هذا القسم' : 'Frequently Asked Questions'}
          </h4>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
              <strong className="text-sm font-bold text-white block">
                {isArabic ? faq.qAr : faq.qEn}
              </strong>
              <p className="text-slate-300 leading-relaxed">
                {isArabic ? faq.aAr : faq.aEn}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
