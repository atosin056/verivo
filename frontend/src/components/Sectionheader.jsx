const tokens = {
  emerald: "#0F3D2E",
  bone: "#EFEBE0",
  ink: "#1C1C1C",
  inkMuted: "#2a2521",
  gold: "#B08D57",
};

export default function SectionHeader({
  eyebrow = "",
  leadText = "",
  emphasisText = "",
  trailText = "",
  description = "",
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          fontWeight: 300,
          letterSpacing: "0.22em",
          color: "#6b6055",
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </span>

      <h1
        style={{
          fontFamily: "'Fraunces'",
          fontSize: "clamp(1.6rem, 6vw, 3rem)",
          fontWeight: 400,
          color: tokens.ink,
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          margin: 0,
        }}
      >
        {leadText}{" "}
        <span style={{ fontStyle: "italic", color: tokens.emerald }}>
          {emphasisText}
        </span>{" "}
        {trailText}
      </h1>

      {description && (
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13.5px",
            fontWeight: 400,
            color: "#2a2521",
            lineHeight: 1.6,
            margin: 0,
            maxWidth: "620px",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// Usage:
// <SectionHeader
//   eyebrow="OFFERS · INBOX"
//   leadText="Read the offer."
//   emphasisText="Counter it."
//   trailText="Then accept."
//   description="When an employer picks you, the offer lands here. Chat in your language, push back on the price, and accept when it's right. Escrow provisions the moment you say yes."
// />
