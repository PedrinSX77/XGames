import { post } from "../validation/postSchema.js";
import jwt from "jsonwebtoken";

export async function validatePost(req, res, next) {
  const requestValidated = post.safeParse(req.body);

  if (!requestValidated.success) {
    const err = new Error("Dados inválidos");
    err.statusCode = 400;
    return next(err);
  }
  next();
}

export async function validateOwnerPost(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    const err = new Error("Não foi enviado autenticação!");
    err.statusCode = 401;
    return next(err);
  }
  const userToken = authHeader.split(" ")[1];
  if (!userToken) {
    const err = new Error("Não existe usuário para indexar ao Post");
    err.statusCode = 401;
    return next(err);
  }

  try {
    const isValidToken = jwt.verify(userToken, process.env.JWT_SECRET);
    req.user = isValidToken;
    next();
  } catch (err) {
    err.statusCode = 403;
    return next(err);
  }
}
