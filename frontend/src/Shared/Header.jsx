import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LogIn } from 'lucide-react';
import { isAuthenticate, removeAuthToken } from '../Auth/Auth';

const Header = () => {
  const navigate = useNavigate();
  const [logging, setLogging] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      ? "text-purple-400 border-b-2 border-purple-400 pb-1 font-semibold"
      : "text-white hover:text-purple-300 transition-all duration-300 hover:scale-105";

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-3 text-purple-400 bg-white/10 rounded-lg font-semibold"
      : "block px-4 py-3 text-white hover:text-purple-300 hover:bg-white/5 rounded-lg transition-all duration-300";

  return (
    <>
      
      <header className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-xl'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            
           
            <div className='flex items-center space-x-3 group cursor-pointer' onClick={()=>navigate('/')}>
              <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110'>
                <img src="logo.png" alt="Logo" className='w-6 h-6 object-contain' onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }} />
                <span className='text-white font-bold text-lg hidden'>N</span>
              </div>
              <div className='hidden sm:block' >
                <h1 className='text-white font-bold text-xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent'>
                  NepalNiti
                </h1>
                <p className='text-purple-300 text-xs'>Inspire & Inform</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden md:block'>
              <ul className='flex items-center space-x-8'>
                <li><NavLink to={"/"} className={linkClass}>Home</NavLink></li>
                <li><NavLink to={"/blog"} className={linkClass}>Blog</NavLink></li>
                <li><NavLink to={"/about"} className={linkClass}>About</NavLink></li>
                <li><NavLink to={"/contact"} className={linkClass}>Contact</NavLink></li>
              </ul>
            </nav>

            {/* Desktop Auth Button */}
            <div className='hidden md:block'>
              {isAuthenticate() ? (
                <button 
                  onClick={handleSignOut}
                  className='group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2'
                >
                  <LogOut className='w-4 h-4 group-hover:rotate-12 transition-transform duration-300' />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button 
                  onClick={handleClick}
                  className='group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2'
                >
                  <LogIn className='w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300' />
                  <span>Login</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden'>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='text-white hover:text-purple-300 p-2 rounded-lg hover:bg-white/5 transition-all duration-300'
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className='w-6 h-6 transform rotate-90 transition-transform duration-300' />
                ) : (
                  <Menu className='w-6 h-6 transition-transform duration-300' />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className='bg-gradient-to-br from-slate-800/95 to-purple-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl'>
            <div className='px-4 py-6 space-y-1'>
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
              <div className='pt-4 border-t border-white/10 mt-4'>
                {isAuthenticate() ? (
                  <button 
                    onClick={(e) => {
                      handleSignOut(e);
                      setIsMenuOpen(false);
                    }}
                    className='w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2'
                  >
                    <LogOut className='w-4 h-4' />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <button 
                    onClick={(e) => {
                      handleClick(e);
                      setIsMenuOpen(false);
                    }}
                    className='w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2'
                  >
                    <LogIn className='w-4 h-4' />
                    <span>Login</span>
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
          className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden'
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;