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
import CategoryWisePage from './pages/CategoryWisePage.js';
const App = () => {
  return (
   <UserContextProvider>
     <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage/>} />
        <Route path='/all_experiences' element={<Homepage/>} />
        <Route path='/amazon_experiences' element={<CategoryWisePage key="Amazon"category="Amazon"/>} />
        <Route path='/google_experiences' element={<CategoryWisePage key = "Google" category="Google"/>} />
        <Route path='/microsoft_experiences' element={<CategoryWisePage key="Microsoft"category="Microsoft"/>} />
        <Route path='/meta_experiences' element={<CategoryWisePage key="Meta"category="Meta"/>} />
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
