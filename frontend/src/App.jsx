import { useEffect, useState } from 'react'

import Header from "./Shared/Header"
import Footer from './Shared/Footer'
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './Components/About';
import Contact from './Components/Contact';
import Blog from './Components/Blog';
import CreateBlog from './Components/CreateBlog';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ProtectedRoute from './Pages/ProtectedRoute';
import Dashboard from './Pages/Dashboard';
import Update from './Components/Update';



function App() {


  


  return (
    <>
        <Router >
        <Header/>
   
          <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          
          <Route path='/' element={<ProtectedRoute/>}>
            <Route path='create' element={<CreateBlog/>}/>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='/updateblog/:id' element={<Update/>}/>


          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        <Route path="/blogs" element={<Blog />} />
        
      </Routes>
        </Router>
      
    </>
  )
}

export default App
