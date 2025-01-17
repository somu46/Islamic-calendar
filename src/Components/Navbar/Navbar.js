import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import SetLocation from "../SetLocation/SetLocation";
import logo from "../../Assets/Logo.png";
import { motion } from "framer-motion";

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
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="Islamic Knowledge" className="w-10 h-10" />
              <span className="text-xl font-bold tracking-wide hover:text-teal-300 transition">
                Islamic Knowledge
              </span>
            </Link>
          </div>

          {/* Center Menu (Desktop) */}
          <ul className="hidden md:flex space-x-8 items-center">
            <li>
              <NavLink
                to="/data/islamic-calendar"
                className="hover:text-teal-300 transition"
              >
                Islamic Calendar
              </NavLink>
            </li>
            <li>
              <NavLink to="/data/prayer-times" className="hover:text-teal-300 transition">
                Prayer Times
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className="hover:text-teal-300 transition">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" className="hover:text-teal-300 transition">
                Blogs
              </NavLink>
            </li>
          </ul>

          {/* Right Section */}
          <div className="hidden md:block" style={{ marginRight: "20px" }}>
            <SetLocation />
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden z-50">
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

                <p className="text-2xl text-white mt-4">Our Products</p>
                <hr className="border-teal-300 my-2" />

                <li>
                  <NavLink
                    to="/data/islamic-calendar"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Islamic Calendar
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/data/al-quran"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Al Quran
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/data/prayer-times"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Prayer Times
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/data/prayer-times-table"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Monthly Prayer Times
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/data/date-converter"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Date Converter
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/data/zakat-calculator"
                    className="hover:text-teal-300 transition"
                    onClick={handleMobileHistory}
                  >
                    Zakat Calculator
                  </NavLink>
                </li>
                <li className="bg-[#FF0000] w-[70%] my-3 p-1 rounded-md shadow-lg text-xl  ">
                  <NavLink
                    to="/islamic-holidays"
                    className=" hover:text-teal-300 transition "
                    onClick={handleMobileHistory}
                  >
                  Islamic  Holidays
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
