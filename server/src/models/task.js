const pool = require("../dbConfig");

exports.modelGetAllTask = async (username) => {
  try {
    const rows = await pool.query(
      "SELECT * FROM tasks WHERE assiged_user = ? ",
      [username]
    );

    return rows[0];
  } catch (error) {
    return { message: error.message };
  }
};

exports.modelGetTask = async (username, taskId) => {
  try {
    const rows = await pool.query(
      "SELECT * FROM tasks WHERE id = ? AND assigned_user = ?",
      [taskId, username]
    );
    return rows;
  } catch (error) {
    return { message: error.message };
  }
};

exports.modelNewTask = async (
  title,
  description,
  assigned_user,
  assigned_by,
  role
) => {
  try {
    console.log(description);
    const rows = await pool.query(
      "INSERT INTO  tasks(title, description, status, assigned_user, assigned_by) VALUES (?, ?, ?, ?, ?) RETURNING * ",
      [title, description, "todo", assigned_user, `${assigned_by}-${role}`]
    );

    return rows;
  } catch (error) {
    return { message: error.message };
  }
};

exports.modelUpdateTask = async (title, description, status, taskid) => {
  try {
    console.log(taskid);
    await pool.query(
      "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? ",
      [title, description, status, taskid]
    );

    const rows = await pool.query("SELECT * FROM tasks WHERE id = ?", [taskid]);

    return rows;
  } catch (error) {
    return { message: error.message };
  }
};

exports.modelDeleteTask = async (taskid) => {
  try {
    const rows = await pool.query("DELETE FROM tasks WHERE id = ? ", [taskid]);
    console.log(rows);

    if (rows[0].affectedRows === 1) {
      return rows;
    }
  } catch (error) {
    return { message: error.message };
  }
};
