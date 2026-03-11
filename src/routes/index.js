import express from "express";
import accessRouter from "./access/index.js";

const router = express.Router();

// router.get("", (req, res) => {
//   res.send("Hello, World!");
// });

// .use = gắn router hoặc middleware
// .get = xử lý GET
// .post = xử lý POST
// .put = xử lý PUT
// .delete = xử lý DELETE

router.use("/v1/api", accessRouter);

export default router;
