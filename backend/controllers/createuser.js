// controllers/createuser.js
import createUserService from "../services/createuser.service.js";

const createuser = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    res
      .status(200)
      .json({ success: true, message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export default createuser;
