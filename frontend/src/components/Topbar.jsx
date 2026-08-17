import { useState } from "react";
import { Search, Bell, Mic } from "lucide-react";

const tokens = {
  bone: "#EFEBE0",
  boneDark: "#E5E0D2",
  ink: "#1C1C1C",
  inkMuted: "#6B6B63",
  gold: "#B08D57",
};

function SearchBar({
  placeholder = "Search jobs, customers, disputes…",
  onSearch,
}) {
  const [value, setValue] = useState("");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "12px",
        borderRadius: "1000px",
        paddingLeft: "0.75rem",
        paddingRight: "0.50rem",
        paddingBlock: "0.375rem",
        border: `1px solid ${tokens.boneDark}`,
        background: "#f4efe6",
      }}
    >
      <Search size={16} color={tokens.inkMuted} style={{ flexShrink: 0 }} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch?.(value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "#0000",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "13.5px",
          color: tokens.ink,
        }}
      />
      <kbd
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "#6b6055",
          background: "#e2d9c3",
          padding: "4px 6px",
          display: "flex",
          alignItems: "center",
          borderRadius: "6px",
          flexShrink: 0,
        }}
      >
        ⌘K
      </kbd>
    </div>
  );
}

function NotificationBell({ hasUnread = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "relative",
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        border: `1px solid ${tokens.boneDark}`,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <Bell size={17} color={tokens.ink} />
      {hasUnread && (
        <span
          style={{
            position: "absolute",
            top: "8px",
            right: "9px",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#E0553F", // TODO: swap for your alert/error token if you have one
          }}
        />
      )}
    </button>
  );
}

export default function Topbar({
  searchPlaceholder = "Search jobs, customers, disputes…",
  onSearch,
  hasUnreadNotifications = false,
  onNotificationClick,
  children, // pass the CTA button in from the page, since it changes per view
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "12px",
        padding: "14px 20px",
        borderBottom: `1px solid ${tokens.boneDark}`,
        background: "transparent",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <SearchBar placeholder={searchPlaceholder} onSearch={onSearch} />
      <NotificationBell
        hasUnread={hasUnreadNotifications}
        onClick={onNotificationClick}
      />
      {children}
    </div>
  );
}
