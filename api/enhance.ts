// api/enhance.ts
import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check if API key exists
  const apiKey = process.env.GEMINI_API_KEY;

  console.log("GEMINI_API_KEY exists:", !!apiKey);

  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY environment variable is missing.",
    });
  }

  const ai = new GoogleGenAI({ apiKey });

  const SYSTEM_INSTRUCTION = `
You are Promptify, a world-class expert in Prompt Engineering.

Your mission is to transform raw user inputs into high-performance, structured prompts for LLMs.

For every request, provide:
1. enhancedPrompt
2. explanation
3. variations (4)

Return valid JSON only.
`;

  try {
    const { inputPrompt, parameters } = req.body;

    if (!inputPrompt || typeof inputPrompt !== "string") {
      return res.status(400).json({
        error: "inputPrompt is required",
      });
    }

    const complexityNote =
      parameters?.complexity === "expert"
        ? "Provide extremely high detail."
        : parameters?.complexity === "detailed"
        ? "Provide thorough detail."
        : parameters?.complexity === "simple"
        ? "Keep it concise."
        : "Balanced detail.";

    const userContent = `
Prompt to Enhance:
${inputPrompt}

Parameters:
Target Persona: ${parameters?.targetPersona || "General Assistant"}
Output Format: ${parameters?.intendedFormat || "Structured Prompt"}
Complexity: ${parameters?.complexity || "standard"}

${complexityNote}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userContent,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            enhancedPrompt: {
              type: Type.STRING,
            },
            explanation: {
              type: Type.STRING,
            },
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
                required: [
                  "id",
                  "tone",
                  "prompt",
                  "explanation",
                ],
              },
            },
          },
          required: [
            "enhancedPrompt",
            "explanation",
            "variations",
          ],
        },
      },
    });

    const text = response.text;

    if (!text) {
      return res.status(500).json({
        error: "Gemini returned an empty response.",
      });
    }

    return res.status(200).json(JSON.parse(text));
  } catch (err: any) {
    console.error("========== GEMINI ERROR ==========");
    console.error(err);
    console.error("=================================");

    return res.status(500).json({
      error: err?.message || "Unknown Gemini error",
    });
  }
}