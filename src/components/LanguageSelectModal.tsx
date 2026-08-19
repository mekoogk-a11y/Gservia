import React, { useState } from 'react';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES, getTranslation, RTL_LANGUAGES } from '../data/translations';
import { Globe, Search, Check, X } from 'lucide-react';

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
  const t = getTranslation(currentLang);

  if (!isOpen) return null;

  const filteredLanguages = SUPPORTED_LANGUAGES.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.nativeName.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q)
    );
  });

  const handleSelect = (code: Language) => {
    onSelectLang(code);
    document.documentElement.lang = code;
    document.documentElement.dir = RTL_LANGUAGES.includes(code) ? 'rtl' : 'ltr';
    onClose();
  };

  return (
    <div 
      id="language-select-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="language-select-modal-content"
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {currentLang === 'ar' ? 'اختر لغة العرض (30 لغة)' : 'Choose Language (30 Languages)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentLang === 'ar' ? 'تغيير اللغة والاتجاه فورياً' : 'Instant multilingual translation'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search inside languages */}
        <div className="my-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLang === 'ar' ? 'ابحث عن لغة...' : 'Search for a language...'}
            className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Languages Grid */}
        <div className="overflow-y-auto flex-1 pe-1 space-y-1.5 custom-scrollbar max-h-[50vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredLanguages.map((langItem) => {
              const isSelected = currentLang === langItem.code;
              return (
                <button
                  key={langItem.code}
                  onClick={() => handleSelect(langItem.code)}
                  className={`flex items-center justify-between p-3 rounded-2xl border text-start transition-all ${
                    isSelected
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 text-blue-700 dark:text-blue-300 font-bold shadow-sm'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{langItem.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{langItem.nativeName}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {langItem.name} {langItem.dir === 'rtl' ? '(RTL)' : ''}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-semibold transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
