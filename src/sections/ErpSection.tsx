import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  Layers,
  BarChart3,
  Receipt,
  Boxes,
  Clock,
  Smartphone,
  Check,
  Building2,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { EditableText } from '../components/EditableText';
import { COMPANY_INFO } from '../data/content';

interface ErpSectionProps {
  onOpenConsultation: (topic?: string) => void;
}

const ODVIX_LOGO_URL = 'https://www.odvix.com.br/img/logo-odvix-nova-branca-2.png';
const SCREEN_DESKTOP_URL = 'https://www.odvix.com.br/img/print-tela-odvix.png';
const SCREEN_TABLET_URL = 'https://www.odvix.com.br/img/mockup-odvix-tablet.png';
const SCREEN_MOBILE_URL = 'https://www.odvix.com.br/img/print-odvix-dashboard-mobile.png';

export function ErpSection({ onOpenConsultation }: ErpSectionProps) {
  const scrollToPricing = () => {
    const el = document.getElementById('planos-odvix');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="erp-section" className="space-y-20 sm:space-y-28">
      {/* 1. HERO - LANDING PAGE ODVIX ERP */}
      <section className="relative pt-6 sm:pt-10 pb-8 overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* System Logo & Badge */}
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
                <img 
                  src={ODVIX_LOGO_URL} 
                  alt="Odvix ERP Logo" 
                  referrerPolicy="no-referrer"
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sistema de Gestão Empresarial 100% em Nuvem</span>
              </div>
            </div>

            {/* High-Impact Headline with Core Keywords */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Gestão inteligente,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400">
                emissão fiscal rápida
              </span>{' '}
              e controle total.
            </h1>

            {/* Concise Pitch */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              O <strong className="text-white font-semibold">Odvix ERP</strong> integra vendas, emissão de NF-e/NFS-e/NFC-e, controle de estoque e fluxo de caixa em uma plataforma rápida, intuitiva e sem complexidade.
            </p>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                id="hero-erp-demo-cta"
                onClick={() => onOpenConsultation('Demonstração Gratuita Odvix ERP')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm tracking-wide shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <span>Solicitar Demonstração Gratuita</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-erp-pricing-cta"
                onClick={scrollToPricing}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Conhecer Planos e Preços</span>
              </button>
            </div>

            {/* Fast Guarantees Pill Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Implantação ágil e sem complicações
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                Certificado Digital A1 Integrado
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                Suporte humanizado via WhatsApp
              </span>
            </div>
          </div>

          {/* MAIN SCREEN HERO MOCKUP */}
          <div className="mt-12 sm:mt-16 max-w-5xl mx-auto relative group">
            {/* Ambient Lighting */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/30 via-blue-600/20 to-sky-400/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

            <div className="bg-slate-900/90 rounded-2xl sm:rounded-3xl border border-slate-700/80 p-2 sm:p-4 shadow-2xl overflow-hidden backdrop-blur-sm">
              {/* Window Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 mb-2 sm:mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] font-mono text-slate-400 hidden sm:inline-block">
                    app.odvix.com.br/dashboard
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Sistema Ativo • 100% em Nuvem
                  </span>
                </div>
              </div>

              {/* Real Desktop Screenshot */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950">
                <img 
                  src={SCREEN_DESKTOP_URL} 
                  alt="Interface do Odvix ERP - Gestão e Faturamento" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-xl shadow-inner transform transition-transform duration-500 hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REPUTATION & QUICK HIGHLIGHTS GRID (4 PILARES DIRETOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-3.5">
              <Receipt className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Emissão Fiscal Completa</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              NF-e, NFS-e e NFC-e com cálculo automático de impostos, envio para contador e SEFAZ em 1 clique.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3.5">
              <Boxes className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Estoque & Compras</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Entrada por XML em lote, ponto de reposição, controle de custos e estoque sincronizado em tempo real.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3.5">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Financeiro & Fluxo de Caixa</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Contas a pagar/receber, conciliação bancária, boletos registrados e DRE gerencial automatizado.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3.5">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Acesso em Qualquer Dispositivo</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% web. Acesse pelo notebook, tablet ou smartphone sem precisar instalar servidores pesados.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE VISUAL COM AS TELAS REAIS DO SOFTWARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Bloco 1: Gestão Operacional & Tablet Mockup */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>Agilidade Comercial</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Controle de Vendas, Orçamentos e Pedidos em Segundos
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Padronize o atendimento aos clientes com criação ágil de propostas, envio automático por WhatsApp e conversão de pedidos em notas fiscais com um único clique.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-200">Emissão de orçamentos personalizados e tabela de preços dinâmica</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-200">Baixa automática no estoque e lançamento direto no contas a receber</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-200">Histórico completo de compras e consumo por cliente</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => onOpenConsultation('Demonstração Módulo de Vendas Odvix')}
                  className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-sky-500/20 inline-flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Ver na Prática</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl max-w-lg w-full">
                <img 
                  src={SCREEN_TABLET_URL} 
                  alt="Odvix ERP no Tablet - Mobilidade Total" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain transform transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bloco 2: Indicadores Gerenciais & Dashboard Mobile */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl max-w-md w-full">
                <img 
                  src={SCREEN_MOBILE_URL} 
                  alt="Dashboard Mobile e Indicadores Odvix ERP" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain transform transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Gestão Baseada em Dados</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Painel com Indicadores Financeiros e Operacionais em Tempo Real
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Tome decisões baseadas em números reais. Acompanhe faturamento diário, produtos mais vendidos, lucratividade por venda e fluxo de caixa projetado direto no seu painel.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-200">Demonstrativo de Resultados do Exercício (DRE) em poucos cliques</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-200">Gráficos de vendas por canal, vendedor e categoria de produto</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-200">Exportação rápida para PDF e planilhas Excel</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => onOpenConsultation('Demonstração de Relatórios Odvix ERP')}
                  className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-sky-500/20 inline-flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Experimentar Relatórios</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BLOCO DE PLANOS DO SOFTWARE (PLAN MÊS) */}
      <section id="planos-odvix" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* Header no estilo do print anexado */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-wider uppercase">
              PLAN MÊS
            </h2>
            <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
          </div>
          <div className="w-16 h-1 bg-sky-400 rounded-full mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-slate-400">
            Escolha o plano ideal para a escala do seu negócio. Sem fidelidade forçada e com suporte garantido.
          </p>
        </div>

        {/* 3 Cards de Planos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* 1. PLANO BASIC */}
          <div className="rounded-3xl bg-[#dbe8fd] text-slate-900 p-7 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:translate-y-[-4px] border border-blue-200">
            <div className="space-y-4">
              <div className="text-center pb-2">
                <h3 className="text-2xl font-black text-slate-950">Basic</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-center min-h-[72px] flex items-center justify-center">
                Ideal para Empresas Iniciantes com obrigações e processos simples, ideal para MEI que faturam até 15 mil por mês.
              </p>
              
              <div className="text-center pt-3 pb-1">
                <div className="inline-block px-6 py-2.5 rounded-2xl bg-[#abc6fc]/60 border border-blue-300">
                  <span className="text-2xl sm:text-3xl font-black text-slate-950">R$ 189,99</span>
                  <span className="text-[11px] font-bold text-slate-700 block">/ mês</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <ul className="text-xs text-slate-800 space-y-2 pb-2">
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-blue-700 shrink-0" />
                  Emissão de Notas Fiscais
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-blue-700 shrink-0" />
                  Controle Básico de Estoque & Caixa
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-blue-700 shrink-0" />
                  Suporte Técnico Incluso
                </li>
              </ul>

              <button
                id="plan-basic-btn"
                onClick={() => onOpenConsultation('Contratação Plano Odvix ERP - Basic (R$ 189,99/mês)')}
                className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs tracking-wide shadow-md transition-all cursor-pointer text-center block"
              >
                Contratar Basic
              </button>
            </div>
          </div>

          {/* 2. PLANO PRO (RECOMENDADO) - DESTAQUE */}
          <div className="rounded-3xl bg-[#98bafc] text-slate-950 p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative transition-all duration-300 hover:translate-y-[-4px] border-2 border-blue-400 ring-4 ring-sky-400/20">
            {/* Badge de Recomendado */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-950 text-sky-400 text-[10px] font-black uppercase tracking-wider shadow-lg border border-sky-400/30">
              Mais Escolhido
            </div>

            <div className="space-y-4">
              <div className="text-center pb-2 pt-1">
                <h3 className="text-2xl font-black text-slate-950">Pro (Recomendado)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-center font-medium min-h-[72px] flex items-center justify-center">
                Ideal para Empresas que já necessitam de um nível maior de organização pois faturam mais de 20 mil e já tem obrigações financeiras maiores.
              </p>
              
              <div className="text-center pt-3 pb-1">
                <div className="inline-block px-6 py-2.5 rounded-2xl bg-[#7ba6fb]/60 border border-blue-400">
                  <span className="text-2xl sm:text-3xl font-black text-slate-950">R$ 299,99</span>
                  <span className="text-[11px] font-black text-slate-800 block">/ mês</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <ul className="text-xs text-slate-900 space-y-2 pb-2">
                <li className="flex items-center gap-2 font-bold">
                  <Check className="w-4 h-4 text-slate-950 shrink-0" />
                  Emissão NF-e, NFS-e e NFC-e Ilimitada
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <Check className="w-4 h-4 text-slate-950 shrink-0" />
                  Gestão Financeira Completa + DRE
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <Check className="w-4 h-4 text-slate-950 shrink-0" />
                  Multi-usuários com controle de permissão
                </li>
              </ul>

              <button
                id="plan-pro-btn"
                onClick={() => onOpenConsultation('Contratação Plano Odvix ERP - Pro Recomendado (R$ 299,99/mês)')}
                className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-sky-400 font-extrabold text-xs tracking-wide shadow-xl transition-all cursor-pointer text-center block"
              >
                Começar com o Pro
              </button>
            </div>
          </div>

          {/* 3. PLANO BUSINESS */}
          <div className="rounded-3xl bg-[#4d7ef7] text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:translate-y-[-4px] border border-blue-500">
            <div className="space-y-4">
              <div className="text-center pb-2">
                <h3 className="text-2xl font-black text-white">Business</h3>
              </div>
              <p className="text-xs sm:text-sm text-blue-50 leading-relaxed text-center min-h-[72px] flex items-center justify-center">
                Se você está em um jogo diferente e precisa de uma personalização ainda maior para sua empresa, vamos personaliza-lo para você.
              </p>
              
              <div className="text-center pt-3 pb-1">
                <div className="inline-block px-6 py-2.5 rounded-2xl bg-white text-slate-950 shadow-md">
                  <span className="text-xl sm:text-2xl font-black">Sob Consulta</span>
                  <span className="text-[11px] font-bold text-slate-600 block">Personalizado</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <ul className="text-xs text-blue-100 space-y-2 pb-2">
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  Parametrizações avançadas e integrações
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  Treinamento VIP para toda a equipe
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  Gerente de conta dedicado
                </li>
              </ul>

              <button
                id="plan-business-btn"
                onClick={() => onOpenConsultation('Consultoria Plano Odvix ERP - Business Personalizado')}
                className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs tracking-wide shadow-md transition-all cursor-pointer text-center block"
              >
                Falar com Especialista
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER FINAL DE CONVERSÃO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/60 to-slate-900 border border-sky-500/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demonstração ao Vivo Sem Compromisso</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pronto para transformar a gestão da sua empresa?
            </h3>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Agende uma demonstração ao vivo de 20 minutos com um especialista e veja como o Odvix ERP resolve sua rotina em poucos cliques.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                id="bottom-banner-demo-btn"
                onClick={() => onOpenConsultation('Demonstração Odvix ERP ao Vivo')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm tracking-wide shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Solicitar Demonstração do Odvix ERP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="bottom-banner-whatsapp-link"
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20os%20planos%20do%20Odvix%20ERP.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Tirar Dúvidas no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
