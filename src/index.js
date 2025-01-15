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
        path: '/blogs',
        element: <BlogPage/>
      }
    ]
  },
  {
    path: '/test-api',
    element:<div>This is for test api</div>
  },
 {
    path: '/data',
    element: <Root />,
    children: [
      {
        path:'/data/home',
        element:<Home/>
      },
     
      {
        path: '/data/zakat-calculator', 
        element:<ZakatCalculator/>
      },
      {
        path:'/data/islamic-calendar',
        element:<IslamicCalendar/>
      },
      {
        path:'/data/prayer-times',
        element:<PrayerTimes/>
      },
      {
        path:'/data/prayer-times-table',
        element:<PrayerTimetable/>
      },
      {
        path:'/data/al-quran',
        element:<AlQuran/>
      },
      {
        path:'/data/date-converter',
        element:<DateConverter/>
      },
      {
        path:'/data/about',
        element:<About/>
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

