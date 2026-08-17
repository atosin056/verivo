export const buildGradingPrompt = (interview) => {
  const pairsText = interview
    .map((item, idx) => {
      const points = item.key_points
        .map((kp, i) => `   ${i + 1}. ${kp}`)
        .join("\n");
      return `
Question ${idx + 1}: ${item.question}

Reference key points (what a competent answer should cover):
${points}

Worker's answer: ${item.userAnswer || "[No answer given]"}
`;
    })
    .join("\n---\n");

  return `
You are grading a diagnostic interview for a skilled trades worker (phone repair).
For each question, judge how many of the reference key points the worker's
answer demonstrates understanding of — even if worded differently, in Pidgin,
or less formally than the reference. Do not penalize brevity if the correct
diagnostic logic is present. Do not reward length or polish that doesn't map
to a key point.

Scoring guide:
- 0: the answer is empty, blank, or completely unrelated to the question (e.g. talks about something else entirely).
- Low but non-zero (roughly 5-20): the worker made a real, on-topic diagnostic attempt — named plausible components, described a troubleshooting action, or showed some structured thinking — but missed every reference key point or pursued the wrong root cause. This reflects genuine effort and some diagnostic instinct, even if the specific diagnosis is incorrect.
- Otherwise: score roughly proportional to how many key points are genuinely covered.

Reserve a strict 0 only for truly empty or off-topic answers — an attempted,
on-topic diagnostic answer should never score a flat 0, even if it misses
every specific key point.

If a reference key point bundles multiple distinct checks or actions (e.g.
"Safe Mode, OS updates, Factory Reset"), only mark it as fully covered if
the worker's answer addresses ALL parts of it. If the worker only addresses
some parts, treat it as NOT covered — put it in points_missed, and mention
in reasoning which sub-part(s) were addressed and which were not.

${pairsText}

Respond ONLY with a JSON array, one object per question, in the same order given,
in this exact shape — nothing else, no markdown, no code fences:
[
  {
    "points_covered": ["<key point text or short label>", ...],
    "points_missed": ["<key point text or short label>", ...],
    "score": <integer 0-100, roughly proportional to points_covered / total points>,
    "reasoning": "<one short sentence>"
  },
  ...
]
  `.trim();
};
