import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2, User, Mail, Phone, FileSpreadsheet, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { recordLeadToSheet, sendLeadViaWebhook, getActiveWebhookUrl, DEFAULT_SPREADSHEET_ID } from '../services/googleSheets';
import { getAccessToken } from '../services/googleAuth';

interface LeadModalProps {
  isOpen: boolean;
  initialTopic?: string;
  spreadsheetId?: string;
  sheetTabName?: string;
  webhookUrl?: string;
  onOpenSheetsConfig?: () => void;
  onClose: () => void;
}

export function LeadModal({ 
  isOpen, 
  initialTopic = 'BPO Financeiro', 
  spreadsheetId = DEFAULT_SPREADSHEET_ID,
  sheetTabName = 'site',
  webhookUrl = '',
  onOpenSheetsConfig,
  onClose 
}: LeadModalProps) {
  const [nome, setNome] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [faturamento, setFaturamento] = useState('R$ 50 mil a R$ 200 mil');
  const [solucao, setSolucao] = useState(initialTopic);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sheetSaved, setSheetSaved] = useState(false);

  useEffect(() => {
    if (initialTopic) {
      setSolucao(initialTopic);
    }
  }, [initialTopic]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      nome,
      empresa,
      email,
      telefone,
      solucaoOuAssunto: solucao,
      mensagemOuFaturamento: `Faturamento médio: ${faturamento}`,
      origem: 'Modal Diagnóstico' as const
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
    } catch (sheetErr) {
      console.warn('Não foi possível gravar automaticamente no Google Sheets:', sheetErr);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setNome('');
    setEmpresa('');
    setEmail('');
    setTelefone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-sky-500/20 via-blue-600/20 to-sky-500/20 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500 text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Análise & Demonstração Gratuita</h3>
              <p className="text-xs text-sky-300">Resposta em até 15 minutos em horário comercial</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Solicitação Recebida com Sucesso!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Olá, <span className="text-sky-400 font-semibold">{nome}</span>. Nosso consultor sênior entrará em contato pelo WhatsApp <span className="text-white font-medium">{telefone}</span> para apresentar a proposta sob medida para a <span className="text-white font-medium">{empresa || 'sua empresa'}</span>.
              </p>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-left text-slate-300 space-y-1.5">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  Próximos passos imediatos:
                </p>
                <p>1. Diagnóstico do seu fluxo de caixa e rotinas atuais</p>
                <p>2. Simulação de economia real vs. contratação interna</p>
                <p>3. Demonstração guiada das plataformas Odvix e CRM</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Ol%C3%A1%2C%20acabei%20de%20solicitar%20um%20diagn%C3%B3stico%20no%20site%20para%20minha%20empresa%20${encodeURIComponent(empresa)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <span>Abrir Conversa Direta no WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
                >
                  Concluir
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Solução de Interesse Principal
                </label>
                <select
                  value={solucao}
                  onChange={(e) => setSolucao(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="BPO Financeiro Completo">BPO Financeiro (Terceirização da Operação)</option>
                  <option value="Odvix ERP">Odvix ERP (Controle de Estoque, Vendas e NFs)</option>
                  <option value="Servo CRM">Servo CRM (Funil de Vendas e Oportunidades)</option>
                  <option value="Combo BPO + Softwares">Combo Completo (BPO + ERP + CRM)</option>
                  <option value="Diagnóstico Financeiro Gratuito">Diagnóstico Financeiro Gratuito</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-sky-400" />
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Carlos Eduardo"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-sky-400" />
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    required
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    placeholder="Ex: Nova Aliança Comércio"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    E-mail Corporativo
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-sky-400" />
                    WhatsApp
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
                  Faturamento Médio Mensal (para cálculo da dimensão)
                </label>
                <select
                  value={faturamento}
                  onChange={(e) => setFaturamento(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Até R$ 50 mil">Até R$ 50 mil / mês</option>
                  <option value="R$ 50 mil a R$ 200 mil">R$ 50 mil a R$ 200 mil / mês</option>
                  <option value="R$ 200 mil a R$ 500 mil">R$ 200 mil a R$ 500 mil / mês</option>
                  <option value="R$ 500 mil a R$ 2 milhões">R$ 500 mil a R$ 2 milhões / mês</option>
                  <option value="Acima de R$ 2 milhões">Acima de R$ 2 milhões / mês</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm tracking-wide shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {loading ? (
                    <span>Processando envio seguro...</span>
                  ) : (
                    <>
                      <span>Quero Minha Análise e Proposta</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                Seus dados estão 100% seguros. Não enviamos spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
