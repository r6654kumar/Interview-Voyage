import React, { useState } from 'react'
import {Navigate} from 'react-router-dom'
const LoginPage = () => {
  const [userName,setUserName]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  async function login(ev){
    const response=await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-type': 'application/json' },
      credentials:'include'
    })
    if(response.status===200)
      setRedirect(true);
    else
      alert("Invalid Credentials");
    }
    if(setRedirect)
      return <Navigate to={'/'} />
    return (
    <form className='login' onSubmit={login}>
      <h1>Login</h1>
      <input type="text" placeholder='Username'
      value={userName}
      onChange={ev=>setUserName(ev.target.value)}
      />
      <input type="password" placeholder='Password'
      value={password}
      onChange={ev=>setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  )
}

export default LoginPage