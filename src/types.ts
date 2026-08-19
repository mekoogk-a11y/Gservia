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

export interface TranslationDictionary {
  brandTitle: string;
  brandTagline: string;
  navHome: string;
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
}
