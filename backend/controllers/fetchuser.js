import { fetchUserInfo } from "../services/userinfo.service.js";
export const getMe = async (req, res) => {
  try {
    const data = await fetchUserInfo(req.userId);
    res.status(200).json({
      success: true,
      userInfo: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
