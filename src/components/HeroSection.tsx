import React, { useRef, useEffect } from 'react';
import { Language } from '../types';
import { 
  Search, 
  X, 
  Sparkles, 
  ArrowRight,
  ArrowLeft,
  Bot,
  ShoppingBag,
  Palette,
  Globe,
  Briefcase,
  GraduationCap,
  CreditCard,
  CheckSquare,
  Cloud,
  MessageSquare,
  Code,
  ShieldCheck,
  Plane,
  Building,
  Video,
  Megaphone,
  Layers
} from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  onOpenAdvisor: () => void;
  onOpenCompare: () => void;
  totalServicesCount: number;
  filteredCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenAdvisor,
  onOpenCompare,
  totalServicesCount,
  filteredCount,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isArabic = lang === 'ar';

  // Keyboard shortcut Ctrl+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = [
    { id: 'all', nameEn: 'All Services', nameAr: 'كل الخدمات', icon: Layers },
    { id: 'ai', nameEn: 'AI', nameAr: 'الذكاء الاصطناعي', icon: Sparkles },
    { id: 'ecommerce', nameEn: 'E-commerce', nameAr: 'المتاجر الإلكترونية', icon: ShoppingBag },
    { id: 'business', nameEn: 'Business', nameAr: 'الأعمال والمشاريع', icon: Briefcase },
    { id: 'websites', nameEn: 'Websites', nameAr: 'بناء المواقع', icon: Globe },
    { id: 'marketing', nameEn: 'Marketing', nameAr: 'التسويق وSEO', icon: Megaphone },
    { id: 'design', nameEn: 'Design', nameAr: 'التصميم والهوية', icon: Palette },
    { id: 'video', nameEn: 'Video', nameAr: 'الفيديو والمونتاج', icon: Video },
    { id: 'finance', nameEn: 'Finance', nameAr: 'المالية والمدفوعات', icon: CreditCard },
    { id: 'productivity', nameEn: 'Productivity', nameAr: 'الإنتاجية', icon: CheckSquare },
    { id: 'cloud', nameEn: 'Cloud', nameAr: 'السحابة والتخزين', icon: Cloud },
    { id: 'communication', nameEn: 'Communication', nameAr: 'التواصل', icon: MessageSquare },
    { id: 'developer', nameEn: 'Developer Tools', nameAr: 'أدوات المطورين', icon: Code },
    { id: 'education', nameEn: 'Education', nameAr: 'التعليم', icon: GraduationCap },
    { id: 'travel', nameEn: 'Travel', nameAr: 'السفر والرحلات', icon: Plane },
    { id: 'realestate', nameEn: 'Real Estate', nameAr: 'العقارات', icon: Building },
    { id: 'security', nameEn: 'Security', nameAr: 'الأمان والخصوصية', icon: ShieldCheck },
  ];

  const exploreNeeds = [
    {
      id: 'store',
      query: isArabic ? 'أريد إنشاء متجر إلكتروني' : 'I want to build an online store',
      title: isArabic ? 'أطلق متجرك الإلكتروني' : 'Build an Online Store',
      desc: isArabic ? 'سلة، شوبيفاي، بوابات الدفع والشحن' : 'Shopify, Salla, payments & inventory',
      icon: ShoppingBag,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'design',
      query: isArabic ? 'أريد تصميم شعار وهوية' : 'I want to design a logo and graphics',
      title: isArabic ? 'صمم شعاراً وبوستات' : 'Design Logos & Graphics',
      desc: isArabic ? 'كانفا، فيجما، خطوط وقوالب' : 'Canva, Figma, templates & vectors',
      icon: Palette,
      color: 'from-pink-500/20 to-purple-500/20 text-pink-400 border-pink-500/30'
    },
    {
      id: 'money',
      query: isArabic ? 'أريد إرسال واستقبال أموال دولياً' : 'I want to transfer money internationally',
      title: isArabic ? 'حوّل أموالاً دولياً' : 'Send & Receive Money',
      desc: isArabic ? 'وايز، سترايب، حسابات بنكية دولية' : 'Wise, Stripe, multi-currency accounts',
      icon: CreditCard,
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30'
    },
    {
      id: 'pm',
      query: isArabic ? 'أريد تنظيم مهام مشروعي وفريقي' : 'I want to manage my team and projects',
      title: isArabic ? 'أدر مهامك ومشاريعك' : 'Manage Projects & Team',
      desc: isArabic ? 'نوشن، كليك أب، جداول وأتمتة' : 'Notion, ClickUp, sprint boards & wikis',
      icon: CheckSquare,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30'
    },
    {
      id: 'website',
      query: isArabic ? 'أريد إنشاء موقع بدون برمجة' : 'I want to build a website with no code',
      title: isArabic ? 'أنشئ موقعاً بدون كود' : 'Build a Website No-Code',
      desc: isArabic ? 'ويب فلو، صفحات هبوط، استضافة' : 'Webflow, landing pages & CMS',
      icon: Globe,
      color: 'from-purple-500/20 to-violet-500/20 text-purple-400 border-purple-500/30'
    },
    {
      id: 'security',
      query: isArabic ? 'أريد حفظ كلمات المرور وتأمين حساباتي' : 'I want to store passwords securely',
      title: isArabic ? 'احمِ كلمات المرور' : 'Secure Passwords & Vault',
      desc: isArabic ? 'ون باسوورد، تشفير عسكري، Passkeys' : '1Password, zero-knowledge encryption',
      icon: ShieldCheck,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
    }
  ];

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-14 md:pt-40 md:pb-20 overflow-hidden bg-[#07090e] text-white border-b border-slate-800/80"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-25 blur-3xl -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-600/30"></div>
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-purple-600/25"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-emerald-500/20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/40 text-blue-300 text-xs sm:text-sm font-bold mb-6 shadow-md backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          <span className="font-extrabold tracking-wide">Gservia Intelligence SaaS</span>
          <span className="text-slate-600">•</span>
          <span>
            {isArabic ? 'دليل ومرشد الخدمات الرقمية العالمية الذكي' : 'Global Digital Services Discovery & Intelligence Engine'}
          </span>
        </div>

        {/* Vision Primary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.15] mb-4">
          {isArabic ? 'ماذا تريد أن تنجز؟' : 'What do you want to accomplish?'}
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed mb-8">
          {isArabic 
            ? 'اكتب ما تحتاجه بلغتك الطبيعية، وسيقوم Gservia بتحليله وإرشادك لأفضل الأدوات والخدمات وشرح الفروقات وكيف تبدأ فوراً.'
            : 'Describe what you need in natural language, and Gservia will guide you to the right tools, compare them, and show you exactly how to get started.'}
        </p>

        {/* Large Smart Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-300"></div>
            
            <div className="relative flex flex-col sm:flex-row items-center bg-slate-900/95 border border-slate-700/80 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center w-full px-3 py-1.5">
                <Search className="w-5 h-5 text-blue-400 shrink-0 mx-1" />
                <input
                  ref={searchInputRef}
                  id="smart-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isArabic
                      ? 'اكتب ما تحتاجه، مثل: أريد إنشاء متجر إلكتروني، تصميم شعار، إرسال أموال...'
                      : 'e.g. I want to build an online store, design a logo, send money internationally...'
                  }
                  className="w-full bg-transparent border-0 text-white placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none focus:ring-0 px-2 py-1"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
                    title={isArabic ? 'مسح البحث' : 'Clear search'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 shrink-0">
                <button
                  id="search-discover-btn"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      const el = document.getElementById('services-catalog-view');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  <span>{isArabic ? 'اكتشف الخدمات' : 'Find Best Services'}</span>
                  {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Search Helpers & Quick Stats */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-3 mt-2.5">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              {isArabic 
                ? 'فهم ذكي لنية المستخدم (Intent Analysis)'
                : 'Smart Natural Language Intent Understanding'}
            </span>
            <span className="font-semibold text-slate-300">
              {filteredCount} {isArabic ? 'خدمة مطابقة' : 'services matched'}
            </span>
          </div>
        </div>

        {/* 17 Categories Quick Bar */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-chip-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/25'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{isArabic ? cat.nameAr : cat.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explore by Need Cards */}
        <div className="max-w-5xl mx-auto mb-10 text-start">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>{isArabic ? 'استكشف حسب الاحتياج' : 'Explore by Need'}</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              {isArabic ? 'انقر على أي حاجة لتوليد أفضل الحلول فوراً' : 'Click any need to get instant recommended stack'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {exploreNeeds.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`need-card-${item.id}`}
                  onClick={() => {
                    setSearchQuery(item.query);
                    const el = document.getElementById('services-catalog-view');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-3.5 rounded-2xl bg-gradient-to-br ${item.color} bg-slate-900/80 hover:bg-slate-800/90 border transition-all text-start group cursor-pointer shadow-sm`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950/80 flex items-center justify-center shrink-0 border border-slate-700/60 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gservia AI Advisor Banner */}
        <div className="max-w-4xl mx-auto">
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/70 via-indigo-950/70 to-purple-950/70 border border-blue-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-start">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 shadow-inner">
                <Bot className="w-6 h-6 text-blue-400 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black text-white">
                  {isArabic ? 'مستشار Gservia الذكي (Gservia AI Advisor)' : 'Gservia AI Advisor'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  {isArabic 
                    ? 'لست متأكداً أي خدمة تناسب ميزانيتك ومستواك؟ دع المستشار يحللها ويوصيك بالخيار الأفضل.'
                    : 'Not sure which digital service is right for you? Let the AI Advisor analyze your needs.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                id="hero-open-advisor-btn"
                onClick={onOpenAdvisor}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5"
              >
                <Bot className="w-4 h-4" />
                <span>{isArabic ? 'استشر Gservia' : 'Ask Gservia'}</span>
              </button>

              <button
                id="hero-open-compare-btn"
                onClick={onOpenCompare}
                className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-colors border border-slate-700"
              >
                <span>{isArabic ? 'المقارنة' : 'Compare'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
