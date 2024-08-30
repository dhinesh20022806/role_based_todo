const jwt = require("jsonwebtoken");

const {
  modelGetAllTask,
  modelNewTask,
  modelGetTask,
  modelUpdateTask,
  modelDeleteTask,
} = require("../models/task");

exports.getAllTask = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const username = decoded.username;

  console.log(username);

  const user_tasks = await modelGetAllTask(username);

  console.log(user_tasks, "final");

  console.log(user_tasks.length);

  if (user_tasks.length >= 0) {
    res.status(200).json(user_tasks);
  } else {
    res.status(405).json({
      error: user_tasks.message,
    });
  }
};

exports.getTask = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const taskid = req.params.taskid;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const username = decoded.username;

  const user_tasks = await modelGetTask(username, taskid);

  if (user_tasks.length > 0 && user_tasks[0].length > 0) {
    res.status(200).json({
      status: "success",
      data: {
        rows: user_tasks[0],
      },
      message: "Operation completed Successfully",
    });
  } else {
    res.status(400).json({
      status: "error",
      error: {
        code: 400,
        message: user_tasks.message,
      },
    });
  }
};

exports.createTask = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { title, description } = req.body;
  const username = decoded.username;
  const role = decoded.role;
  const newTask = await modelNewTask(
    title,
    description,
    username,
    username,
    role
  );

  if (newTask.length > 0 && newTask[0].length > 0) {
    res.status(201).json({
      status: "success",
      data: {
        rows: newTask[0],
      },
      message: "Operation completed Successfully",
    });
  } else {
    res.status(400).json({
      status: "error",
      error: {
        code: 400,
        message: newTask.message,
      },
    });
  }
};

exports.updateTask = async (req, res) => {
  const taskid = req.params.taskid;

  console.log(taskid, "id");

  const { title, description, status } = req.body;
  console.log(title, description, status);
  const newTask = await modelUpdateTask(title, description, status, taskid);

  if (newTask.length > 0 && newTask[0].length > 0) {
    res.status(200).json({
      status: "success",
      data: {
        rows: newTask[0],
      },
      message: "Operation completed Successfully",
    });
  } else {
    res.status(400).json({
      status: "error",
      error: {
        code: 400,
        message: newTask.message,
      },
    });
  }
};

exports.deleteTask = async (req, res) => {
  const taskid = req.params.taskid;
  console.log(taskid, "taskid sdlfkdjofij");
  const delete_user_task = await modelDeleteTask(taskid);

  if (delete_user_task) {
    res.status(204).json({
      status: "success",
      data: {
        rows: delete_user_task,
      },
      message: "Operation completed Successfully",
    });
  } else {
    res.status(400).json({
      status: "error",
      error: {
        code: 400,
        message: newTask.message,
      },
    });
  }
};

exports.assignTask = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const username = decoded.username;
  const role = decoded.role;

  const user_username = req.body;

  const newTask = await modelNewTask(
    title,
    description,
    user_username,
    username,
    role
  );

  if (newTask.length > 0 && newTask[0].length > 0) {
    res.status(201).json({
      status: "success",
      data: {
        rows: newTask[0],
      },
      message: "Operation completed Successfully",
    });
  } else {
    res.status(400).json({
      status: "error",
      error: {
        code: 400,
        message: newTask.message,
      },
    });
  }
};
