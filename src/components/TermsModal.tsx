import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { FileText, ShieldAlert, X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = getTranslation(lang);

  if (!isOpen) return null;

  return (
    <div 
      id="terms-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="terms-modal-content"
        className="relative w-full max-w-xl bg-white dark:bg-[#090E1A] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{t.termsTitle}</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">GServia Platform Terms & Notice</span>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>{t.termsText}</p>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 space-y-2 text-xs leading-relaxed">
            <div className="flex items-center gap-2 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>{t.disclaimerBadge}</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              {t.disclaimerText}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
