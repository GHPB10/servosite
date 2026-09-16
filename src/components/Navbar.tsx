import { useState, useEffect } from 'react';
import { PageId } from '../types';
import { BrandingConfig } from '../types/branding';
import { NAV_ITEMS, COMPANY_INFO } from '../data/content';
import { 
  Menu, 
  X, 
  ArrowRight,
  Headphones,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  MessageSquare
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (topic?: string) => void;
  branding?: BrandingConfig;
}

export function Navbar({ 
  currentPage, 
  onNavigate, 
  onOpenConsultation,
  branding
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-xl shadow-slate-950/40 border-b border-slate-800'
          : 'bg-slate-950/90 backdrop-blur-sm border-b border-slate-800/80'
      }`}
    >
      {/* 1. INSTITUTIONAL TOP BAR (DESKTOP) */}
      <div className="hidden lg:block border-b border-slate-800/60 bg-slate-950/90 text-slate-400 text-[11px] py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left info */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <strong className="text-slate-300 font-medium">Atendimento Nacional</strong> • Curitiba/PR para todo o Brasil
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>{COMPANY_INFO.hours}</span>
            </span>
          </div>

          {/* Right contacts & socials */}
          <div className="flex items-center gap-4">
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20Servo%20Tech.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: {COMPANY_INFO.whatsappDisplay}</span>
            </a>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <a
                href={COMPANY_INFO.social?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors"
                title="Instagram"
                aria-label="Instagram Servo Tech"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_INFO.social?.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
                title="Facebook"
                aria-label="Facebook Servo Tech"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_INFO.social?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors"
                title="LinkedIn"
                aria-label="LinkedIn Servo Tech"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Symmetrical Left: Brand Logo & Tagline */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none shrink-0"
          >
            {branding?.logoType === 'image' && branding?.logoImageUrl ? (
              <div className="flex items-center gap-3">
                <img 
                  src={branding.logoImageUrl} 
                  alt={branding.brandNamePrefix ? `${branding.brandNamePrefix} ${branding.brandNameSuffix || ''}` : 'Logo'} 
                  className="h-10 max-h-11 max-w-[200px] object-contain group-hover:scale-105 transition-transform shrink-0" 
                />
                {branding.brandSubtitle && (
                  <span className="hidden sm:inline-block text-[10px] text-slate-400 font-semibold tracking-wider uppercase whitespace-nowrap">
                    {branding.brandSubtitle}
                  </span>
                )}
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
                  {branding?.logoImageUrl ? (
                    <img src={branding.logoImageUrl} alt="Ícone da Marca" className="w-full h-full object-cover" />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-current stroke-2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-xl font-black tracking-tight text-white group-hover:text-sky-400 transition-colors leading-none whitespace-nowrap">
                    {branding?.brandNamePrefix || 'SERVO'}
                    <span className="text-sky-400">{branding?.brandNameSuffix !== undefined ? branding.brandNameSuffix : 'TECH'}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase whitespace-nowrap mt-1 leading-none">
                    {branding?.brandSubtitle || COMPANY_INFO.subtitle}
                  </span>
                </div>
              </>
            )}
          </button>

          {/* Symmetrical Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 border border-slate-800 p-1 rounded-xl shadow-inner">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-sky-500 text-slate-950 font-extrabold shadow-sm shadow-sky-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Symmetrical Right: Action CTA & Phone Link */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              id="header-phone-link"
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20Servo%20Tech.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-900 transition-colors whitespace-nowrap"
              title="Fale no WhatsApp"
            >
              <Headphones className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{COMPANY_INFO.phone}</span>
            </a>

            <button
              id="header-specialist-cta"
              onClick={() => onOpenConsultation('Diagnóstico Financeiro Gratuito')}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs tracking-wide shadow-md shadow-sky-500/20 hover:shadow-sky-400/30 transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer"
            >
              <span>Fale com um Especialista</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <button
              id="mobile-specialist-cta-top"
              onClick={() => onOpenConsultation('Diagnóstico Rápido')}
              className="px-3 py-1.5 rounded-lg bg-sky-500 text-slate-950 font-bold text-xs whitespace-nowrap"
            >
              Diagnóstico
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 focus:outline-none shrink-0"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in duration-200">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                    isActive
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>

          {/* Contact and social bar on mobile */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Redes Oficiais:</span>
            <div className="flex items-center gap-2">
              <a
                href={COMPANY_INFO.social?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-pink-400"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.social?.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-blue-400"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.social?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-sky-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <button
              id="mobile-menu-specialist-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation('Diagnóstico Financeiro');
              }}
              className="w-full py-3 rounded-xl bg-sky-500 text-slate-950 font-bold text-sm text-center shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
            >
              <span>Falar com Especialista</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              id="mobile-menu-whatsapp-btn"
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20Servo%20Tech.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 text-xs text-center flex items-center justify-center gap-2 font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chamar no WhatsApp ({COMPANY_INFO.whatsappDisplay})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

