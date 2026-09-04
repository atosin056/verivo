import db from "../db/connection.js";
const fetchacandidateservice = async () => {
  const [candidates] = await db.execute("SELECT * FROM users");
  return candidates;
};
export default fetchacandidateservice;
