import React from 'react';
import Qibla from '../../Components/Qibla/QiblaDirection';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import Helmet from 'react-helmet';

const QiblaDir = () => {
  return (
    <>
     <Helmet>
      <meta charSet="utf-8" />
      <title>Qibla Direction : Find Qibla direction for your Current Location</title>
      <link rel="canonical" href="https://islamicalendar.in/essentials/qibla-direction" />
     </Helmet>
    <div className="relative flex flex-col items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-teal-200 via-white to-teal-200 p-4">
    <div className='absolute top-0 left-0' ><Breadcrumb pageName="Qibla Direction" /></div>
      <div className="mt-8">
        <Qibla />
      </div>
    </div>
    </>
  );
};

export default QiblaDir;