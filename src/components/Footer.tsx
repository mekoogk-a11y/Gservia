import React from 'react';
import { Language, ServiceCategory } from '../types';
import { getTranslation } from '../data/translations';
import { GServiaLogo } from './GServiaLogo';
import { 
  ArrowUp, 
  MessageCircle, 
  ExternalLink, 
  ShieldCheck,
  Lock,
  FileText
} from 'lucide-react';

interface FooterProps {
  lang: Language;
  categories: ServiceCategory[];
  onSelectCategory: (categoryId: string) => void;
  onOpenPrivacyModal?: () => void;
  onOpenTermsModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  categories,
  onSelectCategory,
  onOpenPrivacyModal,
  onOpenTermsModal,
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

  return (
    <footer id="footer" className="bg-[#090E1A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center">
              <GServiaLogo size="md" subtitle={t.brandTagline} />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'ar' 
                ? 'GServia هي بوابتك العالمية المستقلة لاكتشاف وتنظيم والوصول المباشر إلى خدمات Google الرسمية بسرعة وأمان.'
                : 'GServia is your independent global gateway to discover, organize, and directly access official Google services with speed and security.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'منصة مستقلة وآمنة 100%' : '100% Secure Independent Platform'}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')} 
                  className="hover:text-white transition-colors"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('most-used')} 
                  className="hover:text-white transition-colors"
                >
                  {t.navMostUsed}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('ai-universe')} 
                  className="hover:text-white transition-colors text-purple-400 hover:text-purple-300 font-semibold"
                >
                  {t.navAI}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('all-services')} 
                  className="hover:text-white transition-colors"
                >
                  {t.navServices}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about-google')} 
                  className="hover:text-white transition-colors"
                >
                  {t.navAbout}
                </button>
              </li>
              {onOpenPrivacyModal && (
                <li>
                  <button 
                    onClick={onOpenPrivacyModal} 
                    className="hover:text-white transition-colors text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <Lock className="w-3 h-3" />
                    {t.privacyTitle}
                  </button>
                </li>
              )}
              {onOpenTermsModal && (
                <li>
                  <button 
                    onClick={onOpenTermsModal} 
                    className="hover:text-white transition-colors text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3" />
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
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2 text-xs text-slate-400">
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

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">
                  {lang === 'ar' ? 'تصميم وتطوير:' : 'Designed by:'}
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
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950 transition-all hover:scale-105 w-full justify-center"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>WhatsApp: {t.designerWhatsApp}</span>
                <ExternalLink className="w-3.5 h-3.5 ms-1 opacity-80" />
              </a>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t.designerNote}
            </p>
          </div>

        </div>

        {/* Mandatory Independent Platform Disclaimer */}
        <div className="py-6 border-b border-slate-800 text-xs text-slate-400 leading-relaxed">
          <p className="max-w-5xl">
            <strong className="text-slate-300">Disclaimer: </strong>
            {t.disclaimerText}
          </p>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} GServia — {t.allRightsReserved}. {t.craftedWith} <span className="text-white font-semibold">{t.designerName}</span>.
          </p>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <span>{t.backToTop}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
