import { useContext, useState } from "react";
import type { AuthFormProps } from "../../../types/type.ts";
import { useNavigate, Link } from "react-router-dom";
import styles from "./auth.module.css";
import { AuthContext } from "../../../context/authContext.tsx";
import { Logo } from "../../Logo/index.tsx";

export default function AuthForm({ mode }: AuthFormProps) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isRegister = mode === "register";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isRegister) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, username, email, password }),
        },
      );

      if (response.ok) {
        navigate("/login");
      } else {
        alert("Erro ao se registrar, por favor tente novamente mais tarde");
      }
    } else {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        auth?.login(data.user);
        navigate("/");
      } else {
        alert("Erro ao entrar, por favor tente novamente mais tarde");
      }
    }
  }

  return (
    <div className={styles.authPage}>
      <form className={styles.authCard} onSubmit={handleSubmit}>
        <div className={styles.brandHeader}>
          <Logo size={38} />
          <h2 className={styles.title}>
            {isRegister ? "Criar Conta" : "Entrar no XGames"}
          </h2>
          <p className={styles.subtitle}>
            {isRegister
              ? "Junte-se à comunidade gamer no XGames"
              : "Acesse sua conta para interagir no feed"}
          </p>
        </div>

        {isRegister && (
          <>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="name">
                Nome Completo
              </label>
              <input
                id="name"
                className={styles.input}
                type="text"
                name="name"
                placeholder="Ex: Pedro Henrique"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                id="username"
                className={styles.input}
                type="text"
                name="username"
                placeholder="Ex: PedrinSX77"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </>
        )}

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="email">
            E-mail
          </label>
          <input
            className={styles.input}
            type="email"
            name="email"
            id="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="password">
            Senha
          </label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
            placeholder="Mínimo de 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.submitBtn} type="submit">
          {isRegister ? "Cadastrar" : "Entrar"}
        </button>

        <div className={styles.switchText}>
          {isRegister ? (
            <>
              Já possui uma conta?
              <Link className={styles.switchLink} to="/login">
                Entrar
              </Link>
            </>
          ) : (
            <>
              Ainda não tem conta?
              <Link className={styles.switchLink} to="/register">
                Criar conta
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
