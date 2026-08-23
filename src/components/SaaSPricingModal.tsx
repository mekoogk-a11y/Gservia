import React, { useState } from 'react';
import { Language, SaasPlan } from '../types';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Building2, 
  CreditCard 
} from 'lucide-react';

interface SaaSPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SaaSPricingModal: React.FC<SaaSPricingModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isArabic = lang === 'ar';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  if (!isOpen) return null;

  const plans: SaasPlan[] = [
    {
      id: 'free',
      name: 'Free Explorer',
      nameAr: 'المستكشف المجاني',
      priceMonthly: 0,
      priceAnnual: 0,
      description: 'Instant access to all verified services, basic comparison, and community reviews.',
      descriptionAr: 'استكشاف شامل لجميع الخدمات الرقمية، المقارنة السريعة، وتصفح التقييمات.',
      features: [
        'Full access to 17+ categories & verified tools',
        'Smart Intent search understanding',
        'Head-to-head comparison engine',
        'Save up to 10 favorite services',
        'Public community reviews & guides'
      ],
      featuresAr: [
        'وصول كامل لأكثر من 17 تصنيفاً والخدمات المعتمدة',
        'البحث الذكي القائم على فهم النية واللغة الطبيعية',
        'محرك المقارنة المباشرة بين الخدمات',
        'حفظ حتى 10 خدمات في المفضلة',
        'الاطلاع على التقييمات ودليل البدء'
      ],
      buttonText: 'Current Plan',
      buttonTextAr: 'الخطة الحالية'
    },
    {
      id: 'pro',
      name: 'Gservia Pro',
      nameAr: 'Gservia برو الذكي',
      priceMonthly: 9,
      priceAnnual: 7,
      description: 'For founders, freelancers, and builders who want AI recommendations & custom stacks.',
      descriptionAr: 'لرواد الأعمال والمستقلين للحصول على توصيات الذكاء الاصطناعي وتوليد الحزم التقنية.',
      isPopular: true,
      features: [
        'Unlimited Gservia AI Advisor queries',
        'Custom Tool Stack generator with step-by-step blueprints',
        'Export comparison matrix to PDF & Notion',
        'Developer API access (1,000 req/mo)',
        'Early access to newly verified software launches',
        'Priority technical support'
      ],
      featuresAr: [
        'استشارات غير محدودة من مستشار Gservia الذكي',
        'توليد حزم تقنية متكاملة وخارطة طريق للبدء',
        'تصدير جداول المقارنة إلى PDF وNotion',
        'واجهة برمجية API للمطورين (1000 طلب/شهر)',
        'وصول مبكر لأحدث الأدوات الموثقة فور اعتمادها',
        'أولوية الدعم الفني المباشر'
      ],
      buttonText: 'Upgrade to Pro',
      buttonTextAr: 'الترقية إلى برو'
    },
    {
      id: 'business',
      name: 'Vendor & Business Hub',
      nameAr: 'بوابة الشركات والمزودين',
      priceMonthly: 49,
      priceAnnual: 39,
      description: 'For SaaS vendors and agencies wanting verified badges, analytics, and claim profile.',
      descriptionAr: 'لمطوري المنصات والشركات لتوثيق خدماتهم والوصول للآلاف ومتابعة إحصائيات الظهور.',
      features: [
        'Claim and verify your official service listing',
        'Official Green Verified Enterprise Badge',
        'Search impressions & click-through analytics dashboard',
        'Direct lead acquisition & inquiry routing',
        'Custom alternatives placement and highlights',
        'Dedicated account manager'
      ],
      featuresAr: [
        'توثيق وإدارة الملف الرسمي لخدمتك في الدليل',
        'شارة التوثيق الخضراء المعتمدة (Verified)',
        'لوحة إحصائيات لمعدلات الظهور والنقر للموقع',
        'استقبال طلبات واستفسارات العملاء مباشرة',
        'إبراز ميزاتك التنافسية في قوائم البدائل',
        'مدير حساب مخصص لدعم شركتك'
      ],
      buttonText: 'Claim Your Profile',
      buttonTextAr: 'توثيق ملف شركتك'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="saas-pricing-modal"
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-start text-white"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-blue-950/80 via-slate-900 to-purple-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {isArabic ? 'باقات واشتراكات منصة Gservia SaaS' : 'Gservia Platform SaaS Tiers'}
              </h3>
              <p className="text-xs text-slate-400">
                {isArabic ? 'اختر الخطة المناسبة لاحتياجاتك الشخصية أو لترقية ملف شركتك' : 'Choose the best plan for personal research or vendor listing'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Billing Switch */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/70 flex items-center justify-center gap-3">
          <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
            {isArabic ? 'اشتراك شهري' : 'Monthly'}
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 rounded-full bg-slate-800 p-1 flex items-center transition-colors border border-slate-700 relative"
          >
            <div 
              className={`w-4 h-4 rounded-full bg-blue-500 transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-bold flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
            <span>{isArabic ? 'اشتراك سنوي' : 'Annual'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-950 text-emerald-300 border border-emerald-800">
              {isArabic ? 'خصم 25%' : 'Save 25%'}
            </span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
              return (
                <div
                  key={plan.id}
                  className={`p-5 rounded-3xl border flex flex-col justify-between relative shadow-lg ${
                    plan.isPopular
                      ? 'bg-gradient-to-b from-blue-950/80 to-slate-950 border-blue-500/80 shadow-blue-900/20'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white uppercase tracking-wider shadow-md">
                      {isArabic ? 'الأكثر طلباً' : 'Most Popular'}
                    </div>
                  )}

                  <div>
                    <h4 className="text-base font-black text-white mb-1">
                      {isArabic ? plan.nameAr : plan.name}
                    </h4>
                    <p className="text-xs text-slate-400 mb-4 min-h-[32px]">
                      {isArabic ? plan.descriptionAr : plan.description}
                    </p>

                    <div className="flex items-baseline gap-1 mb-5">
                      <span className="text-3xl font-black text-white">${price}</span>
                      <span className="text-xs text-slate-400">/{isArabic ? 'شهر' : 'mo'}</span>
                      {billingCycle === 'annual' && price > 0 && (
                        <span className="text-[10px] text-slate-500 block">
                          ({isArabic ? 'يُدفع سنوياً' : 'billed yearly'})
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-6">
                      {(isArabic ? plan.featuresAr : plan.features).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(isArabic ? 'تم اختيار الخطة بنجاح! سيتم توجيهك لبوابة الدفع الآمنة.' : 'Selected plan successfully! Redirecting to secure checkout.');
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${
                      plan.isPopular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {isArabic ? plan.buttonTextAr : plan.buttonText}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
