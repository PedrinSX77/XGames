import express from "express";
import validatePost from "../middlewares/postValidation.js";
import { getAllPosts, setCreatePost } from "../controllers/postController.js";
const router = express.Router();

// Cria posts
router.post("/posts", validatePost, setCreatePost);
// Pega todos os posts
router.get("/posts", getAllPosts);

export default router;
