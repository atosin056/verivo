import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const transcribeAudio = async (base64Audio, mimeType) => {
  const contents = [
    {
      text: "Transcribe this audio exactly as spoken. The speaker may use Nigerian Pidgin English mixed with standard English — transcribe faithfully, don't correct or standardize the phrasing. Respond ONLY with the transcript text, nothing else — no preamble, no labels, no quotation marks around it.",
    },
    {
      inlineData: {
        mimeType: mimeType || "audio/ogg",
        data: base64Audio,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents,
  });

  const raw = response.text;
  console.log("GEMINI TRANSCRIBE RAW OUTPUT:", raw);

  const cleaned = raw.replace(/```/g, "").trim().replace(/^"|"$/g, "");

  return cleaned;
};

export default transcribeAudio;
