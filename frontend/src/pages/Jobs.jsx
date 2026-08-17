import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AppShell from "../components/AppShell.jsx";
import SectionHeader from "../components/Sectionheader";
import Statustabs from "../components/Statustabs";
import { tokens, fonts } from "../tokens";
import JobCard from "../components/Jobcard";
import useBreakpoint from "../hooks/useBreakpoint.js";

export default function Jobs() {
  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();
  const [activeCount, setActiveCount] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [disputedCount, setDisputedCount] = useState(0);

  const FILTERS = [
    { key: "nearby", label: "Within 10 km" },
    { key: "soon", label: "Today / tomorrow" },
    { key: "repeat", label: "Repeat customers" },
    { key: "bulk", label: "Bulk (3+ items)" },
    { key: "highvalue", label: "Above ₦15,000" },
  ];

  const [activeFilters, setActiveFilters] = useState([]);
  const toggleFilter = (key) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key],
    );
  };

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Jobs"
        emphasisText="6 jobs"
        trailText="are waiting for you."
        description="Ranked by trade fit, location, and your repeat-customer history. Open a card to see the customer's words and fund-in-escrow status."
      />

      <Statustabs
        counts={{
          matched: matchedCount,
          active: activeCount,
          history: historyCount,
          disputed: disputedCount,
        }}
        onChange={(key) => console.log("switched to", key)}
      />

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {FILTERS.map((filter) => {
          const isActive = activeFilters.includes(filter.key);
          return (
            <button
              key={filter.key}
              onClick={() => toggleFilter(filter.key)}
              style={{
                padding: "10px 16px",
                borderRadius: "999px",
                border: `1px solid ${isActive ? "#d6cdb8" : "silver"}`,
                background: isActive ? tokens.emerald : "transparent",
                color: isActive ? tokens.bone : tokens.ink,
                fontFamily: "Poppins",
                fontSize: "14px",
                cursor: "pointer",
                transition:
                  "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              }}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <JobCard
          status="active"
          category="Phone Repair"
          jobNumber={1}
          title="iPhone 13 Screen Replacement"
          quote="Cracked screen needs full OEM replacement."
          location="Lekki Phase 1, Lagos"
          date="13 May"
          jobAmount={15000}
          fee={450}
          receiveAmount={14550}
          onClick={() => navigate(`/app/jobs/1`)}
        />
        <JobCard
          status="pending"
          category="Phone Repair"
          jobNumber={1}
          title="iPhone 13 Screen Replacement"
          quote="Cracked screen needs full OEM replacement."
          location="Lekki Phase 1, Lagos"
          date="13 May"
          jobAmount={15000}
          fee={450}
          receiveAmount={14550}
          onClick={() => navigate(`/app/jobs/1`)}
        />
      </div>
    </AppShell>
  );
}
