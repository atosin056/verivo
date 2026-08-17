import { useState, useEffect } from "react";

/**
 * useBreakpoint
 * -------------
 * Inline styles can't respond to @media queries, so this hook tracks the
 * viewport width and gives you back simple booleans to branch your style
 * objects on. One resize listener shared per component that calls it.
 *
 * Breakpoints (match the ones already used in App.css for the auth shell):
 *   isMobile   <= 480px
 *   isTablet   <= 900px  (includes mobile)
 *   isDesktop  >  900px
 *
 * Usage:
 *   const { isMobile, isTablet } = useBreakpoint();
 *
 *   <div style={{
 *     display: "grid",
 *     gridTemplateColumns: isTablet ? "1fr" : "1.4fr 1fr",
 *     padding: isMobile ? "20px" : "50px",
 *   }}>
 */
export default function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width,
    isMobile: width <= 480,
    isTablet: width <= 900,
    isDesktop: width > 900,
  };
}
