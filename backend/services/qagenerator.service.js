import { GoogleGenAI } from "@google/genai";
import buildDiagnosticQuestionPrompt from "./qapromt.service.js";

const ai = new GoogleGenAI({});

const generateQa = async (trade, category, knowledge) => {
  const prompt = buildDiagnosticQuestionPrompt({
    trade,
    category,
    knowledge,
  });

  const interaction = await ai.interactions.create({
    model: "gemini-2.5-flash",
    input: prompt,
  });

  const result = JSON.parse(interaction.output_text);
  console.log("GEMINI RAW OUTPUT:");
  console.log(interaction.output_text);
  return {
    question: result.question,
    answer: result.answer,
    source_ids: result.source_ids,
  };
};

export default generateQa;
