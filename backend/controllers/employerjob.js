import parsejobinfo from "../services/parsejobinfo.service.js";
import postjobservice from "../services/postjob.service.js";
import deductBalanceService from "../services/deductbalance.service.js";
import fetchjobsservice from "../services/fetchjobs.service.js";
import fetchcandidateservice from "../services/fetchcandidates.service.js";
import fetchcandidatedataservice from "../services/fetchuserdata.service.js";
import assignJobService from "../services/assignjob.service.js";

//parse job controller
const parsejob = async (req, res) => {
  const { data } = req.body;
  try {
    //make a request to the parsejobinfo service
    const response = await parsejobinfo(data);
    res.status(200).json({
      success: true,
      message: response,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const postjob = async (req, res) => {
  const { title, location, budget, state, deadline, description, employerId } =
    req.body;
  try {
    await Promise.all([
      postjobservice({
        title,
        location,
        budget,
        state,
        deadline,
        description,
        employerId,
      }),
      deductBalanceService(employerId, budget),
    ]);
    res.status(200).json({
      success: true,
      message: "Job Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const fetchJobs = async (req, res) => {
  const { employerId } = req.query;
  try {
    const jobs = await fetchjobsservice(employerId);
    if (jobs.length === 0) {
      res.status(404).json({
        success: false,
        message: "No jobs found for this employer",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//fetch candidates controller
const fetchcandidates = async (req, res) => {
  try {
    const candidates = await fetchcandidateservice();
    res.status(200).json({
      success: true,
      data: candidates,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const fetchcandidatesdata = async (req, res) => {
  const { userId } = req.query;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const candidate = await fetchcandidatedataservice(userId);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const assignJob = async (req, res) => {
  const { jobId, workerId } = req.body;
  try {
    if (!jobId || !workerId) {
      return res.status(400).json({
        success: false,
        message: "jobId and workerId are required",
      });
    }

    const assigned = await assignJobService(jobId, workerId);

    if (!assigned) {
      return res.status(409).json({
        success: false,
        message: "Job could not be assigned — it may already have a worker",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job assigned successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export {
  parsejob,
  postjob,
  fetchJobs,
  fetchcandidates,
  fetchcandidatesdata,
  assignJob,
};
