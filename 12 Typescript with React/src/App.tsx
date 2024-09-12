import React, { useState } from "react";

import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./todo.model";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoList = (text: string) => {
    console.log(text);
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text },
    ]);
  };

  const deleteTodoListItem = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      {/* A component that adds todos */}
      <NewTodo onAddTodo={addTodoList} />
      <TodoList items={todos} deleteTodoItem={deleteTodoListItem} />
    </div>
  );
};

export default App;
