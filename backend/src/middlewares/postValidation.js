import { post } from "../validation/postSchema.js";

export async function validatePost(req, res, next) {
  const requestValidated = post.safeParse(req.body);

  if (!requestValidated.success) {
    const err = new Error("Dados inválidos");
    err.statusCode = 400;
    return next(err);
  }
  next();
}
