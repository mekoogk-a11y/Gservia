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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="language-select-modal-content"
        className="relative w-full max-w-xl bg-[#0a0a0a] rounded-3xl p-6 shadow-2xl border-2 border-[#2a2a2a] text-white flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-black border-2 border-yellow-400/40 text-yellow-400">
              <Globe className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {currentLang === 'ar' ? 'اختر لغة العرض (30 لغة)' : 'Choose Language (30 Languages)'}
              </h3>
              <p className="text-xs text-neutral-300 font-medium">
                {currentLang === 'ar' ? 'تغيير اللغة والاتجاه فورياً' : 'Instant multilingual translation'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
          >
            <X className="w-5 h-5 text-yellow-400" />
          </button>
        </div>

        {/* Search inside languages */}
        <div className="my-4 relative">
          <Search className="w-4 h-4 text-yellow-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLang === 'ar' ? 'ابحث عن لغة...' : 'Search for a language...'}
            className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-black border-2 border-[#262626] text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-yellow-400"
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
                  className={`flex items-center justify-between p-3 rounded-2xl border-2 text-start transition-all ${
                    isSelected
                      ? 'bg-yellow-400 text-black border-yellow-400 font-black shadow-lg shadow-yellow-400/20'
                      : 'bg-black border-[#222222] hover:border-yellow-400/50 text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{langItem.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{langItem.nativeName}</span>
                      <span className={`text-[11px] font-medium ${isSelected ? 'text-black/80' : 'text-neutral-300'}`}>
                        {langItem.name} {langItem.dir === 'rtl' ? '(RTL)' : ''}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-black text-yellow-400 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-[#222222] flex justify-end">
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
