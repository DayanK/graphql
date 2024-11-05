
export const Todo = {
  user: ({ userId }, arg, { db }, info) => {
    console.log("userID", userId);
    return db.users.find((user) => user.id === userId);
  },
};

