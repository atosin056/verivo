import { useState } from "react";
import { CloudCheck, X } from "lucide-react";
import logo from "../assets/logo.png";

const tokens = {
  paper: "#F4EFE6",
  border: "#D6CDB8",
  ink: "#14110F",
  inkMuted: "#6B6055",
  emerald: "#0F3D2E",
  bone: "#FBF7EF",
};

export default function InterviewTopbar({
  logoText = "Recivo",
  saveStatus = "Auto-saved · just now",
  currentStep = 1,
  totalSteps = 15,
  onSaveExit,
}) {
  const [exitHover, setExitHover] = useState(false);
  const progressPct = Math.min(Math.max(currentStep / totalSteps, 0), 1) * 100;

  return (
    <div style={{ width: "100%", height: "3.5", position: "sticky", top: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "clamp(20px, 5vw, 64px)",
          background: "lab(94.6549% .590444 4.9919 / .85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${tokens.border}`,
          height: "4rem",
        }}
      >
        {/* left: logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <img
              src={logo}
              className="logo"
              alt="Verivo logo"
              style={{ width: "24px", height: "24px" }}
            />
            <h4
              className="logoText"
              style={{ color: "#000", margin: 0, fontSize: "15px" }}
            >
              Verivo
            </h4>
          </div>
        </div>

        {/* center: autosave status + step counter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12.5px",
            color: tokens.inkMuted,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <CloudCheck size={14} />
            <span style={{ fontFamily: "Instrument Sans", fontSize: "11.5px" }}>
              {saveStatus}
            </span>
          </span>
          <span style={{ color: `${tokens.inkMuted}66` }}>|</span>
          <span>
            {String(currentStep).padStart(2, "0")} /{" "}
            {String(totalSteps).padStart(2, "0")}
          </span>
        </div>

        {/* right: save & exit */}
        <button
          type="button"
          onClick={onSaveExit}
          onMouseEnter={() => setExitHover(true)}
          onMouseLeave={() => setExitHover(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: exitHover ? tokens.ink : tokens.inkMuted,
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 400,
            transition: "color 0.2s ease",
          }}
        >
          <X size={13} />
          Save &amp; exit
        </button>
      </div>

      {/* progress bar */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: `${tokens.border}66`,
        }}
      >
        <div
          style={{
            width: `${progressPct}%`,
            height: "100%",
            background: tokens.emerald,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Usage:
//
// <InterviewTopbar
//   currentStep={1}
//   totalSteps={15}
//   saveStatus="Auto-saved · just now"
//   onSaveExit={() => navigate("/app")}
// />
// ---------------------------------------------------------------------
