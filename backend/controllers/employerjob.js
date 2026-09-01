import parsejobinfo from "../services/parsejobinfo.service.js";
import postjobservice from "../services/postjob.service.js";
import deductBalanceService from "../services/deductbalance.service.js";
import fetchjobsservice from "../services/fetchjobs.service.js";

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

export { parsejob, postjob, fetchJobs };
