import React, {useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext';
const Header = () => {
  const {setUserInfo,userInfo}=useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  }, []);
  function logout(){
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method:'POST'
    }) 
    setUserInfo(null);
  }
  const userName=userInfo?.userName;
  return (
    <header>
      <div className="logoContainer">
        <Link to="/" className="logoName">Interview Voyage</Link>
      </div>
      <div className="nav">
        {userName && (
          <>
            <Link to='/create'>Share Experience</Link>
            <Link to='' onClick={logout}>Logout</Link>
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