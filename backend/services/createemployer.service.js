import db from "../db/connection.js";

export const createemployerservice = async (fullName, phone) => {
  try {
    //INSERT Block
    const [rows] = await db.query(
      "INSERT INTO employers (fullname, phone) VALUES (?, ?)",
      [fullName, phone],
    );
    const employerId = rows.insertId;
    return employerId;
  } catch (err) {
    throw err;
  }
};
