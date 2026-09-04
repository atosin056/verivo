// utils/transformJob.js

// Map your DB's `status` values to the frontend's `state` enum.
// Edit the keys on the left to match whatever values actually exist in your `status` column.
const STATUS_TO_STATE = {
  pending: "funded_awaiting_accept",
  in_progress: "in_progress",
  awaiting_confirm: "awaiting_confirm",
  completed: "complete",
  disputed: "disputed",
};

function formatPosted(date) {
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function formatPostedRelative(date) {
  const diffMs = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return mins <= 1 ? "just now" : `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export function transformJob(raw) {
  return {
    id: `${raw.id}`,
    title: raw.title,
    location: raw.location,
    budget: Number(raw.budget),
    state: STATUS_TO_STATE[raw.status] ?? raw.status, // falls back to raw value if unmapped
    posted: formatPosted(raw.created_at),
    postedRelative: formatPostedRelative(raw.created_at),
    worker: raw.worker_id
      ? {
          name: raw.worker_name,
          idNumber: raw.worker_id_number,
          avatarUrl: raw.worker_avatar_url,
        }
      : {},
  };
}
