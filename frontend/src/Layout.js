import React from 'react'
import Header from './Header.js'
import {Outlet} from 'react-router-dom'
import { Footer } from './Footer.js'
const Layout = () => {
  return (
    <div className="main">
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout