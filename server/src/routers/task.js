const express = require("express");
const {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  assignTask,
} = require("../controllers/task");

const router = express.Router();

router.route("/").get(getAllTask).post(createTask);

router.route("/assign/manager").post(assignTask);

router.route("/assign/admin").post(assignTask);

router.route("/:taskid").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
