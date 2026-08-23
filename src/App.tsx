import React, { useState, useEffect, useMemo } from 'react';
import { 
  Language, 
  Theme, 
  GoogleService, 
  UserProfile, 
  IntegrationModule, 
  UserSession, 
  SecurityAuditLog, 
  PlatformNotification 
} from './types';
import { CATEGORIES, GOOGLE_SERVICES } from './data/servicesData';
import { INTEGRATION_MODULES } from './data/integrationsData';
import { getTranslation, detectDeviceLanguage, RTL_LANGUAGES } from './data/translations';
import { Navbar, MainViewType } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MostUsedSection } from './components/MostUsedSection';
import { AIWorldSection } from './components/AIWorldSection';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { ServicesGrid } from './components/ServicesGrid';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { RecentServicesDrawer } from './components/RecentServicesDrawer';
import { LanguageSelectModal } from './components/LanguageSelectModal';
import { InstallPromptModal } from './components/InstallPromptModal';
import { PrivacyModal } from './components/PrivacyModal';
import { TermsModal } from './components/TermsModal';
import { AboutGoogleSection } from './components/AboutGoogleSection';
import { Footer } from './components/Footer';

// New Modular Platform Views & Modals
import { DashboardView } from './components/DashboardView';
import { IntegrationsView } from './components/IntegrationsView';
import { MarketplaceView } from './components/MarketplaceView';
import { DeveloperPlatformView } from './components/DeveloperPlatformView';
import { AccountSecurityView } from './components/AccountSecurityView';
import { AuthModal } from './components/AuthModal';
import { NotificationsModal } from './components/NotificationsModal';
import { SplashScreen } from './components/SplashScreen';
import { MobileBottomNav } from './components/MobileBottomNav';
import { OfflineBanner } from './components/OfflineBanner';
import { AndroidPublishModal } from './components/AndroidPublishModal';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { useAndroidBackButton } from './hooks/useAndroidBackButton';

export default function App() {
  // 0. Splash Screen state
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // 1. Navigation View State
  const [currentView, setCurrentView] = useState<MainViewType>('services');

  // 1.1 Network status tracking
  const network = useNetworkStatus();

  // 2. Language state with auto-detection & localStorage persistence
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('gservia_lang') || localStorage.getItem('google_hub_lang');
      if (saved) return saved as Language;
      return detectDeviceLanguage();
    } catch {
      return 'ar';
    }
  });

  // 3. Theme state with localStorage persistence
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('gservia_theme') || localStorage.getItem('google_hub_theme');
      if (saved) return saved as Theme;
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  // 4. Search and Category Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 5. Modals and Drawers states
  const [selectedServiceModal, setSelectedServiceModal] = useState<GoogleService | null>(null);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState<boolean>(false);
  const [isRecentDrawerOpen, setIsRecentDrawerOpen] = useState<boolean>(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState<boolean>(false);
  const [isAndroidPublishModalOpen, setIsAndroidPublishModalOpen] = useState<boolean>(false);

  // Close all open modals helper for hardware back button
  const handleCloseAllModals = () => {
    setSelectedServiceModal(null);
    setIsFavoritesDrawerOpen(false);
    setIsRecentDrawerOpen(false);
    setIsLangModalOpen(false);
    setIsInstallModalOpen(false);
    setIsPrivacyModalOpen(false);
    setIsTermsModalOpen(false);
    setIsAuthModalOpen(false);
    setIsNotificationsModalOpen(false);
    setIsAndroidPublishModalOpen(false);
  };

  const hasAnyModalOpen = Boolean(
    selectedServiceModal ||
    isFavoritesDrawerOpen ||
    isRecentDrawerOpen ||
    isLangModalOpen ||
    isInstallModalOpen ||
    isPrivacyModalOpen ||
    isTermsModalOpen ||
    isAuthModalOpen ||
    isNotificationsModalOpen ||
    isAndroidPublishModalOpen
  );

  // Hardware/Browser Back Button Handling for Android
  useAndroidBackButton({
    hasOpenModal: hasAnyModalOpen,
    onCloseModals: handleCloseAllModals,
    isSubView: currentView !== 'services',
    onReturnToRoot: () => setCurrentView('services'),
  });

  // 6. Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gservia_favorites') || localStorage.getItem('google_hub_favorites');
      return saved ? JSON.parse(saved) : ['gmail', 'google-search', 'gemini', 'google-drive', 'youtube', 'google-maps'];
    } catch {
      return ['gmail', 'google-search', 'gemini', 'google-drive', 'youtube', 'google-maps'];
    }
  });

  // 7. Recent Services state (max 15 items)
  const [recentServiceIds, setRecentServiceIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gservia_recents') || localStorage.getItem('google_hub_recents');
      return saved ? JSON.parse(saved) : ['gemini', 'google-search', 'google-drive'];
    } catch {
      return ['gemini', 'google-search', 'google-drive'];
    }
  });

  // 8. Integrations state
  const [integrations, setIntegrations] = useState<IntegrationModule[]>(INTEGRATION_MODULES);

  // 9. User profile state
  const [user, setUser] = useState<UserProfile>(() => ({
    id: 'usr_gsv_001',
    email: 'admin@gservia.global',
    fullName: 'كمال جعفر زكريا',
    organization: 'GServia Global Enterprise',
    role: 'admin',
    currency: 'USD ($)',
    timezone: 'UTC (+00:00)',
    twoFactorEnabled: true,
    securityScore: 96,
    createdAt: '2026-08-01',
  }));

  // 10. Sessions state
  const [sessions, setSessions] = useState<UserSession[]>([
    {
      id: 'sess_1',
      device: 'MacBook Pro (Chrome 128 / macOS)',
      ip: '197.251.14.92',
      location: 'Khartoum, Sudan',
      lastActive: 'الآن (النشط)',
      isCurrent: true,
    },
    {
      id: 'sess_2',
      device: 'iPhone 15 Pro (Safari / iOS 18)',
      ip: '197.251.14.95',
      location: 'Khartoum, Sudan',
      lastActive: 'منذ ساعتين',
      isCurrent: false,
    },
  ]);

  // 11. Security Audit Logs state
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>([
    {
      id: 'log_01',
      action: 'Zero-Trust Session Handshake Verified',
      actionAr: 'التحقق الآمن من جلسة العمل عبر بروتوكول PKCE',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      ip: '197.251.14.92',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
      status: 'success',
    },
    {
      id: 'log_02',
      action: 'Google Workspace Integration Scopes Sync',
      actionAr: 'مزامنة أذونات تكامل Google Workspace الرسمية',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      ip: '197.251.14.92',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
      status: 'success',
    },
  ]);

  // 12. Platform Notifications state
  const [notifications, setNotifications] = useState<PlatformNotification[]>([
    {
      id: 'notif_1',
      title: 'Google Cloud Integration Verified',
      titleAr: 'تم توثيق تكامل Google Cloud بنجاح',
      message: 'Zero-trust least-privilege OAuth grant established with GCP console.',
      messageAr: 'تم تأسيس الربط الرسمي الآمن مع سحابة Google وفق مبدأ أقل الصلاحيات.',
      type: 'success',
      timestamp: '10m ago',
      isRead: false,
    },
    {
      id: 'notif_2',
      title: 'Security Posture Audit',
      titleAr: 'تقرير الأمان المؤسسي الدوري',
      message: 'Zero credential logging verified. All external API tokens encrypted in transit.',
      messageAr: 'تم التحقق من عدم تخزين أي كلمات مرور. كافة الرموز مشفرة ومؤمنة بالكامل.',
      type: 'security',
      timestamp: '1h ago',
      isRead: false,
    },
  ]);

  // Sync Language and Direction with <html> element
  useEffect(() => {
    try {
      localStorage.setItem('gservia_lang', lang);
    } catch (e) {
      console.error(e);
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr';
  }, [lang]);

  // Sync Theme with <html> class
  useEffect(() => {
    try {
      localStorage.setItem('gservia_theme', theme);
    } catch (e) {
      console.error(e);
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gservia_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage', err);
    }
  }, [favorites]);

  // Save recents to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gservia_recents', JSON.stringify(recentServiceIds));
    } catch (err) {
      console.error('Failed to save recents to localStorage', err);
    }
  }, [recentServiceIds]);

  // Toggle favorite helper
  const handleToggleFavorite = (serviceId: string) => {
    setFavorites((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Track service access helper
  const handleTrackRecent = (service: GoogleService) => {
    setRecentServiceIds((prev) => {
      const filtered = prev.filter((id) => id !== service.id);
      return [service.id, ...filtered].slice(0, 15);
    });
  };

  const handleClearRecent = () => {
    setRecentServiceIds([]);
  };

  const recentServices = useMemo(() => {
    return recentServiceIds
      .map((id) => GOOGLE_SERVICES.find((s) => s.id === id))
      .filter((s): s is GoogleService => Boolean(s));
  }, [recentServiceIds]);

  // Focus search input handler
  const handleFocusSearch = () => {
    if (currentView !== 'services') {
      setCurrentView('services');
    }
    setTimeout(() => {
      const input = document.getElementById('main-search-input');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Toggle Integration connection helper
  const handleToggleIntegration = (id: string, newStatus: 'connected' | 'disconnected') => {
    setIntegrations((prev) =>
      prev.map((mod) => (mod.id === id ? { ...mod, status: newStatus } : mod))
    );
    // Add audit log
    const targetMod = integrations.find((i) => i.id === id);
    if (targetMod) {
      const newLog: SecurityAuditLog = {
        id: `log_${Date.now()}`,
        action: `Integration ${targetMod.name} status updated to ${newStatus}`,
        actionAr: `تم تحديث حالة التكامل (${targetMod.nameAr}) إلى: ${newStatus === 'connected' ? 'متصل' : 'غير متصل'}`,
        timestamp: new Date().toISOString(),
        ip: '197.251.14.92',
        status: 'success',
      };
      setAuditLogs([newLog, ...auditLogs]);
    }
  };

  const handleTerminateSession = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId));
  };

  const handleDeleteAccount = () => {
    alert(lang === 'ar' ? 'تم حذف الجلسة والبيانات الحسابية بنجاح.' : 'Account data and active sessions cleared.');
    setCurrentView('services');
  };

  // Normalize text for intelligent bilingual & multilingual search
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\u064B-\u065F]/g, '') // remove Arabic Harakat
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي');
  };

  // Filtered services logic
  const filteredServices = useMemo(() => {
    return GOOGLE_SERVICES.filter((service) => {
      // 1. Quick Filters Filter
      if (selectedQuickFilter === 'popular' && !service.isPopular) return false;
      if (selectedQuickFilter === 'ai' && !(service.isAI || service.categoryId === 'ai-tools')) return false;
      if (selectedQuickFilter === 'business' && !(service.isBusiness || service.categoryId === 'business-marketing')) return false;
      if (selectedQuickFilter === 'dev' && !(service.isDev || service.categoryId === 'developer-cloud')) return false;
      if (selectedQuickFilter === 'productivity' && service.categoryId !== 'productivity') return false;
      if (selectedQuickFilter === 'storage' && service.categoryId !== 'storage-media') return false;

      // 2. Category Filter
      if (selectedCategory !== 'all' && service.categoryId !== selectedCategory) {
        return false;
      }

      // 3. Search Query Filter
      if (searchQuery.trim() !== '') {
        const query = normalizeText(searchQuery);

        const matchName = normalizeText(service.name).includes(query);
        const matchNameAr = service.nameAr ? normalizeText(service.nameAr).includes(query) : false;
        const matchDescAr = normalizeText(service.descriptionAr).includes(query);
        const matchDescEn = normalizeText(service.descriptionEn).includes(query);
        const matchKeywordsAr = service.keywordsAr.some((k) => normalizeText(k).includes(query) || query.includes(normalizeText(k)));
        const matchKeywordsEn = service.keywordsEn.some((k) => normalizeText(k).includes(query) || query.includes(normalizeText(k)));

        return matchName || matchNameAr || matchDescAr || matchDescEn || matchKeywordsAr || matchKeywordsEn;
      }

      return true;
    });
  }, [searchQuery, selectedQuickFilter, selectedCategory]);

  const getCategoryCount = (categoryId: string) => {
    return GOOGLE_SERVICES.filter((s) => s.categoryId === categoryId).length;
  };

  const t = getTranslation(lang);
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-yellow-400 selection:text-black transition-colors duration-300 relative overflow-x-hidden pt-16 pb-16 md:pb-0">
      
      {/* 0. Native & Web App Splash Screen */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} lang={lang} />
      )}

      {/* 0.1 Offline Resilience Indicator Banner */}
      <OfflineBanner isOnline={network.isOnline} lang={lang} />

      {/* Sticky Navigation Bar */}
      <Navbar
        lang={lang}
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        user={user}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationsModalOpen(true)}
        onOpenLangModal={() => setIsLangModalOpen(true)}
        onChangeLang={(newLang) => setLang(newLang)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        recentCount={recentServiceIds.length}
        onOpenRecent={() => setIsRecentDrawerOpen(true)}
        onFocusSearch={handleFocusSearch}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenTermsModal={() => setIsTermsModalOpen(true)}
        onOpenAndroidPublishModal={() => setIsAndroidPublishModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: SERVICES CATALOG (HOME) */}
        {currentView === 'services' && (
          <>
            {/* 1. Hero Section with Search and Quick Filters */}
            <HeroSection
              lang={lang}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedQuickFilter={selectedQuickFilter}
              setSelectedQuickFilter={(filter) => {
                setSelectedQuickFilter(filter);
                if (filter !== 'all') {
                  setSelectedCategory('all');
                }
              }}
              totalServicesCount={GOOGLE_SERVICES.length}
              filteredCount={filteredServices.length}
              onExploreClick={() => {
                const section = document.getElementById('all-services');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Most Used Services Section */}
            {!searchQuery && selectedQuickFilter === 'all' && selectedCategory === 'all' && (
              <MostUsedSection
                services={GOOGLE_SERVICES}
                lang={lang}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectService={(service) => {
                  handleTrackRecent(service);
                  setSelectedServiceModal(service);
                }}
                onTrackRecent={handleTrackRecent}
              />
            )}

            {/* 3. AI Universe Dedicated Section */}
            {(!searchQuery && (selectedQuickFilter === 'all' || selectedQuickFilter === 'ai') && selectedCategory === 'all') && (
              <AIWorldSection
                services={GOOGLE_SERVICES}
                lang={lang}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectService={(service) => {
                  handleTrackRecent(service);
                  setSelectedServiceModal(service);
                }}
                onTrackRecent={handleTrackRecent}
              />
            )}

            {/* 4. Comprehensive All Services Catalog Section */}
            <section id="all-services" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Section Heading */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-[#111111] border border-yellow-400/40 text-yellow-400 text-xs font-black mb-3">
                    <span>{lang === 'ar' ? 'الدليل الكامل' : 'Full Catalog'}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {t.allServicesTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-200 mt-1 max-w-2xl font-medium">
                    {t.allServicesSubtitle}
                  </p>
                </div>

                {/* Results Count */}
                <div className="text-xs font-bold text-white bg-[#0e0e0e] px-4 py-2.5 rounded-xl border border-[#2a2a2a] shadow-md">
                  <span>{lang === 'ar' ? 'المعروض:' : 'Showing:'} </span>
                  <span className="text-yellow-400 font-black">{filteredServices.length}</span> {lang === 'ar' ? 'من أصل' : 'of'} <span className="font-black">{GOOGLE_SERVICES.length}</span>
                </div>
              </div>

              {/* Category Tabs Filter Bar */}
              <CategoryFilterBar
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={(id) => {
                  setSelectedCategory(id);
                  if (selectedQuickFilter !== 'all') {
                    setSelectedQuickFilter('all');
                  }
                }}
                lang={lang}
                getCategoryCount={getCategoryCount}
                totalServicesCount={GOOGLE_SERVICES.length}
              />

              {/* Services Grid / Catalog */}
              <ServicesGrid
                services={filteredServices}
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery('')}
                onSearchSuggestion={(term) => setSearchQuery(term)}
                lang={lang}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectService={(service) => {
                  handleTrackRecent(service);
                  setSelectedServiceModal(service);
                }}
                onTrackRecent={handleTrackRecent}
              />

            </section>

            {/* 5. About GServia & Independence Disclaimer Section */}
            <AboutGoogleSection lang={lang} />
          </>
        )}

        {/* VIEW 2: DASHBOARD VIEW */}
        {currentView === 'dashboard' && (
          <DashboardView
            lang={lang}
            user={user}
            integrations={integrations}
            totalServicesCount={GOOGLE_SERVICES.length}
            favoritesCount={favorites.length}
            onNavigate={(view) => setCurrentView(view)}
            onSelectServiceModal={(serviceId) => {
              const svc = GOOGLE_SERVICES.find((s) => s.id === serviceId);
              if (svc) setSelectedServiceModal(svc);
            }}
          />
        )}

        {/* VIEW 3: INTEGRATIONS VIEW */}
        {currentView === 'integrations' && (
          <IntegrationsView
            lang={lang}
            integrations={integrations}
            onToggleIntegration={handleToggleIntegration}
          />
        )}

        {/* VIEW 4: MARKETPLACE VIEW */}
        {currentView === 'marketplace' && (
          <MarketplaceView lang={lang} />
        )}

        {/* VIEW 5: DEVELOPER PLATFORM VIEW */}
        {currentView === 'developers' && (
          <DeveloperPlatformView lang={lang} />
        )}

        {/* VIEW 6: ACCOUNT & SECURITY VIEW */}
        {currentView === 'account' && (
          <AccountSecurityView
            lang={lang}
            user={user}
            sessions={sessions}
            auditLogs={auditLogs}
            onUpdateProfile={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
            onTerminateSession={handleTerminateSession}
            onDeleteAccount={handleDeleteAccount}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        categories={CATEGORIES}
        onSelectCategory={(id) => {
          if (currentView !== 'services') setCurrentView('services');
          setSelectedCategory(id);
          setSelectedQuickFilter('all');
        }}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenTermsModal={() => setIsTermsModalOpen(true)}
        onSelectLanguage={(code) => setLang(code)}
        onOpenLangModal={() => setIsLangModalOpen(true)}
      />

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceModal}
        onClose={() => setSelectedServiceModal(null)}
        lang={lang}
        isFavorite={selectedServiceModal ? favorites.includes(selectedServiceModal.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onTrackRecent={handleTrackRecent}
      />

      {/* Favorites Launchpad Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favorites={favorites}
        allServices={GOOGLE_SERVICES}
        lang={lang}
        onToggleFavorite={handleToggleFavorite}
        onSelectService={(service) => {
          setIsFavoritesDrawerOpen(false);
          handleTrackRecent(service);
          setSelectedServiceModal(service);
        }}
        onTrackRecent={handleTrackRecent}
      />

      {/* Recent Services Drawer */}
      <RecentServicesDrawer
        isOpen={isRecentDrawerOpen}
        onClose={() => setIsRecentDrawerOpen(false)}
        recentServices={recentServices}
        onClearRecent={handleClearRecent}
        lang={lang}
        onSelectService={(service) => {
          setIsRecentDrawerOpen(false);
          handleTrackRecent(service);
          setSelectedServiceModal(service);
        }}
      />

      {/* 30 Languages Modal */}
      <LanguageSelectModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLang={lang}
        onSelectLang={(newLang) => setLang(newLang)}
      />

      {/* PWA Install Modal */}
      <InstallPromptModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        lang={lang}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        lang={lang}
      />

      {/* Terms of Service Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        lang={lang}
      />

      {/* Auth Modal */}
      <AuthModal
        lang={lang}
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(authedUser) => setUser(authedUser)}
      />

      {/* Platform Notifications Modal */}
      <NotificationsModal
        lang={lang}
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))}
        onClearNotifications={() => setNotifications([])}
      />

      {/* Android & Google Play Publishing Hub Modal */}
      <AndroidPublishModal
        isOpen={isAndroidPublishModalOpen}
        onClose={() => setIsAndroidPublishModalOpen(false)}
        lang={lang}
      />

      {/* Mobile / Tablet Bottom Navigation Bar */}
      <MobileBottomNav
        currentView={currentView}
        onSelectView={(view) => setCurrentView(view)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        onOpenRecents={() => setIsRecentDrawerOpen(true)}
        lang={lang}
      />

    </div>
  );
}
