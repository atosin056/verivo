import { buildGradingPrompt } from "./gradingprompt.service.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

function extractJsonArray(text) {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {}

  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start === -1 || end <= start) {
    throw new Error("Gemini did not return a JSON grading array");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

const calculateInterviewScore = async (interview) => {
  const prompt = buildGradingPrompt(interview);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: 8192,
      },
    });

    const raw = response.text;

    console.log("RAW GEMINI GRADING RESPONSE:");
    console.log(raw);

    const results = extractJsonArray(raw);

    if (!Array.isArray(results)) {
      throw new Error("Gemini grading response is not an array");
    }

    if (results.length !== interview.length) {
      throw new Error("Grading result count mismatch");
    }

    return results.map((result, index) => {
      const score = Number(result?.score);
      if (!Number.isFinite(score) || score < 0 || score > 100) {
        throw new Error(`Invalid score for interview question ${index + 1}`);
      }

      return {
        ...result,
        score: Math.round(score),
      };
    });
  } catch (err) {
    console.error("Failed to grade interview:", err);
    throw new Error(`Could not grade interview — ${err.message}`);
  }
};

export default calculateInterviewScore;
