import SectionHeader from "../components/Sectionheader";
import AppShell from "../components/AppShell";
import WalletCard from "../components/Employerwalletcard";
import StatCard from "../components/StatCard";
import useBreakpoint from "../hooks/useBreakpoint.js";
import LedgerCard from "../components/Ledgercard.jsx";
export default function Billing() {
  const { isTablet, isMobile } = useBreakpoint();
  function handleTopUp() {
    console.log("Top up clicked");
    // e.g. openTopUpModal()
  }

  function handleWithdraw() {
    console.log("Withdraw clicked");
    // e.g. openWithdrawModal()
  }
  const ledgerResponse = {
    dateRangeLabel: "Last 7 days",
    transactions: [
      {
        id: "txn_1",
        type: "release",
        description: "Released to Tunde · Job #9012 (Samsung A55 screen)",
        day: "Today",
        time: "14:02",
        amount: 11640,
      },
      {
        id: "txn_2",
        type: "fund",
        description: "Funded escrow · Job #9012 (Samsung A55 screen)",
        day: "Today",
        time: "12:18",
        amount: 12000,
      },
      {
        id: "txn_3",
        type: "fee",
        description: "Recivo fee · 3% on #9012",
        day: "Today",
        time: "14:02",
        amount: 360,
      },
      {
        id: "txn_4",
        type: "release",
        description: "Released to Kabir · Job #8998 (Tiger 4kVA)",
        day: "Mon",
        time: "18:21",
        amount: 8245,
      },
      {
        id: "txn_5",
        type: "fund",
        description: "Funded escrow · Job #8998",
        day: "Mon",
        time: "09:14",
        amount: 8500,
      },
      {
        id: "txn_6",
        type: "topup",
        description: "Top-up · Verve · 0123",
        day: "Sun",
        time: "17:46",
        amount: 50000,
      },
    ],
  };
  return (
    <AppShell>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <SectionHeader
            eyebrow="Billing & escrow"
            emphasisText="Per-job"
            trailText="escrow, settled by Paystack"
            description="Top up once. Fund each job into its own Virtual Account. Release on confirm. Unused funds stay in your master account, withdrawable anytime."
          />
        </div>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 20,
            }}
          >
            <div>
              <WalletCard
                amount={37400}
                onTopUp={handleTopUp}
                onWithdraw={handleWithdraw}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: "10px",
              }}
            >
              <StatCard label="Active Escrows" value={0} />
              <StatCard label="Pending Disputes" value={0} />
              <StatCard
                label="Platform fee paid"
                prefix="₦"
                value={0}
                description="3% on completed jobs"
              />
              <StatCard
                label="AVG PAYOUT TIME"
                value={47}
                suffix="s"
                description="Paystack Transfer API"
              />
            </div>
          </div>
        </div>
        <div>
          <LedgerCard
            transactions={ledgerResponse.transactions}
            dateRangeLabel={ledgerResponse.dateRangeLabel}
          />
        </div>
      </div>
    </AppShell>
  );
}
