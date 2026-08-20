import db from "../db/connection.js";
import jwt from "jsonwebtoken";
import * as otpService from "../services/otp.service.js";

export const generateOtp = async (req, res) => {
  const { phone, purpose } = req.body;
  try {
    const otp = await otpService.generateOtp(phone, purpose);
    res.status(200).json({ success: true, otp: otp });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  const { phone, otp, purpose } = req.body;
  try {
    await otpService.verifyOtp(phone, otp, purpose);

    if (purpose === "login") {
      const [rows] = await db.query("SELECT id FROM users WHERE phone = ?", [
        phone,
      ]);

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No account found with this number.",
        });
      }

      const userId = rows[0].id;

      const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        token,
        userId,
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
