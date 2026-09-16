import { useState, useRef, useEffect } from 'react';
import { PageId } from '../types';
import { HERO_STATS } from '../data/content';
import { BannerItem } from '../types/banner';
import { BannerSlider } from '../components/BannerSlider';
import { EditableText } from '../components/EditableText';
import { 
  ArrowRight, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  BarChart3, 
  Users, 
  CheckCircle2,
  Handshake,
  Briefcase,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (topic?: string) => void;
  banners: BannerItem[];
}

export function HomeSection({ 
  onNavigate, 
  onOpenConsultation, 
  banners
}: HomeSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <div id="home-section" className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 pb-10 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-sky-500/30 shadow-lg shadow-sky-500/10">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <EditableText
                contentKey="home_hero_badge"
                defaultText="Soluções em Tecnologia & BPO Financeiro"
                className="text-xs font-bold not-italic text-sky-300 tracking-wide uppercase"
              />
            </div>

            {/* Impact Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              <EditableText
                contentKey="home_hero_title_line1"
                defaultText="BPO Financeiro Especializado & "
                className="text-white"
              />
              {' '}
              <EditableText
                contentKey="home_hero_title_highlight"
                defaultText="Softwares de Gestão"
                className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400"
              />
            </h1>

            {/* Direct Subtitle */}
            <div className="max-w-2xl mx-auto">
              <EditableText
                as="p"
                contentKey="home_hero_subtitle"
                defaultText="A Servo Tech assume a rotina operacional do seu financeiro (contas a pagar, receber e conciliação bancária) e fornece sistemas integrados de gestão (Odvix ERP e Servo CRM). Obtenha governança profissional e economize até 70% em relação aos custos de contratação CLT."
                multiline
                inline={false}
                className="text-sm sm:text-base text-slate-300 leading-relaxed"
              />
            </div>

            {/* Two Main CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="hero-cta-bpo"
                onClick={() => onNavigate('bpo')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs tracking-wide shadow-xl shadow-sky-500/25 hover:shadow-sky-400/35 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <EditableText
                  contentKey="home_hero_cta_bpo"
                  defaultText="Conhecer BPO Financeiro"
                  className="font-extrabold text-slate-950"
                />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-softwares"
                onClick={() => onNavigate('erp')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-sky-400" />
                <EditableText
                  contentKey="home_hero_cta_softwares"
                  defaultText="Explorar Softwares (ERP & CRM)"
                  className="text-white font-bold"
                />
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <EditableText
                  contentKey="home_hero_badge_guarantee1"
                  defaultText="Você autoriza tudo no seu banco (100% seguro)"
                  className="text-slate-300"
                />
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <EditableText
                  contentKey="home_hero_badge_guarantee2"
                  defaultText="Zero risco trabalhista (sem encargos CLT)"
                  className="text-slate-300"
                />
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Users className="w-4 h-4 text-sky-400 shrink-0" />
                <EditableText
                  contentKey="home_hero_badge_guarantee3"
                  defaultText="Implantação rápida em 14 dias"
                  className="text-slate-300"
                />
              </span>
            </div>
          </div>

          {/* Dynamic Banners / Video Slider Stage */}
          <div className="mt-10 sm:mt-14">
            <BannerSlider 
              banners={banners} 
              onOpenConsultation={onOpenConsultation}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </section>

      {/* 2. PROVA SOCIAL / NÚMEROS (CONTADORES ANIMADOS) */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {HERO_STATS.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
                <p className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300">
                  <EditableText
                    contentKey={`home_stat_value_${idx}`}
                    defaultText={stat.value}
                    className="font-black"
                  />
                </p>
                <p className="text-xs sm:text-sm font-bold text-white mt-1">
                  <EditableText
                    contentKey={`home_stat_label_${idx}`}
                    defaultText={stat.label}
                    className="text-white font-bold"
                  />
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  <EditableText
                    contentKey={`home_stat_sublabel_${idx}`}
                    defaultText={stat.sublabel}
                    className="text-slate-400"
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VITRINE DE SOLUÇÕES (BPO, ERP, CRM) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <EditableText
              contentKey="home_solutions_badge"
              defaultText="Ecossistema Completo"
              className="text-sky-400 font-bold"
            />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            <EditableText
              contentKey="home_solutions_title"
              defaultText="Nossas Soluções Especializadas"
              className="text-white"
            />
          </h2>
          <p className="text-xs sm:text-base text-slate-400">
            <EditableText
              contentKey="home_solutions_desc"
              defaultText="Contrate o BPO com operação sênior, utilize nossos softwares ou integre todo o ecossistema na sua operação."
              className="text-slate-400"
            />
          </p>
        </div>

        {/* Carousel Header & Navigation Arrows */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>Deslize ou clique nas setas para navegar entre as 4 soluções</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Solução anterior"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 hover:border-sky-500 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-all cursor-pointer shadow-lg shadow-black/40"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Próxima solução"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 hover:border-sky-500 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-all cursor-pointer shadow-lg shadow-black/40"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container com as 4 Soluções Lado a Lado */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-6 pt-3 px-1 snap-x snap-mandatory"
        >
          {/* Card 1: BPO Financeiro */}
          <div className="bg-gradient-to-b from-slate-800/80 to-slate-900 border-2 border-sky-500/60 rounded-3xl p-7 relative shadow-xl shadow-sky-500/10 flex flex-col justify-between w-[300px] sm:w-[350px] lg:w-[380px] shrink-0 snap-start">
            <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-sky-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              <EditableText contentKey="home_card_bpo_tag" defaultText="Carro-Chefe" className="font-black text-slate-950" />
            </span>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
                <EditableText contentKey="home_card_bpo_category" defaultText="Serviço Especializado" className="text-sky-400 font-bold" />
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">
                <EditableText contentKey="home_card_bpo_title" defaultText="BPO Financeiro" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                <EditableText
                  contentKey="home_card_bpo_desc"
                  defaultText="Terceirização completa das contas a pagar, receber, conciliação bancária diária, emissão de NFs e geração de DRE gerencial com consultor dedicado."
                  className="text-slate-300"
                  multiline
                />
              </p>

              <div className="space-y-2 text-xs text-slate-300 mb-8 border-t border-slate-700/60 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <EditableText contentKey="home_card_bpo_b1" defaultText="Contas a pagar e receber 100% em dia" className="text-slate-300" />
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <EditableText contentKey="home_card_bpo_b2" defaultText="Conciliação bancária auditada todas as manhãs" className="text-slate-300" />
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <EditableText contentKey="home_card_bpo_b3" defaultText="Economia de até 60% vs. setor interno" className="text-slate-300" />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('bpo')}
              className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <EditableText contentKey="home_card_bpo_btn" defaultText="Ver Detalhes do BPO Financeiro" className="font-bold text-slate-950" />
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Odvix ERP */}
          <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-7 flex flex-col justify-between transition-all w-[300px] sm:w-[350px] lg:w-[380px] shrink-0 snap-start">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                <EditableText contentKey="home_card_erp_category" defaultText="Software de Gestão" className="text-indigo-400 font-bold" />
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">
                <EditableText contentKey="home_card_erp_title" defaultText="Odvix ERP" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                <EditableText
                  contentKey="home_card_erp_desc"
                  defaultText="O coração operacional da sua empresa. Controle de estoque, faturamento de notas (NF-e/NFS-e), fluxo de caixa e relatórios em tempo real sem complexidade."
                  className="text-slate-300"
                  multiline
                />
              </p>

              <div className="space-y-2 text-xs text-slate-300 mb-8 border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <EditableText contentKey="home_card_erp_b1" defaultText="Emissão fiscal autorizada SEFAZ em 8 segundos" className="text-slate-300" />
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <EditableText contentKey="home_card_erp_b2" defaultText="Inventário, múltiplos depósitos e ponto de pedido" className="text-slate-300" />
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <EditableText contentKey="home_card_erp_b3" defaultText="100% em nuvem com suporte humanizado" className="text-slate-300" />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('erp')}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <EditableText contentKey="home_card_erp_btn" defaultText="Conhecer Odvix ERP" className="text-white font-bold" />
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Servo CRM */}
          <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-7 flex flex-col justify-between transition-all w-[300px] sm:w-[350px] lg:w-[380px] shrink-0 snap-start">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                <EditableText contentKey="home_card_crm_category" defaultText="Software Comercial" className="text-emerald-400 font-bold" />
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">
                <EditableText contentKey="home_card_crm_title" defaultText="Servo CRM" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                <EditableText
                  contentKey="home_card_crm_desc"
                  defaultText="Funil de vendas visual estilo Kanban, histórico de contatos por WhatsApp, métricas de conversão da equipe e sincronização com o faturamento do ERP."
                  className="text-slate-300"
                  multiline
                />
              </p>

              <div className="space-y-2 text-xs text-slate-300 mb-8 border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <EditableText contentKey="home_card_crm_b1" defaultText="Funil de vendas visual personalizável" className="text-slate-300" />
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <EditableText contentKey="home_card_crm_b2" defaultText="Histórico de mensagens e follow-up ativo" className="text-slate-300" />
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <EditableText contentKey="home_card_crm_b3" defaultText="Métricas de taxa de conversão por vendedor" className="text-slate-300" />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('crm')}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <EditableText contentKey="home_card_crm_btn" defaultText="Explorar Servo CRM" className="text-white font-bold" />
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 4: Parceria Contábil (Mesmo formato dos outros!) */}
          <div className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-3xl p-7 flex flex-col justify-between transition-all w-[300px] sm:w-[350px] lg:w-[380px] shrink-0 snap-start relative">
            <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              <EditableText contentKey="home_card_parceria_tag" defaultText="Custo Zero" className="font-black text-slate-950" />
            </span>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Handshake className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                <EditableText contentKey="home_card_parceria_category" defaultText="Programa Partner" className="text-amber-400 font-bold" />
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">
                <EditableText contentKey="home_card_parceria_title" defaultText="Parceria Contábil" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                <EditableText
                  contentKey="home_card_parceria_desc"
                  defaultText="Elimine o gargalo de informações desorganizadas dos clientes. Parceria com apoio completo no Odvix ERP, parametrização fiscal e suporte contínuo para escalar seu escritório."
                  className="text-slate-300"
                  multiline
                />
              </p>

              <div className="space-y-2 text-xs text-slate-300 mb-8 border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <EditableText contentKey="home_card_parceria_b1" defaultText="100% gratuito para o escritório contábil" className="text-slate-300" />
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <EditableText contentKey="home_card_parceria_b2" defaultText="Suporte humano e treinamento por Meet" className="text-slate-300" />
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <EditableText contentKey="home_card_parceria_b3" defaultText="SPED fiscal maleável e emissão sem travas" className="text-slate-300" />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('parceria')}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <EditableText contentKey="home_card_parceria_btn" defaultText="Conhecer Programa de Parceria" className="text-white font-bold" />
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
