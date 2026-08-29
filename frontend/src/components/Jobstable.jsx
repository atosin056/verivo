import { useState, useMemo } from "react";
import { MapPin, Clock } from "lucide-react";
import { useUserData } from "../UserDataContext";

/**
 * JobsTable
 *
 * The parent owns the data — pass an array of job objects and this
 * component filters them client-side based on the active tab.
 *
 * Expected shape of each job object:
 * {
 *   id: "job_1",
 *   title: "Samsung A55 — screen replacement",
 *   location: "Ikeja",
 *   postedRelative: "today",   // small text under the title, left of the clock icon
 *   worker: {
 *     name: "Tunde Adebayo",
 *     idNumber: "73",
 *     avatarUrl: "https://...",
 *   },
 *   budget: 12000,             // number, in naira
 *   state: "funded_awaiting_accept", // must match one of STATUS_TABS' id below
 *   posted: "Today",           // right-hand column, e.g. "Today", "2 days ago"
 * }
 *
 * Usage:
 *   const jobs = [ {...}, {...} ];
 *   <JobsTable jobs={jobs} />
 */

const STATUS_TABS = [
  { id: "all", label: "All" },
  { id: "funded_awaiting_accept", label: "Funded · awaiting accept" },
  { id: "in_progress", label: "In progress" },
  { id: "awaiting_confirm", label: "Awaiting confirm" },
  { id: "complete", label: "Complete" },
  { id: "disputed", label: "Disputed" },
];

export default function JobsTable({ jobs = [] }) {
  const userData = useUserData();
  const [activeTab, setActiveTab] = useState("funded_awaiting_accept");
  const [hoveredTab, setHoveredTab] = useState(null);

  const filteredJobs = useMemo(() => {
    if (activeTab === "all") return jobs;
    return jobs.filter((job) => job.state === activeTab);
  }, [jobs, activeTab]);

  const formatBudget = (value) =>
    `₦${new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(
      value,
    )}`;

  const styles = {
    page: {
      fontFamily: "'Instrument Sans', sans-serif",
      backgroundColor: "#f2efe6",
      boxSizing: "border-box",
      paddingTop: "20px",
    },
    tabsRow: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 20,
    },
    tabsWrap: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
      flex: 1,
    },
    count: {
      fontSize: 13,
      color: "#8a8578",
      whiteSpace: "nowrap",
    },
    tableWrap: {
      border: "1px solid #ddd8c8",
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: "transparent",
    },
    thead: {
      display: "grid",
      gridTemplateColumns: "2.4fr 1.6fr 1fr 1.2fr 0.9fr",
      padding: "14px 20px",
      borderBottom: "1px solid #ddd8c8",
    },
    th: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.22em",
      color: "#8a8578",
      textTransform: "uppercase",
      fontFamily: "'JetBrains Mono', serif",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "2.4fr 1.6fr 1fr 1.2fr 0.9fr",
      padding: "18px 20px",
      alignItems: "center",
      borderBottom: "1px solid #eae6d8",
    },
    jobTitle: {
      margin: 0,
      fontSize: 14,
      fontWeight: 500,
      color: "#1c1c1a",
      fontFamily: "'Instrument Sans', serif",
    },
    jobMeta: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 4,
    },
    jobMetaItem: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      fontSize: 12,
      fontFamily: "Instrument Sans",
      color: "#8a8578",
    },
    workerCell: {
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    avatar: {
      width: 26,
      height: 26,
      borderRadius: "50%",
      objectFit: "cover",
      backgroundColor: "#ddd8c8",
    },
    workerName: {
      margin: 0,
      fontSize: 13,
      color: "#1c1c1a",
    },
    workerId: {
      margin: 0,
      fontSize: 11,
      color: "#8a8578",
    },
    budget: {
      fontSize: 14,
      fontWeight: 500,
      color: "#1c1c1a",
      fontFamily: "'JetBrains Mono', monospace",
    },
    postedText: {
      fontSize: 13,
      color: "#1c1c1a",
    },
    emptyState: {
      padding: "40px 20px",
      textAlign: "center",
      fontSize: 13,
      color: "#8a8578",
    },
  };

  const tabStyle = (tabId) => {
    const isActive = activeTab === tabId;
    const isHovered = hoveredTab === tabId && !isActive;
    return {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "11px 16px",
      borderRadius: 999,
      fontFamily: "Instrument Sans",
      fontSize: 13,
      fontWeight: 500,
      cursor: "pointer",
      border: isActive ? "1px solid #0f3d2e" : "1px solid #ddd8c8",
      backgroundColor: isActive
        ? "#0f3d2e"
        : isHovered
          ? "rgba(0,0,0,0.03)"
          : "transparent",
      color: isActive ? "#ffffff" : "#1c1c1a",
      transition: "background-color 0.15s, border-color 0.15s",
      whiteSpace: "nowrap",
    };
  };

  const STATE_LABELS = {
    funded_awaiting_accept: ["FUNDED ·", "AWAITING", "ACCEPT"],
    in_progress: ["IN PROGRESS"],
    awaiting_confirm: ["AWAITING", "CONFIRM"],
    complete: ["COMPLETE"],
    disputed: ["DISPUTED"],
  };

  const stateBadgeStyle = (state) => {
    const palette = {
      funded_awaiting_accept: {
        bg: "#fbf1cf",
        border: "#e3c66b",
        text: "#8a6d1f",
      },
      in_progress: { bg: "#e7eef7", border: "#9fb8dc", text: "#39597f" },
      awaiting_confirm: { bg: "#eee7f7", border: "#bda6de", text: "#6b4b96" },
      complete: { bg: "#e5f3ea", border: "#8fc6a4", text: "#276b3f" },
      disputed: { bg: "#fbe6e2", border: "#e3a693", text: "#a8442a" },
    };
    const c = palette[state] || palette.in_progress;
    return {
      display: "inline-block",
      border: `1px solid ${c.border}`,
      backgroundColor: c.bg,
      color: c.text,
      borderRadius: 8,
      padding: "6px 10px",
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.08em",
      lineHeight: 1.5,
    };
  };

  return (
    <div style={styles.page}>
      {/* Filter tabs */}
      <div style={styles.tabsRow}>
        <div style={styles.tabsWrap}>
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              style={tabStyle(tab.id)}
            >
              {activeTab === tab.id && tab.id !== "all" && "✓ "}
              {tab.label}
            </button>
          ))}
        </div>
        <span style={styles.count}>{filteredJobs.length} jobs</span>
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        <div style={styles.thead}>
          <span style={styles.th}>JOB</span>
          <span style={styles.th}>WORKER</span>
          <span style={styles.th}>BUDGET</span>
          <span style={styles.th}>STATE</span>
          <span style={styles.th}>POSTED</span>
        </div>

        {filteredJobs.length === 0 ? (
          <div style={styles.emptyState}>No jobs in this state.</div>
        ) : (
          filteredJobs.map((job, i) => (
            <div
              key={job.id}
              style={{
                ...styles.row,
                borderBottom:
                  i === filteredJobs.length - 1
                    ? "none"
                    : styles.row.borderBottom,
              }}
            >
              <div>
                <p style={styles.jobTitle}>{job.title}</p>
                <div style={styles.jobMeta}>
                  <span style={styles.jobMetaItem}>
                    <MapPin size={11} /> {job.location}
                  </span>
                  <span style={styles.jobMetaItem}>
                    <Clock size={11} /> {job.postedRelative}
                  </span>
                </div>
              </div>

              <div style={styles.workerCell}>
                <img src={job.worker.avatarUrl} alt="" style={styles.avatar} />
                <div>
                  <p style={styles.workerName}>{job.worker.name}</p>
                  <p style={styles.workerId}>ID {job.worker.idNumber}</p>
                </div>
              </div>

              <div style={styles.budget}>{formatBudget(job.budget)}</div>

              <div>
                <span style={stateBadgeStyle(job.state)}>
                  {STATE_LABELS[job.state]?.join(" ") || job.state}
                </span>
              </div>

              <div style={styles.postedText}>{job.posted}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
