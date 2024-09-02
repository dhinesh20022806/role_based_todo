const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err.stack);
//     return;
//   }
//   console.log("Connected to the database as id " + connection.threadId);
// });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use(helmet());

app.disable("x-powerd-by");

app.use(
  helmet({
    xPoweredBy: false,
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    exposedHeaders: ["Authorization"],
    credentials: true,
  })
);

app.use(logger("dev"));

// Routers
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = { app };
