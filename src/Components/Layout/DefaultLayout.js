import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Feature from '../Feature/Feature';
import Footer from '../Footer/Footer';

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-boxdark-2 text-bodydark h-auto flex flex-col">
      {/* Navbar */}
      <Navbar setSidebarOpen={setSidebarOpen} />

      {/* Page Wrapper */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content Area */}
        <div className="relative flex flex-1 min-h-screen flex-col overflow-y-auto mt-[4.5rem]">
  {/* Main Content */}
     <main>
    <div className="mx-auto max-w-screen-2xl mt-3">
      {children && React.Children.count(children) > 0 ? children : <Feature />}
    </div>
  </main>
 </div>

      </div>
      <Footer/>
    </div>
  );
};

export default DefaultLayout;
