import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  Mic, 
  Radio, 
  Share2, 
  Check, 
  Globe2, 
  User, 
  Sliders, 
  Volume1,
  RotateCcw,
  Headphones,
  Music
} from 'lucide-react';
import { Language } from '../types';

interface PromoAudioPlayerProps {
  lang: Language;
}

export type PromoAudioLang = 'ar_fusha' | 'en_us' | 'ar_sudanese';
export type VoiceGender = 'male' | 'female';

interface ScriptSegment {
  text: string;
  durationEst: number;
}

export const SudanesePromoAudioPlayer: React.FC<PromoAudioPlayerProps> = ({ lang }) => {
  const isArabicUI = lang === 'ar';
  
  // Active Audio Settings
  const [promoLang, setPromoLang] = useState<PromoAudioLang>(isArabicUI ? 'ar_fusha' : 'en_us');
  const [voiceGender, setVoiceGender] = useState<VoiceGender>('male');
  const [speedRate, setSpeedRate] = useState<number>(1.05); // Energetic commercial pace
  const [enableJingle, setEnableJingle] = useState<boolean>(true);
  
  // Playback States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number>(0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Refs for AudioContext & Speech
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const jingleIntervalRef = useRef<number | null>(null);
  const segmentTimerRef = useRef<number | null>(null);

  // Scripts in 3 Flavors (Arabic Fusha, American English, and Sudanese Dialect)
  const scripts: Record<PromoAudioLang, {
    title: { ar: string; en: string };
    badge: { ar: string; en: string };
    segments: ScriptSegment[];
    fullText: string;
    targetLangCode: string;
  }> = {
    ar_fusha: {
      title: {
        ar: "الإعلان الصوتي الرسمي (باللغة العربية الفصحى)",
        en: "Official Commercial Audio (Modern Standard Arabic)"
      },
      badge: {
        ar: "🇸🇦 العربية الفصحى • استوديو إذاعي",
        en: "🇸🇦 Arabic Fusha • Studio Voice"
      },
      targetLangCode: "ar-SA",
      fullText: "مرحبًا بكم في Gservia! بوابتكم ودليلكم العالمي الشامل لاكتشاف أفضل الخدمات الرقمية وحلول الأعمال في العالم! هل ترغب في إطلاق متجر إلكتروني احترافي؟ هل تبحث عن أدوات تصميم متقدمة؟ هل تريد تحويل الأموال دولياً بأقل الرسوم المصرفية؟ أم تحتاج لمساعد ذكاء اصطناعي فائق ينجز أعمالك وبرمجتك بسرعة؟ Gservia ليس مجرد قائمة روابط! إنه يفهم احتياجك بدقة، ويرشدك إلى الخيار الأمثل وفق ميزانيتك، ويقارن لك بين الميزات والأسعار خطوة بخطوة. Gservia — أخبرنا بما تحتاج، وسنرشدك إلى الخدمة المناسبة!",
      segments: [
        { text: "مرحبًا بكم في Gservia! بوابتكم ودليلكم العالمي الشامل لاكتشاف أفضل الخدمات الرقمية وحلول الأعمال في العالم!", durationEst: 4.5 },
        { text: "هل ترغب في إطلاق متجر إلكتروني احترافي عبر سلة أو شوبيفاي؟ هل تبحث عن أدوات تصميم كـ كانفا وفيجما؟", durationEst: 4.5 },
        { text: "هل تريد تحويل الأموال دولياً بأقل الرسوم عبر وايز وسترايب؟ أم تحتاج لمساعد ذكاء اصطناعي فائق ينجز أعمالك وبرمجتك؟", durationEst: 5.0 },
        { text: "Gservia ليس مجرد قائمة روابط! إنه يفهم احتياجك بدقة، ويرشدك إلى الخيار الأمثل وفق ميزانيتك ومستواك.", durationEst: 4.5 },
        { text: "ويقارن لك بين الميزات والأسعار خطوة بخطوة!", durationEst: 2.8 },
        { text: "Gservia — أخبرنا بما تحتاج، وسنرشدك إلى الخدمة المناسبة!", durationEst: 3.5 }
      ]
    },
    en_us: {
      title: {
        ar: "الإعلان الصوتي الرسمي (باللغة الإنجليزية الأمريكية)",
        en: "Official Commercial Audio (American English - US)"
      },
      badge: {
        ar: "🇺🇸 American English • Broadcast Voice",
        en: "🇺🇸 American English • Broadcast Voice"
      },
      targetLangCode: "en-US",
      fullText: "Welcome to Gservia! Your universal guide to discovering the world’s best digital tools, cloud platforms, and SaaS solutions! Looking to launch a high-converting online store with Shopify or Salla? Need stunning graphic design with Canva and Figma? Want seamless low-fee international money transfers with Wise and Stripe? Or are you looking for cutting-edge AI assistants to supercharge your workflow and coding? Gservia is more than just a directory. We understand your exact intent, match you with the perfect tool stack for your budget, and provide unbiased side-by-side comparisons. Gservia — Tell us what you need, and we will guide you to the right service!",
      segments: [
        { text: "Welcome to Gservia! Your universal guide to discovering the world’s best digital tools and SaaS solutions!", durationEst: 4.0 },
        { text: "Looking to launch a high-converting online store? Need stunning graphic design with Canva and Figma?", durationEst: 4.0 },
        { text: "Want seamless low-fee international money transfers? Or cutting-edge AI models to power your workflow?", durationEst: 4.5 },
        { text: "Gservia is more than just a directory. We understand your exact intent and match you with the ideal tool stack.", durationEst: 4.5 },
        { text: "Compare features, pricing, and launch with confidence.", durationEst: 2.5 },
        { text: "Gservia — Tell us what you need, and we will guide you to the right service!", durationEst: 3.5 }
      ]
    },
    ar_sudanese: {
      title: {
        ar: "الإعلان الصوتي الحماسي (باللهجة السودانية الدارجة)",
        en: "Energetic Promo Audio (Sudanese Arabic Dialect)"
      },
      badge: {
        ar: "🇸🇩 عامية سودانية • صوت حماسي",
        en: "🇸🇩 Sudanese Dialect • Energetic"
      },
      targetLangCode: "ar-SD",
      fullText: "يا مرحب بيك في Gservia! المنصة العالمية الذكية والدليل والمرشد الأول لكل الخدمات الإلكترونية في العالم! داير تعمل متجر إلكتروني يبيع ويوصل؟ داير تصمم شعار احترافي وبوستات تسويقية بكانفا؟ داير تحول قروش دولياً بأرخص سعر صرف عبر وايز وسترايب؟ ولا داير مساعد ذكاء اصطناعي ينجز ليك شغلك وبرمجتك؟ Gservia ما بديك روابط وخلاص! Gservia بيفهم طلبك، ويرشدك لأحسن خيار يناسب ميزانيتك ومستواك، ويقارن ليك بين الخدمات، ويوريك كيف تبدأ خطوة بخطوة! يلا ادخل واكتشف عالم الخدمات الرقمية مع Gservia!",
      segments: [
        { text: "يا مرحب بيك في Gservia! المنصة العالمية الذكية والدليل والمرشد الأول لكل الخدمات الإلكترونية!", durationEst: 4.5 },
        { text: "داير تعمل متجر إلكتروني؟ داير تصمم شعار احترافي وبوستات تسويقية؟", durationEst: 3.8 },
        { text: "داير تحول قروش دولياً بأرخص سعر صرف؟ ولا داير مساعد ذكاء اصطناعي ينجز ليك شغلك وبرمجتك؟", durationEst: 4.8 },
        { text: "Gservia ما بديك روابط وخلاص! Gservia بيفهم طلبك ويرشدك لأحسن خيار يناسب ميزانيتك!", durationEst: 4.2 },
        { text: "ويقارن ليك بين الخدمات ويوريك كيف تبدأ خطوة بخطوة!", durationEst: 2.8 },
        { text: "يلا ادخل واكتشف عالم الخدمات الرقمية مع Gservia!", durationEst: 3.0 }
      ]
    }
  };

  const currentScript = scripts[promoLang];

  // Load available speech voices on mount
  useEffect(() => {
    const updateVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      }
    };

    updateVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      stopAllAudio();
    };
  }, []);

  // Web Audio API Background Chime/Jingle Synthesizer
  const playBackgroundJingle = () => {
    if (!enableJingle) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Play an uplifting acoustic studio radio chime sequence
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Bright Chord)
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        
        // Gentle studio chime volume envelope
        gain.gain.setValueAtTime(0.001, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.8);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.85);
      });
    } catch (e) {
      console.warn('Web Audio Ambient Jingle unavailable', e);
    }
  };

  const stopAllAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (jingleIntervalRef.current) {
      window.clearInterval(jingleIntervalRef.current);
      jingleIntervalRef.current = null;
    }
    if (segmentTimerRef.current) {
      window.clearTimeout(segmentTimerRef.current);
      segmentTimerRef.current = null;
    }
    setIsPlaying(false);
    setActiveSegmentIndex(0);
  };

  // Find the highest quality real voice matching language and gender
  const findBestVoice = (langCode: string, gender: VoiceGender) => {
    const voices = availableVoices.length > 0 
      ? availableVoices 
      : ('speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);
    
    if (voices.length === 0) return null;

    if (langCode.startsWith('en')) {
      // US English matching
      const usVoices = voices.filter(v => v.lang === 'en-US' || v.lang.startsWith('en_US') || v.lang.startsWith('en-'));
      
      if (gender === 'male') {
        const maleUS = usVoices.find(v => 
          /david|guy|mark|george|alex|fred|daniel|aaron|male|natural/i.test(v.name)
        );
        if (maleUS) return maleUS;
      } else {
        const femaleUS = usVoices.find(v => 
          /samantha|jenny|zira|victoria|karen|susan|female|natural/i.test(v.name)
        );
        if (femaleUS) return femaleUS;
      }
      return usVoices[0] || voices[0];
    }

    if (langCode.startsWith('ar')) {
      // Arabic matching
      const arVoices = voices.filter(v => v.lang.startsWith('ar') || /arabic|عربي/i.test(v.name));
      
      if (arVoices.length > 0) {
        if (gender === 'male') {
          const maleAr = arVoices.find(v => /maged|tariq|tarik|naif|hamed|male|رجل|ماجد|طارق/i.test(v.name));
          if (maleAr) return maleAr;
        } else {
          const femaleAr = arVoices.find(v => /laila|zeina|salma|hoda|female|امرأة|ليلى|زينة/i.test(v.name));
          if (femaleAr) return femaleAr;
        }
        return arVoices[0];
      }
    }

    return null;
  };

  const handleTogglePlay = () => {
    if (!('speechSynthesis' in window)) {
      alert(isArabicUI ? 'المتصفح لا يدعم تشغيل الصوت التفاعلي.' : 'Browser speech synthesis is not supported.');
      return;
    }

    if (isPlaying) {
      stopAllAudio();
      return;
    }

    // Start fresh playback
    window.speechSynthesis.cancel();
    playBackgroundJingle();

    const utterance = new SpeechSynthesisUtterance(currentScript.fullText);
    utterance.lang = currentScript.targetLangCode;
    utterance.rate = speedRate;
    utterance.pitch = voiceGender === 'male' ? 0.92 : 1.08;

    const matchedVoice = findBestVoice(currentScript.targetLangCode, voiceGender);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    // Track speech progress across segments
    const totalDurationEst = currentScript.segments.reduce((acc, s) => acc + s.durationEst, 0) / speedRate;
    const segmentInterval = (totalDurationEst * 1000) / currentScript.segments.length;

    utterance.onstart = () => {
      setIsPlaying(true);
      setActiveSegmentIndex(0);

      // Advance segment tracker
      let currentSeg = 0;
      const intervalId = window.setInterval(() => {
        currentSeg += 1;
        if (currentSeg < currentScript.segments.length) {
          setActiveSegmentIndex(currentSeg);
        } else {
          window.clearInterval(intervalId);
        }
      }, segmentInterval);
      jingleIntervalRef.current = intervalId;
    };

    utterance.onend = () => {
      stopAllAudio();
    };

    utterance.onerror = () => {
      stopAllAudio();
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(currentScript.fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleLanguageChange = (newLang: PromoAudioLang) => {
    if (isPlaying) {
      stopAllAudio();
    }
    setPromoLang(newLang);
  };

  return (
    <div id="promo-audio-studio" className="max-w-5xl mx-auto px-4 py-4">
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/70 border border-indigo-500/30 shadow-2xl text-start relative overflow-hidden">
        
        {/* Glowing Background Ambience */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Control Bar: Language Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 relative z-10">
          
          {/* Main Title & Live Studio Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
              <Radio className={`w-5 h-5 ${isPlaying ? 'text-indigo-300 animate-pulse' : 'text-indigo-400'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-950 text-indigo-300 border border-indigo-700/60 uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>{isArabicUI ? 'استوديو الصوت الإعلاني الحقيقي' : 'Real Commercial Audio Studio'}</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 hidden sm:inline-block">
                  HD Voice Engine
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-white mt-0.5">
                {isArabicUI ? currentScript.title.ar : currentScript.title.en}
              </h4>
            </div>
          </div>

          {/* Voice Language Selector Tabs (Fusha vs American English vs Sudanese) */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-2xl border border-slate-800">
            <button
              id="promo-voice-fusha-btn"
              onClick={() => handleLanguageChange('ar_fusha')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                promoLang === 'ar_fusha'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇸🇦 العربية الفصحى</span>
            </button>

            <button
              id="promo-voice-us-en-btn"
              onClick={() => handleLanguageChange('en_us')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                promoLang === 'en_us'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇺🇸 American English</span>
            </button>

            <button
              id="promo-voice-sd-btn"
              onClick={() => handleLanguageChange('ar_sudanese')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                promoLang === 'ar_sudanese'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇸🇩 عامية سودانية</span>
            </button>
          </div>

        </div>

        {/* Middle Controls Strip: Voice Characteristics & Playback */}
        <div className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          
          {/* Voice Gender & Pacing Customization */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            
            {/* Gender Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  if (isPlaying) stopAllAudio();
                  setVoiceGender('male');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  voiceGender === 'male' 
                    ? 'bg-slate-800 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{isArabicUI ? 'صوت رجالي إذاعي' : 'Male Voice'}</span>
              </button>

              <button
                onClick={() => {
                  if (isPlaying) stopAllAudio();
                  setVoiceGender('female');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  voiceGender === 'female' 
                    ? 'bg-slate-800 text-purple-400 border border-purple-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{isArabicUI ? 'صوت نسائي احترافي' : 'Female Voice'}</span>
              </button>
            </div>

            {/* Tempo / Energy Rate */}
            <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 px-2 font-medium">
                {isArabicUI ? 'السرعة:' : 'Pace:'}
              </span>
              {[
                { label: '1.0x', val: 1.0 },
                { label: '1.1x', val: 1.1 },
                { label: '1.25x', val: 1.25 }
              ].map(speed => (
                <button
                  key={speed.val}
                  onClick={() => {
                    if (isPlaying) stopAllAudio();
                    setSpeedRate(speed.val);
                  }}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors ${
                    speedRate === speed.val ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {speed.label}
                </button>
              ))}
            </div>

            {/* Acoustic Jingle Toggle */}
            <button
              onClick={() => setEnableJingle(!enableJingle)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                enableJingle 
                  ? 'bg-indigo-950/60 border-indigo-700/60 text-indigo-300' 
                  : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
              title={isArabicUI ? 'تفعيل نغمة البداية الإذاعية' : 'Toggle Radio Intro Jingle'}
            >
              <Music className="w-3.5 h-3.5" />
              <span>{isArabicUI ? 'نغمة إذاعية' : 'Radio Chime'}</span>
            </button>

          </div>

          {/* Master Action Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <button
              id="promo-audio-play-master-btn"
              onClick={handleTogglePlay}
              className={`flex-1 md:flex-initial px-6 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-xl flex items-center justify-center gap-2 ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 animate-pulse'
                  : promoLang === 'en_us'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-indigo-600/30'
                  : promoLang === 'ar_sudanese'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/30'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-slate-950 font-black shadow-emerald-500/30'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>{isArabicUI ? 'إيقاف الصوت الإعلاني' : 'Stop Commercial Audio'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>
                    {promoLang === 'ar_fusha'
                      ? 'استمع للإعلان (بالعربية الفصحى 🇸🇦)'
                      : promoLang === 'en_us'
                      ? 'Play American Commercial (US 🇺🇸)'
                      : 'استمع للإعلان (باللهجة السودانية 🇸🇩)'}
                  </span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700 whitespace-nowrap"
            >
              {showTranscript ? (isArabicUI ? 'إخفاء السكريبت' : 'Hide Script') : (isArabicUI ? 'نص السكريبت' : 'View Script')}
            </button>

            <button
              onClick={handleCopyScript}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title={isArabicUI ? 'نسخ السكريبت الإعلاني' : 'Copy Audio Script'}
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Dynamic Studio Waveform & Live Teleprompter Strip */}
        {isPlaying && (
          <div className="mt-2 pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-indigo-900/40">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-indigo-400 animate-bounce shrink-0" />
              <div className="text-xs text-slate-300 font-medium truncate max-w-md">
                <span className="text-indigo-400 font-bold me-1.5">
                  {isArabicUI ? 'المقطع الحالي:' : 'Current Phrase:'}
                </span>
                <span className="text-white font-bold">
                  "{currentScript.segments[activeSegmentIndex]?.text || currentScript.fullText.slice(0, 60)}..."
                </span>
              </div>
            </div>

            {/* Live Audio Equalizer Bars */}
            <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto">
              {[40, 80, 100, 65, 95, 50, 85, 100, 75, 45, 90, 35, 70, 100, 60, 80].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-blue-500 via-indigo-400 to-purple-400 rounded-full animate-pulse"
                  style={{ height: `${h * 0.22}px`, animationDelay: `${(i % 5) * 0.1}s`, animationDuration: '0.6s' }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Full Script Transcript with synchronized phrases */}
        {showTranscript && (
          <div className="mt-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 space-y-3 leading-relaxed animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[11px] font-bold text-indigo-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5" />
                <span>
                  {isArabicUI ? '📜 السكريبت الإعلاني المعتمد (جاهز للبث والتسجيل):' : '📜 Official Voiceover Script (Broadcast Ready):'}
                </span>
              </span>
              <button 
                onClick={handleCopyScript} 
                className="hover:underline flex items-center gap-1 text-slate-300 transition-colors"
              >
                {isCopied ? (isArabicUI ? 'تم النسخ!' : 'Copied!') : (isArabicUI ? 'نسخ النص بالكامل' : 'Copy Full Text')}
              </button>
            </div>

            {/* Segment by segment transcript with active highlighter */}
            <div className="space-y-2 text-sm leading-loose">
              {currentScript.segments.map((seg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-xl transition-all ${
                    isPlaying && activeSegmentIndex === idx
                      ? 'bg-indigo-950/80 border border-indigo-600/50 text-white font-bold shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span className="text-slate-500 text-xs font-mono me-2">[{idx + 1}]</span>
                  <span>{seg.text}</span>
                </div>
              ))}
            </div>

            {/* Official Slogan Footnote */}
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>
                {promoLang === 'en_us'
                  ? 'Gservia — Tell us what you need, and we will guide you to the right service.'
                  : 'Gservia — أخبرنا بما تحتاج، وسنرشدك إلى الخدمة المناسبة.'}
              </span>
              <span className="text-indigo-400 font-bold">Gservia Global Audio Engine</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
