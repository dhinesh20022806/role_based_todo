const pool = require("../dbConfig");

exports.modelRegister = async (username, hashPassword) => {
  try {
    const saved = await pool.query(
      'INSERT INTO users (username, password, role ) VALUES( ?, ?, "user")',
      [username, hashPassword]
    );
    console.log(saved);

    if (saved[0].affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.modelLogin = async (username) => {
  try {
    const rows = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }

  //   return "received";
};

exports.modelUser = async (userId) => {
  try {
    const rows = await pool.query("SELECT * FROM users WHERE id = ? ", [
      userId,
    ]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

exports.modelAllUser = async () => {
  try {
    const rows = await pool.query(
      "SELECT id, username, email, role, is_active FROM users WHERE role= user;"
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

exports.modelUser = async (manager_id) => {
  try {
    const rows = await pool.query(
      "SELECT id, username, email, role, is_active FROM users WHERE role= user and id= ?;",
      [manager_id]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

exports.modelAllManager = async () => {
  try {
    const rows = await pool.query(
      "SELECT id, username, email, role, is_active FROM users WHERE role=manager;"
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

exports.modelAllAdmin = async () => {
  try {
    const rows = await pool.query(
      "SELECT id, username, email, role, is_active FROM users WHERE role=admin;"
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

exports.modelAdmin = async (admin_id) => {
  try {
    const rows = await pool.query(
      "SELECT id, username, email, role, is_active FROM users WHERE role=admin and id= ?;",
      [admin_id]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

exports.modelUpdateUser = async (user_id, username, eamil, role, is_active) => {
  try {
    const rows = await pool.query(
      "UPDATE  users SET username = ? , eamil = ? , role = ? , is_active = ? ",
      [username, eamil, role, is_active]
    );
    if (rows[0].affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
