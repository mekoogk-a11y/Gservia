import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { GServiaLogo } from './GServiaLogo';
import { 
  Info, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  Zap, 
  Globe2, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';

interface AboutGoogleSectionProps {
  lang: Language;
}

export const AboutGoogleSection: React.FC<AboutGoogleSectionProps> = ({ lang }) => {
  const t = getTranslation(lang);

  return (
    <section id="about-google" className="py-16 sm:py-24 bg-white/70 dark:bg-[#090E1A]/70 backdrop-blur-xl border-t border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-4 shadow-xs">
            <Info className="w-3.5 h-3.5 text-blue-500" />
            <span>{t.aboutTitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            {t.aboutSubtitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium">
            {lang === 'ar' 
              ? 'بوابة حديثة ومستقلة مصممة لتسهيل اكتشاف واستخدام خدمات Google الرسمية' 
              : 'A modern, independent global platform engineered to simplify discovering and accessing official Google tools.'}
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main About Story */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800/90 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <GServiaLogo size="sm" showText={false} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {lang === 'ar' ? 'ما هي منصة GServia؟' : 'What is GServia?'}
              </h3>
            </div>

            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
              {t.aboutParagraph1}
            </p>

            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
              {t.aboutParagraph2}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <Zap className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {lang === 'ar' ? 'وصول مباشر 100%' : '100% Direct Launch'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === 'ar' ? 'روابط مباشرة لمواقع Google الرسمية' : 'Official Google endpoints'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {lang === 'ar' ? 'خصوصية تامة' : 'Total Privacy'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === 'ar' ? 'لا يتم حفظ أو طلب أي كلمات مرور' : 'Zero login or data logging'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Compatibility & Architecture Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-4">
                <Globe2 className="w-3.5 h-3.5" />
                <span>PWA Universal Ecosystem</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {lang === 'ar' ? 'يعمل على جميع الأجهزة' : 'Cross-Platform Everywhere'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {lang === 'ar' 
                  ? 'تم بناء GServia ليعمل كتطبيق ويب تقدمي فائق السرعة على الهواتف والأجهزة اللوحية والحواسيب.' 
                  : 'Engineered as a Progressive Web App (PWA) that installs seamlessly on Android, iOS, Windows, macOS, and Linux.'}
              </p>

              {/* Supported Platforms Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-300 mb-6">
                <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Android & iPhone</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                  <Monitor className="w-4 h-4 text-blue-400" />
                  <span>Windows & macOS</span>
                </div>
              </div>
            </div>

            {/* Designer Card */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  {t.designerTitle}
                </span>
                <span className="text-sm font-bold text-white">
                  {t.designerName}
                </span>
              </div>

              <a
                href="https://wa.me/249919980435"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

        {/* Prominent Mandatory Independent Disclaimer Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 dark:border-amber-500/20 text-slate-900 dark:text-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 uppercase tracking-wider">
                  {t.disclaimerBadge}
                </span>
                <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold">
                  Official Notice
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {t.disclaimerText}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
