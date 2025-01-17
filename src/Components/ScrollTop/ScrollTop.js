import React, { useState, useEffect } from 'react';
import { SlArrowUp } from 'react-icons/sl';

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    const isMobile = window.innerWidth <= 768; // Define a breakpoint for mobile screens (e.g., 768px)
  
    if (isMobile) {
      if (window.scrollY > 100) { // Show button earlier on mobile
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } else {
      if (window.scrollY > 300) { // Default behavior for larger screens
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };
  

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  

  return (
    <>
      {isVisible && (
        <button
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <SlArrowUp 
  className="text-teal-500 hover:text-white text-[23px] stroke-[3px]" 
/>

        </button>
      )}
      <style jsx>{`
        .scroll-top {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #556;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: opacity 0.3s, transform 0.3s;
          z-index: 1000;
        }

        .scroll-top:hover {
          background-color: #555    ;
        }

        .scroll-top:active {
          transform: scale(0.95);
        }
      `}</style>
    </>
  );
};

export default ScrollTop;
