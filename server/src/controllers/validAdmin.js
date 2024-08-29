const jwt = require("jsonwebtoken");

function validateAdmin(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access forbidden: no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access forbidden: you are not an admin" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Access forbidden: invalid token" });
  }
}

module.exports = validateAdmin;
