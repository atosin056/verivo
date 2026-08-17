import { useState, useEffect, useCallback } from "react";
import { X, Sparkles } from "lucide-react";

const DURATION = 20;

const styles = {
  wrapper: {
    position: "fixed",
    top: "20px",
    right: "20px",
    width: "260px",
    zIndex: 1000,
  },
  card: {
    borderRadius: "16px",
    background: "#FBF8F1",
    border: "1px solid #E4DCC8",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
  },
  cardEnter: { opacity: 0, transform: "translateX(16px) scale(0.95)" },
  cardExit: { opacity: 0, transform: "translateX(16px) scale(0.95)" },
  cardShown: { opacity: 1, transform: "translateX(0) scale(1)" },
  topStrip: {
    height: "3px",
    width: "100%",
    background: "linear-gradient(90deg, #E8B94A, #F3D27A, #E8B94A)",
  },
  content: { padding: "12px 16px 16px" },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  labelGroup: { display: "flex", alignItems: "center", gap: "6px" },
  sparkleIcon: { color: "#D9A93B" },
  label: {
    fontFamily: "Instrument Sans, sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.14em",
    color: "#8a8578",
    fontWeight: 400,
  },
  closeButton: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "none",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a8a294",
    cursor: "pointer",
    padding: 0,
  },
  digits: {
    fontFamily: "'JetBrains Mono",
    fontSize: "32px",
    lineHeight: 1,
    fontWeight: 500,

    color: "#1c1a15",
    fontVariantNumeric: "tabular-nums",
  },
  timer: {
    fontFamily: "Instrument Sans, sans-serif",
    marginTop: "8px",
    fontSize: "12px",
    color: "#a8a294",
  },
};

/**
 * Renders fixed to the top-right of the viewport — mount it anywhere in the
 * tree while the OTP step is active, position is handled internally.
 *
 * <OtpToast otp={devOtp} />            — pass the real code from your backend
 * <OtpToast fetchUrl="/api/dev-otp" /> — or let it fetch its own
 */
export default function OtpToast({ otp: otpProp, fetchUrl }) {
  const [otp, setOtp] = useState(otpProp || null);
  const [loading, setLoading] = useState(!otpProp && !!fetchUrl);
  const [error, setError] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [phase, setPhase] = useState("enter");

  const dismiss = useCallback(() => setPhase("exit"), []);

  useEffect(() => {
    if (otpProp) {
      setOtp(otpProp);
      return;
    }
    if (!fetchUrl) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(fetchUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          return data.otp ?? data.code ?? data;
        }
        return (await res.text()).trim();
      })
      .then((value) => {
        if (!cancelled) {
          setOtp(String(value));
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [otpProp, fetchUrl]);

  useEffect(() => {
    if (phase === "enter" && otp) {
      const t = setTimeout(() => setPhase("shown"), 350);
      return () => clearTimeout(t);
    }
  }, [phase, otp]);

  useEffect(() => {
    if (phase !== "shown") return;
    if (secondsLeft <= 0) {
      dismiss();
      return;
    }
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase, secondsLeft, dismiss]);

  useEffect(() => {
    if (phase === "exit") {
      const t = setTimeout(() => setPhase("gone"), 300);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "gone" || (!otp && !loading && !error)) {
    return null;
  }

  const cardMotionStyle =
    phase === "shown"
      ? styles.cardShown
      : phase === "exit"
        ? styles.cardExit
        : styles.cardEnter;

  return (
    <div style={styles.wrapper}>
      <div style={{ ...styles.card, ...cardMotionStyle }}>
        <div style={styles.topStrip} />
        <div style={styles.content}>
          <div style={styles.header}>
            <div style={styles.labelGroup}>
              <Sparkles size={13} strokeWidth={2} style={styles.sparkleIcon} />
              <span style={styles.label}>DEV OTP</span>
            </div>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              style={styles.closeButton}
            >
              <X size={12} strokeWidth={2.5} />
            </button>
          </div>

          {loading && <div style={styles.digits}>......</div>}
          {error && <div style={styles.timer}>Couldn't load OTP: {error}</div>}
          {otp && <div style={styles.digits}>{otp.split("").join(" ")}</div>}

          {otp && !error && (
            <div style={styles.timer}>Dismisses in {secondsLeft}s</div>
          )}
        </div>
      </div>
    </div>
  );
}
