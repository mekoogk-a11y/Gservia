import React from 'react';
import { Language, ServiceCategory } from '../types';
import { getTranslation, SUPPORTED_LANGUAGES } from '../data/translations';
import { GServiaLogo } from './GServiaLogo';
import { 
  ArrowUp, 
  MessageCircle, 
  ExternalLink, 
  ShieldCheck,
  Lock,
  FileText,
  Globe,
  Building2
} from 'lucide-react';

interface FooterProps {
  lang: Language;
  categories: ServiceCategory[];
  onSelectCategory: (categoryId: string) => void;
  onOpenPrivacyModal?: () => void;
  onOpenTermsModal?: () => void;
  onSelectLanguage?: (lang: Language) => void;
  onOpenLangModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  categories,
  onSelectCategory,
  onOpenPrivacyModal,
  onOpenTermsModal,
  onSelectLanguage,
  onOpenLangModal,
}) => {
  const t = getTranslation(lang);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const quickFooterLanguages = SUPPORTED_LANGUAGES.slice(0, 10);

  return (
    <footer id="footer" className="bg-slate-900 dark:bg-black text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enterprise Credentials Badge Banner */}
        <div className="mb-12 p-4 rounded-2xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/80 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              {lang === 'ar' ? 'معايير الأمان المؤسسي' : 'Enterprise Security'}
            </span>
            <span className="text-[11px] text-slate-300 dark:text-slate-400 font-medium">
              {lang === 'ar' ? 'بروتوكول Zero-Trust & PKCE' : 'Zero-Trust & PKCE Architecture'}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Lock className="w-4 h-4 text-blue-400" />
              {lang === 'ar' ? 'الخصوصية التامة' : 'Zero Data Retention'}
            </span>
            <span className="text-[11px] text-slate-300 dark:text-slate-400 font-medium">
              {lang === 'ar' ? 'لا يتم حفظ أي كلمات مرور' : 'No Credential Storage'}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Globe className="w-4 h-4 text-blue-400" />
              {lang === 'ar' ? 'تغطية عالمية' : 'Global Localization'}
            </span>
            <span className="text-[11px] text-slate-300 dark:text-slate-400 font-medium">
              {lang === 'ar' ? 'العربية (الرسمية) + 29 لغة' : 'Arabic (Official) + 29 Languages'}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Building2 className="w-4 h-4 text-blue-400" />
              {lang === 'ar' ? 'جاهز للشركات الكبرى' : 'Fortune 500 Ready'}
            </span>
            <span className="text-[11px] text-slate-300 dark:text-slate-400 font-medium">
              {lang === 'ar' ? 'سرعة فائقة و 99.99% توفر' : 'Ultra-Low Latency & 99.99% SLA'}
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center">
              <GServiaLogo size="md" subtitle={t.brandTagline} />
            </div>

            <p className="text-xs text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
              {lang === 'ar' 
                ? 'Gservia هي المنظومة السحابية الموحدة لاكتشاف وتنظيم والوصول المباشر إلى 50+ خدمة رسمية وأدوات Google المتكاملة.'
                : 'Gservia is the unified global cloud ecosystem to discover, organize, and directly access 50+ official Google services.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 dark:bg-slate-900 border border-slate-700 text-white text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>{lang === 'ar' ? 'منصة مستقلة وموثقة رسمياً' : 'Officially Verified Independent Hub'}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 dark:text-slate-400 font-medium">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('most-used')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.navMostUsed}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('ai-universe')} 
                  className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
                >
                  {t.navAI}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('all-services')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.navServices}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about-google')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.navAbout}
                </button>
              </li>
              {onOpenPrivacyModal && (
                <li>
                  <button 
                    onClick={onOpenPrivacyModal} 
                    className="text-blue-400 hover:underline flex items-center gap-1.5 font-medium"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    {t.privacyTitle}
                  </button>
                </li>
              )}
              {onOpenTermsModal && (
                <li>
                  <button 
                    onClick={onOpenTermsModal} 
                    className="text-blue-400 hover:underline flex items-center gap-1.5 font-medium"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {t.termsTitle}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Categories Sitemap */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">
              {t.categoriesNav}
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2 text-xs text-slate-300 dark:text-slate-400 font-medium">
              {categories.slice(0, 8).map((cat) => {
                const catTitle = lang === 'ar' ? cat.titleAr : cat.titleEn;
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        onSelectCategory(cat.id);
                        scrollToSection('all-services');
                      }}
                      className="hover:text-blue-400 transition-colors text-start line-clamp-1"
                    >
                      {catTitle}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 4: Designer Information & WhatsApp */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm">
              {t.designerTitle}
            </h4>

            <div className="p-4 rounded-2xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/80 dark:border-slate-800 space-y-3 shadow-sm">
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5 font-medium">
                  {lang === 'ar' ? 'تصميم وهندسة وتطوير:' : 'Designed & Engineered by:'}
                </span>
                <span className="font-bold text-white text-sm sm:text-base block">
                  {t.designerName}
                </span>
              </div>

              {/* Direct WhatsApp Contact Button */}
              <a
                id="designer-whatsapp-btn"
                href="https://wa.me/249919980435"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm shadow-emerald-500/20 transition-all hover:scale-105 w-full justify-center"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp: {t.designerWhatsApp}</span>
                <ExternalLink className="w-3.5 h-3.5 ms-1 text-white" />
              </a>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
              {t.designerNote}
            </p>
          </div>

        </div>

        {/* Global Languages Quick Footer Strip */}
        <div className="py-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-white">
              {lang === 'ar' ? 'اللغات السريعة:' : 'Quick Languages:'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {quickFooterLanguages.map((item) => {
              const isSelected = lang === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => onSelectLanguage && onSelectLanguage(item.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                      : 'bg-slate-800 dark:bg-slate-900 text-slate-300 border-slate-700 hover:border-blue-400 hover:text-white'
                  }`}
                >
                  <span className="me-1">{item.flag}</span>
                  <span>{item.nativeName}</span>
                </button>
              );
            })}

            {onOpenLangModal && (
              <button
                onClick={onOpenLangModal}
                className="px-3 py-1 rounded-lg text-xs font-bold text-blue-400 bg-slate-800 dark:bg-slate-900 hover:bg-slate-700 border border-blue-500/30 transition-colors"
              >
                {lang === 'ar' ? 'عرض كافة اللغات (30) ←' : 'View All 30 Languages →'}
              </button>
            )}
          </div>
        </div>

        {/* Mandatory Independent Platform Disclaimer */}
        <div className="py-6 border-b border-slate-800 text-xs text-slate-400 leading-relaxed font-normal">
          <p className="max-w-5xl">
            <strong className="text-slate-200 font-bold">Disclaimer: </strong>
            {t.disclaimerText}
          </p>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>
            © {new Date().getFullYear()} Gservia — {t.allRightsReserved}. {t.craftedWith} <span className="text-white font-bold">{t.designerName}</span>.
          </p>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-300 text-xs font-bold border border-slate-700 transition-colors"
          >
            <span>{t.backToTop}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};

