const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
});

module.exports = connection;
