const express = require("express");
const app = express();
const cors = require('cors');
const cookiesMiddleware = require('universal-cookie-express');
const usersRouter = require("./users/users.router");

app.use(express.json());
app.use(cors());
app.use(cookiesMiddleware())

app.use("/users", usersRouter);

app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;