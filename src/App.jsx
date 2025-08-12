import React, { useState } from "react";
import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit, reset } = useForm();
  const [todos, setTodos] = useState([]);

  const onSubmit = (data) => {
    if (!data.task.trim()) return;
    setTodos([...todos, { id: Date.now(), text: data.task }]);
    reset(); // inputni tozalash
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Todo (React Hook Form)</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("task")}
          placeholder="Yangi vazifa..."
        />
        <button type="submit">Qo'shish</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;