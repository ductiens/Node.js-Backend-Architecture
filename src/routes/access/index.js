import express from "express";
import { signUp } from "../../controllers/access.controller.js";

const router = express.Router();

/**
 * POST /v1/api/shop/signup
 */
router.post("/shop/signup", signUp);

/**
 * POST /v1/api/shop/login
 */
router.post("/shop/login", (req, res) => {
  res.status(200).json({
    message: "Login success",
  });
});

export default router;
