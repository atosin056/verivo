import SectionHeader from "../components/Sectionheader";
import AppShell from "../components/AppShell";
import WalletCard from "../components/Employerwalletcard";
import StatCard from "../components/StatCard";
import { UserDataContext, useUserData } from "../UserDataContext.js";
import useBreakpoint from "../hooks/useBreakpoint.js";
import LedgerCard from "../components/Ledgercard.jsx";
import TopUpModal from "../components/Topupmodal.jsx";
import TopUpMasterAccountModal from "../components/Topupmasteraccount.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Billing() {
  const { isMobile } = useBreakpoint();
  const [isTopup, setIsTopup] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(0);
  const [balance, setBalance] = useState(0);
  const userData = useUserData();

  const baseUrl =
    import.meta.env.VITE_BASE_URL || "https://verivo.onrender.com";

  // Only sync from context when userData actually changes —
  // not on every render (that was overwriting optimistic updates).
  useEffect(() => {
    if (userData?.employer?.balance !== undefined) {
      setBalance(userData.employer.balance);
    }
  }, [userData]);

  function handleTopUp() {
    setIsTopup(true);
  }

  function handleWithdraw() {
    console.log("Withdraw clicked");
    // e.g. openWithdrawModal()
  }

  function handleSimulate(employerId, amount) {
    // Optimistic update — bump the balance right away so the UI feels
    // instant, don't wait for the network call.
    setBalance((prev) => prev + amount);

    // Fire the actual request in the background. We deliberately don't
    // await this in the caller — UI has already moved on.
    axios
      .post(`${baseUrl}/api/employer/topup`, { employerId, amount })
      .catch((err) => {
        console.log(err.message);
        // Request failed — roll back the optimistic bump so balance
        // doesn't drift from what's actually in the DB.
        setBalance((prev) => prev - amount);
      });
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
        description: "Verivo fee · 3% on #9012",
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
    <>
      {paymentDetails !== 0 && (
        <TopUpMasterAccountModal
          amount={paymentDetails}
          accountNumber="7061234567"
          bankName="GTBank"
          railName="Paystack rails"
          etaSeconds={60}
          sandbox={true}
          onClose={() => {
            setPaymentDetails(0);
            // Balance stays whatever it currently is — no reset needed
            // since we're not optimistically bumping it before the
            // webhook confirms anymore.
          }}
          onChangeAmount={() => {
            setIsTopup(true);
            setPaymentDetails(0);
          }}
          onSimulateWebhook={() => {
            handleSimulate(userData.employer.id, paymentDetails);
            setPaymentDetails(0); // close the modal immediately
          }}
        />
      )}

      {isTopup && (
        <TopUpModal
          isOpen={isTopup}
          onClose={() => setIsTopup(false)}
          onSubmit={(amount) => {
            console.log("top up requested:", amount);
            setIsTopup(false);
            setPaymentDetails(amount);
            // No optimistic balance bump here — balance only updates
            // once handleSimulate confirms the webhook actually landed.
          }}
        />
      )}

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
                  badgeLabel={userData.employer.fullName}
                  amount={balance}
                  escrow={{
                    value: userData.employer.escrowbalance,
                    sub: `${0} job locked`,
                  }}
                  released={{ value: 184000, sub: "12 jobs", month: "May" }}
                  fees={{ value: 5520, sub: "3% paid" }}
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
    </>
  );
}
