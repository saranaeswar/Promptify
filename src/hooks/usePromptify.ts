import { useState, useCallback } from 'react';
import { enhancePrompt } from '../services/geminiService';
import type { EnhancedResponse, PromptParameters, HistoryEntry, ComplexityLevel } from '../types';

const DEFAULT_PARAMS: PromptParameters = {
  targetPersona: 'Claude',
  intendedFormat: 'Structured Prompt',
  complexity: 'standard',
};

export function usePromptify() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EnhancedResponse | null>(null);
  const [parameters, setParameters] = useState<PromptParameters>(DEFAULT_PARAMS);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const setPersona = useCallback((targetPersona: string) => {
    setParameters((p) => ({ ...p, targetPersona }));
  }, []);

  const setFormat = useCallback((intendedFormat: string) => {
    setParameters((p) => ({ ...p, intendedFormat }));
  }, []);

  const setComplexity = useCallback((complexity: ComplexityLevel) => {
    setParameters((p) => ({ ...p, complexity }));
  }, []);

  const handleEnhance = useCallback(async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const data = await enhancePrompt(input.trim(), parameters);
      setResult(data);
      setHistory((prev) => [
        {
          id: Date.now().toString(),
          input: input.trim(),
          result: data,
          parameters: { ...parameters },
          timestamp: new Date(),
        },
        ...prev.slice(0, 19), // keep last 20
      ]);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  }, [input, loading, parameters]);

  const copyToClipboard = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }, []);

  const newSession = useCallback(() => {
    setResult(null);
    setInput('');
    setError(null);
  }, []);

  const loadFromHistory = useCallback((entry: HistoryEntry) => {
    setInput(entry.input);
    setResult(entry.result);
    setParameters(entry.parameters);
    setError(null);
  }, []);

  return {
    input,
    setInput,
    loading,
    error,
    result,
    parameters,
    history,
    copied,
    setPersona,
    setFormat,
    setComplexity,
    handleEnhance,
    copyToClipboard,
    newSession,
    loadFromHistory,
  };
}
