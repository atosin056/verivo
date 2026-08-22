import db from "../db/connection.js";
export const getInfo = async (employerId) => {
  try {
    const [rows] = await db.query("SELECT * FROM employers WHERE id = ?", [
      employerId,
    ]);
    return rows[0] || null;
  } catch (err) {
    throw err;
  }
};
