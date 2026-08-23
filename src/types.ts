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
  | 'he' // עבריت
  | 'sw' // Kiswahili
  | 'am'; // አማርኛ

export interface LanguageMeta {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
  flag: string;
  region?: 'official' | 'mena_asia' | 'europe_americas' | 'africa';
  isOfficialPrimary?: boolean;
  isOfficialSecondary?: boolean;
  badgeAr?: string;
  badgeEn?: string;
}

export type Theme = 'light' | 'dark' | 'system';

export type ServicePlatform = 'web' | 'android' | 'ios' | 'desktop' | 'api' | 'extension';

export type UserLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Business';

export type PricingType = 'free' | 'freemium' | 'paid' | 'contact_sales' | 'open_source';

// Core Global Digital Services Entity (Production Database Schema)
export interface GlobalService {
  id: string;
  name: string;
  slug: string;
  nameAr?: string;
  description: string;
  descriptionAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  websiteUrl: string;
  logoUrl: string;
  categoryId: string;
  subcategoryId?: string;
  pricingType: PricingType;
  startingPrice: number; // in USD
  currency: string;
  freePlan: boolean;
  trialAvailable: boolean;
  rating: number; // 0.0 to 5.0
  reviewCount: number;
  languages: string[]; // ['ar', 'en', 'es', ...]
  countries: string[]; // ['Global', 'MENA', 'US', ...]
  features: string[];
  featuresAr: string[];
  pros: string[];
  prosAr: string[];
  cons: string[];
  consAr: string[];
  alternatives: string[]; // Service IDs or names
  verified: boolean;
  featured: boolean;
  sponsored?: boolean;
  matchScore?: number; // 0-100% computed dynamically
  userLevel: UserLevel[];
  bestFor: string;
  bestForAr: string;
  howToStart: string[];
  howToStartAr: string[];
  lastVerifiedAt: string;
  dataSource: string;
  stackRole?: string; // e.g. "E-commerce Engine", "Payment Gateway", "AI Assistant", "CRM"
  iconName?: string;
  colorHex?: string;
  platforms?: ServicePlatform[];
}

export interface GlobalCategory {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  icon: string;
  color: string;
  subcategories?: GlobalSubcategory[];
}

export interface GlobalSubcategory {
  id: string;
  categoryId: string;
  name: string;
  nameAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
}

// Smart Intent & Natural Language Discovery Result
export interface SmartSearchIntent {
  rawQuery: string;
  detectedIntent: string;
  detectedIntentAr: string;
  category: string;
  matchedCategoryIds?: string[];
  subcategory?: string;
  requirements: string[];
  budget: 'free' | 'low' | 'flexible' | 'enterprise';
  userLevel: UserLevel;
  arabicRequired: boolean;
  recommendationExplanation: string;
  recommendationExplanationAr: string;
  recommendedServices: GlobalService[];
  recommendedStack?: RecommendedToolStack;
}

export interface RecommendedToolStack {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  tools: {
    role: string;
    roleAr: string;
    serviceId: string;
    serviceName: string;
    serviceUrl: string;
    reason: string;
    reasonAr: string;
  }[];
}

// Gservia AI Advisor Types
export interface AdvisorStepAnswers {
  needText: string;
  budget: 'free_only' | 'low_cost' | 'flexible' | 'enterprise';
  skillLevel: UserLevel;
  needArabic: boolean;
  usageType: 'personal' | 'freelance' | 'small_business' | 'enterprise';
  country?: string;
}

export interface AdvisorRecommendationResult {
  topPick: GlobalService;
  matchScore: number;
  matchReason: string;
  matchReasonAr: string;
  freeAlternative?: GlobalService;
  proAlternative?: GlobalService;
  fastSetupAlternative?: GlobalService;
  actionableSteps: string[];
  actionableStepsAr: string[];
  recommendedStack?: RecommendedToolStack;
}

// Comparison Engine
export interface ServiceComparison {
  services: GlobalService[];
  verdict: {
    bestForBeginners: string;
    bestForBeginnersAr: string;
    bestForProfessionals: string;
    bestForProfessionalsAr: string;
    bestFreeOption: string;
    bestFreeOptionAr: string;
    bestForBusiness: string;
    bestForBusinessAr: string;
    summary: string;
    summaryAr: string;
  };
}

// Reviews & Ratings
export interface ServiceReview {
  id: string;
  serviceId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userRole?: string;
  rating: number; // 1-5
  title: string;
  content: string;
  verifiedUser: boolean;
  status: 'published' | 'pending' | 'flagged';
  createdAt: string;
  helpfulCount: number;
}

// Community & Vendor Submissions
export interface ServiceSubmission {
  id: string;
  serviceName: string;
  websiteUrl: string;
  description: string;
  category: string;
  pricingType: PricingType;
  startingPrice?: number;
  features: string;
  logoUrl?: string;
  contactEmail: string;
  companyName: string;
  submittedAt: string;
  status: 'pending_review' | 'approved' | 'rejected';
  adminNotes?: string;
}

// Vendor Business Claims
export interface BusinessClaim {
  id: string;
  serviceId: string;
  serviceName: string;
  claimantName: string;
  businessEmail: string;
  companyRole: string;
  verificationDocumentUrl?: string;
  status: 'pending' | 'verified' | 'rejected';
  claimedAt: string;
}

// SaaS Tiers
export type SaasTier = 'free' | 'pro' | 'business';

export interface SaasPlan {
  id: SaasTier;
  name: string;
  nameAr: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  descriptionAr: string;
  features: string[];
  featuresAr: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonTextAr: string;
}

export type PlatformView = 
  | 'services' 
  | 'dashboard' 
  | 'integrations' 
  | 'marketplace' 
  | 'developers' 
  | 'account'
  | 'advisor'
  | 'compare'
  | 'categories'
  | 'submit'
  | 'business'
  | 'pricing'
  | 'admin';

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
  planTier?: SaasTier;
  savedServices?: string[];
  savedSearches?: string[];
  savedComparisons?: string[][];
  personalPreferences?: {
    preferFree: boolean;
    preferArabic: boolean;
    userLevel: UserLevel;
    primaryCategory: string;
  };
}

export type IntegrationProviderId = string;

export interface IntegrationScope {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  isMandatory: boolean;
  riskLevel: string;
}

export interface IntegrationModule {
  id: string;
  name: string;
  nameAr: string;
  provider?: string;
  providerName?: string;
  category?: string;
  description: string;
  descriptionAr: string;
  icon?: string;
  iconName?: string;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastSynced?: string;
  lastSyncAt?: string;
  connectedAccountEmail?: string;
  isGoogleOfficialIntegration?: boolean;
  features?: string[];
  featuresAr?: string[];
  requiredScopes?: (string | IntegrationScope)[];
  scopes?: (string | IntegrationScope)[];
  docsUrl?: string;
  officialDocsUrl?: string;
  officialDocUrl?: string;
  privacyPolicyUrl?: string;
}

export interface DeveloperApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  createdAt: string;
  lastUsedAt?: string;
  scopes?: string[];
  status?: string;
}

export interface DeveloperWebhook {
  id: string;
  url?: string;
  endpointUrl?: string;
  secretMasked?: string;
  successRate?: number;
  events: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface MarketplaceApp {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  developer?: string;
  rating?: number;
  reviewsCount?: number;
  category?: string;
  logoUrl?: string;
  iconName?: string;
  verified?: boolean;
  isVerified?: boolean;
  pricing?: string;
  pricingType?: string;
  installUrl?: string;
  provider?: string;
  version?: string;
  badge?: string;
  badgeAr?: string;
  installsCount?: number;
  tags?: string[];
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

// Backward compatibility alias
export type GoogleService = GlobalService;
export type ServiceCategory = GlobalCategory;

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
