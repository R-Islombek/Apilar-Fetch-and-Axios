import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("https://testpsyedu.limsa.uz/users");
      console.log("API javobi:", res.data);
      if (res.data && res.data.data) {
        setUsers(res.data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Xatolik:", err);
      setError("Ma'lumotlarni olishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="loader">Yuklanmoqda...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        users.map((user) => (
          <div key={user.id} className="card">
            <img
              src={`https://picsum.photos/300/300?random=${user.id}`}
              alt={`${user.firstName} ${user.lastName}`}
              className="user-img"
            />
            <h1>
              {user.firstName} {user.middleName} {user.lastName}
            </h1>
            <p>{user.cityName}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default App;