const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

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

app.use(logger("tiny"));

app.get("/test", (req, res) => {
  res.send("<h1>Hi</h1>");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
