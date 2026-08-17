import { useState } from "react";
import { Plus } from "lucide-react";

const tokens = {
  bg: "#F4F0E6",
  border: "#D6CDB8",
  badgeBorder: "#B8AF9C",
  badgeText: "#8A8171",
  label: "#14110F",
  optional: "#8A9A6E",
  inputBorder: "#D6CDB8",
  placeholder: "#B0A793",
  addBorder: "#B8AF9C",
  addText: "#6B6055",
};

const EMPTY_WORKPLACE = { place: "", role: "", yearFrom: "", yearTo: "" };

/**
 * WorkplaceHistory
 *
 * Repeatable "Workplace N" entries — place/shop, role, and a year range,
 * with an "Add another workplace" action underneath.
 *
 * Props:
 * ------
 * label      (string)  question above the list (optional, omit to skip)
 * value      (array)   controlled list of { place, role, yearFrom, yearTo }
 * onChange   (func)    called with the full updated array on any change
 * maxEntries (number)  caps how many workplaces can be added (default 5)
 */
export default function WorkplaceHistory({
  label,
  value,
  onChange,
  maxEntries = 5,
}) {
  const [internalValue, setInternalValue] = useState([{ ...EMPTY_WORKPLACE }]);
  const workplaces = value !== undefined ? value : internalValue;

  const commit = (next) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const updateEntry = (index, field) => (e) => {
    const next = workplaces.map((entry, i) =>
      i === index ? { ...entry, [field]: e.target.value } : entry,
    );
    commit(next);
  };

  const addWorkplace = () => {
    if (workplaces.length >= maxEntries) return;
    commit([...workplaces, { ...EMPTY_WORKPLACE }]);
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
        {workplaces.map((entry, index) => (
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
              Workplace {index + 1}
            </span>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.6fr 1fr 1fr",
                gap: "16px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: tokens.label,
                  }}
                >
                  Place / shop{" "}
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
                <input
                  type="text"
                  placeholder="SLOT, Adeniran Ogunsanya"
                  value={entry.place}
                  onChange={updateEntry(index, "place")}
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
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: tokens.label,
                  }}
                >
                  Role{" "}
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
                <input
                  type="text"
                  placeholder="Bench technician"
                  value={entry.role}
                  onChange={updateEntry(index, "role")}
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
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: tokens.label,
                  }}
                >
                  Years{" "}
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    border: `1px solid ${tokens.inputBorder}`,
                    borderRadius: "12px",
                    padding: "14px 12px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="2016"
                    value={entry.yearFrom}
                    onChange={updateEntry(index, "yearFrom")}
                    maxLength={4}
                    style={{
                      width: "40px",
                      minWidth: 0,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "13.5px",
                      color: tokens.label,
                      textAlign: "center",
                    }}
                  />
                  <span style={{ color: tokens.placeholder, fontSize: "13px" }}>
                    –
                  </span>
                  <input
                    type="text"
                    placeholder="2019"
                    value={entry.yearTo}
                    onChange={updateEntry(index, "yearTo")}
                    maxLength={4}
                    style={{
                      width: "40px",
                      minWidth: 0,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "13.5px",
                      color: tokens.label,
                      textAlign: "center",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {workplaces.length < maxEntries && (
        <button
          type="button"
          onClick={addWorkplace}
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
          Add another workplace
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// Usage:
//
// const [workplaces, setWorkplaces] = useState([
//   { place: "", role: "", yearFrom: "", yearTo: "" },
// ]);
//
// <WorkplaceHistory value={workplaces} onChange={setWorkplaces} />
//
// workplaces -> [
//   { place: "SLOT, Adeniran Ogunsanya", role: "Bench technician", yearFrom: "2016", yearTo: "2019" },
//   { place: "...", role: "...", yearFrom: "...", yearTo: "..." },
// ]
// ---------------------------------------------------------------------
