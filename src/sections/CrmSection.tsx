import { CrmKanbanDemo } from '../components/CrmKanbanDemo';
import { EditableText } from '../components/EditableText';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Share2, 
  Clock, 
  Target,
  Zap,
  BarChart
} from 'lucide-react';

interface CrmSectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export function CrmSection({ onOpenConsultation }: CrmSectionProps) {
  const crmFeatures = [
    {
      id: 'feat1',
      defaultTitle: 'Funil de Vendas Visual (Kanban)',
      defaultDesc: 'Estrutura estilo Trello/Kommo com colunas customizáveis, arrastar e soltar e alertas de leads parados há muitos dias.',
      icon: <Target className="w-5 h-5 text-sky-400" />,
      defaultBenefit: 'Visão cristalina de onde está cada real em negociação.'
    },
    {
      id: 'feat2',
      defaultTitle: 'Histórico & Timeline de Interações',
      defaultDesc: 'Registre ligações, mensagens de WhatsApp, propostas enviadas e anotações de reuniões no perfil unificado de cada cliente.',
      icon: <Clock className="w-5 h-5 text-sky-400" />,
      defaultBenefit: 'Se um vendedor faltar, qualquer pessoa assume o atendimento na hora.'
    },
    {
      id: 'feat3',
      defaultTitle: 'Métricas de Conversão da Equipe',
      defaultDesc: 'Monitore taxa de fechamento por etapa, tempo médio de ciclo, ticket médio e motivos de perda em gráficos dinâmicos.',
      icon: <BarChart className="w-5 h-5 text-sky-400" />,
      defaultBenefit: 'Identifique os gargalos que estão travando suas vendas.'
    },
    {
      id: 'feat4',
      defaultTitle: 'Integração com Canais de Atendimento',
      defaultDesc: 'Conecte formulários do site, WhatsApp Web e campanhas de anúncios direto para entrada automática no funil.',
      icon: <Share2 className="w-5 h-5 text-sky-400" />,
      defaultBenefit: 'Lead respondeu? Ele cai automaticamente no CRM em segundos.'
    },
  ];

  return (
    <div id="crm-section" className="space-y-24 sm:space-y-32">
      {/* 1. HERO - TRAÇÃO E CONTROLE DE PIPELINE */}
      <section className="relative pt-8 sm:pt-14 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <EditableText
                contentKey="crm_hero_badge"
                defaultText="Gestão Ativa de Oportunidades & Vendas"
                className="text-sky-400 font-bold"
              />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              <EditableText
                contentKey="crm_hero_title_p1"
                defaultText="Não perca mais nenhuma venda por "
                className="text-white font-extrabold"
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-emerald-400">
                <EditableText
                  contentKey="crm_hero_title_hi"
                  defaultText="falta de acompanhamento."
                  className="font-extrabold"
                />
              </span>
            </h1>

            <div className="max-w-2xl mx-auto">
              <EditableText
                as="p"
                contentKey="crm_hero_subtitle"
                defaultText="O Servo CRM coloca sua equipe de vendas no controle absoluto de cada oportunidade. Acompanhe os leads desde o primeiro contato no WhatsApp até a assinatura do contrato."
                className="text-base sm:text-lg text-slate-300 leading-relaxed"
                multiline
                inline={false}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenConsultation('Agendar Demonstração do Servo CRM')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm tracking-wide shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <EditableText
                  contentKey="crm_btn_demo"
                  defaultText="Agendar Demo do Servo CRM"
                  className="font-extrabold text-slate-950"
                />
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#kanban-interativo"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all"
              >
                <EditableText
                  contentKey="crm_btn_test"
                  defaultText="Testar Funil Interativo"
                  className="text-white font-semibold"
                />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <EditableText
                  contentKey="crm_metric_conv"
                  defaultText="Aumento médio de 40% na taxa de conversão"
                  className="text-slate-400"
                />
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-sky-400" />
                <EditableText
                  contentKey="crm_metric_erp"
                  defaultText="Integração nativa com o Odvix ERP"
                  className="text-slate-400"
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEMO INTERATIVA DO KANBAN */}
      <section id="kanban-interativo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CrmKanbanDemo onOpenConsultation={onOpenConsultation} />
      </section>

      {/* 3. FUNCIONALIDADES CHAVE EM GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <EditableText
              contentKey="crm_features_badge"
              defaultText="Recursos Principais"
              className="text-sky-400 font-bold"
            />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            <EditableText
              contentKey="crm_features_title"
              defaultText="Projetado para acelerar o fechamento de propostas"
              className="text-white font-extrabold"
            />
          </h2>
          <p className="text-xs sm:text-base text-slate-400">
            <EditableText
              contentKey="crm_features_subtitle"
              defaultText="Chega de anotar negociações em blocos de papel ou conversas soltas no WhatsApp pessoal de vendedores."
              className="text-slate-400"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crmFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 hover:border-sky-500/40 p-6 sm:p-7 rounded-3xl flex flex-col justify-between transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  <EditableText
                    contentKey={`crm_feat_${feat.id}_title`}
                    defaultText={feat.defaultTitle}
                    className="text-white font-bold"
                  />
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  <EditableText
                    contentKey={`crm_feat_${feat.id}_desc`}
                    defaultText={feat.defaultDesc}
                    className="text-slate-300"
                    multiline
                  />
                </p>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-xl text-xs flex items-center gap-2 text-sky-300 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  <EditableText
                    contentKey={`crm_feat_${feat.id}_benefit`}
                    defaultText={feat.defaultBenefit}
                    className="text-sky-300"
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CONEXÃO DIRETA COM BPO & ERP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                <EditableText
                  contentKey="crm_combo_tag"
                  defaultText="Convergência Comercial & Financeira"
                  className="text-emerald-400 font-bold"
                />
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                <EditableText
                  contentKey="crm_combo_title"
                  defaultText="Vendeu no CRM? O pedido e a NF-e já nascem faturados no ERP e entram na rotina do BPO."
                  className="text-white font-extrabold"
                  multiline
                />
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <EditableText
                  contentKey="crm_combo_desc"
                  defaultText="Elimine o abismo entre seu time de vendas e seu financeiro. Com as soluções da Servo Tech, a informação transita perfeitamente da prospecção até a conciliação do dinheiro na conta."
                  className="text-slate-300"
                  multiline
                />
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => onOpenConsultation('Demonstração Integrada CRM + ERP + BPO')}
                className="px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wide shadow-xl shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <EditableText
                  contentKey="crm_combo_btn"
                  defaultText="Agendar Demonstração do Combo"
                  className="font-bold text-slate-950"
                />
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
