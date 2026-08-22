import React from "react";

/**
 * WorkerPoolTable
 * "Top of the pool, this week" — Işẹ Score leaderboard table.
 *
 * Usage:
 * <WorkerPoolTable
 *   workers={[
 *     { id: 1, name: "Tunde Adebayo", location: "Computer Village, Ikeja", avatar: "/avatars/tunde.jpg", iseScore: 73, trade: "Phone repair technician", repeat: 58 },
 *     ...
 *   ]}
 *   onSeeFullPool={() => navigate("/pool")}
 *   onView={(worker) => navigate(`/workers/${worker.id}`)}
 *   onReplay={(worker) => openReplayModal(worker)}
 * />
 */
export default function WorkerPoolTable({
  workers = [],
  onSeeFullPool,
  onView,
  onReplay,
}) {
  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.heading}>Top of the pool, this week</h2>
          <p style={styles.subtext}>
            Ranked by Işẹ Score for your three saved trades. Tap a row to open
            the worker's replay — the moment that separates Verivo from Jiji.
          </p>
        </div>
        <button style={styles.seeFullPool} onClick={onSeeFullPool}>
          See full pool
        </button>
      </div>

      <div style={styles.tableHead}>
        <span style={{ ...styles.colLabel, flex: 2.5 }}>WORKER</span>
        <span style={{ ...styles.colLabel, flex: 1 }}>IŞẸ</span>
        <span style={{ ...styles.colLabel, flex: 1.5 }}>TRADE</span>
        <span style={{ ...styles.colLabel, flex: 0.8 }}>REPEAT</span>
        <span style={{ ...styles.colLabel, flex: 1.5, textAlign: "right" }}>
          ACTION
        </span>
      </div>

      <div>
        {workers.map((worker) => (
          <div key={worker.id} style={styles.row}>
            <div style={{ ...styles.cell, flex: 2.5, ...styles.workerCell }}>
              <img src={worker.avatar} alt="" style={styles.avatar} />
              <div>
                <div style={styles.name}>{worker.name}</div>
                <div style={styles.location}>{worker.location}</div>
              </div>
            </div>

            <div style={{ ...styles.cell, flex: 1, gap: 4 }}>
              <span style={styles.score}>{worker.iseScore}</span>
              <span style={styles.scoreMax}>/ 100</span>
            </div>

            <div style={{ ...styles.cell, flex: 1.5 }}>
              <span style={styles.trade}>{worker.trade}</span>
            </div>

            <div style={{ ...styles.cell, flex: 0.8 }}>
              <span style={styles.repeat}>{worker.repeat}%</span>
            </div>

            <div
              style={{
                ...styles.cell,
                flex: 1.5,
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              <button style={styles.viewBtn} onClick={() => onView?.(worker)}>
                View
              </button>
              <button
                style={styles.replayBtn}
                onClick={() => onReplay?.(worker)}
              >
                <span aria-hidden="true">▷</span> Replay
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",

    gap: "24px",
  },
  heading: {
    fontFamily: "Fraunces",
    letterSpacing: "-0.025em",
    fontSize: "32px",
    fontWeight: 400,
    margin: "0 0 8px 0",
    color: "#14110f",
  },
  subtext: {
    fontSize: "13.5px",
    color: "#6b6055",
    margin: 0,
    fontFamily: "Instrument Sans",
    maxWidth: "560px",
    lineHeight: 1.5,
  },
  seeFullPool: {
    background: "transparent",
    border: "1px solid #c9c1ae",
    borderRadius: "999px",
    padding: "10px 18px",
    fontFamily: "Instrument Sans",
    fontSize: "13px",
    color: "#1a1a1a",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  tableHead: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    border: "1px solid #d6cdb8",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
  colLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.18em",
    color: "#6b6055",
  },
  row: {
    display: "flex",
    alignItems: "center",
    padding: "16px 15px",
    borderBottom: "1px solid #d6cdb8",
    borderLeft: "1px solid #d6cdb8",
    borderRight: "1px solid #d6cdb8",
  },
  cell: {
    display: "flex",
    alignItems: "center",
  },
  workerCell: {
    gap: "12px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
    background: "#d8d1c2",
  },
  name: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1a1a1a",
    fontFamily: "Instrument Sans",
  },
  location: {
    fontSize: "12px",
    color: "#6b6055",
    marginTop: 4,
    fontFamily: "Instrument Sans",
  },
  score: {
    fontFamily: "Fraunces",
    fontSize: "22px",
    fontWeight: 400,
    lineHeight: 1,
    color: "#0f3d2e",
  },
  scoreMax: {
    fontSize: "10.5px",
    color: "#6b6055",
    fontFamily: "Instrument Sans",
    marginLeft: "2px",
  },
  trade: {
    fontSize: "13px",
    fontFamily: "Instrument Sans",
    color: "#2a2521",
  },
  repeat: {
    fontSize: "13px",
    color: "#2a2521",
    fontFamily: "Instrument Sans",
  },
  viewBtn: {
    background: "#DCD2B8",
    border: "none",
    borderRadius: "999px",
    padding: "8px 16px",
    fontFamily: "Instrument Sans",
    fontSize: "13px",
    color: "#2a2521",
    cursor: "pointer",
  },
  replayBtn: {
    background: "#181614",
    border: "none",
    fontFamily: "Instrument Sans",
    borderRadius: "999px",
    padding: "8px 16px",
    fontSize: "13px",
    color: "#f5f2ec",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
};
