import { useState } from 'react';
import { ERP_MODULES } from '../data/content';
import { 
  PackageSearch, 
  ShieldCheck, 
  Wallet, 
  BarChart2, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Zap,
  Server,
  Users,
  Smartphone,
  Check
} from 'lucide-react';

interface ErpModuleExplorerProps {
  onOpenConsultation: (topic?: string) => void;
}

export function ErpModuleExplorer({ onOpenConsultation }: ErpModuleExplorerProps) {
  const [activeModuleId, setActiveModuleId] = useState<string>('estoque-vendas');

  const activeModule = ERP_MODULES.find(m => m.id === activeModuleId) || ERP_MODULES[0];

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'PackageSearch':
        return <PackageSearch className="w-5 h-5 text-sky-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-sky-400" />;
      case 'Wallet':
        return <Wallet className="w-5 h-5 text-sky-400" />;
      case 'BarChart2':
        return <BarChart2 className="w-5 h-5 text-sky-400" />;
      default:
        return <PackageSearch className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <div id="odvix-module-explorer" className="space-y-8">
      {/* Module Selector Grid (Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ERP_MODULES.map((module) => {
          const isSelected = activeModuleId === module.id;
          return (
            <button
              key={module.id}
              onClick={() => setActiveModuleId(module.id)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-slate-800 border-sky-400 shadow-xl shadow-sky-500/10 ring-2 ring-sky-400/50'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              {module.badge && (
                <span className="absolute top-3 right-3 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {module.badge}
                </span>
              )}

              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-3">
                {getModuleIcon(module.icon)}
              </div>

              <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider block mb-1">
                {module.category}
              </span>
              <h4 className="text-sm font-bold text-white mb-1.5">{module.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {module.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detailed Interactive View of the Selected Module */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Description */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Módulo Ativo: {activeModule.title}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {activeModule.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeModule.description}
            </p>

            {/* Checklist of features */}
            <div className="space-y-2.5 pt-2">
              {activeModule.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Demo Stats */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
              {activeModule.demoStats.map((stat, sIdx) => (
                <div key={sIdx} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block font-medium">{stat.label}</span>
                  <span className="text-lg font-black text-sky-400">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenConsultation(`Demonstração Odvix ERP - ${activeModule.title}`)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Solicitar Demonstração do Odvix ERP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Simulated Screen of the Module */}
          <div className="lg:col-span-6 bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <span className="text-[11px] text-slate-400 ml-2 font-mono">odvix.servotech.com.br/app</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                100% em Nuvem
              </span>
            </div>

            {/* Custom Mockup per Module */}
            {activeModuleId === 'estoque-vendas' && (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-bold">Item #4029 - Peça Mecânica A1</span>
                  <span className="text-emerald-400 font-bold">142 un. em estoque</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-bold">Item #1088 - Componente Eletrônico B</span>
                  <span className="text-amber-400 font-bold">Alerta: Ponto de Reposição (8 un.)</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1.5">
                  <p className="text-[11px] text-slate-400">Última Venda: Pedido #9832 (R$ 3.840,00)</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-full w-3/4"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                    <span>Meta mensal atingida: 75%</span>
                    <span>32 pedidos hoje</span>
                  </div>
                </div>
              </div>
            )}

            {activeModuleId === 'fiscal-notas' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">NF-e #000.4192 (Autorizada SEFAZ)</span>
                    <span className="text-emerald-400 font-bold">Danfe Emitida</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Destinatário: Transportes Alpha S/A • CNPJ 12.345.678/0001-90</p>
                  <p className="text-[11px] text-sky-400 font-mono mt-1">Chave: 3524 0912 3456 7800 0190 5500 1000 0041 9210</p>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-white">NFS-e Prefeitura de São Paulo</p>
                    <p className="text-[11px] text-slate-400">Envio automático para contador e cliente</p>
                  </div>
                  <span className="px-2 py-1 bg-sky-500/20 text-sky-300 rounded text-[10px] font-bold">1 Clique</span>
                </div>
              </div>
            )}

            {activeModuleId === 'fluxo-caixa' && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400">Entradas Previstas</span>
                    <p className="text-base font-bold text-emerald-400">R$ 84.300,00</p>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400">Saídas Previstas</span>
                    <p className="text-base font-bold text-slate-200">R$ 39.150,00</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <p className="font-bold text-white mb-1">Importação de Extrato & Conciliação com sua Conta Atual</p>
                  <p className="text-[11px] text-slate-400">Leitura automatizada de extratos (OFX e API). O Odvix sincroniza com as contas existentes da sua empresa sem exigir troca de banco.</p>
                </div>
              </div>
            )}

            {activeModuleId === 'relatorios-dre' && (
              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Lucro Operacional (EBITDA)</span>
                    <span className="font-bold text-emerald-400">R$ 78.400,00</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Margem de Contribuição Média</span>
                    <span>42.8%</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Ponto de Equilíbrio Operacional</span>
                    <span>R$ 52.000,00</span>
                  </div>
                </div>
                <p className="text-[10px] text-sky-400 text-center font-medium">
                  Exportável em PDF de alta resolução ou Excel em 1 clique
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Odvix Differentials Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
          <Zap className="w-6 h-6 text-sky-400 mb-2" />
          <h5 className="text-sm font-bold text-white mb-1">Sem Complicação</h5>
          <p className="text-xs text-slate-400">Interface intuitiva pensada para quem não tem tempo a perder com manuais pesados.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
          <Users className="w-6 h-6 text-sky-400 mb-2" />
          <h5 className="text-sm font-bold text-white mb-1">Suporte Humanizado</h5>
          <p className="text-xs text-slate-400">Atendimento ágil por especialistas reais via WhatsApp, sem robôs intermináveis.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
          <Server className="w-6 h-6 text-sky-400 mb-2" />
          <h5 className="text-sm font-bold text-white mb-1">100% em Nuvem</h5>
          <p className="text-xs text-slate-400">Backups diários automáticos, acessível de qualquer computador ou celular com total segurança.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
          <Smartphone className="w-6 h-6 text-sky-400 mb-2" />
          <h5 className="text-sm font-bold text-white mb-1">Implantação Rápida</h5>
          <p className="text-xs text-slate-400">Migração assistida dos seus dados de planilhas ou sistemas antigos em poucos dias.</p>
        </div>
      </div>
    </div>
  );
}
