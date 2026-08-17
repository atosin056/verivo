import { useState } from "react";

const DEFAULT_TRADES = [
  { key: "phone_repair", label: "Phone repair", icon: "📱" },
  { key: "generator", label: "Generator", icon: "⚡" },
  { key: "tailoring", label: "Tailoring", icon: "✂️" },
  { key: "auto_mechanic", label: "Auto mechanic", icon: "🚗" },
  { key: "welding", label: "Welding", icon: "🔥" },
  { key: "electrical", label: "Electrical", icon: "🔌" },
];

/**
 * TradeSelect
 *
 * Single-select grid of trade cards — "What's your trade?"
 *
 * Props:
 * ------
 * label        (string)  question above the grid (default: "What's your trade?")
 * required     (bool)    shows the orange asterisk next to the label
 * options      (array)   [{ key, label, icon }] — defaults to the 6 in the screenshot
 * value        (string)  controlled selected key — pass this + onChange to drive it externally
 * onChange     (func)    called with the selected key whenever a card is clicked
 * underText    (string)  helper line under the grid
 *
 * NOTE: the icons above are emoji placeholders so this drops in with zero
 * extra dependencies. Swap `icon` for a real SVG/icon-library node per
 * option whenever you're ready — the component just renders whatever
 * you pass there.
 */
export default function TradeSelect({
  label = "What's your trade?",
  required = true,
  options = DEFAULT_TRADES,
  value,
  onChange,
  underText = "You can sharpen the details inside the app.",
}) {
  const [internalValue, setInternalValue] = useState(null);
  const selected = value !== undefined ? value : internalValue;

  const handleSelect = (key) => {
    if (value === undefined) setInternalValue(key);
    onChange?.(key);

    // 👇 this is the bit you asked for — open devtools console and click
    // a card. Remove once you've wired onChange up to real state/a form.
    console.log("TradeSelect selected:", key);
  };

  return (
    <div style={{ width: "100%" }}>
      <p
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "14.5px",
          fontWeight: 500,
          color: "#14110f",
          margin: "0 0 10px",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#ea580c", marginLeft: "3px" }}>*</span>
        )}
      </p>

      <div
        role="radiogroup"
        aria-label={label}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
      >
        {options.map((opt) => {
          const isSelected = selected === opt.key;

          return (
            <button
              key={opt.key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(opt.key)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                padding: "12px",
                border: isSelected
                  ? "1.5px solid #0f3d2e"
                  : "1px solid #d6cdb8",
                borderRadius: "14px",
                background: isSelected ? "#ececec" : "transparent",
                cursor: "pointer",
                textAlign: "left",
                transition:
                  "border-color 0.2s ease, background-color 0.2s ease",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    background: isSelected ? "#0f3d2e" : "#d9d0bd",
                  }}
                >
                  {opt.icon}
                </span>
                <span
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "14.5px",
                    fontWeight: 500,
                    color: "#14110f",
                    lineHeight: 1.25,
                  }}
                >
                  {opt.label}
                </span>
              </span>

              <span
                style={{
                  flexShrink: 0,
                  width: "20px",
                  height: "20px",
                  borderRadius: "9999px",
                  border: isSelected ? "none" : "1.5px solid #c9c0ad",
                  background: isSelected ? "#0f3d2e" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#fffdf8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {underText && (
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13px",
            color: "#6b6055",
            margin: "10px 2px 0",
          }}
        >
          {underText}
        </p>
      )}
    </div>
  );
}
