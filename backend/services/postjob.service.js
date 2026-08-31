import db from "../db/connection.js";
const postjobservice = async ({
  title,
  location,
  budget,
  state,
  deadline,
  description,
  employerId,
}) => {
  //check if the employer is a valid user
  const [rows] = await db.execute(
    "SELECT id FROM employers WHERE id = ? LIMIT 1",
    [employerId],
  );

  if (rows.length === 0) {
    throw new Error("EMPLOYER_NOT_FOUND");
  }

  await db.execute(
    "INSERT INTO jobs (title, location, description, budget, state, employer_id, deadline, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
    [title, location, description, budget, state, employerId, deadline],
  );

  return true;
};

export default postjobservice;
