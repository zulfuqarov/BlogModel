import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Context from './context/Context';
import Blog from './page/Blog';
import Login from './page/Login';
import Admin from './page/Admin';


const App = () => {
  return (
    <BrowserRouter>
      <Context>
        <Routes>
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </Context>
    </BrowserRouter>
  )
}

export default App