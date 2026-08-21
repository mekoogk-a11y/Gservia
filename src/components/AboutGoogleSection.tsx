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
    <section id="about-google" className="py-16 sm:py-24 bg-black border-t border-b border-[#222222] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-yellow-400/40 text-yellow-400 text-xs font-black mb-4 shadow-lg shadow-yellow-400/10">
            <Info className="w-3.5 h-3.5 text-yellow-400" />
            <span>{t.aboutTitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            {t.aboutSubtitle}
          </h2>
          <p className="text-neutral-200 text-sm sm:text-base font-semibold">
            {lang === 'ar' 
              ? 'بوابة حديثة ومستقلة مصممة لتسهيل اكتشاف واستخدام خدمات Google الرسمية' 
              : 'A modern, independent global platform engineered to simplify discovering and accessing official Google tools.'}
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main About Story */}
          <div className="lg:col-span-7 bg-[#0a0a0a] rounded-3xl p-6 sm:p-8 border-2 border-[#262626] shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <GServiaLogo size="sm" showText={false} />
              <h3 className="text-xl font-black text-white">
                {lang === 'ar' ? 'ما هي منصة GServia؟' : 'What is GServia?'}
              </h3>
            </div>

            <p className="text-neutral-200 text-base leading-relaxed font-medium">
              {t.aboutParagraph1}
            </p>

            <p className="text-neutral-200 text-base leading-relaxed font-medium">
              {t.aboutParagraph2}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#222222]">
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-black border border-[#262626]">
                <Zap className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-black text-white block">
                    {lang === 'ar' ? 'وصول مباشر 100%' : '100% Direct Launch'}
                  </span>
                  <span className="text-[11px] text-neutral-300 font-medium">
                    {lang === 'ar' ? 'روابط مباشرة لمواقع Google الرسمية' : 'Official Google endpoints'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-black border border-[#262626]">
                <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-black text-white block">
                    {lang === 'ar' ? 'خصوصية تامة' : 'Total Privacy'}
                  </span>
                  <span className="text-[11px] text-neutral-300 font-medium">
                    {lang === 'ar' ? 'لا يتم حفظ أو طلب أي كلمات مرور' : 'Zero login or data logging'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Compatibility & Architecture Card */}
          <div className="lg:col-span-5 bg-[#0a0a0a] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#262626] shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151515] border border-yellow-400/40 text-yellow-400 text-xs font-bold mb-4">
                <Globe2 className="w-3.5 h-3.5 text-yellow-400" />
                <span>PWA Universal Ecosystem</span>
              </div>
              <h3 className="text-xl font-black mb-3 text-white">
                {lang === 'ar' ? 'يعمل على جميع الأجهزة' : 'Cross-Platform Everywhere'}
              </h3>
              <p className="text-neutral-200 text-sm leading-relaxed mb-6 font-medium">
                {lang === 'ar' 
                  ? 'تم بناء GServia ليعمل كتطبيق ويب تقدمي فائق السرعة على الهواتف والأجهزة اللوحية والحواسيب.' 
                  : 'Engineered as a Progressive Web App (PWA) that installs seamlessly on Android, iOS, Windows, macOS, and Linux.'}
              </p>

              {/* Supported Platforms Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs text-neutral-200 mb-6 font-bold">
                <div className="flex items-center gap-2 bg-black p-2.5 rounded-xl border border-[#262626]">
                  <Smartphone className="w-4 h-4 text-yellow-400" />
                  <span>Android & iPhone</span>
                </div>
                <div className="flex items-center gap-2 bg-black p-2.5 rounded-xl border border-[#262626]">
                  <Monitor className="w-4 h-4 text-yellow-400" />
                  <span>Windows & macOS</span>
                </div>
              </div>
            </div>

            {/* Designer Card */}
            <div className="pt-4 border-t border-[#222222] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-300 block font-bold">
                  {t.designerTitle}
                </span>
                <span className="text-sm font-black text-white">
                  {t.designerName}
                </span>
              </div>

              <a
                href="https://wa.me/249919980435"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black transition-colors shadow-md shadow-yellow-400/20"
              >
                <MessageCircle className="w-3.5 h-3.5 text-black" />
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3 text-black" />
              </a>
            </div>

          </div>

        </div>

        {/* Prominent Mandatory Independent Disclaimer Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e0e] border-2 border-yellow-400/40 text-white shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-black border-2 border-yellow-400/40 flex items-center justify-center text-yellow-400 shrink-0">
              <ShieldCheck className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-yellow-400 text-black uppercase tracking-wider">
                  {t.disclaimerBadge}
                </span>
                <span className="text-xs text-yellow-400 font-bold">
                  Official Notice
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
                {t.disclaimerText}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
