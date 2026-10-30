import express from "express";
import validatePost from "../middlewares/postValidation";
import { setCreatePost } from "../controllers/postController";
const router = express.Router();

router.post("/posts", validatePost, setCreatePost);

export default router;
