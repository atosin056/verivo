import db from "../db/connection.js";
const fetchjobsservice = async (employerId) => {
  if (!employerId) {
    throw new Error("employerId is required");
  }
  const [jobs] = await db.execute("SELECT * FROM jobs WHERE employer_id = ?", [
    employerId,
  ]);
  return jobs;
};

export default fetchjobsservice;
