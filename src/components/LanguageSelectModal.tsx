import React, { useState, useMemo } from 'react';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES, getTranslation, RTL_LANGUAGES } from '../data/translations';
import { Globe, Search, Check, X, Building2 } from 'lucide-react';

interface LanguageSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export const LanguageSelectModal: React.FC<LanguageSelectModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectLang,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'official' | 'mena_asia' | 'europe_americas' | 'africa'>('all');
  const t = getTranslation(currentLang);

  const officialLanguages = useMemo(() => {
    return SUPPORTED_LANGUAGES.filter((item) => item.isOfficialPrimary || item.isOfficialSecondary);
  }, []);

  const filteredLanguages = useMemo(() => {
    return SUPPORTED_LANGUAGES.filter((item) => {
      // Region filter
      if (selectedRegion === 'official') {
        if (!item.isOfficialPrimary && !item.isOfficialSecondary) return false;
      } else if (selectedRegion !== 'all') {
        if (item.region !== selectedRegion) return false;
      }

      // Search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchNative = item.nativeName.toLowerCase().includes(q);
        const matchCode = item.code.toLowerCase().includes(q);
        return matchName || matchNative || matchCode;
      }

      return true;
    });
  }, [searchQuery, selectedRegion]);

  if (!isOpen) return null;

  const handleSelect = (code: Language) => {
    onSelectLang(code);
    document.documentElement.lang = code;
    document.documentElement.dir = RTL_LANGUAGES.includes(code) ? 'rtl' : 'ltr';
    onClose();
  };

  const regionTabs = [
    { id: 'all', labelAr: `كافة اللغات (${SUPPORTED_LANGUAGES.length})`, labelEn: `All Languages (${SUPPORTED_LANGUAGES.length})` },
    { id: 'official', labelAr: 'اللغات الرسمية (2)', labelEn: 'Official (2)' },
    { id: 'mena_asia', labelAr: 'الشرق الأوسط وآسيا (13)', labelEn: 'MENA & Asia (13)' },
    { id: 'europe_americas', labelAr: 'أوروبا والأمريكتين (13)', labelEn: 'Europe & Americas (13)' },
    { id: 'africa', labelAr: 'أفريقيا (2)', labelEn: 'Africa (2)' },
  ];

  return (
    <div 
      id="language-select-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="language-select-modal-content"
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {currentLang === 'ar' ? 'مركز اللغات العالمية (30 لغة)' : 'Global Localization Center (30 Languages)'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold border border-blue-200 dark:border-blue-800">
                  GLOBAL
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                {currentLang === 'ar' 
                  ? 'اللغة الرسمية الأولى: العربية | اللغة الرسمية الثانية: English' 
                  : 'Official Primary: Arabic | Official Secondary: English'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Languages Prominent Callout */}
        <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 tracking-wide uppercase">
              {currentLang === 'ar' ? 'اللغات الرسمية المعتمدة للمنصة' : 'Official Platform Languages'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {officialLanguages.map((item) => {
              const isSelected = currentLang === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => handleSelect(item.code)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-start transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-sm shadow-blue-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.flag}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold">{item.nativeName}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                          isSelected ? 'bg-blue-800 text-white' : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                        }`}>
                          {currentLang === 'ar' ? item.badgeAr : item.badgeEn}
                        </span>
                      </div>
                      <span className={`text-xs ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        {item.name} {item.dir === 'rtl' ? '(RTL)' : '(LTR)'}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar border-b border-slate-100 dark:border-slate-800">
          {regionTabs.map((tab) => {
            const isSelected = selectedRegion === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                {currentLang === 'ar' ? tab.labelAr : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* Search inside languages */}
        <div className="my-3 relative">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLang === 'ar' ? 'ابحث عن لغة (مثلاً: العربية، English، Français، 中文)...' : 'Search for a language (e.g. Arabic, English, Spanish)...'}
            className="w-full ps-10 pe-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Languages Grid */}
        <div className="overflow-y-auto flex-1 pe-1 space-y-1.5 custom-scrollbar max-h-[42vh]">
          {filteredLanguages.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs font-medium">
              {currentLang === 'ar' ? 'لا توجد لغة مطابقة للبحث' : 'No matching languages found'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredLanguages.map((langItem) => {
                const isSelected = currentLang === langItem.code;
                return (
                  <button
                    key={langItem.code}
                    onClick={() => handleSelect(langItem.code)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-start transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-md shadow-blue-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400 text-slate-900 dark:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{langItem.flag}</span>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold">{langItem.nativeName}</span>
                          {(langItem.isOfficialPrimary || langItem.isOfficialSecondary) && (
                            <span className={`text-[9px] px-1 rounded font-bold ${
                              isSelected ? 'bg-blue-800 text-white' : 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                            }`}>
                              OFFICIAL
                            </span>
                          )}
                        </div>
                        <span className={`text-[11px] ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                          {langItem.name} {langItem.dir === 'rtl' ? '(RTL)' : '(LTR)'}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {currentLang === 'ar' ? '30 لغة عالمية مدعومة بالكامل' : '30 World Languages Supported'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

