import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.js';
import Homepage from './pages/Homepage.js'
import LoginPage from './pages/LoginPage.js'
import RegisterPage from './pages/RegisterPage.js'
import {UserContextProvider} from './UserContext.js'
const App = () => {
  return (
   <UserContextProvider>
     <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
   </UserContextProvider>
  )
}
export default App
