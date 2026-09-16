import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { FaqSection } from '../components/FaqSection';
import { recordLeadToSheet, sendLeadViaWebhook, DEFAULT_SPREADSHEET_ID } from '../services/googleSheets';
import { getAccessToken } from '../services/googleAuth';
import { EditableText } from '../components/EditableText';
import { 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Building2, 
  Instagram, 
  Facebook, 
  Linkedin, 
  FileSpreadsheet
} from 'lucide-react';

interface ContatoSectionProps {
  onOpenConsultation: (topic?: string) => void;
  spreadsheetId?: string;
  sheetTabName?: string;
  webhookUrl?: string;
  onOpenSheetsConfig?: () => void;
}

export function ContatoSection({ 
  onOpenConsultation,
  spreadsheetId = DEFAULT_SPREADSHEET_ID,
  sheetTabName = 'site',
  webhookUrl = ''
}: ContatoSectionProps) {
  const [nome, setNome] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [assunto, setAssunto] = useState('BPO Financeiro');
  const [mensagem, setMensagem] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sheetSaved, setSheetSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      nome,
      empresa,
      email,
      telefone,
      solucaoOuAssunto: assunto,
      mensagemOuFaturamento: mensagem,
      origem: 'Formulário Contato' as const
    };

    try {
      const activeWebhook = webhookUrl || localStorage.getItem('servotech_sheets_webhook_url');
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
      console.warn('Erro ao registrar no Google Sheets:', sheetErr);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div id="contato-section" className="space-y-24 sm:space-y-32">
      {/* 1. HERO CONTATO */}
      <section className="relative pt-8 sm:pt-14 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <EditableText
                contentKey="contato_hero_badge"
                defaultText="Canais Diretos de Atendimento"
                className="text-sky-400 font-bold"
              />
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              <EditableText
                contentKey="contato_hero_title_p1"
                defaultText="Fale com a equipe da "
                className="text-white font-extrabold"
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                <EditableText
                  contentKey="contato_hero_title_hi"
                  defaultText="Servo Tech"
                  className="font-extrabold"
                />
              </span>
            </h1>

            <div className="max-w-xl mx-auto">
              <EditableText
                as="p"
                contentKey="contato_hero_subtitle"
                defaultText="Tire dúvidas sobre nossas soluções de BPO Financeiro, Odvix ERP e Servo CRM ou agende uma reunião com nossos consultores."
                className="text-sm sm:text-base text-slate-300"
                multiline
                inline={false}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2">
                <EditableText contentKey="contato_form_title" defaultText="Envie uma Mensagem" className="text-white font-bold" />
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                <EditableText
                  contentKey="contato_form_desc"
                  defaultText="Preencha o formulário e responderemos em até 15 minutos durante o horário comercial."
                  className="text-slate-400"
                />
              </p>

              {submitted ? (
                <div className="bg-slate-800/80 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Mensagem Enviada com Sucesso!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Agradecemos pelo contato, <span className="text-sky-400 font-semibold">{nome}</span>. Já encaminhamos sua solicitação sobre <span className="text-white font-medium">{assunto}</span> para nosso especialista.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMensagem('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-sky-400" />
                        Seu Nome
                      </label>
                      <input
                        type="text"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Ex: João da Silva"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-sky-400" />
                        Empresa
                      </label>
                      <input
                        type="text"
                        required
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        placeholder="Ex: Alfa Logística"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-sky-400" />
                        E-mail
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="joao@empresa.com.br"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-sky-400" />
                        WhatsApp / Telefone
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
                      Qual solução você tem interesse?
                    </label>
                    <select
                      value={assunto}
                      onChange={(e) => setAssunto(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="BPO Financeiro">BPO Financeiro (Terceirização)</option>
                      <option value="Odvix ERP">Odvix ERP (Software de Gestão)</option>
                      <option value="Servo CRM">Servo CRM (Gestão de Vendas)</option>
                      <option value="Parceria Contábil">Parceria Contábil (Programa Partner)</option>
                      <option value="Solução Integrada (BPO + ERP + CRM)">Combo Integrado (BPO + ERP + CRM)</option>
                      <option value="Outro Assunto / Dúvidas">Outro Assunto / Dúvidas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mensagem ou Detalhes da Empresa
                    </label>
                    <textarea
                      rows={3}
                      value={mensagem}
                      onChange={(e) => setMensagem(e.target.value)}
                      placeholder="Conte um pouco sobre sua operação e necessidades atuais..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    {loading ? (
                      <span>Enviando mensagem...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <EditableText contentKey="contato_btn_send" defaultText="Enviar Mensagem" className="font-bold text-slate-950" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Quick Direct Shortcuts */}
            <div className="lg:col-span-5 space-y-4">
              {/* WhatsApp Highlight Box */}
              <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40 rounded-3xl p-6 text-white space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      <EditableText contentKey="contato_wpp_title" defaultText="Atendimento Imediato" className="text-white font-bold" />
                    </h4>
                    <p className="text-xs text-emerald-300">
                      <EditableText contentKey="contato_wpp_sla" defaultText="Tempo de resposta: ~2 minutos" className="text-emerald-300" />
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  <EditableText
                    contentKey="contato_wpp_desc"
                    defaultText="Precisa de uma resposta rápida ou prefere conversar diretamente pelo WhatsApp corporativo?"
                    className="text-slate-300"
                    multiline
                  />
                </p>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20um%20consultor%20da%20Servo%20Tech.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Conversar Agora no WhatsApp ({COMPANY_INFO.whatsappDisplay})</span>
                </a>
              </div>

              {/* Company Info Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
                  <EditableText contentKey="contato_info_title" defaultText="Informações Oficiais" className="text-white font-bold" />
                </h4>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <p className="text-slate-400 text-[10px]">Telefone Fixo:</p>
                      <p className="font-semibold text-white">{COMPANY_INFO.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <p className="text-slate-400 text-[10px]">E-mail Corporativo:</p>
                      <p className="font-semibold text-white">{COMPANY_INFO.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <p className="text-slate-400 text-[10px]">Horário de Operação:</p>
                      <p className="font-semibold text-white">{COMPANY_INFO.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <p className="text-slate-400 text-[10px]">Atendimento:</p>
                      <p className="font-semibold text-white">{COMPANY_INFO.address}</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="pt-3 border-t border-slate-800">
                  <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">Redes Sociais Oficiais</p>
                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href={COMPANY_INFO.social?.instagram || 'https://instagram.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800 hover:bg-pink-950/40 hover:text-pink-400 border border-slate-700 hover:border-pink-500/40 text-slate-300 text-xs font-semibold transition-colors"
                      title="Instagram"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href={COMPANY_INFO.social?.facebook || 'https://facebook.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800 hover:bg-blue-950/40 hover:text-blue-400 border border-slate-700 hover:border-blue-500/40 text-slate-300 text-xs font-semibold transition-colors"
                      title="Facebook"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                      <span>Facebook</span>
                    </a>
                    <a
                      href={COMPANY_INFO.social?.linkedin || 'https://linkedin.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800 hover:bg-sky-950/40 hover:text-sky-400 border border-slate-700 hover:border-sky-500/40 text-slate-300 text-xs font-semibold transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Razão Social: {COMPANY_INFO.legalName} • {COMPANY_INFO.subtitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FAQ ACCORDION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqSection onOpenConsultation={onOpenConsultation} />
      </section>
    </div>
  );
}
