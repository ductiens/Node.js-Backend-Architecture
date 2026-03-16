import express from "express";
import { asyncHandler } from "../../auth/checkAuth.js";
import { signUp } from "../../controllers/access.controller.js";

const router = express.Router();

/**
 * POST /v1/api/shop/signup
 */
router.post("/shop/signup", asyncHandler(signUp));

/**
 * POST /v1/api/shop/login
 */

export default router;
