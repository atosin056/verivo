const fs = require("fs");

// ---- INPUT FILES ----
const TASKS_FILE = "./phone-repair-tasks-clean.json"; // O*NET task statements, already deduped
const NBTE_FILE = "./Phonerepairchunks.json"; // NBTE curriculum performance criteria
const SCENARIOS_FILE = "./synthetic-troubleshooting-scenarios.json"; // LLM-generated, unverified

// ---- OUTPUT FILES ----
const CHUNKS_OUT = "./pinecone-chunks.json"; // ready to embed + upsert to Pinecone
const TOPIC_WEIGHTS_OUT = "./topic-weights.json"; // placeholder — built separately from Knowledge/Skills data

function loadJSON(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

const chunks = [];

// ---------------------------------------------------------------------------
// 1. O*NET TASK STATEMENTS -> content_type: "task"
// ---------------------------------------------------------------------------
const tasks = loadJSON(TASKS_FILE);
tasks.forEach((t) => {
  chunks.push({
    id: `task-${t.onetsoc_code}-${t.task_id}`,
    text: t.task, // the actual sentence to embed
    metadata: {
      trade: t.trade || "mobile_phone_repair",
      content_type: "task",
      category: t.task_type || "general", // Core / Supplemental
      onetsoc_code: t.onetsoc_code,
      occupation_title: t.title,
      source: "ONET",
      verified: true,
    },
  });
});

// ---------------------------------------------------------------------------
// 2. NBTE PERFORMANCE CRITERIA -> content_type: "performance_criterion"
// ---------------------------------------------------------------------------
const nbte = loadJSON(NBTE_FILE);
nbte.forEach((c) => {
  chunks.push({
    id: c.id,
    text: c.text,
    metadata: {
      trade: c.trade || "mobile_phone_repair",
      content_type: c.content_type || "performance_criterion",
      category: c.source?.unit_title || "general",
      unit_reference: c.source?.unit_reference || "",
      learning_objective: c.learning_objective?.title || "",
      performance_criterion_id: c.performance_criterion?.id || "",
      source: "NBTE",
      verified: true,
    },
  });
});

// ---------------------------------------------------------------------------
// 3. SYNTHETIC TROUBLESHOOTING SCENARIOS -> content_type: "troubleshooting_scenario"
//    Embed the symptom text (closest to how a real query/topic would read);
//    keep diagnosis/reasoning/distractors in metadata for the LLM to use
//    once this chunk is retrieved.
// ---------------------------------------------------------------------------
const scenarioData = loadJSON(SCENARIOS_FILE);
scenarioData.scenarios.forEach((s) => {
  chunks.push({
    id: s.id,
    text: s.symptom,
    metadata: {
      trade: scenarioData._meta.trade || "mobile_phone_repair",
      content_type: "troubleshooting_scenario",
      category: s.category,
      difficulty: s.difficulty,
      device_context: s.device_context,
      correct_diagnosis: s.correct_diagnosis,
      distractor_causes: s.distractor_causes || [],
      diagnostic_steps: s.diagnostic_steps || [],
      fix_summary: s.fix_summary,
      generated_question_example: s.generated_question_example,
      source: "llm_generated_synthetic",
      verified: false, // IMPORTANT: not technician-reviewed
    },
  });
});

fs.writeFileSync(CHUNKS_OUT, JSON.stringify(chunks, null, 2));

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log("=================================");
console.log("PINECONE CHUNK BUILD COMPLETE");
console.log("=================================");
console.log(`Total chunks: ${chunks.length}`);

const byType = {};
const bySource = {};
chunks.forEach((c) => {
  byType[c.metadata.content_type] = (byType[c.metadata.content_type] || 0) + 1;
  bySource[c.metadata.source] = (bySource[c.metadata.source] || 0) + 1;
});

console.log("\nBy content_type:");
Object.entries(byType).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

console.log("\nBy source:");
Object.entries(bySource).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

console.log(`\nWritten to: ${CHUNKS_OUT}`);
console.log("=================================");
console.log(
  "NOTE: Knowledge + Skills data intentionally excluded from chunks.",
);
console.log(
  "Those go into a separate topic-weight file (not embedded/searched),",
);
console.log("used to bias question frequency/difficulty per category, not as");
console.log("retrievable RAG content.");
