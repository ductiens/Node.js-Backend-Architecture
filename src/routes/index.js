import express from "express";
import { apiKey, permission } from "../auth/checkAuth.js";
import accessRouter from "./access/index.js";

const router = express.Router();

// .use = gắn router hoặc middleware
// .get = xử lý GET
// .post = xử lý POST
// .put = xử lý PUT
// .delete = xử lý DELETE

// check apiKey
router.use(apiKey);

// check permission
router.use(permission("0000"));

router.use("/v1/api", accessRouter);

export default router;
