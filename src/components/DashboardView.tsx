import React from 'react';
import { Language, UserProfile, IntegrationModule } from '../types';
import { getTranslation } from '../data/translations';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Layers, 
  ArrowUpRight, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Key, 
  ShoppingBag, 
  Sliders, 
  Sparkles,
  RefreshCw,
  Lock,
  Globe2
} from 'lucide-react';
import { ServiceIcon } from './ServiceIcon';

interface DashboardViewProps {
  lang: Language;
  user: UserProfile;
  integrations: IntegrationModule[];
  totalServicesCount: number;
  favoritesCount: number;
  onNavigate: (view: any) => void;
  onSelectServiceModal: (serviceId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  lang,
  user,
  integrations,
  totalServicesCount,
  favoritesCount,
  onNavigate,
}) => {
  const t = getTranslation(lang);
  const connectedCount = integrations.filter((i) => i.status === 'connected').length;

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Welcome & Security Score Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121212] via-[#0d0d0d] to-black border-2 border-[#242424] p-6 sm:p-8 shadow-2xl">
        <div className="absolute -end-10 -top-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-black mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>{lang === 'ar' ? 'منصة GServia الموحدة' : 'GServia Enterprise Hub'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {lang === 'ar' ? `مرحباً، ${user.fullName}` : `Welcome, ${user.fullName}`}
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 mt-1 max-w-2xl font-medium">
              {lang === 'ar' 
                ? 'لوحة القيادة الموحدة لإدارة التكاملات الرسمية، خدمات السحابة والذكاء الاصطناعي، وأمان الجلسات عبر واجهة موحدة.'
                : 'Unified mission control for managing official ecosystem integrations, cloud & AI services, and security posture.'}
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Security Posture Chip */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/80 border border-[#2b2b2b]">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 block font-bold">{lang === 'ar' ? 'مؤشر الأمان' : 'Security Score'}</span>
                <span className="text-lg font-black text-emerald-400">{user.securityScore}%</span>
              </div>
            </div>

            {/* Active Integrations Chip */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/80 border border-[#2b2b2b]">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center font-black">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 block font-bold">{lang === 'ar' ? 'التكاملات النشطة' : 'Active Integrations'}</span>
                <span className="text-lg font-black text-white">{connectedCount} / {integrations.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Key Platform Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Metric 1: Catalog Services */}
        <div 
          onClick={() => onNavigate('services')}
          className="group p-5 rounded-2xl bg-[#0e0e0e] border border-[#222] hover:border-yellow-400/50 transition-all cursor-pointer shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-yellow-400/30 text-yellow-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-yellow-400 transition-colors" />
          </div>
          <div className="text-2xl font-black text-white">{totalServicesCount}</div>
          <div className="text-xs text-neutral-300 font-bold mt-1">
            {lang === 'ar' ? 'خدمة رسمية موثقة في الدليل' : 'Verified Catalog Services'}
          </div>
        </div>

        {/* Metric 2: Connected Ecosystems */}
        <div 
          onClick={() => onNavigate('integrations')}
          className="group p-5 rounded-2xl bg-[#0e0e0e] border border-[#222] hover:border-yellow-400/50 transition-all cursor-pointer shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-yellow-400/30 text-yellow-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-yellow-400 transition-colors" />
          </div>
          <div className="text-2xl font-black text-yellow-400">{connectedCount}</div>
          <div className="text-xs text-neutral-300 font-bold mt-1">
            {lang === 'ar' ? 'تكاملات وبيئات عمل متصلة' : 'Connected Provider Modules'}
          </div>
        </div>

        {/* Metric 3: Favorites Launchpad */}
        <div 
          onClick={() => onNavigate('services')}
          className="group p-5 rounded-2xl bg-[#0e0e0e] border border-[#222] hover:border-yellow-400/50 transition-all cursor-pointer shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-yellow-400/30 text-yellow-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-yellow-400 transition-colors" />
          </div>
          <div className="text-2xl font-black text-white">{favoritesCount}</div>
          <div className="text-xs text-neutral-300 font-bold mt-1">
            {lang === 'ar' ? 'أدوات مخصصة في المفضلة' : 'Favorite Starred Tools'}
          </div>
        </div>

        {/* Metric 4: Multi-Tenant Zero-Trust */}
        <div 
          onClick={() => onNavigate('account')}
          className="group p-5 rounded-2xl bg-[#0e0e0e] border border-[#222] hover:border-yellow-400/50 transition-all cursor-pointer shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-yellow-400/30 text-yellow-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-yellow-400 transition-colors" />
          </div>
          <div className="text-2xl font-black text-emerald-400">100%</div>
          <div className="text-xs text-neutral-300 font-bold mt-1">
            {lang === 'ar' ? 'عدم تخزين كلمات المرور (PKCE)' : 'Zero Credential Logging'}
          </div>
        </div>

      </div>

      {/* Main 2-Column Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Connected Integrations Showcase */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'ar' ? 'التكاملات والأنظمة المتصلة' : 'Connected Integrations'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium">
                {lang === 'ar' ? 'الروابط الرسمية المفعلة عبر بروتوكول OAuth 2.0 وبأقل الصلاحيات.' : 'Official token grants active via least-privilege OAuth 2.0.'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('integrations')}
              className="text-xs font-black text-yellow-400 hover:text-yellow-300 flex items-center gap-1 bg-black px-3 py-1.5 rounded-xl border border-yellow-400/30"
            >
              <span>{lang === 'ar' ? 'عرض الكل' : 'View All'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {integrations.slice(0, 4).map((mod) => (
              <div
                key={mod.id}
                className="p-4 rounded-2xl bg-[#0c0c0c] border border-[#222] hover:border-yellow-400/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-black border border-[#2a2a2a] flex items-center justify-center shrink-0">
                    <ServiceIcon iconName={mod.iconName} className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-white">
                        {lang === 'ar' ? mod.nameAr : mod.name}
                      </h4>
                      {mod.isGoogleOfficialIntegration && (
                        <span className="px-2 py-0.5 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-[10px] font-black text-yellow-400">
                          {lang === 'ar' ? 'رسمي Google' : 'Google API'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5 font-medium">
                      {lang === 'ar' ? mod.descriptionAr : mod.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1a1a1a]">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {mod.status === 'connected' ? (
                      <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t.connectedStatus}</span>
                      </span>
                    ) : (
                      <span className="text-neutral-500 bg-[#161616] px-2.5 py-1 rounded-lg border border-[#252525]">
                        {t.disconnectedStatus}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onNavigate('integrations')}
                    className="p-2 rounded-xl bg-black hover:bg-[#1a1a1a] text-neutral-300 hover:text-white border border-[#262626] transition-colors"
                  >
                    <Sliders className="w-4 h-4 text-yellow-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => onNavigate('marketplace')}
              className="p-4 rounded-2xl bg-black border border-[#262626] hover:border-yellow-400/40 text-start group transition-all"
            >
              <ShoppingBag className="w-5 h-5 text-yellow-400 mb-2" />
              <div className="text-sm font-black text-white group-hover:text-yellow-400">
                {lang === 'ar' ? 'متجر التطبيقات' : 'Marketplace'}
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">
                {lang === 'ar' ? 'استكشف ملحقات ووكلاء الذكاء الاصطناعي' : 'Explore plugins & AI agents'}
              </div>
            </button>

            <button
              onClick={() => onNavigate('developers')}
              className="p-4 rounded-2xl bg-black border border-[#262626] hover:border-yellow-400/40 text-start group transition-all"
            >
              <Key className="w-5 h-5 text-yellow-400 mb-2" />
              <div className="text-sm font-black text-white group-hover:text-yellow-400">
                {lang === 'ar' ? 'منصة المطورين' : 'Developer APIs'}
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">
                {lang === 'ar' ? 'مفاتيح API ومسارات Webhooks' : 'Manage keys & webhooks'}
              </div>
            </button>

            <button
              onClick={() => onNavigate('account')}
              className="p-4 rounded-2xl bg-black border border-[#262626] hover:border-yellow-400/40 text-start group transition-all"
            >
              <Globe2 className="w-5 h-5 text-yellow-400 mb-2" />
              <div className="text-sm font-black text-white group-hover:text-yellow-400">
                {lang === 'ar' ? 'التفضيلات العالمية' : 'Global Settings'}
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">
                {lang === 'ar' ? 'العملات، التوقيت والخصوصية' : 'Currencies, timezone & 2FA'}
              </div>
            </button>
          </div>

        </div>

        {/* Right 1 Col: Platform Activity & Compliance Notice */}
        <div className="space-y-6">
          
          {/* Security & Audit Summary Box */}
          <div className="p-6 rounded-3xl bg-[#0b0b0b] border-2 border-[#242424] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black border border-yellow-400/40 text-yellow-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">
                  {lang === 'ar' ? 'معايير الأمان المؤسسي' : 'Enterprise Compliance'}
                </h3>
                <span className="text-xs text-emerald-400 font-bold">100% Zero-Trust Ready</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-neutral-300 font-medium">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>{lang === 'ar' ? 'الربط المباشر مع APIs الرسمية دون تخزين كلمات مرور خارجية.' : 'Direct integration with official APIs with zero external password storage.'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>{lang === 'ar' ? 'طلب أقل الصلاحيات الممكنة (Least Privilege) لضمان الخصوصية.' : 'Least-privilege permission grants ensuring absolute user privacy.'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>{lang === 'ar' ? 'تشفير كامل للجلسات والرموز عبر طبقة HTTPS وبروتوكول PKCE.' : 'Encrypted session tokens with PKCE authentication workflows.'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#202020]">
              <button
                onClick={() => onNavigate('account')}
                className="w-full py-2.5 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] text-yellow-400 text-xs font-black border border-[#2a2a2a] transition-colors"
              >
                {lang === 'ar' ? 'عرض سجل تدقيق الأمان' : 'View Security Audit Log'}
              </button>
            </div>
          </div>

          {/* Independent Platform Notice Card */}
          <div className="p-5 rounded-3xl bg-black border border-yellow-400/20 text-xs text-neutral-300 space-y-2">
            <span className="font-black text-yellow-400 block">
              {lang === 'ar' ? '⚖️ استقلالية منصة GServia' : '⚖️ GServia Independence Notice'}
            </span>
            <p className="font-medium leading-relaxed">
              {lang === 'ar'
                ? 'منصة GServia منصة تقنية عالمية مستقلة تجمع وتُنظم الخدمات والتكاملات الرقمية. جميع العلامات التجارية التابعة لـ Google و Microsoft وغيرها هي ملك لأصحابها الشرعيين.'
                : 'GServia is an independent global platform that organizes digital services and official integrations. All trademarks are the property of their respective owners.'}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
