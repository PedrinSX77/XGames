import { collectAllPosts, createPost } from "../service/postService.js";

async function setCreatePost(req, res) {
  const response = await createPost(req.body);
  if (response) {
    return res.status(201).json(response);
  } else {
    return res.status(400).json({ error: "Erro ao criar o post." });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await collectAllPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar posts." });
  }
}

export { setCreatePost, getAllPosts };
