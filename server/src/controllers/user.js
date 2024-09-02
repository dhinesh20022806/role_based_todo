const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  modelUpdateManager,
} = require("../models/user");
const { loginJWTUser } = require("./../util/authMiddleware");
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
    res.status(201).json({
      status: "success",
      data: {
        token,
      },
    });
  } else {
    res.status(406).json({
      status: "faliure",
      error: userSaved?.message || "Somethin Went Wrong",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password: PlaintextPassword } = req.body;
  console.log(username, PlaintextPassword);

  const user_data = await modelLogin(username);

  if (user_data.length == 0) {
    return res.status(404).json({
      status: "failure",
      data: null,
      error: "username doesn't exist",
    });
  }

  console.log(user_data[0].password, "datas");
  const is_valid = bcrypt.compareSync(PlaintextPassword, user_data[0].password);

  if (is_valid) {
    let token = loginJWTUser(
      user_data[0].username,
      user_data[0].role,
      user_data[0].id
    );
    res.status(200).json({
      status: "success",
      data: {
        token,
      },
    });
  } else {
    res.status(406).json({
      status: "success",
      data: {
        message: "Incorrect message",
      },
    });
  }
};

exports.getUser = async (req, res) => {
  console.log(req.headers);
  const user_id = req.params.userid;

  const user_data = await modelUser(user_id);

  if (user_data.length <= 0) {
    res.status(400).json({
      status: "failure",
      message: null,
      error: {
        message: "Bad Request",
      },
    });
    return;
  }

  const user = {
    name: user_data[0].username,
    email: user_data[0].email,
    role: user_data[0].role,
    is_active: user_data[0].is_active,
  };
  res.status(200).json({
    status: "success",
    message: user,
    error: null,
  });
};

exports.getAllUser = async (req, res) => {
  const user_data = await modelAllUser();

  if (user_data.length <= 0) {
    res.status(400).json({
      status: "failure",
      message: null,
      error: "Bad Request",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    message: {
      users: user_data,
    },
    error: null,
  });
};

exports.getAllManager = async (req, res) => {
  const user_data = await modelAllManager();

  if (user_data.length <= 0) {
    res.status(400).json({
      status: "failure",
      message: null,
      error: "Bad Request",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    message: {
      managers: user_data,
    },
    error: null,
  });
};

exports.getManager = async (req, res) => {
  const manager_id = req.params.managerid;
  const user_data = await modelManager(manager_id);

  res.status(200).json(user_data);
};

exports.getAllAdmin = async (req, res) => {
  const user_data = await modelAllAdmin();

  if (user_data.length <= 0) {
    res.status(400).json({
      status: "failure",
      message: null,
      error: "Bad Request",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    message: {
      admin: user_data,
    },
    error: null,
  });
};

exports.getAdmin = async (req, res) => {
  const admin_id = req.params.adminid;
  const user_data = await modelAdmin(admin_id);

  if (user_data.length <= 0) {
    res.status(400).json({
      status: "failure",
      message: null,
      error: "Bad request",
    });
  }

  const admin = {
    username: user_data[0].usernaem,
    email: user_data[0].email,
    role: user_data[0].role,
    is_active: user_data[0].is_active,
  };

  res.status(200).json({
    status: "success",
    message: {
      admin,
    },
    error: null,
  });
};

exports.updateUserByAdmin = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("fired......");

  const { role, username } = req.body;

  const is_update = await modelUserByAdmin(username, role);

  if (is_update) {
    res.status(204).json({
      status: "success",
      data: "successfully one updated",
      error: null,
    });
  } else {
    res.status(400).json({
      status: "failure",
      data: null,
      error: "bad Request",
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
