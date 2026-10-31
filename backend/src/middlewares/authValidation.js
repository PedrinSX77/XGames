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
