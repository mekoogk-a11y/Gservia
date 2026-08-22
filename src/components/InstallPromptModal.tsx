import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { GServiaLogo } from './GServiaLogo';
import { 
  Download, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';

interface InstallPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const InstallPromptModal: React.FC<InstallPromptModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  const t = getTranslation(lang);

  useEffect(() => {
    // Check if running standalone
    const isRunningStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(!!isRunningStandalone);

    // Check iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Catch Chrome/Edge/Android beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      setInstalledSuccess(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setInstalledSuccess(true);
      }
      setDeferredPrompt(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      id="pwa-install-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="pwa-install-modal-content"
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="pwa-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <GServiaLogo size="lg" showText={false} />

          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.installApp}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm font-normal">
              {t.installAppDesc}
            </p>
          </div>
        </div>

        {/* Status / Steps */}
        <div className="mt-6 space-y-4">
          {isStandalone || installedSuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="text-sm font-semibold">
                {lang === 'ar' 
                  ? 'Gservia مثبت بالفعل على جهازك ويعمل كتطبيق مستقل فائق السرعة!' 
                  : 'Gservia is already installed and running as a standalone PWA!'}
              </div>
            </div>
          ) : isIOS ? (
            /* iOS Specific Instructions */
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <Smartphone className="w-4 h-4" />
                <span>{lang === 'ar' ? 'خطوات التثبيت على iPhone / iPad' : 'iPhone & iPad Installation'}</span>
              </div>

              <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-200 font-normal">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
                  <span>{t.iosInstallStep1}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                  <span>{t.iosInstallStep2}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
                  <span>{t.iosInstallStep3}</span>
                </li>
              </ol>
            </div>
          ) : (
            /* Android / Desktop / Chrome / Edge */
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 flex flex-col items-center text-center">
                  <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-1" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Android & Mobile</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Fast 1-click launch</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 flex flex-col items-center text-center">
                  <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-1" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Windows & macOS</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Standalone window</span>
                </div>
              </div>

              {deferredPrompt ? (
                <button
                  id="pwa-confirm-install-btn"
                  onClick={handleInstallClick}
                  className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-sm shadow-blue-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>{t.installApp}</span>
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-normal">
                    {lang === 'ar'
                      ? 'يمكنك تثبيت تطبيق Gservia مباشرة عبر النقر على قائمة المتصفح (⋮ أو ⊕ في شريط العنوان) واختيار "تثبيت التطبيق".'
                      : 'You can install Gservia via your browser menu (⋮ or ⊕ icon in the address bar) and choose "Install App".'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Value props */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{lang === 'ar' ? 'آمن ومستقل' : 'Secure & Independent'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'ar' ? 'تشغيل فوري' : 'Instant Access'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'ar' ? 'دعم دون اتصال' : 'Offline Mode'}</span>
            </div>
          </div>
        </div>

        {/* Close footer */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

