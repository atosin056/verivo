/**
 * TrustBadge
 *
 * Small outlined card used to reassure users about a specific security /
 * trust point, e.g. "OTP, never a password". Icon on top, label below.
 *
 * Props:
 * ------
 * label   (string)  the reassurance text, e.g. "OTP, never a password"
 * icon    (string)  path to an icon image, e.g. "../src/assets/lock.png"
 *                    (same pattern as RegChoice's icon prop)
 * alt     (string)  alt text for the icon (defaults to "")
 */
export default function TrustBadge({ label, icon, alt = "" }) {
  return (
    <div className="trust-badge">
      {icon && (
        <span className="trust-badge__icon">
          <img src={icon} alt={alt} />
        </span>
      )}
      <span className="trust-badge__label">{label}</span>
    </div>
  );
}
