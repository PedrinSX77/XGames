import React, { useState } from "react";
import styles from "./form.module.css";

export function Form() {
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        setContent("");
      }

      return { response };
    } catch (e) {
      console.log(e);
    }
  }

  const isFormInvalid = content.trim() === "";
  const remainingChars = 280 - content.length;

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Criar Postagem</h2>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="post-text">
          O que está acontecendo?
        </label>
        <textarea
          id="post-text"
          className={styles.textarea}
          maxLength={280}
          placeholder="Digite sua ideia aqui..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.footer}>
        <span
          className={`${styles.counter} ${
            remainingChars <= 20 ? styles.counterWarning : ""
          }`}
        >
          {remainingChars} caracteres restantes
        </span>

        <button
          className={styles.submitBtn}
          type="submit"
          disabled={isFormInvalid}
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
