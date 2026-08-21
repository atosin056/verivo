import jwt from "jsonwebtoken";
import { createemployerservice } from "../services/createemployer.service.js";

export const createemployer = async (req, res) => {
  const { fullName, phone } = req.body;
  const employerId = await createemployerservice(fullName, phone);
  const token = jwt.sign(
    {
      employerId,
      accountType: "employer",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.status(200).json({
    success: true,
    message: "Employer created successfully",
    token,
    employerId,
  });
  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
