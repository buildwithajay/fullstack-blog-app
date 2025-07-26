import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className=' bg-slate-800 flex p-4 justify-between '>
     <div className='flex gap-3 p-2'>
     <img src="logo.png" alt="" />
     
     </div>
       <div>
        <ul className='flex gap-5 text-white p-2'>
      <Link to={"/"}>Home</Link>
      <Link to={"/blog"}>Blog</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/contact"}>Contact</Link>
    </ul>
       </div>
       <div>
        <button className='text-white bg-blue-700 rounded-sm p-2 mr-4'>Login</button>
       </div>
    

    </div>
  )
}

export default Header
