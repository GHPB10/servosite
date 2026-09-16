import { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Calculator, 
  ShieldCheck
} from 'lucide-react';
import { EditableText } from './EditableText';

interface RoiCalculatorProps {
  onOpenConsultation: (topic?: string) => void;
}

export function RoiCalculator({ onOpenConsultation }: RoiCalculatorProps) {
  // Volume index: 0 = Pequena (até 100 lançamentos/mês), 1 = Média (até 300 lançamentos), 2 = Avançada (500+ lançamentos)
  const [tierIndex, setTierIndex] = useState<number>(1);

  const tiers = [
    {
      name: 'Pequena Empresa (até R$ 100k/mês)',
      transactions: 'Até 120 movimentações/mês',
      internalCost: 7800,
      servoCost: 1980,
      breakdown: {
        salario: 3200,
        encargos: 2200,
        beneficios: 750,
        software: 650,
        risco: 1000,
      }
    },
    {
      name: 'Média Empresa (R$ 100k a R$ 500k/mês)',
      transactions: '150 a 400 movimentações/mês',
      internalCost: 11200,
      servoCost: 3450,
      breakdown: {
        salario: 4800,
        encargos: 3300,
        beneficios: 1000,
        software: 900,
        risco: 1200,
      }
    },
    {
      name: 'Operação Avançada (R$ 500k a R$ 2M+/mês)',
      transactions: '500+ movimentações/mês, múltiplos CNPJs',
      internalCost: 16500,
      servoCost: 5200,
      breakdown: {
        salario: 7500,
        encargos: 5100,
        beneficios: 1500,
        software: 1200,
        risco: 1200,
      }
    }
  ];

  const currentTier = tiers[tierIndex];
  const monthlySavings = currentTier.internalCost - currentTier.servoCost;
  const yearlySavings = monthlySavings * 12;
  const savingsPercent = Math.round((monthlySavings / currentTier.internalCost) * 100);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  };

  return (
    <div id="roi-calculator" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <EditableText contentKey="roi_badge" defaultText="Simulador de Retorno sobre Investimento (ROI)" className="text-sky-400 font-bold" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            <EditableText contentKey="roi_title_p1" defaultText="Setor Interno CLT vs. " className="text-white font-extrabold" />
            <span className="text-sky-400">
              <EditableText contentKey="roi_title_hi" defaultText="Servo Tech BPO" className="text-sky-400 font-extrabold" />
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            <EditableText
              contentKey="roi_subtitle"
              defaultText="Veja a economia imediata comparando os custos reais de contratação com a terceirização sênior."
              className="text-slate-400"
            />
          </p>
        </div>

        {/* Big Savings Tag */}
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/40 px-5 py-3 rounded-2xl text-center md:text-right">
          <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
            <EditableText contentKey="roi_tag_label" defaultText="Economia Anual Estimada" className="text-emerald-300 font-bold" />
          </p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">
            {formatCurrency(yearlySavings)}
          </p>
          <p className="text-[11px] text-emerald-300 font-semibold mt-0.5">
            ({savingsPercent}% de redução de custos fixos)
          </p>
        </div>
      </div>

      {/* Selector: Business Size */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-slate-300 mb-3">
          <EditableText contentKey="roi_select_label" defaultText="Selecione o Porte e Volume da sua Empresa:" className="text-slate-300 font-semibold" />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tiers.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setTierIndex(idx)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                tierIndex === idx
                  ? 'bg-sky-500/15 border-sky-400 text-white shadow-lg shadow-sky-500/10'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <p className="text-xs font-bold text-white mb-1">
                <EditableText contentKey={`roi_tier_${idx}_name`} defaultText={t.name} className="text-white font-bold" />
              </p>
              <p className="text-[11px] text-sky-400 font-medium">
                <EditableText contentKey={`roi_tier_${idx}_tx`} defaultText={t.transactions} className="text-sky-400 font-medium" />
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Internal Cost Card */}
        <div className="bg-slate-800/70 border border-red-500/20 rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              <EditableText contentKey="roi_clt_tag" defaultText="Opção Tradicional" className="text-slate-400 font-bold" />
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 font-bold border border-red-500/30">
              <EditableText contentKey="roi_clt_badge" defaultText="Alto Custo Fixo" className="text-red-400 font-bold" />
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mb-1">
            <EditableText contentKey="roi_clt_title" defaultText="Setor Financeiro Próprio (CLT)" className="text-white font-bold" />
          </h4>
          <p className="text-xs text-slate-400 mb-5">
            <EditableText
              contentKey="roi_clt_desc"
              defaultText="Salário base + encargos governamentais + benefícios + risco de rescisão."
              className="text-slate-400"
            />
          </p>

          <div className="text-2xl sm:text-3xl font-black text-white mb-6">
            {formatCurrency(currentTier.internalCost)}
            <span className="text-xs font-normal text-slate-400"> /mês</span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-700/80 pt-4">
            <div className="flex justify-between">
              <span>Salário Base:</span>
              <span className="font-semibold text-white">{formatCurrency(currentTier.breakdown.salario)}</span>
            </div>
            <div className="flex justify-between">
              <span>Encargos (INSS, FGTS, Provisão Férias/13º):</span>
              <span className="font-semibold text-white">{formatCurrency(currentTier.breakdown.encargos)}</span>
            </div>
            <div className="flex justify-between">
              <span>Benefícios (VR, VT, Plano):</span>
              <span className="font-semibold text-white">{formatCurrency(currentTier.breakdown.beneficios)}</span>
            </div>
            <div className="flex justify-between">
              <span>Licenças de Software & Equipamentos:</span>
              <span className="font-semibold text-white">{formatCurrency(currentTier.breakdown.software)}</span>
            </div>
            <div className="flex justify-between text-red-300 font-medium">
              <span>Risco de Ausências, Férias & Atestados:</span>
              <span>100% dependente de 1 pessoa</span>
            </div>
          </div>
        </div>

        {/* Servo Tech BPO Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-sky-500/60 rounded-2xl p-6 relative shadow-xl shadow-sky-500/10">
          <div className="absolute -top-3 right-6 bg-sky-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
            <EditableText contentKey="roi_servo_tag" defaultText="Recomendado" className="text-slate-950 font-black" />
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              <EditableText contentKey="roi_servo_badge1" defaultText="Solução Inteligente" className="text-sky-400 font-bold" />
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Economia de {savingsPercent}%
            </span>
          </div>

          <h4 className="text-lg font-bold text-white mb-1">
            <EditableText contentKey="roi_servo_title" defaultText="Servo Tech — BPO Financeiro" className="text-white font-bold" />
          </h4>
          <p className="text-xs text-slate-400 mb-5">
            <EditableText
              contentKey="roi_servo_desc"
              defaultText="Equipe multidisciplinar sênior + Odvix ERP integrado + consultoria contínua."
              className="text-slate-400"
            />
          </p>

          <div className="text-2xl sm:text-3xl font-black text-sky-400 mb-6">
            {formatCurrency(currentTier.servoCost)}
            <span className="text-xs font-normal text-slate-400"> /mês estimado</span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-200 border-t border-slate-700/80 pt-4">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><EditableText contentKey="roi_servo_f1" defaultText="Equipe sênior sem passivo ou encargos trabalhistas" className="text-slate-200" /></span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><EditableText contentKey="roi_servo_f2" defaultText="Redundância total: sua empresa nunca fica na mão por férias" className="text-slate-200" /></span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><EditableText contentKey="roi_servo_f3" defaultText="Sistemas de ponta inclusos (sem taxas extras de licença)" className="text-slate-200" /></span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><EditableText contentKey="roi_servo_f4" defaultText="Relatórios executivos e DRE com consultor quinzenal" className="text-slate-200" /></span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-emerald-400">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Economia direta de {formatCurrency(monthlySavings)} todos os meses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Strip */}
      <div className="bg-slate-800/80 border border-slate-700 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">
              <EditableText contentKey="roi_cta_t1" defaultText="Gostaria de uma proposta exata para o seu CNPJ?" className="text-white font-bold" />
            </p>
            <p className="text-[11px] text-slate-400">
              <EditableText contentKey="roi_cta_t2" defaultText="Fazemos um levantamento personalizado sem compromisso." className="text-slate-400" />
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenConsultation(`BPO Financeiro - Porte: ${currentTier.name}`)}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <EditableText contentKey="roi_cta_btn" defaultText="Receber Estudo de ROI Detalhado" className="text-slate-950 font-bold" />
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
