import React, { useState } from 'react';
import { INITIAL_CRM_STAGES } from '../data/content';
import { CrmStage } from '../types';
import { 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  DollarSign, 
  MessageSquare, 
  PhoneCall, 
  Clock, 
  Tag, 
  CheckCircle2, 
  Kanban,
  Sparkles,
  TrendingUp,
  UserCheck
} from 'lucide-react';

interface CrmKanbanDemoProps {
  onOpenConsultation: (topic?: string) => void;
}

export function CrmKanbanDemo({ onOpenConsultation }: CrmKanbanDemoProps) {
  const [stages, setStages] = useState<CrmStage[]>(INITIAL_CRM_STAGES);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>('5');
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadValue, setNewLeadValue] = useState('25000');
  const [showAddForm, setShowAddForm] = useState(false);

  // Calculate total pipeline value
  const totalPipeline = stages.reduce((acc, stage) => {
    return acc + stage.leads.reduce((sAcc, l) => sAcc + l.value, 0);
  }, 0);

  const totalLeadsCount = stages.reduce((acc, stage) => acc + stage.leads.length, 0);

  // Move a lead to the next stage
  const handleMoveLead = (leadId: string, direction: 'forward' | 'backward') => {
    setStages(prevStages => {
      let movedLead: any = null;
      let fromStageIdx = -1;

      // Find the lead
      prevStages.forEach((stage, sIdx) => {
        const found = stage.leads.find(l => l.id === leadId);
        if (found) {
          movedLead = found;
          fromStageIdx = sIdx;
        }
      });

      if (!movedLead || fromStageIdx === -1) return prevStages;

      const targetStageIdx = direction === 'forward' ? fromStageIdx + 1 : fromStageIdx - 1;
      if (targetStageIdx < 0 || targetStageIdx >= prevStages.length) return prevStages;

      return prevStages.map((stage, idx) => {
        if (idx === fromStageIdx) {
          return {
            ...stage,
            leads: stage.leads.filter(l => l.id !== leadId)
          };
        }
        if (idx === targetStageIdx) {
          return {
            ...stage,
            leads: [movedLead, ...stage.leads]
          };
        }
        return stage;
      });
    });
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;

    const newLead = {
      id: Date.now().toString(),
      company: newLeadName,
      contact: 'Novo Contato',
      value: parseFloat(newLeadValue) || 20000,
      daysInStage: 0,
      source: 'WhatsApp Web',
      tags: ['Oportunidade', 'Demo']
    };

    setStages(prev => prev.map((s, idx) => idx === 0 ? { ...s, leads: [newLead, ...s.leads] } : s));
    setNewLeadName('');
    setShowAddForm(false);
  };

  // Find selected lead for details
  const allLeads = stages.flatMap(s => s.leads);
  const activeLead = allLeads.find(l => l.id === selectedLeadId) || allLeads[0];

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  };

  return (
    <div id="crm-kanban-board" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6">
      {/* Top Banner with Metrics & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
              <Kanban className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold text-sky-400 tracking-wider">
              Demonstração Interativa do Funil
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Pipeline de Vendas em Tempo Real (Kanban)
          </h3>
          <p className="text-xs text-slate-400">
            Arraste ou clique nas setas para avançar as oportunidades de venda até o fechamento.
          </p>
        </div>

        {/* Live Metrics Header */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-800/90 border border-slate-700/80 px-4 py-2.5 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total em Negociação</span>
            <span className="text-lg font-black text-sky-400">{formatCurrency(totalPipeline)}</span>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 px-4 py-2.5 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Oportunidades Ativas</span>
            <span className="text-lg font-black text-white">{totalLeadsCount} Leads</span>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-sky-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Simular Novo Lead</span>
          </button>
        </div>
      </div>

      {/* Add Lead Mini Drawer */}
      {showAddForm && (
        <form onSubmit={handleAddLead} className="bg-slate-800/90 border border-sky-500/40 p-4 rounded-2xl flex flex-wrap items-center gap-3 animate-in fade-in duration-200">
          <input
            type="text"
            required
            placeholder="Nome da Empresa (ex: Indústria Progresso)"
            value={newLeadName}
            onChange={(e) => setNewLeadName(e.target.value)}
            className="flex-1 min-w-[200px] bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
          <input
            type="number"
            required
            placeholder="Valor Estimado (R$)"
            value={newLeadValue}
            onChange={(e) => setNewLeadValue(e.target.value)}
            className="w-36 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 cursor-pointer"
          >
            Adicionar ao Funil
          </button>
          <button
            type="button"
            onClick={() => setShowAddForm(false)}
            className="px-3 py-2 rounded-xl bg-slate-700 text-slate-300 text-xs hover:bg-slate-600"
          >
            Cancelar
          </button>
        </form>
      )}

      {/* Kanban Board Columns (Horizontal Scrollable on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto pb-2">
        {stages.map((stage, stageIdx) => {
          const stageTotal = stage.leads.reduce((acc, l) => acc + l.value, 0);

          return (
            <div
              key={stage.id}
              className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-3 flex flex-col min-w-[220px]"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700/50">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${stage.color}`}></span>
                  <h4 className="text-xs font-bold text-white tracking-wide">{stage.title}</h4>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-700 text-slate-300">
                  {stage.leads.length}
                </span>
              </div>

              <div className="text-[10px] text-slate-400 font-medium mb-3">
                Subtotal: <span className="text-white font-bold">{formatCurrency(stageTotal)}</span>
              </div>

              {/* Leads in this Stage */}
              <div className="space-y-2.5 flex-1">
                {stage.leads.length === 0 ? (
                  <div className="border border-dashed border-slate-700 rounded-xl p-4 text-center text-[11px] text-slate-400">
                    Nenhuma oportunidade aqui
                  </div>
                ) : (
                  stage.leads.map((lead) => {
                    const isSelected = selectedLeadId === lead.id;

                    return (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLeadId(lead.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-slate-800 border-sky-400 shadow-md shadow-sky-500/10 ring-1 ring-sky-400'
                            : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1 mb-1.5">
                          <p className="text-xs font-bold text-white line-clamp-1">{lead.company}</p>
                          <span className="text-[11px] font-black text-emerald-400 shrink-0">
                            {formatCurrency(lead.value)}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 mb-2">{lead.contact}</p>

                        <div className="flex flex-wrap gap-1 mb-2.5">
                          {lead.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Movement Buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                          <button
                            type="button"
                            disabled={stageIdx === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveLead(lead.id, 'backward');
                            }}
                            className={`p-1 rounded hover:bg-slate-700 ${
                              stageIdx === 0 ? 'opacity-30 cursor-not-allowed' : 'text-slate-300 hover:text-white'
                            }`}
                            title="Voltar etapa"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>

                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {lead.daysInStage === 0 ? 'Hoje' : `${lead.daysInStage}d`}
                          </span>

                          <button
                            type="button"
                            disabled={stageIdx === stages.length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveLead(lead.id, 'forward');
                            }}
                            className={`p-1 rounded hover:bg-slate-700 ${
                              stageIdx === stages.length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-sky-400 hover:text-sky-300 font-bold'
                            }`}
                            title="Avançar etapa"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Lead Activity Log Preview */}
      {activeLead && (
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Lead Selecionado:</span>
              <span className="text-sm font-black text-sky-400">{activeLead.company}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                Canal: {activeLead.source}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                3 mensagens trocadas via WhatsApp integrado
              </span>
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                Última chamada: 14 min atrás
              </span>
            </p>
          </div>

          <button
            onClick={() => onOpenConsultation(`Demonstração do Servo CRM (Funil Kanban)`)}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-sky-500/20 shrink-0"
          >
            <span>Agendar Demonstração Guiada do Servo CRM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
