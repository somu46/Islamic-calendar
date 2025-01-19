import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { FaEnvelope,  FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from '../../Assets/Logo.png'; // Import the logo image

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleScrolle=()=>{
    window.scrollTo(0, 0);
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      setIsValid(true);
      alert('Subscribed successfully!');
      setEmail('');
    } else {
      setIsValid(false);
    }
  };

  return (
    <footer className="bg-teal-900 text-white py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
             <img src={logo} alt="Islamic Knowledge" className="w-12 h-12 mx-auto my-2" />
            <h4 className="text-lg text-center font-semibold mb-4">Islamic Essentials</h4>
            <p className="text-sm text-gray-300">
              Islamic Essentials is a platform dedicated to providing accurate Islamic resources to Muslims worldwide, especially those living in non-Islamic countries.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li onClick={handleScrolle}>
                <Link to="/" className="text-sm text-gray-300 hover:text-amber-400 transition">
                  Home
                </Link>
              </li>
              <li onClick={handleScrolle} >
                <Link to="/about-us" className="text-sm text-gray-300 hover:text-amber-400 transition">
                  About Us
                </Link>
              </li>
              <li onClick={handleScrolle} >
                <Link to="/contact-us" className="text-sm text-gray-300 hover:text-amber-400 transition">
                  Contact Us
                </Link>
              </li>
              <li onClick={handleScrolle} >
                <Link to="/essentials/prayer-times" className="text-sm text-gray-300 hover:text-amber-400 transition">
                  Prayer Times
                </Link>
              </li>
              <li onClick={handleScrolle} >
                <Link to="/essentials/islamic-calendar" className="text-sm text-gray-300 hover:text-amber-400 transition">
                  Islamic Calendar
                </Link>
              </li>
              <li onClick={handleScrolle} >
                <Link to="/essentials/zakat-calculator" className="text-sm text-gray-300 hover:text-amber-400 transition">
                  Zakat Calculator
                </Link>
              </li>
              <li onClick={handleScrolle} >
                <Link to="/essentials/al-quran" className="text-sm text-gray-300 hover:text-amber-400 transition">
                  Al-Quran
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm text-gray-300 flex items-center gap-2">
              <FaEnvelope className='h-6 w-6'/>
              <a href="mailto:contact@islamicknowledge.com" className="hover:text-amber-400 text-[1rem] ">
                contact@islamicalendar.com
              </a>
            </p>
            {/* <p className="text-sm text-gray-300 flex items-center gap-2 mt-2">
              <FaPhone />
              <a href="tel:+1234567890" className="hover:text-amber-400">
                +123 456 7890
              </a>
            </p>
            <p className="text-sm text-gray-300 flex items-center gap-2 mt-2">
              <FaMapMarkerAlt />
              123 Islamic Knowledge Lane, Faith City, World
            </p> */}

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4 mx-auto justify-center sm:justify-start">
              <a
                href="https://facebook.com"
                className="text-gray-300 hover:text-amber-400 transition"
                aria-label="Facebook"
              >
                <FaFacebookF className='h-6 w-6'/>
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-300 hover:text-amber-400 transition"
                aria-label="Twitter"
              >
                <FaTwitter className='h-6 w-6' />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-300 hover:text-amber-400 transition"
                aria-label="Instagram"
              >
                <FaInstagram className='h-6 w-6' />
              </a>
              <a
                href="https://youtube.com"
                className="text-gray-300 hover:text-amber-400 transition"
                aria-label="YouTube"
              >
                <FaYoutube className='h-6 w-6' />
              </a>
            </div>
             {/* Newsletter Subscription Section */}
        <div className="mt-10 ">
          <h4 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h4>
          <form onSubmit={handleSubscribe} className="flex ">
            <input
              type="email"
              className={`p-2 rounded-l-lg text-black ${!isValid && 'border-red-500'}`}
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              type="submit"
              className="bg-amber-400 text-white p-2 rounded-r-lg hover:bg-amber-500 transition"
            >
              Subscribe
            </button>
          </form>
          {!isValid && <p className="text-red-500 mt-2">Please enter a valid email address.</p>}
        </div>
          </div>
          
        </div>

       

        {/* Footer Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Islamic Knowledge. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
