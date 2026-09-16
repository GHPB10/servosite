import { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { MessageCircle, X } from 'lucide-react';

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20com%20um%20consultor%20da%20Servo%20Tech%20sobre%20BPO%20Financeiro%20e%20Softwares.`;

  return (
    <div id="floating-whatsapp-container" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="mb-3 p-3 bg-slate-900 border border-sky-500/40 rounded-2xl shadow-2xl max-w-xs text-xs animate-in fade-in slide-in-from-bottom-2 duration-300 relative text-white">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-white p-1 rounded"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-sky-400">Consultores Online</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Precisa de um diagnóstico financeiro rápido ou demonstração dos softwares? Fale conosco agora!
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chamar no WhatsApp Servo Tech"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-950/40 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[9px] font-black">
          1
        </span>
        <MessageCircle className="w-7 h-7 fill-white/20 group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
}
