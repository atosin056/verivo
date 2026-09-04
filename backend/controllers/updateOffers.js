import updateOfferStatusService from "../services/updateoffers.service.js";

const updateOfferStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "status is required" });
  }

  try {
    const result = await updateOfferStatusService(id, status);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Offer not found" });
    }

    return res.json({ message: "ok" });
  } catch (err) {
    if (err.message?.startsWith("Unsupported status")) {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: "Failed to update offer status" });
  }
};

export default updateOfferStatus;
