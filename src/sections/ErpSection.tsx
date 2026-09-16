import { ErpModuleExplorer } from '../components/ErpModuleExplorer';
import { EditableText } from '../components/EditableText';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Database,
  Building,
  CreditCard,
  FileSpreadsheet
} from 'lucide-react';

interface ErpSectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export function ErpSection({ onOpenConsultation }: ErpSectionProps) {
  return (
    <div id="erp-section" className="space-y-24 sm:space-y-32">
      {/* 1. HERO - CORAÇÃO OPERACIONAL */}
      <section className="relative pt-8 sm:pt-14 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <EditableText
                contentKey="erp_hero_badge"
                defaultText="Software de Gestão Empresarial 100% em Nuvem"
                className="font-bold text-sky-400"
              />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              <EditableText
                contentKey="erp_hero_title_p1"
                defaultText="Odvix ERP: O "
                className="text-white font-extrabold"
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400">
                <EditableText
                  contentKey="erp_hero_title_hi"
                  defaultText="coração operacional"
                  className="font-extrabold"
                />
              </span>{' '}
              <EditableText
                contentKey="erp_hero_title_p2"
                defaultText="do seu negócio."
                className="text-white font-extrabold"
              />
            </h1>

            <div className="max-w-2xl mx-auto">
              <EditableText
                as="p"
                contentKey="erp_hero_subtitle"
                defaultText="Controle compras, estoque, vendas, faturamento fiscal e financeiro em uma única plataforma rápida e sem complicações. Desenhado para pequenas e médias empresas que precisam de agilidade real."
                className="text-base sm:text-lg text-slate-300 leading-relaxed"
                multiline
                inline={false}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenConsultation('Demonstração Completa do Odvix ERP')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm tracking-wide shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <EditableText
                  contentKey="erp_btn_demo"
                  defaultText="Solicitar Demonstração do Odvix ERP"
                  className="font-extrabold text-slate-950"
                />
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#modulos-erp"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all"
              >
                <EditableText
                  contentKey="erp_btn_explore"
                  defaultText="Explorar Módulos"
                  className="text-white font-semibold"
                />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <EditableText
                  contentKey="erp_guarantee_1"
                  defaultText="Sem taxa oculta de implantação"
                  className="text-slate-400"
                />
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <EditableText
                  contentKey="erp_guarantee_2"
                  defaultText="Certificado Digital A1 Integrado"
                  className="text-slate-400"
                />
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-400" />
                <EditableText
                  contentKey="erp_guarantee_3"
                  defaultText="Treinamento incluso"
                  className="text-slate-400"
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MÓDULOS PRINCIPAIS & EXPLORADOR INTERATIVO */}
      <section id="modulos-erp" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <EditableText
              contentKey="erp_modules_badge"
              defaultText="Módulos Completos"
              className="text-sky-400 font-bold"
            />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            <EditableText
              contentKey="erp_modules_title"
              defaultText="Tudo o que sua empresa precisa em um só lugar"
              className="text-white font-extrabold"
            />
          </h2>
          <p className="text-xs sm:text-base text-slate-400">
            <EditableText
              contentKey="erp_modules_subtitle"
              defaultText="Clique em cada módulo abaixo para conferir as funcionalidades e a interface simplificada."
              className="text-slate-400"
            />
          </p>
        </div>

        <ErpModuleExplorer onOpenConsultation={onOpenConsultation} />
      </section>

      {/* 3. SETORES ATENDIDOS PELO ODVIX ERP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              <EditableText
                contentKey="erp_sectors_title"
                defaultText="Feito sob medida para o seu setor"
                className="text-white font-extrabold"
              />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              <EditableText
                contentKey="erp_sectors_desc"
                defaultText="Parametrizações fiscais e fluxos operacionais adaptados para diferentes segmentos."
                className="text-slate-400"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <Building className="w-6 h-6 text-sky-400 mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">
                <EditableText contentKey="erp_sector1_title" defaultText="Prestadores de Serviços" className="text-white font-bold" />
              </h4>
              <p className="text-xs text-slate-300">
                <EditableText contentKey="erp_sector1_desc" defaultText="Contratos recorrentes, emissão de NFS-e em massa e controle de custos por ordem de serviço." className="text-slate-300" multiline />
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <CreditCard className="w-6 h-6 text-sky-400 mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">
                <EditableText contentKey="erp_sector2_title" defaultText="Comércio Varejista & E-commerce" className="text-white font-bold" />
              </h4>
              <p className="text-xs text-slate-300">
                <EditableText contentKey="erp_sector2_desc" defaultText="Emissão de NFC-e, controle ágil de caixa diário, estoque multi-loja e código de barras." className="text-slate-300" multiline />
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <Database className="w-6 h-6 text-sky-400 mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">
                <EditableText contentKey="erp_sector3_title" defaultText="Distribuidores & Atacadistas" className="text-white font-bold" />
              </h4>
              <p className="text-xs text-slate-300">
                <EditableText contentKey="erp_sector3_desc" defaultText="Gestão de lotes e validades, tabelas de preços diferenciadas e regras de frete CIF/FOB." className="text-slate-300" multiline />
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <FileSpreadsheet className="w-6 h-6 text-sky-400 mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">
                <EditableText contentKey="erp_sector4_title" defaultText="Pequenas Indústrias" className="text-white font-bold" />
              </h4>
              <p className="text-xs text-slate-300">
                <EditableText contentKey="erp_sector4_desc" defaultText="Ordem de produção, baixa de matéria-prima, cálculo de custo médio e controle de estoque de insumos." className="text-slate-300" multiline />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA BANNER ODVIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            <EditableText
              contentKey="erp_cta_banner_title"
              defaultText="Quer ver o Odvix ERP funcionando com os dados da sua empresa?"
              className="text-white font-extrabold"
            />
          </h3>
          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto mb-8">
            <EditableText
              contentKey="erp_cta_banner_desc"
              defaultText="Agende uma demonstração ao vivo de 20 minutos com um especialista e veja como é simples gerenciar tudo em poucos cliques."
              className="text-slate-300"
              multiline
            />
          </p>
          <button
            onClick={() => onOpenConsultation('Demonstração Odvix ERP ao Vivo')}
            className="px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-sky-500/25 inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <EditableText
              contentKey="erp_cta_banner_btn"
              defaultText="Solicitar Demonstração do Odvix ERP"
              className="font-bold text-slate-950"
            />
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
