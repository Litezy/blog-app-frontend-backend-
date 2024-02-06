import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/General/Homepage'
import Bloguser from './pages/General/Bloguser'
import Logout from './pages/General/Logout'
import Login from './pages/General/Login'
import Profile from './pages/Admin/Profile'
import Signup from './pages/General/Signup'
import Blogpage from './pages/General/Blogpage'
import Allblogs from './pages/Admin/Allblogs'
import CreateBlogs from './pages/Admin/CreateBlogs'
import EditBlogs from './pages/Admin/EditBlogs'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/blog" element={<Allblogs/>}/>
      <Route path="/blog/:id/slug" element={<Blogpage/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Logout" element={<Logout/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/blog/new" element={<CreateBlogs/>}/>
      <Route path="/blog/:id/edit" element={<EditBlogs/>}/>
      <Route path="/blog/:userid/user" element={<Bloguser/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App