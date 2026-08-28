import React from "react";
import { Coins, ArrowUpRight } from "lucide-react";

function formatNaira(amount) {
  const whole = Math.trunc(amount);
  const cents = Math.round((amount - whole) * 100);
  return {
    whole: `₦${whole.toLocaleString()}`,
    cents: `.${String(cents).padStart(2, "0")}`,
  };
}

function StatBlock({ label, value, sub, strikethrough }) {
  return (
    <div>
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.14rem",
          textTransform: "uppercase",
          color: "#8a8578",
          fontFamily: "JetBrains Mono",
          margin: 0,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 22,
          fontWeight: 500,
          color: "#f2ede4",
          fontFamily: "Fraunces",
          letterSpacing: "-0.025em",
          margin: "6px 0 2px",
          textDecorationColor: "rgba(242, 237, 228, 0.4)",
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: 12,
          color: "#8a8578",
          margin: 0,
          marginTop: "5px",
          fontFamily: "Instrument Sans",
        }}
      >
        {sub}
      </p>
    </div>
  );
}

export default function WalletCard({
  amount,
  badgeLabel = "Adaeze Atelier · Master VA",
  squadLabel = "GTCO Squad",
  isLive = true,
  escrow = { value: "₦24,500", sub: "1 job locked" },
  released = { value: "₦184k", sub: "12 jobs", month: "May" },
  fees = { value: "₦5,520", sub: "3% paid" },
  onTopUp,
  onWithdraw,
}) {
  const { whole, cents } = formatNaira(amount);

  return (
    <div
      style={{
        position: "relative",
        margin: "0 auto",
        borderRadius: 24,
        backgroundColor: "#1a1712",
        border: "1px solid rgba(242, 237, 228, 0.08)",
        padding: 28,
        overflow: "hidden",
      }}
    >
      {/* blob-warm */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 300,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(224,158,66,0.35) 0%, rgba(224,158,66,0) 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      {/* blob-cool */}
      {/* <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -80,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(64,130,150,0.25) 0%, rgba(64,130,150,0) 70%)",
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      /> */}

      <div style={{ position: "relative" }}>
        {/* header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              border: "1px solid rgba(242, 237, 228, 0.25)",
              borderRadius: 999,
              padding: "6px 12px",
              fontSize: 11,
              fontFamily: "JetBrains Mono",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#f2ede4",
            }}
          >
            <span>✧</span>
            {badgeLabel}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#8a8578",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "Instrument Sans",
              flexShrink: 0,
            }}
          >
            {squadLabel}
            {isLive && (
              <>
                <span style={{ color: "#8a8578" }}>·</span>
                <span
                  style={{
                    color: "#6fbf7a",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#6fbf7a",
                      display: "inline-block",
                    }}
                  />
                  Live
                </span>
              </>
            )}
          </div>
        </div>

        {/* balance */}
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14rem",
            textTransform: "uppercase",
            fontFamily: "JetBrains Mono",
            color: "#8a8578",
            margin: "28px 0 0",
          }}
        >
          Available balance
        </p>
        <p
          style={{
            fontFamily: "Fraunces, 'Times New Roman', serif",
            fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
            fontWeight: 400,
            color: "#f7f3ea",

            margin: "4px 0 0",
            lineHeight: 1,
          }}
        >
          {whole}
          <span style={{ fontSize: 22, color: "#8a8578" }}>{cents}</span>
        </p>

        {/* divider */}
        <div
          style={{
            height: 1,
            background: "rgba(242, 237, 228, 0.12)",
            margin: "28px 0 20px",
          }}
        />

        {/* stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          <StatBlock
            label="In escrow"
            value={escrow.value}
            sub={escrow.sub}
            strikethrough
          />
          <StatBlock
            label={`Released (${released.month ?? "this month"})`}
            value={released.value}
            sub={released.sub}
            strikethrough
          />
          <StatBlock
            label="Recivo fees"
            value={fees.value}
            sub={fees.sub}
            strikethrough
          />
        </div>

        {/* buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <button
            type="button"
            onClick={onTopUp}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              backgroundColor: "#e0a642",
              color: "#1a1712",
              fontFamily: "Instrument Sans",
              border: "none",
              borderRadius: 999,
              padding: "14px 20px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Coins size={16} />
            Top up
          </button>
          <button
            type="button"
            onClick={onWithdraw}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Instrument Sans",
              gap: 8,
              backgroundColor: "transparent",
              color: "#f2ede4",
              border: "1px solid rgba(242, 237, 228, 0.25)",
              borderRadius: 999,
              padding: "14px 20px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <ArrowUpRight size={16} />
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
