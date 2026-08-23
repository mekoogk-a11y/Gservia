import React, { useState } from 'react';
import { Language } from '../types';
import { 
  Smartphone, 
  Package, 
  ShieldCheck, 
  Terminal, 
  FileCode, 
  CheckCircle2, 
  Copy, 
  Check, 
  X, 
  Sparkles, 
  ExternalLink,
  Layers,
  UploadCloud,
  FileCheck
} from 'lucide-react';

interface AndroidPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AndroidPublishModal: React.FC<AndroidPublishModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isArabic = lang === 'ar';
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const aabCommand = './gradlew bundleRelease';
  const aabPath = 'android/app/build/outputs/bundle/release/app-release.aab';
  const keystoreCmd = 'keytool -genkey -v -keystore release-keystore.jks -alias gservia -keyalg RSA -keysize 2048 -validity 10000';

  return (
    <div 
      id="android-publish-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isArabic ? 'مركز تجهيز ونشر تطبيق Android (Google Play)' : 'Gservia Android & Google Play Publishing Hub'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                  READY
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isArabic 
                  ? 'تم إعداد الحزمة والهوية com.gservia.app ومشروع Gradle المتكامل لإنتاج ملف AAB' 
                  : 'Full package, Gradle project, and AAB bundle pipeline prepared for Google Play Console'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Metadata Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block uppercase">
              {isArabic ? 'اسم التطبيق' : 'App Name'}
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">
              Gservia
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block uppercase">
              {isArabic ? 'معرف الحزمة' : 'Package ID'}
            </span>
            <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5 block truncate">
              com.gservia.app
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block uppercase">
              {isArabic ? 'إصدار SDK' : 'Target SDK'}
            </span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
              API 35 (Android 15)
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block uppercase">
              {isArabic ? 'صيغة الحزمة' : 'Format'}
            </span>
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400 mt-0.5 block">
              .AAB (App Bundle)
            </span>
          </div>
        </div>

        {/* Step-by-Step Build Pipeline */}
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{isArabic ? '1. أمر توليد ملف AAB للإنتاج (Release)' : '1. Generate AAB Release Command'}</span>
              </span>
              <button
                onClick={() => handleCopy(aabCommand, 'aabCmd')}
                className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                {copiedKey === 'aabCmd' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'aabCmd' ? (isArabic ? 'تم النسخ' : 'Copied') : (isArabic ? 'نسخ' : 'Copy')}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto">
              cd android && {aabCommand}
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isArabic ? '2. مكان ملف AAB الناتج' : '2. Output AAB Bundle Location'}</span>
              </span>
              <button
                onClick={() => handleCopy(aabPath, 'aabPath')}
                className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                {copiedKey === 'aabPath' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'aabPath' ? (isArabic ? 'تم النسخ' : 'Copied') : (isArabic ? 'نسخ' : 'Copy')}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 text-cyan-400 font-mono text-xs overflow-x-auto">
              {aabPath}
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>{isArabic ? '3. أمر إنشاء مفتاح التوقيع الرقمي (Keystore)' : '3. Keystore Generation Command'}</span>
              </span>
              <button
                onClick={() => handleCopy(keystoreCmd, 'keystore')}
                className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                {copiedKey === 'keystore' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'keystore' ? (isArabic ? 'تم النسخ' : 'Copied') : (isArabic ? 'نسخ' : 'Copy')}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 text-amber-400 font-mono text-xs overflow-x-auto">
              {keystoreCmd}
            </pre>
          </div>
        </div>

        {/* Google Play Console Checklist */}
        <div className="mt-5 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-3">
          <h4 className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2 text-sm">
            <UploadCloud className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{isArabic ? 'قائمة متطلبات الرفع على Google Play Console' : 'Google Play Console Launch Checklist'}</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>{isArabic ? 'اسم التطبيق:' : 'App Name:'}</strong> Gservia</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>{isArabic ? 'الأيقونة:' : 'App Icon:'}</strong> 512x512 PNG (32-bit color, alpha disabled, &lt; 1024KB)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>{isArabic ? 'صورة الغلاف (Feature Graphic):' : 'Feature Graphic:'}</strong> 1024x500 PNG/JPEG</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>{isArabic ? 'لقطات الشاشة (Screenshots):' : 'Screenshots:'}</strong> للهاتف (Phone) والتابلت (7 & 10 inch Tablets)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>{isArabic ? 'سياسة الخصوصية:' : 'Privacy Policy:'}</strong> https://gservia.vercel.app/#privacy (مدمجة بالتطبيق)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>{isArabic ? 'بريد التواصل والدعم:' : 'Support Email:'}</strong> mekoogk@gmail.com</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>{isArabic ? 'تصنيف التطبيق:' : 'Category:'}</strong> Utilities / Productivity / Tools</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {isArabic ? 'المشروع جاهز 100% للتجميع والتصدير' : '100% Ready for Android Studio & CLI builds'}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-xs"
          >
            {isArabic ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
