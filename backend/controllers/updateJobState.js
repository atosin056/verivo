import { updateJobState } from "../services/updateJobsState.service.js";
export default async function updateJobStateController(req, res) {
  try {
    const jobId = req.params.id;
    const { status, rating, employerId } = req.body;

    if (!status) {
      return res.status(400).json({ error: "status is required" });
    }
    if (!employerId) {
      return res.status(400).json({ error: "employerId is required" });
    }

    const result = await updateJobState({
      jobId,
      employerId,
      status,
      rating: rating ?? null,
    });

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Job not found or not owned by this employer" });
    }

    return res.status(200).json({
      success: true,
      jobId,
      status,
      rating: status === "complete" ? rating : null,
    });
  } catch (err) {
    const code = err.statusCode || 500;
    return res
      .status(code)
      .json({ error: err.message || "Failed to update job state" });
  }
}
