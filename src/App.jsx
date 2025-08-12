import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./App.css";

const App = () => {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState([]);

  // GET — Userlarni olish
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data.slice(0, 5))); // 5 tasini olish
  }, []);

  // POST — User qo‘shish
  const onSubmit = async (data) => {
    if (!data.name.trim()) return;
    const res = await axios.post("https://jsonplaceholder.typicode.com/users", data);
    setUsers([...users, { id: Date.now(), name: data.name }]); // local statega qo‘shish
    reset();
  };

  // DELETE — User o‘chirish (faqat local state)
  const handleDelete = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="container">
      <h2>React Hook Form + Axios CRUD</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input {...register("name")} placeholder="Ism..." className="input" />
        <button type="submit" className="btn">Qo‘shish</button>
      </form>

      <ul className="list">
        {users.map((user) => (
          <li key={user.id} className="list-item">
            {user.name}
            <button onClick={() => handleDelete(user.id)} className="btn delete">❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;