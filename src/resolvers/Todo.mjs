
export const Todo = {
  user: ({ userId }, arg, { db }, info) => {
    return db.users.find((user) => user.id === userId);
  },
};

