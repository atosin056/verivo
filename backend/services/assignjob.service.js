// services/assignjob.service.js
import db from "../db/connection.js";

const assignJobService = async (jobId, rawWorkerId) => {
  const workerId = Number(rawWorkerId);

  const [result] = await db.execute(
    `UPDATE jobs
     SET assigned_worker_id = ?, status = 'assigned'
     WHERE id = ? AND assigned_worker_id IS NULL`,
    [workerId, jobId],
  );

  if (result.affectedRows > 0) {
    return { success: true };
  }

  // Something blocked it — only now do we pay for a second query, to explain why.
  const [rows] = await db.execute(
    "SELECT assigned_worker_id FROM jobs WHERE id = ?",
    [jobId],
  );
  const job = rows[0];

  if (!job) {
    throw new Error("Job not found");
  }
  if (job.assigned_worker_id === workerId) {
    throw new Error("This worker is already assigned to this job");
  }
  throw new Error("This job is already assigned to a different worker");
};

export default assignJobService;
