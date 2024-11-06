// Utility function to check if an item with a specific attribute exists in an array
function existsInArray(array, attribute, value) {
  return array.some((item) => item[attribute] === value);
}

export const Mutation = {
  addTodo: (parent, { addTodoInput }, { db, pubsub }, info) => {
    // Check if userId exists
    if (!existsInArray(db.users, "id", addTodoInput.userId)) {
      throw new Error(
        `User with userId ${addTodoInput.userId} does not exist.`
      );
    }

    // Create a new `todo` object with provided details
    const newTodo = {
      id: db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1,
      status: "WAITING",
      ...addTodoInput,
    };

    // Add the new `todo` to the database
    db.todos.push(newTodo);
    // Publish the new todo event
    pubsub.publish('todo', { todo: {todo: newTodo, mutation: "ADD"} });
    return {
      success: true,
      message: "Todo was successfully added.",
      todo: newTodo,
    };
  },
  updateTodo: (parent, { id, updateTodoInput }, { db, pubsub }, infos) => {
    // Check if the userId exists if provided
    if ( updateTodoInput.userId && !existsInArray(db.users, "id", updateTodoInput.userId)
    ) {
      throw new Error(`User with id ${updateTodoInput.userId} does not exist.`);
    }

    // Find the todo item to update
    const todo = db.todos.find((todoItem) => todoItem.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} does not exist.`);
    }

    // Update the todo item's fields based on updateTodoInput
    for (let key in updateTodoInput) {
      // Only update fields that are present in updateTodoInput
      if (updateTodoInput[key] !== undefined) {
        todo[key] = updateTodoInput[key];
      }
    }

    pubsub.publish('todo', { todo: {todo, mutation: "UPDATE"} });

    // Return success message and the updated todo
    return {
      success: true,
      message: "Todo was successfully updated.",
      todo, // Return the updated todo
    };

  },

  deleteTodo: (parent, { id }, { db, pubsub }, infos) => {
    // Check if the `todo` exists in `db.todos`
    const todoIndex = db.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error(`Todo with id ${id} does not exist.`);
    }

    // Remove the `todo` and return the deleted item
    const [deletedTodo] = db.todos.splice(todoIndex, 1);
    
    pubsub.publish('todo', { todo: {deletedTodo, mutation: "DELETE"} });

    return {
      success: true,
      message: "Todo was successfully deleted.",
      todo: deletedTodo,
    };
  },
};
