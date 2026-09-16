import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Sparkles, 
  X,
  AlertCircle,
  Link2,
  Table,
  Send,
  Code2,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { 
  APPS_SCRIPT_TEMPLATE, 
  sendLeadViaWebhook, 
  getActiveWebhookUrl,
  DEFAULT_WEBHOOK_URL,
  DEFAULT_SPREADSHEET_ID, 
  DEFAULT_SHEET_TAB_NAME 
} from '../services/googleSheets';

interface GoogleSheetsIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  spreadsheetId: string;
  sheetTabName: string;
  webhookUrl?: string;
  onConfigChange: (id: string, tab: string, webhookUrl?: string) => void;
}

export function GoogleSheetsIntegrationModal({
  isOpen,
  onClose,
  spreadsheetId,
  sheetTabName,
  webhookUrl = '',
  onConfigChange
}: GoogleSheetsIntegrationModalProps) {
  const [webhookInput, setWebhookInput] = useState(webhookUrl);
  const [customIdInput, setCustomIdInput] = useState(spreadsheetId || DEFAULT_SPREADSHEET_ID);
  const [customTabInput, setCustomTabInput] = useState(sheetTabName || DEFAULT_SHEET_TAB_NAME);
  const [copiedScript, setCopiedScript] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setWebhookInput(getActiveWebhookUrl(webhookUrl));
    setCustomIdInput(spreadsheetId || DEFAULT_SPREADSHEET_ID);
    setCustomTabInput(sheetTabName || DEFAULT_SHEET_TAB_NAME);
  }, [webhookUrl, spreadsheetId, sheetTabName, isOpen]);

  if (!isOpen) return null;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  const handleSave = () => {
    let cleanId = customIdInput.trim();
    const match = cleanId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      cleanId = match[1];
    }
    const cleanTab = customTabInput.trim() || 'site';
    const cleanWebhook = webhookInput.trim();

    onConfigChange(cleanId, cleanTab, cleanWebhook);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleTestWebhook = async () => {
    const url = webhookInput.trim();
    if (!url) {
      setTestResult({ success: false, message: 'Insira a URL do Webhook do Google Apps Script antes de testar.' });
      return;
    }

    setTestingWebhook(true);
    setTestResult(null);

    try {
      await sendLeadViaWebhook(url, {
        nome: 'Lead de Teste - Servo Tech',
        empresa: 'Empresa Teste Ltda',
        email: 'contato.teste@exemplo.com',
        telefone: '(11) 99999-8888',
        solucaoOuAssunto: 'Teste de Integração Webhook',
        mensagemOuFaturamento: 'Envio de validação realizado pelo painel do site.',
        origem: 'Modal Diagnóstico'
      });

      // Salva automaticamente se o teste rodou
      handleSave();

      setTestResult({
        success: true,
        message: 'Lead de teste enviado com sucesso! Verifique a aba "site" na sua planilha.'
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err?.message || 'Falha ao conectar com o Webhook. Verifique se a URL está correta.'
      });
    } finally {
      setTestingWebhook(false);
    }
  };

  const currentSheetUrl = `https://docs.google.com/spreadsheets/d/${customIdInput.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1] || customIdInput || DEFAULT_SPREADSHEET_ID}/edit`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative text-white my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-emerald-500/20 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Integração com Google Sheets</h3>
              <p className="text-xs text-emerald-300">Gravação direta na aba <strong className="text-white">{customTabInput || 'site'}</strong></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Explanation Alert */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Por que o Google bloqueou o login com o Erro 403?</span>
            </div>
            <p className="leading-relaxed text-[11px] text-amber-200/90">
              O login via tela pop-up do Google OAuth exige que o app passe por verificação do Google e que os clientes do seu site tivessem uma conta autorizada. 
              Para sites comerciais, <strong>a forma 100% livre de bloqueios recomendada é o Webhook do Google Apps Script</strong>: qualquer cliente envia o formulário e a sua própria planilha grava os dados instantaneamente 24 horas por dia!
            </p>
          </div>

          {/* Step by step guide */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Configuração Rápida (1 Minuto)
                </h4>
              </div>
              <a
                href={currentSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Abrir sua Planilha</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <ol className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-sky-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">1</span>
                <div>
                  Na sua planilha, clique no menu superior em <strong>Extensões</strong> &gt; <strong>Apps Script</strong>.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-sky-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">2</span>
                <div className="w-full space-y-2">
                  <p>Substitua qualquer código existente pelo script abaixo:</p>
                  <button
                    type="button"
                    onClick={handleCopyScript}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:bg-slate-850"
                  >
                    {copiedScript ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">Código do Script Copiado com Sucesso!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-sky-400" />
                        <span>Clique Aqui para Copiar o Código do Apps Script</span>
                      </>
                    )}
                  </button>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-sky-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">3</span>
                <div>
                  No Apps Script, clique em <strong>Implantar</strong> &gt; <strong>Nova implantação</strong>:
                  <ul className="mt-1 space-y-0.5 text-[11px] text-slate-400 pl-2 border-l border-slate-800">
                    <li>• Tipo: Selecione <strong>Aplicativo da Web</strong> (ícone de engrenagem)</li>
                    <li>• Executar como: <strong>Eu (seu e-mail)</strong></li>
                    <li>• Quem pode acessar: Selecione <strong>Qualquer pessoa</strong></li>
                    <li>• Clique no botão azul <strong>Implantar</strong> e autorize o acesso.</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-sky-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">4</span>
                <div>
                  Copie a <strong>URL do aplicativo da Web</strong> gerada e cole no campo abaixo:
                </div>
              </li>
            </ol>

            {/* Input Webhook URL */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-emerald-400" />
                URL do Webhook do Google Apps Script
              </label>
              <input
                type="text"
                value={webhookInput}
                onChange={(e) => setWebhookInput(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
              />
            </div>

            {/* Buttons Test & Save */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleTestWebhook}
                disabled={testingWebhook || !webhookInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{testingWebhook ? 'Enviando teste...' : 'Salvar e Enviar Lead de Teste'}</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Salvar URL
              </button>
            </div>

            {testResult && (
              <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                testResult.success 
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' 
                  : 'bg-red-500/10 border border-red-500/30 text-red-300'
              }`}>
                {testResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                <span>{testResult.message}</span>
              </div>
            )}

            {saveSuccess && !testResult && (
              <div className="p-3 rounded-xl text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Configuração salva com sucesso!</span>
              </div>
            )}
          </div>

          {/* Form details / Columns */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-sky-400" />
                Aba de Destino: <span className="text-emerald-400 font-mono">site</span>
              </span>
              <span className="text-[11px] text-slate-500">8 colunas mapeadas (A até H)</span>
            </div>
            <p className="text-[11px] text-slate-400">
              A cada envio no site (Diagnóstico ou Contato), uma nova linha é criada com: 
              Data/Hora, Nome do Solicitante, Empresa, E-mail, Telefone/WhatsApp, Solução/Assunto, Mensagem/Faturamento e Status: "Novo Lead".
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {webhookInput.trim() ? (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Webhook pronto para receber leads
              </span>
            ) : (
              <span className="text-slate-400">Insira a URL do Apps Script acima para ativar</span>
            )}
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs cursor-pointer"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}
