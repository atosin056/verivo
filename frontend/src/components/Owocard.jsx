import { useState } from "react";
import { ShieldCheck, Landmark, Receipt } from "lucide-react";

const tokens = {
  ink: "#1C1C1C",
  bone: "#EFEBE0",
  gold: "#B08D57",
  emerald: "#0F3D2E",
  mint: "#7FD9B0",
  salmon: "#E8A6A0",
  mutedLight: "rgba(239, 235, 224, 0.6)",
};

export default function WalletCard({
  gtcoLabel = "GTCO",
  squadLabel = "SQUAD VA",
  liveLabel = "LIVE",
  userName,
  sinceText,
  balance = 0,
  accountNumber,
  bankName,
  railsLabel,
  onWithdraw,
  onReceipts,
}) {
  const [withdrawHover, setWithdrawHover] = useState(false);
  const [receiptsHover, setReceiptsHover] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: tokens.ink,
        borderRadius: "20px",
        padding: "28px",
        color: tokens.bone,
        boxSizing: "border-box",
      }}
    >
      {/* Ambient blobs — sit behind content, clipped by overflow: hidden above */}
      {/* fixed: this was a flat #14110f fill before, no gradient showed at all */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(176, 137, 35, 0.5) 0%, rgba(176, 137, 35, 0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          right: "-150px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(45, 138, 100, 0.45) 0%, rgba(45, 138, 100, 0) 70%)",
        }}
      />

      {/* Header row */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: `1px solid ${tokens.bone}33`,
            // fixed: was 5px (not a pill) — 999px matches every other badge
            borderRadius: "999px",
            // fixed: was a stray lab() color function
            background: "rgba(255,255,255,0.05)",
            padding: "10px 14px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <ShieldCheck size={13} />
          <span>{gtcoLabel}</span>
          <span style={{ color: tokens.mutedLight }}>·</span>
          <span>{squadLabel}</span>
          <span style={{ color: tokens.mutedLight }}>·</span>
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4CD37B",
              }}
            />
            {liveLabel}
          </span>
        </div>

        {(userName || sinceText) && (
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "13px",
              color: tokens.mutedLight,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "220px",
            }}
          >
            {userName}
            {sinceText ? ` · ${sinceText}` : ""}
          </span>
        )}
      </div>

      {/* Balance */}
      <div style={{ position: "relative", zIndex: 1, margin: "24px 0" }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: tokens.mutedLight,
            marginBottom: "8px",
          }}
        >
          Available balance
        </div>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(2.6rem, 10vw, 5.5rem)",
            lineHeight: 1,
            color: tokens.bone,
          }}
        >
          ₦{typeof balance === "number" ? balance.toLocaleString() : balance}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "1px",
          background: "rgba(255,255,255,0.12)",
        }}
      />

      {/* Account details */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: "48px",
          flexWrap: "wrap",
          margin: "22px 0 26px 0",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: tokens.mutedLight,
              marginBottom: "6px",
            }}
          >
            Account number
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "16px",
              fontWeight: 400,
              color: accountNumber ? tokens.mint : tokens.bone,
              lineHeight: 1.4,
              maxWidth: "200px",
            }}
          >
            {accountNumber || "Not yet provisioned"}
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: tokens.mutedLight,
              marginBottom: "6px",
            }}
          >
            Bank
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "16px",
              fontWeight: 400,
              color: tokens.bone,
            }}
          >
            {bankName || "—"}
            {railsLabel ? ` · ${railsLabel}` : ""}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          type="button"
          onClick={onWithdraw}
          onMouseEnter={() => setWithdrawHover(true)}
          onMouseLeave={() => setWithdrawHover(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: withdrawHover ? "#0C3226" : tokens.emerald,
            color: tokens.bone,
            border: "none",
            borderRadius: "999px",
            padding: "13px 22px",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 0.2s ease, transform 0.2s ease",
            transform: withdrawHover ? "translateY(-1px)" : "translateY(0px)",
          }}
        >
          <Landmark size={16} />
          Withdraw to bank
        </button>

        <button
          type="button"
          onClick={onReceipts}
          onMouseEnter={() => setReceiptsHover(true)}
          onMouseLeave={() => setReceiptsHover(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            color: tokens.bone,
            border: `1px solid ${receiptsHover ? tokens.bone : "rgba(255,255,255,0.2)"}`,
            borderRadius: "999px",
            padding: "13px 22px",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "border-color 0.2s ease, transform 0.2s ease",
            transform: receiptsHover ? "translateY(-1px)" : "translateY(0px)",
          }}
        >
          <Receipt size={15} />
          Receipts
        </button>
      </div>
    </div>
  );
}
