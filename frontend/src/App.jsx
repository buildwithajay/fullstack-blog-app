import { useEffect, useState } from 'react'

import './App.css'

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
      
    </>
  )
}

export default App
