const tokens = {
  ink: "#14110F",
  emerald: "#0F3D2E",
  inkMuted: "#6B6055",
};

/**
 * ApplyIntro
 * ----------
 * The welcome/step-intro block at the top of each application step —
 * kept separate from SectionHeader since this one's personalized
 * (name-interpolated body copy) and step-numbered rather than a generic
 * page header.
 *
 * Props:
 * ------
 * stepLabel     (string) small caps label, e.g. "01 · Begin"
 * leadText      (string) plain part of the heading, e.g. "Welcome."
 * emphasisText  (string) italic emerald part, e.g. "Let's build your credential."
 * name          (string) inserted into the body copy, e.g. "Test"
 * body          (string) the paragraph — use {name} anywhere you want the
 *                        name prop dropped in, e.g. "Hello {name}. The next..."
 */
export default function ApplyIntro({
  stepLabel = "01 · Begin",
  leadText = "Welcome.",
  emphasisText,
  trailText = "",
  name = "",
  body = "",
}) {
  const bodyWithName = body.replace(/{name}/g, name);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10.5px",
          fontWeight: 400,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: tokens.inkMuted,
        }}
      >
        {stepLabel}
      </span>

      <h1
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "clamp(1.7rem, 6vw, 3.2rem)",
          fontWeight: 400,
          color: tokens.ink,
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          margin: 0,
        }}
      >
        {leadText}{" "}
        {emphasisText && (
          <span style={{ fontStyle: "italic", color: tokens.emerald }}>
            {emphasisText}
          </span>
        )}{" "}
        {trailText}
      </h1>

      {body && (
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "15px",
            color: tokens.inkMuted,
            lineHeight: 1.65,
            maxWidth: "620px",
            margin: 0,
          }}
        >
          {bodyWithName}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// Usage:
//
// <ApplyIntro
//   stepLabel="01 · Begin"
//   leadText="Welcome."
//   emphasisText="Let's build your credential."
//   name="Test"
//   body="Hello {name}. The next twelve minutes are about your work — who taught you, what you've fixed, what makes you different. We're not interviewing you. We're listening, so the diagnostic interview that comes next can match what you actually do."
// />
// ---------------------------------------------------------------------
