import React from "react";

/**
 * ReplayFeatureCard
 * Static dark feature card — "You can replay a worker before you hire."
 *
 * Usage:
 * <ReplayFeatureCard onWatchSample={() => setShowSampleModal(true)} />
 */
export default function ReplayFeatureCard({ onWatchSample }) {
  return (
    <div style={styles.card}>
      <div style={{ ...styles.blob, ...styles.blobWarm }} />
      <div style={{ ...styles.blob, ...styles.blobCool }} />

      <div style={styles.content}>
        <span style={styles.eyebrow}>
          <span style={styles.eyebrowIcon}>✿</span> WHY RECIVO · THE ONE THING
        </span>

        <h2 style={styles.heading}>
          You can <em style={styles.replay}>replay</em> a worker before you
          hire.
        </h2>

        <p style={styles.body}>
          Every verified worker has a 6–8 minute diagnostic interview on record.
          You hear them reason through a real fault — in Pidgin, Yorùbá, Hausa,
          Igbo, or English with subtitles. No interview theatre.
        </p>

        <div style={styles.statsRow}>
          <div style={styles.stat}>
            <span style={styles.statLabel}>SAMPLE LENGTH</span>
            <span style={styles.statValue}>6:42</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>LANGUAGES</span>
            <span style={styles.statValue}>5</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>SCORING</span>
            <span style={styles.statValue}>Dual-model</span>
          </div>
        </div>

        <button style={styles.cta} onClick={onWatchSample}>
          <span aria-hidden="true">▷</span> Watch a sample replay
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(160deg, #141210 0%, #1a1815 45%, #100f0d 100%)",
    borderRadius: "28px",
    padding: "32px",
    maxWidth: "480px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  blob: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    filter: "blur(70px)",
    pointerEvents: "none",
  },
  blobWarm: {
    top: "-100px",
    left: "-100px",
    background:
      "radial-gradient(circle, rgba(176,137,35,0.5) 0%, rgba(176,137,35,0) 70%)",
  },
  blobCool: {
    bottom: "-100px",
    right: "-100px",
    background: "radial-gradient(circle, #1a1815 0%, rgba(45,138,100,0) 70%)",
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
  eyebrow: {
    display: "inline-block",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.14em",
    color: "#fbf7ef",
    border: "1px solid #fbf7ef",
    textTransform: "uppercase",
    borderRadius: "5px",
    padding: "7px",
    marginBottom: "24px",
  },
  eyebrowIcon: {
    marginRight: "4px",
  },
  heading: {
    fontFamily: "Fraunces, serif",
    fontSize: "24px",
    lineHeight: "1.10",
    letterSpacing: "-0.025em",
    fontWeight: 400,
    color: "#f5f2ec",
    margin: "0 0 16px 0",
  },
  replay: {
    fontStyle: "italic",
  },
  body: {
    fontSize: "13.5px",
    lineHeight: 1.55,
    fontFamily: "Instrument Sans",
    color: "lab(97.3794% .36037 4.35282 / .75)",
    margin: "0 0 28px 0",
  },
  statsRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "24px",
  },
  stat: {
    flex: 1,
    background: "#211e1a",
    borderRadius: "12px",
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  statLabel: {
    fontSize: "10px",
    letterSpacing: "0.5px",
    color: "#7a7468",
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: "16px",
    fontWeight: 500,
    fontFamily: "Fraunces",
    color: "#f5f2ec",
  },
  cta: {
    width: "100%",
    background: "#d4a437",
    border: "none",
    borderRadius: "999px",
    padding: "16px",
    fontSize: "15px",
    fontFamily: "Instrument Sans",
    fontWeight: 500,
    color: "#1a1408",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};
