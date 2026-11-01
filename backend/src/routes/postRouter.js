import express from "express";
import { validatePost } from "../middlewares/postValidation.js";
import { getAllPosts, setCreatePost } from "../controllers/postController.js";
import { validateToken } from "../middlewares/authValidation.js";
const router = express.Router();

// Cria posts
router.post("/posts", validateToken, validatePost, setCreatePost);
// Pega todos os posts
router.get("/posts", getAllPosts);

export default router;
