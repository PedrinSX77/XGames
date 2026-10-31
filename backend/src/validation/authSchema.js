import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Formato de email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});
export const registerSchema = z.object({
  name: z.string().min(1).max(60),
  username: z.string().min(3).max(15),
  email: z.email("Formato de email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});
