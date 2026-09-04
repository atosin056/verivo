// EmployerDashboard.jsx (and any other /employer/* page)
import AppShell from "../components/AppShell.jsx";
import SectionHeader from "../components/Sectionheader.jsx";
import { useUserData } from "../UserDataContext.js";
import useBreakpoint from "../hooks/useBreakpoint.js";
import StatCard from "../components/StatCard.jsx";
import EmployerJobCard from "../components/Employerjobcard.jsx";
import ReplayFeatureCard from "../components/ReplayFeatureCard.jsx";
import WorkerPoolTable from "../components/Workerpooltable.jsx";
import EscrowStatusCard from "../components/Escrowstatuscard.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployerDashboard() {
  const baseUrl =
    import.meta.env.VITE_BASE_URL || "https://verivo.onrender.com";
  const [jobdata, setJobdata] = useState([]);
  console.log("jobdata:", jobdata);
  const userData = useUserData();
  useEffect(() => {
    document.title = "Dashboard | Verivo";

    if (!userData?.employer?.id) return;

    const fetchJobs = async (employerId) => {
      try {
        const response = await axios.get(`${baseUrl}/api/employer/jobs/fetch`, {
          params: {
            employerId: employerId,
          },
        });
        if (response.status === 200) {
          setJobdata(response.data.data);
        }
        console.log("Jobs fetched:", response.data.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs(userData.employer.id);
  }, [userData?.employer?.id, baseUrl]);

  const { isTablet, isMobile } = useBreakpoint();
  const navigate = useNavigate();

  const escrowbalance = userData.employer.escrowbalance;
  const jobCount = userData.employer.jobCount;

  return (
    <AppShell>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <SectionHeader
            eyebrow="Hiring overview"
            trailText="open jobs in progress"
            emphasisText="No"
            description="Replay any candidate's diagnostic interview before you commit. Fund the job into a Squad-backed escrow. Release on completion."
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "repeat(2, 1fr)"
                : "repeat(4, 1fr)",
            gap: "16px",
          }}
        >
          <StatCard
            label="Open jobs"
            value={jobCount}
            description={jobCount + " funded"}
          />
          <StatCard
            label="In escrow"
            value={escrowbalance}
            prefix="₦"
            note="Locked"
          />
          <StatCard label="Spent (This month)" value={0} prefix="₦" />
          <StatCard
            label="Verified pool"
            value={6420}
            description="In your active trades"
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 20,
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <div>
              <h3
                style={{
                  fontWeight: 400,
                  fontSize: 28,
                  letterSpacing: "-0.025em",
                  margin: 0,
                }}
              >
                Your jobs
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                overflowY: "auto",
                maxHeight: 400,
              }}
            >
              {jobdata.length !== 0 ? (
                jobdata.map((job) => (
                  <EmployerJobCard
                    key={job.id}
                    title={job.title}
                    location={job.location}
                    price={job.budget}
                    status={job.status}
                  />
                ))
              ) : (
                <div>
                  <div
                    style={{
                      width: "100%",
                      padding: "10px 20px",
                      border: "1px solid #d6cdb8",
                      borderRadius: 15,
                    }}
                  >
                    <p
                      style={{
                        color: "#6b6055",
                        fontFamily: "Instrument Sans",
                        fontSize: 13,
                        textAlign: "center",
                      }}
                    >
                      No Jobs Found
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <ReplayFeatureCard />
          </div>
        </div>
        <div>
          <WorkerPoolTable
            workers={[
              {
                id: 1,
                name: "Tunde Adebayo",
                location: "Computer Village, Ikeja",
                avatar: "/avatars/tunde.jpg",
                iseScore: 73,
                trade: "Phone repair technician",
                repeat: 58,
              },
              {
                id: 2,
                name: "Bisi Okonkwo",
                location: "Tejuosho, Yaba",
                avatar: "/avatars/bisi.jpg",
                iseScore: 88,
                trade: "Tailor — chiffon & silk",
                repeat: 72,
              },
            ]}
            onSeeFullPool={() => navigate("/pool")}
            onView={(worker) => navigate(`/workers/${worker.id}`)}
            onReplay={(worker) => openReplayModal(worker)}
          />
        </div>
        <div>
          <EscrowStatusCard
            escrowFunded={"₦" + escrowbalance}
            pendingRelease="₦0"
            settledAllTime="₦0"
            avgPayout="47 sec"
          />
        </div>
      </div>
    </AppShell>
  );
}
