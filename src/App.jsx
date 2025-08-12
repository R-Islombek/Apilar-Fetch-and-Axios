import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

const App = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const onSubmit = (data) => {
    if (!data.name.trim()) return;

    if (editId) {
      setUsers(
        users.map((user) =>
          user.id === editId ? { ...user, name: data.name } : user
        )
      );
      setEditId(null);
    } else {
      setUsers([...users, { id: Date.now(), name: data.name }]);
    }

    reset();
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleEdit = (id) => {
    const user = users.find((u) => u.id === id);
    setValue("name", user.name);
    setEditId(id);
  };

  return (
    <div className="container">
      <h2 className="title">CRUD (React Hook Form)</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          {...register("name")}
          placeholder="Ism kiriting..."
          className="input"
        />
        <button type="submit" className="btn primary">
          {editId ? "Yangilash" : "Qo'shish"}
        </button>
      </form>

      <ul className="list">
        {users.map((user) => (
          <li key={user.id} className="list-item">
            <span>{user.name}</span>
            <div className="btn-group">
              <button
                className="btn edit"
                onClick={() => handleEdit(user.id)}
              >
                ✏
              </button>
              <button
                className="btn delete"
                onClick={() => handleDelete(user.id)}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
