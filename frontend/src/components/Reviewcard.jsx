import { Star } from "lucide-react";

const tokens = {
  paper: "#F4EFE6",
  border: "#d6cdb8",
  ink: "#14110F",
  inkMuted: "#6B6055",
  gold: "#B08D57",
  note: "#2a2521",
};

export default function ReviewCard({
  name,
  customerTag,
  timeAgo,
  rating = 5,
  maxRating = 5,
  quote,
  tags = [],
}) {
  return (
    <div
      style={{
        background: tokens.paper,
        border: `1px solid ${tokens.border}`,
        borderRadius: "16px",
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* header row: name + tag / timestamp */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: tokens.ink,
          }}
        >
          {name}
          {customerTag && (
            <span style={{ fontWeight: 400, color: tokens.inkMuted }}>
              {" "}
              · {customerTag}
            </span>
          )}
        </span>
        {timeAgo && (
          <span
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "12.5px",
              color: tokens.inkMuted,
            }}
          >
            {timeAgo}
          </span>
        )}
      </div>

      {/* star rating */}
      <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: maxRating }).map((_, idx) => (
          <Star
            key={idx}
            size={15}
            fill={idx < rating ? tokens.gold : "none"}
            color={tokens.gold}
          />
        ))}
      </div>

      {/* quote */}
      {quote && (
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontStyle: "italic",
            fontSize: "14px",
            lineHeight: 1.6,
            color: tokens.note,
            margin: 0,
          }}
        >
          “{quote}”
        </p>
      )}

      {/* tag pills */}
      {tags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "6px",
          }}
        >
          {tags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                background: "rgba(20,17,15,0.05)",
                border: `1px solid ${tokens.border}`,
                borderRadius: "999px",
                padding: "6px 14px",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "12.5px",
                color: tokens.ink,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
