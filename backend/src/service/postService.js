import { prisma } from "../../prisma/prismaInterface.js";

async function createPost(content, authorId) {
  const newPost = await prisma.post.create({
    data: {
      authorId,
      content,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
    },
  });

  return newPost;
}

async function collectAllPosts() {
  const allPosts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
    },
  });
  return allPosts;
}

export { createPost, collectAllPosts };
