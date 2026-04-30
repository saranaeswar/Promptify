import React, { useRef, useEffect } from 'react';
import { ArrowUp, RefreshCcw } from 'lucide-react';
import { cn } from '../utils/cn';

interface PromptInputProps {
  value: string;
  loading: boolean;
  onChange: (val: string) => void;
  onSubmit: () => void;
}

export function PromptInput({ value, loading, onChange, onSubmit }: PromptInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Auto-resize
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pt-12">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl focus-within:border-zinc-600 transition-colors">
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you want to prompt an AI to do..."
            rows={1}
            className="flex-1 bg-transparent px-5 py-4 pr-14 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none resize-none leading-relaxed"
            style={{ minHeight: '52px', maxHeight: '200px' }}
          />
          <button
            disabled={loading || !value.trim()}
            onClick={onSubmit}
            className={cn(
              'absolute right-3 bottom-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all',
              loading || !value.trim()
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-90 shadow-lg shadow-indigo-900/40'
            )}
          >
            {loading ? (
              <RefreshCcw className="animate-spin" size={14} />
            ) : (
              <ArrowUp size={16} strokeWidth={2.5} />
            )}
          </button>
        </div>
        <p className="text-[10px] text-center text-zinc-600 mt-3">
          Press <kbd className="bg-zinc-800 px-1 rounded text-zinc-500 font-mono">Enter</kbd> to enhance ·{' '}
          <kbd className="bg-zinc-800 px-1 rounded text-zinc-500 font-mono">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}
