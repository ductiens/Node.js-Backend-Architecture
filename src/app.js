import compression from "compression"; //  nén dữ liệu response (giảm băng thông)
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet"; // bảo vệ bảo mật (thêm HTTP headers an toàn)
import morgan from "morgan"; // ghi log mọi request đến server
import { checkOverload } from "./helpers/check.connect.js";

dotenv.config();

const app = express();

// init middlewares
app.use(morgan("dev")); // log request ra terminal
app.use(helmet()); // tăng bảo mật HTTP
app.use(compression()); // nén response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init db
import "./dbs/init.mongodb.js";
checkOverload();

// init routes
import indexRouter from "./routes/index.js";
app.use("/", indexRouter);

// handling errors
// xử lý route không tồn tại
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// middleware xử lý lỗi
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;

  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

export default app;
