import React, { useState } from "react";
import axios from "axios";

/**
 * OfferPoolTable
 * Worker-side view of incoming offers — matches WorkerPoolTable styling.
 *
 * Usage:
 * <OfferPoolTable
 *   offers={[
 *     { id, title, location, description, budget, state, employer_id, employer_name, employer_phone, assigned_worker_id, deadline, created_at, updated_at, status },
 *     ...
 *   ]}
 *   // offer.status is one of: pending | assigned | rejected
 *   // Accept/Reject PATCH /api/offers/:id internally (VITE_BASE_URL).
 *   // onAccept/onReject fire only after the request succeeds — use them
 *   // to sync the offer's status in parent-level state.
 *   onViewFull={(offer) => openOfferModal(offer)}
 *   onAccept={(offer) => syncOfferInList(offer.id, "assigned")}
 *   onReject={(offer) => syncOfferInList(offer.id, "pending")}
 * />
 */
export default function OfferPoolTable({
  offers = [],
  onViewFull,
  onAccept,
  onReject,
}) {
  const [activeOffer, setActiveOffer] = useState(null);
  const [acceptedOffer, setAcceptedOffer] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorId, setErrorId] = useState(null);

  const baseUrl =
    import.meta.env.VITE_BASE_URL || "https://verivo.onrender.com";

  const handleViewFull = (offer) => {
    setActiveOffer(offer);
    onViewFull?.(offer);
  };

  const handleAccept = async (offer) => {
    setUpdatingId(offer.id);
    setErrorId(null);
    try {
      await axios.patch(`${baseUrl}/api/offers/${offer.id}`, {
        status: "accepted",
      });
      onAccept?.(offer);
      setAcceptedOffer(offer);
      setActiveOffer(null);
    } catch (err) {
      console.error(err);
      setErrorId(offer.id);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleReject = async (offer) => {
    setUpdatingId(offer.id);
    setErrorId(null);
    try {
      await axios.patch(`${baseUrl}/api/offers/${offer.id}`, {
        status: "rejected",
      });
      onReject?.(offer);
      setActiveOffer(null);
    } catch (err) {
      console.error(err);
      setErrorId(offer.id);
    } finally {
      setUpdatingId(null);
    }
  };

  const buildWhatsappLink = (phone, offer) => {
    if (!phone) return null;
    // strip everything but digits, then normalise Nigerian numbers to 234...
    let digits = phone.replace(/\D/g, "");
    if (digits.startsWith("0")) digits = "234" + digits.slice(1);
    if (!digits.startsWith("234")) digits = "234" + digits;
    const text = encodeURIComponent(
      `Hi ${offer.employer_name || ""}, I've accepted your offer for "${
        offer.title
      }" on Verivo. Let's sort out the details.`,
    );
    return `https://wa.me/${digits}?text=${text}`;
  };

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <div>
          {/* <h2 style={styles.heading}>Your offers</h2>
          <p style={styles.subtext}>
            Employers who picked you from a job's match list land here. Read the
            full text, then accept or reject.
          </p> */}
        </div>
      </div>

      <div style={styles.tableHead}>
        <span style={{ ...styles.colLabel, flex: 2.2 }}>EMPLOYER</span>
        <span style={{ ...styles.colLabel, flex: 2 }}>JOB</span>
        <span style={{ ...styles.colLabel, flex: 1 }}>BUDGET</span>
        <span style={{ ...styles.colLabel, flex: 1 }}>STATUS</span>
        <span style={{ ...styles.colLabel, flex: 2, textAlign: "right" }}>
          ACTION
        </span>
      </div>

      <div>
        {offers.map((offer) => (
          <div key={offer.id} style={styles.row}>
            <div style={{ ...styles.cell, flex: 2.2 }}>
              <div>
                <div style={styles.name}>{offer.employer_name}</div>
                <div style={styles.location}>{offer.employer_phone}</div>
              </div>
            </div>

            <div
              style={{
                ...styles.cell,
                flex: 2,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={styles.trade}>{offer.title}</span>
              <span style={styles.location}>{offer.location}</span>
            </div>

            <div style={{ ...styles.cell, flex: 1 }}>
              <span style={styles.score}>
                ₦{Number(offer.budget).toLocaleString()}
              </span>
            </div>

            <div style={{ ...styles.cell, flex: 1 }}>
              <span
                style={{
                  ...styles.statusPill,
                  ...(offer.status === "assigned"
                    ? styles.statusAccepted
                    : offer.status === "rejected"
                      ? styles.statusRejected
                      : styles.statusPending),
                }}
              >
                {offer.status}
              </span>
            </div>

            <div
              style={{
                ...styles.cell,
                flex: 2,
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              <button
                style={styles.viewBtn}
                onClick={() => handleViewFull(offer)}
              >
                Full text
              </button>
              <button
                style={styles.acceptBtn}
                disabled={updatingId === offer.id}
                onClick={() => handleAccept(offer)}
              >
                {updatingId === offer.id ? "…" : "Accept"}
              </button>
              <button
                style={styles.rejectBtn}
                disabled={updatingId === offer.id}
                onClick={() => handleReject(offer)}
              >
                {updatingId === offer.id ? "…" : "Reject"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeOffer && (
        <div style={styles.overlay} onClick={() => setActiveOffer(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div>
                <h3 style={styles.modalTitle}>{activeOffer.title}</h3>
                <p style={styles.modalSubtitle}>
                  {activeOffer.employer_name} · {activeOffer.location}
                </p>
              </div>
              <button
                style={styles.closeBtn}
                onClick={() => setActiveOffer(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div style={styles.modalMetaRow}>
              <span style={styles.modalMetaItem}>
                ₦{Number(activeOffer.budget).toLocaleString()}
              </span>
              {activeOffer.deadline && (
                <span style={styles.modalMetaItem}>
                  Due {new Date(activeOffer.deadline).toLocaleDateString()}
                </span>
              )}
              <span
                style={{
                  ...styles.statusPill,
                  ...(activeOffer.status === "assigned"
                    ? styles.statusAccepted
                    : activeOffer.status === "rejected"
                      ? styles.statusRejected
                      : styles.statusPending),
                }}
              >
                {activeOffer.status}
              </span>
            </div>

            <p style={styles.modalDescription}>
              {activeOffer.description || "No description provided."}
            </p>

            <div style={styles.modalActions}>
              <button
                style={styles.acceptBtn}
                disabled={updatingId === activeOffer.id}
                onClick={() => handleAccept(activeOffer)}
              >
                {updatingId === activeOffer.id ? "…" : "Accept"}
              </button>
              <button
                style={styles.rejectBtn}
                disabled={updatingId === activeOffer.id}
                onClick={() => handleReject(activeOffer)}
              >
                {updatingId === activeOffer.id ? "…" : "Reject"}
              </button>
            </div>
            {errorId === activeOffer.id && (
              <p style={styles.errorText}>Something went wrong — try again.</p>
            )}
          </div>
        </div>
      )}

      {acceptedOffer && (
        <div style={styles.overlay} onClick={() => setAcceptedOffer(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div>
                <h3 style={styles.modalTitle}>Offer accepted</h3>
                <p style={styles.modalSubtitle}>
                  {acceptedOffer.title} · {acceptedOffer.employer_name}
                </p>
              </div>
              <button
                style={styles.closeBtn}
                onClick={() => setAcceptedOffer(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p style={styles.modalDescription}>
              Escrow's provisioned. Chat with{" "}
              {acceptedOffer.employer_name || "the employer"} on WhatsApp to
              sort logistics — start time, location, anything else you need to
              confirm before you show up.
            </p>

            {buildWhatsappLink(acceptedOffer.employer_phone, acceptedOffer) ? (
              <a
                href={buildWhatsappLink(
                  acceptedOffer.employer_phone,
                  acceptedOffer,
                )}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.whatsappBtn}
              >
                Message on WhatsApp
              </a>
            ) : (
              <p style={styles.modalMetaItem}>
                No phone number on file for this employer yet.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
    gap: "24px",
  },
  heading: {
    fontFamily: "Fraunces",
    letterSpacing: "-0.025em",
    fontSize: "32px",
    fontWeight: 400,
    margin: "0 0 8px 0",
    color: "#14110f",
  },
  subtext: {
    fontSize: "13.5px",
    color: "#6b6055",
    margin: 0,
    fontFamily: "Instrument Sans",
    maxWidth: "560px",
    lineHeight: 1.5,
  },
  tableHead: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    border: "1px solid #d6cdb8",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
  colLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.18em",
    color: "#6b6055",
  },
  row: {
    display: "flex",
    alignItems: "center",
    padding: "16px 15px",
    borderBottom: "1px solid #d6cdb8",
    borderLeft: "1px solid #d6cdb8",
    borderRight: "1px solid #d6cdb8",
  },
  cell: {
    display: "flex",
    alignItems: "center",
  },
  name: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1a1a1a",
    fontFamily: "Instrument Sans",
  },
  location: {
    fontSize: "12px",
    color: "#6b6055",
    marginTop: 4,
    fontFamily: "Instrument Sans",
  },
  score: {
    fontFamily: "Fraunces",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: 1,
    color: "#0f3d2e",
  },
  trade: {
    fontSize: "13px",
    fontFamily: "Instrument Sans",
    color: "#2a2521",
  },
  statusPill: {
    fontFamily: "Instrument Sans",
    fontSize: "12px",
    fontWeight: 500,
    padding: "4px 12px",
    borderRadius: "999px",
    textTransform: "capitalize",
  },
  statusPending: {
    background: "#f2e6c9",
    color: "#7a5a10",
  },
  statusAccepted: {
    background: "#dcecdf",
    color: "#0f3d2e",
  },
  statusRejected: {
    background: "#f3dcdc",
    color: "#7a1f1f",
  },
  viewBtn: {
    background: "transparent",
    border: "1px solid #c9c1ae",
    borderRadius: "999px",
    padding: "8px 14px",
    fontFamily: "Instrument Sans",
    fontSize: "13px",
    color: "#2a2521",
    cursor: "pointer",
  },
  acceptBtn: {
    background: "#181614",
    border: "none",
    borderRadius: "999px",
    padding: "8px 16px",
    fontFamily: "Instrument Sans",
    fontSize: "13px",
    color: "#f5f2ec",
    cursor: "pointer",
  },
  rejectBtn: {
    background: "transparent",
    border: "1px solid #d6a8a8",
    borderRadius: "999px",
    padding: "8px 16px",
    fontFamily: "Instrument Sans",
    fontSize: "13px",
    color: "#7a1f1f",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(20, 17, 15, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: "24px",
  },
  modal: {
    background: "#f5f2ec",
    border: "1px solid #d6cdb8",
    borderRadius: "20px",
    padding: "28px",
    maxWidth: "520px",
    width: "100%",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "16px",
  },
  modalTitle: {
    fontFamily: "Fraunces",
    fontSize: "24px",
    fontWeight: 400,
    color: "#14110f",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  modalSubtitle: {
    fontFamily: "Instrument Sans",
    fontSize: "13px",
    color: "#6b6055",
    margin: "6px 0 0 0",
  },
  closeBtn: {
    background: "transparent",
    border: "1px solid #c9c1ae",
    borderRadius: "999px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    color: "#2a2521",
    cursor: "pointer",
    flexShrink: 0,
  },
  modalMetaRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
    flexWrap: "wrap",
  },
  modalMetaItem: {
    fontFamily: "Instrument Sans",
    fontSize: "13px",
    color: "#2a2521",
  },
  modalDescription: {
    fontFamily: "Instrument Sans",
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#2a2521",
    whiteSpace: "pre-wrap",
    marginBottom: "24px",
  },
  modalActions: {
    display: "flex",
    gap: "10px",
  },
  errorText: {
    fontFamily: "Instrument Sans",
    fontSize: "12px",
    color: "#7a1f1f",
    marginTop: "10px",
  },
  whatsappBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#25D366",
    border: "none",
    borderRadius: "999px",
    padding: "10px 20px",
    fontFamily: "Instrument Sans",
    fontSize: "13px",
    fontWeight: 500,
    color: "#0f3d24",
    cursor: "pointer",
    textDecoration: "none",
  },
};
