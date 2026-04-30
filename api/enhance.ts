// api/enhance.ts
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are Promptify, a world-class expert in Prompt Engineering.
Your mission is to transform raw user inputs into high-performance, structured prompts for LLMs.

For every request, provide:
1. enhancedPrompt: A sophisticated, optimized version of the original using best practices.
2. explanation: A concise explanation of the key improvements and why they work.
3. variations: 4 distinct variations of the prompt, each with a unique tone/approach (e.g., Creative, Analytical, Concise, Academic).

Return clean, valid JSON only.`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { inputPrompt, parameters } = req.body;

  if (!inputPrompt || typeof inputPrompt !== 'string') {
    return res.status(400).json({ error: 'inputPrompt is required' });
  }

  const complexityNote =
    parameters?.complexity === 'expert'
      ? 'Provide extremely high detail, extensive structure, comprehensive coverage.'
      : parameters?.complexity === 'detailed'
      ? 'Include thorough coverage with clear structure and examples.'
      : parameters?.complexity === 'simple'
      ? 'Keep it concise and direct — brevity is key.'
      : 'Balanced detail — informative but not overwhelming.';

  const userContent = `
Prompt to Enhance: "${inputPrompt}"

Parameters:
- Target AI Model / Persona: ${parameters?.targetPersona || 'General Assistant'}
- Intended Output Format: ${parameters?.intendedFormat || 'Structured Prompt'}
- Complexity Level: ${parameters?.complexity || 'standard'} — ${complexityNote}
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userContent,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            enhancedPrompt: { type: Type.STRING },
            explanation: { type: Type.STRING },
            variations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  tone: { type: Type.STRING },
                  prompt: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
                required: ['id', 'tone', 'prompt', 'explanation'],
              },
            },
          },
          required: ['enhancedPrompt', 'explanation', 'variations'],
        },
      },
    });

    if (!response.text) {
      return res.status(500).json({ error: 'No response from Gemini' });
    }

    return res.json(JSON.parse(response.text));
  } catch (error) {
    console.error('Gemini error:', error);
    return res.status(500).json({ error: 'Failed to enhance prompt' });
  }
}