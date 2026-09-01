import db from "../db/connection.js";
const fetchjobsservice = async (employerId) => {
  const [jobs] = await db.execute("SELECT * FROM jobs WHERE employer_id = ?", [
    employerId,
  ]);
  return jobs;
};

export default fetchjobsservice;
