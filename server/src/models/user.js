const pool = require("../dbConfig");

exports.modelRegister = async (username, hashPassword, email) => {
  try {
    const rows = await pool.query(
      'INSERT INTO users (username, password, email, role ) VALUES( ?, ?, ?, "user") RETURNING *',
      [username, hashPassword, email]
    );

    return rows[0];
  } catch (error) {
    return { message: error.message };
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
      "SELECT id, username, email, role, is_active FROM users WHERE role= 'user';"
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

exports.modelMangerUser = async (manager_id) => {
  try {
    const rows = await pool.query(
      "SELECT id, username, email, role, is_active FROM users WHERE role= 'user' and id= ?;",
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
      "SELECT id, username, email, role, is_active FROM users WHERE role='manager';"
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

exports.modelAllAdmin = async () => {
  try {
    const rows = await pool.query(
      "SELECT id, username, email, role, is_active FROM users WHERE role='admin';"
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

exports.modelAdmin = async (admin_id) => {
  try {
    const rows = await pool.query(
      "SELECT id, username, email, role, is_active FROM users WHERE role='admin' and id= ?;",
      [admin_id]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

exports.modelUpdateUser = async (user_id, username) => {
  try {
    const rows = await pool.query(
      "UPDATE  users SET username = ?  WHERE role='user' and id= ? ",
      [username, user_id]
    );
    if (rows[0].affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
exports.modelUpdateAdmin = async (
  admin_id,
  username,
  eamil,
  role,
  is_active
) => {
  try {
    const rows = await pool.query(
      "UPDATE  users SET username = ? , eamil = ?, role = ?, is_active = ? WHERE role='admin' and id= ? ",
      [username, eamil, role, is_active, admin_id]
    );
    if (rows[0].affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.modelUpdateManager = async (manager_id, username, eamil) => {
  try {
    const rows = await pool.query(
      "UPDATE  users SET username = ? , eamil = ? WHERE role='manager' and id= ? ",
      [username, eamil, manager_id]
    );
    if (rows[0].affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.modelDeleteUser = async (user_id) => {
  try {
    const rows = await pool.query("DELETE FROM TABLE users WHERE id = ?", [
      user_id,
    ]);
    if (rows[0].affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.modelDeleteAdmin = async (admin_id) => {
  try {
    const rows = await pool.query(
      "DELETE FROM  users WHERE  role='admin' and id = ?",
      [admin_id]
    );
    if (rows[0].affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.modelDeleteManager = async (manager_id) => {
  try {
    const rows = await pool.query(
      "DELETE FROM TABLE users WHERE  role='manager' and id = ?",
      [manager_id]
    );
    if (rows[0].affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.modelUserByManager = async (manager_id, username, is_active) => {
  try {
    const rows = await pool.query(
      "UPDATE users SET is_active = ? WHERE username = ?",
      [is_active, username]
    );
    if (rows[0].affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.modelUserByAdmin = async (username, role) => {
  try {
    const rows = await pool.query(
      "UPDATE users SET role = ? WHERE   username = ?",
      [role, username]
    );
    if (rows[0].affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.modelManagerByAdmin = async (admin_id, username, role, is_active) => {
  try {
    const rows = await pool.query(
      "UPDATE users SET role = ?, is_active = ? WHERE role='manager' and  username = ?",
      [role, is_active, username]
    );
    if (rows[0].affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
