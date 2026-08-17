/**
 * PrimaryActionButton
 *
 * The main dark-green pill CTA used at the bottom of forms and flows,
 * e.g. "Continue — verify your phone".
 *
 * Props:
 * ------
 * children   (node)    button label content, e.g. "Continue — verify your phone"
 * onClick    (func)    click handler
 * type       (string)  "button" | "submit" (default: "button")
 * disabled   (bool)    disables the button and dims it
 * loading    (bool)    shows a spinner instead of the arrow, disables interaction
 * icon       (node)    override the default arrow icon (pass null to hide it)
 * fullWidth  (bool)    stretches the button to 100% of its container (default: true)
 */
export default function Primaryactionbtn({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  icon,
  fullWidth = true,
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`primary-action-btn${fullWidth ? " primary-action-btn--full" : ""}`}
      aria-busy={loading || undefined}
    >
      <span className="primary-action-btn__label">{children}</span>

      {loading ? (
        <span className="primary-action-btn__spinner" aria-hidden="true" />
      ) : icon !== null ? (
        icon || (
          <svg
            className="primary-action-btn__arrow"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      ) : null}
    </button>
  );
}
