import { db } from "../db/db.mjs";


export const Todo = {
  user: ({ userId }) => {
    console.log("userID", userId);
    return db.users.find((user) => user.id === userId);
  },
};