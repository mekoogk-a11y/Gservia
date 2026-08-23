import React, { useState, useEffect } from 'react';
import { GServiaLogo } from './GServiaLogo';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Language } from '../types';

interface SplashScreenProps {
  onFinish?: () => void;
  lang?: Language;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, lang = 'ar' }) => {
  const [progress, setProgress] = useState(10);
  const [isFading, setIsFading] = useState(false);
  const [statusText, setStatusText] = useState(
    lang === 'ar' ? 'جارِ تهيئة البوابة العالمية...' : 'Initializing Global Hub...'
  );

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStatusText(lang === 'ar' ? 'تحميل كتالوج خدمات Google المعتمدة...' : 'Loading verified Google services catalog...');
    }, 300);

    const timer2 = setTimeout(() => {
      setProgress(85);
      setStatusText(lang === 'ar' ? 'تجهيز بيئة التشغيل السريع والأمان...' : 'Preparing high-speed secure sandbox...');
    }, 700);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText(lang === 'ar' ? 'جاهز للتشغيل!' : 'Ready to launch!');
    }, 1100);

    const timer4 = setTimeout(() => {
      setIsFading(true);
    }, 1350);

    const timer5 = setTimeout(() => {
      if (onFinish) onFinish();
    }, 1700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [lang, onFinish]);

  return (
    <div 
      id="gservia-native-splash"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 bg-slate-950 text-white select-none transition-all duration-500 ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      {/* Top Status / Badge */}
      <div className="pt-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-semibold text-blue-400">
        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
        <span>Gservia Android & Web Edition</span>
      </div>

      {/* Center Hero Branding */}
      <div className="flex flex-col items-center text-center space-y-6 max-w-sm">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
          <GServiaLogo size="xl" showText={false} className="relative transform scale-125" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            <span>Gservia</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping"></span>
          </h1>
          <p className="text-sm font-medium text-slate-400 leading-relaxed">
            {lang === 'ar' 
              ? 'بوابتك الذكية والمستقلة لجميع خدمات ومنتجات Google' 
              : 'Your Universal Gateway to Google Services & AI Ecosystem'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 space-y-2 pt-2">
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium px-1">
            <span className="truncate">{statusText}</span>
            <span className="font-mono text-blue-400 font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="pb-6 flex flex-col items-center text-center space-y-2 text-xs text-slate-500">
        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-blue-400" />
            <span>Fast Native WebView</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>Offline Ready</span>
          </span>
        </div>
        <div className="text-[10px] text-slate-600 font-mono">
          v1.0.0 (Build 100) • Package: com.gservia.app
        </div>
      </div>
    </div>
  );
};
