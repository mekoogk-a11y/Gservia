import React, { useState, useEffect } from 'react';
import { Language, Theme, UserProfile } from '../types';
import { getTranslation, SUPPORTED_LANGUAGES } from '../data/translations';
import { GServiaLogo } from './GServiaLogo';
import { 
  Menu, 
  X, 
  Search, 
  Star, 
  Layers, 
  Sparkles, 
  Briefcase, 
  Info,
  Download, 
  History, 
  Cpu, 
  ShoppingBag, 
  Terminal, 
  User, 
  ShieldCheck, 
  Bell, 
  LayoutDashboard, 
  ExternalLink,
  Globe,
  CheckCircle2,
  Building2
} from 'lucide-react';

export type MainViewType = 'services' | 'dashboard' | 'integrations' | 'marketplace' | 'developers' | 'account';

interface NavbarProps {
  lang: Language;
  currentView: MainViewType;
  onNavigate: (view: MainViewType) => void;
  user: UserProfile | null;
  onOpenAuthModal: () => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenLangModal: () => void;
  onChangeLang?: (lang: Language) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  recentCount: number;
  onOpenRecent: () => void;
  onFocusSearch: () => void;
  onOpenInstallModal: () => void;
  onOpenPrivacyModal?: () => void;
  onOpenTermsModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  currentView,
  onNavigate,
  user,
  onOpenAuthModal,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenLangModal,
  onChangeLang,
  favoritesCount,
  onOpenFavorites,
  recentCount,
  onOpenRecent,
  onFocusSearch,
  onOpenInstallModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = getTranslation(lang);

  const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: MainViewType) => {
    setMobileMenuOpen(false);
    onNavigate(view);
    if (view === 'services') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleOfficialLang = (targetLang: 'ar' | 'en') => {
    if (onChangeLang) {
      onChangeLang(targetLang);
    }
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl shadow-xl shadow-black/80 border-b border-[#2b2b2b] py-2' 
          : 'bg-black/90 backdrop-blur-md py-2.5 border-b border-[#1f1f1f]'
      }`}
    >
      {/* Micro Enterprise Status Strip */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-1.5">
        <div className="flex items-center justify-between text-[10px] text-neutral-400 font-bold border-b border-[#1c1c1c] pb-1">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-yellow-400 font-black">
              <ShieldCheck className="w-3 h-3 text-yellow-400" />
              {lang === 'ar' ? 'بوابة مؤسسية عالمية معتمدة' : 'Enterprise Verified Cloud Gateway'}
            </span>
            <span className="text-[#333]">•</span>
            <span className="text-neutral-300">
              {lang === 'ar' ? 'معايير أمان Zero-Trust' : 'Zero-Trust Architecture'}
            </span>
            <span className="text-[#333]">•</span>
            <span className="text-neutral-300">
              {lang === 'ar' ? '50+ خدمة رسمية موثقة' : '50+ Official Direct Endpoints'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-400">
              {lang === 'ar' ? 'اللغات الرسمية:' : 'Official Languages:'}
            </span>
            <span className={`px-1.5 py-0.2 rounded font-black ${lang === 'ar' ? 'bg-yellow-400 text-black' : 'text-neutral-300'}`}>
              العربية (رسمية)
            </span>
            <span className="text-[#444]">|</span>
            <span className={`px-1.5 py-0.2 rounded font-black ${lang === 'en' ? 'bg-yellow-400 text-black' : 'text-neutral-300'}`}>
              English (Official)
            </span>
            <span className="text-[#444]">|</span>
            <button 
              onClick={onOpenLangModal}
              className="text-yellow-400 hover:underline font-bold"
            >
              {lang === 'ar' ? '30 لغة عالمية' : '30 World Languages'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* GServia Brand Logo */}
          <button 
            onClick={() => handleNavClick('services')}
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-xl p-1 text-start shrink-0"
            id="nav-logo-btn"
            aria-label="GServia Home"
          >
            <GServiaLogo size="md" subtitle={t.brandTagline} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            
            {/* 1. Services / Catalog */}
            <button
              id="nav-link-services"
              onClick={() => handleNavClick('services')}
              className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all ${
                currentView === 'services'
                  ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/20'
                  : 'text-white hover:text-yellow-400 hover:bg-[#151515]'
              }`}
            >
              {lang === 'ar' ? 'دليل الخدمات' : 'Services Catalog'}
            </button>

            {/* 2. Dashboard */}
            <button
              id="nav-link-dashboard"
              onClick={() => handleNavClick('dashboard')}
              className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/20'
                  : 'text-white hover:text-yellow-400 hover:bg-[#151515]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{t.navDashboard}</span>
            </button>

            {/* 3. Multi-Ecosystem Integrations */}
            <button
              id="nav-link-integrations"
              onClick={() => handleNavClick('integrations')}
              className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'integrations'
                  ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/20'
                  : 'text-white hover:text-yellow-400 hover:bg-[#151515]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{t.navIntegrations}</span>
            </button>

            {/* 4. Marketplace */}
            <button
              id="nav-link-marketplace"
              onClick={() => handleNavClick('marketplace')}
              className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'marketplace'
                  ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/20'
                  : 'text-white hover:text-yellow-400 hover:bg-[#151515]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.navMarketplace}</span>
            </button>

            {/* 5. Developer Platform */}
            <button
              id="nav-link-developers"
              onClick={() => handleNavClick('developers')}
              className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'developers'
                  ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/20'
                  : 'text-white hover:text-yellow-400 hover:bg-[#151515]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{t.navDevelopers}</span>
            </button>

            {/* 6. PWA Install Trigger */}
            <button
              id="nav-link-install"
              onClick={onOpenInstallModal}
              className="px-2.5 py-1.5 text-xs font-bold rounded-xl text-neutral-300 hover:text-yellow-400 hover:bg-[#151515] transition-colors flex items-center gap-1"
            >
              <Download className="w-3 h-3 text-yellow-400" />
              <span>{t.installApp}</span>
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Quick Search Button */}
            <button
              id="nav-search-trigger"
              onClick={() => {
                if (currentView !== 'services') handleNavClick('services');
                setTimeout(() => onFocusSearch(), 100);
              }}
              title={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="p-2 rounded-xl text-white bg-[#111] hover:bg-[#222] border border-[#333] transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <Search className="w-4 h-4 text-yellow-400" />
              <span className="hidden md:inline text-[10px] font-bold text-yellow-400 bg-black px-1.5 py-0.5 rounded border border-[#333]">
                /
              </span>
            </button>

            {/* Recent Services */}
            <button
              id="nav-recent-trigger"
              onClick={onOpenRecent}
              title={t.recentTitle}
              aria-label={t.recentTitle}
              className="relative p-2 rounded-xl text-white bg-[#111] hover:bg-[#222] border border-[#333] transition-colors"
            >
              <History className="w-4 h-4 text-yellow-400" />
              {recentCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {recentCount}
                </span>
              )}
            </button>

            {/* Favorites Button */}
            <button
              id="nav-favorites-trigger"
              onClick={onOpenFavorites}
              title={t.navFavorites}
              aria-label={t.navFavorites}
              className="relative p-2 rounded-xl text-white bg-[#111] hover:bg-[#222] border border-[#333] transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Notifications Bell */}
            <button
              id="nav-notifications-trigger"
              onClick={onOpenNotifications}
              title="Platform Notifications"
              aria-label="Platform Notifications"
              className="relative p-2 rounded-xl text-white bg-[#111] hover:bg-[#222] border border-[#333] transition-colors"
            >
              <Bell className="w-4 h-4 text-yellow-400" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* FAST BILINGUAL SWITCHER (Arabic / English) */}
            <div className="hidden sm:flex items-center bg-[#111] p-0.5 rounded-xl border border-[#333]">
              <button
                onClick={() => handleToggleOfficialLang('ar')}
                className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${
                  lang === 'ar'
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
                title="اللغة الرسمية الأولى (العربية)"
              >
                العربية
              </button>
              <button
                onClick={() => handleToggleOfficialLang('en')}
                className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${
                  lang === 'en'
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
                title="Official Secondary Language (English)"
              >
                EN
              </button>
            </div>

            {/* 30 Languages Global Selector Modal Trigger */}
            <button
              id="nav-lang-toggle"
              onClick={onOpenLangModal}
              title={lang === 'ar' ? 'تغيير اللغة (30 لغة عالمية)' : 'Change Language (30 Global Languages)'}
              aria-label="Change Language"
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#111] hover:bg-[#222] hover:border-yellow-400/60 transition-colors flex items-center gap-1.5 border border-[#333]"
            >
              <Globe className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-sm">{currentLangMeta.flag}</span>
              <span className="hidden xl:inline font-bold text-white text-xs">
                {currentLangMeta.nativeName}
              </span>
              <span className="text-[10px] bg-black px-1.5 py-0.2 rounded border border-[#333] text-yellow-400 font-mono">
                30
              </span>
            </button>

            {/* User Account / Sign In Trigger */}
            {user ? (
              <button
                id="nav-user-account-btn"
                onClick={() => handleNavClick('account')}
                title={user.fullName}
                className={`p-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                  currentView === 'account'
                    ? 'border-yellow-400 bg-yellow-400/20'
                    : 'border-[#333] bg-[#111] hover:border-yellow-400/50'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-yellow-400 text-black font-black text-xs flex items-center justify-center">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden xl:inline text-xs font-bold text-white max-w-[100px] truncate">
                  {user.fullName.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                id="nav-auth-login-btn"
                onClick={onOpenAuthModal}
                className="px-3 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black transition-colors shadow-sm"
              >
                {lang === 'ar' ? 'دخول' : 'Sign In'}
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="nav-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Navigation"
              className="lg:hidden p-2 rounded-xl text-white bg-[#111] hover:bg-[#222] border border-[#333] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-yellow-400" /> : <Menu className="w-5 h-5 text-yellow-400" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-menu"
            className="lg:hidden mt-3 pt-3 pb-4 px-3 bg-black rounded-2xl shadow-2xl border-2 border-[#333] space-y-1 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {/* Mobile Bilingual Quick Switcher */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#111] border border-[#2a2a2a] mb-2">
              <span className="text-xs font-bold text-neutral-300">
                {lang === 'ar' ? 'اللغة الرسمية:' : 'Official Language:'}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { handleToggleOfficialLang('ar'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1 text-xs font-black rounded-lg ${lang === 'ar' ? 'bg-yellow-400 text-black' : 'text-white bg-black'}`}
                >
                  العربية
                </button>
                <button
                  onClick={() => { handleToggleOfficialLang('en'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1 text-xs font-black rounded-lg ${lang === 'en' ? 'bg-yellow-400 text-black' : 'text-white bg-black'}`}
                >
                  English
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenLangModal(); }}
                  className="px-2 py-1 text-xs font-bold text-yellow-400 bg-black border border-[#333] rounded-lg"
                >
                  🌐 30
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('services')}
              className={`w-full text-start px-4 py-2 text-xs font-black rounded-xl flex items-center gap-2.5 ${currentView === 'services' ? 'bg-yellow-400 text-black' : 'text-white hover:bg-[#151515]'}`}
            >
              <Layers className="w-4 h-4 text-yellow-400" />
              {lang === 'ar' ? 'دليل الخدمات الشامل' : 'Services Catalog'}
            </button>

            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full text-start px-4 py-2 text-xs font-black rounded-xl flex items-center gap-2.5 ${currentView === 'dashboard' ? 'bg-yellow-400 text-black' : 'text-white hover:bg-[#151515]'}`}
            >
              <LayoutDashboard className="w-4 h-4 text-yellow-400" />
              {t.navDashboard}
            </button>

            <button
              onClick={() => handleNavClick('integrations')}
              className={`w-full text-start px-4 py-2 text-xs font-black rounded-xl flex items-center gap-2.5 ${currentView === 'integrations' ? 'bg-yellow-400 text-black' : 'text-white hover:bg-[#151515]'}`}
            >
              <Cpu className="w-4 h-4 text-yellow-400" />
              {t.navIntegrations}
            </button>

            <button
              onClick={() => handleNavClick('marketplace')}
              className={`w-full text-start px-4 py-2 text-xs font-black rounded-xl flex items-center gap-2.5 ${currentView === 'marketplace' ? 'bg-yellow-400 text-black' : 'text-white hover:bg-[#151515]'}`}
            >
              <ShoppingBag className="w-4 h-4 text-yellow-400" />
              {t.navMarketplace}
            </button>

            <button
              onClick={() => handleNavClick('developers')}
              className={`w-full text-start px-4 py-2 text-xs font-black rounded-xl flex items-center gap-2.5 ${currentView === 'developers' ? 'bg-yellow-400 text-black' : 'text-white hover:bg-[#151515]'}`}
            >
              <Terminal className="w-4 h-4 text-yellow-400" />
              {t.navDevelopers}
            </button>

            <button
              onClick={() => handleNavClick('account')}
              className={`w-full text-start px-4 py-2 text-xs font-black rounded-xl flex items-center gap-2.5 ${currentView === 'account' ? 'bg-yellow-400 text-black' : 'text-white hover:bg-[#151515]'}`}
            >
              <User className="w-4 h-4 text-yellow-400" />
              {t.navAccount}
            </button>

            {/* Mobile PWA Install trigger */}
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenInstallModal(); }}
              className="w-full text-start px-4 py-2.5 text-xs font-black rounded-xl text-black bg-yellow-400 hover:bg-yellow-300 flex items-center gap-2 shadow-lg shadow-yellow-400/20 mt-2"
            >
              <Download className="w-4 h-4 text-black" />
              {t.installApp}
            </button>
            
            <div className="pt-3 border-t border-[#262626] flex items-center justify-between px-2">
              <span className="text-[11px] text-white font-semibold">
                {lang === 'ar' ? 'المطور: كمال جعفر زكريا' : 'Kamal Gafar Zakaria'}
              </span>
              <a 
                href="https://wa.me/249919980435"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-black text-yellow-400 flex items-center gap-1 hover:underline"
              >
                00249919980435
                <ExternalLink className="w-3 h-3 text-yellow-400" />
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
