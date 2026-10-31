import { collectAllPosts, createPost } from "../service/postService.js";

async function setCreatePost(req, res, next) {
  try {
    const response = await createPost(req);
    return res.status(201).json(response);
  } catch (err) {
    return next(err);
  }
}

async function getAllPosts(req, res, next) {
  try {
    const posts = await collectAllPosts();
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
}

export { setCreatePost, getAllPosts };
