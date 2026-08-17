import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Animate from "../components/Animate.jsx";
import logo from "../assets/logo.png";
import useBreakpoint from "../hooks/useBreakpoint.js";
import {
  Home,
  HandCoins,
  Briefcase,
  CreditCard,
  PieChart,
  Gavel,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const tokens = {
  emerald: "#0F3D2E",
  emeraldDark: "#0B2E22",
  bone: "#EFEBE0",
  boneDark: "#E5E0D2",
  ink: "#1C1C1C",
  inkMuted: "#6B6B63",
  inkFaint: "#2a2521",
  gold: "#B08D57",
};

const navItems = [
  { key: "today", label: "Today", icon: Home },
  { key: "offers", label: "Offers", icon: HandCoins },
  { key: "jobs", label: "Jobs", icon: Briefcase },
  { key: "wallet", label: "Wallet", icon: CreditCard },
  { key: "ise-score", label: "Işẹ́ Score", icon: PieChart },
  { key: "disputes", label: "Disputes", icon: Gavel },
  { key: "profile", label: "Profile", icon: User },
];

function SidebarLink({ label, icon: Icon, active, onClick, muted = false }) {
  const [hovered, setHovered] = useState(false);

  const baseStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "11px 16px",
    borderRadius: "14px",
    border: "none",
    background: active
      ? tokens.emerald
      : hovered && !muted
        ? tokens.boneDark
        : "transparent",
    color: active ? tokens.bone : muted ? tokens.inkFaint : tokens.ink,
    fontFamily: "'Instrument Sans', sans-serif",
    fontSize: "14px",
    fontWeight: active ? 500 : 400,
    cursor: "pointer",
    transition: "background-color 150ms ease, color 150ms ease",
    textAlign: "left",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={baseStyle}
    >
      <Icon size={18} strokeWidth={2} style={{ flexShrink: 0 }} />
      <span>{label}</span>
    </button>
  );
}

function ProfileCard({ name, role, score }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 14px",
        borderRadius: "18px",
        border: `1px solid ${tokens.boneDark}`,
        background: "rgba(255,255,255,0.5)",
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: "#0f1912",
          color: tokens.bone,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Fraunces', sans-serif",
          fontSize: "13px",
          fontWeight: 300,
          flexShrink: 0,
        }}
      >
        {initials}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "13.5px",
            fontWeight: 500,
            color: tokens.ink,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "12px",
            color: tokens.inkMuted,
            marginTop: "1px",
          }}
        >
          {role}
        </div>
      </div>

      <div style={{ textAlign: "center", flexShrink: 0 }}>
        <div
          style={{
            fontFamily: "'Fraunces', monospace",
            fontSize: "20px",
            fontWeight: 400,
            color: tokens.ink,
            lineHeight: 1,
          }}
        >
          {score}
        </div>
        <div
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "10px",
            color: tokens.inkMuted,
            marginTop: "2px",
          }}
        >
          Işẹ́
        </div>
      </div>
    </div>
  );
}

function SidebarContent({ activeKey, handleNavigate }) {
  return (
    <>
      {/* Logo */}
      <div>
        <Animate
          delay={0.05}
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <div>
            <img src={logo} className="logo" alt="Verivo logo" />
          </div>
          <div>
            <h4 className="logoText" style={{ color: "#000" }}>
              Verivo
            </h4>
          </div>
        </Animate>
      </div>

      <div
        style={{
          height: "1px",
          background: tokens.boneDark,
          margin: "0 -16px 16px -16px",
        }}
      />

      {/* Profile card */}
      <ProfileCard name="Oluwatosin Akinfenwa" role="Phone Repair" score={0} />

      <div style={{ height: "18px" }} />

      {/* Nav links */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {navItems.map((item) => (
          <SidebarLink
            key={item.key}
            label={item.label}
            icon={item.icon}
            active={activeKey === item.key}
            onClick={() => handleNavigate(item.key)}
          />
        ))}
      </nav>

      {/* Spacer pushes bottom links down */}
      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <SidebarLink
          label="Settings"
          icon={Settings}
          active={activeKey === "settings"}
          muted
          onClick={() => handleNavigate("settings")}
        />
        <SidebarLink
          label="Sign out"
          icon={LogOut}
          active={false}
          muted
          onClick={() => {}}
        />
      </div>
    </>
  );
}

export default function Sidebar({ active, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isTablet } = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Falls back to the route if the parent doesn't explicitly pass `active`
  const path = location.pathname.replace(/^\/app\/?/, ""); // strips leading "/app" or "/app/"
  const activeKey = active ?? (path || "today");
  const handleNavigate =
    onNavigate ??
    ((key) => {
      navigate(key === "today" ? "/app" : `/app/${key}`);
      setDrawerOpen(false); // close the drawer after picking a page on mobile
    });

  // ---- Desktop / tablet-and-up: same fixed sidebar as before ----
  if (!isTablet) {
    return (
      <div
        style={{
          width: "23.5%",
          minWidth: "240px",
          height: "100%",
          position: "sticky",
          left: "0",
          background: tokens.bone,
          border: `1px solid rgba(20,17,15,0.08)`,
          padding: "1.2rem",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <SidebarContent activeKey={activeKey} handleNavigate={handleNavigate} />
      </div>
    );
  }

  // ---- Mobile / tablet: collapsed top bar + slide-in drawer ----
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          background: tokens.bone,
          borderBottom: `1px solid ${tokens.boneDark}`,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <img src={logo} className="logo" alt="Verivo logo" />
          <h4 className="logoText" style={{ color: "#000", margin: 0 }}>
            Verivo
          </h4>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: tokens.ink,
            display: "flex",
            padding: "6px",
          }}
        >
          <Menu size={22} />
        </button>
      </div>

      {drawerOpen && (
        <>
          {/* backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(20,17,15,0.4)",
              zIndex: 40,
            }}
          />
          {/* drawer panel */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "min(80vw, 300px)",
              background: tokens.bone,
              padding: "1.2rem",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              zIndex: 50,
              boxShadow: "8px 0 24px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "8px",
              }}
            >
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: tokens.ink,
                  padding: "6px",
                }}
              >
                <X size={20} />
              </button>
            </div>
            <SidebarContent
              activeKey={activeKey}
              handleNavigate={handleNavigate}
            />
          </div>
        </>
      )}
    </>
  );
}
