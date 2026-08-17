import { Loader2 } from "lucide-react";

const tokens = {
  paper: "#F4EFE6",
  border: "#D6CDB8",
  ink: "#14110F",
  inkMuted: "#6B6055",
  iconBg: "#E7E2D3",
};

/**
 * EmptyState
 * ----------
 * Covers both the "nothing here yet" state and the "still loading" state
 * for any list/collection view (offers, jobs, disputes, reviews, etc) —
 * same dashed-border shape, just swaps what's inside.
 *
 * Props:
 * ------
 * loading      (bool)   shows the spinner + loadingText instead of the
 *                        icon/title/description trio
 * loadingText  (string) text under the spinner while loading (default: "Loading…")
 * icon         (node)   a lucide-react icon component, e.g. CheckCircle2 —
 *                        rendered inside the rounded square badge
 * title        (string) big Fraunces heading, e.g. "No offers yet"
 * description  (string) supporting line under the title
 */
export default function EmptyState({
  loading = false,
  loadingText = "Loading…",
  icon: Icon,
  title,
  description,
}) {
  return (
    <div
      style={{
        border: `1px dashed ${tokens.border}`,
        borderRadius: "20px",
        background: tokens.paper,
        padding: "48px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "16px",
      }}
    >
      {loading ? (
        <>
          <Loader2
            size={20}
            color={tokens.inkMuted}
            style={{ animation: "spin 0.8s linear infinite" }}
          />
          <span
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "13px",
              color: tokens.inkMuted,
            }}
          >
            {loadingText}
          </span>
        </>
      ) : (
        <>
          {Icon && (
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: tokens.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={20} color={tokens.ink} />
            </div>
          )}

          {title && (
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "22px",
                fontWeight: 500,
                color: tokens.ink,
                margin: 0,
              }}
            >
              {title}
            </h3>
          )}

          {description && (
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "14px",
                color: tokens.inkMuted,
                lineHeight: 1.6,
                maxWidth: "420px",
                margin: 0,
              }}
            >
              {description}
            </p>
          )}
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// Usage:
//
// import { CheckCheck } from "lucide-react";
//
// {loading ? (
//   <EmptyState loading loadingText="Loading offers…" />
// ) : offers.length === 0 ? (
//   <EmptyState
//     icon={CheckCheck}
//     title="No offers yet"
//     description="When an employer picks you from a job's match list, the offer lands here. You can chat back and accept once the price feels right."
//   />
// ) : (
//   offers.map((offer) => <OfferCard key={offer.id} {...offer} />)
// )}
// ---------------------------------------------------------------------
