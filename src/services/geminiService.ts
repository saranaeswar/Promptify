import type { EnhancedResponse, PromptParameters } from '../types';

export async function enhancePrompt(
  inputPrompt: string,
  parameters: PromptParameters
): Promise<EnhancedResponse> {
  const response = await fetch('/api/enhance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputPrompt, parameters }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Server error');
  }

  return response.json() as Promise<EnhancedResponse>;
}