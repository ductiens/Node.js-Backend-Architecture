import compression from "compression";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { checkOverload } from "./helpers/check.connect.js";

dotenv.config();

const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
import "./dbs/init.mongodb.js";
checkOverload();

// init routes

// handling errors

export default app;
