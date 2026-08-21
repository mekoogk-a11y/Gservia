import React, { useState } from 'react';
import { Language, MarketplaceApp } from '../types';
import { getTranslation } from '../data/translations';
import { MARKETPLACE_APPS } from '../data/marketplaceData';
import { 
  ShoppingBag, 
  Search, 
  Star, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Terminal, 
  RefreshCw, 
  FolderArchive,
  Tag
} from 'lucide-react';

interface MarketplaceViewProps {
  lang: Language;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ lang }) => {
  const t = getTranslation(lang);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [installedAppIds, setInstalledAppIds] = useState<string[]>(['app_gemini_vision', 'app_zero_trust_auditor']);

  const filteredApps = MARKETPLACE_APPS.filter((app) => {
    if (selectedCategory !== 'all' && app.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        app.name.toLowerCase().includes(q) ||
        app.nameAr.includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.descriptionAr.includes(q)
      );
    }
    return true;
  });

  const toggleInstall = (appId: string) => {
    setInstalledAppIds((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    );
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles': return <Sparkles className="w-5 h-5 text-yellow-400" />;
      case 'trending-up': return <TrendingUp className="w-5 h-5 text-yellow-400" />;
      case 'shield-check': return <ShieldCheck className="w-5 h-5 text-yellow-400" />;
      case 'refresh-cw': return <RefreshCw className="w-5 h-5 text-yellow-400" />;
      case 'terminal': return <Terminal className="w-5 h-5 text-yellow-400" />;
      default: return <FolderArchive className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#222]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-black mb-3">
            <ShoppingBag className="w-3.5 h-3.5 text-yellow-400" />
            <span>{lang === 'ar' ? 'سوق المنظومة الرقمية' : 'GServia Ecosystem Store'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {t.marketplaceTitle}
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-1 max-w-2xl font-medium">
            {t.marketplaceSubtitle}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث في الملحقات والتطبيقات...' : 'Search extensions & agents...'}
            className="w-full ps-10 pe-4 py-2.5 rounded-2xl bg-[#111] border border-[#2a2a2a] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400 transition-colors"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', labelAr: 'جميع الملحقات', labelEn: 'All Extensions' },
          { id: 'ai', labelAr: 'الذكاء الاصطناعي', labelEn: 'AI & Agents' },
          { id: 'productivity', labelAr: 'الإنتاجية', labelEn: 'Productivity' },
          { id: 'analytics', labelAr: 'التحليلات والسحابة', labelEn: 'Cloud & Analytics' },
          { id: 'security', labelAr: 'الأمان والامتثال', labelEn: 'Security & Audit' },
          { id: 'devtools', labelAr: 'أدوات المطورين', labelEn: 'DevTools' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              selectedCategory === cat.id
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                : 'bg-[#121212] text-neutral-300 hover:text-white border border-[#242424]'
            }`}
          >
            {lang === 'ar' ? cat.labelAr : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Marketplace Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredApps.map((app) => {
          const isInstalled = installedAppIds.includes(app.id);
          return (
            <div
              key={app.id}
              className="p-6 rounded-3xl bg-[#0c0c0c] border-2 border-[#222] hover:border-yellow-400/50 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-black border border-[#2a2a2a] flex items-center justify-center">
                    {getCategoryIcon(app.iconName)}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {app.badge && (
                      <span className="px-2.5 py-1 rounded-lg bg-yellow-400/10 border border-yellow-400/30 text-[10px] font-black text-yellow-400">
                        {lang === 'ar' ? app.badgeAr || app.badge : app.badge}
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-neutral-400 bg-black px-2 py-1 rounded-lg border border-[#242424]">
                      v{app.version}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-black text-white">
                      {lang === 'ar' ? app.nameAr : app.name}
                    </h3>
                    {app.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-xs text-yellow-400/80 font-bold">
                    {app.provider}
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-2 mt-1 font-medium leading-relaxed">
                    {lang === 'ar' ? app.descriptionAr : app.description}
                  </p>
                </div>

                {/* Rating & Installs */}
                <div className="flex items-center gap-4 text-xs font-bold text-neutral-400 mt-4 pt-3 border-t border-[#1a1a1a]">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span className="font-black text-white">{app.rating}</span>
                    <span className="text-neutral-500">({app.reviewsCount})</span>
                  </div>
                  <div>
                    <span className="text-white font-bold">{app.installsCount.toLocaleString()}</span> {lang === 'ar' ? 'تثبيت' : 'installs'}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {app.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-black text-[10px] font-bold text-neutral-400 border border-[#222]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Install / Enable Action */}
              <div className="pt-2">
                <button
                  onClick={() => toggleInstall(app.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                    isInstalled
                      ? 'bg-[#181818] hover:bg-[#222] text-emerald-400 border border-emerald-800/40'
                      : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-md shadow-yellow-400/20'
                  }`}
                >
                  {isInstalled ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'مفعل ومثبت' : 'Installed & Active'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'تثبيت الإضافة' : 'Install Extension'}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
