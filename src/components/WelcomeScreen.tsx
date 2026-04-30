import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, BrainCircuit, Layers } from 'lucide-react';

interface WelcomeScreenProps {
  onExampleClick: (text: string) => void;
}

const EXAMPLES = [
  {
    icon: <Sparkles size={16} />,
    title: 'Write a cover letter',
    desc: 'Turn a basic request into a compelling professional prompt',
  },
  {
    icon: <Zap size={16} />,
    title: 'Debug this Python code',
    desc: 'Craft precise technical prompts for coding tasks',
  },
  {
    icon: <BrainCircuit size={16} />,
    title: 'Explain quantum computing',
    desc: 'Build prompts that produce clear, accurate explanations',
  },
  {
    icon: <Layers size={16} />,
    title: 'Plan a marketing campaign',
    desc: 'Generate strategic, multi-angle prompt variations',
  },
];

const TYPEWRITER_TEXT = 'BUILT BY SARANAESWAR';

function TypewriterTag() {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(TYPEWRITER_TEXT.slice(0, i));
      if (i === TYPEWRITER_TEXT.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="text-indigo-400 font-mono text-[11px] tracking-widest font-semibold">
        {displayed}
        {!done && (
          <span className="inline-block w-[2px] h-[12px] bg-indigo-400 ml-0.5 align-middle animate-pulse" />
        )}
      </span>
    </div>
  );
}

export function WelcomeScreen({ onExampleClick }: WelcomeScreenProps) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-32"
    >
      <div className="space-y-3 mb-12">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 mx-auto flex items-center justify-center shadow-xl shadow-indigo-900/50 mb-6">
          <Zap className="w-7 h-7 text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Transform your prompts
        </h2>
        <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
          Type any rough idea below. Promptify will engineer it into a high-performance
          prompt — plus variations optimized for your target model.
        </p>
        <TypewriterTag />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        {EXAMPLES.map((chip, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.07, duration: 0.3 }}
            onClick={() => onExampleClick(chip.title)}
            className="flex items-start gap-3 p-4 rounded-2xl border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all text-left group"
          >
            <div className="mt-0.5 text-zinc-600 group-hover:text-indigo-400 transition-colors shrink-0">
              {chip.icon}
            </div>
            <div>
              <span className="text-sm font-semibold text-zinc-200 block">{chip.title}</span>
              <span className="text-xs text-zinc-500 leading-snug">{chip.desc}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}