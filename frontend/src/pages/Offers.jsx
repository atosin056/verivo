// Offers.jsx
import { useEffect, useState } from "react";
import AppShell from "../components/AppShell.jsx";
import SectionHeader from "../components/Sectionheader";
import OfferPoolTable from "../components/OffersPoolTable";
import EmptyState from "../components/Emptystate.jsx";
import { CheckCheck } from "lucide-react";
import axios from "axios";
import { useUserData } from "../UserDataContext.js";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userData = useUserData();
  const baseUrl =
    import.meta.env.VITE_BASE_URL || "https://verivo.onrender.com";

  useEffect(() => {
    const checkOffers = async (userId) => {
      try {
        setIsLoading(true);
        const response = await axios.post(`${baseUrl}/api/fetchoffers`, {
          userId,
        });
        setOffers(response.data.message);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userData?.user?.id) {
      checkOffers(userData.user.id);
    }
  }, [userData?.user?.id, baseUrl]);

  const handleAccept = async (offer) => {
    try {
      await axios.patch(`${baseUrl}/api/offers/${offer.id}`, {
        status: "accepted",
      });
      setOffers((prev) =>
        prev.map((o) => (o.id === offer.id ? { ...o, status: "assigned" } : o)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (offer) => {
    try {
      await axios.patch(`${baseUrl}/api/offers/${offer.id}`, {
        status: "rejected",
      });
      setOffers((prev) =>
        prev.map((o) => (o.id === offer.id ? { ...o, status: "rejected" } : o)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppShell>
      <SectionHeader
        eyebrow="OFFERS · INBOX"
        leadText="Read the offer."
        emphasisText="Counter it."
        trailText="Then accept."
        description="When an employer picks you, the offer lands here. Chat in your language, push back on the price, and accept when it's right. Escrow provisions the moment you say yes."
      />

      {offers.length === 0 && !isLoading ? (
        <EmptyState
          icon={CheckCheck}
          title="No offers yet"
          description="When an employer picks you from a job's match list, the offer lands here. You can chat back and accept once the price feels right."
        />
      ) : (
        <OfferPoolTable
          offers={offers}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </AppShell>
  );
}
