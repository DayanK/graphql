export const Mutation = {
  addTodo: (parent, { name, content, userId }, { db }, infos) => {
    // console.log("arg", args)
    //check if userId is correct
    // else add new userId to context
    // add default context
    // add todo to db
    if(!db.users.some((user)=> user.id === userId)){
        throw new Error(`Todo with ${userId} not exist`);
    }else{
        const newTodo = { 
            id: db.todos[db.todos.length - 1].id + 1,
            status: 'WAITING',
            name,
            content,
            userId,
        }
        db.todos.push(newTodo);
        return newTodo;
    }
  },
};
