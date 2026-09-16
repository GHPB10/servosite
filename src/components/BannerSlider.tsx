import React, { useState, useEffect, useRef } from 'react';
import { BannerItem } from '../types/banner';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface BannerSliderProps {
  banners: BannerItem[];
  onOpenConsultation?: (topic?: string) => void;
  onNavigate?: (page: any) => void;
}

export function BannerSlider({ banners, onOpenConsultation, onNavigate }: BannerSliderProps) {
  const activeBanners = banners.filter(b => b.active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);

  // Garante que o index está válido se banners mudarem
  useEffect(() => {
    if (currentIndex >= activeBanners.length) {
      setCurrentIndex(0);
    }
  }, [activeBanners.length, currentIndex]);

  const currentBanner = activeBanners[currentIndex];

  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused || !currentBanner) {
      return;
    }

    const duration = (currentBanner.durationSeconds || 5) * 1000;
    const intervalStep = 50; // update a cada 50ms
    let elapsed = 0;
    setProgress(0);

    progressIntervalRef.current = setInterval(() => {
      elapsed += intervalStep;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
    }, intervalStep);

    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
      setProgress(0);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPaused, activeBanners.length, currentBanner?.durationSeconds]);

  if (activeBanners.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    setProgress(0);
  };

  const handleActionClick = (banner: BannerItem) => {
    if (banner.linkUrl) {
      if (banner.linkUrl.startsWith('#')) {
        const target = banner.linkUrl.replace('#', '');
        if (target === 'bpo' || target === 'erp' || target === 'crm' || target === 'sobre' || target === 'contato') {
          if (onNavigate) onNavigate(target);
          return;
        }
        if (onOpenConsultation) {
          onOpenConsultation(banner.title || 'BPO Financeiro');
          return;
        }
      } else if (banner.linkUrl.startsWith('http')) {
        window.open(banner.linkUrl, '_blank');
        return;
      }
    }
    if (onOpenConsultation) {
      onOpenConsultation(banner.title || 'BPO Financeiro');
    }
  };

  return (
    <div 
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-950 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner Stage */}
      <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] overflow-hidden flex items-center">
        {activeBanners.map((banner, idx) => {
          const isActive = idx === currentIndex;

          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Media Element (Image or Video) */}
              {banner.type === 'video' ? (
                <div className="absolute inset-0 w-full h-full bg-slate-950">
                  <video
                    src={banner.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <img
                  src={banner.url}
                  alt={banner.title || 'Banner Servo Tech'}
                  className="w-full h-full object-cover transform scale-105 transition-transform duration-1000 ease-out"
                />
              )}

              {/* High-End Dark Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />

              {/* Banner Text / CTA Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14 max-w-3xl">
                {banner.title && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3 w-fit backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Destaque Servo Tech</span>
                  </div>
                )}

                {banner.title && (
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-md">
                    {banner.title}
                  </h3>
                )}

                {banner.subtitle && (
                  <p className="mt-3 text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl drop-shadow-sm font-medium">
                    {banner.subtitle}
                  </p>
                )}

                {/* Banner CTA Button */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleActionClick(banner)}
                    className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide shadow-xl shadow-sky-500/25 transition-all flex items-center gap-2 cursor-pointer group/btn"
                  >
                    <span>{banner.buttonText || 'Saiba Mais'}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>Slide {idx + 1} de {activeBanners.length}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls (Arrows) */}
      {activeBanners.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Slide anterior"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-sky-500 hover:text-slate-950 text-white border border-slate-700/80 flex items-center justify-center transition-all shadow-lg backdrop-blur-md cursor-pointer opacity-70 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Próximo slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-sky-500 hover:text-slate-950 text-white border border-slate-700/80 flex items-center justify-center transition-all shadow-lg backdrop-blur-md cursor-pointer opacity-70 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Bottom Bar: Progress Indicator & Dots */}
      {activeBanners.length > 1 && (
        <div className="absolute bottom-4 right-4 sm:right-8 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="text-slate-400 hover:text-white transition-colors mr-1 cursor-pointer"
            title={isPaused ? 'Continuar reprodução automática' : 'Pausar reprodução'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-sky-400" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center gap-1.5">
            {activeBanners.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setCurrentIndex(i);
                  setProgress(0);
                }}
                className={`relative h-2 rounded-full transition-all cursor-pointer overflow-hidden ${
                  i === currentIndex ? 'w-8 bg-slate-700' : 'w-2 bg-slate-600 hover:bg-slate-500'
                }`}
                title={`Ir para o slide ${i + 1}`}
              >
                {i === currentIndex && (
                  <div 
                    className="absolute top-0 left-0 bottom-0 bg-sky-400 rounded-full transition-all ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
