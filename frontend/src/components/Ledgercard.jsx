import React from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  Receipt,
} from "lucide-react";

const TYPE_CONFIG = {
  release: {
    icon: ArrowUpRight,
    iconColor: "#57534e",
    iconBg: "#e7e3d8",
    label: "Release",
  },
  fund: {
    icon: ShieldCheck,
    iconColor: "#8a6d1f",
    iconBg: "#e8d9a8",
    label: "Fund",
  },
  fee: { icon: Receipt, iconColor: "#57534e", iconBg: "#ded7c2", label: "Fee" },
  topup: {
    icon: ArrowDownLeft,
    iconColor: "#57534e",
    iconBg: "#e7e3d8",
    label: "Top up",
  },
};

function formatAmount(amount) {
  const sign =
    amount < 0 ? "-" : amount > 0 && amount !== Math.abs(amount) ? "" : "";
  const abs = Math.abs(amount);
  return `₦${abs.toLocaleString()}`;
}

function LedgerRow({ entry, isLast }) {
  const config = TYPE_CONFIG[entry.type] ?? TYPE_CONFIG.release;
  const Icon = config.icon;
  const showPlus = entry.type === "fund" || entry.type === "topup";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "16px 20px",
        borderBottom: isLast ? "none" : "1px solid rgba(28, 25, 23, 0.08)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: config.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={16} color={config.iconColor} />
        </div>
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              color: "#1c1917",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {entry.description}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "#a39e8f" }}>
            {entry.day} · {entry.time}
          </p>
        </div>
      </div>

      <div
        style={{
          textAlign: "right",
          flexShrink: 0,
          fontFamily: "JetBrains Mono",
        }}
      >
        <p
          style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#1c1917" }}
        >
          {showPlus ? "+" : ""}
          {formatAmount(entry.amount)}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            color: "#a39e8f",
          }}
        >
          {config.label}
        </p>
      </div>
    </div>
  );
}

export default function LedgerCard({
  transactions,
  dateRangeLabel = "Last 7 days",
}) {
  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: "Fraunces, 'Times New Roman', serif",
            fontSize: 26,
            letterSpacing: "-0.025em",
            fontWeight: 400,
            color: "#1c1917",
          }}
        >
          Ledger
        </h2>
        <span style={{ fontSize: 13, color: "#a39e8f" }}>{dateRangeLabel}</span>
      </div>
      <div
        style={{
          margin: "0 auto",
          backgroundColor: "#F3EFE6",
          border: "1px solid rgba(28, 25, 23, 0.1)",
          borderRadius: 20,
          overflow: "hidden",
          fontFamily: "Instrument Sans",
        }}
      >
        <div>
          {transactions.length === 0 ? (
            <div
              style={{
                padding: "32px 20px",
                textAlign: "center",
                fontSize: 14,
                color: "#a39e8f",
              }}
            >
              No activity yet.
            </div>
          ) : (
            transactions.map((entry, i) => (
              <LedgerRow
                key={entry.id}
                entry={entry}
                isLast={i === transactions.length - 1}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
