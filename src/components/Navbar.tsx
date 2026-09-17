import { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import { BrandingConfig } from '../types/branding';
import { COMPANY_INFO } from '../data/content';
import { ServoTechLogoIcon } from './ServoTechLogoIcon';
import { ServoTechLogo } from './ServoTechLogo';
import { 
  Menu, 
  X, 
  ArrowRight,
  Headphones,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  MessageSquare,
  ChevronDown,
  Database,
  Users,
  DollarSign,
  Sparkles,
  Check
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (topic?: string) => void;
  branding?: BrandingConfig;
}

const SOLUTIONS_ITEMS: {
  id: PageId;
  label: string;
  tag: string;
  description: string;
  icon: typeof Database;
  badge: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    id: 'erp',
    label: 'Odvix ERP',
    tag: 'Sistema de Gestão Integrada',
    description: 'ERP completo para emissão fiscal, estoque, compras e financeiro.',
    icon: Database,
    badge: 'ERP',
    iconBg: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'crm',
    label: 'Servo CRM',
    tag: 'Funil Comercial & Vendas',
    description: 'Gestão visual de leads, oportunidades e histórico de negociações.',
    icon: Users,
    badge: 'CRM',
    iconBg: 'bg-blue-500/10 border-blue-500/25 text-blue-400 group-hover:bg-blue-500 group-hover:text-slate-950',
    iconColor: 'text-blue-400',
  },
  {
    id: 'bpo',
    label: 'BPO Financeiro',
    tag: 'Terceirização Financeira',
    description: 'Conciliação diária, contas a pagar/receber e DRE em tempo real.',
    icon: DollarSign,
    badge: 'Gestão',
    iconBg: 'bg-sky-500/10 border-sky-500/25 text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950',
    iconColor: 'text-sky-400',
  },
];

export function Navbar({ 
  currentPage, 
  onNavigate, 
  onOpenConsultation,
  branding
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(true);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    setSolutionsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnterSolutions = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setSolutionsDropdownOpen(true);
  };

  const handleMouseLeaveSolutions = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setSolutionsDropdownOpen(false);
    }, 150);
  };

  const isSolutionsActive = ['erp', 'crm', 'bpo'].includes(currentPage);
  const activeSolution = SOLUTIONS_ITEMS.find(s => s.id === currentPage);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end">
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
        <div className="flex items-center justify-between min-h-[4rem] sm:min-h-[4.5rem] py-1">
          {/* Symmetrical Left: Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group cursor-pointer focus:outline-none shrink-0 py-0.5"
          >
            {branding?.logoType === 'image' && branding?.logoImageUrl ? (
              <img 
                src={branding.logoImageUrl} 
                alt={branding.brandNamePrefix ? `${branding.brandNamePrefix} ${branding.brandNameSuffix || ''}` : 'Logo'} 
                style={{
                  height: `${(branding.logoHeightNavbar || 54) * (branding.logoScale || 1.4)}px`,
                  maxHeight: '88px'
                }}
                className="w-auto max-w-[280px] sm:max-w-[340px] object-contain group-hover:scale-105 transition-all duration-200 shrink-0" 
              />
            ) : (
              <ServoTechLogo className="h-10 sm:h-12 md:h-14 w-auto max-w-[240px] sm:max-w-[280px] group-hover:opacity-95 group-hover:scale-105 transition-all" />
            )}
          </button>

          {/* Symmetrical Center: Navigation Links with Grouped Solutions Dropdown */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 border border-slate-800 p-1 rounded-xl shadow-inner">
            {/* Início */}
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                currentPage === 'home'
                  ? 'bg-sky-500 text-slate-950 font-extrabold shadow-sm shadow-sky-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Início
            </button>

            {/* Soluções Dropdown Menu */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnterSolutions}
              onMouseLeave={handleMouseLeaveSolutions}
            >
              <button
                id="nav-link-solutions-trigger"
                onClick={() => setSolutionsDropdownOpen(prev => !prev)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                  isSolutionsActive
                    ? 'bg-sky-500 text-slate-950 font-extrabold shadow-sm shadow-sky-500/30'
                    : solutionsDropdownOpen
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                aria-expanded={solutionsDropdownOpen}
                aria-haspopup="true"
              >
                <span>Soluções</span>
                {isSolutionsActive && activeSolution && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                    isSolutionsActive ? 'bg-slate-950/20 text-slate-950' : 'bg-sky-500/20 text-sky-400'
                  }`}>
                    {activeSolution.badge}
                  </span>
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Floating Panel */}
              <div 
                className={`absolute top-full left-0 pt-2 w-80 sm:w-[340px] transition-all duration-200 z-50 ${
                  solutionsDropdownOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible' 
                    : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                }`}
              >
                <div className="bg-slate-900/98 backdrop-blur-xl border border-slate-700/90 rounded-2xl p-2.5 shadow-2xl shadow-slate-950/90 ring-1 ring-white/10">
                  <div className="px-3 py-1.5 mb-1.5 flex items-center justify-between border-b border-slate-800/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-sky-400" />
                      Ecossistema de Soluções
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">3 Soluções</span>
                  </div>

                  <div className="space-y-1">
                    {SOLUTIONS_ITEMS.map((item) => {
                      const isItemActive = currentPage === item.id;
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.id}
                          id={`nav-solution-${item.id}`}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 text-left cursor-pointer ${
                            isItemActive
                              ? 'bg-sky-500/15 border border-sky-500/30 text-white'
                              : 'hover:bg-slate-800/90 border border-transparent text-slate-300 hover:text-white'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-150 ${item.iconBg}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className={`text-xs font-bold transition-colors ${
                                isItemActive ? 'text-sky-400' : 'text-white group-hover:text-sky-400'
                              }`}>
                                {item.label}
                              </span>
                              {isItemActive && (
                                <span className="flex items-center gap-1 text-[10px] text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                                  <Check className="w-3 h-3" />
                                  Ativo
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-snug mt-0.5 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 px-2 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSolutionsDropdownOpen(false);
                        onOpenConsultation('Comparativo de Soluções');
                      }}
                      className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Precisa de ajuda para escolher?</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Parceria */}
            <button
              id="nav-link-parceria"
              onClick={() => handleNavClick('parceria')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                currentPage === 'parceria'
                  ? 'bg-sky-500 text-slate-950 font-extrabold shadow-sm shadow-sky-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Parceria
            </button>

            {/* Sobre Nós */}
            <button
              id="nav-link-sobre"
              onClick={() => handleNavClick('sobre')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                currentPage === 'sobre'
                  ? 'bg-sky-500 text-slate-950 font-extrabold shadow-sm shadow-sky-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Sobre Nós
            </button>

            {/* Contato */}
            <button
              id="nav-link-contato"
              onClick={() => handleNavClick('contato')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                currentPage === 'contato'
                  ? 'bg-sky-500 text-slate-950 font-extrabold shadow-sm shadow-sky-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Contato
            </button>
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
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {/* Início */}
            <button
              id="mobile-nav-home"
              onClick={() => handleNavClick('home')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                currentPage === 'home'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>Início</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </button>

            {/* Soluções Accordion on Mobile */}
            <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 overflow-hidden">
              <button
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={isSolutionsActive ? 'text-sky-400 font-bold' : 'text-slate-200'}>
                    Soluções
                  </span>
                  {isSolutionsActive && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 font-bold">
                      {activeSolution?.badge}
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileSolutionsOpen && (
                <div className="px-2 pb-2 space-y-1">
                  {SOLUTIONS_ITEMS.map((item) => {
                    const isItemActive = currentPage === item.id;
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        id={`mobile-solution-${item.id}`}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs transition-colors ${
                          isItemActive
                            ? 'bg-sky-500 text-slate-950 font-bold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isItemActive ? 'bg-slate-950/20 text-slate-950' : item.iconBg
                        }`}>
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold block">{item.label}</span>
                          <span className={`text-[10px] block truncate ${isItemActive ? 'text-slate-900/80' : 'text-slate-400'}`}>
                            {item.tag}
                          </span>
                        </div>
                        {isItemActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Parceria */}
            <button
              id="mobile-nav-parceria"
              onClick={() => handleNavClick('parceria')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                currentPage === 'parceria'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>Parceria</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </button>

            {/* Sobre Nós */}
            <button
              id="mobile-nav-sobre"
              onClick={() => handleNavClick('sobre')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                currentPage === 'sobre'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>Sobre Nós</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </button>

            {/* Contato */}
            <button
              id="mobile-nav-contato"
              onClick={() => handleNavClick('contato')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                currentPage === 'contato'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>Contato</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </button>
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
