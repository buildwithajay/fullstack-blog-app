import { useEffect, useState } from 'react'

import Header from "./Shared/Header"
import Footer from './Shared/Footer'
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './Components/About';
import Contact from './Components/Contact';
import Blog from './Components/Blog';



function App() {


  


  return (
    <>
        <Router >
        <Header/>
   
          <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        
        <Route path="/blogs" element={<Blog />} />
        
      </Routes>
        </Router>
      
    </>
  )
}

export default App
