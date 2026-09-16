import { useState } from 'react';
import { FAQ_ITEMS } from '../data/content';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { EditableText } from './EditableText';

interface FaqSectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export function FaqSection({ onOpenConsultation: _onOpenConsultation }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filter, setFilter] = useState<'todos' | 'bpo' | 'erp' | 'crm' | 'geral'>('todos');

  const filteredItems = filter === 'todos' 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter(item => item.category === filter);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div id="faq-section" className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <EditableText contentKey="faq_badge" defaultText="Tira-Dúvidas" className="text-sky-400 font-bold" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          <EditableText contentKey="faq_title" defaultText="Perguntas Frequentes" className="text-white font-extrabold" />
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          <EditableText
            contentKey="faq_subtitle"
            defaultText="Entenda como funciona a segurança, contratação e rotina de atendimento da Servo Tech."
            className="text-slate-400"
          />
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'todos', label: 'Todas as Dúvidas' },
          { id: 'bpo', label: 'BPO Financeiro' },
          { id: 'erp', label: 'Odvix ERP' },
          { id: 'crm', label: 'Servo CRM' },
          { id: 'geral', label: 'Segurança & Contratação' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setFilter(tab.id as any);
              setOpenIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          const qKey = `faq_q_${item.category}_${idx}`;
          const aKey = `faq_a_${item.category}_${idx}`;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-slate-800/90 border-sky-500/50 shadow-lg shadow-sky-500/5'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="text-sm font-bold text-white tracking-wide">
                  <EditableText
                    contentKey={qKey}
                    defaultText={item.question}
                    className="text-white font-bold"
                  />
                </span>
                <div className={`p-1 rounded-full bg-slate-800 text-sky-400 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180 bg-sky-500 text-slate-950' : ''
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-150">
                  <EditableText
                    contentKey={aKey}
                    defaultText={item.answer}
                    className="text-slate-300"
                    multiline
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions banner */}
      <div className="bg-slate-800/60 border border-slate-700 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-white">
            <EditableText
              contentKey="faq_cta_title"
              defaultText="Ainda tem alguma dúvida específica sobre o seu negócio?"
              className="text-white font-bold"
            />
          </h4>
          <p className="text-xs text-slate-400">
            <EditableText
              contentKey="faq_cta_subtitle"
              defaultText="Nossa equipe de consultores pode esclarecer tudo em 5 minutos."
              className="text-slate-400"
            />
          </p>
        </div>
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Ol%C3%A1%2C%20estava%20olhando%20o%20site%20da%20Servo%20Tech%20e%20fiquei%20com%20uma%20d%C3%BAvida.`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shrink-0 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <EditableText contentKey="faq_cta_btn" defaultText="Tirar Dúvida no WhatsApp" className="text-slate-950 font-bold" />
        </a>
      </div>
    </div>
  );
}
