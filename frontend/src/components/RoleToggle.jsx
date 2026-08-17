import { useState } from "react";

/**
 * RoleToggle
 *
 * Segmented "I do the work / I hire the work" control.
 *
 * Props:
 * ------
 * value        (string)  controlled value: "worker" | "employer" — pass this
 *                         + onChange to drive it from outside (e.g. searchParams)
 * defaultValue (string)  initial value when used uncontrolled (no value passed)
 * onChange     (func)    called with the new value whenever an option is clicked
 * label        (string)  eyebrow text above the toggle
 */
export default function RoleToggle({
  value,
  defaultValue = "employer",
  onChange,
  label = "I'm signing up as",
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hovered, setHovered] = useState(null); // "worker" | "employer" | null
  const [focused, setFocused] = useState(null); // "worker" | "employer" | null

  // controlled if `value` is passed, uncontrolled otherwise
  const active = value !== undefined ? value : internalValue;

  const handleSelect = (next) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const options = [
    { key: "worker", text: "I do the work" },
    { key: "employer", text: "I hire the work" },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "720px" }}>
      <p
        style={{
          fontFamily: "'Poppins'",
          fontSize: "14px",
          fontWeight: 500,
          color: "#14110f",
          margin: "0 0 10px 2px",
        }}
      >
        {label}
      </p>

      <div
        role="tablist"
        aria-label={label}
        style={{
          display: "flex",
          gap: "4px",
          padding: "0.475rem",
          background: "lab(86.9832% .488043 12.0432 / .6)",
          width: "100%",
          borderRadius: "1rem",
          boxSizing: "border-box",
        }}
      >
        {options.map((opt) => {
          const isActive = active === opt.key;
          const isHovered = hovered === opt.key;

          return (
            <button
              key={opt.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(opt.key)}
              onMouseEnter={() => setHovered(opt.key)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setFocused(opt.key)}
              onBlur={() => setFocused(null)}
              style={{
                flex: 1,
                border: "none",
                cursor: "pointer",
                background: isActive ? "#f4efe6" : "transparent",
                color: isActive || isHovered ? "#14110f" : "#6b6055",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14.5px",
                fontWeight: 500,
                padding: "1rem 20px",

                borderRadius: "1rem",
                outline: "none",

                transition: "background-color 0.25s ease, color 0.25s ease",
                boxSizing: "border-box",
              }}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
