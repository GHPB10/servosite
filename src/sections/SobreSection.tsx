import { EditableText } from '../components/EditableText';
import { 
  ShieldCheck, 
  Target, 
  Lightbulb, 
  Users, 
  Sparkles, 
  ArrowRight,
  Award
} from 'lucide-react';

interface SobreSectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export function SobreSection({ onOpenConsultation }: SobreSectionProps) {
  const values = [
    {
      id: 'val1',
      defaultTitle: 'Transparência Radical',
      defaultDesc: 'Acreditamos que clareza gera confiança. Processos auditáveis, relatórios abertos e comunicação sem termos técnicos complicados.',
      icon: <ShieldCheck className="w-6 h-6 text-sky-400" />
    },
    {
      id: 'val2',
      defaultTitle: 'Eficiência Operacional',
      defaultDesc: 'Automação inteligente nas tarefas repetitivas para que o tempo humano seja focado naquilo que realmente move o ponteiro do cliente.',
      icon: <Target className="w-6 h-6 text-sky-400" />
    },
    {
      id: 'val3',
      defaultTitle: 'Inovação Contínua',
      defaultDesc: 'Evolução constante das nossas ferramentas de software e metodologia para entregar sempre a vanguarda das Soluções em Tecnologia e gestão empresarial.',
      icon: <Lightbulb className="w-6 h-6 text-sky-400" />
    },
    {
      id: 'val4',
      defaultTitle: 'Foco no Sucesso do Cliente',
      defaultDesc: 'Mais do que prestar um serviço de digitação de contas, vibramos com a lucratividade, expansão e estabilidade de cada parceiro.',
      icon: <Users className="w-6 h-6 text-sky-400" />
    },
  ];

  return (
    <div id="sobre-section" className="space-y-24 sm:space-y-32">
      {/* 1. HERO & HISTÓRIA */}
      <section className="relative pt-8 sm:pt-14 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <EditableText
                  contentKey="sobre_hero_badge"
                  defaultText="Nossa História & Propósito"
                  className="text-sky-400 font-bold"
                />
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                <EditableText
                  contentKey="sobre_hero_title_p1"
                  defaultText="Simplificando as finanças corporativas unindo "
                  className="text-white font-extrabold"
                />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400">
                  <EditableText
                    contentKey="sobre_hero_title_hi"
                    defaultText="tecnologia proprietária e inteligência consultiva."
                    className="font-extrabold"
                  />
                </span>
              </h1>

              <div className="space-y-4">
                <EditableText
                  as="p"
                  contentKey="sobre_hero_p1"
                  defaultText="A Servo Tech nasceu da percepção de que a maioria dos empresários no Brasil gasta até 30% do seu precioso tempo resolvendo burocracias de pagamentos, cobranças e notas fiscais — sem ter clareza se a empresa está tendo lucro real no final do mês."
                  className="text-base sm:text-lg text-slate-300 leading-relaxed"
                  multiline
                  inline={false}
                />

                <EditableText
                  as="p"
                  contentKey="sobre_hero_p2"
                  defaultText="Decidimos mudar essa realidade criando uma solução única no mercado: não apenas entregamos softwares modernos de gestão (Odvix ERP e Servo CRM), mas também operamos a rotina financeira completa (BPO) com especialistas de mercado. Assim, o empresário ganha liberdade para crescer."
                  className="text-sm text-slate-400 leading-relaxed"
                  multiline
                  inline={false}
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenConsultation('Conhecer mais sobre a Servo Tech')}
                  className="px-7 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm tracking-wide shadow-lg shadow-sky-500/25 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <EditableText
                    contentKey="sobre_hero_btn"
                    defaultText="Falar com Nossos Fundadores & Consultores"
                    className="font-extrabold text-slate-950"
                  />
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Card / Manifest */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-2xl space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                    ST
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      <EditableText contentKey="sobre_manifest_title" defaultText="Nosso Manifesto" className="text-white font-bold" />
                    </h4>
                    <p className="text-xs text-slate-400">
                      <EditableText contentKey="sobre_manifest_subtitle" defaultText="O que nos move todos os dias" className="text-slate-400" />
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <p>
                    <EditableText
                      contentKey="sobre_manifest_quote1"
                      defaultText='"Acreditamos que nenhuma boa empresa deveria fechar as portas por desorganização de fluxo de caixa ou falta de previsibilidade."'
                      className="text-slate-300 italic"
                      multiline
                    />
                  </p>
                  <p>
                    <EditableText
                      contentKey="sobre_manifest_quote2"
                      defaultText='"A tecnologia mais avançada só atinge seu verdadeiro potencial quando combinada com a empatia, responsabilidade e o olhar atento de consultores dedicados."'
                      className="text-slate-300 italic"
                      multiline
                    />
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-white">Equipe Servo Tech</span>
                    <span className="text-sky-400">São Paulo, Brasil</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NOSSOS VALORES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <EditableText contentKey="sobre_values_badge" defaultText="Princípios Fundamentais" className="text-sky-400 font-bold" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            <EditableText contentKey="sobre_values_title" defaultText="Nossos Valores Inegociáveis" className="text-white font-extrabold" />
          </h2>
          <p className="text-xs sm:text-base text-slate-400">
            <EditableText contentKey="sobre_values_subtitle" defaultText="A bússola que orienta cada linha de código que escrevemos e cada lançamento financeiro que auditamos." className="text-slate-400" multiline />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between hover:border-sky-500/40 transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                  {val.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  <EditableText contentKey={`sobre_val_${val.id}_title`} defaultText={val.defaultTitle} className="text-white font-bold" />
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <EditableText contentKey={`sobre_val_${val.id}_desc`} defaultText={val.defaultDesc} className="text-slate-300" multiline />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. METODOLOGIA (HIGH-TECH + HIGH-TOUCH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                <EditableText contentKey="sobre_method_tag" defaultText="Nossa Metodologia" className="text-sky-400 font-bold" />
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                <EditableText contentKey="sobre_method_title" defaultText="Como combinamos High-Tech com High-Touch" className="text-white font-extrabold" />
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <EditableText contentKey="sobre_method_p1" defaultText="Muitas empresas tentam resolver tudo apenas vendendo um software em que você precisa se virar sozinho. Outras oferecem escritórios contábeis tradicionais que demoram dias para responder." className="text-slate-300" multiline />
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <EditableText contentKey="sobre_method_p2" defaultText="Na Servo Tech, nós construímos a ponte perfeita: fornecemos a melhor tecnologia do mercado (Odvix ERP & CRM) com uma equipe de analistas que opera o dia a dia e se comunica ativamente com você via WhatsApp e chamadas semanais." className="text-slate-300" multiline />
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl">
                <span className="text-sky-400 font-black text-sm block mb-1">
                  <EditableText contentKey="sobre_step1_num" defaultText="01. High-Tech" className="text-sky-400 font-black" />
                </span>
                <h4 className="text-xs font-bold text-white mb-1">
                  <EditableText contentKey="sobre_step1_title" defaultText="Tecnologia em Nuvem" className="text-white font-bold" />
                </h4>
                <p className="text-[11px] text-slate-300">
                  <EditableText contentKey="sobre_step1_desc" defaultText="Automação de conciliação bancária por API, emissão fiscal em lote e painéis em tempo real." className="text-slate-300" multiline />
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl">
                <span className="text-emerald-400 font-black text-sm block mb-1">
                  <EditableText contentKey="sobre_step2_num" defaultText="02. High-Touch" className="text-emerald-400 font-black" />
                </span>
                <h4 className="text-xs font-bold text-white mb-1">
                  <EditableText contentKey="sobre_step2_title" defaultText="Atendimento Próximo" className="text-white font-bold" />
                </h4>
                <p className="text-[11px] text-slate-300">
                  <EditableText contentKey="sobre_step2_desc" defaultText="Gerente de contas com nome e sobrenome disponível no WhatsApp para tirar dúvidas na hora." className="text-slate-300" multiline />
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl">
                <span className="text-amber-400 font-black text-sm block mb-1">
                  <EditableText contentKey="sobre_step3_num" defaultText="03. Governança" className="text-amber-400 font-black" />
                </span>
                <h4 className="text-xs font-bold text-white mb-1">
                  <EditableText contentKey="sobre_step3_title" defaultText="Blindagem Total" className="text-white font-bold" />
                </h4>
                <p className="text-[11px] text-slate-300">
                  <EditableText contentKey="sobre_step3_desc" defaultText="Separação estrita de alçadas. Você nunca perde a chave máster do seu caixa." className="text-slate-300" multiline />
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl">
                <span className="text-purple-400 font-black text-sm block mb-1">
                  <EditableText contentKey="sobre_step4_num" defaultText="04. Estratégia" className="text-purple-400 font-black" />
                </span>
                <h4 className="text-xs font-bold text-white mb-1">
                  <EditableText contentKey="sobre_step4_title" defaultText="Visão de Futuro" className="text-white font-bold" />
                </h4>
                <p className="text-[11px] text-slate-300">
                  <EditableText contentKey="sobre_step4_desc" defaultText="Reuniões periódicas para analisar seu DRE, identificar custos supérfluos e planejar investimentos." className="text-slate-300" multiline />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
