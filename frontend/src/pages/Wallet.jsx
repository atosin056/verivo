import AppShell from "../components/AppShell.jsx";
import SectionHeader from "../components/Sectionheader";
import StatCard from "../components/StatCard";
import OwoCard from "../components/Owocard";
import useBreakpoint from "../hooks/useBreakpoint.js";

export default function Wallet() {
  const { isTablet, isMobile } = useBreakpoint();

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Wallet · Paystack Virtual Account"
        leadText="₦0"
        emphasisText="earned"
        trailText="this month."
        description="Settlements land fast with Paystack. Track exactly what came in, what went out, and what's still held in your balance."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isTablet ? "1fr" : "1.4fr 1fr",
          gap: isMobile ? "16px" : "25px",
          alignItems: "start",
        }}
      >
        <OwoCard
          userName="Oluwatosin Akinfenwa"
          sinceText="since.."
          balance={0}
          accountNumber={null}
          bankName="GTBank"
          railsLabel="Squad rails"
          onWithdraw={() => console.log("withdraw clicked")}
          onReceipts={() => console.log("receipts clicked")}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "10px",
          }}
        >
          <StatCard label="In Escrow" prefix="₦" value={0} />
          <StatCard label="This month" prefix="₦" value={0} />
          <StatCard
            label="Platform fee paid"
            prefix="₦"
            value={0}
            description="3% on completed jobs"
          />
          <StatCard
            label="AVG PAYOUT TIME"
            value={47}
            unit="sec"
            note="Paystack Transfer API"
          />
        </div>
      </div>
    </AppShell>
  );
}
