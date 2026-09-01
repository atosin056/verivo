import React from "react";

/**
 * EmployerJobCard
 * Matches the "Your jobs" list design — pill status badge,
 * serif job title, location + price row, "Open →" link.
 *
 * Usage:
 * <EmployerJobCard
 *   status="PENDING MATCH"
 *   title="job1"
 *   location="Nigeria, Lagos"
 *   price="20,000"
 *   onOpen={() => navigate(`/jobs/${job.id}`)}
 * />
 */
export default function EmployerJobCard({
  status = "PENDING MATCH",
  title = "",
  location = "",
  price = "",
  onOpen = "",
}) {
  return (
    <div style={styles.card}>
      <div style={styles.left}>
        <span style={styles.badge}>{status}</span>
        <div style={styles.info}>
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.meta}>
            {location}
            {price && (
              <>
                {" "}
                <span style={styles.dot}>·</span>{" "}
                <span style={styles.strikeSymbol}>₦</span>
                <span style={styles.price}>{price}</span>
              </>
            )}
          </p>
        </div>
      </div>

      <button style={styles.openBtn} onClick={onOpen}>
        Open <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

export function JobsList({ jobs = [], onOpenJob, onSeeAll }) {
  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Your jobs</h2>
        <button style={styles.seeAll} onClick={onSeeAll}>
          See all
        </button>
      </div>

      <div style={styles.list}>
        {jobs.map((job) => (
          <EmployerJobCard
            key={job.id}
            status={job.status}
            title={job.title}
            location={job.location}
            price={job.price}
            onOpen={() => onOpenJob?.(job)}
          />
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#EFEAE0",
    padding: "32px",
    borderRadius: "24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: 400,
    margin: 0,
    color: "#1a1a1a",
  },
  seeAll: {
    background: "none",
    border: "none",
    fontFamily: "JetBrains Mono",
    fontSize: "14px",
    color: "#4a6a8a",
    cursor: "pointer",
    padding: 0,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #d6cdb8",
    borderRadius: "16px",
    padding: "20px 24px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  badge: {
    fontFamily: "'JetBrains Mono'",
    fontSize: "11px",
    background: "#e2d9c3",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#6b6055",
    padding: "7px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
    border: "1px solid lab(5.29734% .960186 1.48356 / .15)",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  title: {
    fontSize: "17px",
    fontWeight: 500,
    margin: 0,
    color: "#1a1a1a",
  },
  meta: {
    fontFamily: "Instrument Sans",
    fontSize: "14px",
    color: "#8a8272",
    margin: 0,
  },
  dot: {
    color: "#b5ac99",
  },
  strikeSymbol: {
    textDecoration: "line-through",
    color: "#14110f",
    fontFamily: "'Courier New', monospace",
  },
  price: {
    fontFamily: "'JetBrains Mono', monospace",
    color: "#14110f",
  },
  openBtn: {
    background: "none",
    border: "none",
    fontFamily: "Instrument Sans",
    fontSize: "13px",
    color: "#0f3d2e",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: 0,
  },
};
