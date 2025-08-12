import React, { useEffect, useState } from 'react'

const App = () => {
    const [users, setUser] = useState([]);

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res)=>res.json())
        .then((data)=>setUser(data));
    }, [])

  return (
    <div>
        <h1>Apilar bilan ishlash</h1>
        {users.map((user)=>(
            <p key={user.id}>{user.name}</p>
        ))}
    </div>
  )
}

export default App
