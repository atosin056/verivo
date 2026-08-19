export const verifyOtp = async (req, res) => {
  const { phone, otp, purpose } = req.body;
  try {
    await otpService.verifyOtp(phone, otp, purpose);

    // only issue a token if this OTP was for logging in
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

    // any other purpose (e.g. registration) — just confirm OTP was correct, no token yet
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
