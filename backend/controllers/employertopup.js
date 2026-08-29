import { topup } from "../services/topupemployer.service.js";

const topupemployer = async (req, res) => {
  const { employerId, amount } = req.body;
  try {
    await topup(employerId, amount);
    res.status(200).json({
      success: true,
      message: "Employer balance updated sucessfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default topupemployer;
