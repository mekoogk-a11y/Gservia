import React, { useState, useEffect } from 'react';
import { Language, Theme } from '../types';
import { getTranslation, SUPPORTED_LANGUAGES } from '../data/translations';
import { GServiaLogo } from './GServiaLogo';
import { 
  Sun, 
  Moon, 
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
  ExternalLink,
  Laptop
} from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onOpenLangModal: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
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
  onOpenLangModal,
  theme,
  setTheme,
  favoritesCount,
  onOpenFavorites,
  recentCount,
  onOpenRecent,
  onFocusSearch,
  onOpenInstallModal,
  onOpenPrivacyModal,
  onOpenTermsModal,
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

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-[#090E1A]/90 backdrop-blur-xl shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 py-2.5' 
          : 'bg-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* GServia Brand Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-1"
            id="nav-logo-btn"
            aria-label="GServia Home"
          >
            <GServiaLogo size="md" subtitle={t.brandTagline} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              id="nav-link-home"
              onClick={() => scrollToSection('hero')}
              className="px-3 py-2 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {t.navHome}
            </button>
            <button
              id="nav-link-most-used"
              onClick={() => scrollToSection('most-used')}
              className="px-3 py-2 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {t.navMostUsed}
            </button>
            <button
              id="nav-link-ai"
              onClick={() => scrollToSection('ai-universe')}
              className="px-3 py-2 text-sm font-medium rounded-xl text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
              {t.navAI}
            </button>
            <button
              id="nav-link-all-services"
              onClick={() => scrollToSection('all-services')}
              className="px-3 py-2 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {t.navServices}
            </button>
            <button
              id="nav-link-about"
              onClick={() => scrollToSection('about-google')}
              className="px-3 py-2 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {t.navAbout}
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Install PWA Button */}
            <button
              id="nav-install-app-btn"
              onClick={onOpenInstallModal}
              title={t.installApp}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.installApp}</span>
            </button>

            {/* Quick Search Button */}
            <button
              id="nav-search-trigger"
              onClick={onFocusSearch}
              title={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                /
              </span>
            </button>

            {/* Recent Services */}
            <button
              id="nav-recent-trigger"
              onClick={onOpenRecent}
              title={t.recentTitle}
              aria-label={t.recentTitle}
              className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <History className="w-4 h-4" />
              {recentCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
              className="relative p-2.5 rounded-xl text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <Star className="w-4 h-4 fill-amber-500/20" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* 30 Languages Modal Trigger */}
            <button
              id="nav-lang-toggle"
              onClick={onOpenLangModal}
              title="Change Language (30 Languages)"
              aria-label="Change Language"
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              <span className="text-sm">{currentLangMeta.flag}</span>
              <span className="hidden sm:inline">{currentLangMeta.nativeName}</span>
            </button>

            {/* Theme Toggle (Light / Dark / System) */}
            <button
              id="nav-theme-toggle"
              onClick={cycleTheme}
              title={`Theme: ${theme}`}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
              {theme === 'dark' && <Moon className="w-4 h-4 text-blue-400" />}
              {theme === 'system' && <Laptop className="w-4 h-4 text-purple-400" />}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="nav-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Navigation"
              className="lg:hidden p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-menu"
            className="lg:hidden mt-3 pt-3 pb-4 px-3 bg-white/95 dark:bg-[#090E1A]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <button
              onClick={() => scrollToSection('hero')}
              className="w-full text-start px-4 py-2.5 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Layers className="w-4 h-4 text-blue-500" />
              {t.navHome}
            </button>
            <button
              onClick={() => scrollToSection('most-used')}
              className="w-full text-start px-4 py-2.5 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Star className="w-4 h-4 text-amber-500" />
              {t.navMostUsed}
            </button>
            <button
              onClick={() => scrollToSection('ai-universe')}
              className="w-full text-start px-4 py-2.5 text-sm font-medium rounded-xl text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 flex items-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              {t.navAI}
            </button>
            <button
              onClick={() => scrollToSection('all-services')}
              className="w-full text-start px-4 py-2.5 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Briefcase className="w-4 h-4 text-emerald-500" />
              {t.navServices}
            </button>
            <button
              onClick={() => scrollToSection('about-google')}
              className="w-full text-start px-4 py-2.5 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Info className="w-4 h-4 text-blue-500" />
              {t.navAbout}
            </button>

            {/* Mobile PWA Install trigger */}
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenInstallModal(); }}
              className="w-full text-start px-4 py-3 text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-2.5 shadow-md shadow-blue-600/20"
            >
              <Download className="w-4 h-4" />
              {t.installApp}
            </button>
            
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'ar' ? 'المطور: كمال جعفر زكريا' : 'Designed by Kamal Gafar Zakaria'}
              </span>
              <a 
                href="https://wa.me/249919980435"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
              >
                00249919980435
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
