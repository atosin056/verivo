import { GoogleGenAI } from "@google/genai";
import buildDiagnosticQuestionPrompt from "./qapromt.service.js";

const ai = new GoogleGenAI({});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function extractJson(text) {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // First, try the entire response
  try {
    return JSON.parse(cleaned);
  } catch {}

  // If Gemini added extra text, find the first complete JSON object
  const start = cleaned.indexOf("{");

  if (start === -1) {
    throw new Error("Gemini did not return a JSON object");
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < cleaned.length; i++) {
    const char = cleaned[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (char === "{") {
      depth++;
    }

    if (char === "}") {
      depth--;

      if (depth === 0) {
        const jsonString = cleaned.slice(start, i + 1);
        return JSON.parse(jsonString);
      }
    }
  }

  throw new Error("Gemini returned incomplete JSON");
}

const generateQa = async (trade, category, knowledge, retries = 2) => {
  const prompt = buildDiagnosticQuestionPrompt({
    trade,
    category,
    knowledge,
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    console.log("RAW GEMINI RESPONSE:");
    console.log(response.text);

    const result = extractJson(response.text);

    if (result === "INSUFFICIENT_KNOWLEDGE") {
      throw new Error(
        `No knowledge was found for trade "${trade}" and category "${category}"`,
      );
    }

    if (!result || typeof result !== "object" || Array.isArray(result)) {
      throw new Error("Gemini returned an invalid question format");
    }

    if (!result.question) {
      throw new Error("Generated response is missing question");
    }

    if (!result.answer) {
      throw new Error("Generated response is missing answer");
    }

    return {
      question: {
        text: result.question.text,
      },

      answer: {
        model_answer: result.answer.model_answer,
        key_points: result.answer.key_points || [],
      },

      source_ids: result.source_ids || [],
    };
  } catch (err) {
    if ((err.status === 429 || err.message?.includes("429")) && retries > 0) {
      console.warn(
        `Quota limit reached. Retrying in 2 seconds... (${retries} retries left)`,
      );

      await delay(2000);

      return generateQa(trade, category, knowledge, retries - 1);
    }

    console.error("Failed to generate QA:", err);

    throw new Error(`Could not generate question — ${err.message}`);
  }
};

export default generateQa;
