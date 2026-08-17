import { ArrowRight } from "lucide-react";

const tokens = {
  ink: "#1C1C1C",
  bone: "#EFEBE0",
  gold: "#B08D57",
  mutedLight: "rgba(239, 235, 224, 0.6)",
  ringTrack: "rgba(239, 235, 224, 0.15)",
};

// Simple ring — value/max drives the stroke-dasharray. Swap the math if you
// end up wanting an animated fill instead of a static arc.
function MetricRing({ value, max = 100, label, sublabel, size = 76 }) {
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const dash = circumference * pct;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "18px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <svg width={size} height={size} style={{ flexShrink: 0 }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tokens.ringTrack}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tokens.gold}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fill={tokens.bone}
          fontFamily="'Fraunces', serif"
          fontSize="22"
        >
          {value}
        </text>
      </svg>

      <div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: tokens.mutedLight,
            marginBottom: "4px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13px",
            color: tokens.bone,
            lineHeight: 1.3,
          }}
        >
          {sublabel}
        </div>
      </div>
    </div>
  );
}

export default function IseScoreCard({
  score,
  maxScore = 100,
  knowledge,
  knowledgeSublabel = "From diagnostic",
  trust,
  trustSublabel = "From Squad-confirmed jobs",
  weight = "1.00", // TODO: confirm this is meant to be dynamic or a fixed constant
  footerText,
  onBreakdownClick,
}) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: tokens.ink,
        borderRadius: "20px",
        padding: "28px",
        color: tokens.bone,
      }}
    >
      {/* Ambient blobs — sit behind content, clipped by overflow: hidden above */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(176, 137, 35, 0.5) 0%, rgba(176, 137, 35, 0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          right: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(45, 138, 100, 0.45) 0%, rgba(45, 138, 100, 0) 70%)",
        }}
      />

      {/* Header row */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: tokens.mutedLight,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          Işẹ́ Score
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            ·{" "}
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4CD37B",
              }}
            />{" "}
            LIVE
          </span>
        </div>

        <button
          type="button"
          onClick={onBreakdownClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            color: tokens.mutedLight,
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Breakdown <ArrowRight size={14} />
        </button>
      </div>

      {/* Big score */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
          margin: "8px 0 24px 0",
        }}
      >
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "112px",
            lineHeight: 1,
          }}
        >
          {score}
        </span>
        <span
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "18px",
            color: tokens.mutedLight,
            marginBottom: "8px",
          }}
        >
          /{maxScore}
        </span>
      </div>

      {/* Rings row */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <MetricRing
          value={knowledge}
          label="Knowledge"
          sublabel={knowledgeSublabel}
        />

        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: tokens.mutedLight,
            }}
          >
            α = {weight}
          </div>
          <div
            style={{
              width: "1px",
              height: "36px",
              background: "rgba(255,255,255,0.15)",
              margin: "6px auto",
            }}
          />
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: tokens.mutedLight,
              textTransform: "uppercase",
            }}
          >
            weighted
          </div>
        </div>

        <MetricRing value={trust} label="Trust" sublabel={trustSublabel} />
      </div>

      {/* Footer copy */}
      {footerText && (
        <p
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13px",
            color: tokens.mutedLight,
            lineHeight: 1.6,
            marginTop: "24px",
            marginBottom: 0,
          }}
        >
          {footerText}
        </p>
      )}
    </div>
  );
}
