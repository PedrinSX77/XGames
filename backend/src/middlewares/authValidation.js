import jwt from "jsonwebtoken";
import "dotenv/config";
import { registerSchema, loginSchema } from "../validation/authSchema.js";

export function validateLogin(req, res, next) {
  const requestValidated = loginSchema.safeParse(req.body);

  if (!requestValidated.success) {
    const err = new Error("Dados de login inválidos");
    err.statusCode = 400;
    return next(err);
  }

  next();
}

export function validateRegister(req, res, next) {
  const requestValidated = registerSchema.safeParse(req.body);

  if (!requestValidated.success) {
    const err = new Error("Dados de registro inválidos");
    err.statusCode = 400;
    return next(err);
  }
  next();
}

export function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    const err = new Error("Token não fornecido");
    err.statusCode = 401;
    return next(err);
  }

  try {
    const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = isValidToken;
    next();
  } catch (err) {
    err.statusCode = 403;
    return next(err);
  }
}
