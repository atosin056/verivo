import db from "../db/connection.js";

export const generateOtp = async (phone, purpose) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  const [result] = await db.execute(
    `INSERT INTO otp
    (phone, otp_hash, purpose, is_used, expires_at, created_at)
    VALUES (?, ?, ?, 0, ?, NOW())`,
    [phone, otp, purpose, expiresAt],
  );

  if (result.affectedRows === 0) {
    throw new Error("Failed to generate OTP.");
  }

  return otp;
};

export const verifyOtp = async (phone, otp, purpose) => {
  try {
    const [checkOtp] = await db.execute(
      `SELECT * FROM otp
       WHERE phone = ?
       AND otp_hash = ?
       AND purpose = ?
       AND is_used = 0
       AND expires_at >= NOW()`,
      [phone, otp, purpose],
    );

    if (checkOtp.length === 0) {
      throw new Error("Invalid or expired OTP.");
    }
    await db.execute(
      `UPDATE otp
        SET is_used = 1
        WHERE id = ?`,
      [checkOtp[0].id],
    );

    return true;
  } catch (error) {
    throw error;
  }
};
