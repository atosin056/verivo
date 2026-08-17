import React from "react";
import { ArrowLeft, ArrowUpRight, CornerDownLeft } from "lucide-react";

const tokens = {
  bg: "#F4F0E6",
  border: "#DCD5C4",
  backText: "#B8AF9C",
  hintText: "#8A8171",
  hintIcon: "#5B4FBF",
  buttonBg: "#12362B",
  buttonText: "#F5F1E8",
};

export default function ApplyFooterNav({
  onBack,
  onContinue,
  continueLabel = "Continue",
  loading = false,
}) {
  return (
    <div
      style={{
        borderTop: `1px solid ${tokens.border}`,
        paddingTop: 10,
        paddingBottom: 10,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <button
        onClick={onBack}
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "none",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          color: tokens.backText,
          padding: 0,
        }}
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Back
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13px",
            color: tokens.hintText,
          }}
        >
          <CornerDownLeft size={14} strokeWidth={2} color={tokens.hintIcon} />
          to continue
        </div>

        <button
          onClick={onContinue}
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: tokens.buttonBg,
            color: tokens.buttonText,
            border: "none",
            borderRadius: "999px",
            padding: "14px 26px",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Submitting…" : continueLabel}
          <ArrowUpRight size={17} strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
