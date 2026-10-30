import express from "express";
import postRouter from "./routes/postRouter.js";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3030;
app.use(cors());
app.use(express.json());

// Rotas dos Posts
app.use(postRouter);

app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});
