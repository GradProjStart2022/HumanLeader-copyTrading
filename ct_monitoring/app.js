import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import index from "./routes";
import version1Router from "./routes/v1/index";
import getLeaders from "./routes/getleaders";
import monitoring from "./routes/monitoring";

var app = express();
async function monitor() {
  let leaders = await getLeaders();
  leaders.forEach((leader) => {
    setInterval(() => monitoring(leader), 1000);
  });
}

monitor();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", index);
app.use("/v1", version1Router);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  let apiError = err;

  if (!err.status) {
    apiError = createError(err);
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  return res.status(apiError.status).json({ message: apiError.message });
});

// bin/www 를 그대로 사용하기 위해서 예외적으로 commonJs 문법을 적용
module.exports = app;
