import React, { useState } from 'react';
import { Language, DeveloperApiKey, DeveloperWebhook } from '../types';
import { getTranslation } from '../data/translations';
import { 
  Key, 
  Terminal, 
  Code2, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  Send, 
  ExternalLink, 
  Server, 
  Activity,
  CheckCircle2
} from 'lucide-react';

interface DeveloperPlatformViewProps {
  lang: Language;
}

export const DeveloperPlatformView: React.FC<DeveloperPlatformViewProps> = ({ lang }) => {
  const t = getTranslation(lang);
  const [activeTab, setActiveTab] = useState<'keys' | 'webhooks' | 'docs' | 'sdk'>('keys');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const [keys, setKeys] = useState<DeveloperApiKey[]>([
    {
      id: 'key_prod_9921',
      name: 'GServia Live Gateway Key',
      keyPrefix: 'gsv_live_89fa***4a',
      scopes: ['services:read', 'integrations:read', 'webhooks:dispatch'],
      createdAt: '2026-08-01',
      lastUsedAt: '5 minutes ago',
      status: 'active',
    },
    {
      id: 'key_sandbox_102',
      name: 'Mobile SDK Sandbox Key',
      keyPrefix: 'gsv_test_31ab***9c',
      scopes: ['services:read'],
      createdAt: '2026-08-10',
      lastUsedAt: '2 days ago',
      status: 'active',
    },
  ]);

  const [webhooks, setWebhooks] = useState<DeveloperWebhook[]>([
    {
      id: 'whk_01',
      endpointUrl: 'https://api.enterprisepartner.com/webhooks/gservia',
      events: ['integration.connected', 'integration.disconnected', 'security.alert'],
      secretMasked: 'whsec_78fa***31b',
      createdAt: '2026-08-05',
      status: 'active',
      successRate: 99.8,
    },
  ]);

  const [isGeneratingKey, setIsGeneratingKey] = useState<boolean>(false);
  const [newKeyName, setNewKeyName] = useState<string>('');
  const [newWebhookUrl, setNewWebhookUrl] = useState<string>('');
  const [isAddingWebhook, setIsAddingWebhook] = useState<boolean>(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const newKey: DeveloperApiKey = {
      id: `key_${Date.now().toString(36)}`,
      name: newKeyName.trim(),
      keyPrefix: `gsv_live_${Math.random().toString(36).substring(2, 6)}***${Math.random().toString(36).substring(2, 4)}`,
      scopes: ['services:read', 'integrations:read'],
      createdAt: 'Today',
      lastUsedAt: 'Never',
      status: 'active',
    };
    setKeys([newKey, ...keys]);
    setNewKeyName('');
    setIsGeneratingKey(false);
  };

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  const handleAddWebhook = () => {
    if (!newWebhookUrl.trim()) return;
    const newWhk: DeveloperWebhook = {
      id: `whk_${Date.now().toString(36)}`,
      endpointUrl: newWebhookUrl.trim(),
      events: ['integration.connected', 'service.access'],
      secretMasked: `whsec_${Math.random().toString(36).substring(2, 6)}***`,
      createdAt: 'Today',
      status: 'active',
      successRate: 100.0,
    };
    setWebhooks([newWhk, ...webhooks]);
    setNewWebhookUrl('');
    setIsAddingWebhook(false);
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#222]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-black mb-3">
            <Terminal className="w-3.5 h-3.5 text-yellow-400" />
            <span>{lang === 'ar' ? 'منصة وأدوات المطورين' : 'Developer Console & API Gateway'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {t.developerPlatformTitle}
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-1 max-w-2xl font-medium">
            {t.developerPlatformSubtitle}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'keys', labelAr: 'مفاتيح API', labelEn: 'API Keys' },
            { id: 'webhooks', labelAr: 'مسارات Webhooks', labelEn: 'Webhooks' },
            { id: 'docs', labelAr: 'واجهات REST API', labelEn: 'REST Endpoints' },
            { id: 'sdk', labelAr: 'نماذج الكود (SDK)', labelEn: 'SDK Snippets' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === tab.id
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                  : 'bg-[#121212] text-neutral-300 hover:text-white border border-[#242424]'
              }`}
            >
              {lang === 'ar' ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: API Keys */}
      {activeTab === 'keys' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white">
                {lang === 'ar' ? 'مفاتيح الوصول والتحقق (API Keys)' : 'Production & Sandbox API Keys'}
              </h3>
              <p className="text-xs text-neutral-400 font-medium">
                {lang === 'ar' ? 'تُستخدم لمصادقة استدعاءات الـ REST API من الخوادم والتطبيقات الخارجية.' : 'Authenticate REST API requests securely from server environments.'}
              </p>
            </div>

            <button
              onClick={() => setIsGeneratingKey(true)}
              className="px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black flex items-center gap-1.5 shadow-md shadow-yellow-400/20"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إنشاء مفتاح جديد' : 'Generate Key'}</span>
            </button>
          </div>

          {/* New Key Generator Form */}
          {isGeneratingKey && (
            <div className="p-5 rounded-2xl bg-[#0e0e0e] border-2 border-yellow-400/50 space-y-4 animate-in fade-in duration-200">
              <h4 className="text-xs font-black uppercase text-yellow-400 tracking-wider">
                {lang === 'ar' ? 'بيانات المفتاح الجديد' : 'New Key Details'}
              </h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder={lang === 'ar' ? 'اسم المفتاح (مثل: Mobile App Live Key)...' : 'Key Name (e.g. Backend Relay)...'}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-[#2a2a2a] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
                />
                <button
                  onClick={handleCreateKey}
                  className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black text-xs font-black hover:bg-yellow-300 transition-colors"
                >
                  {lang === 'ar' ? 'تأكيد وحفظ' : 'Confirm'}
                </button>
                <button
                  onClick={() => setIsGeneratingKey(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#1a1a1a] text-neutral-300 text-xs font-bold hover:text-white"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          )}

          {/* Keys List */}
          <div className="space-y-3">
            {keys.map((k) => (
              <div
                key={k.id}
                className="p-5 rounded-2xl bg-[#0c0c0c] border border-[#242424] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-black text-white">{k.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                      {k.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-neutral-400 font-mono bg-black px-2.5 py-1 rounded border border-[#222]">
                      {k.keyPrefix}
                    </code>
                    <button
                      onClick={() => handleCopy(k.keyPrefix)}
                      className="p-1.5 rounded-lg bg-black hover:bg-[#181818] text-neutral-400 hover:text-yellow-400"
                    >
                      {copiedText === k.keyPrefix ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium">
                    {lang === 'ar' ? 'تاريخ الإنشاء:' : 'Created:'} {k.createdAt} • {lang === 'ar' ? 'آخر استخدام:' : 'Last used:'} {k.lastUsedAt}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteKey(k.id)}
                    className="p-2 rounded-xl bg-black hover:bg-red-950/40 text-neutral-400 hover:text-red-400 border border-[#252525] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Webhooks */}
      {activeTab === 'webhooks' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white">
                {lang === 'ar' ? 'مسارات الـ Webhooks' : 'Registered Webhooks'}
              </h3>
              <p className="text-xs text-neutral-400 font-medium">
                {lang === 'ar' ? 'استقبال إشعارات فورية عند ربط أو فصل التكاملات أو رصد أحداث أمان.' : 'Real-time event streams dispatched to your backend endpoints.'}
              </p>
            </div>

            <button
              onClick={() => setIsAddingWebhook(true)}
              className="px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black flex items-center gap-1.5 shadow-md shadow-yellow-400/20"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إضافة نقطة نهاية' : 'Add Webhook'}</span>
            </button>
          </div>

          {isAddingWebhook && (
            <div className="p-5 rounded-2xl bg-[#0e0e0e] border-2 border-yellow-400/50 space-y-4 animate-in fade-in duration-200">
              <h4 className="text-xs font-black uppercase text-yellow-400 tracking-wider">
                {lang === 'ar' ? 'رابط نقطة النهاية (HTTPS Endpoint)' : 'Endpoint URL'}
              </h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  value={newWebhookUrl}
                  onChange={(e) => setNewWebhookUrl(e.target.value)}
                  placeholder="https://api.yourdomain.com/webhooks/gservia"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-[#2a2a2a] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
                />
                <button
                  onClick={handleAddWebhook}
                  className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black text-xs font-black hover:bg-yellow-300 transition-colors"
                >
                  {lang === 'ar' ? 'حفظ واختبار' : 'Save'}
                </button>
                <button
                  onClick={() => setIsAddingWebhook(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#1a1a1a] text-neutral-300 text-xs font-bold hover:text-white"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {webhooks.map((whk) => (
              <div
                key={whk.id}
                className="p-5 rounded-2xl bg-[#0c0c0c] border border-[#242424] space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-yellow-400" />
                    <code className="text-xs font-mono text-white font-bold">{whk.endpointUrl}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                      {whk.successRate}% {lang === 'ar' ? 'نسبة النجاح' : 'Success'}
                    </span>
                    <button
                      onClick={() => handleCopy(whk.endpointUrl)}
                      className="p-1.5 rounded-lg bg-black hover:bg-[#181818] text-neutral-400 hover:text-yellow-400"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {whk.events.map((ev) => (
                    <span
                      key={ev}
                      className="px-2 py-0.5 rounded-md bg-black text-[10px] font-mono text-neutral-300 border border-[#222]"
                    >
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: REST API Endpoints Explorer */}
      {activeTab === 'docs' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-black text-white">
              {lang === 'ar' ? 'واجهات برمجة التطبيقات الرسمية (REST API Reference)' : 'Standard REST API Surface'}
            </h3>
            <p className="text-xs text-neutral-400 font-medium">
              {lang === 'ar' ? 'طبقة API موحدة ومنظمة وقابلة للتوسع لأي تكامل مستقبلي.' : 'Structured, versioned API layer designed for high-scale enterprise integrations.'}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { method: 'GET', path: '/api/health', descAr: 'فحص جاهزية المنصة ومطابقة الشروط القانونية', descEn: 'Platform health and independence compliance headers' },
              { method: 'GET', path: '/api/integrations', descAr: 'قائمة بكافة الموديلات والتكاملات المتصلة وحالتها', descEn: 'List all multi-provider integrations and OAuth status' },
              { method: 'GET', path: '/api/integrations/google', descAr: 'استرجاع تكاملات Google الرسمية ونطاقات الأذونات المطلوبة', descEn: 'Retrieve Google integrations and verified OAuth scopes' },
              { method: 'POST', path: '/api/integrations/:id/connect', descAr: 'توصيل تكامل رسمي عبر مصادقة الرموز المشفرة', descEn: 'Connect an integration module via secure token grant' },
              { method: 'POST', path: '/api/integrations/:id/disconnect', descAr: 'فصل التكامل وإلغاء الرموز بشكل فوري', descEn: 'Revoke integration access tokens safely' },
              { method: 'GET', path: '/api/marketplace', descAr: 'استرجاع كتالوج الإضافات والوكلاء الذكية', descEn: 'List verified apps, AI agents and connectors' },
              { method: 'GET', path: '/api/users/export', descAr: 'تصدير البيانات الشخصية وفق معايير GDPR', descEn: 'Download full user data archive in JSON format' },
            ].map((ep) => (
              <div
                key={ep.path}
                className="p-4 rounded-2xl bg-[#0c0c0c] border border-[#242424] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded font-black text-[11px] ${ep.method === 'GET' ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/40' : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'}`}>
                    {ep.method}
                  </span>
                  <span className="text-white font-bold">{ep.path}</span>
                </div>
                <div className="text-neutral-400 font-sans text-xs">
                  {lang === 'ar' ? ep.descAr : ep.descEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: SDK Code Snippets */}
      {activeTab === 'sdk' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-black text-white">
              {lang === 'ar' ? 'نموذج استدعاء API (TypeScript / cURL)' : 'Code Snippets & Integration SDK'}
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-black border border-[#242424] relative font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto">
            <button
              onClick={() => handleCopy(`curl -X GET "https://gservia.global/api/integrations" \\\n  -H "Authorization: Bearer gsv_live_your_api_key" \\\n  -H "Content-Type: application/json"`)}
              className="absolute top-4 end-4 p-2 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] text-neutral-300 hover:text-yellow-400 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
            <pre className="text-yellow-400 font-bold mb-2"># 1. cURL Example</pre>
            <pre>
{`curl -X GET "https://gservia.global/api/integrations" \\
  -H "Authorization: Bearer gsv_live_your_api_key" \\
  -H "Content-Type: application/json"`}
            </pre>

            <pre className="text-yellow-400 font-bold mt-6 mb-2"># 2. Node.js / TypeScript Example</pre>
            <pre>
{`import axios from 'axios';

const client = axios.create({
  baseURL: 'https://gservia.global/api',
  headers: {
    Authorization: 'Bearer ' + process.env.GSERVIA_API_KEY,
  },
});

async function listIntegrations() {
  const { data } = await client.get('/integrations');
  console.log('Active integrations:', data);
}`}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
};
