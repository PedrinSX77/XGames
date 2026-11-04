import { useEffect, useState } from "react";
import type { Post } from "../../types/type";
import { Form } from "../../components/Forms/Post";
import { Feed } from "../../components/Feed";

export function Home() {
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

  function handlePostCreated(newPost: Post) {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }
  return (
    <>
      <main>
        <Form onPostCreated={handlePostCreated} />
        <Feed posts={posts} loading={loading} />
      </main>
    </>
  );
}
