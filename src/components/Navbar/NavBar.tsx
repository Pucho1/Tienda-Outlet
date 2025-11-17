import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Menu, X, LogOut, User } from 'lucide-react';

import { useAuthStore } from '../../store/authZustandStore';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuntenticated = useAuthStore((state) => state.isAuthenticated);


  const navigate   = useNavigate();
  const { t }      = useTranslation();

  const logOut     = () => useAuthStore.getState().logout();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center space-x-8">
            <NavLink to="/" className="font-playfair text-lg lg:text-xl text-gray-600 uppercase font-semibold">
              Outlet Shop
            </NavLink>
              {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <NavLink to="/products-list" className="text-gray-600 hover:text-gray-900">
                Products
              </NavLink>
            </div>
          </div>

          {/* User actions - visible on all screens */}
          {isAuntenticated && <div className="flex items-center space-x-4">
            
            {/* User Profile */}
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => navigate('/user')}
              aria-label="User Profile"
            >
              <User className="h-6 w-6" />
            </button>

            {/* Logout button - hidden on mobile, shown on tablet/desktop */}
            <button
              className="hidden sm:flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={logOut}
            >
              <span>{t('LOGOUT')}</span>
              <LogOut className="h-5 w-5" />
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>}
        </div>
        
        {/* Mobile menu - only visible when toggled */}
        <div
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <NavLink
              to="/products-list"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Products
            </NavLink>
            
            {/* Logout button for mobile view */}
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-red-500 hover:text-red-600 hover:bg-gray-50 rounded-md"
              onClick={logOut}
            >
              <span>Salir</span>
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
