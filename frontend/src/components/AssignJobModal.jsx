// components/AssignJobModal.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserData } from "../UserDataContext";

export default function AssignJobModal({
  workerId,
  workerName,
  onClose,
  onAssigned,
}) {
  const userData = useUserData();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!userData?.employer?.id) return;

    axios
      .get(`${baseUrl}/api/employer/jobs/fetch`, {
        params: { employerId: userData.employer.id },
      })
      .then((res) => {
        // only show jobs not already assigned
        const unassigned = (res.data.data ?? []).filter(
          (job) => job.status !== "assigned",
        );
        setJobs(unassigned);
      })
      .catch((err) => {
        if (err.response?.status !== 404) {
          setError(err.response?.data?.message ?? err.message);
        }
      })
      .finally(() => setLoading(false));
  }, [userData?.employer?.id, baseUrl]);

  const handleAssign = async () => {
    if (!selectedJobId) return;
    setAssigning(true);
    setError(null);
    try {
      await axios.post(`${baseUrl}/api/employer/jobs/assign`, {
        jobId: selectedJobId,
        workerId,
      });
      onAssigned?.(selectedJobId);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message ?? err.message);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 14,
          padding: 24,
          width: 400,
          maxWidth: "90vw",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: "0 0 4px 0", fontSize: 18, fontWeight: 500 }}>
          Assign a job
        </h3>
        <p
          style={{
            margin: "0 0 16px 0",
            fontSize: 13,
            fontFamily: "Instrument Sans",
            color: "#8a8578",
          }}
        >
          Choose which job to assign to {workerName}.
        </p>

        {loading && (
          <p
            style={{
              fontSize: 13,
              color: "#8a8578",
              fontFamily: "Instrument Sans",
            }}
          >
            Loading your jobs…
          </p>
        )}

        {!loading && jobs.length === 0 && !error && (
          <p style={{ fontSize: 13, color: "#8a8578" }}>
            No unassigned jobs available. Post a new job first.
          </p>
        )}

        {!loading && jobs.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {jobs.map((job) => (
              <label
                key={job.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  border: `1px solid ${selectedJobId === job.id ? "#0f3d2e" : "#ddd8c8"}`,
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="job"
                  checked={selectedJobId === job.id}
                  onChange={() => setSelectedJobId(job.id)}
                />
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      fontFamily: "Instrument Sans",
                      color: "#1c1c1a",
                    }}
                  >
                    {job.title}
                  </div>
                  <div style={{ fontSize: 11, color: "#8a8578" }}>
                    {job.location}
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}

        {error && (
          <p style={{ color: "#a8442a", fontSize: 13, marginBottom: 12 }}>
            {error}
          </p>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            onClick={onClose}
            disabled={assigning}
            style={{
              backgroundColor: "#ddd8c8",
              color: "#1c1c1a",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontFamily: "Instrument Sans",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedJobId || assigning}
            style={{
              backgroundColor: "#0f3d2e",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontFamily: "Instrument Sans",
              fontSize: 13,
              fontWeight: 500,
              padding: "8px 16px",
            }}
          >
            {assigning ? "Assigning…" : "Assign job"}
          </button>
        </div>
      </div>
    </div>
  );
}
