import { uploadChunks } from "../services/uploadtopinecone.service.js";
import generateQuestionAndAnswer from "../services/qa.service.js";

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

export { uploadtopinecone, generateQa };
