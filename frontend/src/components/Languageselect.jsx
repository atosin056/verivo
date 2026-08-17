import { useState } from "react";
import { Languages } from "lucide-react";

const DEFAULT_OPTIONS = [
  { key: "pidgin", label: "Pidgin", greeting: "How body? Make we start." },
  { key: "yoruba", label: "Yorùbá", greeting: "Ẹ káàárọ̀. A jọ́ bẹ̀rẹ̀ sí ṣiṣẹ́." },
  { key: "igbo", label: "Igbo", greeting: "Ndewo. Ka anyị malite." },
  { key: "hausa", label: "Hausa", greeting: "Sannu. Mu fara." },
  { key: "english", label: "English", greeting: "Welcome. Let's begin." },
];

const tokens = {
  label: "#14110F",
  greeting: "#6B6055",
  unselectedBorder: "#D6CDB8",
  selectedBorder: "#0F3D2E",
  unselectedIconBg: "#E4DEC9",
  selectedIconBg: "#0F3D2E",
  radioUnselected: "#C9C0AD",
  radioSelected: "#0F3D2E",
};

/**
 * LanguageSelect
 *
 * Single-select grid of language cards, each with a greeting line in that
 * language. First four options render 2-up, the last spans full width.
 *
 * Props:
 * ------
 * options    (array)   [{ key, label, greeting }] — defaults to the 5 in the screenshot
 * value      (string)  controlled selected key
 * onChange   (func)    called with the selected key whenever a card is clicked
 */
export default function LanguageSelect({
  options = DEFAULT_OPTIONS,
  value,
  onChange,
}) {
  const [internalValue, setInternalValue] = useState(null);
  const selected = value !== undefined ? value : internalValue;

  const handleSelect = (key) => {
    if (value === undefined) setInternalValue(key);
    onChange?.(key);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Choose a language"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "14px",
      }}
    >
      {options.map((opt, idx) => {
        const isSelected = selected === opt.key;
        const isLast = idx === options.length - 1;
        const spansFullRow = isLast && options.length % 2 !== 0;

        return (
          <button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => handleSelect(opt.key)}
            style={{
              gridColumn: spansFullRow ? "1 / -1" : "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              padding: "16px 18px",
              border: isSelected
                ? `1.5px solid ${tokens.selectedBorder}`
                : `1px solid ${tokens.unselectedBorder}`,
              borderRadius: "16px",
              background: "transparent",
              cursor: "pointer",
              textAlign: "left",
              transition: "border-color 0.2s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                minWidth: 0,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isSelected
                    ? tokens.selectedIconBg
                    : tokens.unselectedIconBg,
                }}
              >
                <Languages
                  size={17}
                  color={isSelected ? "#FBF7EF" : "#14110F"}
                  strokeWidth={2}
                />
              </span>

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: tokens.label,
                    marginBottom: "3px",
                  }}
                >
                  {opt.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "13px",
                    color: tokens.greeting,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {opt.greeting}
                </div>
              </div>
            </div>

            <span
              style={{
                flexShrink: 0,
                width: "20px",
                height: "20px",
                borderRadius: "9999px",
                border: isSelected
                  ? "none"
                  : `1.5px solid ${tokens.radioUnselected}`,
                background: isSelected ? tokens.radioSelected : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isSelected && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#FBF7EF"
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
  );
}

// ---------------------------------------------------------------------
// Usage:
//
// const [language, setLanguage] = useState(null);
//
// <LanguageSelect value={language} onChange={setLanguage} />
//
// language -> "pidgin"
// ---------------------------------------------------------------------
