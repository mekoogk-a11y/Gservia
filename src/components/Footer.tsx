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
    <footer id="footer" className="bg-black text-white pt-16 pb-12 border-t-2 border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#222222]">
          
          {/* Col 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center">
              <GServiaLogo size="md" subtitle={t.brandTagline} />
            </div>

            <p className="text-xs text-neutral-200 leading-relaxed font-medium">
              {lang === 'ar' 
                ? 'GServia هي بوابتك العالمية المستقلة لاكتشاف وتنظيم والوصول المباشر إلى خدمات Google الرسمية بسرعة وأمان.'
                : 'GServia is your independent global gateway to discover, organize, and directly access official Google services with speed and security.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111111] border border-[#333333] text-white text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span>{lang === 'ar' ? 'منصة مستقلة وآمنة 100%' : '100% Secure Independent Platform'}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-black text-white text-sm mb-4">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-200 font-bold">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')} 
                  className="hover:text-yellow-400 transition-colors"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('most-used')} 
                  className="hover:text-yellow-400 transition-colors"
                >
                  {t.navMostUsed}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('ai-universe')} 
                  className="text-yellow-400 hover:text-yellow-300 transition-colors font-black"
                >
                  {t.navAI}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('all-services')} 
                  className="hover:text-yellow-400 transition-colors"
                >
                  {t.navServices}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about-google')} 
                  className="hover:text-yellow-400 transition-colors"
                >
                  {t.navAbout}
                </button>
              </li>
              {onOpenPrivacyModal && (
                <li>
                  <button 
                    onClick={onOpenPrivacyModal} 
                    className="text-yellow-400 hover:underline flex items-center gap-1.5 font-bold"
                  >
                    <Lock className="w-3.5 h-3.5 text-yellow-400" />
                    {t.privacyTitle}
                  </button>
                </li>
              )}
              {onOpenTermsModal && (
                <li>
                  <button 
                    onClick={onOpenTermsModal} 
                    className="text-yellow-400 hover:underline flex items-center gap-1.5 font-bold"
                  >
                    <FileText className="w-3.5 h-3.5 text-yellow-400" />
                    {t.termsTitle}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Categories Sitemap */}
          <div>
            <h4 className="font-black text-white text-sm mb-4">
              {t.categoriesNav}
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2 text-xs text-neutral-200 font-bold">
              {categories.slice(0, 8).map((cat) => {
                const catTitle = lang === 'ar' ? cat.titleAr : cat.titleEn;
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        onSelectCategory(cat.id);
                        scrollToSection('all-services');
                      }}
                      className="hover:text-yellow-400 transition-colors text-start line-clamp-1"
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
            <h4 className="font-black text-white text-sm">
              {t.designerTitle}
            </h4>

            <div className="p-4 rounded-2xl bg-[#0e0e0e] border-2 border-[#262626] space-y-3 shadow-xl">
              <div>
                <span className="text-[11px] text-neutral-300 block mb-0.5 font-bold">
                  {lang === 'ar' ? 'تصميم وتطوير:' : 'Designed by:'}
                </span>
                <span className="font-black text-white text-sm sm:text-base block">
                  {t.designerName}
                </span>
              </div>

              {/* Direct WhatsApp Contact Button */}
              <a
                id="designer-whatsapp-btn"
                href="https://wa.me/249919980435"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs shadow-lg shadow-yellow-400/20 transition-all hover:scale-105 w-full justify-center"
              >
                <MessageCircle className="w-4 h-4 text-black" />
                <span>WhatsApp: {t.designerWhatsApp}</span>
                <ExternalLink className="w-3.5 h-3.5 ms-1 text-black" />
              </a>
            </div>

            <p className="text-[11px] text-neutral-300 leading-relaxed font-medium">
              {t.designerNote}
            </p>
          </div>

        </div>

        {/* Mandatory Independent Platform Disclaimer */}
        <div className="py-6 border-b border-[#222222] text-xs text-neutral-200 leading-relaxed font-medium">
          <p className="max-w-5xl">
            <strong className="text-yellow-400 font-bold">Disclaimer: </strong>
            {t.disclaimerText}
          </p>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-300 font-bold">
          <p>
            © {new Date().getFullYear()} GServia — {t.allRightsReserved}. {t.craftedWith} <span className="text-white font-black">{t.designerName}</span>.
          </p>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-yellow-400 hover:text-black text-white text-xs font-black border border-[#333333] transition-colors"
          >
            <span>{t.backToTop}</span>
            <ArrowUp className="w-4 h-4 text-yellow-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
