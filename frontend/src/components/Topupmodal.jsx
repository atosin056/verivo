import { useState } from "react";
import { X, Coins } from "lucide-react";

const DEFAULT_PRESETS = [10000, 25000, 50000, 100000];

function formatShort(amount) {
  return amount >= 1000 ? `₦${amount / 1000}k` : `₦${amount}`;
}

export default function TopUpModal({
  isOpen,
  onClose,
  onSubmit,
  presets = DEFAULT_PRESETS,
  title = "Top up master account",
  subtitle = "How much would you like to add to your Verivo Virtual account?",
}) {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  if (!isOpen) return null;

  function handlePresetClick(amount) {
    setSelectedPreset(amount);
    setCustomAmount("");
  }

  function handleCustomChange(e) {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(digitsOnly);
    if (digitsOnly) setSelectedPreset(null);
  }

  function handleSubmit() {
    const amount = customAmount ? Number(customAmount) : selectedPreset;
    if (!amount) return;
    onSubmit?.(amount);
  }

  const amount = customAmount ? Number(customAmount) : selectedPreset;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(28, 25, 23, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#F3EFE6",
          borderRadius: 20,
          border: "1px solid rgba(28, 25, 23, 0.1)",
          padding: 24,
          fontFamily: "Instrument Sans",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "Fraunces, 'Times New Roman', serif",
              fontSize: 22,
              letterSpacing: "-0.025em",
              fontWeight: 400,
              color: "#1c1917",
            }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#78716c",
              padding: 4,
              display: "flex",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: 14, color: "#78716c", margin: "0 0 20px" }}>
          {subtitle}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            marginBottom: 16,
          }}
        >
          {presets.map((preset) => {
            const isSelected = selectedPreset === preset && !customAmount;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetClick(preset)}
                style={{
                  padding: "10px 0",
                  fontFamily: "Instrument Sans",
                  borderRadius: 999,
                  border: isSelected
                    ? "1.5px solid #1c1917"
                    : "1px solid rgba(28, 25, 23, 0.15)",
                  backgroundColor: isSelected ? "#e7e3d8" : "#faf8f2",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1c1917",
                  cursor: "pointer",
                }}
              >
                {formatShort(preset)}
              </button>
            );
          })}
        </div>

        <input
          type="text"
          inputMode="numeric"
          placeholder="₦ Custom amount"
          value={
            customAmount ? `₦ ${Number(customAmount).toLocaleString()}` : ""
          }
          onChange={handleCustomChange}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "14px 16px",
            fontFamily: "Instrument Sans",
            borderRadius: 12,
            border: "1px solid rgba(28, 25, 23, 0.15)",
            backgroundColor: "#faf8f2",
            fontSize: 14,
            color: "#1c1917",
            marginBottom: 20,
            outline: "none",
          }}
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!amount}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "14px 20px",
            borderRadius: 999,
            border: "none",
            backgroundColor: "#e0a642",
            color: "#1a1712",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "Instrument Sans",
            cursor: amount ? "pointer" : "not-allowed",
            opacity: amount ? 1 : 0.6,
          }}
        >
          <Coins size={16} />
          Get payment details
        </button>
      </div>
    </div>
  );
}
