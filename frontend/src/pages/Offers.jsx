import { useState } from "react";
import { CheckCheck } from "lucide-react";
import AppShell from "../components/AppShell.jsx";
import SectionHeader from "../components/Sectionheader";
import OfferCard from "../components/Offercard";
import EmptyState from "../components/EmptyState";

export default function Offers() {
  // no API yet — hardcode these for now, swap for real state + fetch later
  const [isLoading] = useState(false);
  const [offers] = useState([]);

  return (
    <AppShell>
      <SectionHeader
        eyebrow="OFFERS · INBOX"
        leadText="Read the offer."
        emphasisText="Counter it."
        trailText="Then accept."
        description="When an employer picks you, the offer lands here. Chat in your language, push back on the price, and accept when it's right. Escrow provisions the moment you say yes."
      />

      <OfferCard isLoading={isLoading} loadingText="Loading offers…">
        {offers.length === 0 ? (
          <EmptyState
            icon={CheckCheck}
            title="No offers yet"
            description="When an employer picks you from a job's match list, the offer lands here. You can chat back and accept once the price feels right."
          />
        ) : (
          offers.map((offer) => (
            <div key={offer.id}>{/* real offer content goes here */}</div>
          ))
        )}
      </OfferCard>
    </AppShell>
  );
}
