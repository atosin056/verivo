import db from "../db/connection.js";

/**
 * updateOfferStatusService
 * Applies a status transition to an offer (jobs row).
 *
 * - status = "active"  -> accept: flips status, assigned_worker_id stays.
 * - status = "pending" -> reject: flips status back AND clears
 *                         assigned_worker_id so the job re-enters the
 *                         general pool for other workers to be matched.
 */
const updateOfferStatusService = async (jobId, status) => {
  if (status === "accepted") {
    const [result] = await db.execute(
      `UPDATE jobs SET status = 'active' WHERE id = ?`,
      [jobId],
    );
    return result;
  }

  if (status === "rejected") {
    const [result] = await db.execute(
      `UPDATE jobs
       SET status = 'pending', assigned_worker_id = NULL
       WHERE id = ?`,
      [jobId],
    );
    return result;
  }

  throw new Error(`Unsupported status: ${status}`);
};

export default updateOfferStatusService;
