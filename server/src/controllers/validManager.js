const jwt = require("jsonwebtoken");

function validateManager(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access forbidden: no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "manager" && decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access forbidden: you are not a manager" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Access forbidden: invalid token" });
  }
}

module.exports = validateManager;
