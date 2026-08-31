import parsejobinfo from "../services/parsejobinfo.service.js";
import postjobservice from "../services/postjob.service.js";

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
    await postjobservice({
      title,
      location,
      budget,
      state,
      deadline,
      description,
      employerId,
    });

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

export { parsejob, postjob };
