import React, { useState, useRef, useEffect } from "react";

const tokens = {
  bone: "#F4F1EA",
  emerald: "#0B4D3B",
  ink: "#1A1A1A",
  inkMuted: "#8A8680",
  gold: "#C9A24B",
};

const fonts = {
  display: "'Fraunces', serif",
  body: "'Poppins', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

const TABS = [
  { key: "matched", label: "Matched for you" },
  { key: "active", label: "Active" },
  { key: "history", label: "History" },
  { key: "disputed", label: "Disputed" },
];

const DEFAULT_COUNTS = {
  matched: 6,
  active: 0,
  history: 0,
  disputed: 0,
};

export default function Statustabs({
  tabs = TABS,
  counts = DEFAULT_COUNTS,
  defaultActive = tabs[0]?.key,
  onChange,
}) {
  const [activeKey, setActiveKey] = useState(defaultActive);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const tabRefs = useRef({});
  const containerRef = useRef(null);

  const measure = (key) => {
    const el = tabRefs.current[key];
    const container = containerRef.current;
    if (!el || !container) return;
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setUnderline({
      left: elRect.left - containerRect.left,
      width: elRect.width,
    });
  };

  useEffect(() => {
    measure(activeKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  useEffect(() => {
    const handleResize = () => measure(activeKey);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  const handleClick = (key) => {
    setActiveKey(key);
    console.log("Active tab:", key);
    if (onChange) onChange(key);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "32px",
        borderBottom: `1px solid ${tokens.inkMuted}33`,
        background: tokens.bone,
        padding: "0 4px",
        fontFamily: fonts.body,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        const count = counts[tab.key] ?? 0;
        return (
          <button
            key={tab.key}
            ref={(el) => (tabRefs.current[tab.key] = el)}
            onClick={() => handleClick(tab.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "14px 2px",
              fontFamily: fonts.body,
              fontSize: "15px",
              fontWeight: 400,
              color: isActive ? "#14110f" : tokens.inkMuted,
              transition: "color 0.25s ease",
              outline: "none",
            }}
          >
            {tab.label}
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: "12px",
                fontWeight: 600,
                color: isActive ? tokens.bone : tokens.inkMuted,
                background: isActive ? tokens.emerald : `${tokens.inkMuted}22`,
                borderRadius: "999px",
                padding: "2px 8px",
                minWidth: "20px",
                textAlign: "center",
                transition: "background 0.25s ease, color 0.25s ease",
              }}
            >
              {count}
            </span>
          </button>
        );
      })}

      {/* sliding underline */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: `${underline.left}px`,
          width: `${underline.width}px`,
          height: "1px",
          background: tokens.ink,
          transition:
            "left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}
