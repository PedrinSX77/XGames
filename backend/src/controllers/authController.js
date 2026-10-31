import { login, register, whoIsMe } from "../service/authService.js";

export async function doRegister(req, res, next) {
  try {
    const user = await register(req.body);
    return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    return next(err);
  }
}

export async function doLogin(req, res, next) {
  try {
    const data = await login(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = await whoIsMe(req.user);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}
