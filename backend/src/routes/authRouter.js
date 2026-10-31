import express from "express";
import {
  validateLogin,
  validateRegister,
  validateToken,
} from "../middlewares/authValidation.js";
import { doLogin, doRegister, getMe } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", validateLogin, doLogin);
router.post("/register", validateRegister, doRegister);
router.get("/auth/me", validateToken, getMe);

export default router;
