import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db

// init routes

// handling errors

export default app;
