import React, { useState, useEffect } from 'react';
import { Language, Theme, UserProfile } from '../types';
import { getTranslation, SUPPORTED_LANGUAGES } from '../data/translations';
import { GServiaLogo } from './GServiaLogo';
import { NavigationMegaDrawer } from './NavigationMegaDrawer';
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
  Building2,
  Smartphone,
  ChevronDown,
  Grid
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
  onOpenAndroidPublishModal?: () => void;
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
  onOpenAndroidPublishModal,
  onOpenPrivacyModal,
  onOpenTermsModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaDrawerOpen, setIsMegaDrawerOpen] = useState(false);
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
    setIsMegaDrawerOpen(false);
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
    <>
      <header 
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-950/95 backdrop-blur-2xl shadow-xl shadow-black/60 border-b border-slate-800/80 py-2' 
            : 'bg-slate-950/85 backdrop-blur-xl py-2.5 border-b border-slate-800/60'
        }`}
      >
        {/* Micro Enterprise Status Strip */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold border-b border-slate-800/60 pb-1">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-blue-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                {lang === 'ar' ? 'بوابة مؤسسية عالمية موثقة' : 'Enterprise Verified Cloud Gateway'}
              </span>
              <span className="text-slate-700">•</span>
              <span className="text-slate-300">
                {lang === 'ar' ? 'معايير أمان Zero-Trust' : 'Zero-Trust Architecture'}
              </span>
              <span className="text-slate-700">•</span>
              <span className="text-slate-300">
                {lang === 'ar' ? '50+ خدمة رسمية وسحابية' : '50+ Official Direct Endpoints'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">
                {lang === 'ar' ? 'اللغات المتاحة:' : 'Available Languages:'}
              </span>
              <button
                onClick={() => handleToggleOfficialLang('ar')}
                className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                  lang === 'ar' 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                🇸🇦 العربية (رسمية)
              </button>
              <span className="text-slate-700">|</span>
              <button
                onClick={() => handleToggleOfficialLang('en')}
                className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                  lang === 'en' 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                🇺🇸 English (Official)
              </button>
              <span className="text-slate-700">|</span>
              <button 
                onClick={onOpenLangModal}
                className="text-blue-400 hover:text-blue-300 hover:underline font-bold flex items-center gap-1"
                title={lang === 'ar' ? 'فتح قائمة الـ 30 لغة' : 'Open 30 Languages Menu'}
              >
                <Globe className="w-3 h-3" />
                <span>{lang === 'ar' ? '30 لغة عالمية' : '30 World Languages'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            
            {/* Start Side: Logo & Main Navigation Links */}
            <div className="flex items-center gap-3 xl:gap-5 shrink-0">
              {/* GServia Brand Logo */}
              <button 
                onClick={() => handleNavClick('services')}
                className="flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-1 text-start shrink-0"
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
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    currentView === 'services'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {lang === 'ar' ? 'دليل الخدمات' : 'Services'}
                </button>

                {/* 2. Dashboard */}
                <button
                  id="nav-link-dashboard"
                  onClick={() => handleNavClick('dashboard')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                    currentView === 'dashboard'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{t.navDashboard}</span>
                </button>

                {/* 3. Multi-Ecosystem Integrations */}
                <button
                  id="nav-link-integrations"
                  onClick={() => handleNavClick('integrations')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                    currentView === 'integrations'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{t.navIntegrations}</span>
                </button>

                {/* 4. Marketplace */}
                <button
                  id="nav-link-marketplace"
                  onClick={() => handleNavClick('marketplace')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                    currentView === 'marketplace'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t.navMarketplace}</span>
                </button>

                {/* 5. Developer Platform */}
                <button
                  id="nav-link-developers"
                  onClick={() => handleNavClick('developers')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                    currentView === 'developers'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{t.navDevelopers}</span>
                </button>

                {/* 6. Android App & Google Play Center */}
                {onOpenAndroidPublishModal && (
                  <button
                    id="nav-link-android-hub"
                    onClick={onOpenAndroidPublishModal}
                    className="px-2.5 py-1.5 text-xs font-bold rounded-xl text-emerald-400 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/60 transition-colors flex items-center gap-1 shadow-xs"
                    title={lang === 'ar' ? 'تطبيق Android وحزمة Google Play' : 'Android App & Google Play Hub'}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'ar' ? 'تطبيق Android' : 'Android App'}</span>
                  </button>
                )}
              </nav>
            </div>

            {/* End Side: Prominent Language Button, Quick Tools & Full Menu Button */}
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
                className="p-2 rounded-xl text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Search className="w-4 h-4 text-blue-400" />
                <span className="hidden md:inline text-[10px] font-bold text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                  /
                </span>
              </button>

              {/* Recent Services */}
              <button
                id="nav-recent-trigger"
                onClick={onOpenRecent}
                title={t.recentTitle}
                aria-label={t.recentTitle}
                className="relative p-2 rounded-xl text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-colors"
              >
                <History className="w-4 h-4 text-blue-400" />
                {recentCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
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
                className="relative p-2 rounded-xl text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400/40" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Notifications Bell */}
              <button
                id="nav-notifications-trigger"
                onClick={onOpenNotifications}
                title={lang === 'ar' ? 'الإشعارات والتنبيهات' : 'Platform Notifications'}
                aria-label="Platform Notifications"
                className="relative p-2 rounded-xl text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-colors"
              >
                <Bell className="w-4 h-4 text-purple-400" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* FAST BILINGUAL SWITCHER (Arabic / English) */}
              <div className="hidden xl:flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-700/80">
                <button
                  onClick={() => handleToggleOfficialLang('ar')}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                    lang === 'ar'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="اللغة الرسمية الأولى (العربية)"
                >
                  العربية
                </button>
                <button
                  onClick={() => handleToggleOfficialLang('en')}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                    lang === 'en'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Official Secondary Language (English)"
                >
                  EN
                </button>
              </div>

              {/* 🌟 1. PROMINENT LANGUAGE SELECTOR BUTTON (TOP CORNER) */}
              <button
                id="nav-lang-toggle"
                onClick={onOpenLangModal}
                title={lang === 'ar' ? 'قائمة اللغات المتاحة (30 لغة عالمية)' : 'Available Languages (30 Global Languages)'}
                aria-label="Select Language"
                className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 hover:border-blue-500/80 border border-slate-700/90 transition-all flex items-center gap-1.5 shadow-sm group"
              >
                <div className="w-5 h-5 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Globe className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                </div>
                <span className="text-sm">{currentLangMeta.flag}</span>
                <span className="hidden sm:inline font-bold text-white text-xs">
                  {currentLangMeta.nativeName}
                </span>
                <span className="text-[10px] bg-blue-950/80 text-blue-300 px-1.5 py-0.2 rounded border border-blue-800/80 font-mono font-bold">
                  30
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
              </button>

              {/* User Account / Sign In Trigger */}
              {user ? (
                <button
                  id="nav-user-account-btn"
                  onClick={() => handleNavClick('account')}
                  title={user.fullName}
                  className={`p-1 rounded-xl border transition-all flex items-center gap-1.5 ${
                    currentView === 'account'
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-slate-700/80 bg-slate-900/90 hover:border-blue-400/50'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden 2xl:inline text-xs font-bold text-white max-w-[90px] truncate px-1">
                    {user.fullName.split(' ')[0]}
                  </span>
                </button>
              ) : (
                <button
                  id="nav-auth-login-btn"
                  onClick={onOpenAuthModal}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-sm shadow-blue-600/20"
                >
                  {lang === 'ar' ? 'دخول' : 'Sign In'}
                </button>
              )}

              {/* 🚀 2. PROMINENT MENU BUTTON (TOP CORNER) */}
              <button
                id="nav-main-menu-toggle"
                onClick={() => setIsMegaDrawerOpen(true)}
                aria-label={lang === 'ar' ? 'فتح القائمة الرئيسية' : 'Open Main Navigation Menu'}
                title={lang === 'ar' ? 'القائمة الرئيسية والخدمات' : 'Main Menu & Hubs'}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/30 transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/20 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Menu className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span className="font-black tracking-wide">
                  {lang === 'ar' ? 'القائمة' : 'Menu'}
                </span>
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Modern High-End Mega Navigation Drawer */}
      <NavigationMegaDrawer
        isOpen={isMegaDrawerOpen}
        onClose={() => setIsMegaDrawerOpen(false)}
        lang={lang}
        currentView={currentView}
        onNavigate={handleNavClick}
        user={user}
        onOpenAuthModal={onOpenAuthModal}
        onOpenLangModal={onOpenLangModal}
        onChangeLang={onChangeLang}
        favoritesCount={favoritesCount}
        onOpenFavorites={onOpenFavorites}
        recentCount={recentCount}
        onOpenRecent={onOpenRecent}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenNotifications={onOpenNotifications}
        onOpenInstallModal={onOpenInstallModal}
        onOpenAndroidPublishModal={onOpenAndroidPublishModal}
        onOpenPrivacyModal={onOpenPrivacyModal}
        onOpenTermsModal={onOpenTermsModal}
      />
    </>
  );
};

