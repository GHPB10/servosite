import { useState } from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  CreditCard,
  Building2,
  Calendar,
  Layers,
  FileCheck
} from 'lucide-react';

export function InteractiveDashboardPreview() {
  const [activeTab, setActiveTab] = useState<'caixa' | 'dre' | 'contas'>('caixa');

  return (
    <div className="relative w-full max-w-3xl mx-auto lg:max-w-none">
      {/* Decorative Glow Background */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500/30 to-blue-600/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

      {/* Main Glass/Dark Corporate Card */}
      <div className="relative bg-slate-900/95 border border-slate-700/90 rounded-3xl shadow-2xl p-4 sm:p-7 backdrop-blur-xl text-white">
        {/* Top Header of Cockpit with clear CLIENT DATA emphasis */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center font-black text-xs shadow-md shadow-sky-500/30">
              ST
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-extrabold text-white tracking-tight">
                  Painel de Gestão do Cliente
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  Resultados Reais do Cliente
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Empresa Atendida: <span className="text-sky-300 font-medium">Distribuidora & Logística Alfa Ltda.</span> • Operação BPO Servo Tech
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/70 text-xs">
            <button
              onClick={() => setActiveTab('caixa')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'caixa'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Fluxo & Economia
            </button>
            <button
              onClick={() => setActiveTab('dre')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'dre'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              DRE Gerencial
            </button>
            <button
              onClick={() => setActiveTab('contas')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'contas'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Rotina & Conciliação
            </button>
          </div>
        </div>

        {/* HIGH-IMPACT CLIENT METRICS BAR (Requested: chamativos de economia de receita e receita gerada para o cliente) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {/* Card 1: Economia de Receita Gerada */}
          <div className="bg-gradient-to-br from-emerald-950/40 to-slate-800/80 border border-emerald-500/40 p-3.5 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] text-emerald-300 font-semibold mb-1">
              <span>Economia de Receita Gerada</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-bold">Ano 1</span>
            </div>
            <p className="text-2xl font-black text-emerald-400">R$ 164.800</p>
            <p className="text-[10px] text-slate-300 mt-1 leading-tight">
              Economia astronômica vs contratar equipe no CLT + zero multas e juros
            </p>
          </div>

          {/* Card 2: Receita Gerada / Recuperada */}
          <div className="bg-gradient-to-br from-sky-950/40 to-slate-800/80 border border-sky-500/40 p-3.5 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] text-sky-300 font-semibold mb-1">
              <span>Receita Extra Alavancada</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-sky-500/20 text-sky-300 rounded font-bold">Cobrança BPO</span>
            </div>
            <p className="text-2xl font-black text-sky-400">+ R$ 392.500</p>
            <p className="text-[10px] text-slate-300 mt-1 leading-tight">
              Inadimplência do cliente reduzida de 14.8% para apenas 1.9%
            </p>
          </div>

          {/* Card 3: Margem Líquida Conquistada */}
          <div className="bg-gradient-to-br from-indigo-950/40 to-slate-800/80 border border-indigo-500/40 p-3.5 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] text-indigo-300 font-semibold mb-1">
              <span>Margem de Lucro Líquido</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded font-bold">+14.8% Margem</span>
            </div>
            <p className="text-2xl font-black text-white">26.0% <span className="text-xs font-normal text-slate-400">(era 11.2%)</span></p>
            <p className="text-[10px] text-slate-300 mt-1 leading-tight">
              Rentabilidade destravada com corte de gargalos operacionais
            </p>
          </div>
        </div>

        {/* Tab 1: Fluxo de Caixa */}
        {activeTab === 'caixa' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Top Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-xl">
                <span className="text-[11px] text-slate-400 font-medium">Saldo nos Bancos do Cliente</span>
                <p className="text-xl font-black text-white mt-1">R$ 518.420,00</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mt-1">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+34.2% de liquidez livre</span>
                </div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-xl">
                <span className="text-[11px] text-slate-400 font-medium">Recebimentos Agendados (30d)</span>
                <p className="text-xl font-black text-sky-400 mt-1">R$ 214.900,00</p>
                <div className="flex items-center gap-1 text-[11px] text-sky-300 font-medium mt-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>98% com régua automática</span>
                </div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-xl">
                <span className="text-[11px] text-slate-400 font-medium">Pagamentos Preparados (30d)</span>
                <p className="text-xl font-black text-slate-200 mt-1">R$ 89.150,00</p>
                <div className="flex items-center gap-1 text-[11px] text-amber-400 font-medium mt-1">
                  <Clock className="w-3 h-3" />
                  <span>Pronto para o sócio aprovar</span>
                </div>
              </div>
            </div>

            {/* Simulated Mini Chart Bar */}
            <div className="bg-slate-800/40 border border-slate-700/40 p-4 rounded-xl">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold text-slate-300">Projeção de Caixa do Cliente (Próximas 4 Semanas)</span>
                <span className="text-emerald-400 font-bold">Superávit Estimado: +R$ 125.750,00</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { sem: 'Semana 1', rec: '85%', pag: '35%', val: '+R$ 38k' },
                  { sem: 'Semana 2', rec: '70%', pag: '45%', val: '+R$ 24k' },
                  { sem: 'Semana 3', rec: '95%', pag: '30%', val: '+R$ 41k' },
                  { sem: 'Semana 4', rec: '65%', pag: '40%', val: '+R$ 22k' },
                ].map((col, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-1.5 font-medium">{col.sem}</span>
                    <div className="flex justify-center items-end h-14 gap-1.5 pb-1">
                      <div className="w-3 bg-sky-500 rounded-t-sm" style={{ height: col.rec }} title="Recebimentos do Cliente"></div>
                      <div className="w-3 bg-slate-600 rounded-t-sm" style={{ height: col.pag }} title="Pagamentos Preparados"></div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">{col.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: DRE Gerencial */}
        {activeTab === 'dre' && (
          <div className="space-y-3 animate-in fade-in duration-200 text-xs">
            <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl space-y-2.5">
              <div className="flex justify-between items-center text-slate-300 pb-1 border-b border-slate-700/50">
                <span className="font-medium">Receita Bruta Faturada do Cliente</span>
                <span className="font-bold text-white">R$ 364.500,00</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 pb-1 border-b border-slate-700/50">
                <span>(-) Impostos & Deduções Fiscais (Auditado)</span>
                <span className="text-red-400 font-medium">- R$ 28.400,00</span>
              </div>
              <div className="flex justify-between items-center text-slate-300 pb-1 border-b border-slate-700/50">
                <span className="font-semibold">(=) Receita Operacional Líquida</span>
                <span className="font-bold text-white">R$ 336.100,00</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 pb-1 border-b border-slate-700/50">
                <span>(-) Custos Operacionais / Mercadorias</span>
                <span className="text-red-400 font-medium">- R$ 142.200,00</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 pb-1 border-b border-slate-700/50">
                <span>(-) Despesas Administrativas (Economia de 64% com BPO Servo)</span>
                <span className="text-emerald-400 font-medium">- R$ 42.100,00 (Otimizado)</span>
              </div>
              <div className="flex justify-between items-center text-emerald-400 pt-1 font-bold text-sm bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Lucro Líquido Real do Cliente (Resultado do Exercício)
                </span>
                <span>R$ 94.770,00 (26.0% Margem)</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic text-center">
              DRE gerencial calculada pelo BPO Servo Tech com conciliação diária em centavos.
            </p>
          </div>
        )}

        {/* Tab 3: Pagar & Receber */}
        {activeTab === 'contas' && (
          <div className="space-y-3 animate-in fade-in duration-200 text-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <ArrowDownRight className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs">Recebimento de Cliente: Contrato Corporativo #842</p>
                    <p className="text-[10px] text-slate-400">PIX Conciliado automaticamente • Banco do Cliente</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-400">+ R$ 32.500,00</span>
                  <span className="block text-[10px] text-slate-400">Hoje, 10:15</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs">Agendado pelo BPO: Fornecedor de Insumos</p>
                    <p className="text-[10px] text-sky-300">Preparado para você liberar em 1 clique no seu internet banking</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-200">- R$ 14.820,00</span>
                  <span className="block text-[10px] text-emerald-400 font-semibold">Zero juros / Desconto 3%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs">Faturamento Fiscal: Lote de 28 Notas Fiscais</p>
                    <p className="text-[10px] text-slate-400">Integração Odvix ERP com a SEFAZ estadual</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sky-400">100% Homologadas</span>
                  <span className="block text-[10px] text-emerald-400 font-semibold">Sem divergências</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Security & Transparency Notice */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Dados consolidados da operação do cliente gerenciada pela Servo Tech</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldAlert className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>Não somos banco: a liberação é 100% feita pelo seu token</span>
          </div>
        </div>
      </div>

      {/* Floating Callout 1 (Top Right) */}
      <div className="hidden sm:flex absolute -top-4 -right-4 bg-slate-900 border border-emerald-500/50 rounded-xl p-3 shadow-xl items-center gap-2.5 text-xs text-white backdrop-blur-md">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Economia do Cliente</p>
          <p className="font-black text-emerald-400 text-sm">-64% em Custos Fixos</p>
        </div>
      </div>

      {/* Floating Callout 2 (Bottom Left) */}
      <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-slate-900 border border-sky-500/40 rounded-xl p-3 shadow-xl items-center gap-2.5 text-xs text-white backdrop-blur-md">
        <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Odvix ERP + BPO</p>
          <p className="font-bold text-white text-xs">Sincronizados em Tempo Real</p>
        </div>
      </div>
    </div>
  );
}
