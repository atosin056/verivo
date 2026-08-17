import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Check } from "lucide-react";

const tokens = {
  emerald: "#0f3d2e",
  bone: "#f4f1ea",
  paper: "#fbfaf6",
  ink: "#1a1a17",
  gold: "#c8a24a",
  border: "#e4ded0",
};

const PHRASE =
  "Skill is a verb. I prove it with my hands, every day, in this market.";
const LANGS = ["English", "Pidgin", "Yorùbá", "Igbo", "Hausa"];
const DURATION = 8; // seconds

export default function VoicePrintCard() {
  const [consent, setConsent] = useState(true);
  const [lang, setLang] = useState("Pidgin");
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [bars, setBars] = useState(() => Array.from({ length: 40 }, () => 6));
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!recording) return;
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = +(prev + 0.1).toFixed(1);
        if (next >= DURATION) {
          clearInterval(intervalRef.current);
          setRecording(false);
          return DURATION;
        }
        return next;
      });
      setBars((prev) =>
        prev.map(() => (recording ? 6 + Math.random() * 22 : 6)),
      );
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [recording]);

  const handleTap = () => {
    if (!consent) return;
    if (recording) {
      setRecording(false);
    } else {
      setElapsed(0);
      setRecording(true);
    }
  };

  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        fontFamily: "'Instrument Sans', sans-serif",
        borderRadius: 20,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          border: `1px solid ${tokens.border}`,
          borderRadius: 16,
          padding: "24px 28px",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "#6B6055",
            fontWeight: 600,
            marginBottom: 14,
          }}
        >
          READ ALOUD
        </div>

        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: 22,
            lineHeight: 1.4,
            color: tokens.ink,
            margin: "0 0 14px 0",
          }}
        >
          “{PHRASE}”
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: "#8a8474",
              fontFamily: "Instrument Sans",
            }}
          >
            Or say it in
          </span>
          {LANGS.filter((l) => l !== "English").map((l, i, arr) => (
            <React.Fragment key={l}>
              <button
                onClick={() => setLang(l)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "Instrument Sans",
                  padding: 0,
                  fontSize: 13,
                  fontWeight: lang === l ? 400 : 400,
                  color: lang === l ? "#6B6055" : "#8a8474",
                  textDecoration: lang === l ? "none" : "none",
                  textUnderlineOffset: 3,
                }}
              >
                {l}
              </button>
              {i < arr.length - 1 && (
                <span style={{ color: "#c9c3b3", fontSize: 13 }}>/</span>
              )}
            </React.Fragment>
          ))}
          <span style={{ fontSize: 13, color: "#8a8474" }}>— your choice.</span>
        </div>
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          cursor: "pointer",
          marginBottom: 18,
          padding: "0 4px",
        }}
      >
        <span
          onClick={(e) => {
            e.preventDefault();
            setConsent((c) => !c);
          }}
          style={{
            width: 18,
            height: 18,
            borderRadius: 5,
            border: `1.5px solid ${consent ? tokens.emerald : tokens.border}`,
            background: consent ? tokens.emerald : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          {consent && <Check size={13} color={tokens.bone} strokeWidth={3} />}
        </span>
        <span style={{ fontSize: 13.5, lineHeight: 1.5, color: "#4a473d" }}>
          I agree Recivo can store a voiceprint for re-authentication only.
          Deletable on request. Never shared with employers or third parties.
        </span>
      </label>

      <div
        onClick={handleTap}
        role="button"
        aria-pressed={recording}
        style={{
          background: "#161511",
          borderRadius: 16,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          cursor: consent ? "pointer" : "not-allowed",
          opacity: consent ? 1 : 0.5,
          userSelect: "none",
        }}
      >
        <span
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: tokens.emerald,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {recording ? (
            <Square size={16} color={tokens.bone} fill={tokens.bone} />
          ) : (
            <Mic size={18} color={tokens.bone} />
          )}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.12em",
              color: tokens.gold,
              marginBottom: 6,
            }}
          >
            {recording ? "RECORDING" : "TAP TO START"}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              height: 24,
            }}
          >
            {bars.map((h, i) => (
              <span
                key={i}
                style={{
                  width: 2.5,
                  height: h,
                  borderRadius: 2,
                  background: recording ? tokens.gold : "#3a382f",
                  transition: "height 0.1s ease",
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: tokens.bone,
            flexShrink: 0,
          }}
        >
          {format(elapsed)} / 0:0{DURATION}
        </div>
      </div>
    </div>
  );
}
