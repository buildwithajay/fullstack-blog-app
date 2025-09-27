import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LogIn } from 'lucide-react';
import { getAuthToken, getUserFromToken, isAuthenticate, removeAuthToken } from '../Auth/Auth';

const Header = () => {
  const navigate = useNavigate();
  const [logging, setLogging] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const[username, setUserName] = useState("");
  const [user,setUser] = useState({});
  
  useEffect(()=>{
    const fetchUser = async()=>{
  
       let token = await getUserFromToken();
       setUser(token)
       setUserName(user.username);
  
    }
    fetchUser();
  }, [user])


  const handleClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    removeAuthToken();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-red-600 border-b-2 border-red-600 pb-1 font-medium"
      : "text-gray-700 hover:text-red-600 transition-colors duration-200";

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-3 text-red-600 bg-gray-50 font-medium"
      : "block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors duration-200";

  return (
    <>
      {/* Top Bar */}
      <div className='bg-black text-white text-xs'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between py-2'>
            <div className='flex items-center space-x-4'>
              <span className='cursor-pointer'>Nepal</span>
              <span className='text-gray-400'>|</span>
              <span className='cursor-pointer'>Politics</span>
              <span className='text-gray-400'>|</span>
              <span className=' cursor-pointer'>News</span>
            </div>
            <div className='hidden sm:flex items-center space-x-4'>
              <span>Sign in</span>
            </div>
          </div>
        </div>
      </div>

      <header className='bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            
            {/* Logo */}
            <div className='flex items-center space-x-3 group cursor-pointer' onClick={()=>navigate('/')}>
              <div className='w-10 h-10 bg-red-600 rounded flex items-center justify-center shadow-sm group-hover:bg-red-700 transition-colors duration-200'>
                <img src="logo.png" alt="Logo" className='w-6 h-6 object-contain brightness-0 invert' onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }} />
                <span className='text-white font-bold text-lg hidden'>N</span>
              </div>
              <div className='hidden sm:block'>
                <h1 className='text-black font-bold text-2xl tracking-tight'>
                  NepalNiti
                </h1>
                <p className='text-gray-500 text-xs uppercase tracking-wide'>Inspire & Inform</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden md:block'>
              <ul className='flex items-center space-x-8'>
                <li><NavLink to={"/"} className={linkClass}>Home</NavLink></li>
                <li><NavLink to={"/blogs"} className={linkClass}>Blog</NavLink></li>
                <li><NavLink to={"/about"} className={linkClass}>About</NavLink></li>
                <li><NavLink to={"/contact"} className={linkClass}>Contact</NavLink></li>
              </ul>
            </nav>

            {/* Desktop Auth Button */}
            <div className='hidden md:flex items-center space-x-4'>
              {isAuthenticate() ? (
                <div className='flex items-center space-x-3'>
                  <span className='text-sm text-gray-600'>Hello, {username}</span>
                  <button 
                    onClick={handleSignOut}
                    className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2'
                  >
                    <LogOut className='w-4 h-4' />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleClick}
                  className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2'
                >
                  <LogIn className='w-4 h-4' />
                  <span>Sign in</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden'>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='text-gray-700 hover:text-red-600 p-2 transition-colors duration-200'
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className='w-6 h-6' />
                ) : (
                  <Menu className='w-6 h-6' />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className='bg-white border-t border-gray-200'>
            <div className='px-4 py-4 space-y-1'>
              {/* Mobile Navigation Links */}
              <NavLink 
                to={"/"} 
                className={mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to={"/blog"} 
                className={mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </NavLink>
              <NavLink 
                to={"/about"} 
                className={mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink 
                to={"/contact"} 
                className={mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
              
              {/* Mobile Auth Button */}
              <div className='pt-4 border-t border-gray-200 mt-4'>
                {isAuthenticate() ? (
                  <div className='space-y-3'>
                    <div className='text-sm text-gray-600 px-4'>Hello, {username}</div>
                    <button 
                      onClick={(e) => {
                        handleSignOut(e);
                        setIsMenuOpen(false);
                      }}
                      className='w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2'
                    >
                      <LogOut className='w-4 h-4' />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={(e) => {
                      handleClick(e);
                      setIsMenuOpen(false);
                    }}
                    className='w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2'
                  >
                    <LogIn className='w-4 h-4' />
                    <span>Sign in</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className='fixed inset-0 bg-black/10 backdrop-blur-sm z-40 md:hidden'
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;