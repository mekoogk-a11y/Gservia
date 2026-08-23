import React, { useState } from 'react';
import { GlobalService, GlobalCategory, Language, SmartSearchIntent, UserLevel } from '../types';
import { ServiceCard } from './ServiceCard';
import { 
  SearchX, 
  RefreshCw, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Filter, 
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';

interface ServicesGridProps {
  services: GlobalService[];
  categories: GlobalCategory[];
  selectedCategory: string;
  searchQuery: string;
  onClearSearch: () => void;
  onSearchSuggestion: (term: string) => void;
  lang: Language;
  favorites: string[];
  onToggleFavorite: (serviceId: string) => void;
  onSelectService: (service: GlobalService) => void;
  onTrackRecent?: (service: GlobalService) => void;
  smartIntent?: SmartSearchIntent | null;
  onOpenAdvisor?: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  services,
  categories,
  selectedCategory,
  searchQuery,
  onClearSearch,
  onSearchSuggestion,
  lang,
  favorites,
  onToggleFavorite,
  onSelectService,
  onTrackRecent,
  smartIntent,
  onOpenAdvisor,
}) => {
  const isArabic = lang === 'ar';
  const [filterFreeOnly, setFilterFreeOnly] = useState<boolean>(false);
  const [filterArabicOnly, setFilterArabicOnly] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Filter services locally by quick filter controls
  let displayedServices = [...(services || [])];

  if (filterFreeOnly) {
    displayedServices = displayedServices.filter(s => s.freePlan);
  }

  if (filterArabicOnly) {
    displayedServices = displayedServices.filter(s => (s.languages || []).includes('ar'));
  }

  if (selectedLevel !== 'all') {
    displayedServices = displayedServices.filter(s => (s.userLevel || []).includes(selectedLevel as UserLevel));
  }

  const searchSuggestions = isArabic
    ? ['متجر إلكتروني', 'تصميم شعار', 'حوالة دولية', 'إدارة مشاريع', 'موقع بدون برمجة', 'ذكاء اصطناعي']
    : ['online store', 'design logo', 'money transfer', 'manage projects', 'no-code website', 'ai assistant'];

  return (
    <div id="services-catalog-view" className="space-y-6 text-start">
      
      {/* Smart Intent Explanation Banner (If search query exists) */}
      {searchQuery.trim() && smartIntent && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-2 border-blue-500/50 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white uppercase tracking-wider">
                  {isArabic ? 'تحليل النية الذكي' : 'Intent Analysis'}
                </span>
                <h4 className="text-sm sm:text-base font-black text-white">
                  {isArabic ? smartIntent.detectedIntentAr : smartIntent.detectedIntent}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {isArabic ? smartIntent.recommendationExplanationAr : smartIntent.recommendationExplanation}
              </p>
            </div>

            {onOpenAdvisor && (
              <button
                onClick={onOpenAdvisor}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 transition-all shadow-md flex items-center justify-center gap-1.5 self-start md:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isArabic ? 'تخصيص عبر المستشار' : 'Fine-tune in Advisor'}</span>
              </button>
            )}
          </div>

          {/* Recommended Tool Stack Banner */}
          {smartIntent.recommendedStack && (
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{isArabic ? smartIntent.recommendedStack.titleAr : smartIntent.recommendedStack.title}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(smartIntent.recommendedStack.tools || []).map((t, idx) => (
                  <div key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-purple-950 text-purple-300 text-[10px] font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-white">{t.serviceName}</span>
                    <span className="text-slate-400 text-[11px]">({isArabic ? t.roleAr : t.role})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter and Refinement Control Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterFreeOnly(!filterFreeOnly)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
              filterFreeOnly
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            {isArabic ? '🟢 خطة مجانية متاحة' : '🟢 Free Plan Available'}
          </button>

          <button
            onClick={() => setFilterArabicOnly(!filterArabicOnly)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
              filterArabicOnly
                ? 'bg-purple-600 text-white border-purple-400 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            {isArabic ? '🇸🇦 واجهة عربية' : '🇸🇦 Arabic Supported'}
          </button>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-1.5 bg-slate-950 text-slate-300 font-semibold rounded-xl border border-slate-800 focus:outline-none"
          >
            <option value="all">{isArabic ? 'كل المستويات' : 'All Levels'}</option>
            <option value="Beginner">{isArabic ? 'مبتدئ (سهل الإعداد)' : 'Beginner Friendly'}</option>
            <option value="Intermediate">{isArabic ? 'متوسط' : 'Intermediate'}</option>
            <option value="Advanced">{isArabic ? 'مطور ومتقدم' : 'Advanced & Dev'}</option>
            <option value="Business">{isArabic ? 'شركات' : 'Business'}</option>
          </select>
        </div>

        {/* Results Counter */}
        <div className="text-slate-400 font-medium">
          {displayedServices.length} {isArabic ? 'خدمة معتمدة' : 'verified services'}
        </div>
      </div>

      {/* Empty State */}
      {displayedServices.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-md max-w-2xl mx-auto text-white">
          <div className="w-16 h-16 rounded-2xl bg-blue-950 text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-800">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black mb-2 text-white">
            {isArabic ? 'لم نجد خدمات تطابق هذه المعايير بالضبط' : 'No matching services found'}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            {isArabic ? 'جرب البحث بكلمات أخرى أو اختر من المقترحات السريعة أدناه:' : 'Try adjusting your search terms or choose from popular suggestions:'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {searchSuggestions.map((term, idx) => (
              <button
                key={idx}
                onClick={() => onSearchSuggestion(term)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700 transition-all"
              >
                {term}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setFilterFreeOnly(false);
              setFilterArabicOnly(false);
              setSelectedLevel('all');
              onClearSearch();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{isArabic ? 'إعادة ضبط البحث والفلاتر' : 'Reset Search & Filters'}</span>
          </button>
        </div>
      ) : (
        /* Results Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              lang={lang}
              isFavorite={favorites.includes(service.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectService={onSelectService}
              onTrackRecent={onTrackRecent}
            />
          ))}
        </div>
      )}

    </div>
  );
};
