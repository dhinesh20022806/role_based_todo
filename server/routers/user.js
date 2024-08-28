const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  getAllUser,
  getAdmin,
  getAllManager,
  getManager,
  getAllAdmin,
} = require("../controllers/user");
const authenticateJWT = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.route("/:userid").get(authenticateJWT, getUser).put(authenticateJWT);
router.get("/", getAllUser);
router.get("/admins", getAllAdmin);
router.get("/admins/:adminid", getAdmin);

router.get("/managers", getAllManager);
router.get("/managers/:managerid", getManager);

module.exports = router;
