const { createPool } = require("mysql2/promise");
require("dotenv").config();

const pool = createPool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
});

// const pool = createPool({
//   host: "localhost",
//   port: 3306,
//   database: "emayam_role_based_todo",
//   user: "root",
//   password: "13dhinesh(2002)",
// });

module.exports = pool;
