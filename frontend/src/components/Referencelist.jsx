import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const tokens = {
  bg: "#F4F0E6",
  border: "#D6CDB8",
  badgeBorder: "#B8AF9C",
  badgeText: "#8A8171",
  label: "#14110F",
  required: "#EA580C",
  optional: "#8A9A6E",
  inputBorder: "#D6CDB8",
  addBorder: "#B8AF9C",
  addText: "#6B6055",
  deleteIcon: "#B0A793",
};

const EMPTY_REFERENCE = { name: "", phone: "", howTheyKnowYou: "" };

/**
 * ReferenceList
 *
 * Repeatable "Reference N" entries — name, phone, and "how they know you",
 * with delete-per-entry and an "Add another reference" action underneath.
 * Only the first reference's Name/Phone are marked required; additional
 * references are fully optional.
 *
 * Props:
 * ------
 * label       (string)  question above the list (optional, omit to skip)
 * value       (array)   controlled list of { name, phone, howTheyKnowYou }
 * onChange    (func)    called with the full updated array on any change
 * maxEntries  (number)  caps how many references can be added (default 3)
 */
export default function ReferenceList({
  label,
  value,
  onChange,
  maxEntries = 3,
}) {
  const [internalValue, setInternalValue] = useState([{ ...EMPTY_REFERENCE }]);
  const references = value !== undefined ? value : internalValue;

  const commit = (next) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const updateEntry = (index, field) => (e) => {
    const next = references.map((entry, i) =>
      i === index ? { ...entry, [field]: e.target.value } : entry,
    );
    commit(next);
  };

  const addReference = () => {
    if (references.length >= maxEntries) return;
    commit([...references, { ...EMPTY_REFERENCE }]);
  };

  const removeReference = (index) => {
    if (references.length <= 1) return; // always keep at least one
    commit(references.filter((_, i) => i !== index));
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

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {references.map((entry, index) => {
          const isFirst = index === 0;
          const canDelete = references.length > 1;

          return (
            <div
              key={index}
              style={{
                position: "relative",
                border: `1px solid ${tokens.border}`,
                borderRadius: "16px",
                background: tokens.bg,
                padding: "24px 20px 20px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-11px",
                  left: "16px",
                  background: tokens.bg,
                  border: `1px solid ${tokens.badgeBorder}`,
                  borderRadius: "999px",
                  padding: "3px 12px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10.5px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: tokens.badgeText,
                }}
              >
                Reference {index + 1}
              </span>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1.3fr",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      color: tokens.label,
                    }}
                  >
                    Name
                    {isFirst && (
                      <span
                        style={{ color: tokens.required, marginLeft: "3px" }}
                      >
                        *
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="Mama Nkechi"
                    value={entry.name}
                    onChange={updateEntry(index, "name")}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "transparent",
                      border: `1px solid ${tokens.inputBorder}`,
                      borderRadius: "12px",
                      padding: "14px 16px",
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "14px",
                      color: tokens.label,
                      outline: "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      color: tokens.label,
                    }}
                  >
                    Phone
                    {isFirst && (
                      <span
                        style={{ color: tokens.required, marginLeft: "3px" }}
                      >
                        *
                      </span>
                    )}
                  </label>
                  <input
                    type="tel"
                    placeholder="0803 000 0000"
                    value={entry.phone}
                    onChange={updateEntry(index, "phone")}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "transparent",
                      border: `1px solid ${tokens.inputBorder}`,
                      borderRadius: "12px",
                      padding: "14px 16px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "13.5px",
                      letterSpacing: "0.05em",
                      color: tokens.label,
                      outline: "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontSize: "13.5px",
                        fontWeight: 600,
                        color: tokens.label,
                      }}
                    >
                      How they know you{" "}
                      <span
                        style={{
                          fontWeight: 500,
                          fontSize: "12px",
                          color: tokens.optional,
                        }}
                      >
                        optional
                      </span>
                    </label>
                    {canDelete && (
                      <button
                        type="button"
                        onClick={() => removeReference(index)}
                        aria-label={`Remove reference ${index + 1}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "none",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          color: tokens.deleteIcon,
                          flexShrink: 0,
                        }}
                      >
                        <Trash2 size={15} strokeWidth={2} />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Repeat customer"
                    value={entry.howTheyKnowYou}
                    onChange={updateEntry(index, "howTheyKnowYou")}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "transparent",
                      border: `1px solid ${tokens.inputBorder}`,
                      borderRadius: "12px",
                      padding: "14px 16px",
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "14px",
                      color: tokens.label,
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {references.length < maxEntries && (
        <button
          type="button"
          onClick={addReference}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "16px",
            border: `1.5px dashed ${tokens.addBorder}`,
            borderRadius: "999px",
            background: "transparent",
            padding: "12px 20px",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13.5px",
            fontWeight: 500,
            color: tokens.addText,
            cursor: "pointer",
          }}
        >
          <Plus size={15} strokeWidth={2} />
          Add another reference
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// Usage:
//
// const [references, setReferences] = useState([
//   { name: "", phone: "", howTheyKnowYou: "" },
// ]);
//
// <ReferenceList value={references} onChange={setReferences} />
//
// references -> [
//   { name: "Mama Nkechi", phone: "0803 000 0000", howTheyKnowYou: "Repeat customer" },
// ]
// ---------------------------------------------------------------------
