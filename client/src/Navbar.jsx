import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Waves, Menu,X } from 'lucide-react';

const Navbar = ({ scrolled, activeSection, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={`bg-${isOpen? 'transparent':''} fixed top-0 w-full z-50 transition-all duration-300 ${scrolled & !isOpen ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className={`flex-shrink-0 font-bold text-2xl transition-colors duration-300 ${scrolled ? 'text-blue-600' : 'text-white'}`}>
              <Waves className="inline-block mr-2" />
              AquaForFree
            </div>
            <div className="hidden md:flex space-x-8">
              {[{name:'home',link:"home"},{name:'sponsor',link:"sponsor"}, {name: 'contact',link:"contact"}, {name:'distributors',link:'/distributors'}].map((section) => (
                <Link
                to={`/${section.link}`}>
                  <div
                  key={section.name}
                  onClick={() => scrollToSection(section.name)}
                  className={`cursor-pointer font-bold transition-all duration-300 ${
                    activeSection === section
                      ? scrolled ? 'text-blue-600 scale-105' : 'text-white scale-105'
                      : scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                  </div>
                </Link>
              ))}
            </div>
            <button
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                scrolled ? 'text-blue-600 hover:bg-blue-50' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <div className="mb-8 font-bold text-2xl text-blue-600 mb-4">
            <Waves className="inline-block mr-2" />
            AquaForFree
          </div>
          <div className="space-y-4">
            {[{name:'home',link:"home"},{name:'sponsor',link:"sponsor"}, {name: 'contact',link:"contact"}, {name:'distributors',link:'/distributors'}].map((section) => (
              <>
              <Link
                to={`/${section.link}`}
                key={section.name}
                onClick={() => {
                  scrollToSection(section.name);
                  setIsOpen(false);
                }}
                className={`mt-auto font-bold text-lg block w-full text-center text-gray-700 hover:text-blue-600 transition-all duration-300 ${
                  activeSection === section.name ? 'text-blue-600 scale-105' : ''
                }`}
              >
                {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
              </Link>
              <br/>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};


export default Navbar;