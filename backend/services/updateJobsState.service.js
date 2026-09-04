import db from "../db/connection.js";

export const VALID_STATES = [
  "funded_awaiting_accept",
  "in_progress",
  "awaiting_confirm",
  "complete",
  "disputed",
];

export async function updateJobState({ jobId, employerId, status, rating }) {
  if (!VALID_STATES.includes(status)) {
    const err = new Error(`Invalid status: ${status}`);
    err.statusCode = 400;
    throw err;
  }

  if (status !== "complete") {
    const [result] = await db.execute(
      "UPDATE jobs SET status = ? WHERE id = ? AND employer_id = ?",
      [status, jobId, employerId],
    );
    return result;
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    const err = new Error(
      "A rating (1-5) is required when marking a job complete",
    );
    err.statusCode = 400;
    throw err;
  }

  const [rows] = await db.execute(
    "SELECT status, assigned_worker_id FROM jobs WHERE id = ? AND employer_id = ?",
    [jobId, employerId],
  );

  if (rows.length === 0) {
    const err = new Error("Job not found or not owned by this employer");
    err.statusCode = 404;
    throw err;
  }

  const job = rows[0];
  const alreadyComplete = job.status === "complete";

  const [updateResult] = await db.execute(
    "UPDATE jobs SET status = ?, rating = ? WHERE id = ? AND employer_id = ?",
    [status, rating, jobId, employerId],
  );

  if (!alreadyComplete && job.assigned_worker_id) {
    await db.execute("UPDATE users SET jobCount = jobCount + 1 WHERE id = ?", [
      job.assigned_worker_id,
    ]);
  }

  return updateResult;
}
