/**
 * Extracts the Knowledge score (K) from Verivo's diagnostic interview.
 * The interview is always exactly one question, so K is just that
 * question's graded score — no averaging involved.
 */
export function getKnowledgeScore(gradingResults) {
  const score = gradingResults?.[0]?.score;

  if (score === null || score === undefined) {
    // The question failed to grade — nothing to score.
    return null;
  }

  return score;
}
