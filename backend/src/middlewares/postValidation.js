import { post } from "../validation/postSchema.js";

async function validatePost(req, res, next) {
  const requestValidated = post.safeParse(req.body);

  if (!requestValidated.success) {
    return res.status(400).json({
      error: "Dados inválidos",
      details: requestValidated.error.format(),
    });
  }

  next();
}

export default validatePost;
