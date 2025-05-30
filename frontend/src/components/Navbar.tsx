import React, { useState } from 'react';
import { Menu, User, X, LogOut } from 'lucide-react';
import { Link } from '../components/Link';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { isLoggedIn, user, logout, navigateTo } = useApp();

  const handleLogout = () => {
    logout();
    navigateTo('/');
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#FF5A5F]">SocialMap</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-[#FF5A5F] transition duration-300">
                Home
              </Link>
              <Link to="/studios" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-[#FF5A5F] transition duration-300">
                Studios
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-[#FF5A5F] transition duration-300">
                About
              </Link>
              <Link to="/contact" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-[#FF5A5F] transition duration-300">
                Contact
              </Link>
            </div>
          </div>
          
          {/* Authenticated vs Unauthenticated Display */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="ml-4 flex items-center md:ml-6 relative">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F] p-1 border border-gray-300"
                >
                  <span className="sr-only">Open user menu</span>
                  <User className="h-6 w-6 text-gray-500" />
                  <span className="ml-2 text-gray-700 font-medium pr-2">{user?.name || 'User'}</span>
                </button>
                
                {/* Profile dropdown */}
                {isProfileDropdownOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </Link>
                    <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Bookings
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-shrink-0">
                <Link to="/login" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-300 mr-2">
                  Sign in
                </Link>
                <Link to="/signup" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF5A5F] hover:bg-[#FF4045] transition duration-300">
                  Sign up
                </Link>
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF5A5F]"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 inset-x-0 z-50 p-2 transition transform origin-top-right">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-[#FF5A5F]">SocialMap</span>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF5A5F]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link to="/" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">Home</span>
                  </Link>
                  <Link to="/studios" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">Studios</span>
                  </Link>
                  <Link to="/about" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">About</span>
                  </Link>
                  <Link to="/contact" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">Contact</span>
                  </Link>
                </nav>
              </div>
            </div>
            
            {/* Mobile auth menu - conditionally render based on auth state */}
            <div className="py-6 px-5 space-y-6">
              {isLoggedIn ? (
                <div className="space-y-6">
                  <div className="flex items-center">
                    <User className="h-6 w-6 text-gray-600" />
                    <span className="ml-3 text-base font-medium text-gray-900">{user?.name || 'User'}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-y-4">
                    <Link to="/profile" className="text-base font-medium text-gray-900 hover:text-gray-700">
                      Your Profile
                    </Link>
                    <Link to="/bookings" className="text-base font-medium text-gray-900 hover:text-gray-700">
                      Your Bookings
                    </Link>
                    <Link to="/settings" className="text-base font-medium text-gray-900 hover:text-gray-700">
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left text-base font-medium text-gray-900 hover:text-gray-700 flex items-center"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <Link to="/login" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Sign in
                  </Link>
                  <Link to="/signup" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;