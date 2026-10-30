import type { Post } from "../../types/type";
import styles from "./postcard.module.css";

interface PostCardProps {
  post: Post;
}

function formatarTempoRelativo(dataIso: string) {
  const dataPost = new Date(dataIso).getTime();
  const diferencaMs = Date.now() - dataPost;

  const segundos = Math.floor(diferencaMs / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (dias > 0) return `${dias}d`;
  if (horas > 0) return `${horas}h`;
  if (minutos > 0) return `${minutos}min`;
  return "poucos segundos";
}

export function PostCard({ post }: PostCardProps) {
  const initialLetter = post.authorName ? post.authorName[0].toUpperCase() : "?";

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div className={styles.authorInfo}>
          <div className={styles.avatar}>{initialLetter}</div>
          <h3 className={styles.authorName}>{post.authorName}</h3>
        </div>
        <span className={styles.time}>Há {formatarTempoRelativo(post.createdAt)}</span>
      </header>

      <p className={styles.content}>{post.content}</p>

      <footer className={styles.footer}>
        <button type="button" className={styles.actionBtn}>
          <span>💬</span> 0
        </button>
        <button type="button" className={styles.actionBtn}>
          <span>🤍</span> 0
        </button>
      </footer>
    </article>
  );
}
