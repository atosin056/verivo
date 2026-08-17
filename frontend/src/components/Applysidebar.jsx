import { Check } from "lucide-react";
const tokens = {
  ink: "#14110f",
  inkMuted: "#6b6055",
  circleBorder: "#D6CDB8",
  boxBorder: "#D6CDB8",
  boxBg: "transparent",
  emerald: "#0f3d2e", // completed-step color
};

/**
 * ApplySidebar
 * ------------
 * The left-rail panel for the application/interview flow — eyebrow label,
 * the step list, and a "why we ask" note underneath.
 *
 * Props:
 * ------
 * eyebrow      (string)  small caps label at the top, e.g. "Application · 12 mins"
 * steps        (array)   [{ label, subProgress }, ...] — same shape as StepList
 * currentStep  (number)  1-indexed active step
 * whyTitle     (string)  heading for the info box, e.g. "Why we ask all this"
 * whyText      (string)  the explanatory copy under it
 */
export default function ApplySidebar({
  eyebrow = "Application · 12 mins",
  steps = [],
  currentStep = 1,
  whyTitle = "Why we ask all this",
  whyText,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        position: "sticky",
        top: 126,
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          fontWeight: 400,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: tokens.inkMuted,
        }}
      >
        {eyebrow}
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {steps.map((step, idx) => {
          const stepNumber = idx + 1;
          const isActive = stepNumber === currentStep;
          const isComplete = stepNumber < currentStep;

          return (
            <div
              key={stepNumber}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isComplete
                      ? tokens.emerald
                      : isActive
                        ? tokens.ink
                        : "transparent",
                    border:
                      isComplete || isActive
                        ? "none"
                        : `1px solid ${tokens.circleBorder}`,
                    color: isActive ? "#FBF7EF" : tokens.inkMuted,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9.5px",
                    fontWeight: 600,
                  }}
                >
                  {isComplete ? (
                    <Check size={11} color="#FBF7EF" strokeWidth={3} />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "'Instrument Sans'",
                    fontSize: "12px",
                    letterSpacing: "-0.025em",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive
                      ? tokens.ink
                      : "lab(41.5438% 3.08481 7.99905 / .7)",
                  }}
                >
                  {step.label}
                </span>
              </div>

              {isActive && step.subProgress && (
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: tokens.inkMuted,
                  }}
                >
                  {step.subProgress}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {whyText && (
        <div
          style={{
            border: `1px solid ${tokens.boxBorder}`,
            borderRadius: "16px",
            padding: "18px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10.5px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: tokens.inkMuted,
            }}
          >
            {whyTitle}
          </span>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "12px",
              lineHeight: 1.5,
              color: "#2a2521",
              margin: 0,
            }}
          >
            {whyText}
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// Usage:
//
// <ApplySidebar
//   eyebrow="Application · 12 mins"
//   currentStep={1}
//   steps={[
//     { label: "Who you are", subProgress: "1/3" },
//     { label: "Your story" },
//     { label: "Your voice" },
//     { label: "Your proof" },
//     { label: "Review" },
//   ]}
//   whyText="Recivo doesn't just take a star rating from strangers. We build a credential. The deeper you go here, the better the diagnostic interview matches you — and the higher your starting Işẹ́ Score."
// />
// ---------------------------------------------------------------------
