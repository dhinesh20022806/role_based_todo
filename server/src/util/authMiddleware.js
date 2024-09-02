const jwt = require("jsonwebtoken");

exports.authenticateJWT = (req, res, next) => {
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

exports.loginJWTUser = (username, userRole, id) => {
  const user = { username, role: userRole, id };
  console.log(user);
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });

  return token;
};
