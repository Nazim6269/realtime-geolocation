// src/components/Navbar.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router";

const Navbar = ({ darkMode=true }) => { 
  const [isOpen, setIsOpen] = useState(false);

 
  const navClasses = `
    ${darkMode ? "bg-gray-900 border-b border-gray-700" : "bg-white border-b border-gray-200"}
    text-white shadow-xl transition-colors duration-500
  `;
  
  const textColor = darkMode ? "text-white" : "text-gray-900";

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            ClockApp
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-lg font-medium">
            <li>
              <NavLink 
                to="/" 
                className={`${textColor} hover:text-teal-400 transition duration-300`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/my-clock" 
                className={`${textColor} hover:text-teal-400 transition duration-300`}
              >
                My Clock
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={`${textColor} hover:text-teal-400 transition duration-300`}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${textColor}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            {/* Using a better icon representation */}
            {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Updated Style and Transition */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="bg-gray-800 dark:bg-gray-900 space-y-2 p-4 border-t border-gray-700">
          <li>
            <Link 
              to="/" 
              className="block p-2 text-white hover:bg-gray-700 rounded transition duration-200"
              onClick={() => setIsOpen(false)} 
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/my-clock" 
              className="block p-2 text-white hover:bg-gray-700 rounded transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              My clocks
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="block p-2 text-white hover:bg-gray-700 rounded transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;