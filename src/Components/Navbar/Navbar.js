import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='  text-white font-bold top-0 w-full'>
         {/* Navbar */}
      <header className="bg-teal-700 text-white py-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
        <Link to='/'>  <h1 className="text-3xl font-bold tracking-wide">Islamic Knowledge</h1></Link>
          <ul className="flex space-x-6">
            <li><NavLink to="/data/islamic-calendar" className="hover:underline">Islamic Calendar</NavLink></li>
            <li><NavLink to="#prayers" className="hover:underline">Prayer Times</NavLink></li>
            <li><NavLink to="#articles" className="hover:underline">Articles</NavLink></li>
            <li><NavLink to="#about" className="hover:underline">About</NavLink></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Navbar