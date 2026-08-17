// Design tokens (match Recivo design system)
const tokens = {
  paper: "#fbf9f3",
  border: "#e7e2d3",
  ink: "#1c1c1a",
  inkMuted: "#8c8a80",
  arrow: "#b0812f",
  note: "#3a5a78",
};

export default function StatCard({
  label = "COMPLETED JOBS",
  value = 0,
  suffix = "",
  description = "",
  prefix = "",
  unit = "",
  note = "",
  noteColor = tokens.note,
  arrowColor = tokens.arrow,
}) {
  return (
    <div
      style={{
        background: "transparent",
        border: `1px solid #d6cdb8`,
        borderRadius: "16px",
        padding: "20px 22px",
        paddingBottom: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        // was: width: "fit-content", minWidth: "230px" — that overflowed
        // narrower grid cells (2-col tablet, 1-col mobile). Filling the
        // cell width lets the parent grid control sizing instead.
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          fontWeight: 400,
          letterSpacing: "0.22em",
          color: "#6b6055",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "18px",
          flexWrap: "wrap",
        }}
      >
        {/* value block — stacks value + unit on separate lines when unit is passed */}
        <div
          style={{
            display: "flex",
            flexDirection: unit ? "column" : "row",
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(28px, 6vw, 40px)",
              fontWeight: 400,
              color: tokens.ink,
              lineHeight: 1,
            }}
          >
            {prefix}
            {value}
            {!unit && suffix}
          </span>
          {unit && (
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(28px, 6vw, 40px)",
                fontWeight: 400,
                color: tokens.ink,
                lineHeight: 1,
              }}
            >
              {unit}
            </span>
          )}
        </div>

        {/* side note — arrow + short label, e.g. "→ Squad Transfer API" */}
        {note && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "6px",
              paddingBottom: "6px",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: arrowColor,
              }}
            >
              →
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                fontWeight: 400,
                color: noteColor,
                lineHeight: 1.55,
                maxWidth: "90px",
              }}
            >
              {note}
            </span>
          </div>
        )}
      </div>

      {description && (
        <span
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: tokens.inkMuted,
            lineHeight: 1.3,
          }}
        >
          {description}
        </span>
      )}
    </div>
  );
}
