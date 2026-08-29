import db from "../db/connection.js";
export const topup = async (employerId, amount) => {
  //lookup the user with the id
  const [rows] = await db.query("SELECT * FROM employers WHERE id = ?", [
    employerId,
  ]);
  if (rows.length === 0) {
    throw new Error("Employer not found");
  }

  //update balance
  await db.query("UPDATE employers SET balance = balance + ? WHERE id = ?", [
    amount,
    employerId,
  ]);
  return true;
};
