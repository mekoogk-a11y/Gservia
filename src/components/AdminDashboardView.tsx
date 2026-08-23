import React, { useState } from 'react';
import { GlobalService, Language, ServiceSubmission, BusinessClaim } from '../types';
import { GLOBAL_SERVICES, GLOBAL_CATEGORIES } from '../data/servicesData';
import { 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  FileText, 
  Building, 
  Users, 
  TrendingUp,
  Search,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardViewProps {
  lang: Language;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ lang }) => {
  const isArabic = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'services' | 'submissions' | 'claims' | 'analytics'>('services');
  const [servicesList, setServicesList] = useState<GlobalService[]>(GLOBAL_SERVICES);
  const [search, setSearch] = useState('');

  const [mockSubmissions, setMockSubmissions] = useState<ServiceSubmission[]>([
    {
      id: 'sub-101',
      serviceName: 'Zid Cloud',
      websiteUrl: 'https://zid.sa',
      description: 'Saudi e-commerce retail platform powering local brands and physical store sync.',
      category: 'ecommerce',
      pricingType: 'freemium',
      startingPrice: 49,
      features: 'POS, Inventory, Mada Payments, Delivery',
      contactEmail: 'partners@zid.sa',
      companyName: 'Zid Holding Co.',
      submittedAt: '2026-08-22',
      status: 'pending_review'
    },
    {
      id: 'sub-102',
      serviceName: 'Payoneer Business',
      websiteUrl: 'https://payoneer.com',
      description: 'Global cross-border payouts and marketplace vendor settlements.',
      category: 'finance',
      pricingType: 'free',
      startingPrice: 0,
      features: 'Multi-currency receiving accounts, corporate cards',
      contactEmail: 'listing@payoneer.com',
      companyName: 'Payoneer Inc.',
      submittedAt: '2026-08-21',
      status: 'approved'
    }
  ]);

  const [mockClaims, setMockClaims] = useState<BusinessClaim[]>([
    {
      id: 'cl-1',
      serviceId: 'salla',
      serviceName: 'Salla',
      claimantName: 'Nawaf Al-Harbi',
      businessEmail: 'nawaf@salla.com',
      companyRole: 'Head of Partnerships',
      status: 'verified',
      claimedAt: '2026-08-10'
    },
    {
      id: 'cl-2',
      serviceId: 'shopify',
      serviceName: 'Shopify',
      claimantName: 'Sarah Jenkins',
      businessEmail: 'sarah.j@shopify.com',
      companyRole: 'Regional Growth Director',
      status: 'pending',
      claimedAt: '2026-08-22'
    }
  ]);

  const filteredServices = servicesList.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.nameAr && s.nameAr.includes(search))
  );

  const toggleVerification = (id: string) => {
    setServicesList(servicesList.map(s => s.id === id ? { ...s, verified: !s.verified } : s));
  };

  const toggleFeatured = (id: string) => {
    setServicesList(servicesList.map(s => s.id === id ? { ...s, featured: !s.featured } : s));
  };

  const handleApproveSubmission = (id: string) => {
    setMockSubmissions(mockSubmissions.map(s => s.id === id ? { ...s, status: 'approved' } : s));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-start text-white space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-950 text-blue-400 border border-blue-800 uppercase tracking-wide">
              {isArabic ? 'لوحة التحكم الإدارية' : 'Admin Control Center'}
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            {isArabic ? 'إدارة خدمات ومحتوى منصة Gservia' : 'Gservia Content & Service Management'}
          </h2>
          <p className="text-xs text-slate-400">
            {isArabic ? 'إدارة قاعدة بيانات الخدمات، تدقيق الطلبات، واعتماد ملفات الشركات' : 'Manage service directory, review queue, and vendor claims'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 self-start sm:self-auto">
          {[
            { id: 'services', en: 'Services (11)', ar: 'الخدمات (11)' },
            { id: 'submissions', en: 'Submissions (2)', ar: 'الطلبات الجديدة (2)' },
            { id: 'claims', en: 'Vendor Claims (2)', ar: 'توثيق الشركات (2)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isArabic ? tab.ar : tab.en}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: Services Directory Manager */}
      {activeTab === 'services' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isArabic ? 'بحث في الخدمات...' : 'Search services...'}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              {filteredServices.length} {isArabic ? 'خدمة مدرجة' : 'active listings'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-3">{isArabic ? 'الخدمة' : 'Service'}</th>
                  <th className="py-3 px-3">{isArabic ? 'التصنيف' : 'Category'}</th>
                  <th className="py-3 px-3">{isArabic ? 'السعر' : 'Pricing'}</th>
                  <th className="py-3 px-3">{isArabic ? 'التقييم' : 'Rating'}</th>
                  <th className="py-3 px-3">{isArabic ? 'التوثيق' : 'Verified'}</th>
                  <th className="py-3 px-3">{isArabic ? 'مميز' : 'Featured'}</th>
                  <th className="py-3 px-3 text-end">{isArabic ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-950/50">
                    <td className="py-3 px-3 flex items-center gap-2.5">
                      <img src={service.logoUrl} alt={service.name} className="w-8 h-8 rounded-lg object-contain bg-white p-1" />
                      <div>
                        <span className="font-bold text-white block">{service.name}</span>
                        <span className="text-[10px] text-slate-400">{service.nameAr}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-medium capitalize">{service.categoryId}</td>
                    <td className="py-3 px-3 text-slate-300">
                      {service.freePlan ? (isArabic ? 'مجاني متاح' : 'Free Tier') : `$${service.startingPrice}/mo`}
                    </td>
                    <td className="py-3 px-3 text-amber-400 font-bold">{service.rating} ★</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleVerification(service.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                          service.verified
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {service.verified ? 'Verified ✓' : 'Unverified'}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleFeatured(service.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                          service.featured
                            ? 'bg-blue-950 text-blue-300 border-blue-800'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {service.featured ? 'Featured ★' : 'Standard'}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-end">
                      <a
                        href={service.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 inline-flex items-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Submissions Review Queue */}
      {activeTab === 'submissions' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-black text-white">
            {isArabic ? 'طلبات إضافة وتحديث الخدمات المعلقة' : 'Pending Service Submissions'}
          </h3>
          <div className="space-y-3">
            {mockSubmissions.map((sub) => (
              <div key={sub.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white">{sub.serviceName}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800">
                      {sub.category}
                    </span>
                    <span className="text-[10px] text-slate-500">{sub.submittedAt}</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-1">{sub.description}</p>
                  <span className="text-[11px] text-slate-400">
                    {sub.companyName} • {sub.contactEmail} • <a href={sub.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{sub.websiteUrl}</a>
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {sub.status === 'pending_review' ? (
                    <>
                      <button
                        onClick={() => handleApproveSubmission(sub.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                      >
                        {isArabic ? 'موافقة واعتماد' : 'Approve'}
                      </button>
                      <button
                        onClick={() => setMockSubmissions(mockSubmissions.filter(s => s.id !== sub.id))}
                        className="px-3 py-1.5 rounded-xl bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900 text-xs font-bold transition-colors"
                      >
                        {isArabic ? 'رفض' : 'Reject'}
                      </button>
                    </>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {isArabic ? 'معتمدة ✓' : 'Approved ✓'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Business Claims */}
      {activeTab === 'claims' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-black text-white">
            {isArabic ? 'طلبات توثيق ملكية الشركات (Business Claims)' : 'Vendor & Business Profile Claims'}
          </h3>
          <div className="space-y-3">
            {mockClaims.map((claim) => (
              <div key={claim.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white">{claim.serviceName}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      claim.status === 'verified'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}>
                      {claim.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {claim.claimantName} ({claim.companyRole}) • {claim.businessEmail}
                  </p>
                </div>

                {claim.status === 'pending' && (
                  <button
                    onClick={() => setMockClaims(mockClaims.map(c => c.id === claim.id ? { ...c, status: 'verified' } : c))}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                  >
                    {isArabic ? 'توثيق الحساب' : 'Verify Claim'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
