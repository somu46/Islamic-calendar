import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import SetLocation from "../SetLocation/SetLocation";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


import { motion } from 'framer-motion';

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
  closed: {
    x: '100%',
    opacity: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleMobileHistory = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  return (
    <div className="text-white font-bold top-0 w-full fixed z-50 mb-3">
      <header className="bg-teal-600 text-white py-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center ">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-wide mx-3 text-left">
            Islamic Knowledge
          </Link>

          {/* Hamburger Icon */}
          <div className="md:hidden mx-3 z-50">
            <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} color="#FFFFFF" />
          </div>

          {/* Navigation Links (Desktop) */}
          <ul className="hidden md:flex space-x-6 mr-[5rem] items-center">
            <li>
              <NavLink to="/" className="flex items-center px-3 hover:text-teal-500">
                <SetLocation />
              </NavLink>
            </li>
            <li>
              <NavLink to="/data/islamic-calendar" className="hover:text-teal-500">
                Islamic Calendar
              </NavLink>
            </li>
            <li>
              <NavLink to="#prayers" className="hover:text-teal-500">
                Prayer Times
              </NavLink>
            </li>
            <li>
              <NavLink to="#about" className="hover:text-teal-500">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="#articles" className="hover:text-teal-500">
                Blogs
              </NavLink>
            </li>
            {/* <li className="nav-item gallery-dropdown">
              <span>Gallery</span>
              <ArrowDropDownIcon />
              <ul className="dropdown bg-white bg-opacity-50 md:bg-opacity-70 backdrop-blur-md">
                <li>
                  <NavLink to="/photos" className="hover:text-teal-500">
                    Photos
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/videos" className="hover:text-teal-500">
                    Videos
                  </NavLink>
                </li>
              </ul>
            </li> */}
          </ul>

         
          
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className={`fixed top-[3.5rem] left-0 min-h-screen w-[100%] bg-teal-600 z-30 mb-5`}
            initial="closed"
            animate={isMenuOpen ? 'open' : 'closed'}
            variants={variants}
          >
            <nav>
              <ul className="flex flex-col items-start p-8 space-y-4">
              <li>
              <NavLink to="/" className="flex items-center px-3 hover:text-teal-500">
                <SetLocation />
              </NavLink>
            </li>
                <li>
                  <NavLink to="/" onClick={handleMobileHistory}>
                    Home
                  </NavLink>
                </li>
                
                <li>
                  <NavLink to="#about" onClick={handleMobileHistory}>
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#about" onClick={handleMobileHistory}>
                   Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#articles" onClick={handleMobileHistory}>
                    Blogs
                  </NavLink>
                </li>
                {/* <hr className="w-full border-1 border-white " />  */}
                <p className="text-3xl text-white mx-auto">Our products</p>
                <hr className="w-full border-1 border-white " />
                <li>
                  <NavLink to="/data/islamic-calendar" onClick={handleMobileHistory}>
                    Islamic Calendar
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/data/al-quran" onClick={handleMobileHistory}>
                  Al Quran
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/data/prayer-times" onClick={handleMobileHistory}>
                  Prayer Times
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/data/prayer-times-table" onClick={handleMobileHistory}>
                 Monthly Prayer Times 
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/data/date-converter" onClick={handleMobileHistory}>
                  Date Converter
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/data/zakat-calculator" onClick={handleMobileHistory}>
                  Zakat Calculator
                  </NavLink>
                </li>
           
                
              </ul>
            </nav>
          </motion.div>
        )}
      </header>
    </div>
  );
};

export default Navbar;