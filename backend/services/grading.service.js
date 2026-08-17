import { buildGradingPrompt } from "./gradingprompt.service.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

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

    const cleaned = raw
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let results;
    try {
      results = JSON.parse(cleaned);
    } catch (parseErr) {
      const match = parseErr.message.match(/position (\d+)/);
      if (match) {
        const pos = parseInt(match[1], 10);
        console.log(
          "JSON BROKE NEAR:",
          cleaned.slice(Math.max(0, pos - 60), pos + 60),
        );
      }
      throw parseErr;
    }

    if (!Array.isArray(results)) {
      throw new Error("Gemini grading response is not an array");
    }

    if (results.length !== interview.length) {
      throw new Error("Grading result count mismatch");
    }

    return results;
  } catch (err) {
    console.error("Failed to grade interview:", err);

    return interview.map(() => ({
      points_covered: [],
      points_missed: [],
      score: null,
      reasoning: "Could not grade — needs manual review",
    }));
  }
};

export default calculateInterviewScore;
