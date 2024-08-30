const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("node:fs");
const privateKey = fs.readFileSync("private.key");
console.log(privateKey);
console.log("hello, world");

const {
  modelRegister,
  modelLogin,
  modelAllUser,
  modelUser,
  modelAllManager,
  modelAdmin,
  modelAllAdmin,
  modelDeleteUser,
  modelDeleteManager,
  modelDeleteAdmin,
  modelUserByAdmin,
  modelUpdateUser,
} = require("../models/user");
const { loginJWTUser } = require("./authController");

const saltRounds = 10;

exports.registerUser = async (req, res) => {
  const { username, password: PlaintextPassword, email } = req.body;

  console.log(username, req.body);

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(PlaintextPassword, salt);

  const userSaved = await modelRegister(username, hash, email);

  console.log(userSaved);
  console.log(userSaved[0]);

  if (userSaved?.length > 0) {
    console.log(userSaved[0].username);
    let token = loginJWTUser(
      userSaved[0].username,
      userSaved[0].role,
      userSaved[0].id
    );
    res.json(token);
  } else {
    res.json(userSaved?.message);
  }
};

exports.loginUser = async (req, res) => {
  const { username, password: PlaintextPassword } = req.body;
  console.log(username, PlaintextPassword);

  const user_data = await modelLogin(username);
  console.log(user_data, "40");

  console.log(user_data[0].password, "datas");
  const is_valid = bcrypt.compareSync(PlaintextPassword, user_data[0].password);

  if (is_valid) {
    let token = loginJWTUser(
      user_data[0].username,
      user_data[0].role,
      user_data[0].id
    );
    res.json(token);
  } else {
    res.json("Login Error occured!");
  }
};

exports.getUser = async (req, res) => {
  console.log(req.headers);
  const user_id = req.params.userid;

  const user_data = await modelUser(user_id);

  res.status(200).json(user_data[0]);
};

exports.getAllUser = async (req, res) => {
  const user_data = await modelAllUser();

  res.status(200).json(user_data);
};

exports.getAllManager = async (req, res) => {
  const user_data = await modelAllManager();

  res.status(200).json(user_data);
};

exports.getManager = async (req, res) => {
  const manager_id = req.params.managerid;
  const user_data = await modelManager(manager_id);

  res.status(200).json(user_data);
};

exports.getAllAdmin = async (req, res) => {
  const user_data = await modelAllAdmin();

  res.status(200).json(user_data);
};

exports.getAdmin = async (req, res) => {
  const admin_id = req.params.adminid;
  const user_data = await modelAdmin(admin_id);

  res.status(200).json(user_data);
};
exports.updateUserByAdmin = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  console.log("fired......");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const { role, username } = req.body;

  const is_update = await modelUserByAdmin(username, role);

  if (is_update) {
    res.status(200).json({
      data: "successfully updated",
    });
  } else {
    res.status(400).json({
      data: "failure",
    });
  }
};

exports.updateUser = async (req, res) => {
  const user_id = req.params.userid;
  const { username } = req.body;
  const is_updated = await modelUpdateUser(user_id, username);

  if (is_updated) {
    res.status(200).json({
      data: "successfully updated",
    });
  } else {
    res.status(400).json({
      data: "failure",
    });
  }
};

exports.updateManager = async (req, res) => {
  const manager_id = req.params.managerid;
  const { username, eamil } = req.body;
  const is_updated = await modelUpdateManager(manager_id, username, eamil);

  if (is_updated) {
    res.status(200).json({
      data: "successfully updated",
    });
  } else {
    res.status(400).json({
      data: "failure",
    });
  }
};

exports.updateAdmin = async (req, res) => {
  const admin_id = req.params.adminid;
  const { username, eamil, role, is_active } = req.body;
  const is_updated = await modelUpdateAdmin(admin_id, username, eamil);

  if (is_updated) {
    res.status(200).json({
      data: "successfully updated",
    });
  } else {
    res.status(400).json({
      data: "failure",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const user_id = req.params.userid;
  const delete_user = await modelDeleteUser(user_id);

  if (delete_user) {
    res.status(200).json({
      data: "successfully updated",
    });
  } else {
    res.status(400).json({
      data: "failure",
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  const admin_id = req.params.userid;
  const delete_admin = await modelDeleteAdmin(admin_id);

  if (delete_admin) {
    res.status(200).json({
      data: "successfully updated",
    });
  } else {
    res.status(400).json({
      data: "failure",
    });
  }
};

exports.deleteManager = async (req, res) => {
  const manager_id = req.params.userid;
  const delete_id = await modelDeleteManager(manager_id);

  if (delete_id) {
    res.status(200).json({
      data: "successfully updated",
    });
  } else {
    res.status(400).json({
      data: "failure",
    });
  }
};

exports.updateUserByManager = async (req, res) => {
  const { username } = req.query;
  const { is_active } = req.body;
  const manager_id = req.params.managerid;

  const is_update = await modelUpdateUserByManager(
    manager_id,
    username,
    is_active
  );

  if (is_update) {
    res.status(200).json({
      data: "successfully updated",
    });
  } else {
    res.status(400).json({
      data: "failure",
    });
  }
};

exports.updateManagerByAdmin = async (req, res) => {
  const { username } = req.query;
  const { role, is_active } = req.body;
  const admin_id = req.params.adminid;

  const is_update = await modelUpdateManagerByAdmin(
    admin_id,
    username,
    role,
    is_active
  );

  if (is_update) {
    res.status(200).json({
      data: "successfully updated",
    });
  } else {
    res.status(400).json({
      data: "failure",
    });
  }
};
