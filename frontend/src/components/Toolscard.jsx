import { useState } from "react";
import { Pencil } from "lucide-react";

const tokens = {
  paper: "#F4EFE6",
  border: "#d6cdb8",
  ink: "#14110F",
  inkMuted: "#6B6055",
  gold: "#B08D57",
  note: "#3A5A78",
};

// Just a plain array of strings — one per tool, formatted exactly how
// you want it to display.

export default function ToolsCard({ tools = [], note, onEdit }) {
  const [editHover, setEditHover] = useState(false);

  return (
    <div
      style={{
        background: tokens.paper,
        border: `1px solid ${tokens.border}`,
        borderRadius: "16px",
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: tokens.inkMuted,
          }}
        >
          Tools I own
        </span>
        <button
          type="button"
          onClick={onEdit}
          onMouseEnter={() => setEditHover(true)}
          onMouseLeave={() => setEditHover(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: editHover ? tokens.ink : tokens.inkMuted,
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13.5px",
            transition: "color 0.2s ease",
          }}
        >
          <Pencil size={12} />
          Edit
        </button>
      </div>

      {/* tools list */}
      {tools.length > 0 && (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {tools.map((tool, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "14.5px",
                color: tokens.ink,
              }}
            >
              <span style={{ color: tokens.gold, fontSize: "10px" }}>●</span>
              <span>{tool}</span>
            </li>
          ))}
        </ul>
      )}

      {/* footer note */}
      {note && (
        <>
          <div style={{ height: "1px", background: tokens.border }} />
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "12px",
              fontStyle: "italic",
              color: "#6b6055",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {note}
          </p>
        </>
      )}
    </div>
  );
}
