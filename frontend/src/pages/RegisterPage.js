import React, { useState } from 'react'
const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('https://interview-voyage-dkbv.onrender.com/register', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-type': 'application/json' }

    })
    if (response.status === 200)
      alert("Registration Successfull! You may now Login")
    else
      alert("Registration failed! Username already exists.Try with a different Username");
  }
  return (
    <form className='register' onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
        placeholder='Username'
        value={userName}
        onChange={ev => setUserName(ev.target.value)}
      />
      <input type="password" placeholder='Password'
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  )
}

export default RegisterPage