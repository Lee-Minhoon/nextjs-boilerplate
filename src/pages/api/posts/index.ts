import { RequiredKeys } from "@/types";
import { getRandomString } from "@/utils";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Order, Post, readDB } from "../db";
import { readUsers } from "../users";
import { sleep } from "../utils";

export const readPosts = (sort?: RequiredKeys<Post>, order?: Order) => {
  try {
    const db = readDB();
    return db.posts;
  } catch (err) {
    console.log("Failed to read db.json");
    throw err;
  }
};

export const readPostsWithUser = (
  sort?: RequiredKeys<Post> & "user_name",
  order?: Order
) => {
  try {
    const db = readDB();
    const posts = db.posts.map((post) => ({
      ...post,
      user: db.users.find((user) => user.id === post.userId) ?? null,
    }));
    if (sort && order) {
      return posts.sort((a, b) => {
        if (order === "asc") {
          if (sort === "user_name") {
            if ((a.user?.name ?? "") < (b.user?.name ?? "")) return -1;
            if ((a.user?.name ?? "") > (b.user?.name ?? "")) return 1;
          }
          if (a[sort] < b[sort]) return -1;
          if (a[sort] > b[sort]) return 1;
        } else {
          if (sort === "user_name") {
            if ((a.user?.name ?? "") > (b.user?.name ?? "")) return -1;
            if ((a.user?.name ?? "") < (b.user?.name ?? "")) return 1;
          }
          if (a[sort] > b[sort]) return -1;
          if (a[sort] < b[sort]) return 1;
        }
        return 0;
      });
    } else {
      return posts;
    }
  } catch (err) {
    console.log("Failed to read db.json");
    throw err;
  }
};

export const writePosts = (posts: Post[]) => {
  try {
    const db = readDB();
    fs.writeFileSync(
      path.join(process.cwd(), "/db.json"),
      JSON.stringify({ ...db, posts }, null, 2),
      "utf8"
    );
  } catch (err) {
    console.log("failed to write db.json");
    throw err;
  }
};

export let posts: Post[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
  switch (req.method) {
    case "GET":
      const { page, cursor, limit } = req.query;
      if (page && limit) return getPostsByPage(req, res);
      if (cursor && limit) return getPostsByCursor(req, res);
      return getPosts(req, res);
    case "POST":
      return createPost(req, res);
    default:
      return res.status(405).end();
  }
}

export const getPost = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const posts = readPostsWithUser();
    const post = posts.find((user) => user.id === Number(id));
    return res.status(200).json({
      data: post ?? null,
      message: `Successfully retrieved post ${id}`,
    });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `Failed to get post ${id}` });
  }
};

export const getPosts = (req: NextApiRequest, res: NextApiResponse) => {
  const { sort, order } = req.query;

  try {
    const posts = readPostsWithUser(
      sort as RequiredKeys<Post> & "user_name",
      order as Order
    );
    return res
      .status(200)
      .json({ data: posts, message: "Successfully retrieved posts" });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get posts" });
  }
};

export const getPostsByPage = (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  try {
    const posts = readPostsWithUser(
      sort as RequiredKeys<Post> & "user_name",
      order as Order
    );
    const slicedPosts = posts.slice(
      Number(offset),
      Number(offset) + Number(limit)
    );

    return res.status(200).json({
      data: { total: posts.length, data: slicedPosts },
      message: "Successfully retrieved posts",
    });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get posts" });
  }
};

export const getPostsByCursor = (req: NextApiRequest, res: NextApiResponse) => {
  const { cursor, limit, sort, order } = req.query;

  try {
    const posts = readPostsWithUser(
      sort as RequiredKeys<Post> & "user_name",
      order as Order
    );
    const index = posts.findIndex((_, idx) => idx === Number(cursor));
    const slicedPosts = posts.slice(index, index + Number(limit));

    const previous = index - Number(limit);
    const next = index + Number(limit);

    return res.status(200).json({
      data: {
        previous: previous >= 0 ? previous : null,
        next: next < posts.length ? next : null,
        data: slicedPosts,
      },
      message: "Successfully retrieved posts",
    });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get posts" });
  }
};

export const createPost = (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, title, content } = req.body;

  try {
    const posts = readPosts();
    const newPost: Post = {
      id: (posts[posts.length - 1]?.id ?? 0) + 1,
      userId,
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.push(newPost);

    writePosts(posts);
    return res
      .status(200)
      .json({ data: newPost.id, message: `Post ${newPost.id} created` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `Post ${title} creation failed` });
  }
};

export const updatePost = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { title, content } = req.body;

  try {
    let posts = readPosts();
    posts = posts.map((post) => {
      if (post.id === Number(id)) {
        return { ...post, title, content, updatedAt: new Date().toISOString() };
      }
      return post;
    });

    writePosts(posts);
    return res.status(200).json({ data: id, message: `Post ${id} updated` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `Post ${id} update failed` });
  }
};

export const deletePost = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    let posts = readPosts();
    posts = posts.filter((user) => user.id !== Number(id));

    writePosts(posts);
    return res.status(200).json({ data: id, message: `Post ${id} deleted` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `Post ${id} deletion failed` });
  }
};

export const createTestPosts = (req: NextApiRequest, res: NextApiResponse) => {
  const { count } = req.query;

  try {
    const users = readUsers();
    const posts = readPosts();
    const lastId = posts[posts.length - 1]?.id ?? 0;
    for (let i = 0; i < +(count ?? 10); i++) {
      const currentId = lastId + i + 1;
      posts.push({
        id: currentId,
        userId: users[Math.floor(Math.random() * users.length)].id,
        title: getRandomString(10),
        content: getRandomString(100),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    writePosts(posts);
    return res
      .status(200)
      .json({ data: posts, message: "Successfully created test posts" });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: "Failed to create test posts" });
  }
};

export const resetTestPosts = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    writePosts([]);
  } catch {
    return res
      .status(500)
      .json({ data: null, message: "Failed to reset test posts" });
  }

  return res
    .status(200)
    .json({ data: [], message: "Successfully reset test posts" });
};
