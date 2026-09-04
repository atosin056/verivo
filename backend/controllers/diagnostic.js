import { uploadChunks } from "../services/uploadtopinecone.service.js";
import generateQuestionAndAnswer from "../services/qa.service.js";
import { gradeAndScoreWorker } from "../services/gradeandscore.service.js";
import transcribeAudio from "../services/transcribe.service.js";

const uploadtopinecone = async (req, res) => {
  try {
    await uploadChunks();

    res.status(200).json({
      success: true,
      message: "Data successfully embedded and uploaded",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const generateQa = async (req, res) => {
  const { trade, category } = req.body;

  try {
    const qa = await generateQuestionAndAnswer(trade, category);

    res.status(200).json({
      success: true,
      questionandanswer: qa,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const calculateIseScore = async (req, res) => {
  const { interview, userId } = req.body;
  try {
    const result = await gradeAndScoreWorker({ interview, workerId: userId });
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    const code = err.statusCode || 500;
    res.status(code).json({
      success: false,
      message: err.message,
    });
  }
};

const transcribe = async (req, res) => {
  const { audio, mimeType } = req.body;

  if (!audio) {
    return res.status(400).json({
      success: false,
      message: "No audio provided",
    });
  }

  try {
    const text = await transcribeAudio(audio, mimeType);

    res.status(200).json({
      success: true,
      text,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export { uploadtopinecone, generateQa, calculateIseScore, transcribe };
