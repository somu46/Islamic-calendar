import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './Root';
import App from './App';
import {Error,IslamicCalendar,PrayerTimetable,AlQuran,ZakatCalculator,DateConverter} from './Pages';
import PrayerTimes from './Pages/PrayerTime/PrayerTime';
import Home from './Components/Home/Home';






const Route =createBrowserRouter([

  {
    path: '/',
    element: <App/>,
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

