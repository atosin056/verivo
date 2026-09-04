// Employerjobs.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import AppShell from "../components/AppShell.jsx";
import JobsTable from "../components/Jobstable";
import SectionHeader from "../components/Sectionheader";
import { useUserData } from "../UserDataContext.js";
import { transformJob } from "../transformjobs.js";

export default function Employerjobs() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const userData = useUserData();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const employerId = userData.employer.id;

  const onUpdateJobState = async (jobId, newState, rating) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/employer/jobs/${jobId}/state`,
        { status: newState, rating, employerId },
      );

      // Optimistically update local state so the badge reflects the change immediately
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId
            ? {
                ...job,
                state: newState,
                rating: newState === "complete" ? rating : job.rating,
              }
            : job,
        ),
      );

      return res.data;
    } catch (err) {
      console.error("Failed to update job state:", err);
      // surface this to the user — a silent failure here means the modal closed
      // but nothing actually changed on the backend
      alert(
        err.response?.data?.error || "Couldn't update job status. Try again.",
      );
    }
  };

  useEffect(() => {
    if (!userData?.employer?.id) return;

    const fetchJobs = async (employerId) => {
      try {
        const response = await axios.get(`${baseUrl}/api/employer/jobs/fetch`, {
          params: { employerId },
        });
        if (response.status === 200) {
          setJobs((response.data.data ?? []).map(transformJob));
        }
      } catch (err) {
        // 404 = employer just has no jobs yet, not a real error
        if (err.response?.status === 404) {
          setJobs([]);
        } else {
          setError(err.response?.data?.message ?? err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs(userData.employer.id);
  }, [userData?.employer?.id, baseUrl]);

  return (
    <AppShell>
      <div>
        <SectionHeader
          eyebrow="Your jobs"
          leadText="Every job, with its escrow state."
          description="Drafts haven't been funded yet. Funded jobs are waiting for a worker to accept. In-progress jobs are working. Complete jobs are settled."
        />
        {loading && <p>Loading jobs…</p>}
        {error && <p>Couldn't load jobs: {error}</p>}
        {!loading && !error && (
          <JobsTable jobs={jobs} onUpdateJobState={onUpdateJobState} />
        )}
      </div>
    </AppShell>
  );
}
