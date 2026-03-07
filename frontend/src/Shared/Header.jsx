import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Bell, LogOut, LogIn } from 'lucide-react';
import { getUserFromToken, isAuthenticate, removeAuthToken } from '../Auth/Auth';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('Reader');

  useEffect(() => {
    const user = getUserFromToken();
    if (user?.username) {
      setUserName(user.username);
    }
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    removeAuthToken();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-all py-5 border-b-2 ${
      isActive
        ? 'text-[#0a2a8a] border-[#d81224]'
        : 'text-slate-700 hover:text-[#0a2a8a] border-transparent hover:border-[#d81224]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-8 min-w-0">
            <button className="flex items-center gap-2 min-w-0" onClick={() => navigate('/')}>
              <img src="/nepalniti-logo.svg" alt="Nepalniti" className="h-9 w-9 rounded" />
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#0a2a8a] uppercase truncate">Nepalniti</h1>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/" className={linkClass}>Top Stories</NavLink>
              <NavLink to="/blogs" className={linkClass}>Latest</NavLink>
              <NavLink to="/about" className={linkClass}>About</NavLink>
              <NavLink to="/contact" className={linkClass}>Contact</NavLink>
            </nav>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search news..."
                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-56 focus:ring-2 focus:ring-[#0a2a8a]"
              />
            </div>

            <button className="p-2 rounded-full hover:bg-slate-100" aria-label="Notifications">
              <Bell className="w-5 h-5 text-slate-700" />
            </button>

            {isAuthenticate() ? (
              <button
                onClick={handleSignOut}
                className="bg-[#d81224] hover:bg-[#b60f1e] text-white px-3 py-2 rounded-md text-sm font-semibold flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden xl:inline">{userName}</span>
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                className="bg-[#d81224] hover:bg-[#b60f1e] text-white px-3 py-2 rounded-md text-sm font-semibold flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-700"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-3 flex flex-col">
            <NavLink to="/" className="py-2 text-sm font-semibold text-slate-700" onClick={() => setIsMenuOpen(false)}>Top Stories</NavLink>
            <NavLink to="/blogs" className="py-2 text-sm font-semibold text-slate-700" onClick={() => setIsMenuOpen(false)}>Latest</NavLink>
            <NavLink to="/about" className="py-2 text-sm font-semibold text-slate-700" onClick={() => setIsMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" className="py-2 text-sm font-semibold text-slate-700" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
            {!isAuthenticate() && (
              <button onClick={handleSignIn} className="mt-3 bg-[#d81224] text-white px-3 py-2 rounded-md text-sm font-semibold">
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
