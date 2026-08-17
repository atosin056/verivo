import AppShell from "../components/AppShell";
import useBreakpoint from "../hooks/useBreakpoint";
import SectionHeader from "../components/Sectionheader";
import DisputeResolution from "../components/Disputeresolution.jsx";
import DisputeRecordCard from "../components/Disputerecordcard.jsx";

export default function Disputes() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="Dispute centre · AI-arbitrated"
        leadText="No open disputes."
        emphasisText="Clean record."
        description="Both sides upload evidence. A vision model analyses photos and proposes a resolution. Human review only when the AI flags uncertainty. Target: 80% auto-resolved."
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <div>
          <DisputeResolution />
        </div>
        <div>
          <DisputeRecordCard
            disputeRate={0}
            jobsCount={6}
            resolvedCleanly={0}
            resolvedTotal={0}
            openCases={0}
            totalDisputes={0}
          />
        </div>
      </div>
    </AppShell>
  );
}
