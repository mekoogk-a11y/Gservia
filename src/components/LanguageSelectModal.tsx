import React, { useState, useMemo } from 'react';
import { Language, LanguageMeta } from '../types';
import { SUPPORTED_LANGUAGES, getTranslation, RTL_LANGUAGES } from '../data/translations';
import { Globe, Search, Check, X, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="language-select-modal-content"
        className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-[#2b2b2b] text-white flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-black border-2 border-yellow-400/40 text-yellow-400 flex items-center justify-center shrink-0 shadow-lg shadow-yellow-400/10">
              <Globe className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {currentLang === 'ar' ? 'مركز اللغات العالمية (30 لغة)' : 'Global Localization Center (30 Languages)'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 text-[10px] font-black border border-yellow-400/30">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-xs text-neutral-300 font-medium mt-0.5">
                {currentLang === 'ar' 
                  ? 'اللغة الرسمية الأولى: العربية | اللغة الرسمية الثانية: English' 
                  : 'Official Primary: Arabic | Official Secondary: English'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-[#1a1a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-yellow-400" />
          </button>
        </div>

        {/* Official Languages Prominent Callout */}
        <div className="mt-4 p-3.5 rounded-2xl bg-black border-2 border-yellow-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-black text-yellow-400 tracking-wide uppercase">
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
                  className={`flex items-center justify-between p-3 rounded-xl border-2 text-start transition-all ${
                    isSelected
                      ? 'bg-yellow-400 text-black border-yellow-400 font-black shadow-md shadow-yellow-400/20'
                      : 'bg-[#111111] border-[#333333] hover:border-yellow-400 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.flag}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black">{item.nativeName}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                          isSelected ? 'bg-black text-yellow-400' : 'bg-yellow-400/20 text-yellow-400'
                        }`}>
                          {currentLang === 'ar' ? item.badgeAr : item.badgeEn}
                        </span>
                      </div>
                      <span className={`text-xs font-bold ${isSelected ? 'text-black/80' : 'text-neutral-300'}`}>
                        {item.name} {item.dir === 'rtl' ? '(RTL)' : '(LTR)'}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-black text-yellow-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar border-b border-[#222222]">
          {regionTabs.map((tab) => {
            const isSelected = selectedRegion === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-yellow-400 text-black border-yellow-400 shadow-sm'
                    : 'bg-[#111111] text-white border-[#2a2a2a] hover:border-yellow-400/60'
                }`}
              >
                {currentLang === 'ar' ? tab.labelAr : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* Search inside languages */}
        <div className="my-3 relative">
          <Search className="w-4 h-4 text-yellow-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLang === 'ar' ? 'ابحث عن لغة (مثلاً: العربية، English، Français، 中文)...' : 'Search for a language (e.g. Arabic, English, Spanish)...'}
            className="w-full ps-10 pe-10 py-2.5 rounded-xl bg-black border-2 border-[#2b2b2b] text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-yellow-400 font-bold"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Languages Grid */}
        <div className="overflow-y-auto flex-1 pe-1 space-y-1.5 custom-scrollbar max-h-[42vh]">
          {filteredLanguages.length === 0 ? (
            <div className="text-center py-10 text-neutral-400 text-xs font-bold">
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
                    className={`flex items-center justify-between p-3 rounded-2xl border-2 text-start transition-all ${
                      isSelected
                        ? 'bg-yellow-400 text-black border-yellow-400 font-black shadow-lg shadow-yellow-400/20'
                        : 'bg-black border-[#222222] hover:border-yellow-400/60 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{langItem.flag}</span>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold">{langItem.nativeName}</span>
                          {(langItem.isOfficialPrimary || langItem.isOfficialSecondary) && (
                            <span className={`text-[9px] px-1 rounded font-black ${
                              isSelected ? 'bg-black text-yellow-400' : 'bg-yellow-400/20 text-yellow-400'
                            }`}>
                              OFFICIAL
                            </span>
                          )}
                        </div>
                        <span className={`text-[11px] font-medium ${isSelected ? 'text-black/80' : 'text-neutral-300'}`}>
                          {langItem.name} {langItem.dir === 'rtl' ? '(RTL)' : '(LTR)'}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-black text-yellow-400 flex items-center justify-center shrink-0">
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
        <div className="mt-3 pt-3 border-t border-[#222222] flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-medium">
            {currentLang === 'ar' ? '30 لغة عالمية مدعومة بالكامل' : '30 World Languages Supported'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#151515] hover:bg-[#252525] text-sm font-bold text-white border border-[#333333] transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
