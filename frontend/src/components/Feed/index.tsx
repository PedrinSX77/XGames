import type { FeedProps } from "../../types/type";
import { PostCard } from "../PostCard";
import styles from "./feed.module.css";

export function Feed({ posts, loading = false }: FeedProps) {
  return (
    <section className={styles.feedContainer}>
      <div className={styles.feedHeader}>
        <h2 className={styles.feedTitle}>
          Feed Recente
          <span className={styles.postBadge}>{posts.length}</span>
        </h2>
      </div>

      {loading ? (
        <div className={styles.emptyState}>
          <p>Carregando posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nenhuma publicação ainda. Seja o primeiro a postar!</p>
        </div>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </section>
  );
}
