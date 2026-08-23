import React, { useState, useMemo } from 'react';
import { Language } from '../types';
import { 
  TrendingUp, 
  Search, 
  ArrowUpRight, 
  Calendar, 
  Layers, 
  Zap, 
  Users, 
  Sparkles, 
  BarChart3, 
  Filter, 
  Clock, 
  Compass, 
  ExternalLink,
  Flame,
  Globe2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface TrendInsightsProps {
  lang: Language;
}

type Timeframe = '7d' | '30d' | '90d' | '1y';
type MetricView = 'searches' | 'clicks' | 'comparisons';

interface TrendDataPoint {
  date: string;
  dateLabel: string;
  dateLabelAr: string;
  ecommerce: number;
  ai: number;
  finance: number;
  design: number;
  devTools: number;
  totalSearches: number;
  totalClicks: number;
  totalComparisons: number;
}

export const TrendInsights: React.FC<TrendInsightsProps> = ({ lang }) => {
  const isArabic = lang === 'ar';
  const [timeframe, setTimeframe] = useState<Timeframe>('30d');
  const [selectedMetric, setSelectedMetric] = useState<MetricView>('searches');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Time-series Trend Data across different granularities
  const trendData30d: TrendDataPoint[] = [
    { date: '2026-07-25', dateLabel: 'Jul 25', dateLabelAr: '٢٥ يوليو', ecommerce: 1240, ai: 1890, finance: 920, design: 840, devTools: 650, totalSearches: 5540, totalClicks: 3200, totalComparisons: 1120 },
    { date: '2026-07-29', dateLabel: 'Jul 29', dateLabelAr: '٢٩ يوليو', ecommerce: 1420, ai: 2150, finance: 1040, design: 890, devTools: 710, totalSearches: 6210, totalClicks: 3640, totalComparisons: 1340 },
    { date: '2026-08-02', dateLabel: 'Aug 02', dateLabelAr: '٠٢ أغسطس', ecommerce: 1680, ai: 2420, finance: 1180, design: 980, devTools: 790, totalSearches: 7050, totalClicks: 4120, totalComparisons: 1560 },
    { date: '2026-08-06', dateLabel: 'Aug 06', dateLabelAr: '٠٦ أغسطس', ecommerce: 1850, ai: 2890, finance: 1350, design: 1120, devTools: 840, totalSearches: 8050, totalClicks: 4890, totalComparisons: 1890 },
    { date: '2026-08-10', dateLabel: 'Aug 10', dateLabelAr: '١٠ أغسطس', ecommerce: 2100, ai: 3340, finance: 1520, design: 1250, devTools: 920, totalSearches: 9130, totalClicks: 5610, totalComparisons: 2140 },
    { date: '2026-08-14', dateLabel: 'Aug 14', dateLabelAr: '١٤ أغسطس', ecommerce: 2390, ai: 3820, finance: 1680, design: 1380, devTools: 1050, totalSearches: 10320, totalClicks: 6420, totalComparisons: 2480 },
    { date: '2026-08-18', dateLabel: 'Aug 18', dateLabelAr: '١٨ أغسطس', ecommerce: 2640, ai: 4410, finance: 1910, design: 1520, devTools: 1190, totalSearches: 11670, totalClicks: 7290, totalComparisons: 2910 },
    { date: '2026-08-22', dateLabel: 'Aug 22', dateLabelAr: '٢٢ أغسطس', ecommerce: 2980, ai: 5120, finance: 2180, design: 1690, devTools: 1340, totalSearches: 13310, totalClicks: 8450, totalComparisons: 3420 },
  ];

  const trendData7d: TrendDataPoint[] = [
    { date: '2026-08-16', dateLabel: 'Sun', dateLabelAr: 'الأحد', ecommerce: 2450, ai: 4100, finance: 1750, design: 1450, devTools: 1120, totalSearches: 10870, totalClicks: 6800, totalComparisons: 2650 },
    { date: '2026-08-17', dateLabel: 'Mon', dateLabelAr: 'الاثنين', ecommerce: 2580, ai: 4290, finance: 1840, design: 1490, devTools: 1160, totalSearches: 11360, totalClicks: 7090, totalComparisons: 2790 },
    { date: '2026-08-18', dateLabel: 'Tue', dateLabelAr: 'الثلاثاء', ecommerce: 2640, ai: 4410, finance: 1910, design: 1520, devTools: 1190, totalSearches: 11670, totalClicks: 7290, totalComparisons: 2910 },
    { date: '2026-08-19', dateLabel: 'Wed', dateLabelAr: 'الأربعاء', ecommerce: 2790, ai: 4680, finance: 2010, design: 1580, devTools: 1240, totalSearches: 12300, totalClicks: 7750, totalComparisons: 3080 },
    { date: '2026-08-20', dateLabel: 'Thu', dateLabelAr: 'الخميس', ecommerce: 2890, ai: 4920, finance: 2110, design: 1640, devTools: 1290, totalSearches: 12850, totalClicks: 8120, totalComparisons: 3250 },
    { date: '2026-08-21', dateLabel: 'Fri', dateLabelAr: 'الجمعة', ecommerce: 2910, ai: 5040, finance: 2140, design: 1660, devTools: 1310, totalSearches: 13060, totalClicks: 8290, totalComparisons: 3340 },
    { date: '2026-08-22', dateLabel: 'Sat', dateLabelAr: 'السبت', ecommerce: 2980, ai: 5120, finance: 2180, design: 1690, devTools: 1340, totalSearches: 13310, totalClicks: 8450, totalComparisons: 3420 },
  ];

  const trendData90d: TrendDataPoint[] = [
    { date: '2026-06-01', dateLabel: 'Jun W1', dateLabelAr: 'يونيو أ١', ecommerce: 890, ai: 1120, finance: 640, design: 590, devTools: 420, totalSearches: 3660, totalClicks: 2100, totalComparisons: 740 },
    { date: '2026-06-15', dateLabel: 'Jun W3', dateLabelAr: 'يونيو أ٣', ecommerce: 1050, ai: 1450, finance: 780, design: 710, devTools: 530, totalSearches: 4520, totalClicks: 2650, totalComparisons: 920 },
    { date: '2026-07-01', dateLabel: 'Jul W1', dateLabelAr: 'يوليو أ١', ecommerce: 1190, ai: 1720, finance: 890, design: 810, devTools: 610, totalSearches: 5220, totalClicks: 3050, totalComparisons: 1080 },
    { date: '2026-07-15', dateLabel: 'Jul W3', dateLabelAr: 'يوليو أ٣', ecommerce: 1380, ai: 2090, finance: 1010, design: 880, devTools: 690, totalSearches: 6050, totalClicks: 3560, totalComparisons: 1290 },
    { date: '2026-08-01', dateLabel: 'Aug W1', dateLabelAr: 'أغسطس أ١', ecommerce: 1650, ai: 2540, finance: 1210, design: 1020, devTools: 810, totalSearches: 7230, totalClicks: 4320, totalComparisons: 1650 },
    { date: '2026-08-22', dateLabel: 'Aug W4', dateLabelAr: 'أغسطس أ٤', ecommerce: 2980, ai: 5120, finance: 2180, design: 1690, devTools: 1340, totalSearches: 13310, totalClicks: 8450, totalComparisons: 3420 },
  ];

  const currentChartData = useMemo(() => {
    switch (timeframe) {
      case '7d': return trendData7d;
      case '90d': return trendData90d;
      case '1y': return trendData90d;
      default: return trendData30d;
    }
  }, [timeframe]);

  // Rising search terms with surge %
  const risingSearches = [
    { query: isArabic ? 'إنشاء متجر سلة وزد' : 'Start Salla vs Zid Store', intent: isArabic ? 'تجارة إلكترونية' : 'E-Commerce', growth: '+142%', volume: '18.4K', trend: 'viral' },
    { query: isArabic ? 'أفضل بديل مجاني لـ Canva' : 'Free AI Canva alternatives', intent: isArabic ? 'تصميم جرافيك' : 'Design & AI', growth: '+118%', volume: '14.2K', trend: 'hot' },
    { query: isArabic ? 'تحويل أموال دولي من السودان' : 'International remittance Wise', intent: isArabic ? 'مدفوعات ومالية' : 'Finance & Transfer', growth: '+94%', volume: '11.8K', trend: 'rising' },
    { query: isArabic ? 'مقارنة ChatGPT Plus مع Gemini Advanced' : 'Gemini Pro vs Claude 3.5 Sonnet', intent: isArabic ? 'ذكاء اصطناعي' : 'AI Models', growth: '+87%', volume: '24.6K', trend: 'viral' },
    { query: isArabic ? 'بوابات الدفع الإلكتروني ميسر وسترايب' : 'Stripe & Moyasar checkout sync', intent: isArabic ? 'بوابات الدفع' : 'Payment Gateways', growth: '+76%', volume: '8.9K', trend: 'rising' },
    { query: isArabic ? 'سيرفرات سحابية استضافة مجانية' : 'Serverless Cloud deploy Supabase', intent: isArabic ? 'تطوير وسحابة' : 'Cloud & Dev', growth: '+63%', volume: '7.5K', trend: 'steady' },
  ];

  // Most Compared Service Pairs
  const topComparedPairs = [
    { pair: 'Salla vs Shopify', pairAr: 'سلة مقابل شوبيفاي', count: 4820, growth: '+68%', winner: 'Salla (MENA Local)' },
    { pair: 'ChatGPT vs Claude vs Gemini', pairAr: 'شات جي بي تي مقابل كلود وجيميني', count: 6410, growth: '+124%', winner: 'Claude (Coding) / Gemini (Search)' },
    { pair: 'Wise vs Payoneer', pairAr: 'وايز مقابل بايونير', count: 3290, growth: '+45%', winner: 'Wise (Low Fees)' },
    { pair: 'Canva vs Figma', pairAr: 'كانفا مقابل فيجما', count: 2940, growth: '+38%', winner: 'Canva (Templates)' },
  ];

  // Category Distribution for PieChart
  const categoryShare = [
    { name: isArabic ? 'ذكاء اصطناعي' : 'AI & ML', value: 38, color: '#8b5cf6' },
    { name: isArabic ? 'تجارة إلكترونية' : 'E-Commerce', value: 24, color: '#3b82f6' },
    { name: isArabic ? 'مدفوعات ومالية' : 'Finance & Payouts', value: 17, color: '#10b981' },
    { name: isArabic ? 'تصميم وإبداع' : 'Design & Creative', value: 12, color: '#f59e0b' },
    { name: isArabic ? 'أدوات مطورين' : 'Dev & Cloud', value: 9, color: '#ec4899' },
  ];

  // Top Clicked Services Bar Chart Data
  const topServicesBarData = [
    { name: 'Salla', clicks: 8940, comparisons: 3200, category: 'E-Commerce' },
    { name: 'ChatGPT', clicks: 12400, comparisons: 4500, category: 'AI' },
    { name: 'Wise', clicks: 6720, comparisons: 2400, category: 'Finance' },
    { name: 'Canva', clicks: 7850, comparisons: 2100, category: 'Design' },
    { name: 'Shopify', clicks: 5410, comparisons: 2900, category: 'E-Commerce' },
    { name: 'Gemini', clicks: 9200, comparisons: 3800, category: 'AI' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1 z-50">
          <p className="font-bold text-white mb-1.5 border-b border-slate-800 pb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color }}></span>
                <span className="font-medium text-slate-300 capitalize">{entry.name}:</span>
              </span>
              <span className="font-bold text-white">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="trend-insights-container" className="space-y-6 text-start">
      
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-950 text-indigo-400 border border-indigo-800 uppercase tracking-wide flex items-center gap-1">
              <Flame className="w-3 h-3 text-indigo-400" />
              {isArabic ? 'تحليلات الرواج والاهتمام' : 'Real-time Demand & Trend Radar'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
              Live Data Feed
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {isArabic ? 'رادار اتجاهات البحث واهتمامات المستخدمين' : 'Search Volume & User Intent Analytics'}
          </h3>
          <p className="text-xs text-slate-400">
            {isArabic 
              ? 'تتبع نمو الكلمات الدلالية الأكثر بحثاً، الخدمات المتصدرة، ومعدلات المقارنة عبر الزمن' 
              : 'Monitor rising service inquiries, intent growth velocity, and comparison traffic over time'}
          </p>
        </div>

        {/* Timeframe selector controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 self-start md:self-auto">
          {(['7d', '30d', '90d'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === tf
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf === '7d' ? (isArabic ? 'آخر ٧ أيام' : '7 Days') :
               tf === '30d' ? (isArabic ? 'آخر ٣٠ يوم' : '30 Days') :
               (isArabic ? 'آخر ٩٠ يوم' : '90 Days')}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => setSelectedMetric('searches')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedMetric === 'searches' 
              ? 'bg-indigo-950/40 border-indigo-500 shadow-md' 
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">{isArabic ? 'إجمالي عمليات البحث' : 'Total Searches'}</span>
            <Search className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">74,210</div>
          <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+38.4% {isArabic ? 'مقارنة بالفترة السابقة' : 'vs last period'}</span>
          </div>
        </div>

        <div 
          onClick={() => setSelectedMetric('clicks')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedMetric === 'clicks' 
              ? 'bg-blue-950/40 border-blue-500 shadow-md' 
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">{isArabic ? 'معدل فتح الخدمات' : 'Service Launches'}</span>
            <ExternalLink className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">46,890</div>
          <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+44.1% {isArabic ? 'تفاعل عالي' : 'high conversion'}</span>
          </div>
        </div>

        <div 
          onClick={() => setSelectedMetric('comparisons')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedMetric === 'comparisons' 
              ? 'bg-purple-950/40 border-purple-500 shadow-md' 
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">{isArabic ? 'مقارنات وجهاً لوجه' : 'Head-to-Head Comparisons'}</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">18,340</div>
          <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+62.7% {isArabic ? 'اهتمام بالمقارنة' : 'decision surge'}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">{isArabic ? 'القطاع الأسرع نمواً' : 'Top Surging Category'}</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-black text-amber-300 truncate">
            {isArabic ? 'الذكاء الاصطناعي (+112%)' : 'Generative AI (+112%)'}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            {isArabic ? 'تليها التجارة الإلكترونية (+84%)' : 'Followed by E-Commerce (+84%)'}
          </div>
        </div>

      </div>

      {/* Main Chart Section: Time Series Curve */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>
                {selectedMetric === 'searches' ? (isArabic ? 'نمو طلبات البحث حسب القطاع' : 'Search Interest by Sector') :
                 selectedMetric === 'clicks' ? (isArabic ? 'معدل فتح وتوجيه الخدمات' : 'Service Direct Launches') :
                 (isArabic ? 'معدل المقارنة والتقييم' : 'Comparison Volume Dynamics')}
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              {isArabic 
                ? 'رسم بياني زمني يوضح ارتفاع حجم الاهتمام والبحث عبر مختلف فئات الخدمات' 
                : 'Timeline visualization plotting user demand across digital tool ecosystems'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">{isArabic ? 'جميع القطاعات المجمعة' : 'All Categories Combined'}</option>
              <option value="ai">{isArabic ? 'الذكاء الاصطناعي فقط' : 'AI & Models Only'}</option>
              <option value="ecommerce">{isArabic ? 'التجارة والمتاجر فقط' : 'E-Commerce Only'}</option>
              <option value="finance">{isArabic ? 'المالية والتحويلات فقط' : 'Finance & Payouts Only'}</option>
            </select>
          </div>
        </div>

        {/* Recharts Area Chart Component */}
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEcommerce" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFinance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDesign" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey={isArabic ? 'dateLabelAr' : 'dateLabel'} 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }} 
              />

              {(selectedCategoryFilter === 'all' || selectedCategoryFilter === 'ai') && (
                <Area 
                  type="monotone" 
                  dataKey="ai" 
                  name={isArabic ? 'ذكاء اصطناعي (AI)' : 'AI & Next-Gen'} 
                  stroke="#8b5cf6" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorAi)" 
                />
              )}

              {(selectedCategoryFilter === 'all' || selectedCategoryFilter === 'ecommerce') && (
                <Area 
                  type="monotone" 
                  dataKey="ecommerce" 
                  name={isArabic ? 'تجارة إلكترونية (E-Commerce)' : 'E-Commerce'} 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorEcommerce)" 
                />
              )}

              {(selectedCategoryFilter === 'all' || selectedCategoryFilter === 'finance') && (
                <Area 
                  type="monotone" 
                  dataKey="finance" 
                  name={isArabic ? 'مدفوعات ومالية (Finance)' : 'Finance & Payouts'} 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorFinance)" 
                />
              )}

              {selectedCategoryFilter === 'all' && (
                <Area 
                  type="monotone" 
                  dataKey="design" 
                  name={isArabic ? 'تصميم وإبداع (Design)' : 'Design & Creative'} 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorDesign)" 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Grid: Rising Search Queries & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Top Rising Search Queries with surge tags */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-400">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {isArabic ? 'الاستفسارات الأكثر صعوداً (Rising Searches)' : 'Breakout Inquiries & High-Growth Queries'}
                </h4>
                <span className="text-[11px] text-slate-400">
                  {isArabic ? 'نيّات البحث ذات أعلى وتيرة نمو خلال الفترة الحالية' : 'Search queries experiencing sharp demand acceleration'}
                </span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-800/80">
            {risingSearches.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-3 group hover:bg-slate-950/40 px-2 rounded-xl transition-colors">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 w-4">{idx + 1}</span>
                    <span className="text-xs font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
                      {item.query}
                    </span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase border ${
                      item.trend === 'viral' ? 'bg-rose-950 text-rose-300 border-rose-800' :
                      item.trend === 'hot' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                      'bg-blue-950 text-blue-300 border-blue-800'
                    }`}>
                      {item.trend}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block ms-6">
                    {item.intent} • {item.volume} {isArabic ? 'عملية بحث' : 'searches'}
                  </span>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 font-bold text-xs text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-xl border border-emerald-800/60">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{item.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Category Distribution & Comparison Battles */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Category Share Pie Chart */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>{isArabic ? 'توزيع الاهتمام حسب فئات الخدمات' : 'Intent Share by Ecosystem'}</span>
            </h4>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${value}%`, isArabic ? 'الحصة' : 'Share']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
              {categoryShare.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name}:</span>
                  <span className="font-bold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Head-to-Head Comparison Pairs */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>{isArabic ? 'أكثر المقارنات طلباً' : 'Top Head-to-Head Battles'}</span>
              </span>
              <span className="text-[10px] text-purple-400 font-bold bg-purple-950 px-2 py-0.5 rounded-full border border-purple-800">
                Decision Studio
              </span>
            </h4>

            <div className="space-y-2.5">
              {topComparedPairs.map((pair, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-bold text-white block truncate">
                      {isArabic ? pair.pairAr : pair.pair}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {pair.count.toLocaleString()} {isArabic ? 'مقارنة' : 'comparisons'} • <span className="text-emerald-400">{pair.winner}</span>
                    </span>
                  </div>
                  <span className="text-xs font-bold text-indigo-400 shrink-0">
                    {pair.growth}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Bar Chart: Top Clicked / Direct Launched Tools */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{isArabic ? 'أكثر الخدمات نشاطاً وتوجيهاً (Top Launched Services)' : 'Top Directly Launched Services'}</span>
            </h4>
            <p className="text-xs text-slate-400">
              {isArabic ? 'مقارنة بين عدد مرات الفتح المباشر والمقارنة لأبرز الخدمات العالمية' : 'Total direct clicks vs comparisons for leading digital tools'}
            </p>
          </div>
        </div>

        <div className="w-full h-64 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topServicesBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }}
              />
              <Legend 
                verticalAlign="top" 
                height={30} 
                iconType="circle"
                wrapperStyle={{ fontSize: '11px' }} 
              />
              <Bar 
                dataKey="clicks" 
                name={isArabic ? 'الفتح المباشر (Clicks)' : 'Direct Launches'} 
                fill="#3b82f6" 
                radius={[6, 6, 0, 0]} 
              />
              <Bar 
                dataKey="comparisons" 
                name={isArabic ? 'المقارنات (Comparisons)' : 'Compared'} 
                fill="#8b5cf6" 
                radius={[6, 6, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
