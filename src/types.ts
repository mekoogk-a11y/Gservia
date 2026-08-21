export type Language = 
  | 'ar' // العربية
  | 'en' // English
  | 'fr' // Français
  | 'es' // Español
  | 'pt' // Português
  | 'de' // Deutsch
  | 'it' // Italiano
  | 'ru' // Русский
  | 'zh' // 中文
  | 'ja' // 日本語
  | 'ko' // 한국어
  | 'hi' // हिन्दी
  | 'bn' // বাংলা
  | 'ur' // اردو
  | 'tr' // Türkçe
  | 'fa' // فارسی
  | 'id' // Bahasa Indonesia
  | 'ms' // Bahasa Melayu
  | 'th' // ไทย
  | 'vi' // Tiếng Việt
  | 'nl' // Nederlands
  | 'pl' // Polski
  | 'sv' // Svenska
  | 'no' // Norsk
  | 'da' // Dansk
  | 'fi' // Suomi
  | 'el' // Ελληνικά
  | 'he' // עברית
  | 'sw' // Kiswahili
  | 'am'; // አማርኛ

export interface LanguageMeta {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
  flag: string;
}

export type Theme = 'light' | 'dark' | 'system';

export type ServicePlatform = 'web' | 'android' | 'ios' | 'desktop';

export interface ServiceCategory {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  iconName: string;
  color: string;
}

export interface GoogleService {
  id: string;
  name: string;
  nameAr?: string;
  categoryId: string;
  descriptionAr: string;
  descriptionEn: string;
  detailedInfoAr: string;
  detailedInfoEn: string;
  url: string;
  iconName: string;
  colorHex: string;
  badgeAr?: string;
  badgeEn?: string;
  isPopular?: boolean;
  isAI?: boolean;
  isBusiness?: boolean;
  isDev?: boolean;
  isEducation?: boolean;
  keywordsAr: string[];
  keywordsEn: string[];
  featuresAr: string[];
  featuresEn: string[];
  platforms: ServicePlatform[];
  pricingAr: string;
  pricingEn: string;
  releaseYear?: number;
}

export type PlatformView = 
  | 'services' 
  | 'dashboard' 
  | 'integrations' 
  | 'marketplace' 
  | 'developers' 
  | 'account';

export type UserRole = 'user' | 'developer' | 'enterprise_admin' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  organization?: string;
  role: UserRole;
  timezone: string;
  currency: string;
  language?: Language;
  createdAt: string;
  twoFactorEnabled: boolean;
  securityScore: number; // 0-100
}

export interface UserSession {
  id: string;
  device: string;
  browser?: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface SecurityAuditLog {
  id: string;
  action: string;
  actionAr: string;
  category?: 'auth' | 'integration' | 'security' | 'export' | 'settings';
  timestamp: string;
  ip: string;
  status: 'success' | 'warning' | 'failed';
  userAgent?: string;
  details?: string;
}

export type IntegrationProviderId = 
  | 'google' 
  | 'microsoft' 
  | 'openai' 
  | 'apple' 
  | 'github' 
  | 'notion' 
  | 'slack' 
  | 'aws';

export type IntegrationStatus = 'disconnected' | 'connected' | 'syncing' | 'error' | 'revoked';

export interface IntegrationScope {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  isMandatory: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface IntegrationModule {
  id: string;
  provider: IntegrationProviderId;
  providerName: string;
  name: string;
  nameAr: string;
  category: 'cloud' | 'ai' | 'productivity' | 'devtools' | 'communication';
  description: string;
  descriptionAr: string;
  iconName: string;
  status: IntegrationStatus;
  scopes: IntegrationScope[];
  officialDocUrl: string;
  privacyPolicyUrl: string;
  lastSyncAt?: string;
  connectedAccountEmail?: string;
  features: string[];
  featuresAr: string[];
  isGoogleOfficialIntegration?: boolean;
}

export interface MarketplaceApp {
  id: string;
  name: string;
  nameAr: string;
  provider: string;
  category: 'ai' | 'productivity' | 'devtools' | 'analytics' | 'security' | 'storage';
  description: string;
  descriptionAr: string;
  rating: number;
  reviewsCount: number;
  installsCount: number;
  badge?: string;
  badgeAr?: string;
  pricingType: 'free' | 'freemium' | 'paid' | 'open_source';
  iconName: string;
  tags: string[];
  isVerified: boolean;
  version: string;
}

export interface DeveloperApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  scopes: string[];
  createdAt: string;
  lastUsedAt?: string;
  expiresAt?: string;
  status: 'active' | 'revoked';
}

export interface DeveloperWebhook {
  id: string;
  endpointUrl: string;
  events: string[];
  secretMasked: string;
  createdAt: string;
  status: 'active' | 'paused' | 'failed';
  successRate: number;
}

export interface PlatformNotification {
  id: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  type: 'info' | 'success' | 'warning' | 'security';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface SystemCurrency {
  code: string;
  symbol: string;
  name: string;
  nameAr: string;
}

export interface SystemTimezone {
  id: string;
  name: string;
  offset: string;
}

export interface TranslationDictionary {
  brandTitle: string;
  brandTagline: string;
  navHome: string;
  navDashboard: string;
  navIntegrations: string;
  navMarketplace: string;
  navDevelopers: string;
  navAccount: string;
  navMostUsed: string;
  navAI: string;
  navServices: string;
  navAbout: string;
  navFavorites: string;
  navRecent: string;
  navPrivacy: string;
  navTerms: string;
  installApp: string;
  installAppDesc: string;
  searchPlaceholder: string;
  searchShortcut: string;
  clearSearch: string;
  resultsCount: string;
  noResultsTitle: string;
  noResultsDesc: string;
  popularFiltersAll: string;
  popularFiltersPopular: string;
  popularFiltersAI: string;
  popularFiltersBusiness: string;
  popularFiltersDev: string;
  popularFiltersProductivity: string;
  popularFiltersStorage: string;
  heroHeadline: string;
  heroSubheadline: string;
  exploreServices: string;
  mostUsedTitle: string;
  mostUsedSubtitle: string;
  aiSectionBadge: string;
  aiSectionTitle: string;
  aiSectionSubtitle: string;
  allServicesTitle: string;
  allServicesSubtitle: string;
  openService: string;
  directAccess: string;
  learnMore: string;
  shareService: string;
  addToFavorites: string;
  removeFromFavorites: string;
  favoritesTitle: string;
  favoritesEmptyTitle: string;
  favoritesEmptyDesc: string;
  recentTitle: string;
  recentEmpty: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  disclaimerBadge: string;
  disclaimerText: string;
  designerTitle: string;
  designerName: string;
  designerWhatsApp: string;
  designerNote: string;
  allRightsReserved: string;
  craftedWith: string;
  backToTop: string;
  pricing: string;
  supportedPlatforms: string;
  features: string;
  releaseYear: string;
  verifiedService: string;
  copiedUrl: string;
  shareTitle: string;
  shareDesc: string;
  offlineTitle: string;
  offlineDesc: string;
  iosInstallStep1: string;
  iosInstallStep2: string;
  iosInstallStep3: string;
  close: string;
  categoriesNav: string;
  quickLinks: string;
  privacyTitle: string;
  privacyText: string;
  termsTitle: string;
  termsText: string;
  securityNotice: string;
  integrationsTitle: string;
  integrationsSubtitle: string;
  connectService: string;
  disconnectService: string;
  connectedStatus: string;
  disconnectedStatus: string;
  syncNow: string;
  requiredScopes: string;
  officialDocs: string;
  marketplaceTitle: string;
  marketplaceSubtitle: string;
  developerPlatformTitle: string;
  developerPlatformSubtitle: string;
  accountSecurityTitle: string;
  activeSessions: string;
  exportData: string;
  deleteAccount: string;
  twoFactorAuth: string;
  securityAuditLog: string;
  currencyPreference: string;
  timezonePreference: string;
}
