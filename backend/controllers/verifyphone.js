import db from "../db/connection.js";

const verifyphone = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required." });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE phone = ?", [
      phone,
    ]);

    if (rows.length === 0) {
      const [second] = await db.query(
        "SELECT * FROM employers WHERE phone = ?",
        [phone],
      );
      if (second.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No account found with this number.",
        });
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    }

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export default verifyphone;
