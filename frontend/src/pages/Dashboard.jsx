import AppShell from "../components/AppShell.jsx";
import TodayHero from "../components/Todayhero.jsx";
import IseScoreCard from "../components/Isescorecard.jsx";
import WalletCard from "../components/Walletcard.jsx";
import StatCard from "../components/StatCard.jsx";
import useBreakpoint from "../hooks/useBreakpoint.js";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isTablet, isMobile } = useBreakpoint();

  return (
    <AppShell>
      <TodayHero
        name="Oluwatosin"
        iseScore={0}
        jobsCompleted={0}
        emphasis="No new matches yet"
        rest="match you today."
        onCtaClick={() => navigate("/app/jobs")}
      />

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* score + wallet: side by side on desktop, stacked on tablet/mobile */}
        <div
          style={{
            display: "flex",
            flexDirection: isTablet ? "column" : "row",
            width: "100%",
            gap: "20px",
          }}
        >
          <div style={{ width: isTablet ? "100%" : "59%" }}>
            <IseScoreCard
              score={0}
              knowledge={0}
              trust={0}
              footerText="Your Trust score grows on every Squad-confirmed payment. Going off-platform doesn't punish — it just stops rewarding while others compound."
            />
          </div>
          <div style={{ width: isTablet ? "100%" : "41%" }}>
            <WalletCard
              provider="PAYSTACK VA"
              bank="GTCO"
              status="Active"
              since="2026-03"
              accountNumber="9012345678"
              available={0}
              inEscrow={0}
              thisMonth={0}
              onOpenWallet={() => navigate("/wallet")}
            />
          </div>
        </div>

        {/* stat cards: 4 across desktop -> 2 across tablet -> 1 across mobile */}
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
          <StatCard label="COMPLETED JOBS" value={0} />
          <StatCard
            label="Repeat customers"
            value={0}
            suffix="%"
            description="Strongest predictor of skill."
          />
          <StatCard label="Accept latency" value={0} suffix="ms" />
          <StatCard label="In Escrow" value={0} prefix="₦" />
        </div>
      </div>
    </AppShell>
  );
}
