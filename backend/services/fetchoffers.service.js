import db from "../db/connection.js";

const fetchoffersservice = async (userId) => {
  const [data] = await db.execute(
    `SELECT
       jobs.id,
       jobs.title,
       jobs.location,
       jobs.description,
       jobs.budget,
       jobs.state,
       jobs.employer_id,
       jobs.assigned_worker_id,
       jobs.deadline,
       jobs.created_at,
       jobs.updated_at,
       jobs.status,
       users.name AS employer_name,
       users.phone AS employer_phone
     FROM jobs
     JOIN users ON users.id = jobs.employer_id
     WHERE jobs.assigned_worker_id = ?
       AND jobs.status = 'assigned'`,
    [userId],
  );
  return data;
};

export default fetchoffersservice;
