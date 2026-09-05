import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are BIS Saathi, an AI assistant specialized in Indian Standards (IS codes) and Bureau of Indian Standards (BIS) certification processes.

Rules:
- Answer questions about Indian Standards, ISI Mark certification, BIS licensing (Scheme-I, Scheme-II etc.), hallmarking, and BIS-recognized testing laboratories.
- Be specific: mention relevant IS code numbers, clause references, and certification schemes whenever known.
- Keep answers concise, well-structured, and practical for manufacturers, consumers, and testing labs.
- If you don't know the exact IS code, say so honestly rather than making one up.
- Reply in the same language the user used (Hindi, English, or Hinglish).
- Do not answer questions unrelated to BIS, Indian Standards, or certification — politely redirect the user back to relevant topics.
`;

export const getGeminiResponse = async (
  userMessage,
  chatHistory = []
) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey.trim(),
    });

    const history = chatHistory
      .slice(0, -1)
      .map((msg) => ({
        role:
          msg.role === "assistant"
            ? "model"
            : "user",
        parts: [
          {
            text: msg.content,
          },
        ],
      }));

    const contents = [
      ...history,
      {
        role: "user",
        parts: [
          {
            text: userMessage,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    return {
      success: true,
      text: response.text,
    };
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.message
    );

    return {
      success: false,
      text:
        "Sorry, I'm unable to process your request right now. Please try again in a moment.",
    };
  }
};