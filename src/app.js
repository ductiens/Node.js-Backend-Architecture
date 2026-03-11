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

export default app;
