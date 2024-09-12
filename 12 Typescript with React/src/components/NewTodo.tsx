import React, { useRef } from "react";
import "./NewTodo.css";

interface AddTodo {
  onAddTodo(text: string): void;
}

const NewTodo: React.FC<AddTodo> = ({ onAddTodo }) => {
  const ref = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const eneteredText = ref.current!.value;
    onAddTodo(eneteredText);
    ref.current!.value = "";
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={ref} />
      </div>
      <button type="submit">Add TODO</button>
    </form>
  );
};

export default NewTodo;
