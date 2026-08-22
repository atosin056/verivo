import React from "react";

/**
 * EscrowStatusCard
 * "Per-job escrow is structural, not decorative." — escrow status panel.
 *
 * Usage:
 * <EscrowStatusCard
 *   escrowFunded="₦0"
 *   pendingRelease="₦0"
 *   settledAllTime="₦0"
 *   avgPayout="47 sec"
 * />
 */
export default function EscrowStatusCard({
  escrowFunded,
  pendingRelease,
  settledAllTime,
  avgPayout,
}) {
  return (
    <div style={styles.card}>
      <div style={styles.left}>
        <span style={styles.badge}>
          <span aria-hidden="true">✓</span> PAYSTACK · GTCO · ESCROW RAILS
        </span>

        <h2 style={styles.heading}>
          Per-job escrow is structural, not decorative.
        </h2>

        <p style={styles.body}>
          Every job spawns its own Paystack Virtual Account. Funds sit there
          until you mark complete. Disputes pause the clock. Releases settle in
          under 60 seconds via Paystack Transfer API.
        </p>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.stat}>
          <span style={styles.statLabel}>ESCROW FUNDED</span>
          <span style={styles.statValue}>{escrowFunded}</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statLabel}>PENDING RELEASE</span>
          <span style={styles.statValue}>{pendingRelease}</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statLabel}>SETTLED (ALL TIME)</span>
          <span style={styles.statValue}>{settledAllTime}</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statLabel}>AVG PAYOUT</span>
          <span style={styles.statValue}>{avgPayout}</span>
        </div>
      </div>
    </div>
  );
}

const sans = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "40px",
    background: "#fbf7ef",
    border: "1px solid #d8d1c2",
    borderRadius: "20px",
    padding: "28px 32px",
    fontFamily: sans,
    flexWrap: "wrap",
  },
  left: {
    flex: "1 1 320px",
    minWidth: "280px",
  },
  badge: {
    display: "inline-flex",
    background: "#0f3d2e08",
    alignItems: "center",
    gap: "6px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.14em",
    color: "#2a2521",
    border: "1px solid #14110f",
    borderRadius: "8px",
    padding: "7px 12px",
    marginBottom: "18px",
  },
  heading: {
    fontFamily: "Fraunces, serif",
    fontSize: "26px",
    letterSpacing: "-0.025em",
    fontWeight: 400,
    margin: "0 0 12px 0",
    color: "#14110f",
  },
  body: {
    fontSize: "13.5px",
    fontFamily: "Instrument Sans",
    color: "#6b6055",
    margin: 0,
    lineHeight: 1.6,
    maxWidth: "440px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    flex: "1 1 320px",
    minWidth: "280px",
  },
  stat: {
    background: "#f4efe6",
    border: "1px solid #d6cdb8",
    borderRadius: "12px",
    padding: "14px 18px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  statLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10.5px",
    letterSpacing: "0.22em",
    color: "#6b6055",
  },
  statValue: {
    fontFamily: "Fraunces, serif",
    fontSize: "18px",
    color: "#14110f",
  },
};
