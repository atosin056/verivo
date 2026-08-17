import { useState } from "react";

/**
 * AgreementCheckbox
 *
 * Custom checkbox + label, used for consent lines like
 * "I agree to the Recivo Terms and Privacy Notice."
 *
 * Props:
 * ------
 * checked    (bool)   controlled checked state — pass this + onChange to drive it
 * onChange   (func)   called with the new boolean whenever it's toggled
 * color      (string) fill color when checked (default: emerald "#0f3d2e")
 * children   (node)   the label content — plain text and/or <AgreementLink>s
 *                      mixed in, same as AuthIntro's children pattern
 */
export default function AgreementCheckbox({
  checked,
  onChange,
  color = "#0f3d2e",
  children,
}) {
  const [internalChecked, setInternalChecked] = useState(false);
  const [focused, setFocused] = useState(false);

  const isChecked = checked !== undefined ? checked : internalChecked;

  const toggle = () => {
    const next = !isChecked;
    if (checked === undefined) setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <label
      style={{
        position: "relative", // ← add this
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          opacity: 0,
        }}
      />
      {/* decorative box that reflects the real checkbox's state */}
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: "20px",
          height: "20px",
          marginTop: "2px",
          borderRadius: "6px",
          border: isChecked ? "none" : "1.5px solid #c9c0ad",
          background: isChecked ? color : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: focused ? `0 0 0 3px ${color}33` : "none",
          transition:
            "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        {isChecked && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="#fffdf8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "14px",
          lineHeight: 1.55,
          color: "#3a352d",
        }}
      >
        {children}
      </span>
    </label>
  );
}

/**
 * AgreementLink
 *
 * Small styled <a> for use inside AgreementCheckbox's children, e.g.
 *   <AgreementLink href="/terms">Recivo Terms</AgreementLink>
 * Matches the underline treatment already used elsewhere (the "Sign in" link).
 */
export function AgreementLink({ href, children }) {
  return (
    <a
      href={href}
      style={{
        color: "#3a352d",
        fontWeight: 500,
        textDecoration: "underline",
        textDecorationColor: "#c89a2a",
        textDecorationThickness: "1.5px",
        textUnderlineOffset: "3px",
      }}
    >
      {children}
    </a>
  );
}
