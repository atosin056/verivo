// AppShell.jsx — now purely layout, no fetching, no context creation
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import useBreakpoint from "../hooks/useBreakpoint.js";

export default function AppShell({ children }) {
  const { isTablet, isMobile } = useBreakpoint();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: isTablet ? "column" : "row",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <div style={{ overflowY: "auto", flex: 1, minHeight: 0 }}>
          <Topbar />
          <div
            style={{
              padding: isMobile ? "20px" : isTablet ? "32px" : "50px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxSizing: "border-box",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
