import express from "express";
import postRouter from "./routes/postRouter.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

// Rotas dos Posts
app.use(postRouter);

app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});
