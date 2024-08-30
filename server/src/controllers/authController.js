const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  console.log("fired...");
  console.log(req);
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

const loginJWTUser = (username, userRole, id) => {
  // Authenticate user (details omitted)

  const user = { username, role: userRole, id }; // Assuming you get this from your DB
  console.log(user);
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });

  return token;
};

module.exports = { authenticateJWT, loginJWTUser };
