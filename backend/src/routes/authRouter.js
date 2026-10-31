import express from "express";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/authValidation.js";
import { doLogin, doRegister } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", validateLogin, doLogin);
router.post("/register", validateRegister, doRegister);

export default router;
