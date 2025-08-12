import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  const [users, setUsers] = useState([])

  async function fetchUsers() {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users")
      console.log(res.data);
      setUsers(res.data)
    } catch (error) {
      console.log("Xatolik berayapti", error);
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="container">
      {users.map((user) => (
        <div key={user.id} className="card">
          <img src={`https://picsum.photos/300/300?random=${user.id}`} alt={user.username} className="user-img" />
          <h1>{user.username}</h1>
          <p>{user.address.city}</p>
        </div>
      ))}
    </div>
  )
}

export default App