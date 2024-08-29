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
} = require("../controllers/user");
const authenticateJWT = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router
  .route("/:userid")
  .get(authenticateJWT, getUser)
  .put(authenticateJWT, updateUser)
  .delete(authenticateJWT, deleteUser);

router.get("/", getAllUser);
router.get("/admins", getAllAdmin);

router
  .route("/admins/:adminid")
  .get(getAdmin)
  .put(updateAdmin)
  .delete(deleteAdmin)
  .put(updateUserbyAdmin)
  .put(updateManagerByAdmin);

router.get("/managers", getAllManager);
router
  .route("/managers/:managerid")
  .get(getManager)
  .put(updateManager)
  .delete(deleteManager)
  .put(updateUserByManager);

module.exports = router;
