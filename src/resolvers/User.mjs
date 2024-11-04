import { db } from "../db/db.mjs";



export const User = {
    todos: ({ id }, arg, context, info) => {
      console.log("parent", id);
      return db.todos.filter((todo) => todo.userId === id);
    },
  };