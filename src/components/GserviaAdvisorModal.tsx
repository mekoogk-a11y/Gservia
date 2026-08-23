import React, { useState } from 'react';
import { Language, AdvisorStepAnswers, AdvisorRecommendationResult, UserLevel } from '../types';
import { runAdvisorEngine } from '../services/intelligenceEngine';
import { 
  X, 
  Bot, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  DollarSign, 
  ShieldCheck, 
  Star, 
  RotateCcw,
  Zap
} from 'lucide-react';

interface GserviaAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectService: (service: any) => void;
}

export const GserviaAdvisorModal: React.FC<GserviaAdvisorModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectService,
}) => {
  const isArabic = lang === 'ar';
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<AdvisorStepAnswers>({
    needText: '',
    budget: 'flexible',
    skillLevel: 'Beginner',
    needArabic: true,
    usageType: 'small_business',
  });
  const [result, setResult] = useState<AdvisorRecommendationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGenerateRecommendation = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const rec = runAdvisorEngine(answers);
      setResult(rec);
      setIsAnalyzing(false);
      setStep(3); // Result Step
    }, 700);
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
    setAnswers({
      needText: '',
      budget: 'flexible',
      skillLevel: 'Beginner',
      needArabic: true,
      usageType: 'small_business',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="advisor-modal-card"
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-blue-950/80 via-slate-900 to-purple-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isArabic ? 'مستشار Gservia الذكي' : 'Gservia AI Advisor'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600/30 text-blue-300 border border-blue-500/30">
                  {isArabic ? 'استنتاج مبني على البيانات' : 'Data-Grounded AI'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isArabic ? 'إرشاد ذكي مبني على قاعدة الخدمات الموثقة وبدون اختلاق' : 'Smart guidance grounded in verified digital services'}
              </p>
            </div>
          </div>

          <button
            id="advisor-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-start">
          
          {/* STEP 1: Describe the Need */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-sm sm:text-base font-bold text-white mb-1.5">
                  {isArabic ? '1. ما الذي تريد إنجازه بالتحديد؟' : '1. What do you want to accomplish?'}
                </label>
                <p className="text-xs text-slate-400 mb-3">
                  {isArabic 
                    ? 'اكتب هدفك بكلماتك الخاصة (مثال: أريد إنشاء متجر إلكتروني، إدارة مشروع، تصميم شعار، تحويل أموال...)'
                    : 'Describe your goal in simple words (e.g. build an online store, manage tasks, design a logo...)'}
                </p>
                <textarea
                  id="advisor-need-input"
                  rows={3}
                  value={answers.needText}
                  onChange={(e) => setAnswers({ ...answers, needText: e.target.value })}
                  placeholder={
                    isArabic
                      ? 'مثال: أنا صاحب متجر وأريد نظاماً لإدارة المخزون واستقبال الدفع بمدى وآبل باي وتصميم العروض الترويجية...'
                      : 'e.g. I need a tool to sell handmade products, accept local payments, and design marketing banners...'
                  }
                  className="w-full p-3.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Quick Presets */}
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-2">
                  {isArabic ? 'أو اختر من الاحتياجات الشائعة:' : 'Or pick from popular goals:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { en: 'Build an online store', ar: 'أريد إنشاء متجر إلكتروني' },
                    { en: 'Design logo and banners', ar: 'أريد تصميم شعار وبنرات إعلانية' },
                    { en: 'International money transfer', ar: 'أريد إرسال أموال واستقبالها دولياً' },
                    { en: 'Manage team and tasks', ar: 'أريد تنظيم مهام مشروعي وفريقي' },
                    { en: 'Build a website no-code', ar: 'أريد إنشاء موقع بدون برمجة' },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAnswers({ ...answers, needText: isArabic ? p.ar : p.en })}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    >
                      {isArabic ? p.ar : p.en}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  id="advisor-step1-next"
                  disabled={!answers.needText.trim()}
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-sm transition-all shadow-md shadow-blue-600/30 flex items-center gap-2"
                >
                  <span>{isArabic ? 'المتابعة لتحديد المعايير' : 'Continue to Criteria'}</span>
                  {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Parameters & Context */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Budget */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isArabic ? 'ما ميزانيتك المتوقعة؟' : 'What is your budget preference?'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'free_only', en: '100% Free Only', ar: 'مجاني تماماً' },
                    { id: 'low_cost', en: 'Low Cost (<$15/mo)', ar: 'تكلفة بسيطة (<$15)' },
                    { id: 'flexible', en: 'Flexible', ar: 'مرنة حسب الميزات' },
                    { id: 'enterprise', en: 'Enterprise Tier', ar: 'خطط شركات متقدمة' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setAnswers({ ...answers, budget: b.id as any })}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        answers.budget === b.id
                          ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                          : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                      }`}
                    >
                      {isArabic ? b.ar : b.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skill Level */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isArabic ? 'مستوى خبرتك التقنية؟' : 'Your technical skill level?'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Beginner', en: 'Beginner (No code)', ar: 'مبتدئ (بدون كود)' },
                    { id: 'Intermediate', en: 'Intermediate', ar: 'متوسط' },
                    { id: 'Advanced', en: 'Advanced (Dev)', ar: 'متقدم / مطور' },
                    { id: 'Business', en: 'Business Team', ar: 'فريق عمل تجاري' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => setAnswers({ ...answers, skillLevel: lvl.id as UserLevel })}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        answers.skillLevel === lvl.id
                          ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                          : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                      }`}
                    >
                      {isArabic ? lvl.ar : lvl.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Arabic Support Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isArabic ? 'هل تحتاج دعماً أصيلاً للغة العربية؟' : 'Do you require full Arabic language support?'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAnswers({ ...answers, needArabic: true })}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      answers.needArabic
                        ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                    }`}
                  >
                    {isArabic ? '🇸🇦 نعم، اللغة العربية أساسية' : 'Yes, Arabic is required'}
                  </button>
                  <button
                    onClick={() => setAnswers({ ...answers, needArabic: false })}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      !answers.needArabic
                        ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                    }`}
                  >
                    {isArabic ? '🌐 الإنجليزية مقبولة أو مفضلة' : 'English / Any language is fine'}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                >
                  {isArabic ? 'رجوع' : 'Back'}
                </button>

                <button
                  id="advisor-generate-rec-btn"
                  onClick={handleGenerateRecommendation}
                  disabled={isAnalyzing}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isAnalyzing ? (isArabic ? 'جارٍ التحليل والمطابقة...' : 'Analyzing database...') : (isArabic ? 'توليد التوصية الذكية' : 'Generate Smart Recommendation')}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Smart Verified Recommendation Result */}
          {step === 3 && result && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Top Pick Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-950/80 to-slate-950 border-2 border-blue-500/60 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={result.topPick.logoUrl} 
                      alt={result.topPick.name} 
                      className="w-12 h-12 rounded-xl object-contain bg-white p-1.5 shadow-sm shrink-0" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">
                          {isArabic ? 'الخيار الأفضل والموصى به' : 'Top Recommended Pick'}
                        </span>
                        {result.topPick.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/80">
                            <ShieldCheck className="w-3 h-3" />
                            {isArabic ? 'موثق' : 'Verified'}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-white">
                        {isArabic ? (result.topPick.nameAr || result.topPick.name) : result.topPick.name}
                      </h4>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="flex items-center gap-2 bg-blue-950 px-3 py-1.5 rounded-xl border border-blue-600/50 self-start sm:self-auto">
                    <span className="text-xs text-slate-300 font-bold">
                      {isArabic ? 'نسبة التطابق:' : 'Match Score:'}
                    </span>
                    <span className="text-base font-black text-blue-400">
                      {result.matchScore}%
                    </span>
                  </div>
                </div>

                {/* Grounded Reason */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 mb-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <strong className="text-blue-400 block mb-1">
                    {isArabic ? '💡 لماذا هذه الخدمة تناسبك بالتحديد؟' : '💡 Why this service is right for you:'}
                  </strong>
                  {isArabic ? result.matchReasonAr : result.matchReason}
                </div>

                {/* Quick Service Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-center">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{isArabic ? 'السعر' : 'Pricing'}</span>
                    <span className="text-xs font-bold text-white">
                      {result.topPick.freePlan ? (isArabic ? 'خطة مجانية متاحة' : 'Free Plan') : `$${result.topPick.startingPrice}/mo`}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{isArabic ? 'التقييم' : 'Rating'}</span>
                    <span className="text-xs font-bold text-amber-400 flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {result.topPick.rating}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{isArabic ? 'اللغة العربية' : 'Arabic UI'}</span>
                    <span className="text-xs font-bold text-white">
                      {result.topPick.languages.includes('ar') ? '✅ مدعومة' : 'English Only'}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{isArabic ? 'المستوى' : 'Level'}</span>
                    <span className="text-xs font-bold text-white">
                      {result.topPick.userLevel.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
                  <a
                    href={result.topPick.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm text-center transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5"
                  >
                    <span>{isArabic ? 'زيارة الموقع الرسمي للخدمة' : 'Visit Official Website'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectService(result.topPick);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-colors border border-slate-700"
                  >
                    {isArabic ? 'عرض التفاصيل الكاملة' : 'View Full Details'}
                  </button>
                </div>
              </div>

              {/* Recommended Tool Stack */}
              {result.recommendedStack && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <h5 className="text-sm font-bold text-white">
                      {isArabic ? result.recommendedStack.titleAr : result.recommendedStack.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    {isArabic ? result.recommendedStack.descriptionAr : result.recommendedStack.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.recommendedStack.tools.map((t, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-purple-950 text-purple-400 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">{t.serviceName}</span>
                            <span className="text-[10px] text-slate-400">({isArabic ? t.roleAr : t.role})</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {isArabic ? t.reasonAr : t.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step-by-Step How to Start */}
              <div>
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isArabic ? 'كيف تبدأ خطوة بخطوة:' : 'How to get started step-by-step:'}</span>
                </h5>
                <div className="space-y-1.5">
                  {(isArabic ? result.actionableStepsAr : result.actionableSteps).map((st, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-slate-800 text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset / New Query */}
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'سؤال جديد' : 'New Question'}</span>
                </button>

                <p className="text-[10px] text-slate-500">
                  {isArabic ? 'Gservia منصة مستقلة ولا تتلقى عمولات لتفضيل خدمة على أخرى.' : 'Independent discovery. Unbiased organic ranking.'}
                </p>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
