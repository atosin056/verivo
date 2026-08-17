/**
 * AuthIntro
 *
 * The "eyebrow / big heading / supporting line" block used at the top of
 * auth screens (Register, Login, etc).
 *
 * Props:
 * ------
 * eyebrow      (string)  small caps label above the heading, e.g. "Sign in or Join"
 * children     (node)    the heading content — pass spans/<br/> inline for
 *                        colored or italic words, same as before
 * description  (string)  supporting paragraph under the heading (optional)
 */
export default function AuthIntro({ eyebrow, children, description }) {
  return (
    <div style={{ width: "100%" }}>
      {eyebrow && (
        <h4
          className="mono-tabular-text"
          style={{
            color: "#6b6055",
            fontSize: "14px",
            letterSpacing: "0.17em",
          }}
        >
          {eyebrow}
        </h4>
      )}

      <h2
        className="editorial-text"
        style={{
          color: "#14110f",
          fontWeight: "500",
          fontSize: "clamp(1.8rem, 5vw, 3.8rem)",
          lineHeight: "0.96",
          margin: 0,
        }}
      >
        {children}
      </h2>

      {description && (
        <p
          style={{
            fontFamily: "Poppins",
            fontSize: "17px",
            color: "#2a2521",
            lineHeight: "27px",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
