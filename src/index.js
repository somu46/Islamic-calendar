import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './Root';
import App from './App';
import {Error,IslamicCalendar,PrayerTimetable,AlQuran,ZakatCalculator,DateConverter} from './Pages';






const Route =createBrowserRouter([

  {
    path: '/',
    element: <Root />,
    children: [

      {
        path: '/',
        element: <App />,
      },
     
      {
        path: '/zakat-calculator', 
        element:<ZakatCalculator/>
      },
      {
        path:'/islamic-calendar',
        element:<IslamicCalendar/>
      },
      {
        path:'/prayer-times',
        element:<PrayerTimetable/>
      },
      {
        path:'/al-quran',
        element:<AlQuran/>
      },
      {
        path:'/date-converter',
        element:<DateConverter/>
      },
        




      {
        path: '*',
        element: <Error />,
      }
    ]

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

