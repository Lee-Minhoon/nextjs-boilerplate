import { getRandomEmail, getRandomPhoneNumber, getRandomString } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { RequiredKeysOf } from "type-fest";
import { readSession } from "../auth";
import { Order, User, readDB, writeDB } from "../db";
import { sleep } from "../utils";

export const readUsers = async (
  sort?: RequiredKeysOf<User>,
  order?: Order,
  search?: string
): Promise<User[]> => {
  try {
    const db = await readDB();
    let users = db.users;
    if (search && search.length > 0) {
      users = users.filter((user) => {
        return (
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.phone.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    if (sort && order) {
      users = users.sort((a, b) => {
        if (order === "asc") {
          if (a[sort] < b[sort]) return -1;
          if (a[sort] > b[sort]) return 1;
        } else {
          if (a[sort] > b[sort]) return -1;
          if (a[sort] < b[sort]) return 1;
        }
        return 0;
      });
    }
    return users;
  } catch (err) {
    console.log("Failed to read db.json");
    throw err;
  }
};

export const writeUsers = async (users: User[]) => {
  try {
    const db = await readDB();
    await writeDB(db.session, users, db.posts);
  } catch (err) {
    console.log("Failed to write db.json");
    throw err;
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
  switch (req.method) {
    case "GET":
      const { page, cursor, limit } = req.query;
      if (page && limit) return getUsersByPage(req, res);
      if (cursor && limit) return getUsersByCursor(req, res);
      return getUsers(req, res);
    case "POST":
      return createUser(req, res);
    default:
      return res.status(405).end();
  }
}

// [GET] /api/users/:id
export const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const users = await readUsers();
    const user = users.find((user) => user.id === Number(id));

    return res.status(200).json({
      data: user ?? null,
      message: `Successfully retrieved user ${id}`,
    });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `Failed to get user ${id}` });
  }
};

// [GET] /api/users
export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sort, order } = req.query;

  try {
    const users = await readUsers(sort as RequiredKeysOf<User>, order as Order);

    return res
      .status(200)
      .json({ data: users, message: "Successfully retrieved users" });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get users" });
  }
};

// [GET] /api/users
export const getUsersByPage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { page, limit, sort, order, search } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  try {
    const users = await readUsers(
      sort as RequiredKeysOf<User>,
      order as Order,
      search as string
    );
    const slicedUsers = users.slice(
      Number(offset),
      Number(offset) + Number(limit)
    );

    return res.status(200).json({
      data: { total: users.length, data: slicedUsers },
      message: "Successfully retrieved users",
    });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get users" });
  }
};

// [GET] /api/users
export const getUsersByCursor = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { cursor, limit, sort, order, search } = req.query;

  try {
    const users = await readUsers(
      sort as RequiredKeysOf<User>,
      order as Order,
      search as string
    );
    const index = users.findIndex((_, idx) => idx === Number(cursor));
    const slicedUsers = users.slice(index, index + Number(limit));

    const previous = index - Number(limit);
    const next = index + Number(limit);

    return res.status(200).json({
      data: {
        previous: previous >= 0 ? previous : null,
        next: next < users.length ? next : null,
        data: slicedUsers,
      },
      message: "Successfully retrieved users",
    });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get users" });
  }
};

// [POST] /api/users
export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, phone, profile } = req.body;

  try {
    const users = await readUsers();

    if (users.length > 10000) {
      return res
        .status(409)
        .json({ data: null, message: "Maximum number of users reached" });
    }

    if (users.some((user) => user.email === email)) {
      return res
        .status(409)
        .json({ data: null, message: "Email already exists" });
    }

    const newUser: User = {
      id: (users[users.length - 1]?.id ?? 0) + 1,
      name,
      email,
      phone,
      profile,
      approved: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(newUser);

    await writeUsers(users);

    return res
      .status(200)
      .json({ data: newUser.id, message: `User ${newUser.id} created` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `User ${name} creation failed` });
  }
};

// [PUT] /api/users/:id
export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, email, phone, profile } = req.body;

  try {
    let users = await readUsers();
    users = users.map((user) => {
      if (user.id === Number(id)) {
        return {
          ...user,
          name,
          email,
          phone,
          profile,
          updatedAt: new Date().toISOString(),
        };
      }
      return user;
    });

    await writeUsers(users);

    return res.status(200).json({ data: id, message: `User ${id} updated` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `User ${id} update failed` });
  }
};

// [DELETE] /api/users/:id
export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const session = await readSession();

    if (session === Number(id)) {
      return res
        .status(409)
        .json({ data: null, message: "Please sign out before deleting user" });
    }

    let users = await readUsers();
    users = users.filter((user) => user.id !== Number(id));

    await writeUsers(users);

    return res.status(200).json({ data: id, message: `User ${id} deleted` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `User ${id} deletion failed` });
  }
};

// [PUT] /api/users/:id/approve
export const approveUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  try {
    let users = await readUsers();
    users = users.map((user) => {
      if (user.id === Number(id)) {
        return { ...user, approved: true, updatedAt: new Date().toISOString() };
      }
      return user;
    });

    await writeUsers(users);

    return res.status(200).json({ data: id, message: `User ${id} approved` });
  } catch (err) {
    return res
      .status(500)
      .json({ data: null, message: `User ${id} approval failed` });
  }
};

// [PUT] /api/users/test/:count
export const createTestUsers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { count } = req.query;

  try {
    const users = await readUsers();

    if (users.length > 10000) {
      return res
        .status(409)
        .json({ data: null, message: "Maximum number of users reached" });
    }

    const lastId = users[users.length - 1]?.id ?? 0;
    for (let i = 0; i < +(count ?? 10); i++) {
      const currentId = lastId + i + 1;
      users.push({
        id: currentId,
        name: getRandomString(10),
        email: getRandomEmail(),
        phone: getRandomPhoneNumber(),
        approved: Math.random() > 0.5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    await writeUsers(users);

    return res
      .status(200)
      .json({ data: users, message: "Successfully created test users" });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: "Failed to create test users" });
  }
};

// [DELETE] /api/users/test/reset
export const resetTestUsers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await readSession();

    if (session) {
      return res.status(409).json({
        data: null,
        message: "Please sign out before resetting test users",
      });
    }

    await writeUsers([]);

    return res
      .status(200)
      .json({ data: [], message: "Successfully reset test users" });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: "Failed to reset test users" });
  }
};
