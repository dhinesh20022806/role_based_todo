const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  console.log("fired...");
  console.log(req);
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, "secert", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

exports.loginUser = (id, userRole) => {
  // Authenticate user (details omitted)

  const user = { id: userId, role: userRole }; // Assuming you get this from your DB
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

  return token;
};

module.exports = authenticateJWT;
