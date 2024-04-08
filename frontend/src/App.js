import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.js';
import Homepage from './pages/Homepage.js'
import LoginPage from './pages/LoginPage.js'
import RegisterPage from './pages/RegisterPage.js'
import {UserContextProvider} from './UserContext.js'
import PostPage from './pages/PostPage.js';
import CreatePost from './pages/CreatePost.js';
import EditPost from './pages/EditPost.js'
const App = () => {
  return (
   <UserContextProvider>
     <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='/edit/:id' element={<EditPost />} />
    </Route>
    </Routes>
   </UserContextProvider>
  )
}
export default App
