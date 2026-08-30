import { useState } from "react";

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
  style,
  min,
  max,
  options = [],
  error, // <-- new: error message string, e.g. "This field is required"
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const isTel = type === "tel";
  const isTextarea = type === "textarea";
  const isCurrency = type === "currency";
  const isDate = type === "date";
  const isState = type === "state";
  const hasError = Boolean(error);
  const charCount = value?.length || 0;

  function formatCurrency(raw) {
    const digitsOnly = raw.replace(/[^\d]/g, "");
    if (!digitsOnly) return "";
    return Number(digitsOnly).toLocaleString("en-NG");
  }

  function handleCurrencyChange(e) {
    const digitsOnly = e.target.value.replace(/[^\d]/g, "");
    onChange({
      ...e,
      target: { ...e.target, value: digitsOnly },
    });
  }

  const borderColor = hasError ? "#dc2626" : focused ? "#0f3d2e" : "#d6cdb8";
  const boxShadow = hasError
    ? "0px 0px 4px rgba(220, 38, 38, 0.4)"
    : focused
      ? "0px 0px 4px rgba(57, 107, 90, 1)"
      : "none";

  return (
    <div style={{ marginBottom: "12px", ...style }}>
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
          border: `1px solid ${borderColor}`,
          boxShadow,
          borderRadius: "14px",
          background: "transparent",
          padding:
            isTel || isCurrency || isDate || isState
              ? "14px 18px"
              : "16px 18px",
          boxSizing: "border-box",
          transition: "border-color 0.2s ease",
          position: "relative",
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

        {isCurrency && (
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "15px",
              fontWeight: 500,
              color: "#14110f",
              flexShrink: 0,
            }}
          >
            ₦
          </span>
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
        ) : isState ? (
          <>
            <select
              value={value}
              onChange={onChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="form-field-input"
              style={{
                flex: 1,
                minWidth: 0,
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                color: value ? "#14110f" : "#8a8177",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "15px",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                paddingRight: "20px",
                cursor: "pointer",
              }}
              {...rest}
            >
              <option value="" disabled hidden>
                {placeholder || "Select a state"}
              </option>
              {options.map((opt) => {
                const optValue = typeof opt === "string" ? opt : opt.value;
                const optLabel = typeof opt === "string" ? opt : opt.label;
                return (
                  <option key={optValue} value={optValue}>
                    {optLabel}
                  </option>
                );
              })}
            </select>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              style={{
                position: "absolute",
                right: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                flexShrink: 0,
              }}
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="#6b6055"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        ) : (
          <input
            type={
              isCurrency ? "text" : isDate ? "date" : isTel ? "tel" : "text"
            }
            inputMode={isCurrency ? "numeric" : undefined}
            min={isDate ? min : undefined}
            max={isDate ? max : undefined}
            value={isCurrency ? formatCurrency(value || "") : value}
            onChange={isCurrency ? handleCurrencyChange : onChange}
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
              fontFamily:
                isTel || isCurrency
                  ? "'JetBrains Mono', monospace"
                  : "'Instrument Sans', sans-serif",
              fontSize: isTel || isCurrency ? "14.5px" : "15px",
              letterSpacing: isTel || isCurrency ? "0.05em" : "normal",
              colorScheme: isDate ? "light" : undefined,
            }}
            {...rest}
          />
        )}
      </div>

      {hasError ? (
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13px",
            color: "#dc2626",
            margin: "8px 2px 0",
          }}
        >
          {error}
        </p>
      ) : isTextarea ? (
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
