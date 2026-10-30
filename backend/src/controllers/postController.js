import { createPost } from "../service/postService";

async function setCreatePost(req, res) {
  const response = await createPost(req.body);
  if (response) {
    return res.status(201).json(response);
  } else {
    return res.status(400).json({ error: "Erro ao criar o post." });
  }
}

export { setCreatePost };
