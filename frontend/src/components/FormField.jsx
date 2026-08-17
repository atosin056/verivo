import { useState } from "react";

/**
 * FormField
 *
 * A labeled input used across the auth flow — "Your name", "Phone number", etc.
 * Also supports a textarea mode for longer free-text answers.
 *
 * Props:
 * ------
 * type          "text" | "tel" | "textarea"
 *                                tel renders the NG +234 country prefix
 *                                textarea renders a resizable multi-line box
 *                                with a live character counter
 * label         (string)         field label, e.g. "Your name"
 * required      (bool)           shows an orange asterisk next to the label
 * placeholder   (string)         input placeholder
 * underText     (string)         helper line under the field, e.g.
 *                                "We'll send a one-time code. No password to remember."
 *                                for type="textarea" this appends after the
 *                                character count, e.g. "0/600 characters · {underText}"
 * value         (string)
 * onChange      (func)
 * countryCode   (string)         only used when type="tel", default "+234"
 * countryLabel  (string)         only used when type="tel", default "NG"
 * maxLength     (number)         only used when type="textarea", default 600
 * rows          (number)         only used when type="textarea", default 4
 */
export default function FormField({
  type = "text",
  label,
  required = false,
  placeholder,
  underText,
  value,
  onChange,
  countryCode = "+234",
  countryLabel = "NG",
  maxLength = 600,
  rows = 4,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const isTel = type === "tel";
  const isTextarea = type === "textarea";
  const charCount = value?.length || 0;

  return (
    <div style={{ marginBottom: "12px" }}>
      <label
        style={{
          display: "block",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "14px",
          letterSpacing: "-0.025em",
          fontWeight: 500,
          color: "#14110f",
          marginBottom: "8px",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#ea580c", marginLeft: "3px" }}>*</span>
        )}
      </label>

      <div
        style={{
          display: "flex",
          alignItems: isTextarea ? "flex-start" : "center",
          gap: "10px",
          width: "100%",
          border: `1px solid ${focused ? "#0f3d2e" : "#d6cdb8"}`,
          boxShadow: focused ? "0px 0px 4px rgba(57, 107, 90, 1)" : "none",
          borderRadius: "14px",
          background: "#f4efe6",
          padding: isTel ? "14px 18px" : "16px 18px",
          boxSizing: "border-box",
          transition: "border-color 0.2s ease",
        }}
      >
        {isTel && (
          <>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "14px",
                color: "#14110f",
                flexShrink: 0,
              }}
            >
              <span style={{ letterSpacing: "0.05em" }}>{countryLabel}</span>
              <span>{countryCode}</span>
            </span>
            <span
              style={{
                width: "1px",
                height: "20px",
                background: "#d6cdb8",
                flexShrink: 0,
              }}
            />
          </>
        )}

        {isTextarea ? (
          <textarea
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={rows}
            className="form-field-input"
            style={{
              flex: 1,
              minWidth: 0,
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              color: "#14110f",
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "15px",
              lineHeight: 1.55,
              resize: "vertical",
            }}
            {...rest}
          />
        ) : (
          <input
            type={isTel ? "tel" : "text"}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="form-field-input"
            style={{
              flex: 1,
              minWidth: 0,
              border: "none",
              outline: "none",
              background: "transparent",
              color: "#14110f",
              fontFamily: isTel
                ? "'JetBrains Mono', monospace"
                : "'Instrument Sans', sans-serif",
              fontSize: isTel ? "14.5px" : "15px",
              letterSpacing: isTel ? "0.05em" : "normal",
            }}
            {...rest}
          />
        )}
      </div>

      {isTextarea ? (
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13px",
            color: "#6b6055",
            margin: "8px 2px 0",
          }}
        >
          {charCount}/{maxLength} characters
          {underText ? ` · ${underText}` : ""}
        </p>
      ) : (
        underText && (
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "13px",
              color: "#6b6055",
              margin: "8px 2px 0",
            }}
          >
            {underText}
          </p>
        )
      )}
    </div>
  );
}
