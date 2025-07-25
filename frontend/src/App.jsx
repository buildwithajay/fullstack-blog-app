import { useEffect, useState } from 'react'

import Header from "./Shared/Header"
import Footer from './Shared/Footer'

function App() {


  useEffect(()=>{
    const fetchData = async()=>{
        let data = await fetch('http://localhost:5064/games')
    let result = await data.json();
    console.log(result)
    }
    fetchData();
  },[])
  return (
    <>

      <Header/>
      <Footer/>
    </>
  )
}

export default App
