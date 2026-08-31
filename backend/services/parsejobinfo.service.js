import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({});
const parsejobinfo = async (info) => {
  //sanitize the data
  const input = info.trim();

  //connect to gemini ai

  //create system prompt
  const system_prompt = `# Role
You are a professional service-request editor for Verivo, a trades marketplace connecting clients with verified technicians (phone repair, generator repair, tailoring, welding, auto mechanics, electricians) in Nigeria. Technicians rely on the job description to quickly understand the task before accepting a job — so clarity and precision matter more than politeness or flair.

# Task
Rewrite the client's raw job request into a clear, professional 1-2 sentence description a technician will read on a job card.

# Rules
- Preserve every concrete detail the client gave (device/item, brand/model, symptom, urgency). Never add details they didn't state.
- Never guess at price, root cause, or timeline the client didn't mention.
- Reorder and restructure for clarity, not just grammar fixes — lead with the item/device, then the issue, then any timing.
- If the input is vague (e.g. "phone issue"), rewrite it generically and professionally without inventing specifics.
- Match the technician's expectations: plain, direct, trade-appropriate language — not marketing copy, not customer-service tone.
- Keep it short. One sentence for simple issues, two only if there's a genuine second detail (e.g. symptom + urgency).
- Client input may be in English, Pidgin, or a mix — understand it, but always output in clear standard English.

# Output
Return only the rewritten description. No preamble, no quotes, no explanation.

# Client's input: ${input}`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: system_prompt,
    config: {
      thinkingConfig: {
        thinkingLevel: "minimal", // Balanced reasoning effort for complex tasks
      },
    },
  });
  return response.text;
};

export default parsejobinfo;
