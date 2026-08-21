import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { Lock, CheckCircle2, X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = getTranslation(lang);

  if (!isOpen) return null;

  return (
    <div 
      id="privacy-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="privacy-modal-content"
        className="relative w-full max-w-xl bg-[#0a0a0a] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#2a2a2a] text-white max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-yellow-400" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-black border-2 border-yellow-400/40 text-yellow-400 flex items-center justify-center">
            <Lock className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">{t.privacyTitle}</h3>
            <span className="text-xs text-yellow-400 font-bold">GServia Data & Privacy Standards</span>
          </div>
        </div>

        <div className="space-y-4 text-sm text-neutral-200 leading-relaxed font-medium">
          <p>{t.privacyText}</p>

          <div className="p-4 rounded-2xl bg-black border-2 border-[#262626] space-y-3">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <span>{lang === 'ar' ? 'لا نقوم بجمع أو حفظ كلمات المرور أو حسابات Google.' : 'We never collect or store your passwords or Google credentials.'}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <span>{lang === 'ar' ? 'كافة المفضلات وقوائم الاستخدام الأخير تُخزن محلياً على متصفحك.' : 'All favorites and recently used shortcuts are stored locally in your browser.'}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <span>{lang === 'ar' ? 'الروابط تنقلك مباشرة إلى المواقع الرسمية لشركة Google بأمان مشفر.' : 'All links redirect directly and securely to official Google endpoints.'}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#222222] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-black transition-colors shadow-lg shadow-yellow-400/20"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
