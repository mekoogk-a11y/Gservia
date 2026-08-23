import React, { useState } from 'react';
import { Language, PricingType } from '../types';
import { GLOBAL_CATEGORIES } from '../data/servicesData';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  Building, 
  Mail, 
  ShieldCheck 
} from 'lucide-react';

interface SubmitServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SubmitServiceModal: React.FC<SubmitServiceModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isArabic = lang === 'ar';
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: '',
    websiteUrl: '',
    description: '',
    categoryId: 'ai',
    pricingType: 'freemium' as PricingType,
    startingPrice: 0,
    features: '',
    contactEmail: '',
    companyName: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      serviceName: '',
      websiteUrl: '',
      description: '',
      categoryId: 'ai',
      pricingType: 'freemium',
      startingPrice: 0,
      features: '',
      contactEmail: '',
      companyName: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="submit-service-modal"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-start text-white"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {isArabic ? 'إضافة خدمة رقمية إلى دليل Gservia' : 'Submit a Service to Gservia Directory'}
              </h3>
              <p className="text-xs text-slate-400">
                {isArabic ? 'انضم إلى المنصة واعرض خدماتك لأكثر من 50,000 مستخدم نشط' : 'List your tool for global discovery & recommendation'}
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

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-3xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-white">
                {isArabic ? 'تم استلام طلب إضافة الخدمة بنجاح!' : 'Submission Received Successfully!'}
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                {isArabic 
                  ? 'سيقوم فريق تدقيق Gservia بفحص الرابط والميزات والموثوقية والموافقة على إدراجها في الدليل خلال 24-48 ساعة.'
                  : 'Our verification team will review your service details, features, and safety standards within 24-48 hours.'}
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-md"
              >
                {isArabic ? 'إغلاق ومتابعة التصفح' : 'Close and Continue'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isArabic ? 'اسم الخدمة / المنتج:' : 'Service / Tool Name:'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    placeholder="e.g. Acme Studio"
                    className="w-full p-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isArabic ? 'رابط الموقع الرسمي:' : 'Official Website URL:'} *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full p-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {isArabic ? 'التصنيف الرئيسي:' : 'Primary Category:'} *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full p-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {GLOBAL_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>
                      {isArabic ? c.nameAr : c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {isArabic ? 'وصف مختصر ودقيق لما تقوم به الخدمة:' : 'Detailed Description of Functionality:'} *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={isArabic ? 'اشرح ما تقدمه الخدمة وكيف تساعد المستخدمين...' : 'Explain what the service does and what user problems it solves...'}
                  className="w-full p-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isArabic ? 'نموذج التسعير:' : 'Pricing Model:'}
                  </label>
                  <select
                    value={formData.pricingType}
                    onChange={(e) => setFormData({ ...formData, pricingType: e.target.value as any })}
                    className="w-full p-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="free">{isArabic ? 'مجاني بالكامل (Free)' : '100% Free'}</option>
                    <option value="freemium">{isArabic ? 'مجاني مع خطة مدفوعة (Freemium)' : 'Freemium'}</option>
                    <option value="paid">{isArabic ? 'مدفوع باشتراك (Paid)' : 'Paid Subscription'}</option>
                    <option value="open_source">{isArabic ? 'مفتوح المصدر (Open Source)' : 'Open Source'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isArabic ? 'بريد التواصل للمؤسس/المسؤول:' : 'Official Contact Email:'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="contact@company.com"
                    className="w-full p-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isArabic ? 'إرسال للمراجعة والاعتماد' : 'Submit for Verification'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
