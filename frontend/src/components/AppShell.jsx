import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import useBreakpoint from "../hooks/useBreakpoint.js";

/**
 * AppShell
 * --------
 * Wraps every dashboard-style page (Dashboard, Jobs, Wallet, Profile, etc).
 * Handles Sidebar + Topbar + the scrollable padded content area — every
 * page was repeating this exact structure, so it's pulled out here.
 * Switches from a side-by-side row (desktop sidebar) to a stacked column
 * (mobile top bar + drawer) since Sidebar itself collapses at that
 * breakpoint.
 *
 * Usage — replace the old manual wrapper markup in each page with:
 *
 *   <AppShell>
 *     <SectionHeader ... />
 *     ...rest of the page content...
 *   </AppShell>
 */
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
