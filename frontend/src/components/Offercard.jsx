import EmptyState from "./Emptystate";

/**
 * LoadingWrapper
 * --------------
 * Wrap any content (offer cards, job cards, whatever) in this. While
 * isLoading is true, it shows the spinner + loadingText instead of your
 * children. Once isLoading flips to false, your real content renders.
 *
 * Props:
 * ------
 * isLoading    (bool)   true = show spinner, false = show children
 * loadingText  (string) text under the spinner (default: "Loading…")
 * children     (node)   your real content — offer cards, job list, etc.
 */
export default function OfferCard({
  isLoading,
  loadingText = "Loading…",
  children,
}) {
  if (isLoading) {
    return <EmptyState loading loadingText={loadingText} />;
  }

  return children;
}

// ---------------------------------------------------------------------
// Usage:
//
// const [isLoading, setIsLoading] = useState(true);
// const [offers, setOffers] = useState([]);
//
// useEffect(() => {
//   fetch("/api/offers")
//     .then((r) => r.json())
//     .then((data) => {
//       setOffers(data);
//       setIsLoading(false);
//     });
// }, []);
//
// <LoadingWrapper isLoading={isLoading} loadingText="Loading offers…">
//   {offers.length === 0 ? (
//     <EmptyState
//       icon={CheckCheck}
//       title="No offers yet"
//       description="When an employer picks you from a job's match list, the offer lands here. You can chat back and accept once the price feels right."
//     />
//   ) : (
//     offers.map((offer) => <OfferCard key={offer.id} {...offer} />)
//   )}
// </LoadingWrapper>
// ---------------------------------------------------------------------
