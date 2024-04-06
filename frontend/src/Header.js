import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(response => {
      response.json().then(userInfo => {
        setUserName(userInfo.userName);
      })
    })
  }, []);
  function logout(){
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method:'POST'
    }) 
    setUserName(null);
  }
  return (
    <header>
      <div className="logoContainer">
        <Link to="/" className="logoName">Interview Voyage</Link>
      </div>
      <div className="nav">
        {userName && (
          <>
            <Link to='/create'>Share Experience</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login"> Login </Link>
            <Link to="/register"> Register </Link>
          </>
        )
        }
      </div>
    </header>
  )
}

export default Header