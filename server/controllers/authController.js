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

module.exports = authenticateJWT;
