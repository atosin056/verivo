import { useState } from "react";
import { Check } from "lucide-react";

const DEFAULT_OPTIONS = [
  "Screen replacement",
  "Battery & charging",
  "Motherboard / soldering",
  "Face-ID / Touch-ID pairing",
  "Water damage recovery",
  "Software & flashing",
  "Speaker / mic",
  "Back glass",
];

const tokens = {
  label: "#14110F",
  helperText: "#B08A6E",
  unselectedBg: "transparent",
  unselectedBorder: "#D6CDB8",
  unselectedText: "#14110F",
  selectedBg: "#0F3D2E",
  selectedText: "#FBF7EF",
};

/**
 * SubSpecialtiesSelect
 *
 * Multi-select pill grid — "Sub-specialties you do well".
 *
 * Props:
 * ------
 * label       (string)  question above the pills
 * helperText  (string)  muted line under the label
 * options     (array)   list of option strings — defaults to the 8 in the screenshot
 * value       (array)   controlled selected values — pass this + onChange to drive it externally
 * onChange    (func)    called with the full updated array whenever a pill is toggled
 */
export default function SubSpecialtiesSelect({
  label = "Sub-specialties you do well",
  helperText = "Tap all that apply. Add anything we've missed.",
  options = DEFAULT_OPTIONS,
  value,
  onChange,
}) {
  const [internalValue, setInternalValue] = useState([]);
  const selected = value !== undefined ? value : internalValue;

  const toggleOption = (option) => {
    const isSelected = selected.includes(option);
    const next = isSelected
      ? selected.filter((item) => item !== option)
      : [...selected, option];

    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div style={{ width: "100%" }}>
      <p
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "15px",
          fontWeight: 500,
          color: tokens.label,
          margin: "0 0 6px",
        }}
      >
        {label}
      </p>

      {helperText && (
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13.5px",
            color: "#6B6055",
            margin: "0 0 16px",
          }}
        >
          {helperText}
        </p>
      )}

      <div
        role="group"
        aria-label={label}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {options.map((option) => {
          const isSelected = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => toggleOption(option)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 20px",
                borderRadius: "999px",
                border: isSelected
                  ? "none"
                  : `1px solid ${tokens.unselectedBorder}`,
                background: isSelected
                  ? tokens.selectedBg
                  : tokens.unselectedBg,
                color: isSelected ? tokens.selectedText : tokens.unselectedText,
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                transition:
                  "background-color 0.2s ease, border-color 0.2s ease",
              }}
            >
              {isSelected && <Check size={15} strokeWidth={2.5} />}
              {option}
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
// const [specialties, setSpecialties] = useState([]);
//
// <SubSpecialtiesSelect
//   value={specialties}
//   onChange={setSpecialties}
// />
//
// specialties -> ["Screen replacement", "Battery & charging"]
// ---------------------------------------------------------------------
