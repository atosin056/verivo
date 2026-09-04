import calculateInterviewScore from "./grading.service.js";
import { getKnowledgeScore } from "./extractisescore.service.js";
import { updateIseScore } from "./updateisescore.service.js";

export async function gradeAndScoreWorker({ interview, workerId }) {
  if (!workerId) {
    const err = new Error("workerId is required");
    err.statusCode = 400;
    throw err;
  }

  const results = await calculateInterviewScore(interview);
  const K = getKnowledgeScore(results);

  if (K === null) {
    const err = new Error("Could not grade the interview question");
    err.statusCode = 422;
    throw err;
  }

  const { ise, T, jobsCompleted, ratingCount, hadRatings } =
    await updateIseScore(workerId, K);

  return {
    results,
    knowledgeScore: K,
    trustScore: T,
    jobsCompleted,
    ratingCount,
    hadRatings,
    ise,
  };
}
