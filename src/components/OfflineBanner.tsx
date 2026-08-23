import React, { useState } from 'react';
import { WifiOff, RefreshCw, CheckCircle, ShieldAlert } from 'lucide-react';
import { Language } from '../types';

interface OfflineBannerProps {
  isOnline: boolean;
  lang: Language;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline, lang }) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [showRestoredNotice, setShowRestoredNotice] = useState(false);
  const isArabic = lang === 'ar';

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      if (navigator.onLine) {
        setShowRestoredNotice(true);
        setTimeout(() => setShowRestoredNotice(false), 3000);
      }
    }, 800);
  };

  if (isOnline && !showRestoredNotice) {
    return null;
  }

  if (showRestoredNotice) {
    return (
      <div 
        id="network-restored-banner"
        className="fixed top-16 start-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top duration-300 pointer-events-none"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-600/30">
          <CheckCircle className="w-4 h-4" />
          <span>{isArabic ? 'تمت استعادة الاتصال بالإنترنت بنجاح!' : 'Internet connection restored!'}</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="gservia-offline-banner"
      className="fixed bottom-16 md:bottom-6 start-4 end-4 md:start-auto md:end-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom duration-300"
    >
      <div className="p-3.5 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 text-white border border-amber-500/40 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <WifiOff className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-amber-300">
                {isArabic ? 'وضع عدم الاتصال (Offline)' : 'Offline Mode Active'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-300 truncate mt-0.5">
              {isArabic 
                ? 'جميع الخدمات والبيانات المحفوظة متاحة محلياً' 
                : 'All cached Google services and catalog are available locally'}
            </p>
          </div>
        </div>

        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shrink-0 transition-all active:scale-95 disabled:opacity-70"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
          <span>{isArabic ? 'إعادة الفحص' : 'Retry'}</span>
        </button>
      </div>
    </div>
  );
};
