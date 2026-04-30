import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, RefreshCcw, ChevronDown, ChevronUp, Info } from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '../utils/cn';
import type { EnhancedResponse } from '../types';

interface ResultViewProps {
  result: EnhancedResponse;
  input: string;
  loading: boolean;
  copied: string | null;
  onCopy: (text: string, id: string) => void;
  onRegenerate: () => void;
}

export function ResultView({ result, input, loading, copied, onCopy, onRegenerate }: ResultViewProps) {
  const [explanationOpen, setExplanationOpen] = useState(false);

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8 pb-40"
    >
      {/* Original input echo */}
      <div className="flex justify-end">
        <div className="max-w-lg bg-zinc-800/60 border border-zinc-700/50 rounded-2xl rounded-tr-sm px-4 py-3">
          <p className="text-sm text-zinc-300 leading-relaxed">{input}</p>
        </div>
      </div>

      {/* Enhanced Prompt */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            Enhanced Prompt
          </span>
          <div className="flex gap-2">
            <button
              onClick={onRegenerate}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCcw size={12} className={loading ? 'animate-spin' : ''} />
              Regenerate
            </button>
            <button
              onClick={() => onCopy(result.enhancedPrompt, 'master')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all',
                copied === 'master'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700'
              )}
            >
              {copied === 'master' ? <Check size={12} /> : <Copy size={12} />}
              {copied === 'master' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
          <div className="prose prose-invert prose-sm max-w-none text-zinc-100 leading-relaxed">
            <Markdown>{result.enhancedPrompt}</Markdown>
          </div>

          {/* Collapsible Explanation */}
          <div className="mt-5 pt-4 border-t border-zinc-800/60">
            <button
              onClick={() => setExplanationOpen((o) => !o)}
              className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 hover:text-zinc-300 transition-colors w-full"
            >
              <Info size={12} />
              <span>Why these changes?</span>
              <span className="ml-auto">{explanationOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}</span>
            </button>
            {explanationOpen && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 text-xs text-zinc-400 font-mono leading-relaxed"
              >
                {result.explanation}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Variations */}
      <div className="space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 px-1 block">
          Prompt Variations
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.variations.map((v, idx) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="group p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold bg-zinc-800 px-2.5 py-1 rounded-lg text-indigo-400 uppercase tracking-wider">
                  {v.tone}
                </span>
                <button
                  onClick={() => onCopy(v.prompt, v.id)}
                  className={cn(
                    'flex items-center gap-1.5 text-[10px] font-semibold uppercase transition-all',
                    copied === v.id ? 'text-emerald-400' : 'text-zinc-600 hover:text-white'
                  )}
                >
                  {copied === v.id ? <Check size={12} /> : <Copy size={12} />}
                  {copied === v.id ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-3 italic">"{v.prompt}"</p>
              <p className="text-[10px] text-zinc-500 font-mono leading-snug">{v.explanation}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
