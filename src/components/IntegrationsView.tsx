import React, { useState } from 'react';
import { Language, IntegrationModule, IntegrationProviderId } from '../types';
import { getTranslation } from '../data/translations';
import { ServiceIcon } from './ServiceIcon';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw, 
  Sliders, 
  AlertCircle, 
  X, 
  Lock, 
  Layers, 
  Cpu, 
  Bot, 
  Code2, 
  FileText 
} from 'lucide-react';

interface IntegrationsViewProps {
  lang: Language;
  integrations: IntegrationModule[];
  onToggleIntegration: (id: string, newStatus: 'connected' | 'disconnected') => void;
}

export const IntegrationsView: React.FC<IntegrationsViewProps> = ({
  lang,
  integrations,
  onToggleIntegration,
}) => {
  const t = getTranslation(lang);
  const [selectedProviderFilter, setSelectedProviderFilter] = useState<string>('all');
  const [selectedModalIntegration, setSelectedModalIntegration] = useState<IntegrationModule | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const filteredIntegrations = integrations.filter((item) => {
    if (selectedProviderFilter === 'google') return item.provider === 'google';
    if (selectedProviderFilter === 'productivity') return item.category === 'productivity';
    if (selectedProviderFilter === 'ai') return item.category === 'ai';
    if (selectedProviderFilter === 'devtools') return item.category === 'devtools' || item.category === 'cloud';
    return true;
  });

  const handleConnectAction = (mod: IntegrationModule) => {
    setIsConnecting(true);
    setTimeout(() => {
      onToggleIntegration(mod.id, mod.status === 'connected' ? 'disconnected' : 'connected');
      setIsConnecting(false);
      setSelectedModalIntegration((prev) => 
        prev ? { ...prev, status: prev.status === 'connected' ? 'disconnected' : 'connected' } : null
      );
    }, 600);
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-black mb-3">
            <Cpu className="w-3.5 h-3.5 text-yellow-400" />
            <span>{lang === 'ar' ? 'مركز التكاملات الموحد' : 'Unified Integration Gateway'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {t.integrationsTitle}
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-1 max-w-2xl font-medium">
            {t.integrationsSubtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', labelAr: 'جميع التكاملات', labelEn: 'All Providers' },
            { id: 'google', labelAr: 'خدمات Google الرسمية', labelEn: 'Google Ecosystem' },
            { id: 'ai', labelAr: 'الذكاء الاصطناعي', labelEn: 'AI & Models' },
            { id: 'productivity', labelAr: 'الإنتاجية والسحابة', labelEn: 'Productivity' },
            { id: 'devtools', labelAr: 'المطورون والبنية التحتية', labelEn: 'DevTools & Cloud' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedProviderFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                selectedProviderFilter === f.id
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                  : 'bg-[#121212] text-neutral-300 hover:text-white border border-[#242424]'
              }`}
            >
              {lang === 'ar' ? f.labelAr : f.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Google Official Integrations Highlight Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#121212] via-[#0d0d0d] to-black border-2 border-yellow-400/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black border border-yellow-400/40 text-yellow-400 flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                {lang === 'ar' ? 'Google Integrations (الأذونات والصلاحيات الرسمية)' : 'Official Google Ecosystem Integrations'}
              </h3>
              <p className="text-xs text-neutral-400 font-medium">
                {lang === 'ar' 
                  ? 'تكامل آمن مع Google Workspace و Google Cloud و Gemini عبر OAuth 2.0 وبأقل صلاحيات ممكنة.'
                  : 'Secure integrations with Google Workspace, Google Cloud, and Gemini via official OAuth 2.0 with least-privilege scopes.'}
              </p>
            </div>
          </div>
          
          <div className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl flex items-center gap-1.5 self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'صفر تخزين لكلمات المرور' : 'Zero Password Storage'}</span>
          </div>
        </div>
      </div>

      {/* Grid of Integration Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredIntegrations.map((mod) => (
          <div
            key={mod.id}
            className="p-5 rounded-3xl bg-[#0d0d0d] border-2 border-[#222] hover:border-yellow-400/50 transition-all flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-black border border-[#2a2a2a] flex items-center justify-center">
                  <ServiceIcon iconName={mod.iconName} className="w-6 h-6 text-yellow-400" />
                </div>

                <div className="flex items-center gap-1.5">
                  {mod.status === 'connected' ? (
                    <span className="flex items-center gap-1 text-[11px] font-black text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-xl border border-emerald-800/40">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t.connectedStatus}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-black text-neutral-500 bg-[#161616] px-2.5 py-1 rounded-xl border border-[#262626]">
                      {t.disconnectedStatus}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-white">
                    {lang === 'ar' ? mod.nameAr : mod.name}
                  </h3>
                </div>
                <div className="text-[11px] text-yellow-400/80 font-bold">
                  {mod.providerName}
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2 mt-1 font-medium leading-relaxed">
                  {lang === 'ar' ? mod.descriptionAr : mod.description}
                </p>
              </div>

              {/* Scopes Overview */}
              <div className="mt-4 pt-3 border-t border-[#1a1a1a] space-y-1.5">
                <span className="text-[10px] text-neutral-500 font-black uppercase tracking-wider block">
                  {t.requiredScopes}
                </span>
                <div className="flex flex-wrap gap-1">
                  {mod.scopes.map((sc) => (
                    <span
                      key={sc.id}
                      className="px-2 py-0.5 rounded-lg bg-black border border-[#242424] text-[10px] font-bold text-neutral-300"
                    >
                      {lang === 'ar' ? sc.nameAr : sc.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedModalIntegration(mod)}
                className="flex-1 py-2.5 rounded-xl bg-black hover:bg-[#181818] text-white text-xs font-black border border-[#2b2b2b] transition-colors flex items-center justify-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-yellow-400" />
                <span>{lang === 'ar' ? 'إدارة النطاقات' : 'Manage Scopes'}</span>
              </button>

              <button
                onClick={() => handleConnectAction(mod)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                  mod.status === 'connected'
                    ? 'bg-[#181818] hover:bg-red-950/40 text-red-400 border border-red-900/30'
                    : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-md shadow-yellow-400/20'
                }`}
              >
                {mod.status === 'connected' ? t.disconnectService : t.connectService}
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Detail / Scope Inspection Modal */}
      {selectedModalIntegration && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedModalIntegration(null)}
        >
          <div 
            className="relative w-full max-w-xl bg-[#0c0c0c] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#2b2b2b] text-white max-h-[85vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedModalIntegration(null)}
              className="absolute top-4 end-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
            >
              <X className="w-5 h-5 text-yellow-400" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-black border border-yellow-400/30 flex items-center justify-center">
                <ServiceIcon iconName={selectedModalIntegration.iconName} className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">
                  {lang === 'ar' ? selectedModalIntegration.nameAr : selectedModalIntegration.name}
                </h3>
                <span className="text-xs text-yellow-400 font-bold">{selectedModalIntegration.providerName}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
              {lang === 'ar' ? selectedModalIntegration.descriptionAr : selectedModalIntegration.description}
            </p>

            {/* Scopes Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-yellow-400">
                {lang === 'ar' ? 'النطاقات والصلاحيات الدقيقة (Least-Privilege Scopes)' : 'Requested OAuth Scopes'}
              </h4>
              
              <div className="space-y-2">
                {selectedModalIntegration.scopes.map((scope) => (
                  <div key={scope.id} className="p-3.5 rounded-2xl bg-black border border-[#262626] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white">
                        {lang === 'ar' ? scope.nameAr : scope.name}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                        {scope.riskLevel.toUpperCase()} RISK
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-medium">
                      {lang === 'ar' ? scope.descriptionAr : scope.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy and Docs Links */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1e1e1e] text-xs">
              <a
                href={selectedModalIntegration.officialDocUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-neutral-400 hover:text-yellow-400 flex items-center gap-1 font-bold"
              >
                <span>{t.officialDocs}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={selectedModalIntegration.privacyPolicyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-neutral-400 hover:text-yellow-400 flex items-center gap-1 font-bold"
              >
                <span>{lang === 'ar' ? 'سياسة الخصوصية الرسمية' : 'Official Privacy Policy'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Action Trigger */}
            <div className="pt-2">
              <button
                disabled={isConnecting}
                onClick={() => handleConnectAction(selectedModalIntegration)}
                className={`w-full py-3 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                  selectedModalIntegration.status === 'connected'
                    ? 'bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800/50'
                    : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-xl shadow-yellow-400/20'
                }`}
              >
                {isConnecting 
                  ? (lang === 'ar' ? 'جارٍ الاتصال الآمن...' : 'Establishing Secure Handshake...') 
                  : (selectedModalIntegration.status === 'connected' ? t.disconnectService : t.connectService)}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
