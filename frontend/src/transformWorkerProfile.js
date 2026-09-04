// utils/transformWorkerProfile.js

const TRADE_LABELS = {
  phone_repair: "Phone repair",
  generator_repair: "Generator repair",
  tailoring: "Tailoring",
  welder: "Welder",
  auto_mechanic: "Auto mechanic",
  electrician: "Electrician",
};

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function transformWorkerProfile(raw) {
  return {
    initials: getInitials(raw.name),
    name: raw.name,
    verifiedLabel:
      raw.status === "verified" ? "Verivo · Verified" : "Unverified",
    trade: TRADE_LABELS[raw.trade] ?? raw.trade,
    location: [raw.marketarea, raw.city].filter(Boolean).join(", "),
    knowledge: raw.knowledgeScore ?? 0,
    trust: raw.trustScore ?? 0,
    iseScore: raw.iseScore ?? 0,
    bio: [
      raw.yearSetup && `Working since ${raw.yearSetup}.`,
      raw.mastersname && `Trained under ${raw.mastersname}.`,
      raw.pitch,
    ]
      .filter(Boolean)
      .join(" "),
    skills: raw.skills ?? [],
    glanceItems: [
      { icon: "check", text: `${raw.jobCount ?? 0} Paystack-confirmed jobs` },
      { icon: "sparkle", text: `${raw.repeatPercent ?? 0}% repeat customers` },
      { icon: "globe", text: raw.language },
    ],
    rate: null, // still unresolved — where does this come from?
    rateNote: null,
    tools: raw.tools ?? [],
    reviews: [], // proudjobstory/difficultcustomerstory still unresolved
  };
}
