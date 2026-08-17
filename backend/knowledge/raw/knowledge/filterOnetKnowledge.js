const fs = require("fs");

const INPUT_FILE = "./knowledge.json";
const OUTPUT_FILE = "./phone-repair-knowledge.json";

// All the repair-related SOC codes you've targeted so far
const TARGET_SOC_CODES = [
  "49-2011.00", // Computer, ATM, and Office Machine Repairers
  "49-2021.00", // Radio, Cellular, and Tower Equipment Installers and Repairers
  "49-2022.00", // Telecom Equipment Installers and Repairers
  "49-2094.00", // Electrical and Electronics Repairers, Commercial and Industrial
  "49-2096.00", // Electronic Equipment Installers and Repairers, Motor Vehicles
  "49-2097.00", // Audiovisual Equipment Installers and Repairers
];

const data = JSON.parse(fs.readFileSync(INPUT_FILE, "utf8"));
const rows = data.row;

const filtered = rows.filter((r) => TARGET_SOC_CODES.includes(r.onetsoc_code));

// Unique key: occupation + element + scale (IM/LV) — NOT task_id, this dataset has no tasks
const unique = Array.from(
  new Map(
    filtered.map((r) => [`${r.onetsoc_code}-${r.element_id}-${r.scale_id}`, r]),
  ).values(),
);

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(unique, null, 2));

console.log("=================================");
console.log("O*NET KNOWLEDGE DATA REBUILD");
console.log("=================================");
console.log(`Total rows scanned: ${rows.length}`);
console.log(`Rows kept: ${unique.length}`);

const perSoc = {};
unique.forEach((r) => {
  perSoc[r.onetsoc_code] = (perSoc[r.onetsoc_code] || 0) + 1;
});
console.log("\nRows per occupation:");
Object.entries(perSoc).forEach(([code, count]) => {
  console.log(`  ${code}: ${count} rows`);
});
console.log("=================================");
