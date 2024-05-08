import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Context from './context/Context';
import Blog from './page/Blog';
import Login from './page/Login';
import Admin from './page/Admin';
import FormBlog from './components/FormBlog';
import FormBlogUpdate from './components/FormBlogUpdate';
import BlogAbout from './page/BlogAbout';
import Error from './page/Error';


const App = () => {
  return (
    <BrowserRouter >
      <Context>
        <Routes>
          <Route path='*' element={<Error />} />
          <Route path="/" element={<Blog />} />
          <Route path='/Blog/:id' element={<BlogAbout />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Admin" element={<Admin />} >
            <Route index={true} element={<FormBlog />} />
            <Route path='Update/:id' element={<FormBlogUpdate />} />
          </Route>
        </Routes>
      </Context>
    </BrowserRouter>
  )
}

export default App