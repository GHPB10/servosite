import React, { useState } from 'react';
import { Edit3, Check, RotateCcw, Copy, Download, Upload } from 'lucide-react';
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
    resetAllTexts,
    exportAllTextsJson,
    importAllTextsJson,
    content
  } = useContent();

  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [copiedFeedback, setCopiedFeedback] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  // If user is not authenticated as admin, don't show the bar
  if (!isAdmin) {
    return null;
  }

  const handleSaveClick = async () => {
    await saveAllTexts();
    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
    }, 3000);
  };

  const handleCopyJson = () => {
    const json = exportAllTextsJson();
    navigator.clipboard.writeText(json);
    setCopiedFeedback(true);
    setTimeout(() => {
      setCopiedFeedback(false);
    }, 3000);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImportError('');
    const success = importAllTextsJson(importJsonText);
    if (success) {
      setShowImportModal(false);
      setImportJsonText('');
      setShowSavedFeedback(true);
      setTimeout(() => setShowSavedFeedback(false), 2500);
    } else {
      setImportError('JSON inválido. Verifique a formatação.');
    }
  };

  const totalEdited = Object.keys(content).length;

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 animate-fade-in flex flex-col gap-2">
        {showSavedFeedback && (
          <div className="bg-emerald-500 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-1.5 animate-bounce">
            <Check className="w-4 h-4" />
            <span>Alterações salvas com sucesso em todo o site!</span>
          </div>
        )}

        {copiedFeedback && (
          <div className="bg-sky-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>{totalEdited} textos copiados para a área de transferência!</span>
          </div>
        )}

        <div className="bg-slate-900/95 backdrop-blur-md border border-sky-500/50 shadow-2xl shadow-sky-500/15 rounded-2xl p-2.5 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isEditMode
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/25'
                : 'bg-slate-800 hover:bg-slate-700 text-sky-400'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditMode ? 'Modo Edição Ativo' : 'Ativar Edição de Textos'}</span>
          </button>

          {isEditMode && (
            <>
              <div className="h-5 w-px bg-slate-800" />

              <button
                onClick={handleSaveClick}
                disabled={!hasUnsavedChanges}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
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
                onClick={handleCopyJson}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Copiar todos os textos editados em formato JSON"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Textos ({totalEdited})</span>
              </button>

              <button
                onClick={() => setShowImportModal(true)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Importar textos de outro navegador"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Importar</span>
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
            💡 <strong>Edição Global:</strong> Clique em qualquer texto pontilhado para editar. Para levar suas edições para o GitHub/produção, clique em <strong>Copiar Textos</strong> e envie no chat!
          </div>
        )}
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full text-white space-y-4 shadow-2xl">
            <h4 className="text-base font-bold">Importar Dicionário de Textos (JSON)</h4>
            <p className="text-xs text-slate-400">
              Cole abaixo o JSON de textos exportado para aplicar instantaneamente neste navegador.
            </p>

            <form onSubmit={handleImportSubmit} className="space-y-3">
              <textarea
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='{ "home_hero_badge": "Meu Novo Texto", ... }'
                rows={6}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-500"
                required
              />

              {importError && (
                <p className="text-xs text-red-400">{importError}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
                >
                  Aplicar Textos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
