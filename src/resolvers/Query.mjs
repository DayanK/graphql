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
};
