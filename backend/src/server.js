import express from "express";
import postRouter from "./routes/postRouter.js";
import authRouter from "./routes/authRouter.js";
import "dotenv/config";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 3030;
app.use(cors());
app.use(express.json());

// Rotas dos Posts
app.use(postRouter);
// Rotas de Autenticação
app.use(authRouter);

// Tratamento de Erro
app.use(errorHandler);
app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});
