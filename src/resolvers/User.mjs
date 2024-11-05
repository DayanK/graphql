export const User = {
    todos: ({ id }, arg, { db }, info) => {
      return db.todos.filter((todo) => todo.userId === id);
    },
  };