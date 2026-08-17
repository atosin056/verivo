import React from "react";
import { Sparkles } from "lucide-react";

export default function PromiseBanner() {
  return (
    <div
      style={{
        background: "#1C1712",
        borderRadius: 15,
        margin: "0 auto",
        padding: 20,
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <Sparkles
        size={18}
        color="#E0A458"
        strokeWidth={2}
        style={{ flexShrink: 0, marginTop: 2 }}
      />
      <div>
        <div
          style={{
            fontSize: 15.5,
            fontWeight: 600,
            fontFamily: "Instrument Sans",
            color: "#F5F1E8",
            marginBottom: 6,
          }}
        >
          One quiet promise from us.
        </div>
        <div
          style={{
            fontSize: 13.5,
            fontFamily: "Instrument Sans",
            color: "#B8B2A7",
            lineHeight: 1.5,
          }}
        >
          Nothing here is shown to employers without your sign-off. We don't
          sell to advertisers. References stay private. Voice recordings are
          deletable on request.
        </div>
      </div>
    </div>
  );
}
