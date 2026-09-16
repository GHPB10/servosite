import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { EditableText } from '../components/EditableText';
import { recordLeadToSheet, sendLeadViaWebhook, getActiveWebhookUrl, DEFAULT_SPREADSHEET_ID } from '../services/googleSheets';
import { getAccessToken } from '../services/googleAuth';
import { 
  User,
  Users, 
  Handshake, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  FileSpreadsheet, 
  TrendingUp, 
  HeartHandshake, 
  AlertTriangle, 
  Layers, 
  Monitor, 
  Smartphone, 
  Receipt, 
  Cpu, 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
  Phone, 
  Mail, 
  Send,
  Building2,
  Check,
  Zap,
  DollarSign,
  Briefcase
} from 'lucide-react';

interface ParceriaSectionProps {
  onOpenConsultation: (topic?: string) => void;
  spreadsheetId?: string;
  sheetTabName?: string;
  webhookUrl?: string;
}

export function ParceriaSection({
  onOpenConsultation,
  spreadsheetId = DEFAULT_SPREADSHEET_ID,
  sheetTabName = 'site',
  webhookUrl = ''
}: ParceriaSectionProps) {
  // Form state (Padrão de Contato com segmentação Parceria Contábil)
  const [nome, setNome] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [assunto, setAssunto] = useState('Parceria Contábil');
  const [mensagem, setMensagem] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sheetSaved, setSheetSaved] = useState(false);

  // Accordion FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      nome,
      empresa,
      email,
      telefone,
      solucaoOuAssunto: assunto,
      mensagemOuFaturamento: mensagem || 'Interesse no Programa Partner Contábil (Odvix ERP)',
      origem: 'Parceria Contábil' as const
    };

    try {
      const activeWebhook = getActiveWebhookUrl(webhookUrl);
      if (activeWebhook) {
        await sendLeadViaWebhook(activeWebhook, leadData);
        setSheetSaved(true);
      } else {
        const token = await getAccessToken();
        if (token && spreadsheetId) {
          await recordLeadToSheet(token, spreadsheetId, leadData, sheetTabName || 'site');
          setSheetSaved(true);
        }
      }
    } catch (err) {
      console.warn('Erro ao salvar no Google Sheets:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const partnershipFaq = [
    {
      q: 'Preciso pagar algo para ser parceiro?',
      a: 'Não, a parceria com a Servo Tech é 100% gratuita para o escritório contábil. Nosso objetivo é construir uma relação de ganho mútuo, onde sua equipe ganha agilidade e seu cliente ganha gestão de excelência.'
    },
    {
      q: 'Como é feita a comunicação entre o escritório, cliente e Servo Tech?',
      a: 'Tudo é centralizado em um grupo dedicado de WhatsApp com o contador responsável, os gestores do cliente e os especialistas da Servo Tech. Dessa forma, todos os envolvidos têm alinhamento em tempo real, sem ruídos.'
    },
    {
      q: 'Como funcionam as etapas de implementação e treinamento?',
      a: 'A parametrização e implantação do sistema e rotinas são realizadas 100% pela nossa equipe técnica. O treinamento é realizado ao vivo por videoconferência (Google Meet) gravada, até que o cliente atinja autonomia total.'
    },
    {
      q: 'O que o escritório contábil ganha ao indicar clientes no Odvix ERP?',
      a: 'Você ganha dados contábeis e fiscais 100% organizados, com SPED fiscal adaptado e emissão sem falhas, sem perder horas cobrando extratos ou corrigindo erros. Além de fidelizar o cliente, seu escritório foca em consultoria estratégica de alto valor.'
    },
    {
      q: 'Como funciona o apoio e suporte técnico para os clientes indicados?',
      a: 'Nossa equipe assume 100% da implantação, parametrização de regras fiscais e treinamento do cliente por videoconferência (Google Meet). O suporte contínuo é 100% humano e ágil via WhatsApp, garantindo que o escritório contábil não precise perder tempo resolvendo dúvidas operacionais de software.'
    }
  ];

  return (
    <div id="parceria-section" className="space-y-20 sm:space-y-28">
      {/* 1. HERO CONTÁBIL */}
      <section className="relative pt-6 sm:pt-12 pb-12 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-gradient-to-tr from-sky-500/15 via-blue-600/10 to-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Col */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <EditableText
                  contentKey="parceria_hero_badge"
                  defaultText="Partner Contábil • Servo Tech"
                  className="text-sky-400 font-bold"
                />
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                <EditableText
                  contentKey="parceria_hero_title_p1"
                  defaultText="Partner "
                  className="text-white font-black"
                />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">
                  <EditableText
                    contentKey="parceria_hero_title_hi"
                    defaultText="Contábil"
                    className="font-black"
                  />
                </span>
              </h1>

              <div className="max-w-2xl mx-auto lg:mx-0">
                <EditableText
                  as="p"
                  contentKey="parceria_hero_lead"
                  defaultText="Plano estratégico desenvolvido exclusivamente para você e seu escritório. Não somos apenas prestadores de serviço: somos o seu braço direito de crescimento."
                  className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
                  multiline
                  inline={false}
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed border-l-2 border-sky-500/60 pl-3">
                <EditableText
                  contentKey="parceria_hero_sub"
                  defaultText="A parceria estratégica que une tecnologia de ponta (Odvix ERP) e apoio consultivo de implantação para organizar a emissão e o financeiro dos seus clientes, escalando seu escritório contábil."
                  className="text-slate-400"
                  multiline
                />
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#formulario-parceria"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Handshake className="w-4 h-4" />
                  <EditableText
                    contentKey="parceria_hero_btn_primary"
                    defaultText="Quero ser um Parceiro Contábil"
                    className="text-slate-950 font-bold"
                  />
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Ol%C3%A1%2C%20sou%20contador%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20programa%20Partner%20Cont%C3%A1bil%20da%20Servo%20Tech.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Falar no WhatsApp ({COMPANY_INFO.whatsappDisplay})</span>
                </a>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Gratuito</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Suporte Humano</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Treinamento Incluso</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>SPED & Reforma 100%</span>
                </div>
              </div>
            </div>

            {/* Right Col: Visual Card from PDF Slide 1 & 2 */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-sky-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-sky-500/10 backdrop-blur-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Programa Partner</h4>
                      <p className="text-[11px] text-sky-400">Escritórios & Contadores</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
                    Custo Zero
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Mais Clientes, Menos Esforço</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Clientes com financeiro e notas em dia exigem 80% menos tempo do seu time contábil.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Apoio Completo com Odvix ERP</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Seu cliente ganha a ferramenta certa, parametrização fiscal e suporte contínuo para nunca mais atrasar dados.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Grupo Conjunto no WhatsApp</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Canal direto entre contador, cliente e equipe Servo Tech para alinhamento contínuo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenConsultation('Parceria Contábil')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Agendar Reunião Explicativa</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. A DOR DO ESCRITÓRIO CONTÁBIL (Slide 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-red-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle red accent ambient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <EditableText
                contentKey="parceria_dor_badge"
                defaultText="O Diagnóstico da Rotina"
                className="text-red-400 font-bold"
              />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              <EditableText
                contentKey="parceria_dor_title"
                defaultText="A Dor do Escritório Contábil"
                className="text-white font-extrabold"
              />
            </h2>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              <EditableText
                contentKey="parceria_dor_subtitle"
                defaultText="Sabemos que o maior gargalo na rotina do seu escritório é receber informações desorganizadas e incompletas dos clientes."
                className="text-slate-300"
                multiline
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dor 1 */}
            <div className="bg-slate-800/60 border border-slate-700/80 hover:border-red-500/40 rounded-2xl p-6 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                <ArrowRight className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                <EditableText
                  contentKey="parceria_dor_1_title"
                  defaultText="Sua equipe perde horas consolidando dados falhos."
                  className="text-white font-bold"
                />
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                <EditableText
                  contentKey="parceria_dor_1_desc"
                  defaultText="Extratos bancários que não batem, comprovantes faltantes e notas fiscais emitidas de forma incorreta geram retrabalho desgastante e improdutivo."
                  className="text-slate-400"
                  multiline
                />
              </p>
            </div>

            {/* Dor 2 */}
            <div className="bg-slate-800/60 border border-slate-700/80 hover:border-red-500/40 rounded-2xl p-6 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                <ArrowRight className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                <EditableText
                  contentKey="parceria_dor_2_title"
                  defaultText="O fechamento do mês vira um período de estresse."
                  className="text-white font-bold"
                />
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                <EditableText
                  contentKey="parceria_dor_2_desc"
                  defaultText="O dia a dia vira um incêndio constante nos primeiros dias úteis do mês, correndo contra o relógio para apurar tributos e evitar multas."
                  className="text-slate-400"
                  multiline
                />
              </p>
            </div>

            {/* Dor 3 */}
            <div className="bg-slate-800/60 border border-slate-700/80 hover:border-red-500/40 rounded-2xl p-6 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                <ArrowRight className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                <EditableText
                  contentKey="parceria_dor_3_title"
                  defaultText="O escritório perde a oportunidade de focar em consultoria estratégica."
                  className="text-white font-bold"
                />
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                <EditableText
                  contentKey="parceria_dor_3_desc"
                  defaultText="Em vez de aconselhar o cliente com inteligência tributária e faturamento, o contador vira mero digitador e cobrador de documentos pendentes."
                  className="text-slate-400"
                  multiline
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARCERIA: COMO FUNCIONA? (Slide 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
            <Handshake className="w-3.5 h-3.5" />
            <EditableText
              contentKey="parceria_funciona_badge"
              defaultText="Vantagens Exclusivas"
              className="text-sky-400 font-bold"
            />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            <EditableText
              contentKey="parceria_funciona_title"
              defaultText="Parceria: Como Funciona?"
              className="text-white font-extrabold"
            />
          </h2>

          <p className="text-xs sm:text-base text-slate-400">
            <EditableText
              contentKey="parceria_funciona_sub"
              defaultText="Desenvolvemos uma estrutura onde o escritório contábil colhe os frutos de uma operação organizada sem nenhum custo."
              className="text-slate-400"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pilar 1 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl relative group transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 font-black text-xl flex items-center justify-center border border-sky-500/30">
              1
            </div>
            <h3 className="text-xl font-bold text-white">
              <EditableText contentKey="parceria_pil_1_title" defaultText="Custo Zero" className="text-white font-bold" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <EditableText
                contentKey="parceria_pil_1_desc"
                defaultText="A parceria com a Servo Tech é 100% gratuita para o escritório contábil. Nosso foco é gerar valor mútuo e facilitar a sua rotina com eficiência e tecnologia."
                className="text-slate-300"
                multiline
              />
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-sky-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sem adesão, mensalidade ou taxas</span>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl relative group transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 font-black text-xl flex items-center justify-center border border-blue-500/30">
              2
            </div>
            <h3 className="text-xl font-bold text-white">
              <EditableText contentKey="parceria_pil_2_title" defaultText="Escalabilidade" className="text-white font-bold" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <EditableText
                contentKey="parceria_pil_2_desc"
                defaultText="Com clientes organizados, sua equipe gasta menos tempo em digitação e correção, podendo absorver mais clientes sem precisar inchar o quadro de colaboradores."
                className="text-slate-300"
                multiline
              />
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-blue-400">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>Aumento de margem e capacidade</span>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl relative group transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 font-black text-xl flex items-center justify-center border border-indigo-500/30">
              3
            </div>
            <h3 className="text-xl font-bold text-white">
              <EditableText contentKey="parceria_pil_3_title" defaultText="Retenção de Clientes" className="text-white font-bold" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <EditableText
                contentKey="parceria_pil_3_desc"
                defaultText="Ao indicar uma solução que realmente resolve o problema de gestão da empresa, você fortalece o vínculo e a confiança do seu cliente no seu escritório."
                className="text-slate-300"
                multiline
              />
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-indigo-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Maior fidelidade e NPS do cliente</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MÉTODO: FLUXO DE TRABALHO ÁGIL (Slide 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <EditableText contentKey="parceria_metodo_badge" defaultText="Fluxo de Trabalho Ágil" className="text-sky-400 font-bold" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              <EditableText contentKey="parceria_metodo_title" defaultText="Nosso Método de Atuação" className="text-white font-extrabold" />
            </h2>

            <p className="text-xs sm:text-base text-slate-400">
              <EditableText
                contentKey="parceria_metodo_sub"
                defaultText="Acompanhamos cada cliente indicado com um processo passo a passo para garantir adesão completa."
                className="text-slate-400"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: Análise */}
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 space-y-3 relative hover:border-sky-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Etapa 01</span>
                <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                  01
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                <EditableText contentKey="parceria_step_1_title" defaultText="Análise:" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="parceria_step_1_desc"
                  defaultText="Identificamos gargalos e pontos de atenção na rotina da empresa do cliente."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>

            {/* Step 2: Solução */}
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 space-y-3 relative hover:border-sky-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Etapa 02</span>
                <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                  02
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                <EditableText contentKey="parceria_step_2_title" defaultText="Solução:" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="parceria_step_2_desc"
                  defaultText="Apresentamos uma solução que resolva os problemas analisados com máxima objetividade."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>

            {/* Step 3: Implementação */}
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 space-y-3 relative hover:border-sky-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Etapa 03</span>
                <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                  03
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                <EditableText contentKey="parceria_step_3_title" defaultText="Implementação:" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="parceria_step_3_desc"
                  defaultText="Implementamos, adaptamos e personalizamos de acordo com a necessidade específica da empresa."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>

            {/* Step 4: Treinamento */}
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 space-y-3 relative hover:border-sky-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Etapa 04</span>
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  04
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                <EditableText contentKey="parceria_step_4_title" defaultText="Treinamento:" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="parceria_step_4_desc"
                  defaultText="Treinamos o cliente até ele ter autonomia total de trabalhar da maneira correta."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONHEÇA NOSSO SISTEMA: ODVIX ERP (Slides 6 a 10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
            <Monitor className="w-3.5 h-3.5" />
            <EditableText contentKey="parceria_erp_badge" defaultText="Tecnologia Homologada" className="text-sky-400 font-bold" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            <EditableText contentKey="parceria_erp_title_p1" defaultText="Conheça nosso sistema: " className="text-white font-extrabold" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
              <EditableText contentKey="parceria_erp_title_hi" defaultText="ODVIX ERP" className="font-extrabold" />
            </span>
          </h2>

          <p className="text-xs sm:text-base text-slate-400">
            <EditableText
              contentKey="parceria_erp_subtitle"
              defaultText="Plataforma de Crescimento Empresarial completa: web, tablet e mobile com emissão fiscal e relatórios precisos."
              className="text-slate-400"
            />
          </p>
        </div>

        {/* 4 Cards da Plataforma de Crescimento (Slide 10) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Módulo 1 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center border border-sky-500/25">
                <Receipt className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                <EditableText contentKey="parceria_mod_1_title" defaultText="Emissor de Nota Fiscal" className="text-white font-bold" />
              </h3>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-sky-300">
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">NF-e</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">NFC-e</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">NFS-e</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">MDF-e</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="parceria_mod_1_desc"
                  defaultText="Emita e envie suas notas fiscais em poucos cliques, com cálculo de tributos automatizado."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>
            <button
              onClick={() => onOpenConsultation('Demonstração Emissor de Notas - Odvix ERP')}
              className="w-full py-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border border-sky-500/30 text-xs font-bold transition-all"
            >
              Solicitar Demonstração
            </button>
          </div>

          {/* Módulo 2 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center border border-blue-500/25">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                <EditableText contentKey="parceria_mod_2_title" defaultText="Gestão Empresarial" className="text-white font-bold" />
              </h3>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-blue-300">
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Gestão Completa</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Personalizada</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="parceria_mod_2_desc"
                  defaultText="A gestão da sua empresa mais dinâmica e organizada em um único local centralizado."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>
            <button
              onClick={() => onOpenConsultation('Demonstração Gestão Empresarial - Odvix ERP')}
              className="w-full py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 text-xs font-bold transition-all"
            >
              Solicitar Demonstração
            </button>
          </div>

          {/* Módulo 3 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/25">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                <EditableText contentKey="parceria_mod_3_title" defaultText="Controle Financeiro" className="text-white font-bold" />
              </h3>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-emerald-300">
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Plano Pessoal</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Empresarial</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="parceria_mod_3_desc"
                  defaultText="O controle financeiro ideal para o que você precisa: fluxo de caixa, conciliação e relatórios."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>
            <button
              onClick={() => onOpenConsultation('Demonstração Controle Financeiro - Odvix ERP')}
              className="w-full py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
            >
              Solicitar Demonstração
            </button>
          </div>

          {/* Módulo 4 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/25">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                <EditableText contentKey="parceria_mod_4_title" defaultText="PDV (Frente de Caixa)" className="text-white font-bold" />
              </h3>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-purple-300">
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Windows</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Mobile</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Web</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="parceria_mod_4_desc"
                  defaultText="Operacionalize as vendas do seu varejo com alta velocidade, integração de estoque e TEF."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>
            <button
              onClick={() => onOpenConsultation('Demonstração PDV Frente de Caixa - Odvix ERP')}
              className="w-full py-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-400 border border-purple-500/30 text-xs font-bold transition-all"
            >
              Solicitar Demonstração
            </button>
          </div>
        </div>
      </section>

      {/* 6. POR QUE INDICAR O NOSSO SISTEMA? (Slides 11, 12 e 13) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <EditableText contentKey="parceria_indicar_badge" defaultText="Garantia de Qualidade" className="text-sky-400 font-bold" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              <EditableText
                contentKey="parceria_indicar_title"
                defaultText="Por que indicar o nosso Sistema?"
                className="text-white font-extrabold"
              />
            </h2>

            <p className="text-xs sm:text-base text-slate-400">
              <EditableText
                contentKey="parceria_indicar_sub"
                defaultText="Projetado especificamente para que contadores e empresários falem exatamente a mesma língua."
                className="text-slate-400"
              />
            </p>
          </div>

          {/* 4 Pilares do Slide 12 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">
                <EditableText contentKey="parceria_ind_1_title" defaultText="Suporte 100% Humano" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="parceria_ind_1_desc"
                  defaultText="Sem robôs frustrantes. Nossa equipe é totalmente acessível, próxima e altamente capacitada para tirar qualquer dúvida."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">
                <EditableText contentKey="parceria_ind_2_title" defaultText="Totalmente Adaptável" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="parceria_ind_2_desc"
                  defaultText="Nenhum negócio é igual ao outro. Nosso sistema se molda à realidade operacional de cada empresa sem complexidade desnecessária."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">
                <EditableText contentKey="parceria_ind_3_title" defaultText="SPED Fiscal Maleável" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="parceria_ind_3_desc"
                  defaultText="Entendemos a sua linguagem e garantimos que a geração de arquivos fiscais atenda às exigências sem travar o cliente."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">
                <EditableText contentKey="parceria_ind_4_title" defaultText="Reforma Tributária" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="parceria_ind_4_desc"
                  defaultText="Sistema totalmente preparado e adaptado para as novas regras de transição tributária (IBS, CBS e simplificação)."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>
          </div>

          {/* Checklist dos Diferenciais do Sistema (Slide 13) */}
          <div className="pt-6 border-t border-slate-800">
            <h4 className="text-base font-bold text-white text-center mb-6">
              <EditableText contentKey="parceria_check_title" defaultText="Diferenciais do Sistema (Checklist Exclusivo)" className="text-white font-bold" />
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                'SPED Fiscal Adaptado',
                'Multi-empresa (Multi-CNPJ)',
                'Todos os setores na mesma tela',
                'Dashboard Detalhado',
                'Personalizável para o Ramo',
                'Suporte 100% Humano'
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center gap-2 text-xs font-semibold text-sky-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. DÚVIDAS COMUNS (Slide 14) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <EditableText contentKey="parceria_faq_badge" defaultText="Tira-Dúvidas Contábil" className="text-sky-400 font-bold" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            <EditableText contentKey="parceria_faq_title" defaultText="Dúvidas Comuns dos Escritórios" className="text-white font-extrabold" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            <EditableText
              contentKey="parceria_faq_sub"
              defaultText="Respostas diretas sobre o funcionamento, valores e suporte da parceria."
              className="text-slate-400"
            />
          </p>
        </div>

        <div className="space-y-3">
          {partnershipFaq.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-slate-800/90 border-sky-500/50 shadow-lg shadow-sky-500/5'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm font-bold text-white tracking-wide">
                    <EditableText contentKey={`parceria_faq_q_${idx}`} defaultText={faq.q} className="text-white font-bold" />
                  </span>
                  <div
                    className={`p-1 rounded-full bg-slate-800 text-sky-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-sky-500 text-slate-950' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-150">
                    <EditableText contentKey={`parceria_faq_a_${idx}`} defaultText={faq.a} className="text-slate-300" multiline />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. FORMULÁRIO DE CADASTRO E CONTATO DE PARCERIA (Slides 15 & 16) */}
      <section id="formulario-parceria" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Partnership Registration Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-400 text-xs font-bold">
                <Handshake className="w-3.5 h-3.5" />
                <span>Formulário de Credenciamento</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                <EditableText
                  contentKey="parceria_form_title"
                  defaultText="Vamos construir essa parceria?"
                  className="text-white font-extrabold"
                />
              </h3>
              <p className="text-xs text-slate-400">
                <EditableText
                  contentKey="parceria_form_desc"
                  defaultText="Preencha os dados do seu escritório. Entraremos em contato para agendar uma apresentação de 15 minutos sem compromisso."
                  className="text-slate-400"
                />
              </p>
            </div>

            {submitted ? (
              <div className="bg-slate-800/80 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Mensagem Enviada com Sucesso!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Obrigado pelo contato, <span className="text-sky-400 font-semibold">{nome}</span>! Já encaminhamos sua solicitação sobre <span className="text-white font-medium">{assunto}</span> referente a <span className="text-white font-medium">{empresa || 'seu escritório/empresa'}</span> para nosso especialista.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Ol%C3%A1%2C%20acabei%20de%20enviar%20uma%20mensagem%20sobre%20${encodeURIComponent(assunto)}%20pelo%20site%20para%20a%20empresa%20${encodeURIComponent(empresa)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Avisar no WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMensagem('');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-sky-400" />
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: Carlos Mendes"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-sky-400" />
                      Empresa / Escritório
                    </label>
                    <input
                      type="text"
                      required
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Ex: Mendes & Associados Contabilidade"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-sky-400" />
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="carlos@empresa.com.br"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-sky-400" />
                      WhatsApp / Telefone
                    </label>
                    <input
                      type="tel"
                      required
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="(11) 98765-4321"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Solução de Interesse Principal
                  </label>
                  <select
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Parceria Contábil">Parceria Contábil (Programa Partner)</option>
                    <option value="Odvix ERP">Odvix ERP (Software de Gestão)</option>
                    <option value="Servo CRM">Servo CRM (Gestão de Vendas)</option>
                    <option value="BPO Financeiro">BPO Financeiro (Terceirização)</option>
                    <option value="Solução Integrada (BPO + ERP + CRM)">Combo Integrado (BPO + ERP + CRM)</option>
                    <option value="Outro Assunto / Dúvidas">Outro Assunto / Dúvidas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mensagem ou Detalhes da Empresa
                  </label>
                  <textarea
                    rows={3}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Conte um pouco sobre sua operação e necessidades atuais..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {loading ? (
                    <span>Enviando mensagem...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <EditableText
                        contentKey="parceria_btn_enviar"
                        defaultText="Enviar Mensagem / Credenciamento"
                        className="font-bold text-slate-950"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Contacts (Slide 15) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Card from PDF Slide 15 */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-sky-500/30 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-2xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Atendimento Direto</span>
                <h4 className="text-2xl font-black text-white mt-1">Entre em Contato</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Nossos canais corporativos oficiais dedicados ao atendimento de parceiros.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20o%20programa%20Partner%20Cont%C3%A1bil%20da%20Servo%20Tech.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 flex items-center gap-3.5 transition-all text-white"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider block">WhatsApp Corporativo</span>
                    <span className="text-sm font-black text-white">{COMPANY_INFO.phone} / (41) 2510-0691</span>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:bg-slate-800 flex items-center gap-3.5 transition-all text-white"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">E-mail de Parcerias</span>
                    <span className="text-sm font-bold text-white">{COMPANY_INFO.email}</span>
                  </div>
                </a>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center gap-3.5 text-white">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Website Oficial</span>
                    <span className="text-sm font-bold text-white">www.servotech.com.br</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <span className="text-sky-400 font-semibold">Garantia Servo Tech:</span> Nós respeitamos integralmente a relação do seu escritório com o seu cliente. Não prestamos serviços de contabilidade e não competimos com o seu negócio. Nosso papel é fortalecer a sua entrega com tecnologia e gestão.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
