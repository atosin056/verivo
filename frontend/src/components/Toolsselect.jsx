import { useState } from "react";
import { Check, Plus } from "lucide-react";

const tokens = {
  label: "#14110F",
  optional: "#B08A6E",
  unselectedBg: "transparent",
  unselectedBorder: "#D6CDB8",
  unselectedText: "#14110F",
  selectedBg: "#0F3D2E",
  selectedText: "#FBF7EF",
  inputBorder: "#D6CDB8",
  placeholder: "#B0A793",
  addBtnBg: "#F4F0E6",
  addBtnBorder: "#D6CDB8",
  addBtnText: "#14110F",
  countLabel: "#14110F",
  countNumber: "#B45F2E",
};

/**
 * ToolsSelect
 *
 * Multi-select tool pill grid, driven by a trade-specific options list,
 * plus a free-text "Add another tool" input for anything not listed.
 *
 * Props:
 * ------
 * options    (array)   list of tool strings for the current trade
 * value      (array)   controlled selected tool names
 * onChange   (func)    called with the full updated array on any change
 */
export default function ToolsSelect({ options = [], value, onChange }) {
  const [internalValue, setInternalValue] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const selected = value !== undefined ? value : internalValue;

  const commit = (next) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const toggleOption = (option) => {
    const isSelected = selected.includes(option);
    const next = isSelected
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    commit(next);
  };

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed || selected.includes(trimmed)) return;
    commit([...selected, trimmed]);
    setCustomInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustom();
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        role="group"
        aria-label="Tools"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "24px",
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

      <label
        style={{
          display: "block",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          color: tokens.label,
          marginBottom: "8px",
        }}
      >
        Add another tool{" "}
        <span
          style={{
            fontWeight: 500,
            fontSize: "12.5px",
            color: tokens.optional,
          }}
        >
          optional
        </span>
      </label>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Manual flux pen, dental pick"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            minWidth: 0,
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
        <button
          type="button"
          onClick={handleAddCustom}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexShrink: 0,
            border: `1px solid ${tokens.addBtnBorder}`,
            borderRadius: "12px",
            background: tokens.addBtnBg,
            padding: "0 20px",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: tokens.addBtnText,
            cursor: "pointer",
          }}
        >
          <Plus size={16} strokeWidth={2} />
          Add
        </button>
      </div>

      <p
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "13.5px",
          color: tokens.countLabel,
          margin: "20px 0 0",
        }}
      >
        Selected:{" "}
        <span style={{ fontWeight: 700, color: tokens.countNumber }}>
          {selected.length}
        </span>
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------
// Usage (trade-dependent options, same pattern as SubSpecialtiesSelect):
//
// import { getToolsForTrade } from "../lib/tradeTools";
//
// const [tools, setTools] = useState([]);
//
// <ToolsSelect
//   options={getToolsForTrade(formData.trade)}
//   value={tools}
//   onChange={setTools}
// />
//
// tools -> ["Soldering iron", "Multimeter", "Manual flux pen"]  (custom entries mix right in)
// ---------------------------------------------------------------------
