import { useState, useMemo } from "react";
import { MapPin, Clock, Star, X } from "lucide-react";
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
 *   postedRelative: "today",
 *   worker: { name: "Tunde Adebayo", idNumber: "73", avatarUrl: "https://..." },
 *   budget: 12000,
 *   state: "funded_awaiting_accept",
 *   posted: "Today",
 * }
 *
 * New prop:
 *   onUpdateJobState(jobId, newState, rating)
 *     - rating is null unless newState === "complete", in which case it's 1-5
 *     - wire this to your PATCH endpoint (e.g. rateJob / job state update service)
 *
 * Usage:
 *   const jobs = [ {...}, {...} ];
 *   <JobsTable jobs={jobs} onUpdateJobState={(id, state, rating) => {...}} />
 */

const STATUS_TABS = [
  { id: "all", label: "All" },
  { id: "funded_awaiting_accept", label: "Funded · awaiting accept" },
  { id: "in_progress", label: "In progress" },
  { id: "awaiting_confirm", label: "Awaiting confirm" },
  { id: "complete", label: "Complete" },
  { id: "disputed", label: "Disputed" },
];

// Real job states only — "all" is a filter, not a state a job can be in.
const JOB_STATE_OPTIONS = STATUS_TABS.filter((t) => t.id !== "all");

const STATE_LABELS = {
  funded_awaiting_accept: ["FUNDED ·", "AWAITING", "ACCEPT"],
  in_progress: ["IN PROGRESS"],
  awaiting_confirm: ["AWAITING", "CONFIRM"],
  complete: ["COMPLETE"],
  disputed: ["DISPUTED"],
};

const STATE_PALETTE = {
  funded_awaiting_accept: { bg: "#fbf1cf", border: "#e3c66b", text: "#8a6d1f" },
  in_progress: { bg: "#e7eef7", border: "#9fb8dc", text: "#39597f" },
  awaiting_confirm: { bg: "#eee7f7", border: "#bda6de", text: "#6b4b96" },
  complete: { bg: "#e5f3ea", border: "#8fc6a4", text: "#276b3f" },
  disputed: { bg: "#fbe6e2", border: "#e3a693", text: "#a8442a" },
};

export default function JobsTable({ jobs = [], onUpdateJobState }) {
  const userData = useUserData();
  const [activeTab, setActiveTab] = useState("funded_awaiting_accept");
  const [hoveredTab, setHoveredTab] = useState(null);

  // Modal state
  const [modalJob, setModalJob] = useState(null); // the job object currently being edited
  const [pendingState, setPendingState] = useState(null); // state chosen inside modal, before confirm
  const [ratingValue, setRatingValue] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const filteredJobs = useMemo(() => {
    if (activeTab === "all") return jobs;
    return jobs.filter((job) => job.state === activeTab);
  }, [jobs, activeTab]);

  const formatBudget = (value) =>
    `₦${new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(
      value,
    )}`;

  const openStateModal = (job) => {
    setModalJob(job);
    setPendingState(null);
    setRatingValue(0);
    setHoveredStar(0);
  };

  const closeStateModal = () => {
    setModalJob(null);
    setPendingState(null);
    setRatingValue(0);
    setHoveredStar(0);
  };

  const handlePickState = (stateId) => {
    setPendingState(stateId);
    // Non-"complete" states have nothing further to collect — confirm right away.
    if (stateId !== "complete") {
      onUpdateJobState?.(modalJob.id, stateId, null);
      closeStateModal();
    }
    // "complete" falls through to the star-rating step, rendered below.
  };

  const confirmCompleteWithRating = () => {
    if (!ratingValue) return;
    onUpdateJobState?.(modalJob.id, "complete", ratingValue);
    closeStateModal();
  };

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
    // Modal styles
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(28, 28, 26, 0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
    },
    modal: {
      width: 340,
      maxWidth: "90vw",
      backgroundColor: "#f2efe6",
      border: "1px solid #ddd8c8",
      borderRadius: 14,
      padding: "22px 22px 20px",
      fontFamily: "'Instrument Sans', sans-serif",
      boxShadow: "0 12px 40px rgba(28,28,26,0.18)",
    },
    modalHeaderRow: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    modalTitle: {
      margin: 0,
      fontSize: 17,
      fontWeight: 600,
      color: "#1c1c1a",
      fontFamily: "'Fraunces', serif",
    },
    modalSubtitle: {
      margin: "4px 0 18px",
      fontSize: 12,
      color: "#8a8578",
    },
    closeBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#8a8578",
      padding: 2,
      lineHeight: 0,
    },
    optionList: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    optionBtn: (stateId) => {
      const c = STATE_PALETTE[stateId];
      return {
        display: "flex",
        alignItems: "center",
        gap: 10,
        textAlign: "left",
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #ddd8c8",
        backgroundColor: "#fff",
        cursor: "pointer",
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: 13,
        color: "#1c1c1a",
        transition: "border-color 0.15s, background-color 0.15s",
      };
    },
    optionDot: (stateId) => ({
      width: 9,
      height: 9,
      borderRadius: "50%",
      backgroundColor: STATE_PALETTE[stateId]?.border,
      flexShrink: 0,
    }),
    starsRow: {
      display: "flex",
      gap: 6,
      justifyContent: "center",
      margin: "18px 0 22px",
    },
    ratingHint: {
      textAlign: "center",
      fontSize: 12,
      color: "#8a8578",
      marginBottom: 4,
      minHeight: 16,
    },
    modalFooterRow: {
      display: "flex",
      gap: 10,
      marginTop: 4,
    },
    backBtn: {
      flex: 1,
      padding: "10px 0",
      borderRadius: 10,
      border: "1px solid #ddd8c8",
      backgroundColor: "transparent",
      color: "#1c1c1a",
      fontFamily: "'Instrument Sans', sans-serif",
      fontSize: 13,
      fontWeight: 500,
      cursor: "pointer",
    },
    confirmBtn: (enabled) => ({
      flex: 1,
      padding: "10px 0",
      borderRadius: 10,
      border: "1px solid #0f3d2e",
      backgroundColor: enabled ? "#0f3d2e" : "#a9bdb3",
      borderColor: enabled ? "#0f3d2e" : "#a9bdb3",
      color: "#ffffff",
      fontFamily: "'Instrument Sans', sans-serif",
      fontSize: 13,
      fontWeight: 500,
      cursor: enabled ? "pointer" : "not-allowed",
    }),
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

  const stateBadgeStyle = (state) => {
    const c = STATE_PALETTE[state] || STATE_PALETTE.in_progress;
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
      cursor: "pointer",
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
                <button
                  type="button"
                  style={stateBadgeStyle(job.state)}
                  onClick={() => openStateModal(job)}
                >
                  {STATE_LABELS[job.state]?.join(" ") || job.state}
                </button>
              </div>

              <div style={styles.postedText}>{job.posted}</div>
            </div>
          ))
        )}
      </div>

      {/* State-change modal */}
      {modalJob && (
        <div style={styles.overlay} onClick={closeStateModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeaderRow}>
              <h3 style={styles.modalTitle}>
                {pendingState === "complete" ? "Rate this job" : "Change state"}
              </h3>
              <button style={styles.closeBtn} onClick={closeStateModal}>
                <X size={18} />
              </button>
            </div>

            {pendingState === "complete" ? (
              <>
                <p style={styles.modalSubtitle}>
                  {modalJob.title} — {modalJob.worker.name}
                </p>

                <div style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((n) => {
                    const filled = n <= (hoveredStar || ratingValue);
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRatingValue(n)}
                        onMouseEnter={() => setHoveredStar(n)}
                        onMouseLeave={() => setHoveredStar(0)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          lineHeight: 0,
                        }}
                      >
                        <Star
                          size={28}
                          color={filled ? "#e3c66b" : "#ddd8c8"}
                          fill={filled ? "#e3c66b" : "none"}
                        />
                      </button>
                    );
                  })}
                </div>
                <p style={styles.ratingHint}>
                  {ratingValue
                    ? `${ratingValue} star${ratingValue > 1 ? "s" : ""}`
                    : "Tap a star to rate"}
                </p>

                <div style={styles.modalFooterRow}>
                  <button
                    style={styles.backBtn}
                    onClick={() => setPendingState(null)}
                  >
                    Back
                  </button>
                  <button
                    style={styles.confirmBtn(ratingValue > 0)}
                    onClick={confirmCompleteWithRating}
                    disabled={!ratingValue}
                  >
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={styles.modalSubtitle}>
                  {modalJob.title} — currently{" "}
                  {STATE_LABELS[modalJob.state]?.join(" ") || modalJob.state}
                </p>

                <div style={styles.optionList}>
                  {JOB_STATE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      style={styles.optionBtn(opt.id)}
                      onClick={() => handlePickState(opt.id)}
                    >
                      <span style={styles.optionDot(opt.id)} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
