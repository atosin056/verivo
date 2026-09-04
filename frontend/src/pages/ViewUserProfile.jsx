// viewuserprofile.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AppShell from "../components/AppShell.jsx";
import SectionHeader from "../components/Sectionheader";
import ProfileCard from "../components/ProfileCard";
import ToolsCard from "../components/Toolscard.jsx";
import ReviewCard from "../components/Reviewcard.jsx";
import useBreakpoint from "../hooks/useBreakpoint.js";
import { transformWorkerProfile } from "../transformWorkerProfile.js";

import AssignJobModal from "../components/AssignJobModal";

export default function ViewUserProfile() {
  const { userId } = useParams();

  const [showAssignModal, setShowAssignModal] = useState(false);
  const navigate = useNavigate();
  const { isTablet } = useBreakpoint();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${baseUrl}/api/employer/candidates/data`, { params: { userId } })
      .then((res) => {
        setProfile(transformWorkerProfile(res.data.data));
      })
      .catch((err) => {
        setError(err.response?.data?.message ?? err.message);
      })
      .finally(() => setLoading(false));
  }, [userId, baseUrl]);

  if (loading) {
    return (
      <AppShell>
        <p>Loading profile…</p>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <p>Couldn't load this profile: {error}</p>
      </AppShell>
    );
  }

  if (!profile) {
    return (
      <AppShell>
        <p>Profile not found.</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Worker profile"
        leadText="Reviewing"
        emphasisText={profile.name}
        description="Replay their diagnostic interview before you commit. Fund the job into a Squad-backed escrow when ready."
      />

      <ProfileCard
        initials={profile.initials}
        name={profile.name}
        verifiedLabel={profile.verifiedLabel}
        trade={profile.trade}
        location={profile.location}
        knowledge={profile.knowledge}
        trust={profile.trust}
        iseScore={profile.iseScore}
        bio={profile.bio}
        skills={profile.skills}
        glanceItems={profile.glanceItems}
        rate={profile.rate}
        rateNote={profile.rateNote}
      />

      <div
        style={{
          display: "flex",
          flexDirection: isTablet ? "column" : "row",
          gap: "30px",
        }}
      >
        <div style={{ width: isTablet ? "100%" : "70%" }}>
          <ToolsCard
            tools={profile.tools}
            note="Tools are a stronger signal than years. Ask before you hire."
          />
        </div>
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <h4 className="customers-say">What customers say</h4>
            <h5 className="reviews">
              {profile.reviewCount ?? 0} reviews · {profile.reviewAvg ?? 0} avg
            </h5>
          </div>
          <div
            style={{
              gap: "10px",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              maxHeight: "300px",
            }}
          >
            {(profile.reviews ?? []).map((review, i) => (
              <ReviewCard
                key={i}
                name={review.name}
                customerTag={review.customerTag}
                timeAgo={review.timeAgo}
                rating={review.rating}
                quote={review.quote}
                tags={review.tags}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => setShowAssignModal(true)}
          style={{
            backgroundColor: "#0f3d2e",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 18px",
            fontFamily: "Instrument Sans",
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 20,
          }}
        >
          Assign a job to {profile.name}
        </button>
        {showAssignModal && (
          <AssignJobModal
            workerId={userId}
            workerName={profile.name}
            onClose={() => setShowAssignModal(false)}
            onAssigned={(jobId) => {
              console.log(`Assigned job ${jobId} to worker ${userId}`);
              // consider a toast/success message here
            }}
          />
        )}
      </div>
    </AppShell>
  );
}
