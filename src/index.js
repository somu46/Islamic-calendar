import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './Root';
import App from './App';
import {Error,IslamicCalendar,PrayerTimetable,AlQuran,ZakatCalculator,DateConverter} from './Pages';
import PrayerTimes from './Pages/PrayerTime/PrayerTime';
import Home from './Components/Home/Home';
import About from './Pages/About/About';
import BlogPage from './Pages/Blogs/Blogs';
import IslamicHolidayPage from './Pages/IslamicHoliDays/IslamicHoliDays';
import ContactUs from './Pages/Contact/ContactUs';
import SetLocation from './Components/SetLocation/SetLocation';


const Route =createBrowserRouter([

  {
    path: '',
    element: <App/>,
    children: [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/islamic-holidays',
        element:<IslamicHolidayPage/>
      },
      {
        path:'/about-us',
        element:<About/>
      }, 
      {
        path: '/blogs',
        element: <BlogPage/>
      },
      {
        path:'/contact-us',
        element:<ContactUs/>
      },
      {
        path:'/change-location',
        element:<div className='my-[10rem]'>
          <SetLocation/>
        </div>
      }
    ]
  },
  {
    path: '/test-api',
    element:<div>This is for test api</div>
  },
 {
    path: '/essentials',
    element: <Root />,
    children: [
     
      {
        path: '/essentials/zakat-calculator', 
        element:<ZakatCalculator/>
      },
      {
        path:'/essentials/islamic-calendar',
        element:<IslamicCalendar/>
      },
      {
        path:'/essentials/prayer-times',
        element:<PrayerTimes/>
      },
      {
        path:'/essentials/prayer-times-table',
        element:<PrayerTimetable/>
      },
      {
        path:'/essentials/al-quran',
        element:<AlQuran/>
      },
      {
        path:'/essentials/date-converter',
        element:<DateConverter/>
      },
       
      {
        path: '*',
        element: <Error />,
      }
    ]

    },

    {
      path: '*',
      element:<Error/>,
    }
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <React.StrictMode>
    <RouterProvider router={Route}/>
  </React.StrictMode>
  </>
);

