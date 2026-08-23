import React, { useState, useEffect, useMemo } from 'react';
import { 
  Language, 
  Theme, 
  GlobalService, 
  UserProfile, 
  IntegrationModule, 
  UserSession, 
  SecurityAuditLog, 
  PlatformNotification 
} from './types';
import { GLOBAL_CATEGORIES, GLOBAL_SERVICES } from './data/servicesData';
import { INTEGRATION_MODULES } from './data/integrationsData';
import { getTranslation, detectDeviceLanguage, RTL_LANGUAGES } from './data/translations';
import { parseSmartIntent } from './services/intelligenceEngine';

// Layout & Core Views
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

// Gservia SaaS Modals & Intelligence Views
import { GserviaAdvisorModal } from './components/GserviaAdvisorModal';
import { ComparisonStudioModal } from './components/ComparisonStudioModal';
import { SubmitServiceModal } from './components/SubmitServiceModal';
import { SaaSPricingModal } from './components/SaaSPricingModal';
import { CategoriesExplorerView } from './components/CategoriesExplorerView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { SudanesePromoAudioPlayer } from './components/SudanesePromoAudioPlayer';

// Enterprise Multi-Ecosystem Views
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
  const [selectedServiceModal, setSelectedServiceModal] = useState<GlobalService | null>(null);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState<boolean>(false);
  const [isRecentDrawerOpen, setIsRecentDrawerOpen] = useState<boolean>(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState<boolean>(false);
  const [isAndroidPublishModalOpen, setIsAndroidPublishModalOpen] = useState<boolean>(false);

  // Gservia SaaS Intelligence Modals
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState<boolean>(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState<boolean>(false);
  const [preselectedComparison, setPreselectedComparison] = useState<{ s1?: GlobalService; s2?: GlobalService }>({});

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
    setIsAdvisorModalOpen(false);
    setIsComparisonModalOpen(false);
    setIsSubmitModalOpen(false);
    setIsPricingModalOpen(false);
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
    isAndroidPublishModalOpen ||
    isAdvisorModalOpen ||
    isComparisonModalOpen ||
    isSubmitModalOpen ||
    isPricingModalOpen
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
      return saved ? JSON.parse(saved) : ['salla', 'shopify', 'chatgpt', 'stripe', 'canva', 'cursor'];
    } catch {
      return ['salla', 'shopify', 'chatgpt', 'stripe', 'canva', 'cursor'];
    }
  });

  // 7. Recent Services state (max 15 items)
  const [recentServiceIds, setRecentServiceIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gservia_recents') || localStorage.getItem('google_hub_recents');
      return saved ? JSON.parse(saved) : ['salla', 'shopify', 'claude'];
    } catch {
      return ['salla', 'shopify', 'claude'];
    }
  });

  // 8. Integrations state
  const [integrations, setIntegrations] = useState<IntegrationModule[]>(INTEGRATION_MODULES);

  // 9. User profile state
  const [user, setUser] = useState<UserProfile>(() => ({
    id: 'usr_gsv_001',
    email: 'user@gservia.global',
    fullName: 'كمال جعفر زكريا',
    organization: 'GServia Global SaaS',
    role: 'admin',
    currency: 'USD ($)',
    timezone: 'UTC (+00:00)',
    twoFactorEnabled: true,
    securityScore: 98,
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
      action: 'Gservia AI Intelligence Matcher Query',
      actionAr: 'استعلام وتوليد حزمة توصيات رقمية ذكية',
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
      title: 'Gservia SaaS Advisor Activated',
      titleAr: 'تم تفعيل مستشار Gservia الذكي',
      message: 'Natural language discovery engine is ready to match you with global SaaS tools.',
      messageAr: 'محرك التحليل الذكي جاهز لإرشادك لأفضل الأدوات والخدمات العالمية بدقة.',
      type: 'success',
      timestamp: 'Just now',
      isRead: false,
    },
    {
      id: 'notif_2',
      title: 'Sudanese Dialect Audio Ad Live',
      titleAr: 'الإعلان الصوتي الحماسي بالعامية السودانية متاح',
      message: 'Listen to the promotional voiceover in Sudanese dialect.',
      messageAr: 'استمع إلى التسجيل الإعلاني الصوتي الحماسي بصوت رجالي إذاعي.',
      type: 'info',
      timestamp: '5m ago',
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

  // Toggle favorite
  const handleToggleFavorite = (serviceId: string) => {
    setFavorites((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  // Track recent service usage
  const handleTrackRecent = (service: GlobalService) => {
    setRecentServiceIds((prev) => {
      const filtered = prev.filter((id) => id !== service.id);
      return [service.id, ...filtered].slice(0, 15);
    });
  };

  // Clear all recent services
  const handleClearRecent = () => {
    setRecentServiceIds([]);
  };

  // Toggle integration connection
  const handleToggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'connected' ? 'disconnected' : 'connected';
          return {
            ...item,
            status: nextStatus,
            lastSynced: nextStatus === 'connected' ? 'الآن' : item.lastSynced,
          };
        }
        return item;
      })
    );
  };

  // Terminate a single session
  const handleTerminateSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  // Reset/Delete user account state
  const handleDeleteAccount = () => {
    setFavorites([]);
    setRecentServiceIds([]);
    localStorage.clear();
    window.location.reload();
  };

  // Quick focus search input
  const handleFocusSearch = () => {
    const input = document.getElementById('search-input');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Smart Intent calculation based on natural language query
  const smartIntent = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return parseSmartIntent(searchQuery, lang);
  }, [searchQuery, lang]);

  // Filtered Services according to search and filters
  const filteredServices = useMemo(() => {
    let result = [...GLOBAL_SERVICES];

    // 1. Natural Language Intent or text match
    if (searchQuery.trim() !== '') {
      if (smartIntent && smartIntent.matchedCategoryIds.length > 0) {
        result = result.map((svc) => {
          let score = svc.matchScore || 70;
          if (smartIntent.matchedCategoryIds.includes(svc.categoryId)) {
            score = 98;
          }
          return { ...svc, matchScore: score };
        }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      } else {
        const q = searchQuery.toLowerCase().trim();
        result = result.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            (s.nameAr && s.nameAr.includes(q)) ||
            s.description.toLowerCase().includes(q) ||
            s.descriptionAr.includes(q) ||
            s.categoryId.toLowerCase().includes(q) ||
            s.features.some((f) => f.toLowerCase().includes(q))
        );
      }
    }

    // 2. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((s) => s.categoryId === selectedCategory);
    }

    // 3. Quick Filter
    if (selectedQuickFilter === 'free') {
      result = result.filter((s) => s.freePlan);
    } else if (selectedQuickFilter === 'arabic') {
      result = result.filter((s) => s.languages.includes('ar'));
    } else if (selectedQuickFilter === 'featured') {
      result = result.filter((s) => s.featured);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedQuickFilter, smartIntent]);

  // Recent services list derived from IDs
  const recentServices = useMemo(() => {
    return recentServiceIds
      .map((id) => GLOBAL_SERVICES.find((s) => s.id === id))
      .filter((s): s is GlobalService => s !== undefined);
  }, [recentServiceIds]);

  const getCategoryCount = (categoryId: string) => {
    return GLOBAL_SERVICES.filter((s) => s.categoryId === categoryId).length;
  };

  const t = getTranslation(lang);
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-blue-500 selection:text-white transition-colors duration-300 relative overflow-x-hidden pt-16 pb-16 md:pb-0">
      
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
            {/* 1. Hero Section with Smart Discovery & Advisor Trigger */}
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
              totalServicesCount={GLOBAL_SERVICES.length}
              filteredCount={filteredServices.length}
              onExploreClick={() => {
                const section = document.getElementById('all-services');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAdvisor={() => setIsAdvisorModalOpen(true)}
              onOpenCompare={() => setIsComparisonModalOpen(true)}
              onOpenPricing={() => setIsPricingModalOpen(true)}
              onOpenSubmit={() => setIsSubmitModalOpen(true)}
            />

            {/* 1.1 Enthusiastic Sudanese Dialect Audio Ad Banner */}
            <SudanesePromoAudioPlayer lang={lang} />

            {/* 2. Most Used Services Section */}
            {!searchQuery && selectedQuickFilter === 'all' && selectedCategory === 'all' && (
              <MostUsedSection
                services={GLOBAL_SERVICES as any}
                lang={lang}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectService={(service) => {
                  handleTrackRecent(service as any);
                  setSelectedServiceModal(service as any);
                }}
                onTrackRecent={handleTrackRecent as any}
              />
            )}

            {/* 3. AI Universe Dedicated Section */}
            {(!searchQuery && (selectedQuickFilter === 'all' || selectedQuickFilter === 'ai') && selectedCategory === 'all') && (
              <AIWorldSection
                services={GLOBAL_SERVICES as any}
                lang={lang}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectService={(service) => {
                  handleTrackRecent(service as any);
                  setSelectedServiceModal(service as any);
                }}
                onTrackRecent={handleTrackRecent as any}
              />
            )}

            {/* 4. Comprehensive All Services Catalog Section */}
            <section id="all-services" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Section Heading */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-start">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-400 text-xs font-black mb-3">
                    <span>{lang === 'ar' ? 'الدليل الشامل للخدمات' : 'Verified Services Directory'}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {lang === 'ar' ? 'استكشف الخدمات الرقمية المعتمدة' : 'Discover Verified Global Digital Services'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-medium">
                    {lang === 'ar' 
                      ? 'اختر الخدمة الأنسب لمشروعك، اطلع على الأسعار والبدائل، وابدأ مباشرة.'
                      : 'Compare verified SaaS platforms, analyze pricing and pros/cons, and launch instantly.'}
                  </p>
                </div>

                {/* Results Count & Quick Compare action */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsComparisonModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>{lang === 'ar' ? 'مقارنة خدمتين' : 'Compare 2 Tools'}</span>
                  </button>
                  <div className="text-xs font-bold text-white bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800 shadow-md">
                    <span>{lang === 'ar' ? 'المعروض:' : 'Showing:'} </span>
                    <span className="text-blue-400 font-black">{filteredServices.length}</span> {lang === 'ar' ? 'من أصل' : 'of'} <span className="font-black">{GLOBAL_SERVICES.length}</span>
                  </div>
                </div>
              </div>

              {/* Category Tabs Filter Bar */}
              <CategoryFilterBar
                categories={GLOBAL_CATEGORIES as any}
                selectedCategory={selectedCategory}
                onSelectCategory={(id) => {
                  setSelectedCategory(id);
                  if (selectedQuickFilter !== 'all') {
                    setSelectedQuickFilter('all');
                  }
                }}
                lang={lang}
                getCategoryCount={getCategoryCount}
                totalServicesCount={GLOBAL_SERVICES.length}
              />

              {/* Services Grid / Catalog */}
              <ServicesGrid
                services={filteredServices}
                categories={GLOBAL_CATEGORIES}
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
                smartIntent={smartIntent}
                onOpenAdvisor={() => setIsAdvisorModalOpen(true)}
              />

            </section>

            {/* 5. About Gservia & Platform Mission Section */}
            <AboutGoogleSection lang={lang} />
          </>
        )}

        {/* VIEW: CATEGORIES EXPLORER */}
        {currentView === 'categories' && (
          <CategoriesExplorerView
            lang={lang}
            onSelectCategory={(catId) => setSelectedCategory(catId)}
            onSelectService={(svc) => {
              handleTrackRecent(svc);
              setSelectedServiceModal(svc);
            }}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* VIEW: ADMIN CONTROL CENTER */}
        {currentView === 'admin' && (
          <AdminDashboardView lang={lang} />
        )}

        {/* VIEW 2: DASHBOARD VIEW */}
        {currentView === 'dashboard' && (
          <DashboardView
            lang={lang}
            user={user}
            integrations={integrations}
            totalServicesCount={GLOBAL_SERVICES.length}
            favoritesCount={favorites.length}
            onNavigate={(view) => setCurrentView(view)}
            onSelectServiceModal={(serviceId) => {
              const svc = GLOBAL_SERVICES.find((s) => s.id === serviceId);
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
        categories={GLOBAL_CATEGORIES as any}
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

      {/* 🌟 GSERVIA AI ADVISOR MODAL */}
      <GserviaAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        lang={lang}
        onSelectService={(svc) => {
          setIsAdvisorModalOpen(false);
          handleTrackRecent(svc);
          setSelectedServiceModal(svc);
        }}
        onCompareServices={(s1, s2) => {
          setIsAdvisorModalOpen(false);
          setPreselectedComparison({ s1, s2 });
          setIsComparisonModalOpen(true);
        }}
      />

      {/* 🌟 COMPARISON STUDIO MODAL */}
      <ComparisonStudioModal
        isOpen={isComparisonModalOpen}
        onClose={() => {
          setIsComparisonModalOpen(false);
          setPreselectedComparison({});
        }}
        lang={lang}
        initialService1={preselectedComparison.s1}
        initialService2={preselectedComparison.s2}
      />

      {/* 🌟 SUBMIT SERVICE MODAL */}
      <SubmitServiceModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        lang={lang}
      />

      {/* 🌟 SAAS PRICING MODAL */}
      <SaaSPricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        lang={lang}
      />

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceModal}
        onClose={() => setSelectedServiceModal(null)}
        lang={lang}
        isFavorite={selectedServiceModal ? favorites.includes(selectedServiceModal.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onTrackRecent={handleTrackRecent}
        onCompareWithAnother={(service) => {
          setSelectedServiceModal(null);
          setPreselectedComparison({ s1: service });
          setIsComparisonModalOpen(true);
        }}
      />

      {/* Favorites Launchpad Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favorites={favorites}
        allServices={GLOBAL_SERVICES as any}
        lang={lang}
        onToggleFavorite={handleToggleFavorite}
        onSelectService={(service) => {
          setIsFavoritesDrawerOpen(false);
          handleTrackRecent(service as any);
          setSelectedServiceModal(service as any);
        }}
        onTrackRecent={handleTrackRecent as any}
      />

      {/* Recent Services Drawer */}
      <RecentServicesDrawer
        isOpen={isRecentDrawerOpen}
        onClose={() => setIsRecentDrawerOpen(false)}
        recentServices={recentServices as any}
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
