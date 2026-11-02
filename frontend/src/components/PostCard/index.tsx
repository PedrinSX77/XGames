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
  return "agora";
}

export function PostCard({ post }: PostCardProps) {
  const initialLetter = post.author.username
    ? post.author.username[0].toUpperCase()
    : "?";

  return (
    <article className={styles.card}>
      <div className={styles.avatar}>{initialLetter}</div>

      <div className={styles.body}>
        <header className={styles.header}>
          <span className={styles.authorName}>{post.author.name}</span>
          <span className={styles.username}>@{post.author.username}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.time}>
            {formatarTempoRelativo(post.createdAt)}
          </span>
        </header>

        <p className={styles.content}>{post.content}</p>

        <footer className={styles.footer}>
          <button type="button" className={styles.actionBtn}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>0</span>
          </button>

          <button type="button" className={styles.actionBtn}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>0</span>
          </button>
        </footer>
      </div>
    </article>
  );
}
