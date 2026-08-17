import * as otpService from "../services/otp.service.js";
export const generateOtp = async (req, res) => {
  const { phone, purpose } = req.body;
  try {
    const otp = await otpService.generateOtp(phone, purpose);
    res.status(200).json({
      success: true,
      message: "OTP successfully generated",
      otp: otp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
      request: req.body,
    });
    console.log("error message", error.message);
  }
};

//verify the otp
export const verifyOtp = async (req, res) => {
  const { phone, otp, purpose } = req.body;
  try {
    await otpService.verifyOtp(phone, otp, purpose);
    res.status(200).json({
      success: true,
      message: "OTP verified Successfully",
    });
  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
