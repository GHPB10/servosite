import React, { useState, useRef, useEffect } from 'react';
import { Pencil } from 'lucide-react';

interface InlineEditableProps {
  value: string;
  isEditing: boolean;
  onChange: (newValue: string) => void;
  className?: string;
  multiline?: boolean;
  as?: 'h1' | 'h2' | 'p' | 'span' | 'div';
  highlightClassName?: string;
}

export function InlineEditable({
  value,
  isEditing,
  onChange,
  className = '',
  multiline = false,
  as: Component = 'span',
  highlightClassName = ''
}: InlineEditableProps) {
  const [localVal, setLocalVal] = useState(value);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setLocalVal(value);
  }, [value]);

  if (!isEditing) {
    return <Component className={className}>{value}</Component>;
  }

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    const newText = e.currentTarget.innerText;
    setLocalVal(newText);
    onChange(newText);
  };

  return (
    <span className="relative inline-block group/editable w-auto">
      <Component
        ref={elementRef as any}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleInput}
        className={`outline-none transition-all cursor-text rounded px-1.5 py-0.5 border border-dashed border-sky-400/70 bg-sky-500/10 hover:bg-sky-500/20 focus:bg-sky-500/25 focus:ring-2 focus:ring-sky-400 ${className} ${highlightClassName}`}
      >
        {value}
      </Component>
      <span className="opacity-0 group-hover/editable:opacity-100 transition-opacity absolute -top-2.5 -right-2 bg-sky-500 text-slate-950 p-0.5 rounded shadow pointer-events-none z-20">
        <Pencil className="w-2.5 h-2.5" />
      </span>
    </span>
  );
}
