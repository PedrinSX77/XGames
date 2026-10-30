import { useEffect, useState } from "react";
import type { Post } from "../../types/type";
import { PostCard } from "../PostCard";
import styles from "./feed.module.css";

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarPosts() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts`,
        );

        if (!response.ok) {
          throw new Error("Não foi possível carregar os posts...");
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    carregarPosts();
  }, []);

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
