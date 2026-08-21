import React, { useState } from 'react';
import { Language, UserProfile, UserSession, SecurityAuditLog } from '../types';
import { getTranslation } from '../data/translations';
import { SYSTEM_CURRENCIES, SYSTEM_TIMEZONES } from '../data/settingsData';
import { 
  User, 
  ShieldCheck, 
  Key, 
  Download, 
  Trash2, 
  Smartphone, 
  Laptop, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Globe2, 
  DollarSign, 
  Layers 
} from 'lucide-react';

interface AccountSecurityViewProps {
  lang: Language;
  user: UserProfile;
  sessions: UserSession[];
  auditLogs: SecurityAuditLog[];
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onTerminateSession: (sessionId: string) => void;
  onDeleteAccount: () => void;
}

export const AccountSecurityView: React.FC<AccountSecurityViewProps> = ({
  lang,
  user,
  sessions,
  auditLogs,
  onUpdateProfile,
  onTerminateSession,
  onDeleteAccount,
}) => {
  const t = getTranslation(lang);
  const [fullName, setFullName] = useState<string>(user.fullName);
  const [org, setOrg] = useState<string>(user.organization || '');
  const [selectedCurrency, setSelectedCurrency] = useState<string>(user.currency);
  const [selectedTimezone, setSelectedTimezone] = useState<string>(user.timezone);
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(user.twoFactorEnabled);
  const [isSavedNotice, setIsSavedNotice] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      fullName,
      organization: org,
      currency: selectedCurrency,
      timezone: selectedTimezone,
      twoFactorEnabled: is2FAEnabled,
    });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const handleExportData = () => {
    const exportObject = {
      exportDate: new Date().toISOString(),
      platform: 'GServia Universal Ecosystem',
      userProfile: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        organization: user.organization,
        currency: user.currency,
        timezone: user.timezone,
        securityScore: user.securityScore,
      },
      sessions,
      auditLogs,
      complianceStandard: 'GDPR / CCPA Data Portability Compliant',
    };

    const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gservia_data_export_${user.id}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-black mb-3">
            <Lock className="w-3.5 h-3.5 text-yellow-400" />
            <span>{lang === 'ar' ? 'إدارة الهوية والأمان المؤسسي' : 'Identity & Security Control'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {t.accountSecurityTitle}
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-1 max-w-2xl font-medium">
            {lang === 'ar' 
              ? 'إدارة الملف الشخصي، التفضيلات الدولية، الجلسات النشطة، وسجل تدقيق الأمان والخصوصية.'
              : 'Manage your profile, global preferences, active device sessions, and compliance audit trail.'}
          </p>
        </div>

        {/* Security Posture Status */}
        <div className="flex items-center gap-3 bg-[#0d0d0d] px-4 py-2.5 rounded-2xl border border-[#262626]">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <span className="text-neutral-400 block font-bold">{lang === 'ar' ? 'درجة الأمان' : 'Security Rating'}</span>
            <span className="font-black text-emerald-400">{user.securityScore}% • {lang === 'ar' ? 'ممتاز' : 'Excellent'}</span>
          </div>
        </div>
      </div>

      {isSavedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-black flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{lang === 'ar' ? 'تم حفظ التعديلات بنجاح وتحديث تفضيلات الحساب.' : 'Account preferences and profile updated successfully.'}</span>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Profile & Global Preferences Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Profile & Organization Form */}
          <form onSubmit={handleSaveProfile} className="p-6 rounded-3xl bg-[#0c0c0c] border-2 border-[#242424] space-y-5 shadow-xl">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <User className="w-5 h-5 text-yellow-400" />
              <span>{lang === 'ar' ? 'المعلومات الشخصية والمؤسسية' : 'Personal & Organization Profile'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1.5">
                  {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-[#2a2a2a] text-white text-xs font-bold focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1.5">
                  {lang === 'ar' ? 'البريد الإلكتروني المعتمد' : 'Verified Email'}
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#242424] text-neutral-400 text-xs font-bold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1.5">
                  {lang === 'ar' ? 'المؤسسة / الشركة' : 'Organization / Team'}
                </label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-[#2a2a2a] text-white text-xs font-bold focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1.5">
                  {t.currencyPreference}
                </label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-[#2a2a2a] text-white text-xs font-bold focus:outline-none focus:border-yellow-400"
                >
                  {SYSTEM_CURRENCIES.map((curr) => (
                    <option key={curr.code} value={`${curr.code} (${curr.symbol})`}>
                      {curr.code} - {lang === 'ar' ? curr.nameAr : curr.name} ({curr.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-400 mb-1.5">
                  {t.timezonePreference}
                </label>
                <select
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-[#2a2a2a] text-white text-xs font-bold focus:outline-none focus:border-yellow-400"
                >
                  {SYSTEM_TIMEZONES.map((tz) => (
                    <option key={tz.id} value={tz.name}>
                      {tz.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2FA Toggle Card */}
            <div className="p-4 rounded-2xl bg-black border border-[#262626] flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="text-xs font-black text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-yellow-400" />
                  <span>{t.twoFactorAuth}</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-medium">
                  {lang === 'ar' ? 'تأمين تسجيل الدخول عبر تطبيق Authenticator ورموز التحقق المشفرة.' : 'Protect your sessions via authenticator app token handshakes.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  is2FAEnabled ? 'bg-yellow-400' : 'bg-neutral-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                    is2FAEnabled ? (lang === 'ar' ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black transition-colors shadow-md shadow-yellow-400/20"
              >
                {lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
              </button>
            </div>
          </form>

          {/* Active Sessions Management */}
          <div className="p-6 rounded-3xl bg-[#0c0c0c] border-2 border-[#242424] space-y-4 shadow-xl">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-yellow-400" />
              <span>{t.activeSessions}</span>
            </h3>

            <div className="space-y-3">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="p-4 rounded-2xl bg-black border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#2b2b2b] flex items-center justify-center text-yellow-400">
                      {sess.device.includes('iPhone') ? <Smartphone className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white">{sess.device}</span>
                        {sess.isCurrent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                            {lang === 'ar' ? 'الجلسة الحالية' : 'Current Session'}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-neutral-400 font-medium">
                        {sess.ip} • {sess.location} • {sess.lastActive}
                      </div>
                    </div>
                  </div>

                  {!sess.isCurrent && (
                    <button
                      onClick={() => onTerminateSession(sess.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#141414] hover:bg-red-950/40 text-red-400 text-xs font-bold border border-[#252525] transition-colors self-end sm:self-auto"
                    >
                      {lang === 'ar' ? 'إنهاء الجلسة' : 'Revoke'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Data Export, Audit Log & Danger Zone */}
        <div className="space-y-6">
          
          {/* GDPR / CCPA Data Export Box */}
          <div className="p-6 rounded-3xl bg-[#0b0b0b] border-2 border-[#242424] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black border border-yellow-400/30 text-yellow-400 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">{t.exportData}</h3>
                <span className="text-[11px] text-neutral-400 font-bold">GDPR & CCPA Compliant</span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 font-medium leading-relaxed">
              {lang === 'ar'
                ? 'قم بتنزيل نسخة كاملة ومجمعة من كافة بياناتك الشخصية، التفضيلات، والتكاملات بتنسيق JSON المعياري.'
                : 'Download a complete export archive of your personal preferences, sessions, and connected profiles.'}
            </p>

            <button
              onClick={handleExportData}
              className="w-full py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black transition-colors shadow-md shadow-yellow-400/20"
            >
              {lang === 'ar' ? 'تصدير وتحميل الأرشيف' : 'Export JSON Archive'}
            </button>
          </div>

          {/* Security Audit Trail Log */}
          <div className="p-6 rounded-3xl bg-[#0b0b0b] border-2 border-[#242424] space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span>{t.securityAuditLog}</span>
            </h3>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-black border border-[#222] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">
                      {lang === 'ar' ? log.actionAr : log.action}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">OK</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono">
                    {new Date(log.timestamp).toLocaleTimeString()} • {log.ip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone: Delete Account */}
          <div className="p-6 rounded-3xl bg-red-950/20 border-2 border-red-900/30 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-black text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>{t.deleteAccount}</span>
            </div>
            <p className="text-xs text-neutral-400 font-medium">
              {lang === 'ar'
                ? 'حذف الحساب نهائي لا يمكن التراجع عنه ويؤدي إلى إلغاء كافة رموز الجلسات ومسح المفضلات.'
                : 'Irreversible action that deletes your credentials, logs, and token grants immediately.'}
            </p>
            
            {showDeleteConfirm ? (
              <div className="space-y-2 pt-2">
                <button
                  onClick={onDeleteAccount}
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black transition-colors shadow-lg shadow-red-600/30"
                >
                  {lang === 'ar' ? 'تأكيد الحذف النهائي للملف' : 'Confirm Permanent Deletion'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="w-full py-2 rounded-xl bg-black text-neutral-400 text-xs font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full py-2 rounded-xl bg-black hover:bg-red-950/40 text-red-400 text-xs font-black border border-red-900/40 transition-colors"
              >
                {t.deleteAccount}
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
