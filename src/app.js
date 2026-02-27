import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { checkOverload } from "./src/utils/overload.js";

const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
import "./src/config/database.js";
checkOverload();

// init routes

// handling errors

export default app;
