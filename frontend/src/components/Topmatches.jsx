import React from "react";
import { MapPin, Play } from "lucide-react";

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatRate(rate) {
  const symbol = rate.currency === "NGN" ? "₦" : rate.currency;
  const unitAbbrev = { day: "/d", hour: "/hr", job: "/job" }[rate.unit] ?? "";
  return `${symbol}${rate.amount.toLocaleString()}${unitAbbrev}`;
}

const AVATAR_PALETTE = ["#0f766e", "#c2410c", "#4338ca", "#9f1239"];

function Avatar({ name, avatarUrl, index }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />
    );
  }
  const color = AVATAR_PALETTE[index % AVATAR_PALETTE.length];
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 14,
        fontWeight: 600,
        backgroundColor: color,
      }}
    >
      {initials(name)}
    </div>
  );
}

function MatchCard({ match, index, onReplay }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        borderRadius: 16,
        border: "1px solid #d6cdb8",

        padding: 16,
      }}
    >
      <span
        style={{
          fontSize: 10.5,
          fontWeight: 500,
          color: "#6b6055",
          width: 24,
          fontFamily: "JetBrains Mono",
          flexShrink: 0,
        }}
      >
        {String(match.rank).padStart(2, "0")}
      </span>

      <Avatar name={match.name} avatarUrl={match.avatarUrl} index={index} />

      <div style={{ minWidth: 0, flex: 1 }}>
        <p
          style={{
            fontWeight: 500,
            color: "#14110f",
            lineHeight: 1.3,
            fontSize: 14,
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontFamily: "Instrument Sans",
            textOverflow: "ellipsis",
          }}
        >
          {match.name}
        </p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11.5,
            fontFamily: "Instrument Sans",
            color: "#6b6055",
            margin: "2px 0 0",
          }}
        >
          <MapPin size={14} style={{ flexShrink: 0 }} />
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {match.location}
          </span>
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 8,
          }}
        >
          {match.skills.map((skill) => (
            <span
              key={skill}
              style={{
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "Instrument Sans",
                color: "#57534e",
                backgroundColor: "rgba(231, 229, 220, 0.8)",
                borderRadius: 999,
                padding: "4px 12px",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: "#0f3d2e",
              fontFamily: "Fraunces",
              lineHeight: 1,
            }}
          >
            {match.trustScore}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#6b6055",
              fontFamily: "JetBrains Mono",

              textTransform: "uppercase",
            }}
          >
            Iṣẹ́
          </div>
        </div>
        <button
          type="button"
          onClick={() => onReplay?.(match)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "#1c1917",
            color: "#fff",
            fontSize: 11.5,
            fontFamily: "Instrument Sans",
            fontWeight: 400,
            border: "none",
            borderRadius: 999,
            padding: "6px 16px 6px 12px",
            cursor: "pointer",
          }}
        >
          <Play size={12} fill="currentColor" />
          Replay
        </button>
      </div>
    </div>
  );
}

export default function TopMatches({
  matches,
  isLoading = false,
  title = "Top matches, as you type",
  subtitle = "Verivo ranks the pool the moment we have enough signal. Replay anyone before you fund.",
  onReplay,
}) {
  return (
    <div
      style={{
        maxWidth: 576,
        margin: "0 auto",
        backgroundColor: "#F3EFE6",
      }}
    >
      <h2
        style={{
          fontSize: 24,
          fontWeight: 400,
          letterSpacing: "-0.08em",
          color: "#14110f",
          margin: 0,
          fontFamily: "Fraunces",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: 12.5,
          color: "#78716c",
          margin: "4px 0 20px",
          lineHeight: 1.6,
          fontFamily: "Instrument Sans",
        }}
      >
        {subtitle}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 92,
                borderRadius: 16,
                border: "1px solid rgba(214, 211, 199, 0.7)",
                backgroundColor: "#fafaf9",
              }}
            />
          ))
        ) : matches.length === 0 ? (
          <div
            style={{
              borderRadius: 16,
              border: "1px solid rgba(214, 211, 199, 0.7)",
              backgroundColor: "#fafaf9",
              padding: "24px 16px",
              textAlign: "center",
              fontSize: 14,
              color: "#78716c",
            }}
          >
            No matches yet — keep typing to narrow the pool.
          </div>
        ) : (
          matches.map((match, i) => (
            <MatchCard
              key={match.id}
              match={match}
              index={i}
              onReplay={onReplay}
            />
          ))
        )}
      </div>

      <div
        style={{
          marginTop: 12,
          borderRadius: 16,
          border: "1px solid rgba(214, 211, 199, 0.7)",
          fontFamily: "Instrument Sans",
          padding: "12px 16px",
          fontSize: 12.5,
          color: "#57534e",
          lineHeight: 1.6,
        }}
      >
        <span style={{ fontWeight: 600, color: "#1c1917" }}>
          Anti-circumvention.{" "}
        </span>
        Off-platform jobs are invisible to the worker's Trust Score, so doing it
        on-Verivo is in their interest too. Going around us makes hiring cheaper
        short-term, more expensive long-term.
      </div>
    </div>
  );
}
