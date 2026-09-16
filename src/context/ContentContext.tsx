import React, { createContext, useContext, useState, useEffect } from 'react';

// Key-value dictionary for dynamic inline text throughout the site
export type ContentDictionary = Record<string, string>;

interface ContentContextType {
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  hasUnsavedChanges: boolean;
  getText: (key: string, defaultValue: string) => string;
  updateText: (key: string, value: string) => void;
  saveAllTexts: () => void;
  resetAllTexts: () => void;
}

const STORAGE_KEY = 'servotech_site_content_v1';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('servotech_admin_auth') === 'true';
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [content, setContent] = useState<ContentDictionary>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Erro ao ler conteúdo salvo:', err);
    }
    return {};
  });

  // Keep admin state synced with localStorage
  useEffect(() => {
    const handleStorage = () => {
      setIsAdmin(localStorage.getItem('servotech_admin_auth') === 'true');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const getText = (key: string, defaultValue: string): string => {
    return content[key] !== undefined ? content[key] : defaultValue;
  };

  const updateText = (key: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [key]: value
    }));
    setHasUnsavedChanges(true);
  };

  const saveAllTexts = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    setHasUnsavedChanges(false);
  };

  const resetAllTexts = () => {
    if (confirm('Tem certeza que deseja restaurar todos os textos do site para o padrão original de fábrica?')) {
      localStorage.removeItem(STORAGE_KEY);
      setContent({});
      setHasUnsavedChanges(false);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        isAdmin,
        setIsAdmin,
        hasUnsavedChanges,
        getText,
        updateText,
        saveAllTexts,
        resetAllTexts,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error('useContent deve ser usado dentro de um ContentProvider');
  }
  return ctx;
}
