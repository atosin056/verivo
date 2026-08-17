import React, { useState } from "react";
import useBreakpoint from "../hooks/useBreakpoint.js";

const tokens = {
  bone: "#F4F1EA",
  emerald: "#0B4D3B",
  ink: "#1A1A1A",
  inkMuted: "#8A8680",
  gold: "#C9A24B",
};

const fonts = {
  display: "'Fraunces', serif",
  body: "'Poppins', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

const STATUS_STYLES = {
  pending: { bg: tokens.gold, text: tokens.ink, label: "PENDING MATCH" },
  active: { bg: tokens.emerald, text: tokens.bone, label: "ACTIVE" },
  disputed: { bg: "#B3261E", text: tokens.bone, label: "DISPUTED" },
  completed: { bg: tokens.inkMuted, text: tokens.bone, label: "COMPLETED" },
};

const PinIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={tokens.inkMuted}
    strokeWidth="2"
  >
    <path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={tokens.inkMuted}
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);

export default function JobCard({
  status = "pending",
  statusLabel,
  category,
  jobNumber,
  title,
  quote,
  location,
  date,
  jobAmount,
  fee,
  receiveAmount,
  onClick,
}) {
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.pending;
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = useBreakpoint();

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        background: tokens.bone,
        border: `1px solid ${isHovered ? statusStyle.bg : `${tokens.inkMuted}33`}`,
        borderRadius: "16px",
        padding: isMobile ? "18px 20px" : "24px 28px",
        boxShadow: isHovered
          ? "0 8px 24px rgba(26, 26, 26, 0.10)"
          : "0 1px 2px rgba(26, 26, 26, 0.02)",
        transform: isHovered ? "translateY(-3px)" : "translateY(0px)",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        fontFamily: fonts.body,
        cursor: onClick ? "pointer" : "default",
        gap: isMobile ? "16px" : "24px",
        boxSizing: "border-box",
      }}
    >
      {/* left content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* top row: badges + job number */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: statusStyle.bg,
                color: statusStyle.text,
                fontFamily: fonts.mono,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                padding: "5px 10px",
                borderRadius: "6px",
              }}
            >
              {statusLabel || statusStyle.label}
            </span>
            {category && (
              <span
                style={{
                  border: `1px solid ${tokens.inkMuted}66`,
                  color: tokens.ink,
                  fontFamily: fonts.body,
                  fontSize: "13px",
                  padding: "5px 12px",
                  borderRadius: "999px",
                }}
              >
                {category}
              </span>
            )}
          </div>
          {jobNumber && (
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: "13px",
                color: tokens.inkMuted,
              }}
            >
              #{jobNumber}
            </span>
          )}
        </div>

        {/* title */}
        <h3
          style={{
            fontFamily: fonts.display,
            fontSize: isMobile ? "20px" : "24px",
            fontWeight: 500,
            color: tokens.ink,
            margin: 0,
          }}
        >
          {title}
        </h3>

        {/* quote */}
        {quote && (
          <div
            style={{
              borderLeft: `2px solid ${tokens.gold}`,
              paddingLeft: "12px",
              fontStyle: "italic",
              fontSize: "14px",
              color: tokens.ink,
            }}
          >
            "{quote}"
          </div>
        )}

        {/* location + date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginTop: "4px",
            flexWrap: "wrap",
          }}
        >
          {location && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <PinIcon />
              <span style={{ fontSize: "13px", color: tokens.inkMuted }}>
                {location}
              </span>
            </div>
          )}
          {date && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ClockIcon />
              <span style={{ fontSize: "13px", color: tokens.inkMuted }}>
                {date}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* divider — vertical bar on desktop, horizontal line on mobile */}
      <div
        style={
          isMobile
            ? {
                height: "1px",
                width: "100%",
                background: `${tokens.inkMuted}33`,
              }
            : { width: "1px", background: `${tokens.inkMuted}33` }
        }
      />

      {/* right content */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          alignItems: isMobile ? "center" : "flex-end",
          justifyContent: isMobile ? "space-between" : "space-between",
          minWidth: isMobile ? "auto" : "160px",
          gap: isMobile ? "12px" : 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "flex-start" : "flex-end",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: tokens.inkMuted,
            }}
          >
            YOU RECEIVE
          </span>
          <span
            style={{
              fontFamily: fonts.display,
              fontSize: isMobile ? "22px" : "28px",
              fontWeight: 500,
              color: tokens.ink,
            }}
          >
            ₦{receiveAmount?.toLocaleString?.() ?? receiveAmount}
          </span>
          {(jobAmount || fee) && (
            <span style={{ fontSize: "12px", color: tokens.inkMuted }}>
              Job ₦{jobAmount?.toLocaleString?.() ?? jobAmount} · fee ₦
              {fee?.toLocaleString?.() ?? fee}
            </span>
          )}
        </div>
        <span
          style={{
            fontSize: "13px",
            color: tokens.inkMuted,
            textTransform: "capitalize",
          }}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
