import React, { useEffect } from 'react';
import { Language, Theme, UserProfile } from '../types';
import { getTranslation, SUPPORTED_LANGUAGES } from '../data/translations';
import { GServiaLogo } from './GServiaLogo';
import { MainViewType } from './Navbar';
import { 
  X, 
  Layers, 
  LayoutDashboard, 
  Cpu, 
  ShoppingBag, 
  Terminal, 
  User, 
  Globe, 
  Smartphone, 
  Download, 
  Star, 
  History, 
  Bell, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Check, 
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Mail,
  Zap,
  Grid,
  Sun,
  Moon
} from 'lucide-react';

interface NavigationMegaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  theme?: Theme;
  onToggleTheme?: () => void;
  currentView: MainViewType;
  onNavigate: (view: MainViewType) => void;
  user: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenLangModal: () => void;
  onChangeLang?: (lang: Language) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  recentCount: number;
  onOpenRecent: () => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenInstallModal: () => void;
  onOpenAndroidPublishModal?: () => void;
  onOpenPrivacyModal?: () => void;
  onOpenTermsModal?: () => void;
}

export const NavigationMegaDrawer: React.FC<NavigationMegaDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  theme = 'dark',
  onToggleTheme,
  currentView,
  onNavigate,
  user,
  onOpenAuthModal,
  onOpenLangModal,
  onChangeLang,
  favoritesCount,
  onOpenFavorites,
  recentCount,
  onOpenRecent,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenInstallModal,
  onOpenAndroidPublishModal,
  onOpenPrivacyModal,
  onOpenTermsModal,
}) => {
  const t = getTranslation(lang);
  const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectView = (view: MainViewType) => {
    onNavigate(view);
    onClose();
    if (view === 'services') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    {
      id: 'services' as MainViewType,
      title: lang === 'ar' ? 'دليل الخدمات الشامل' : 'Services Catalog',
      desc: lang === 'ar' ? '50+ خدمة رسمية وسحابية مصنفة' : '50+ official and cloud services categorized',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
      badge: '50+',
    },
    {
      id: 'dashboard' as MainViewType,
      title: t.navDashboard,
      desc: lang === 'ar' ? 'لوحة الرصد والتحليلات المؤسسية' : 'Executive monitoring & ecosystem analytics',
      icon: LayoutDashboard,
      color: 'from-indigo-500 to-purple-500',
      badge: lang === 'ar' ? 'تحليلات' : 'Analytics',
    },
    {
      id: 'integrations' as MainViewType,
      title: t.navIntegrations,
      desc: lang === 'ar' ? 'مزامنة السحابة والذكاء الاصطناعي و Workspace' : 'Cloud, AI & Workspace enterprise connectors',
      icon: Cpu,
      color: 'from-emerald-500 to-teal-500',
      badge: lang === 'ar' ? 'تكاملات' : 'Sync',
    },
    {
      id: 'marketplace' as MainViewType,
      title: t.navMarketplace,
      desc: lang === 'ar' ? 'الحلول الجاهزة والقوالب المعتمدة' : 'Ready solutions & verified enterprise templates',
      icon: ShoppingBag,
      color: 'from-amber-500 to-orange-500',
      badge: lang === 'ar' ? 'متجر' : 'Store',
    },
    {
      id: 'developers' as MainViewType,
      title: t.navDevelopers,
      desc: lang === 'ar' ? 'أدوات الـ SDK و REST API ووثائق التطوير' : 'SDK tools, REST API & developer docs',
      icon: Terminal,
      color: 'from-rose-500 to-pink-500',
      badge: 'v2.4',
    },
    {
      id: 'account' as MainViewType,
      title: t.navAccount,
      desc: lang === 'ar' ? 'إعدادات الحساب والأمان وسياسات Zero-Trust' : 'Account settings, security & Zero-Trust policies',
      icon: User,
      color: 'from-blue-600 to-indigo-600',
      badge: user ? user.role.toUpperCase() : 'AUTH',
    },
  ];

  return (
    <div 
      id="navigation-mega-drawer-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="navigation-mega-drawer-panel"
        className="w-full max-w-lg sm:max-w-xl bg-slate-950 text-white h-full shadow-2xl border-s border-slate-800 flex flex-col animate-in slide-in-from-end duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <GServiaLogo size="sm" subtitle={t.brandTagline} />
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button inside Drawer */}
            {onToggleTheme && (
              <button
                id="drawer-theme-btn"
                onClick={onToggleTheme}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center justify-center transition-colors"
                title={theme === 'dark' ? (lang === 'ar' ? 'الوضع المضيء' : 'Light Mode') : (lang === 'ar' ? 'الوضع الليلي' : 'Dark Mode')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-400" />
                )}
              </button>
            )}

            {/* Quick Language Trigger inside Drawer */}
            <button
              id="drawer-lang-btn"
              onClick={onOpenLangModal}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors"
              title={lang === 'ar' ? 'تغيير اللغة' : 'Change Language'}
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{currentLangMeta.flag}</span>
              <span className="text-[11px] font-semibold">{currentLangMeta.nativeName}</span>
            </button>

            {/* Close Button */}
            <button
              id="drawer-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/60 transition-colors"
              aria-label="Close Navigation Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          
          {/* 1. Quick Fast Bilingual Switcher Bar */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800/80 border border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-slate-300">
                {lang === 'ar' ? 'اللغات المتاحة (30 لغة عالمية):' : 'Available Languages (30 World Languages):'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onChangeLang && onChangeLang('ar')}
                className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${
                  lang === 'ar'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-400 hover:text-white bg-slate-800'
                }`}
              >
                🇸🇦 العربية
              </button>
              <button
                onClick={() => onChangeLang && onChangeLang('en')}
                className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-400 hover:text-white bg-slate-800'
                }`}
              >
                🇺🇸 English
              </button>
              <button
                onClick={onOpenLangModal}
                className="px-2 py-1 text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-950/60 border border-blue-800/80 rounded-lg flex items-center gap-1"
                title={lang === 'ar' ? 'فتح مركز اللغات الـ 30' : 'Open 30 Languages Center'}
              >
                <span>+28</span>
              </button>
            </div>
          </div>

          {/* 2. Primary Navigation Section */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5 text-blue-400" />
                {lang === 'ar' ? 'أقسام المنظومة الرئيسية' : 'Core Platform Hubs'}
              </span>
              <span className="text-[10px] text-slate-300 font-mono">GSERVIA SUITE</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    id={`drawer-nav-${item.id}`}
                    onClick={() => handleSelectView(item.id)}
                    className={`w-full text-start p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                      isActive
                        ? 'bg-blue-600/15 border-blue-500/80 shadow-md shadow-blue-600/10'
                        : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} p-0.5 flex items-center justify-center shrink-0 shadow-sm`}>
                        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${isActive ? 'text-blue-400' : 'text-white group-hover:text-blue-300'}`}>
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 text-[9px] font-black rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 font-normal line-clamp-1 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-slate-500 group-hover:text-blue-400 transition-colors">
                      {lang === 'ar' ? (
                        <ChevronRight className="w-4 h-4 rotate-180" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Specialized Action Cards (Android App + PWA) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {onOpenAndroidPublishModal && (
              <button
                id="drawer-android-hub-card"
                onClick={() => { onClose(); onOpenAndroidPublishModal(); }}
                className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-800/60 hover:border-emerald-500/80 transition-all text-start group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-black border border-emerald-800">
                    AAB READY
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-emerald-300">
                  {lang === 'ar' ? 'تطبيق Android وحزمة Play' : 'Android App & Play Store'}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {lang === 'ar' ? 'حزم الإنتاج AAB ودليل النشر' : 'AAB bundle & deployment hub'}
                </p>
              </button>
            )}

            <button
              id="drawer-pwa-install-card"
              onClick={() => { onClose(); onOpenInstallModal(); }}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-800/60 hover:border-blue-500/80 transition-all text-start group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Download className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 text-[10px] font-black border border-blue-800">
                  PWA OFFLINE
                </span>
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-blue-300">
                {lang === 'ar' ? 'تثبيت التطبيق الفوري' : 'Install PWA App'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {lang === 'ar' ? 'تثبيت بنقرة واحدة لجميع الأجهزة' : '1-Click desktop & mobile install'}
              </p>
            </button>
          </div>

          {/* 4. Quick Storage Drawers & Notification Shortlinks */}
          <div className="grid grid-cols-3 gap-2">
            <button
              id="drawer-quick-favs"
              onClick={() => { onClose(); onOpenFavorites(); }}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition-colors group"
            >
              <div className="flex justify-center mb-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400/30 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-bold text-slate-200 block">
                {t.navFavorites}
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-bold">
                {favoritesCount}
              </span>
            </button>

            <button
              id="drawer-quick-recents"
              onClick={() => { onClose(); onOpenRecent(); }}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition-colors group"
            >
              <div className="flex justify-center mb-1">
                <History className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-bold text-slate-200 block">
                {t.recentTitle}
              </span>
              <span className="text-[10px] text-blue-400 font-mono font-bold">
                {recentCount}
              </span>
            </button>

            <button
              id="drawer-quick-notifs"
              onClick={() => { onClose(); onOpenNotifications(); }}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition-colors group"
            >
              <div className="flex justify-center mb-1">
                <Bell className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-bold text-slate-200 block">
                {lang === 'ar' ? 'الإشعارات' : 'Alerts'}
              </span>
              <span className="text-[10px] text-purple-400 font-mono font-bold">
                {unreadNotificationsCount}
              </span>
            </button>
          </div>

          {/* 5. Enterprise & Developer Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 text-xs text-slate-300 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">
                  {lang === 'ar' ? 'الاستقلالية والاعتماد المؤسسي' : 'Independence & Verification'}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                SECURE
              </span>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t.disclaimerText}
            </p>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px]">
                  {lang === 'ar' ? 'تطوير وهندسة المنصة:' : 'Engineering & Architecture:'}
                </span>
                <span className="font-bold text-white">
                  كمال جعفر زكريا
                </span>
              </div>
              <a
                href="https://wa.me/249919980435"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 font-bold border border-emerald-800/80 flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>00249919980435</span>
              </a>
            </div>
          </div>

        </div>

        {/* Drawer Bottom Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/80 backdrop-blur-xl flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-3">
            {onOpenPrivacyModal && (
              <button 
                onClick={() => { onClose(); onOpenPrivacyModal(); }}
                className="hover:text-white transition-colors"
              >
                {t.navPrivacy || (lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy')}
              </button>
            )}
            <span>•</span>
            {onOpenTermsModal && (
              <button 
                onClick={() => { onClose(); onOpenTermsModal(); }}
                className="hover:text-white transition-colors"
              >
                {t.navTerms || (lang === 'ar' ? 'شروط الاستخدام' : 'Terms of Service')}
              </button>
            )}
          </div>
          <span className="text-[10px] text-slate-300 font-mono">
            v2.4 PRO
          </span>
        </div>

      </div>
    </div>
  );
};
