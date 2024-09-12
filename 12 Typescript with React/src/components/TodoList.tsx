import React from "react";
import "./TodoList.css";

interface TodoListProps {
  items: { id: string; text: string }[];
  deleteTodoItem(id: string): void;
}

const TodoList: React.FC<TodoListProps> = ({ items, deleteTodoItem }) => {
  return (
    <ul>
      {items.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={() => deleteTodoItem(todo.id)}>&#10539;</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
