/**
 * RegChoice
 *
 * Props:
 * ------
 * icon        (string)  path/URL to the icon image
 * iconBg      (string)  background color behind the icon
 * eyebrow     (string)  small caps label, e.g. "01 — ARTISANS, TECHNICIANS, CRAFTSPEOPLE"
 * bigText     (string)  the large serif heading
 * smallText   (string)  the supporting description text
 * hoverColor  (string)  border + arrow color on hover — default green, pass any hex to override
 * onClick     (func)    optional click handler
 */
export default function RegChoice({
  icon,
  iconBg = "#EAE6DD",
  eyebrow,
  bigText,
  smallText,
  hoverColor = "#2F6B3E",
  onClick,
}) {
  return (
    <div
      className="regchoice-card"
      style={{ "--hover-color": hoverColor }}
      onClick={onClick}
    >
      <div className="regchoice-icon" style={{ background: iconBg }}>
        <img src={icon} alt="" />
      </div>

      <div className="regchoice-body">
        {eyebrow && <p className="regchoice-eyebrow">{eyebrow}</p>}
        <h3 className="regchoice-title">{bigText}</h3>
        {smallText && <p className="regchoice-text">{smallText}</p>}
      </div>

      <div className="regchoice-arrow">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
