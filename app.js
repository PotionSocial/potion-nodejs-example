const createError = require("http-errors");
const express = require("express");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./components/index");
const statusesRouter = require("./components/statuses/routes");
const usersRouter = require("./components/users/routes");

const app = express();
app.locals.moment = require("moment");

// Set view engine setup in ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Create a log file
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a"
});
app.use(logger("combined", { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Declare routes
app.use("/", indexRouter);
app.use("/statuses", statusesRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
