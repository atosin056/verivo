// controllers/createuser.js
import createUserService from "../services/createuser.service.js";
import jwt from "jsonwebtoken";

const createuser = async (req, res) => {
  try {
    const userId = await createUserService(req.body);
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .json({
        success: true,
        message: "User created successfully",
        token,
        userId,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export default createuser;
