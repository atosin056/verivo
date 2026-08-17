import { useState } from "react";
import { Check, Copy, ArrowRight } from "lucide-react";

// ---- Design tokens (matches Recivo system) ----
const tokens = {
  emerald: "#0f3d2e",
  bone: "#f7f4ec",
  paper: "#fbf9f3",
  ink: "#1c1c1a",
  inkMuted: "#8c8a80",
  gold: "#c9a24b",
  border: "#e7e2d3",
};

function formatAccountNumber(num) {
  // groups of 4, last group whatever remains
  const digits = num.replace(/\D/g, "");
  return digits.match(/.{1,4}/g)?.join(" ") ?? digits;
}

function formatAmount(value, symbol) {
  if (value === undefined || value === null) return `${symbol}0`;
  return `${symbol}${value.toLocaleString()}`;
}

const StatColumn = ({ label, value, strikethrough }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <span
      style={{
        fontFamily: "'JetBrains Mono', sans-serif",
        fontSize: 10.5,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: tokens.inkMuted,
        fontWeight: 400,
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: "'Fraunces'",
        wordBreak: "break-all",
        fontSize: 22,
        fontWeight: 500,
        color: tokens.ink,
        textDecoration: strikethrough ? "line-through" : "none",
        textDecorationColor: tokens.inkMuted,
        textDecorationThickness: 1,
      }}
    >
      {value}
    </span>
  </div>
);

const WalletCard = ({
  provider = "SQUAD VA",
  bank = "GTCO",
  status = "Active",
  since = "2026-03",
  accountNumber,
  available = 0,
  inEscrow = 0,
  thisMonth = 0,
  currencySymbol = "\u20A6",
  onOpenWallet,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber.replace(/\D/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard not available — fail silently
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        flex: 1,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        borderRadius: 20,
        background: tokens.paper,
        border: `1px solid ${tokens.border}`,
        padding: "24px 24px 20px",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(28,28,26,0.04)",
      }}
    >
      {/* Decorative diagonal stripe corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 140,
          height: 100,
          backgroundImage: `repeating-linear-gradient(45deg, ${tokens.border} 0, ${tokens.border} 1px, transparent 1px, transparent 10px)`,
          maskImage: "linear-gradient(to bottom left, black, transparent 70%)",
          WebkitMaskImage:
            "linear-gradient(to bottom left, black, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top row: badge + status */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 22,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 4,
            border: `1px solid ${tokens.emerald}`,
            background: "#0f3d2e08",
          }}
        >
          <Check size={13} color={tokens.emerald} strokeWidth={2.5} />
          <span
            style={{
              fontSize: "9.5px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              color: tokens.emerald,
              fontFamily: "JetBrains Mono",
            }}
          >
            {provider} · {bank}
          </span>
        </div>
        <span
          style={{
            fontSize: 10,
            color: tokens.inkMuted,
            fontFamily: "JetBrains mono",
          }}
        >
          {status} · since {since}
        </span>
      </div>

      {/* Account number */}
      <div style={{ marginBottom: 18, position: "relative" }}>
        <div
          style={{
            fontSize: "9.5px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: tokens.inkMuted,
            fontFamily: "JetBrains Mono",
            fontWeight: 500,
            marginBottom: 8,
          }}
        >
          Account Number
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono' ",
              fontSize: 28,
              fontWeight: 400,

              color: tokens.ink,
              letterSpacing: "0.02em",
            }}
          >
            {formatAccountNumber(accountNumber)}
          </span>
          <button
            onClick={handleCopy}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 999,
              border: "none",
              background: tokens.ink,
              color: tokens.bone,
              fontFamily: "'Poppins', sans-serif",
              fontSize: 12.5,
              fontWeight: 500,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Copy size={13} />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: tokens.border,
          margin: "4px 0 18px",
        }}
      />

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <StatColumn
          label="Available"
          value={formatAmount(available, currencySymbol)}
          strikethrough={available === 0}
        />
        <StatColumn
          label="In Escrow"
          value={formatAmount(inEscrow, currencySymbol)}
          strikethrough={inEscrow === 0}
        />
        <StatColumn
          label="This Month"
          value={formatAmount(thisMonth, currencySymbol)}
          strikethrough={thisMonth === 0}
        />
      </div>

      {/* Open wallet button */}
      <button
        onClick={onOpenWallet}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderRadius: 14,
          border: `1px solid ${tokens.border}`,
          background: tokens.bone,
          fontFamily: "'Poppins', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          color: tokens.ink,
          cursor: "pointer",
        }}
      >
        Open wallet
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default WalletCard;
