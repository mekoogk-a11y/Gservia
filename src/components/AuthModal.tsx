import React, { useState } from 'react';
import { Language, UserProfile } from '../types';
import { getTranslation } from '../data/translations';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  lang,
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const t = getTranslation(lang);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [org, setOrg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError(lang === 'ar' ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' : 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      const authenticatedUser: UserProfile = {
        id: `usr_${Date.now().toString(36)}`,
        email: email.trim(),
        fullName: fullName.trim() || (email.split('@')[0] || 'Enterprise Admin'),
        organization: org.trim() || 'Global Tech Labs',
        role: 'admin',
        currency: 'USD ($)',
        timezone: 'UTC (+00:00)',
        twoFactorEnabled: true,
        securityScore: 98,
        createdAt: '2026-08-01',
      };
      onLoginSuccess(authenticatedUser);
      onClose();
    }, 700);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-[#0c0c0c] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#2b2b2b] text-white space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
        >
          <X className="w-5 h-5 text-yellow-400" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-black border border-yellow-400/40 text-yellow-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white">
            {isRegister
              ? (lang === 'ar' ? 'إنشاء حساب جديد في GServia' : 'Create GServia Account')
              : (lang === 'ar' ? 'تسجيل الدخول للمنصة' : 'Sign in to GServia')}
          </h3>
          <p className="text-xs text-neutral-400 font-medium">
            {lang === 'ar'
              ? 'مصادقة مشفرة وآمنة مع ضمان عدم تخزين أي كلمات مرور خارجية.'
              : 'End-to-end encrypted authentication with zero credential logging.'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1">
                  {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'ar' ? 'كمال جعفر' : 'Alex Mercer'}
                    className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-black border border-[#2a2a2a] text-white text-xs font-bold focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1">
                  {lang === 'ar' ? 'المؤسسة / الشركة (اختياري)' : 'Organization (Optional)'}
                </label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="Acme Corp"
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-[#2a2a2a] text-white text-xs font-bold focus:outline-none focus:border-yellow-400"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-neutral-400 mb-1">
              {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-black border border-[#2a2a2a] text-white text-xs font-bold focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 mb-1">
              {lang === 'ar' ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-black border border-[#2a2a2a] text-white text-xs font-bold focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black transition-colors shadow-lg shadow-yellow-400/20 mt-2"
          >
            {loading
              ? (lang === 'ar' ? 'جارٍ التحقق...' : 'Authenticating...')
              : (isRegister ? (lang === 'ar' ? 'إنشاء الحساب' : 'Create Account') : (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'))}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#1e1e1e]">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
            className="text-xs text-neutral-400 hover:text-yellow-400 font-bold transition-colors"
          >
            {isRegister
              ? (lang === 'ar' ? 'لديك حساب بالفعل؟ تسجيل الدخول' : 'Already have an account? Sign in')
              : (lang === 'ar' ? 'ليس لديك حساب؟ سجّل الآن مجاناً' : "Don't have an account? Sign up")}
          </button>
        </div>

      </div>
    </div>
  );
};
