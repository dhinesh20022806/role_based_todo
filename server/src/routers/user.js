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
  updateUser,
  deleteUser,
  deleteAdmin,
  deleteManager,
  updateAdmin,
  updateManagerByAdmin,
  updateUserByAdmin,
  updateManager,
  updateUserByManager,
} = require("../controllers/user");
const { authenticateJWT } = require("../controllers/authController");
const validateAdmin = require("../controllers/validAdmin");
const validateManager = require("../controllers/validManager");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router
  .route("/:userid")
  .get(authenticateJWT, getUser)
  .put(authenticateJWT, updateUser)
  .delete(authenticateJWT, deleteUser);

router.get("/", authenticateJWT, validateAdmin, getAllUser);
router
  .get("/admins", authenticateJWT, validateAdmin, getAllAdmin)
  .put(authenticateJWT, validateAdmin, updateUserByAdmin)
  .put(authenticateJWT, validateAdmin, updateManagerByAdmin);

router
  .route("/admins/:adminid")
  .get(authenticateJWT, validateAdmin, getAdmin)
  .put(authenticateJWT, validateAdmin, updateAdmin)
  .delete(authenticateJWT, validateAdmin, deleteAdmin);

router.get("/managers", getAllManager);
router
  .route("/managers/:managerid")
  .get(authenticateJWT, validateManager, getManager)
  .put(authenticateJWT, validateManager, updateManager)
  .delete(authenticateJWT, validateManager, deleteManager)
  .put(authenticateJWT, validateManager, updateUserByManager);

module.exports = router;
