import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/prismaInterface.js";
import bcrypt from "bcryptjs";

export async function register(data) {
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ email: data.email }, { username: data.username }],
    },
  });
  if (userExists) {
    const error = new Error("Email ou username já cadastrado");
    error.statusCode = 409;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      password: hashedPassword,
    },
  });

  return user;
}

export async function login(data) {
  const { email, password } = data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const error = new Error("Email ou senha incorretos!");
    error.statusCode = 401;
    throw error;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    const error = new Error("Email ou senha incorretos!");
    error.statusCode = 401;
    throw error;
  }
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  return { token, user: { id, username, email } };
}
