import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles, Mic, Radio, Share2, Check } from 'lucide-react';
import { Language } from '../types';

interface SudanesePromoAudioPlayerProps {
  lang: Language;
}

export const SudanesePromoAudioPlayer: React.FC<SudanesePromoAudioPlayerProps> = ({ lang }) => {
  const isArabic = lang === 'ar';
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [activeSegment, setActiveSegment] = useState<number>(0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const adScript = [
    { text: "يا مرحب بيك في Gservia! المنصة العالمية الذكية والدليل والمرشد الأول لكل الخدمات الإلكترونية!", time: 0 },
    { text: "داير تعمل متجر إلكتروني بي سلة ولا شوبيفاي؟ داير تصمم لوقو وشعار احترافي بكانفا وفيجما؟", time: 4 },
    { text: "داير تحول قروش دولياً بأرخص سعر صرف عبر وايز وسترايب؟ ولا داير مساعد ذكاء اصطناعي ينجز ليك شغلك وبرمجتك؟", time: 8 },
    { text: "Gservia ما مجرد موقع روابط.. Gservia بيفهم طلبك بالعامية والفصحى، ويرشدك لأحسن خدمة تناسب ميزانيتك ومستواك!", time: 13 },
    { text: "ويقارن ليك بين الخدمات، ويوريك كيف تبدأ خطوة بخطوة!", time: 18 },
    { text: "يلا اكتب طلبك هسي واستكشف مع Gservia!", time: 21 },
  ];

  const fullText = "يا مرحب بيك في Gservia! المنصة العالمية الذكية والدليل والمرشد الأول لكل الخدمات الإلكترونية! داير تعمل متجر إلكتروني؟ داير تصمم شعار احترافي؟ داير تحول قروش دولياً بأحسن سعر صرف؟ ولا داير مساعد ذكاء اصطناعي ينجز شغلك؟ Gservia ما مجرد موقع روابط! Gservia بيفهم طلبك، ويرشدك لأحسن خدمة تناسب ميزانيتك ومستواك، ويقارن ليك بين الخدمات ويوريك كيف تبدأ خطوة بخطوة! يلا ادخل واكتشف مع Gservia!";

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (!('speechSynthesis' in window)) {
      alert('المتصفح لا يدعم تشغيل الصوت التفاعلي.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'ar-SA'; // Arabic base
    utterance.rate = 1.05; // Energetic pacing
    utterance.pitch = 0.95; // Deep male voice resonance

    // Pick best Arabic male voice if available
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.includes('ar') || v.name.toLowerCase().includes('arabic') || v.name.toLowerCase().includes('maged') || v.name.toLowerCase().includes('tariq'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setActiveSegment(0);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-blue-950/60 border border-amber-500/30 shadow-xl text-start">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Badge & Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  🇸🇩 الإعلان الصوتي الحماسي (بالعامية السودانية)
                </span>
                <span className="text-xs text-slate-400 font-bold">صوت رجالي إذاعي</span>
              </div>
              <h4 className="text-sm font-black text-white">
                صوت إعلاني ترويجي لمنصة Gservia
              </h4>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={handleTogglePlay}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2 ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 animate-pulse'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/30'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>إيقاف الصوت</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>استماع للإعلان الحماسي</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors border border-slate-700"
            >
              {showTranscript ? 'إخفاء النص' : 'نص الإعلان'}
            </button>

            <button
              onClick={handleCopyScript}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="نسخ نص الإعلان"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dynamic Visualizer Bar */}
        {isPlaying && (
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
            <span className="text-xs text-amber-400 font-bold flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span>جارٍ تشغيل الصوت الإعلاني الحماسي...</span>
            </span>
            <div className="flex items-center gap-1">
              {[40, 75, 100, 60, 90, 45, 80, 100, 70, 50, 85, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-amber-500 to-orange-400 rounded-full animate-pulse"
                  style={{ height: `${h * 0.25}px`, animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Full Script Transcript View */}
        {showTranscript && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 space-y-2 leading-relaxed animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-400 border-b border-slate-800 pb-1.5">
              <span>📜 السكريبت الإعلاني الكامل (اللهجة السودانية الدارجة الحماسية):</span>
              <button onClick={handleCopyScript} className="hover:underline flex items-center gap-1 text-slate-300">
                {isCopied ? 'تم النسخ!' : 'نسخ النص'}
              </button>
            </div>
            <p className="font-medium text-slate-200 text-sm leading-loose">
              «يا مرحب بيك في <strong className="text-blue-400">Gservia</strong>! المنصة العالمية الذكية والدليل والمرشد الأول لكل الخدمات الإلكترونية في العالم! 
              <br />
              داير تعمل <strong>متجر إلكتروني</strong>؟ داير تصمم <strong>شعار احترافي وبوستات</strong>؟ داير تحول <strong>قروش دولياً</strong> بأرخص سعر صرف وبدون وجع راس؟ ولا داير مساعد <strong>ذكاء اصطناعي</strong> ينجز ليك شغلك وبرمجتك؟
              <br />
              <strong className="text-blue-400">Gservia</strong> ما بديك روابط وخلاص! Gservia بيفهم طلبك، ويرشدك لأحسن خدمة تناسب ميزانيتك ومستواك، ويقارن ليك بين الخدمات، ويوريك كيف تبدأ خطوة بخطوة!
              <br />
              يلا ادخل واكتشف عالم الخدمات الرقمية مع <strong className="text-blue-400">Gservia</strong>!»
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
