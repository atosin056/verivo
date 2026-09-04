// services/fetchcandidate.service.js
import db from "../db/connection.js";

const fetchcandidatedataservice = async (userId) => {
  const [userRows, skillRows, toolRows] = await Promise.all([
    db
      .execute(`SELECT * FROM users WHERE id = ?`, [userId])
      .then(([rows]) => rows),
    db
      .execute(
        `SELECT subSpecialty FROM usersSubSpecialties WHERE userId = ? ORDER BY created_at`,
        [userId],
      )
      .then(([rows]) => rows),
    db
      .execute(
        `SELECT tool FROM userTools WHERE userId = ? ORDER BY created_at`,
        [userId],
      )
      .then(([rows]) => rows),
  ]);

  const worker = userRows[0]; // the actual row object, not an array

  if (!worker) return null;

  return {
    ...worker,
    skills: skillRows.map((row) => row.subSpecialty),
    tools: toolRows.map((row) => row.tool),
  };
};

export default fetchcandidatedataservice;
