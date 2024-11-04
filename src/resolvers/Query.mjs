import { db } from "../db/db.mjs";

export const Query = {
  hello: (_, { name }) => `Hello ${name || "World"} from Yoga!`,

  getTodos: () => {
    return db.todos;
  },

  getTodoById: (parent, { id }, context, info) => {
    const todo = db.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error(`Todo with ${id} not found`);
    }
    return todo;
  },

  getAllUsers: () => {
    console.log("Get All Users");
    return db.users;
  },
  getUserById: (parent, { id }, context, info) => {
    const user = db.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`user with ${id} not exist`);
    }
    return user;
  },
  
};
