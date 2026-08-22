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

export default function EmployerDashboard() {
  const userData = useUserData();
  const { isTablet, isMobile } = useBreakpoint();
  const navigate = useNavigate();

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
          <StatCard label="Open jobs" value={0} description="0 funded" />
          <StatCard label="In escrow" value={0} prefix="₦" note="Locked" />
          <StatCard label="Spent (This month)" value={0} prefix="₦" />
          <StatCard
            label="Verified pool"
            value={6420}
            description="In your active trades"
          />
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20 }}
        >
          <div>
            <div>
              <h3
                style={{
                  fontWeight: 400,
                  fontSize: 28,
                  letterSpacing: "-0.025em",
                }}
              >
                Your jobs
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <EmployerJobCard
                title="job 1"
                location="Nigeria, Lagos"
                price="20,000"
              />
              <EmployerJobCard
                title="job 1"
                location="Nigeria, Lagos"
                price="20,000"
              />
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
            escrowFunded="₦0"
            pendingRelease="₦0"
            settledAllTime="₦0"
            avgPayout="47 sec"
          />
        </div>
      </div>
    </AppShell>
  );
}
