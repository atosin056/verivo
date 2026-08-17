import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);
console.log("Gemini model:", process.env.GEMINI_MODEL);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function createEmbedding(text) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
    config: {
      outputDimensionality: 1536,
    },
  });

  return response.embeddings[0].values;
}
