import React, { useState } from 'react';
import { Edit3, Check, RotateCcw } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface FloatingEditBarProps {
  onOpenAdminLogin?: () => void;
}

export function FloatingEditBar({ onOpenAdminLogin }: FloatingEditBarProps) {
  const {
    isAdmin,
    isEditMode,
    setIsEditMode,
    hasUnsavedChanges,
    saveAllTexts,
    resetAllTexts
  } = useContent();

  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  // If user is not authenticated as admin, don't show the bar
  if (!isAdmin) {
    return null;
  }

  const handleSaveClick = () => {
    saveAllTexts();
    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
    }, 2500);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-fade-in flex flex-col gap-2">
      {showSavedFeedback && (
        <div className="bg-emerald-500 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-1.5 animate-bounce">
          <Check className="w-4 h-4" />
          <span>Alterações salvas com sucesso em todo o site!</span>
        </div>
      )}

      <div className="bg-slate-900/95 backdrop-blur-md border border-sky-500/50 shadow-2xl shadow-sky-500/15 rounded-2xl p-2.5 flex items-center gap-2">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            isEditMode
              ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/25'
              : 'bg-slate-800 hover:bg-slate-700 text-sky-400'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditMode ? 'Modo Edição Ativo (Todo o Site)' : 'Ativar Edição de Textos'}</span>
        </button>

        {isEditMode && (
          <>
            <div className="h-5 w-px bg-slate-800" />

            <button
              onClick={handleSaveClick}
              disabled={!hasUnsavedChanges}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                hasUnsavedChanges
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
              title="Salvar alterações de texto"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Salvar</span>
            </button>

            <button
              onClick={resetAllTexts}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Restaurar textos padrão originais de fábrica"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>

      {isEditMode && (
        <div className="bg-slate-950/90 text-sky-300 border border-sky-500/20 text-[11px] px-3 py-1.5 rounded-lg max-w-xs leading-snug">
          💡 <strong>Edição Global:</strong> Clique em qualquer texto pontilhado de <em>qualquer aba</em> (Início, BPO, ERP, CRM, Sobre, Contato) para editar e clique em <strong>Salvar</strong>!
        </div>
      )}
    </div>
  );
}
