import { prisma } from "../../prisma/prismaInterface";

async function createPost(post) {
  const newPost = await prisma.post.create({
    data: {
      authorName: post.authorName,
      content: post.content,
    },
  });

  return newPost;
}

export { createPost };
