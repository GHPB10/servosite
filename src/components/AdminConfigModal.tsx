import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Settings, 
  Lock, 
  User, 
  LogIn, 
  LogOut, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  AlertCircle, 
  Video, 
  Clock, 
  Link2, 
  Sparkles, 
  Eye, 
  Save, 
  RotateCcw,
  ShieldCheck,
  Send,
  Table,
  ExternalLink,
  Zap,
  Copy,
  Palette,
  Upload,
  Globe,
  Layers,
  Type
} from 'lucide-react';
import { BannerItem, INITIAL_BANNERS } from '../types/banner';
import { useContent } from '../context/ContentContext';
import { 
  APPS_SCRIPT_TEMPLATE, 
  sendLeadViaWebhook, 
  getActiveWebhookUrl,
  DEFAULT_SPREADSHEET_ID, 
  DEFAULT_SHEET_TAB_NAME 
} from '../services/googleSheets';
import { 
  BrandingConfig, 
  DEFAULT_BRANDING, 
  DEFAULT_FAVICON_SVG 
} from '../types/branding';

interface AdminConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  banners: BannerItem[];
  onSaveBanners: (newBanners: BannerItem[]) => void;
  spreadsheetId: string;
  sheetTabName: string;
  webhookUrl: string;
  onConfigChange: (id: string, tab: string, newWebhookUrl?: string) => void;
  branding: BrandingConfig;
  onSaveBranding: (newBranding: BrandingConfig) => void;
}

// Master Admin Credentials
const MASTER_EMAIL = 'gabrielhpbrunetti@gmail.com';
const MASTER_PASSWORD = '!Carros123';

export function AdminConfigModal({
  isOpen,
  onClose,
  banners,
  onSaveBanners,
  spreadsheetId,
  sheetTabName,
  webhookUrl,
  onConfigChange,
  branding,
  onSaveBranding
}: AdminConfigModalProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('servotech_admin_auth') === 'true';
  });
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab: 'banners' | 'sheets' | 'branding' | 'texts'
  const [activeTab, setActiveTab] = useState<'banners' | 'sheets' | 'branding' | 'texts'>('banners');

  // Content Context for text management
  const { 
    content: dynamicTexts, 
    exportAllTextsJson, 
    importAllTextsJson, 
    resetAllTexts: resetContentTexts 
  } = useContent();
  const [textImportInput, setTextImportInput] = useState('');
  const [textSaveStatus, setTextSaveStatus] = useState('');
  const [copiedTexts, setCopiedTexts] = useState(false);

  // Banners local edit state
  const [localBanners, setLocalBanners] = useState<BannerItem[]>(banners);
  const [bannerSaveStatus, setBannerSaveStatus] = useState<string>('');

  // Sheets local edit state
  const [localWebhook, setLocalWebhook] = useState(webhookUrl);
  const [localSpreadsheetId, setLocalSpreadsheetId] = useState(spreadsheetId);
  const [localSheetTab, setLocalSheetTab] = useState(sheetTabName);
  const [copiedScript, setCopiedScript] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [sheetsSaveStatus, setSheetsSaveStatus] = useState<string>('');

  // Branding local edit state
  const [localBranding, setLocalBranding] = useState<BrandingConfig>(branding || DEFAULT_BRANDING);
  const [brandingSaveStatus, setBrandingSaveStatus] = useState<string>('');
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const faviconFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalBanners(banners);
  }, [banners]);

  useEffect(() => {
    if (branding) {
      setLocalBranding(branding);
    }
  }, [branding, isOpen]);

  useEffect(() => {
    setLocalWebhook(getActiveWebhookUrl(webhookUrl));
    setLocalSpreadsheetId(spreadsheetId || DEFAULT_SPREADSHEET_ID);
    setLocalSheetTab(sheetTabName || DEFAULT_SHEET_TAB_NAME);
  }, [webhookUrl, spreadsheetId, sheetTabName, isOpen]);

  if (!isOpen) return null;

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPassword = passwordInput.trim();

    if (cleanEmail === MASTER_EMAIL.toLowerCase() && cleanPassword === MASTER_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('servotech_admin_auth', 'true');
      setEmailInput('');
      setPasswordInput('');
    } else {
      setAuthError('E-mail ou senha de administrador incorretos.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('servotech_admin_auth');
  };

  // Banner Actions
  const handleAddBanner = () => {
    const newBanner: BannerItem = {
      id: `banner-${Date.now()}`,
      type: 'image',
      title: 'Novo Banner Destaque',
      subtitle: 'Descrição rápida da solução ou diferencial da Servo Tech.',
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1920&q=80',
      linkUrl: '#contato',
      buttonText: 'Fale Conosco',
      durationSeconds: 5,
      active: true,
      order: localBanners.length + 1
    };
    setLocalBanners([...localBanners, newBanner]);
  };

  const handleUpdateBanner = (id: string, updates: Partial<BannerItem>) => {
    setLocalBanners(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm('Deseja realmente remover este banner?')) {
      setLocalBanners(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleMoveBanner = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= localBanners.length) return;

    const updated = [...localBanners];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setLocalBanners(updated);
  };

  const handleSaveAllBanners = () => {
    onSaveBanners(localBanners);
    setBannerSaveStatus('Banners atualizados com sucesso!');
    setTimeout(() => setBannerSaveStatus(''), 3000);
  };

  const handleResetDefaultBanners = () => {
    if (confirm('Restaurar os 3 banners padrões originais da Servo Tech?')) {
      setLocalBanners(INITIAL_BANNERS);
      onSaveBanners(INITIAL_BANNERS);
      setBannerSaveStatus('Banners padrões restaurados!');
      setTimeout(() => setBannerSaveStatus(''), 3000);
    }
  };

  // Google Sheets Actions
  const handleCopyScript = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  const handleSaveSheetsConfig = () => {
    let cleanId = localSpreadsheetId.trim();
    const match = cleanId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      cleanId = match[1];
    }
    const cleanTab = localSheetTab.trim() || 'site';
    const cleanWebhook = localWebhook.trim();

    onConfigChange(cleanId, cleanTab, cleanWebhook);
    setSheetsSaveStatus('Configuração do Google Sheets salva!');
    setTimeout(() => setSheetsSaveStatus(''), 3000);
  };

  const handleTestWebhook = async () => {
    const url = localWebhook.trim();
    if (!url) {
      setTestResult({ success: false, message: 'Insira a URL do Webhook do Google Apps Script antes de testar.' });
      return;
    }

    setTestingWebhook(true);
    setTestResult(null);

    try {
      await sendLeadViaWebhook(url, {
        nome: 'Lead Teste Master - Servo Tech',
        empresa: 'Empresa Teste Master',
        email: MASTER_EMAIL,
        telefone: '(11) 99999-9999',
        solucaoOuAssunto: 'Validação pelo Painel de Configurações',
        mensagemOuFaturamento: 'Teste executado pelo painel administrativo seguro.',
        origem: 'Modal Diagnóstico'
      });

      handleSaveSheetsConfig();

      setTestResult({
        success: true,
        message: 'Lead de teste gravado na aba "site" com sucesso!'
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err?.message || 'Falha ao testar Webhook.'
      });
    } finally {
      setTestingWebhook(false);
    }
  };

  // Branding Handlers
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setLocalBranding(prev => ({
          ...prev,
          logoImageUrl: result
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      alert('O favicon deve ter no máximo 1MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setLocalBranding(prev => ({
          ...prev,
          faviconUrl: result
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAllBranding = () => {
    onSaveBranding(localBranding);
    setBrandingSaveStatus('Logomarca e Favicon salvos com sucesso!');
    setTimeout(() => setBrandingSaveStatus(''), 3500);
  };

  const handleResetDefaultBranding = () => {
    if (confirm('Deseja restaurar a logomarca e o favicon padrões originais da Servo Tech?')) {
      setLocalBranding(DEFAULT_BRANDING);
      onSaveBranding(DEFAULT_BRANDING);
      setBrandingSaveStatus('Identidade padrão da Servo Tech restaurada!');
      setTimeout(() => setBrandingSaveStatus(''), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative text-white my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Painel de Configurações</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30 uppercase">
                  Exclusivo ADM
                </span>
              </h3>
              <p className="text-xs text-slate-400">Banners de Início, Planilha de Leads & Identidade Visual</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Sair do modo administrador"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Desconectar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Authenticated: Show Quick Master Login */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-white">Acesso Restrito ao Administrador</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Este ambiente é reservado para gerenciar os slides da página inicial e a conexão com a planilha de leads.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  E-mail do Administrador
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="gabrielhpbrunetti@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-sky-400" />
                  Senha de Acesso
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none"
                  required
                />
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Entrar no Painel</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated: Management Workspace */
          <div className="flex flex-col">
            {/* Tabs Selector */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-950/60 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab('banners')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'banners'
                    ? 'border-sky-500 text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Banners & Slides ({localBanners.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sheets')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'sheets'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Integração Google Sheets</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('branding')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'branding'
                    ? 'border-sky-400 text-sky-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Logomarca & Favicon</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('texts')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'texts'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Type className="w-4 h-4" />
                <span>Textos do Site ({Object.keys(dynamicTexts).length})</span>
              </button>
            </div>

            {/* TAB 1: BANNERS MANAGEMENT */}
            {activeTab === 'banners' && (
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-sky-400" />
                      <span>Gerenciador de Slides da Página Inicial</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Adicione quantos banners ou vídeos quiser e defina individualmente o tempo (em segundos) que cada slide fica na tela.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddBanner}
                      className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-sky-500/20"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar Slide</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetDefaultBanners}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      title="Restaurar os 3 banners padrões"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Padrões</span>
                    </button>
                  </div>
                </div>

                {bannerSaveStatus && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{bannerSaveStatus}</span>
                  </div>
                )}

                {/* Banner Cards List */}
                <div className="space-y-4">
                  {localBanners.map((banner, index) => (
                    <div 
                      key={banner.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        banner.active 
                          ? 'bg-slate-950 border-slate-800 hover:border-slate-700' 
                          : 'bg-slate-950/40 border-slate-900 opacity-60'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row gap-4">
                        {/* Media Preview Thumbnail */}
                        <div className="w-full lg:w-48 h-32 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden relative shrink-0 flex items-center justify-center">
                          {banner.type === 'video' ? (
                            <video
                              src={banner.url}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                            />
                          ) : (
                            <img
                              src={banner.url}
                              alt={banner.title || 'Preview'}
                              className="w-full h-full object-cover"
                              onError={(e: any) => {
                                e.target.src = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80';
                              }}
                            />
                          )}

                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 text-[10px] font-bold text-sky-400 border border-slate-700 backdrop-blur-sm flex items-center gap-1">
                            {banner.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                            <span>Slide #{index + 1}</span>
                          </span>

                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 text-[10px] font-bold text-amber-300 border border-slate-700 backdrop-blur-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{banner.durationSeconds}s</span>
                          </span>
                        </div>

                        {/* Banner Fields Form */}
                        <div className="flex-grow space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                                Título do Slide
                              </label>
                              <input
                                type="text"
                                value={banner.title || ''}
                                onChange={(e) => handleUpdateBanner(banner.id, { title: e.target.value })}
                                placeholder="Título chamativo"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                                Texto do Botão (CTA)
                              </label>
                              <input
                                type="text"
                                value={banner.buttonText || ''}
                                onChange={(e) => handleUpdateBanner(banner.id, { buttonText: e.target.value })}
                                placeholder="Ex: Solicitar Diagnóstico"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                              Subtítulo / Descrição
                            </label>
                            <input
                              type="text"
                              value={banner.subtitle || ''}
                              onChange={(e) => handleUpdateBanner(banner.id, { subtitle: e.target.value })}
                              placeholder="Breve texto descritivo"
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center justify-between">
                                <span>URL da Mídia (Imagem ou Vídeo MP4/WebM)</span>
                                <span className="text-[10px] text-sky-400">Link direto</span>
                              </label>
                              <input
                                type="text"
                                value={banner.url}
                                onChange={(e) => handleUpdateBanner(banner.id, { url: e.target.value })}
                                placeholder="https://..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                                Tipo de Mídia
                              </label>
                              <select
                                value={banner.type}
                                onChange={(e) => handleUpdateBanner(banner.id, { type: e.target.value as 'image' | 'video' })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-sky-500 focus:outline-none"
                              >
                                <option value="image">Imagem</option>
                                <option value="video">Vídeo</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-amber-400" />
                                <span>Duração no Slide</span>
                              </label>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="number"
                                  min="2"
                                  max="60"
                                  value={banner.durationSeconds}
                                  onChange={(e) => handleUpdateBanner(banner.id, { durationSeconds: Number(e.target.value) || 5 })}
                                  className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white text-center focus:border-sky-500 focus:outline-none font-bold"
                                />
                                <span className="text-xs text-slate-400">segundos</span>
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                                <Link2 className="w-3 h-3 text-sky-400" />
                                <span>Ação ao Clicar (#bpo, #erp, #contato ou Link)</span>
                              </label>
                              <input
                                type="text"
                                value={banner.linkUrl || ''}
                                onChange={(e) => handleUpdateBanner(banner.id, { linkUrl: e.target.value })}
                                placeholder="#contato ou https://..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Controls: Reorder, Active Toggle, Delete */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={banner.active}
                                onChange={(e) => handleUpdateBanner(banner.id, { active: e.target.checked })}
                                className="w-4 h-4 rounded text-sky-500 focus:ring-0 focus:ring-offset-0 bg-slate-900 border-slate-700"
                              />
                              <span className="text-xs font-semibold text-slate-300">
                                {banner.active ? 'Slide Ativo no Carrossel' : 'Slide Oculto'}
                              </span>
                            </label>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleMoveBanner(index, 'up')}
                                disabled={index === 0}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                                title="Mover para cima"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveBanner(index, 'down')}
                                disabled={index === localBanners.length - 1}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                                title="Mover para baixo"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteBanner(banner.id)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 cursor-pointer ml-2"
                                title="Remover este slide"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveAllBanners}
                    className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Alterações nos Banners</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: GOOGLE SHEETS MANAGEMENT */}
            {activeTab === 'sheets' && (
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Integração Ativa e Segura com o Google Sheets</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Os formulários do site gravam diretamente na aba <strong>site</strong> da sua planilha através do Webhook do Google Apps Script. 
                    Nenhum visitante precisa de conta Google nem autorização.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Webhook do Apps Script
                      </h4>
                    </div>
                    <a
                      href={`https://docs.google.com/spreadsheets/d/${localSpreadsheetId}/edit`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      <span>Abrir Planilha no Google</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-emerald-400" />
                      URL do Webhook (termina em /exec)
                    </label>
                    <input
                      type="text"
                      value={localWebhook}
                      onChange={(e) => setLocalWebhook(e.target.value)}
                      placeholder="https://script.google.com/macros/s/.../exec"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                        <Table className="w-3.5 h-3.5 text-sky-400" />
                        ID da Planilha
                      </label>
                      <input
                        type="text"
                        value={localSpreadsheetId}
                        onChange={(e) => setLocalSpreadsheetId(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                        <Table className="w-3.5 h-3.5 text-sky-400" />
                        Nome da Aba
                      </label>
                      <input
                        type="text"
                        value={localSheetTab}
                        onChange={(e) => setLocalSheetTab(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={handleTestWebhook}
                      disabled={testingWebhook || !localWebhook.trim()}
                      className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{testingWebhook ? 'Testando envio...' : 'Enviar Lead de Teste para a Planilha'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveSheetsConfig}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Salvar Configurações
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyScript}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <Copy className="w-3.5 h-3.5 text-sky-400" />
                      <span>{copiedScript ? 'Script Copiado!' : 'Copiar Script Google'}</span>
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

                  {sheetsSaveStatus && (
                    <div className="p-3 rounded-xl text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{sheetsSaveStatus}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: BRANDING & FAVICON MANAGEMENT */}
            {activeTab === 'branding' && (
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Header card */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Palette className="w-4 h-4 text-sky-400" />
                      <span>Personalização de Logomarca & Favicon</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Atualize a logomarca do cabeçalho e rodapé e o favicon da aba do navegador em tempo real.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveAllBranding}
                      className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-sky-500/20"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Salvar Alterações</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetDefaultBranding}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Restaurar padrões originais da marca"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restaurar Padrões</span>
                    </button>
                  </div>
                </div>

                {brandingSaveStatus && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{brandingSaveStatus}</span>
                  </div>
                )}

                {/* 1. SEÇÃO LOGOMARCA PRINCIPAL */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white">Logomarca Principal (Cabeçalho & Rodapé)</h5>
                        <p className="text-[11px] text-slate-400">Escolha exibir uma imagem completa ou ícone com tipografia personalizada</p>
                      </div>
                    </div>

                    {/* Mode switcher */}
                    <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setLocalBranding(prev => ({ ...prev, logoType: 'image' }))}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          localBranding.logoType === 'image'
                            ? 'bg-sky-500 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Imagem Completa
                      </button>
                      <button
                        type="button"
                        onClick={() => setLocalBranding(prev => ({ ...prev, logoType: 'icon' }))}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          localBranding.logoType === 'icon'
                            ? 'bg-sky-500 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Ícone + Texto
                      </button>
                    </div>
                  </div>

                  {/* Upload Image Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-sky-400" />
                        Upload de Imagem da Logomarca
                      </label>
                      <input
                        type="file"
                        ref={logoFileInputRef}
                        onChange={handleLogoFileUpload}
                        accept="image/png,image/jpeg,image/svg+xml,image/webp"
                        className="hidden"
                      />
                      <div 
                        onClick={() => logoFileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-700 hover:border-sky-500 bg-slate-900/60 hover:bg-slate-900 rounded-xl p-4 text-center cursor-pointer transition-colors"
                      >
                        <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                        <p className="text-xs font-semibold text-slate-200">Clique para enviar arquivo</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">PNG, SVG, JPG ou WebP (máx. 3MB)</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Link2 className="w-3.5 h-3.5 text-sky-400" />
                        Ou URL direta da Imagem
                      </label>
                      <input
                        type="url"
                        value={localBranding.logoImageUrl}
                        onChange={(e) => setLocalBranding(prev => ({ ...prev, logoImageUrl: e.target.value }))}
                        placeholder="https://exemplo.com/minha-logomarca.png"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                      />
                      {localBranding.logoImageUrl && (
                        <div className="mt-2 flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <img 
                              src={localBranding.logoImageUrl} 
                              alt="Prévia" 
                              className="h-8 max-w-[80px] object-contain bg-slate-950 p-1 rounded border border-slate-800"
                            />
                            <span className="text-[11px] text-emerald-400 font-semibold truncate">Imagem carregada</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setLocalBranding(prev => ({ ...prev, logoImageUrl: '' }))}
                            className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                            title="Remover imagem"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Brand Typography settings */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1">
                        <Type className="w-3 h-3 text-sky-400" />
                        Prefixo da Marca
                      </label>
                      <input
                        type="text"
                        value={localBranding.brandNamePrefix}
                        onChange={(e) => setLocalBranding(prev => ({ ...prev, brandNamePrefix: e.target.value }))}
                        placeholder="SERVO"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1">
                        <Type className="w-3 h-3 text-sky-400" />
                        Sufixo da Marca (Destaque Azul)
                      </label>
                      <input
                        type="text"
                        value={localBranding.brandNameSuffix}
                        onChange={(e) => setLocalBranding(prev => ({ ...prev, brandNameSuffix: e.target.value }))}
                        placeholder="TECH"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-sky-400 focus:outline-none focus:border-sky-500 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1">
                        <Type className="w-3 h-3 text-sky-400" />
                        Subtítulo da Marca
                      </label>
                      <input
                        type="text"
                        value={localBranding.brandSubtitle}
                        onChange={(e) => setLocalBranding(prev => ({ ...prev, brandSubtitle: e.target.value }))}
                        placeholder="Soluções em Tecnologia"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  {/* Previews da Logomarca */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Pré-visualização da Logomarca no Site:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Navbar Preview */}
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                        <span className="text-[10px] text-slate-500 block mb-2 font-semibold">Cabeçalho (Navbar):</span>
                        <div className="h-12 bg-slate-900/90 border border-slate-800 rounded-lg px-3 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {localBranding.logoType === 'image' && localBranding.logoImageUrl ? (
                              <img 
                                src={localBranding.logoImageUrl} 
                                alt="Logo" 
                                className="h-8 max-w-[140px] object-contain"
                              />
                            ) : (
                              <>
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center text-white shrink-0 overflow-hidden shadow-sm">
                                  {localBranding.logoImageUrl ? (
                                    <img src={localBranding.logoImageUrl} alt="Ícone" className="w-full h-full object-cover" />
                                  ) : (
                                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 stroke-current stroke-2">
                                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs font-black text-white leading-none">
                                    {localBranding.brandNamePrefix || 'SERVO'}
                                    <span className="text-sky-400">{localBranding.brandNameSuffix !== undefined ? localBranding.brandNameSuffix : 'TECH'}</span>
                                  </span>
                                  <span className="text-[8px] text-slate-400 font-semibold uppercase mt-0.5 leading-none">
                                    {localBranding.brandSubtitle || 'Soluções em Tecnologia'}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">menu • contatos</span>
                        </div>
                      </div>

                      {/* Footer Preview */}
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                        <span className="text-[10px] text-slate-500 block mb-2 font-semibold">Rodapé (Footer):</span>
                        <div className="h-12 bg-slate-900/90 border border-slate-800 rounded-lg px-3 flex items-center">
                          <div className="flex items-center gap-2.5">
                            {localBranding.logoType === 'image' && localBranding.logoImageUrl ? (
                              <img 
                                src={localBranding.logoImageUrl} 
                                alt="Logo" 
                                className="h-8 max-w-[140px] object-contain"
                              />
                            ) : (
                              <>
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center text-white shrink-0 overflow-hidden shadow-sm">
                                  {localBranding.logoImageUrl ? (
                                    <img src={localBranding.logoImageUrl} alt="Ícone" className="w-full h-full object-cover" />
                                  ) : (
                                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 stroke-current stroke-2">
                                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs font-black text-white leading-none">
                                    {localBranding.brandNamePrefix || 'SERVO'}
                                    <span className="text-sky-400">{localBranding.brandNameSuffix !== undefined ? localBranding.brandNameSuffix : 'TECH'}</span>
                                  </span>
                                  <span className="text-[8px] text-sky-400 font-semibold mt-0.5 leading-none">
                                    {localBranding.brandSubtitle || 'Soluções em Tecnologia'}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. SEÇÃO FAVICON DO NAVEGADOR ("FIVECOIN") */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white">Favicon do Navegador (Ícone da Aba)</h5>
                        <p className="text-[11px] text-slate-400">O pequeno ícone exibido na aba do navegador, favoritos e atalhos de tela</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLocalBranding(prev => ({ ...prev, faviconUrl: DEFAULT_FAVICON_SVG }))}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-500 text-sky-400 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Ícone Padrão Servo Tech</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-blue-400" />
                        Upload de Novo Favicon
                      </label>
                      <input
                        type="file"
                        ref={faviconFileInputRef}
                        onChange={handleFaviconFileUpload}
                        accept="image/x-icon,image/png,image/svg+xml,image/jpeg"
                        className="hidden"
                      />
                      <div 
                        onClick={() => faviconFileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-900/60 hover:bg-slate-900 rounded-xl p-4 text-center cursor-pointer transition-colors"
                      >
                        <Globe className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                        <p className="text-xs font-semibold text-slate-200">Clique para enviar Favicon</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">ICO, PNG, SVG ou JPG (máx. 1MB)</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Link2 className="w-3.5 h-3.5 text-blue-400" />
                        Ou URL direta do Favicon
                      </label>
                      <input
                        type="url"
                        value={localBranding.faviconUrl}
                        onChange={(e) => setLocalBranding(prev => ({ ...prev, faviconUrl: e.target.value }))}
                        placeholder="https://exemplo.com/favicon.ico"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono text-[11px]"
                      />
                      <p className="text-[10px] text-slate-500 mt-1.5">
                        Dica: Recomendamos imagens quadradas (32x32 ou 64x64) com fundo transparente ou sólido.
                      </p>
                    </div>
                  </div>

                  {/* Browser Tab Simulation Preview */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Simulação Real da Aba do Navegador:
                    </span>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        {/* Tab header simulated */}
                        <div className="flex items-center gap-2 bg-slate-950 border-t-2 border-t-sky-500 border-x border-slate-800 rounded-t-xl px-3.5 py-2 max-w-sm shadow-md">
                          <img
                            src={localBranding.faviconUrl || DEFAULT_FAVICON_SVG}
                            alt="Favicon"
                            className="w-4 h-4 rounded-sm object-contain shrink-0"
                            onError={(e: any) => {
                              e.target.src = DEFAULT_FAVICON_SVG;
                            }}
                          />
                          <span className="text-xs text-slate-200 font-medium truncate">
                            Servo Tech — BPO Financeiro & Softwares
                          </span>
                          <span className="text-slate-500 text-xs ml-auto pl-2">×</span>
                        </div>
                        <div className="w-6 h-6 rounded-md bg-slate-800/50 flex items-center justify-center text-slate-500 text-xs">
                          +
                        </div>
                      </div>
                      <div className="h-6 bg-slate-950 border border-slate-800 rounded-b-lg mt-0 px-3 flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>https://servotech.com.br</span>
                      </div>
                    </div>
                  </div>

                  {/* Save button footer */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleSaveAllBranding}
                      className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Salvar Logomarca & Favicon</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetDefaultBranding}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Restaurar Padrões da Marca
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: TEXTS & CONTENT MANAGEMENT */}
            {activeTab === 'texts' && (
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Type className="w-4 h-4 text-amber-400" />
                    <span>Sincronizador de Textos Editados do Site</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Você pode exportar todos os textos que foram personalizados pelo modo de edição visual, copiar para colar no chat para gravar no código fonte permanente, ou importar em outro navegador.
                  </p>
                </div>

                {textSaveStatus && (
                  <div className="p-3 rounded-xl text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{textSaveStatus}</span>
                  </div>
                )}

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Exportar Textos Editados ({Object.keys(dynamicTexts).length} itens modificados)
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(exportAllTextsJson());
                          setCopiedTexts(true);
                          setTimeout(() => setCopiedTexts(false), 3000);
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedTexts ? 'Textos Copiados!' : 'Copiar Todos os Textos (JSON)'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Deseja restaurar todos os textos do site para os valores de fábrica?')) {
                            resetContentTexts();
                            setTextSaveStatus('Textos restaurados para os padrões originais!');
                            setTimeout(() => setTextSaveStatus(''), 3000);
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
                        title="Restaurar textos de fábrica"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Visualização do Dicionário de Textos (JSON)
                    </label>
                    <textarea
                      readOnly
                      value={exportAllTextsJson()}
                      rows={6}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-mono text-amber-200 focus:outline-none"
                    />
                  </div>

                  {/* Import section */}
                  <div className="pt-3 border-t border-slate-800 space-y-3">
                    <label className="block text-xs font-bold text-white flex items-center gap-2">
                      <Upload className="w-4 h-4 text-sky-400" />
                      <span>Importar Textos de outro Navegador</span>
                    </label>
                    <textarea
                      value={textImportInput}
                      onChange={(e) => setTextImportInput(e.target.value)}
                      placeholder='Cole aqui o JSON copiado de outro navegador...'
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const ok = importAllTextsJson(textImportInput);
                        if (ok) {
                          setTextImportInput('');
                          setTextSaveStatus('Textos importados e aplicados com sucesso!');
                          setTimeout(() => setTextSaveStatus(''), 3000);
                        } else {
                          alert('Formato JSON inválido. Verifique o conteúdo colado.');
                        }
                      }}
                      disabled={!textImportInput.trim()}
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs disabled:opacity-40 cursor-pointer"
                    >
                      Aplicar JSON no Site
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Logado como: <strong className="text-sky-400">{MASTER_EMAIL}</strong>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Fechar Painel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
