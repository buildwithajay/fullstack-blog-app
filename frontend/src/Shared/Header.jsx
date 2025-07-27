import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
    const linkClass = ({ isActive }) =>
    isActive
      ? "text-purple-400 border-b-2 border-purple-500 pb-1"
      : "text-white hover:text-purple-400";

  return (
    <div className=' bg-slate-800 flex p-4 justify-between '>
     <div className='flex gap-3 p-2'>
     <img src="logo.png" alt="" />
     
     </div>
       <div>
        <ul className='flex gap-5 text-white p-2'>
      <NavLink to={"/"} className={linkClass}>Home</NavLink>
      <NavLink to={"/blog"} className={linkClass}>Blog</NavLink>
      <NavLink to={"/about"} className={linkClass}>About</NavLink>
      <NavLink to={"/contact"} className={linkClass}>Contact</NavLink>
    </ul>
       </div>
       <div>
        <button className='text-white bg-blue-700 rounded-sm p-2 mr-4'>Login</button>
       </div>
    

    </div>
  )
}

export default Header
