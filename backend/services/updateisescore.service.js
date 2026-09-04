import db from "../db/connection.js";

/**
 * Trust score: average rating across a worker's completed jobs,
 * scaled from the 1-5 star range up to 0-100.
 */
export async function computeTrustScore(workerId) {
  const [rows] = await db.execute(
    "SELECT AVG(rating) AS avgRating, COUNT(rating) AS ratingCount FROM jobs WHERE assigned_worker_id = ? AND status = 'complete' AND rating IS NOT NULL",
    [workerId],
  );

  const { avgRating, ratingCount } = rows[0];

  if (!ratingCount || avgRating === null) {
    // No completed+rated jobs yet — caller decides the fallback.
    return { T: null, ratingCount: 0 };
  }

  const T = (avgRating / 5) * 100;
  return { T, ratingCount };
}

/**
 * alpha = max(0.30, 1 - jobsCompleted / 20)
 * Knowledge weight floors at 30%; Trust weight caps at 70%.
 */
function calculateAlpha(jobsCompleted) {
  return Math.max(0.3, 1 - jobsCompleted / 20);
}

function calculateComposite(K, T, jobsCompleted) {
  const alpha = calculateAlpha(jobsCompleted);
  return alpha * K + (1 - alpha) * T;
}

/**
 * Full pipeline: pull jobCount + trust score for a worker, combine with
 * a freshly-graded knowledge score (K), and persist the composite Iṣẹ́ score.
 */
export async function updateIseScore(workerId, K) {
  const [userRows] = await db.execute(
    "SELECT jobCount FROM users WHERE id = ?",
    [workerId],
  );

  if (userRows.length === 0) {
    const err = new Error("Worker not found");
    err.statusCode = 404;
    throw err;
  }

  const jobsCompleted = userRows[0].jobCount ?? 0;
  const { T, ratingCount } = await computeTrustScore(workerId);

  // No ratings yet — fall back to a neutral midpoint so a brand-new worker
  // isn't dragged to 0 just for lacking job history.
  const trustScore = T ?? 50;

  const ise = calculateComposite(K, trustScore, jobsCompleted);

  await db.execute(
    "UPDATE users SET knowledgeScore = ?, trustScore = ?, iseScore = ? WHERE id = ?",
    [K, trustScore, ise, workerId],
  );

  return {
    ise,
    K,
    T: trustScore,
    jobsCompleted,
    ratingCount,
    hadRatings: T !== null,
  };
}
