export interface PromptVariation {
  id: string;
  tone: string;
  prompt: string;
  explanation: string;
}

export interface EnhancedResponse {
  enhancedPrompt: string;
  explanation: string;
  variations: PromptVariation[];
}

export type ComplexityLevel = 'simple' | 'standard' | 'detailed' | 'expert';

export interface PromptParameters {
  targetPersona: string;
  intendedFormat: string;
  complexity: ComplexityLevel;
}

export interface HistoryEntry {
  id: string;
  input: string;
  result: EnhancedResponse;
  parameters: PromptParameters;
  timestamp: Date;
}

export const AI_MODELS = [
  'ChatGPT',
  'Claude',
  'Gemini',
  'Grok',
  'Perplexity AI',
  'Microsoft Copilot',
  'Mistral',
  'LLaMA',
] as const;

export const OUTPUT_FORMATS = {
  Core: [
    'Structured Prompt',
    'Narrative / Essay',
    'Step-by-Step Guide',
    'Code Snippet',
    'Q&A Format',
  ],
  Presentation: [
    'Pitch Deck Prompt',
    'Slide-by-Slide Prompt',
    'Executive Summary',
  ],
  Advanced: [
    'Zero-Shot Prompt',
    'Few-Shot Prompt',
    'Chain-of-Thought',
    'ReAct Prompt',
    'Socratic Dialogue',
  ],
} as const;

export const COMPLEXITY_LEVELS: { value: ComplexityLevel; label: string; desc: string }[] = [
  { value: 'simple', label: 'Simple', desc: 'Concise & direct' },
  { value: 'standard', label: 'Standard', desc: 'Balanced detail' },
  { value: 'detailed', label: 'Detailed', desc: 'Thorough coverage' },
  { value: 'expert', label: 'Expert', desc: 'Maximum depth' },
];
