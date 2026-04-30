import React from 'react';
import { Zap, Plus, Clock } from 'lucide-react';
import { cn } from '../utils/cn';
import { AI_MODELS, OUTPUT_FORMATS, COMPLEXITY_LEVELS } from '../types';
import type { PromptParameters, HistoryEntry } from '../types';

interface SidebarProps {
  parameters: PromptParameters;
  history: HistoryEntry[];
  onPersonaChange: (persona: string) => void;
  onFormatChange: (format: string) => void;
  onComplexityChange: (complexity: PromptParameters['complexity']) => void;
  onNewSession: () => void;
  onLoadHistory: (entry: HistoryEntry) => void;
}

export function Sidebar({
  parameters,
  history,
  onPersonaChange,
  onFormatChange,
  onComplexityChange,
  onNewSession,
  onLoadHistory,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-zinc-950 flex flex-col shrink-0 border-r border-zinc-800/60">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-zinc-800/60">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/40">
          <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-tight text-white">Promptify</h1>
          
          <p className="text-[9px] text-indigo-400/70 font-mono tracking-wider mt-0.5">DEVELOPED BY SARANAESWAR</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-hide">
        {/* New Session */}
        <button
          onClick={onNewSession}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl hover:bg-zinc-800/60 transition-all text-sm font-medium border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white group"
        >
          <Plus size={15} className="text-zinc-500 group-hover:text-indigo-400 transition-colors" />
          New Prompt
          <kbd className="ml-auto text-[9px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 font-mono">⌘K</kbd>
        </button>

        {/* AI Target */}
        <section className="space-y-2.5">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-1">Target Model</h3>
          <div className="grid grid-cols-2 gap-1.5">
            {AI_MODELS.map((ai) => (
              <button
                key={ai}
                onClick={() => onPersonaChange(ai)}
                title={ai}
                className={cn(
                  'px-2 py-2 rounded-lg text-[10px] font-semibold border transition-all truncate',
                  parameters.targetPersona === ai
                    ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 shadow-sm'
                    : 'bg-transparent text-zinc-500 border-transparent hover:bg-zinc-800/60 hover:text-zinc-300'
                )}
              >
                {ai}
              </button>
            ))}
          </div>
        </section>

        {/* Output Format */}
        <section className="space-y-2.5">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-1">Output Format</h3>
          <select
            value={parameters.intendedFormat}
            onChange={(e) => onFormatChange(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-3 text-xs text-zinc-300 outline-none focus:border-indigo-500/50 transition-colors cursor-pointer"
          >
            {Object.entries(OUTPUT_FORMATS).map(([group, options]) => (
              <optgroup key={group} label={group}>
                {options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </section>

        {/* Complexity */}
        <section className="space-y-2.5">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-1">Complexity</h3>
          <div className="space-y-1.5">
            {COMPLEXITY_LEVELS.map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => onComplexityChange(value)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs border transition-all',
                  parameters.complexity === value
                    ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                    : 'bg-transparent text-zinc-500 border-transparent hover:bg-zinc-800/60 hover:text-zinc-300'
                )}
              >
                <span className="font-semibold">{label}</span>
                <span className="text-[10px] opacity-70">{desc}</span>
              </button>
            ))}
          </div>
        </section>

        {/* History */}
        {history.length > 0 && (
          <section className="space-y-2.5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-1 flex items-center gap-1.5">
              <Clock size={10} />
              Recent
            </h3>
            <div className="space-y-1">
              {history.slice(0, 8).map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => onLoadHistory(entry)}
                  className="w-full px-3 py-2 rounded-lg text-left hover:bg-zinc-800/60 transition-all group"
                >
                  <p className="text-[11px] text-zinc-400 group-hover:text-zinc-200 truncate transition-colors">
                    {entry.input}
                  </p>
                  <p className="text-[9px] text-zinc-600 mt-0.5">
                    {entry.parameters.targetPersona} · {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}