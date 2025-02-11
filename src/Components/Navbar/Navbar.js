import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import SetLocation from "../SetLocation/SetLocation";
import logo from "../../Assets/Logo.png";
import { motion } from "framer-motion";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Navbar.css'


const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  closed: {
    x: "100%",
    opacity: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleHistory=()=>{
    window.scrollTo(0, 0);
  }
  const handleMobileHistory = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-teal-600 text-white font-bold top-0 w-full fixed z-50">
      <header className="shadow-md">
        <nav className="container mx-auto px-2 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center" style={{ marginLeft: "10px" }}>
            <Link to="/" className="flex items-center space-x-3"
              onClick={handleHistory}
              >
              <img src={logo} alt="Islamic Knowledge" className="w-10 h-10" />
              <span className="text-xl font-bold tracking-wide hover:text-teal-300 transition">
                Islamic Essentials
              </span>
            </Link>
          </div>

          {/* Center Menu (Desktop) */}
          <ul className="hidden lg:flex space-x-8 items-center">
          <li>
              <NavLink
                to="/"
                className="hover:text-teal-300 transition"
                  onClick={handleHistory}
                  
              >
                Home
              </NavLink>
            </li>
            
            <li className="nav-item gallery-dropdown">
            <span>Our Feature</span>
            <ArrowDropDownIcon/>
            <ul className="dropdown bg-white bg-opacity-50 md:bg-opacity-70  backdrop-blur-md">
              <li>
                <NavLink activeClass="active"   to="/essentials/islamic-calendar"
                 onClick={handleHistory}>  Islamic Calendar</NavLink>
              </li>
              <li>
                <NavLink activeClass="active"   to="/essentials/al-quran"
                 onClick={handleHistory}> Al-Quran</NavLink>
              </li>
              <li>
                <NavLink activeClass="active"   to="/essentials/prayer-times"
                 onClick={handleHistory}>  Prayer Times</NavLink>
              </li>
              <li>
                <NavLink activeClass="active"   to="/essentials/prayer-times-table"
                 onClick={handleHistory}> Monthly Prayer Times</NavLink>
              </li>
              <li>
                <NavLink activeClass="active"   to="/essentials/date-converter"
                 onClick={handleHistory}> 
                 Date Converter
                 </NavLink>
              </li>
              <li>
                <NavLink activeClass="active"   to="/essentials/zakat-calculator"
                 onClick={handleHistory}>
                  Zakat Calculator
                 </NavLink>
              </li>
            </ul>
          </li>

            <li>
              <NavLink to="/about-us" className="hover:text-teal-300 transition"
                onClick={handleHistory}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" className="hover:text-teal-300 transition"
                onClick={handleHistory}
                >
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" className="hover:text-teal-300 transition"
                onClick={handleHistory}
                >
                Contact Us
              </NavLink>
            </li>
          </ul>

          {/* Right Section */}
          <div className="hidden lg:block" style={{ marginRight: "20px" }}>
            <SetLocation />
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="lg:hidden z-50">
            <Hamburger
              toggled={isMenuOpen}
              toggle={setIsMenuOpen}
              color="#FFFFFF"
            />
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="fixed top-[4rem] left-0 w-full bg-teal-600 min-h-screen z-40 shadow-lg"
            initial="closed"
            animate={isMenuOpen ? "open" : "closed"}
            variants={variants}
          >
            <nav>
              <ul className="flex flex-col space-y-4 p-6">
                <li>
                  <NavLink
                    to="/"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about-us"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/blogs"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Blogs
                  </NavLink>
                </li>
                <li>
              <NavLink to="/contact-us" className="hover:text-teal-300 transition" onClick={handleMobileHistory}>
                Contact Us
              </NavLink>
            </li>

                <p className="text-2xl text-white mt-4">Islamic Essentials</p>
                <hr className="border-teal-300 my-2" />

                <li>
                  <NavLink
                    to="/essentials/islamic-calendar"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Islamic Calendar
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/essentials/al-quran"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Al Quran
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/essentials/prayer-times"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Prayer Times
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/essentials/prayer-times-table"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Monthly Prayer Times
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/essentials/date-converter"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Date Converter
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/essentials/zakat-calculator"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Zakat Calculator
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/essentials/islamic-holidays"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Islamic Holidays
                  </NavLink>
                </li>
                <SetLocation />
              </ul>
            </nav>
          </motion.div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
