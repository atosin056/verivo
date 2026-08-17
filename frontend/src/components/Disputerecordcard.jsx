import { Circle } from "lucide-react";

const THRESHOLD = 4;

export default function DisputeRecordCard({
  disputeRate,
  jobsCount,
  resolvedCleanly,
  resolvedTotal,
  openCases,
  totalDisputes,
}) {
  const isClear = disputeRate <= THRESHOLD;

  return (
    <div className="record-card">
      <span className="record-card__badge">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-shield h-3 w-3"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        </svg>
        Your record
      </span>

      <h2 className="record-card__headline">
        <span>{disputeRate}%</span> dispute rate over {jobsCount}{" "}
        {jobsCount === 1 ? "job" : "jobs"}.
      </h2>

      <p className="record-card__summary">
        Above {THRESHOLD}% triggers a recommended retake of the diagnostic
        interview.{" "}
        {isClear
          ? "You're comfortably clear."
          : "You're currently above this threshold."}
      </p>

      <ul className="record-card__stats">
        <li className="record-card__stat">
          <span className="record-card__stat-label">Resolved cleanly</span>
          <span className="record-card__stat-value">
            {resolvedCleanly} / {resolvedTotal}
          </span>
        </li>
        <li className="record-card__stat">
          <span className="record-card__stat-label">Open cases</span>
          <span className="record-card__stat-value">{openCases}</span>
        </li>
        <li className="record-card__stat">
          <span className="record-card__stat-label">Total disputes</span>
          <span className="record-card__stat-value">{totalDisputes}</span>
        </li>
      </ul>
    </div>
  );
}
