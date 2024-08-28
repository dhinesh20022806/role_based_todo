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
} = require("../models/user");

const saltRounds = 10;

exports.registerUser = async (req, res) => {
  const { username, password: PlaintextPassword } = req.body;

  console.log(username, req.body);

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(PlaintextPassword, salt);

  const userSaved = await modelRegister(username, hash);
  console.log(userSaved, "userSaved");
  if (userSaved) {
    console.log("User registered successfully.");
  } else {
    console.log("User registration failed.");
  }
  if (userSaved) {
    let token = jwt.sign({ data: username }, "secert", { expiresIn: "1h" });
    console.log("ok");
    res.json(token);
  } else {
    res.json("Error occured !");
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
    let token = jwt.sign({ data: user_data[0].username }, "secert", {
      expiresIn: "1h",
    });
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

exports.updateUser = async (req, res) => {
  const user_id = req.params.userid;
  const { username, eamil, role, is_active } = req.body;
  const is_updated = await modelUpdateUser(
    user_id,
    username,
    eamil,
    role,
    is_active
  );

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
