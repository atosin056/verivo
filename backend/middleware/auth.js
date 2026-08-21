import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ success: false, message: "valid Bearer token required" });
  }

  const token = authHeader.slice("Bearer ".length).trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const accountId = decoded.userId ?? decoded.employerId;
    const accountType =
      decoded.accountType ?? (decoded.employerId ? "employer" : "worker");

    if (!accountId) {
      return res
        .status(401)
        .json({ success: false, message: "token has no account id" });
    }

    req.auth = {
      id: accountId,
      type: accountType,
    };

    // Keep existing worker controllers compatible during the migration.
    if (accountType === "worker") {
      req.userId = accountId;
    }

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "invalid or expired token" });
  }
};

export default requireAuth;
