import React, { useRef, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface EditableTextProps {
  contentKey: string;
  defaultText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'strong';
  multiline?: boolean;
  inline?: boolean;
}

export function EditableText({
  contentKey,
  defaultText,
  className = '',
  as: Component = 'span',
  multiline = false,
  inline = true,
}: EditableTextProps) {
  const { isEditMode, getText, updateText } = useContent();
  const currentText = getText(contentKey, defaultText);
  const elementRef = useRef<HTMLElement>(null);

  // Sync content if changed externally
  useEffect(() => {
    if (elementRef.current && elementRef.current.innerText !== currentText) {
      elementRef.current.innerText = currentText;
    }
  }, [currentText]);

  if (!isEditMode) {
    return <Component className={className}>{currentText}</Component>;
  }

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newText = e.currentTarget.innerText;
    if (newText !== currentText) {
      updateText(contentKey, newText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <span className={`${inline ? 'inline-block' : 'block'} relative group/editable max-w-full`}>
      <Component
        ref={elementRef as any}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`outline-none cursor-text rounded px-1.5 py-0.5 border border-dashed border-sky-400/80 bg-sky-500/10 hover:bg-sky-500/20 focus:bg-sky-500/25 focus:ring-2 focus:ring-sky-400 transition-all ${className}`}
      >
        {currentText}
      </Component>
      <span className="opacity-0 group-hover/editable:opacity-100 transition-opacity absolute -top-2.5 -right-2 bg-sky-500 text-slate-950 p-0.5 rounded shadow pointer-events-none z-30">
        <Pencil className="w-2.5 h-2.5" />
      </span>
    </span>
  );
}
