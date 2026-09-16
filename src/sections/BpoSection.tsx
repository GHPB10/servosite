import React, { useState } from 'react';
import { BPO_SERVICES, BPO_TIMELINE, COMPANY_INFO } from '../data/content';
import { RoiCalculator } from '../components/RoiCalculator';
import { EditableText } from '../components/EditableText';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Receipt, 
  CheckCheck, 
  FileText, 
  BarChart3, 
  Clock, 
  Lock, 
  Sparkles,
  Building2,
  Mail,
  Phone,
  User,
  AlertCircle
} from 'lucide-react';

interface BpoSectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export function BpoSection({ onOpenConsultation }: BpoSectionProps) {
  // Conversion Form State
  const [formNome, setFormNome] = useState('');
  const [formEmpresa, setFormEmpresa] = useState('');
  const [formFaturamento, setFormFaturamento] = useState('R$ 50 mil a R$ 200 mil');
  const [formEmail, setFormEmail] = useState('');
  const [formWhatsApp, setFormWhatsApp] = useState('');
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Receipt':
        return <Receipt className="w-6 h-6 text-sky-400" />;
      case 'CheckCheck':
        return <CheckCheck className="w-6 h-6 text-sky-400" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-sky-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-sky-400" />;
      default:
        return <Receipt className="w-6 h-6 text-sky-400" />;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSent(true);
    }, 600);
  };

  return (
    <div id="bpo-section" className="space-y-24 sm:space-y-32">
      {/* 1. HERO - FOCO NA DOR DO EMPRESÁRIO */}
      <section className="relative pt-8 sm:pt-14 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <EditableText
                  contentKey="bpo_hero_badge"
                  defaultText="BPO Financeiro Especializado & Governança"
                  className="font-bold text-sky-400"
                />
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                <EditableText
                  contentKey="bpo_hero_title_line1"
                  defaultText="Terceirização completa do seu setor financeiro com "
                  className="text-white font-extrabold"
                />
                {' '}
                <EditableText
                  contentKey="bpo_hero_title_highlight"
                  defaultText="equipe sênior e sistemas integrados."
                  className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400"
                />
              </h1>

              <div className="text-base sm:text-lg text-slate-300 leading-relaxed">
                <EditableText
                  as="p"
                  contentKey="bpo_hero_subtitle"
                  defaultText="A Servo Tech assume a rotina de contas a pagar, contas a receber, faturamento e conciliação bancária diária da sua empresa. Uma equipe especializada opera com precisão e método, enquanto você mantém total controle e autoriza tudo diretamente pelo seu banco."
                  multiline
                  inline={false}
                  className="text-base sm:text-lg text-slate-300 leading-relaxed"
                />
              </div>

              {/* Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                  <Lock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-white">
                      <EditableText contentKey="bpo_badge_lock_title" defaultText="Acesso Bancário Operacional" className="font-bold text-white" />
                    </p>
                    <p className="text-slate-400">
                      <EditableText contentKey="bpo_badge_lock_desc" defaultText="Apenas agendamos. A autorização final é 100% sua." className="text-slate-400" />
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-white">
                      <EditableText contentKey="bpo_badge_clock_title" defaultText="Transição sem Parada" className="font-bold text-white" />
                    </p>
                    <p className="text-slate-400">
                      <EditableText contentKey="bpo_badge_clock_desc" defaultText="Onboarding estruturado em 7 a 14 dias úteis." className="text-slate-400" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="#formulario-conversao"
                  className="px-7 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm tracking-wide shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <EditableText contentKey="bpo_btn_proposta" defaultText="Solicitar Proposta Customizada" className="font-extrabold text-slate-950" />
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#calculadora-roi"
                  className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <EditableText contentKey="bpo_btn_roi" defaultText="Simular Economia (ROI)" className="text-white font-semibold" />
                </a>
              </div>
            </div>

            {/* Right Hero Graphic / Value Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Rotina Diária Terceirizada
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    SLA Ativo
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">Contas a Pagar do Dia</p>
                      <p className="text-[11px] text-slate-400">12 boletos agendados com código de barras</p>
                    </div>
                    <span className="text-sky-400 font-bold">100% Prontos</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">Conciliação Bancária</p>
                      <p className="text-[11px] text-slate-400">Extratos Itaú, BB e Mercado Pago conciliados</p>
                    </div>
                    <span className="text-emerald-400 font-bold">D+1 Auditado</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">Cobrança Preventiva</p>
                      <p className="text-[11px] text-slate-400">Lembretes amigáveis via WhatsApp e e-mail</p>
                    </div>
                    <span className="text-emerald-400 font-bold">Inadimplência -45%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">DRE Gerencial do Mês</p>
                      <p className="text-[11px] text-slate-400">Margem líquida e centros de custo calculados</p>
                    </div>
                    <span className="text-sky-400 font-bold">Em Tempo Real</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-[11px] text-sky-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Você mantém 100% do controle: apenas autoriza as contas pelo seu próprio internet banking com seu token pessoal.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPARAÇÃO DE IMPACTO: TERCEIRIZAÇÃO DA EQUIPE VS. CONTRATAÇÃO CLT UM POR UM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
              <EditableText contentKey="bpo_comp_tag" defaultText="Análise Real de Custo-Benefício" className="font-black" />
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              <EditableText
                contentKey="bpo_comp_title1"
                defaultText="A Economia é "
                className="text-white font-extrabold"
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                <EditableText contentKey="bpo_comp_title_hi" defaultText="Astronômica" className="font-extrabold" />
              </span>
              <EditableText
                contentKey="bpo_comp_title2"
                defaultText=": Por que Terceirizar a Equipe?"
                className="text-white font-extrabold"
              />
            </h2>
            <p className="text-xs sm:text-base text-slate-300">
              <EditableText
                contentKey="bpo_comp_subtitle"
                defaultText="Compare os custos reais de montar um departamento financeiro interno contratando funcionário por funcionário no regime CLT versus terceirizar com a equipe sênior da Servo Tech."
                className="text-slate-300"
                multiline
              />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Box 1: Contratação CLT Um por Um (Custo Pesado) */}
            <div className="lg:col-span-6 bg-slate-950/90 border border-red-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-500/15 text-red-400 text-[10px] font-extrabold px-3 py-1 rounded-bl-xl border-b border-l border-red-500/30 uppercase tracking-wider">
                Alto Risco & Custo Excessivo
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center font-bold">
                    CLT
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Contratar Equipe no CLT (1 por 1)</h3>
                    <p className="text-xs text-slate-400">Contratação interna convencional</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Para cobrir a rotina mínima de contas a pagar, receber, cobrança, conciliação e emissão fiscal, você precisaria de pelo menos 2 a 3 profissionais dedicados:
                </p>

                {/* Linhas de custo CLT */}
                <div className="space-y-2 text-xs border-y border-slate-800 py-3">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>1 Assistente de Contas a Pagar/Receber</span>
                    <span className="font-semibold text-slate-200">R$ 3.200,00</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>1 Analista Financeiro / Tesouraria</span>
                    <span className="font-semibold text-slate-200">R$ 4.800,00</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>1 Faturista / Emissão Fiscal</span>
                    <span className="font-semibold text-slate-200">R$ 3.500,00</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-slate-800/80">
                    <span>Subtotal Salários Brutos:</span>
                    <span className="font-medium">R$ 11.500,00/mês</span>
                  </div>
                  <div className="flex justify-between items-center text-red-400">
                    <span>Encargos Sociais (INSS, FGTS, RAT - aprox. +70%):</span>
                    <span className="font-bold">+ R$ 8.050,00/mês</span>
                  </div>
                  <div className="flex justify-between items-center text-red-400">
                    <span>Benefícios (VR, VT, Plano de Saúde, Cestas):</span>
                    <span className="font-bold">+ R$ 2.400,00/mês</span>
                  </div>
                  <div className="flex justify-between items-center text-red-400">
                    <span>Softwares, Equipamentos & Provisão de Férias/13º:</span>
                    <span className="font-bold">+ R$ 3.100,00/mês</span>
                  </div>
                </div>

                <div className="space-y-2 text-[11px] text-slate-400">
                  <p className="flex items-center gap-1.5 text-red-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    <strong>Férias e Faltas:</strong> Quando o funcionário tira férias ou adoece, o financeiro para ou atrasa.
                  </p>
                  <p className="flex items-center gap-1.5 text-red-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    <strong>Passivo Trabalhista:</strong> Custos de rescisão, multas rescisórias e risco jurídico constante.
                  </p>
                  <p className="flex items-center gap-1.5 text-red-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    <strong>Turnover:</strong> Meses perdidos em recrutamento, seleção e treinamento contínuo.
                  </p>
                </div>
              </div>

              {/* Total CLT */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center bg-red-950/20 p-4 rounded-2xl border border-red-500/20">
                <div>
                  <span className="text-[11px] uppercase font-bold text-red-300 block">Custo Total Real Estimado</span>
                  <span className="text-2xl font-black text-red-400">R$ 25.050,00<span className="text-xs font-normal text-slate-400">/mês</span></span>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span className="block font-medium">No ano:</span>
                  <span className="font-bold text-white text-sm">R$ 300.600,00</span>
                </div>
              </div>
            </div>

            {/* Box 2: Terceirização com Equipe Servo Tech (A Solução Inteligente) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl shadow-emerald-950/30">
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black px-3.5 py-1 rounded-bl-xl uppercase tracking-wider shadow-md">
                Economia Astronômica Garantida
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black">
                    BPO
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Terceirizar com a Equipe Servo Tech</h3>
                    <p className="text-xs text-emerald-400 font-bold">Soluções em Tecnologia & BPO Financeiro</p>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">
                  Por uma fração do custo de um único funcionário, sua empresa tem à disposição um departamento financeiro completo e multidisciplinar, operando diariamente sem interrupções:
                </p>

                {/* Vantagens BPO */}
                <div className="space-y-2.5 text-xs border-y border-slate-800 py-3">
                  <div className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Equipe Multidisciplinar Sênior:</strong> Analistas de contas, tesoureiros e especialistas fiscais dedicados.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Softwares Inclusos:</strong> Acesso integral ao Odvix ERP e Servo CRM sem cobrança extra de licenças.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Zero Encargos e Zero Passivo:</strong> Nota fiscal de prestação de serviços (100% dedutível no IR do Lucro Real/Presumido).</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Operação Ininterrupta:</strong> Sem pausas para férias, atestados ou substituição. Sua empresa nunca fica sem financeiro.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Governança Segura:</strong> Não somos banco. Nós agendamos os pagamentos com conferência e você aprova em segundos no seu token.</span>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-300">
                  <p className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Mais de 70% a 80% de Redução Direta de Custos
                  </p>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Sua empresa ganha velocidade, relatórios estratégicos quinzenais e economiza centenas de milhares de reais que podem ser reinvestidos em vendas e expansão.
                  </p>
                </div>
              </div>

              {/* Total BPO & Botão */}
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
                <div className="flex justify-between items-center bg-slate-900/90 p-4 rounded-2xl border border-emerald-500/30">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-emerald-400 block">Mensalidade Fixa Previsível</span>
                    <span className="text-2xl font-black text-white">A partir de R$ 2.490<span className="text-xs font-normal text-slate-400">/mês</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Economia Anual Líquida</span>
                    <span className="text-base font-black text-emerald-400">+ R$ 250.000/ano</span>
                  </div>
                </div>

                <a
                  href="#formulario-conversao"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs tracking-wide shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Quero Terceirizar e Economizar Agora</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. O QUE FAZEMOS (4 PILARES DE SERVIÇOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <EditableText contentKey="bpo_scope_badge" defaultText="Escopo de Atuação Completo" className="text-sky-400 font-bold" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            <EditableText contentKey="bpo_scope_title" defaultText="O que fazemos pelo seu negócio" className="text-white font-extrabold" />
          </h2>
          <p className="text-xs sm:text-base text-slate-400">
            <EditableText
              contentKey="bpo_scope_subtitle"
              defaultText="Assumimos todas as tarefas repetitivas e técnicas do seu setor financeiro com precisão milimétrica."
              className="text-slate-400"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BPO_SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 hover:border-sky-500/40 p-7 rounded-3xl flex flex-col justify-between transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                  {getServiceIcon(srv.icon)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  <EditableText contentKey={`bpo_srv_${idx}_title`} defaultText={srv.title} className="text-white font-bold" />
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  <EditableText contentKey={`bpo_srv_${idx}_desc`} defaultText={srv.description} className="text-slate-300" multiline />
                </p>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-xl text-xs flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Impacto direto: <EditableText contentKey={`bpo_srv_${idx}_impact`} defaultText={srv.impact} className="text-emerald-400 font-medium" /></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. COMO FUNCIONA (LINHA DO TEMPO PASSO A PASSO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            <EditableText contentKey="bpo_steps_badge" defaultText="Metodologia Testada" className="text-sky-400 font-bold" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            <EditableText contentKey="bpo_steps_title" defaultText="Como Funciona a Transição para a Servo Tech" className="text-white font-extrabold" />
          </h2>
          <p className="text-xs sm:text-base text-slate-400">
            <EditableText
              contentKey="bpo_steps_subtitle"
              defaultText="Processo ágil e seguro em 4 etapas estruturadas para não gerar atrito na sua operação."
              className="text-slate-400"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BPO_TIMELINE.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative flex flex-col justify-between group hover:border-sky-500/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-sky-400 font-mono">{t.step}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    <EditableText contentKey={`bpo_step_${idx}_dur`} defaultText={t.duration} className="text-slate-300" />
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  <EditableText contentKey={`bpo_step_${idx}_title`} defaultText={t.title} className="text-white font-bold" />
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  <EditableText contentKey={`bpo_step_${idx}_desc`} defaultText={t.description} className="text-slate-300" multiline />
                </p>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-slate-400">Entregáveis:</p>
                {t.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-sky-400" />
                    <span><EditableText contentKey={`bpo_step_${idx}_del_${dIdx}`} defaultText={item} className="text-slate-300" /></span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CALCULADORA DE ROI */}
      <section id="calculadora-roi" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RoiCalculator onOpenConsultation={onOpenConsultation} />
      </section>

      {/* 5. FORMULÁRIO DE CONVERSÃO DIRETA */}
      <section id="formulario-conversao" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-white">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              <EditableText contentKey="bpo_form_tag" defaultText="Proposta Comercial Imediata" className="text-sky-400 font-bold" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              <EditableText contentKey="bpo_form_title" defaultText="Solicite uma Proposta Customizada de BPO" className="text-white font-extrabold" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              <EditableText
                contentKey="bpo_form_subtitle"
                defaultText="Preencha os dados abaixo e entraremos em contato com um plano desenhado para as necessidades do seu CNPJ."
                className="text-slate-400"
              />
            </p>
          </div>

          {formSent ? (
            <div className="bg-slate-800/80 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Proposta Solicitada com Sucesso!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Obrigado, <span className="text-sky-400 font-semibold">{formNome}</span>. Nosso time já está analisando o perfil da sua empresa (<span className="text-white">{formEmpresa}</span>) e enviará o diagnóstico no WhatsApp informado.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Ol%C3%A1%21%20Enviei%20a%20solicita%C3%A7%C3%A3o%20de%20BPO%20pelo%20site%20para%20a%20empresa%20${encodeURIComponent(formEmpresa)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                >
                  <span>Chamar Agora no WhatsApp Direto</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-sky-400" />
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formNome}
                    onChange={(e) => setFormNome(e.target.value)}
                    placeholder="Ex: Roberto Almeida"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-sky-400" />
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    required
                    value={formEmpresa}
                    onChange={(e) => setFormEmpresa(e.target.value)}
                    placeholder="Ex: Comercial Sul Distribuidora"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    E-mail Corporativo
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="contato@empresa.com.br"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-sky-400" />
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formWhatsApp}
                    onChange={(e) => setFormWhatsApp(e.target.value)}
                    placeholder="(11) 98765-4321"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Faturamento Médio Mensal
                  </label>
                  <select
                    value={formFaturamento}
                    onChange={(e) => setFormFaturamento(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Até R$ 50 mil">Até R$ 50 mil /mês</option>
                    <option value="R$ 50 mil a R$ 200 mil">R$ 50 mil a R$ 200 mil /mês</option>
                    <option value="R$ 200 mil a R$ 500 mil">R$ 200 mil a R$ 500 mil /mês</option>
                    <option value="R$ 500 mil a R$ 2 milhões">R$ 500 mil a R$ 2M /mês</option>
                    <option value="Acima de R$ 2 milhões">Acima de R$ 2M /mês</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm tracking-wide shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isSubmitting ? (
                    <span>Enviando dados com segurança...</span>
                  ) : (
                    <>
                      <span>Receber Proposta de BPO Customizada</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  Sigilo bancário e LGPD garantidos
                </span>
                <span>•</span>
                <span>Sem multas de fidelidade abusivas</span>
                <span>•</span>
                <span>Atendimento nacional</span>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
