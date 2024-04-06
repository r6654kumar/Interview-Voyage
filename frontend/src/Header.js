import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header>
        <div className="logoContainer">
          <Link to ="/" className="logoName">Interview Voyage</Link>
        </div>
        <div className="nav">
          <Link to ="/login"> Login </Link>
          <Link to ="/register"> Register </Link>
        </div>
      </header>
  )
}

export default Header