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
const validateAdmin = require("../controllers/validAdmin");
const { authenticateJWT } = require("./../util/authMiddleware");
const validateManager = require("../controllers/validManager");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.use(authenticateJWT);
router.get("/admins", validateAdmin, getAllAdmin);

router.route("/admins/update/users").put(validateAdmin, updateUserByAdmin);
router.route("/admins/update/manager").put(validateAdmin, updateManagerByAdmin);
router.get("/managers", getAllManager);

router.get("/", validateAdmin, getAllUser);

router
  .route("/admins/:adminid")
  .get(validateAdmin, getAdmin)
  .put(validateAdmin, updateAdmin)
  .delete(validateAdmin, deleteAdmin);

router
  .route("/managers/:managerid")
  .get(validateManager, getManager)
  .put(validateManager, updateManager)
  .delete(validateManager, deleteManager)
  .put(validateManager, updateUserByManager);

router.route("/:userid").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
