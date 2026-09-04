import fetchoffersservice from "../services/fetchoffers.service.js";
const fetchoffers = async (req, res) => {
  const { userId } = req.body;

  try {
    //make request to the service
    const data = await fetchoffersservice(userId);
    res.status(200).json({
      success: true,
      message: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default fetchoffers;
