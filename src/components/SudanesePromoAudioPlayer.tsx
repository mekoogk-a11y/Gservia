import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, Copy, Check, Radio, Mic } from 'lucide-react';

interface SudanesePromoAudioPlayerProps {
  lang: Language;
}

export const SudanesePromoAudioPlayer: React.FC<SudanesePromoAudioPlayerProps> = ({ lang }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const promoScriptArabic = `يا زول يا أصلي! اسمع الكلام السمح ده وركّز معاي كويس! 
تعبت من اللف والدوران والتشتت بين المواقع والخدمات؟ 
الليلة جبنا ليك الإنجاز في يدك مع منصة GServia العالمية! 
أكتر من خمسين خدمة رسمية، وأقوى أدوات الذكاء الاصطناعي، وتكاملات سحابية مباشرة وسريعة زي البرق! 
أمان تام مية في المية، صفر تخزين لكلمات المرور، وسرعة خرافية تفرّق معاك في شغلك وحياتك! 
ما تضيّع دقيقة يا حبيبنا.. ادخل هسي على GServia وانطلق نحو المستقبل!`;

  useEffect(() => {
    // Cleanup speech synthesis on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Visualizer drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 24;
      const barWidth = 3;
      const gap = 3;
      const startX = (canvas.width - (bars * (barWidth + gap))) / 2;

      for (let i = 0; i < bars; i++) {
        let height = 4;
        if (isPlaying) {
          height = Math.max(4, Math.sin(phase + i * 0.4) * 14 + 14 * Math.random() * 0.8);
        }
        const x = startX + i * (barWidth + gap);
        const y = (canvas.height - height) / 2;

        ctx.fillStyle = '#facc15'; // yellow-400
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 2);
        ctx.fill();
      }

      if (isPlaying) {
        phase += 0.2;
      }
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  const handlePlayVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('المتصفح لا يدعم تحويل النص إلى صوت مباشر.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setProgress(0);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(promoScriptArabic);
    
    // Choose Arabic male voice if available
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((v) => v.lang.startsWith('ar') && (v.name.includes('Male') || v.name.includes('Tariq') || v.name.includes('Maged') || v.name.includes('Hamza') || v.name.includes('Naayf'))) 
      || voices.find((v) => v.lang.startsWith('ar'))
      || null;

    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.lang = 'ar-SA';
    utterance.rate = 1.05; // energetic pace
    utterance.pitch = 0.95; // resonant confident radio baritone

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(promoScriptArabic);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-5 start-5 z-40 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="p-3.5 sm:p-4 rounded-3xl bg-[#0e0e0e]/95 backdrop-blur-xl border-2 border-yellow-400/40 shadow-2xl shadow-black/90 text-white max-w-sm">
        
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-black border border-yellow-400/40 text-yellow-400 flex items-center justify-center shrink-0">
              <Radio className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-yellow-300' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white">
                  {lang === 'ar' ? 'صوت إعلاني سوداني حماسي' : 'Sudanese Arabic Promo Audio'}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-yellow-400/20 text-yellow-400 text-[9px] font-black">
                  PROMO
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-bold block">
                {lang === 'ar' ? 'صوت رجل بالعامية السودانية' : 'Energetic Male Voiceover'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-xl bg-black hover:bg-[#1a1a1a] text-neutral-400 hover:text-white border border-[#252525] text-[10px] font-bold"
            >
              {isExpanded ? (lang === 'ar' ? 'إخفاء النص' : 'Hide') : (lang === 'ar' ? 'عرض النص' : 'Script')}
            </button>
          </div>
        </div>

        {/* Visualizer & Play Bar */}
        <div className="mt-3 pt-3 border-t border-[#1f1f1f] flex items-center justify-between gap-3">
          <button
            onClick={handlePlayVoice}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              isPlaying
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/30'
                : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-md shadow-yellow-400/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-black" />
                <span>{lang === 'ar' ? 'إيقاف' : 'Pause'}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>{lang === 'ar' ? 'استمع للإعلان' : 'Play Ad'}</span>
              </>
            )}
          </button>

          {/* Canvas Waveform Visualizer */}
          <div className="flex-1 h-8 bg-black rounded-xl border border-[#222] flex items-center justify-center px-2 overflow-hidden">
            <canvas ref={canvasRef} width={140} height={28} className="w-full h-full" />
          </div>
        </div>

        {/* Expanded Script Viewer */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-[#1f1f1f] space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider">
                {lang === 'ar' ? 'نص السكربت الإعلاني (اللهجة السودانية)' : 'Sudanese Dialect Script'}
              </span>
              <button
                onClick={handleCopyScript}
                className="text-[10px] text-neutral-400 hover:text-white flex items-center gap-1 font-bold"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'نسخ النص' : 'Copy')}</span>
              </button>
            </div>
            <p className="p-2.5 rounded-xl bg-black border border-[#242424] text-[11px] text-neutral-200 leading-relaxed font-medium">
              {promoScriptArabic}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
