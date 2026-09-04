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
        {!loading && !error && <JobsTable jobs={jobs} />}
      </div>
    </AppShell>
  );
}
