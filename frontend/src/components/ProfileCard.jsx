import { useState } from "react";
import {
  Camera,
  ShieldCheck,
  Wrench,
  MapPin,
  Pencil,
  Check,
  CheckCircle2,
  Sparkles,
  Globe,
  Phone,
} from "lucide-react";
import useBreakpoint from "../hooks/useBreakpoint.js";

const tokens = {
  ink: "#14110F",
  paper: "#FBF9F3",
  border: "#E7E2D3",
  bone: "#FBF7EF",
  emerald: "#0F3D2E",
  gold: "#B08D57",
  inkMuted: "#6B6055",
  mutedLight: "rgba(251, 247, 239, 0.65)",
};

const GLANCE_ICONS = {
  check: CheckCircle2,
  sparkle: Sparkles,
  globe: Globe,
  phone: Phone,
};

function StatPill({ label, value }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "10px",
        padding: "10px 16px",
        minWidth: "70px",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: tokens.mutedLight,
          marginBottom: "6px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "22px",
          color: tokens.bone,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function ProfileCard({
  initials = "",
  name,
  verifiedLabel = "Verivo · Verified",
  trade,
  location,
  knowledge = 0,
  trust = 0,
  iseScore = 0,
  bio,
  skills = [],
  glanceItems = [],
  rate,
  rateNote,
  onReplacePhoto,
  onEditBio,
}) {
  const [photoHover, setPhotoHover] = useState(false);
  const [editHover, setEditHover] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <div
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        border: `1px solid ${tokens.border}`,
      }}
    >
      {/* dark header banner */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${tokens.ink} 0%, ${tokens.emerald} 140%)`,
          padding: isMobile ? "20px" : "28px",
          minHeight: isMobile ? "auto" : "350px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: isMobile ? "24px" : 0,
        }}
      >
        {/* watermark initials — dropped on mobile, it just eats space and adds nothing there */}
        {initials && !isMobile && (
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "'Fraunces', serif",
              fontSize: "220px",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {initials}
          </span>
        )}

        {/* top row: replace photo button */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={onReplacePhoto}
            onMouseEnter={() => setPhotoHover(true)}
            onMouseLeave={() => setPhotoHover(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: photoHover
                ? "rgba(255,255,255,0.16)"
                : "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "999px",
              padding: "9px 16px",
              color: tokens.bone,
              fontFamily: "'Poppins', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
          >
            <Camera size={14} />
            {!isMobile && "Replace photo"}
          </button>
        </div>

        {/* bottom row: identity + stat pills */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "999px",
                padding: "5px 12px",
                width: "fit-content",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: tokens.bone,
              }}
            >
              <ShieldCheck size={12} />
              {verifiedLabel}
            </div>

            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: isMobile ? "28px" : "38px",
                fontWeight: 500,
                color: tokens.bone,
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {name}
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "13.5px",
                color: tokens.mutedLight,
              }}
            >
              {trade && (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <Wrench size={13} />
                  {trade}
                </span>
              )}
              {location && (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <MapPin size={13} />
                  {location}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <StatPill label="Knowledge" value={knowledge} />
            <StatPill label="Trust" value={trust} />
            <StatPill label="Iṣẹ́" value={iseScore} />
          </div>
        </div>
      </div>

      {/* light detail panel */}
      <div
        style={{
          background: tokens.paper,
          padding: isMobile ? "20px" : "26px 28px",
          display: "grid",
          gridTemplateColumns: isTablet ? "1fr" : "1.6fr 1fr",
          gap: isMobile ? "20px" : "30px",
        }}
      >
        {/* left: bio + skills */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: tokens.inkMuted,
              }}
            >
              In my own words
            </span>
            <button
              type="button"
              onClick={onEditBio}
              onMouseEnter={() => setEditHover(true)}
              onMouseLeave={() => setEditHover(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: editHover ? tokens.ink : tokens.inkMuted,
                fontFamily: "'Poppins', sans-serif",
                fontSize: "13px",
                transition: "color 0.2s ease",
              }}
            >
              <Pencil size={12} />
              Edit
            </button>
          </div>

          {bio && (
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "15px",
                lineHeight: 1.6,
                color: tokens.ink,
                margin: 0,
              }}
            >
              {bio}
            </p>
          )}

          {skills.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "4px",
              }}
            >
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: tokens.emerald,
                    color: tokens.bone,
                    borderRadius: "999px",
                    padding: "8px 16px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  <Check size={13} />
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* right: at a glance */}
        <div
          style={{
            background: tokens.bone,
            border: `1px solid ${tokens.border}`,
            borderRadius: "16px",
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: tokens.inkMuted,
            }}
          >
            At a glance
          </span>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {glanceItems.map((item, idx) => {
              const Icon = GLANCE_ICONS[item.icon] || CheckCircle2;
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "13.5px",
                    color: tokens.ink,
                  }}
                >
                  <Icon size={14} color={tokens.gold} />
                  {item.text}
                </div>
              );
            })}
          </div>

          {(rate || rateNote) && (
            <>
              <div style={{ height: "1px", background: tokens.border }} />
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "13px",
                  color: tokens.ink,
                }}
              >
                {rate}
                {rate && rateNote ? " · " : ""}
                {rateNote}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
