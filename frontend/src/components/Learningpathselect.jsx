import { useState } from "react";
import { Hammer, Heart, GraduationCap, BookOpen } from "lucide-react";

const DEFAULT_OPTIONS = [
  {
    key: "apprenticeship",
    label: "Apprenticeship under a master",
    description: "You learned under someone in their shop. Often years long.",
    icon: Hammer,
  },
  {
    key: "family_workshop",
    label: "Family workshop",
    description: "Mother, father, uncle, older sibling. The craft was at home.",
    icon: Heart,
  },
  {
    key: "formal_school",
    label: "Formal school / college",
    description: "A vocational school, polytechnic, or training programme.",
    icon: GraduationCap,
  },
  {
    key: "self_taught",
    label: "Mostly self-taught",
    description: "YouTube, books, friends, your own broken phones. No shame.",
    icon: BookOpen,
  },
];

const tokens = {
  label: "#14110F",
  desc: "#6B6055",
  unselectedBorder: "#D6CDB8",
  selectedBorder: "#0F3D2E",
  unselectedIconBg: "#E4DEC9",
  selectedIconBg: "#0F3D2E",
  radioUnselected: "#C9C0AD",
  radioSelected: "#0F3D2E",
};

/**
 * LearningPathSelect
 *
 * Single-select 2x2 grid of cards — "How did you learn your trade?"
 *
 * Props:
 * ------
 * label      (string)  question above the grid
 * options    (array)   [{ key, label, description, icon }] — defaults to the 4 in the screenshot
 * value      (string)  controlled selected key
 * onChange   (func)    called with the selected key whenever a card is clicked
 */
export default function LearningPathSelect({
  label = "",
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
    <div style={{ width: "100%" }}>
      {label && (
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            color: tokens.label,
            margin: "0 0 14px",
          }}
        >
          {label}
        </p>
      )}

      <div
        role="radiogroup"
        aria-label={label}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
        }}
      >
        {options.map((opt) => {
          const isSelected = selected === opt.key;
          const Icon = opt.icon;

          return (
            <button
              key={opt.key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(opt.key)}
              style={{
                display: "flex",
                gap: "12px",
                padding: "18px",
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
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "8px",
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
                  <Icon
                    size={17}
                    color={isSelected ? "#FBF7EF" : "#14110F"}
                    strokeWidth={2}
                  />
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "14.5px",
                      fontWeight: 600,
                      color: tokens.label,
                      marginBottom: "4px",
                      lineHeight: 1.3,
                    }}
                  >
                    {opt.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "13px",
                      color: tokens.desc,
                      lineHeight: 1.4,
                    }}
                  >
                    {opt.description}
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
                    background: isSelected
                      ? tokens.radioSelected
                      : "transparent",
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
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Usage:
//
// const [learningPath, setLearningPath] = useState(null);
//
// <LearningPathSelect
//   value={learningPath}
//   onChange={setLearningPath}
// />
//
// learningPath -> "apprenticeship"
// ---------------------------------------------------------------------
