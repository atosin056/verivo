import { useState } from "react";
import { X, Copy, Check, Loader2 } from "lucide-react";

/**
 * TopUpMasterAccountModal
 *
 * Props:
 * - amount        number   Required. e.g. 25000 -> renders as ₦25,000
 * - accountNumber string   e.g. "7061234567"
 * - bankName      string   e.g. "GTBank"
 * - railName      string   e.g. "Squad rails"
 * - etaSeconds    number   How long the webhook takes to land (default 60)
 * - sandbox       boolean  Show the sandbox helper + simulate button (default true)
 * - onClose       fn
 * - onChangeAmount fn
 * - onSimulateWebhook fn   Called when "Simulate webhook" is pressed.
 *                          Can return a Promise; button shows a spinner while pending.
 * - open          boolean  Controls visibility (default true)
 */
export default function TopUpMasterAccountModal({
  amount = 0,
  accountNumber = "7061234567",
  bankName = "GTBank",
  railName = "Squad rails",
  etaSeconds = 60,
  sandbox = true,
  open = true,
  onClose = () => {},
  onChangeAmount = () => {},
  onSimulateWebhook = () => {},
}) {
  const [copied, setCopied] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [closeHover, setCloseHover] = useState(false);
  const [copyHover, setCopyHover] = useState(false);
  const [changeHover, setChangeHover] = useState(false);
  const [simulateHover, setSimulateHover] = useState(false);

  if (!open) return null;

  const formattedAmount = new Intl.NumberFormat("en-NG", {
    maximumFractionDigits: 0,
  }).format(amount);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available — fail silently
    }
  };

  const handleSimulate = async () => {
    try {
      setSimulating(true);
      await onSimulateWebhook();
    } finally {
      setSimulating(false);
    }
  };

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: 16,
    },
    modal: {
      width: "100%",
      maxWidth: 420,
      borderRadius: 16,
      backgroundColor: "#f2efe6",
      padding: 24,
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      boxSizing: "border-box",
      fontFamily: "Instrument Sans",
    },
    header: {
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      margin: 0,
      fontSize: 20,
      color: "#1c1c1a",
      fontFamily: "Fraunces",
      letterSpacing: "-0.07em",
      fontWeight: 400,
    },
    closeBtn: {
      border: "none",
      background: closeHover ? "rgba(0,0,0,0.05)" : "transparent",
      color: closeHover ? "#1c1c1a" : "#8a8578",
      borderRadius: 999,
      padding: 6,
      cursor: "pointer",
      display: "flex",
      transition: "background-color 0.15s, color 0.15s",
    },
    darkCard: {
      borderRadius: 12,
      backgroundColor: "#161512",
      padding: 20,
    },
    eyebrow: {
      margin: 0,
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.14em",
      color: "#9a968a",
    },
    amount: {
      margin: "6px 0 0 0",
      fontSize: 36,
      fontWeight: 400,
      letterSpacing: "-0.025em",
      fontFamily: "Fraunces",
      color: "#f7f5ef",
    },
    detailsRow: {
      marginTop: 20,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16,
    },
    accountRow: {
      marginTop: 4,
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    accountNumber: {
      margin: 0,
      fontSize: 15,
      fontWeight: 400,
      fontFamily: "JetBrains Mono",
      color: "#f7f5ef",
    },
    copyBtn: {
      border: "none",
      background: "transparent",
      color: copyHover ? "#f7f5ef" : "#9a968a",
      cursor: "pointer",
      display: "flex",
      padding: 0,

      transition: "color 0.15s",
    },
    bankText: {
      margin: "4px 0 0 0",
      fontSize: 15,
      fontWeight: 500,
      color: "#f7f5ef",
      textAlign: "right",
    },
    footNote: {
      marginTop: 20,
      borderTop: "1px solid rgba(255,255,255,0.1)",
      paddingTop: 12,
    },
    footNoteText: {
      margin: 0,
      fontSize: 12,
      lineHeight: 1.6,
      color: "#8f8b7f",
    },
    sandboxBox: {
      marginTop: 16,
      borderRadius: 12,
      border: "1px solid rgba(227,198,107,0.5)",
      backgroundColor: "#fbf1cf",
      padding: 16,
    },
    sandboxTitle: {
      margin: 0,
      fontSize: 13,
      fontWeight: 600,
      color: "#8a6d1f",
    },
    sandboxText: {
      margin: "4px 0 0 0",
      fontSize: 13,
      lineHeight: 1.6,
      color: "#8a7a45",
    },
    code: {
      borderRadius: 4,
      backgroundColor: "rgba(0,0,0,0.05)",
      padding: "2px 4px",
      fontSize: 12,
    },
    actions: {
      marginTop: 16,
      display: "flex",
      gap: 12,
    },
    changeBtn: {
      flex: 1,
      borderRadius: 999,
      border: "1px solid #d9d5c7",
      backgroundColor: changeHover ? "rgba(0,0,0,0.05)" : "transparent",
      padding: "12px 0",
      fontSize: 14,
      fontWeight: 500,
      color: "#1c1c1a",

      fontFamily: "Instrument Sans",
      cursor: "pointer",
      transition: "background-color 0.15s",
    },
    simulateBtn: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: 999,
      border: "none",

      fontFamily: "Instrument Sans",
      backgroundColor: simulating
        ? "#0f3d2e"
        : simulateHover
          ? "#0c3225"
          : "#0f3d2e",
      opacity: simulating ? 0.7 : 1,
      padding: "12px 0",
      fontSize: 14,
      fontWeight: 500,
      color: "#ffffff",
      cursor: simulating ? "default" : "pointer",
      transition: "background-color 0.15s, opacity 0.15s",
    },
  };

  return (
    <div
      style={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="topup-modal-title"
      onClick={onClose}
    >
      {/* keyframes for the spinner (inline styles alone can't declare @keyframes) */}
      <style>{`
        @keyframes topup-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <h2 id="topup-modal-title" style={styles.title}>
            Top up master account
          </h2>
          <button
            onClick={onClose}
            onMouseEnter={() => setCloseHover(true)}
            onMouseLeave={() => setCloseHover(false)}
            aria-label="Close"
            style={styles.closeBtn}
          >
            <X size={18} />
          </button>
        </div>

        {/* Dark transfer card */}
        <div style={styles.darkCard}>
          <p style={styles.eyebrow}>TRANSFER EXACTLY THIS AMOUNT</p>
          <p style={styles.amount}>₦{formattedAmount}</p>

          <div style={styles.detailsRow}>
            <div>
              <p style={styles.eyebrow}>ACCOUNT</p>
              <div style={styles.accountRow}>
                <p style={styles.accountNumber}>{accountNumber}</p>
                <button
                  onClick={handleCopy}
                  onMouseEnter={() => setCopyHover(true)}
                  onMouseLeave={() => setCopyHover(false)}
                  aria-label="Copy account number"
                  style={styles.copyBtn}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>
            </div>
            <div>
              <p style={{ ...styles.eyebrow, textAlign: "right" }}>BANK</p>
              <p style={styles.bankText}>
                {bankName} · {railName}
              </p>
            </div>
          </div>

          <div style={styles.footNote}>
            <p style={styles.footNoteText}>
              Transfer from any bank. Your {railName.split(" ")[0]} master
              balance updates within {etaSeconds} seconds via webhook.
            </p>
          </div>
        </div>

        {/* Sandbox note */}
        {sandbox && (
          <div style={styles.sandboxBox}>
            <p style={styles.sandboxTitle}>Sandbox mode</p>
            <p style={styles.sandboxText}>
              No real transfer needed — hit the button below to simulate the{" "}
              {railName.split(" ")[0]}{" "}
              <code style={styles.code}>virtual_account.funded</code> webhook.
            </p>
          </div>
        )}

        {/* Actions */}
        <div style={styles.actions}>
          <button
            onClick={onChangeAmount}
            onMouseEnter={() => setChangeHover(true)}
            onMouseLeave={() => setChangeHover(false)}
            style={styles.changeBtn}
          >
            ← Change amount
          </button>
          <button
            onClick={handleSimulate}
            onMouseEnter={() => setSimulateHover(true)}
            onMouseLeave={() => setSimulateHover(false)}
            disabled={simulating}
            style={styles.simulateBtn}
          >
            <Loader2
              size={15}
              style={
                simulating
                  ? { animation: "topup-spin 1s linear infinite" }
                  : undefined
              }
            />
            Simulate webhook
          </button>
        </div>
      </div>
    </div>
  );
}
