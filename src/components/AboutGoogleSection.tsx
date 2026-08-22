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
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface AboutGoogleSectionProps {
  lang: Language;
}

export const AboutGoogleSection: React.FC<AboutGoogleSectionProps> = ({ lang }) => {
  const t = getTranslation(lang);

  return (
    <section id="about-google" className="py-16 sm:py-24 bg-slate-50/80 dark:bg-slate-950/80 border-t border-b border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-4 shadow-xs">
            <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{t.aboutTitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            {t.aboutSubtitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-normal">
            {lang === 'ar' 
              ? 'بوابة حديثة ومستقلة مصممة لتسهيل اكتشاف واستخدام خدمات Google الرسمية' 
              : 'A modern, independent global platform engineered to simplify discovering and accessing official Google tools.'}
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main About Story */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <GServiaLogo size="sm" showText={false} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {lang === 'ar' ? 'ما هي منصة Gservia؟' : 'What is Gservia?'}
              </h3>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-normal">
              {t.aboutParagraph1}
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-normal">
              {t.aboutParagraph2}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {lang === 'ar' ? 'وصول مباشر 100%' : '100% Direct Launch'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {lang === 'ar' ? 'روابط مباشرة لمواقع Google الرسمية' : 'Official Google endpoints'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {lang === 'ar' ? 'خصوصية تامة' : 'Total Privacy'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {lang === 'ar' ? 'لا يتم حفظ أو طلب أي كلمات مرور' : 'Zero login or data logging'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Compatibility & Architecture Card */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-4">
                <Globe2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>PWA Universal Ecosystem</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                {lang === 'ar' ? 'يعمل على جميع الأجهزة' : 'Cross-Platform Everywhere'}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                {lang === 'ar' 
                  ? 'تم بناء Gservia ليعمل كتطبيق ويب تقدمي فائق السرعة على الهواتف والأجهزة اللوحية والحواسيب.' 
                  : 'Engineered as a Progressive Web App (PWA) that installs seamlessly on Android, iOS, Windows, macOS, and Linux.'}
              </p>

              {/* Supported Platforms Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-200 mb-6 font-medium">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                  <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Android & iPhone</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                  <Monitor className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Windows & macOS</span>
                </div>
              </div>
            </div>

            {/* Designer Card */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  {t.designerTitle}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.designerName}
                </span>
              </div>

              <a
                href="https://wa.me/249919980435"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm shadow-emerald-500/20"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white" />
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3 text-white" />
              </a>
            </div>

          </div>

        </div>

        {/* Prominent Mandatory Independent Disclaimer Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/60 dark:bg-slate-900 border border-blue-200 dark:border-blue-900/50 text-slate-900 dark:text-white shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white uppercase tracking-wider">
                  {t.disclaimerBadge}
                </span>
                <span className="text-xs text-blue-700 dark:text-blue-300 font-semibold">
                  Official Notice
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {t.disclaimerText}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

