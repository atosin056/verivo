import { getInfo } from "../services/employerinfo.service.js";

export const fetchEmployer = async (req, res) => {
  try {
    const employer = await getInfo(req.auth.id);

    if (!employer) {
      return res.status(404).json({
        success: false,
        message: "Employer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employer info fetched successfully",
      employer,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
