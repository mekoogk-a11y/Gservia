import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { GServiaLogo } from './GServiaLogo';
import { 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  ArrowUpRight, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  Globe2, 
  MessageCircle,
  ExternalLink,
  Bot
} from 'lucide-react';

interface AboutGoogleSectionProps {
  lang: Language;
}

export const AboutGoogleSection: React.FC<AboutGoogleSectionProps> = ({ lang }) => {
  const t = getTranslation(lang);
  const isArabic = lang === 'ar';

  return (
    <section id="about-google" className="py-16 sm:py-24 bg-slate-950 border-t border-b border-slate-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/40 text-blue-400 text-xs font-bold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{isArabic ? '🌍 مرحبًا بك في Gservia' : '🌍 Welcome to Gservia'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {isArabic 
              ? 'دليلك العالمي لاكتشاف الخدمات الإلكترونية' 
              : 'Your Global Guide to Electronic & Digital Services'}
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {isArabic 
              ? 'Gservia هو دليلك العالمي لاكتشاف الخدمات الإلكترونية التي يحتاجها الناس في حياتهم اليومية وأعمالهم.' 
              : 'Gservia is your global guide to discover electronic services people need in their everyday lives and business ventures.'}
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Story Card */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <GServiaLogo size="sm" showText={false} />
                <h3 className="text-xl font-bold text-white">
                  {isArabic ? 'فلسفة ورؤية Gservia' : 'The Gservia Vision & Philosophy'}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/50 space-y-2">
                <p className="text-sm text-blue-200 font-medium leading-relaxed flex items-start gap-2">
                  <span className="text-base">🔎</span>
                  <span>
                    {isArabic 
                      ? 'ابحث عن الخدمة التي تحتاجها، واكتشف أفضل الخيارات المتاحة، وتعرّف على مميزات كل خدمة وطريقة استخدامها، وقارن بين الخدمات للوصول إلى الخيار الأنسب لك.'
                      : 'Search for the service you need, discover top available options, learn each service features and how to use it, and compare services to reach your ideal choice.'}
                  </span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 space-y-2">
                <p className="text-sm text-purple-200 font-medium leading-relaxed flex items-start gap-2">
                  <span className="text-base">💡</span>
                  <span>
                    {isArabic 
                      ? 'Gservia لا يقدم خدمة واحدة فقط، بل يساعدك على الوصول إلى الخدمة المناسبة لاحتياجك.'
                      : 'Gservia does not provide just a single service—it guides you to the right service tailored directly to your specific need.'}
                  </span>
                </p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {isArabic 
                  ? 'نهدف إلى بناء دليل عالمي شامل يجعل العثور على الخدمات الرقمية أسهل وأسرع للجميع.'
                  : 'We aim to build a comprehensive global directory that makes finding digital services easier, faster, and smarter for everyone.'}
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <Search className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    {isArabic ? 'بحث باللغة الطبيعية' : 'Natural Search'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isArabic ? 'اكتب نيتك بلغتك العادية' : 'Search by intent'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    {isArabic ? 'مقارنة حيادية شاملة' : 'Neutral Comparison'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isArabic ? 'مزايا، عيوب، وأسعار' : 'Pros, cons & pricing'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Compatibility & Creator Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800 text-blue-300 text-xs font-bold mb-4">
                <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Gservia Universal Platform</span>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white">
                {isArabic ? 'أخبرنا بما تحتاج، وسنرشدك' : 'Tell us what you need, we guide you'}
              </h3>
              
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                {isArabic 
                  ? 'منصة سحابية متجاوبة مصممة كـ PWA فائق السرعة، تعمل بسلاسة على الهواتف والأجهزة اللوحية والحواسيب.' 
                  : 'Engineered as a high-performance Progressive Web App (PWA) running seamlessly across all devices.'}
              </p>

              {/* Supported Platforms Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-200 mb-6 font-medium">
                <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <Smartphone className="w-4 h-4 text-blue-400" />
                  <span>Android & iOS</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <Monitor className="w-4 h-4 text-blue-400" />
                  <span>Windows & macOS</span>
                </div>
              </div>
            </div>

            {/* Creator Information & WhatsApp */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5 font-medium">
                  {isArabic ? 'تصميم وبرمجة:' : 'Design & Development:'}
                </span>
                <span className="text-base font-bold text-white block">
                  {isArabic ? 'كمال جعفر زكريا' : 'Kamal Gafar Zakaria'}
                </span>
              </div>

              <a
                id="about-designer-whatsapp-btn"
                href="https://wa.me/249919980435"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp: 00249919980435</span>
                <ExternalLink className="w-3.5 h-3.5 text-white ms-1" />
              </a>
            </div>

          </div>

        </div>

        {/* Global Slogan Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-900/50 text-white shadow-xl text-center">
          <h3 className="text-lg sm:text-xl font-extrabold text-blue-400 mb-2">
            Gservia — {isArabic ? 'أخبرنا بما تحتاج، وسنرشدك إلى الخدمة المناسبة.' : 'Tell us what you need, and we will guide you to the right service.'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            {isArabic 
              ? 'دليل عالمي ذكي يختصر عليك وقت البحث ويمنحك أفضل الأدوات الرقمية لبدء أعمالك وتسهيل حياتك.' 
              : 'A smart global directory saving your research time and equipping you with the top digital tools for your business and daily life.'}
          </p>
        </div>

      </div>
    </section>
  );
};
