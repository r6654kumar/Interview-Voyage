import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext';
const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('https://interview-voyage-dkbv.onrender.com/profile', {
      credentials: 'include'
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  }, []);
  function logout() {
    fetch('https://interview-voyage-dkbv.onrender.com/logout', {
      credentials: 'include',
      method: 'POST'
    })
    setUserInfo(null);
  }
  const userName = userInfo?.userName;
  return (
    <header>
      <div className="logoContainer">
        <Link to="/" className="logoName">Interview Voyage</Link>
      </div>
      <div className="nav">
        {userName && (
          <>
            <div className='displayUser'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="avatar">
                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
              </svg>

              <span>Hey {userName} !</span>
            </div>
            <Link to='/create'><div className='share-btn'>Share Experience  </div></Link>
            <Link to='' onClick={logout}><div className='logout-btn'>Logout</div></Link>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login"> <div className='login-btn'>Login</div> </Link>
            <Link to="/register"> <div className='register-btn'>Register</div> </Link>
          </>
        )
        }
      </div>
    </header>
  )
}

export default Header