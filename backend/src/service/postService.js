import { prisma } from "../../prisma/prismaInterface.js";

async function createPost(post) {
  const newPost = await prisma.post.create({
    data: {
      authorName: post.user.id,
      content: post.body.content,
    },
  });

  return newPost;
}

async function collectAllPosts() {
  const allPosts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return allPosts;
}

export { createPost, collectAllPosts };
