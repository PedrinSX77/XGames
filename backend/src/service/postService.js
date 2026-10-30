import { prisma } from "../../prisma/prismaInterface.js";

async function createPost(post) {
  const newPost = await prisma.post.create({
    data: {
      authorName: post.authorName,
      content: post.content,
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
