import parsejobinfo from "../services/parsejobinfo.service.js";

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

export { parsejob };
